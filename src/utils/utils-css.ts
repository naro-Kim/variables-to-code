/* eslint-disable @typescript-eslint/no-explicit-any */
import { VariablesJson } from "@src/types";
import { hslValueToString, rgbToHsl } from "./parser";

/**
 * Formats a variable value into a CSS-compatible string
 */
function formatValueForCSS(value: any, type: string | undefined): string {
  if (value === null || value === undefined) {
    return "initial";
  }

  if (typeof value === "number") {
    // Handle spacing, sizing values
    if (type === "FLOAT" || type === "INTEGER") {
      return `${value}px`;
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
 * Sanitizes a name for CSS variable use
 */
function sanitizeNameForCSS(name: string): string {
  // Replace spaces and special characters with dashes
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-") // Replace multiple consecutive dashes with a single dash
    .replace(/^-|-$/g, ""); // Remove leading/trailing dashes
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

  let cssOutput = `:root {\n`;

  // Process each collection
  for (const collectionName in data) {
    const collection = data[collectionName];
    cssOutput += `  /* ${collectionName} */\n`;

    // Handle simple (non-moded) collections first
    if (Array.isArray(collection.variables)) {
      collection.variables.forEach((variable) => {
        const varName = sanitizeNameForCSS(
          `${collectionName}-${variable.name}`
        );
        const varValue = formatValueForCSS(variable.value, collection.type);
        cssOutput += `  --${varName}: ${varValue};\n`;
      });
    }
    // Handle collections with modes
    else if (collection.modes && collection.modes.length > 0) {
      // Add default mode variables to :root

      const defaultMode = collection.modes[0];
      const defaultModeVars = collection.variables[defaultMode];

      if (defaultModeVars) {
        defaultModeVars.forEach((variable) => {
          const varName = sanitizeNameForCSS(
            `${collectionName}-${variable.name}`
          );
          const varValue = formatValueForCSS(variable.value, collection.type);
          cssOutput += `  --${varName}: ${varValue};\n`;
        });
      }
    }
  }

  cssOutput += `}\n\n`;

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
          cssOutput += `[data-theme="${sanitizeNameForCSS(modeName)}"] {\n`;

          modeVars.forEach((variable) => {
            const varName = sanitizeNameForCSS(
              `${collectionName}-${variable.name}`
            );
            const varValue = formatValueForCSS(variable.value, collection.type);
            cssOutput += `  --${varName}: ${varValue};\n`;
          });

          cssOutput += `}\n\n`;
        }
      }
    }
  }

  return cssOutput;
}

export async function exportCSS() {
  const cssContent = await generateCSS();
  figma.ui.postMessage({ type: "export-css", data: cssContent });
}

export async function downloadCSS() {
  const cssContent = await generateCSS();
  figma.ui.postMessage({ type: "download-css", data: cssContent });
}
