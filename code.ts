"use strict";

// Using a different name to avoid conflict with Figma's built-in VariableValue type
interface CustomVariableValue {
  name: string;
  id: string;
  value: VariableValue;
}
interface CollectionData {
  modes?: string[];
  variables?: { [modeName: string]: CustomVariableValue[] } | CustomVariableValue[];
  type?: string;
}

/**
 * Resolves variable aliases recursively
 * @param value The variable value that might be an alias
 * @param variables All available variables for lookup
 * @param visitedIds Set of already visited variable IDs to prevent infinite recursion
 * @returns The resolved value
 */
function resolveVariableAlias(
  value: VariableValue,
  variables: Variable[],
  visitedIds: Set<string> = new Set()
): VariableValue {
  // Check if the value is a variable alias
  if (typeof value === 'object' && value !== null && 'type' in value && value.type === 'VARIABLE_ALIAS') {
    const aliasValue = value as { type: string; id: string };

    // Prevent circular references
    if (visitedIds.has(aliasValue.id)) {
      console.warn('Circular reference detected in variable aliases:', aliasValue.id);
      return value; // Return the original alias to avoid infinite recursion
    }

    // Find the referenced variable
    const referencedVariable = variables.find(v => v.id === aliasValue.id);
    if (referencedVariable) {
      // Get the appropriate mode ID - using the first mode as default
      const modeId = Object.keys(referencedVariable.valuesByMode)[0];
      if (modeId) {
        const referencedValue = referencedVariable.valuesByMode[modeId];

        // Track this ID to prevent circular references
        visitedIds.add(aliasValue.id);

        // Recursively resolve in case the referenced value is also an alias
        return resolveVariableAlias(referencedValue, variables, visitedIds);
      }
    }
  }

  // Return original value if it's not an alias or referenced variable not found
  return value;
}

// Variables 데이터 가져오기
async function getVariables() {
  const variables = await figma.variables.getLocalVariablesAsync(); // 모든 Variables 가져오기
  const collections = await figma.variables.getLocalVariableCollectionsAsync(); // 모든 Variables Collection 가져오기
  const tokenData: { [collectionName: string]: CollectionData } = {};

  // Process each collection
  collections.forEach((collection) => {
    const collectionName = collection.name;
    if (!tokenData[collectionName]) {
      // Initialize the collection structure based on whether it has modes
      const hasModes = collection.modes.length > 1;
      tokenData[collectionName] = {
        type: undefined, // Will be set later
        variables: undefined // Will be set later
      };

      if (hasModes) {
        // Add modes only if there are multiple modes
        tokenData[collectionName].modes = collection.modes.map(mode => mode.name);
        tokenData[collectionName].variables = {};
      } else {
        // For collections without multiple modes, initialize variables as array
        tokenData[collectionName].variables = [];
      }

      // Find all variables belonging to this collection
      const collectionVariables = variables.filter(
        variable => variable.variableCollectionId === collection.id
      );

      // Add type information if available (from the first variable)
      if (collectionVariables.length > 0) {
        tokenData[collectionName].type = collectionVariables[0].resolvedType;
      }

      if (hasModes) {
        // Process variables for each mode
        collection.modes.forEach(mode => {
          const modeName = mode.name;
          (tokenData[collectionName].variables as { [modeName: string]: CustomVariableValue[] })[modeName] = [];

          // Add variable values for this mode
          collectionVariables.forEach(variable => {
            const valueForMode = variable.valuesByMode[mode.modeId];
            // Resolve any variable aliases
            const resolvedValue = resolveVariableAlias(valueForMode, variables);

            // Add the variable with its resolved value for this mode
            (tokenData[collectionName].variables as { [modeName: string]: CustomVariableValue[] })[modeName].push({
              name: variable.name,
              id: variable.id,
              value: resolvedValue
            });
          });
        });
      } else {
        // For collections without multiple modes, just use the first mode
        const defaultMode = collection.modes[0];

        // Add variable values directly to the array
        collectionVariables.forEach(variable => {
          const valueForMode = variable.valuesByMode[defaultMode.modeId];
          // Resolve any variable aliases
          const resolvedValue = resolveVariableAlias(valueForMode, variables);

          // Add the variable with its resolved value
          (tokenData[collectionName].variables as CustomVariableValue[]).push({
            name: variable.name,
            id: variable.id,
            value: resolvedValue
          });
        });
      }
    }
  });

  return tokenData;
}

// JSON 다운로드 트리거
async function exportJSON() {
  const tokens = await getVariables();
  const jsonString = JSON.stringify(tokens, null, 2);

  figma.ui.postMessage({ type: "download", data: jsonString });
}

figma.on("run", exportJSON);

// This plugin will open a tab that indicates that it will monitor the current
// selection on the page. It cannot change the document itself.
// This file holds the main code for plugins. Code in this file has access to
// the *figma document* via the figma global object.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (See https://www.figma.com/plugin-docs/how-plugins-run).
// This shows the HTML page in "ui.html".
figma.showUI(__html__, { width: 240, height: 100 });

figma.ui.onmessage = (msg) => {
  if (msg.type === "export") {
    exportJSON();
  }
};
