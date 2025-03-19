/* eslint-disable @typescript-eslint/no-explicit-any */
import { VariablesJson } from "@src/types";
import { fontWeightValues, sizeOrderRank } from "./constant";
import { hslValueToString, pxToRem, rgbToHsl, sanitizeName } from "./parser";

/**
 * Formats a variable value into a CSS-compatible string
 */
function formatValueForCSS(
  value: any,
  type: string | undefined,
  collectionName: string,
  variableName: string
): string {
  if (value === null || value === undefined) {
    return "initial";
  }

  if (typeof value === "number") {
    if (value === 0) {
      return "0";
    }

    // Special case 1: If collection is spacing, convert to rem
    if (collectionName.toLowerCase().includes("spacing")) {
      return pxToRem(value);
    }

    // Special case 2: If numeric and not font weight property, convert to rem
    const nameLower = variableName.toLowerCase();
    const isFontWeight =
      nameLower.includes("weight") ||
      (nameLower.includes("font") && fontWeightValues.has(String(value)));

    if (!isFontWeight) {
      // For spacing, sizing values, convert to rem
      return pxToRem(value);
    }

    return value.toString();
  }

  if (typeof value === "string") {
    return value;
  }

  // Handle color values
  if (typeof value === "object") {
    if ("r" in value && "g" in value && "b" in value) {
      const { r, g, b, a = 1 } = value;
      const hsl = rgbToHsl({ r: r * 255, g: g * 255, b: b * 255 });

      if (a < 1) {
        return `hsla(${hslValueToString(hsl)}, ${a.toFixed(2)})`;
      }
      return `hsl(${hslValueToString(hsl)})`;
    }
  }

  return JSON.stringify(value);
}

/**
 * Process variable name based on collection
 * For Color Primitives, remove the prefix
 */
function processVariableName(name: string, collectionName: string): string {
  const sanitized = sanitizeName(name);

  // Check if this belongs to Color Primitives collection
  if (collectionName.toLowerCase().includes("color primitive")) {
    const parts = sanitized.split("-");
    if (parts.length > 1) {
      // Remove the first part (prefix)
      return parts.slice(1).join("-");
    }
  }

  return sanitized;
}

/**
 * Sorts variables by their prefix and numeric order within each prefix group
 */
function sortCSSVariables(
  variables: Array<{ name: string; value: any }>
): Array<{ name: string; value: any }> {
  return [...variables].sort((a, b) => {
    const aName = sanitizeName(a.name);
    const bName = sanitizeName(b.name);

    // Extract prefix (everything before the last dash)
    const aLastDashIndex = aName.lastIndexOf("-");
    const bLastDashIndex = bName.lastIndexOf("-");

    const aPrefix =
      aLastDashIndex !== -1 ? aName.substring(0, aLastDashIndex) : aName;
    const bPrefix =
      bLastDashIndex !== -1 ? bName.substring(0, bLastDashIndex) : bName;

    // First sort by prefix
    if (aPrefix !== bPrefix) {
      return aPrefix.localeCompare(bPrefix);
    }

    // Extract the last part (after the last dash)
    const aSuffix =
      aLastDashIndex !== -1 ? aName.substring(aLastDashIndex + 1) : "";
    const bSuffix =
      bLastDashIndex !== -1 ? bName.substring(bLastDashIndex + 1) : "";

    // Check if suffixes are size-related values
    const aIsSize = aSuffix in sizeOrderRank;
    const bIsSize = bSuffix in sizeOrderRank;

    // If both are size values, sort by size order
    if (aIsSize && bIsSize) {
      return sizeOrderRank[aSuffix] - sizeOrderRank[bSuffix];
    }

    // If only one is a size value, keep original order
    if (aIsSize !== bIsSize) {
      // Preserve the original order by returning 0
      return 0;
    }

    // If both are numeric, sort numerically
    const aNum = parseInt(aSuffix, 10);
    const bNum = parseInt(bSuffix, 10);

    if (!isNaN(aNum) && !isNaN(bNum)) {
      return aNum - bNum;
    }

    // Otherwise, sort alphabetically for non-size, non-numeric values
    return aSuffix.localeCompare(bSuffix);
  });
}

/**
 * Generates CSS custom properties from variables
 */
export async function generateCSS(): Promise<string> {
  const data = (await figma.clientStorage.getAsync(
    "variablesJson"
  )) as VariablesJson;

  if (!data || Object.keys(data).length === 0) {
    return "/* No variables found */";
  }

  let cssOutput = `@layer base {\n  :root {\n`;

  // Process each collection
  for (const collectionName in data) {
    const collection = data[collectionName];
    cssOutput += `  /* ${collectionName} */\n`;

    // Handle simple (non-moded) collections first
    if (Array.isArray(collection.variables)) {
      const sortedVariables = sortCSSVariables(collection.variables);
      sortedVariables.forEach((variable) => {
        const varName = processVariableName(variable.name, collectionName);
        const varValue = formatValueForCSS(
          variable.value,
          collection.type,
          collectionName,
          variable.name
        );
        cssOutput += `  --${varName}: ${varValue};\n`;
      });
    }
    // Handle collections with modes
    else if (collection.modes && collection.modes.length > 0) {
      // Add default mode variables to :root
      const defaultMode = collection.modes[0];
      const defaultModeVars = collection.variables[defaultMode];

      if (defaultModeVars) {
        const sortedModeVars = sortCSSVariables(defaultModeVars);
        sortedModeVars.forEach((variable) => {
          const varName = processVariableName(variable.name, collectionName);
          const varValue = formatValueForCSS(
            variable.value,
            collection.type,
            collectionName,
            variable.name
          );
          cssOutput += `  --${varName}: ${varValue};\n`;
        });
      }
    }
  }

  cssOutput += `}\n}\n\n`;

  // Process modes for each collection with theme variants
  for (const collectionName in data) {
    const collection = data[collectionName];

    if (
      collection.modes &&
      collection.modes.length > 1 &&
      typeof collection.variables === "object" &&
      !Array.isArray(collection.variables)
    ) {
      // Skip the first mode as it's already in :root
      for (let i = 1; i < collection.modes.length; i++) {
        const modeName = collection.modes[i];
        const modeVars = collection.variables[modeName];

        if (modeVars) {
          cssOutput += `@layer base {\n  .${sanitizeName(modeName)} {\n`;

          const sortedModeVars = sortCSSVariables(modeVars);
          sortedModeVars.forEach((variable) => {
            const varName = processVariableName(variable.name, collectionName);
            const varValue = formatValueForCSS(
              variable.value,
              collection.type,
              collectionName,
              variable.name
            );
            cssOutput += `  --${varName}: ${varValue};\n`;
          });

          cssOutput += `  }\n}\n\n`;
        }
      }
    }
  }

  return cssOutput;
}

async function downloadCSS() {
  const cssContent = await generateCSS();
  figma.ui.postMessage({ type: "download-css", data: cssContent });
}

export default downloadCSS;
