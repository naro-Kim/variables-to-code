import { VariablesJson } from "@src/types";
import { sanitizeName } from "./parser";

// Categories for Tailwind config
type TailwindCategory =
  | "spacing"
  | "colors"
  | "fontSize"
  | "fontWeight"
  | "fontFamily"
  | "borderRadius"
  | "borderWidth"
  | "boxShadow"
  | "opacity"
  | "zIndex";

/**
 * Maps category prefixes to Tailwind theme categories
 */
const categoryMapping: Record<string, TailwindCategory> = {
  spacing: "spacing",
  space: "spacing",
  size: "spacing",
  gap: "spacing",
  pad: "spacing",
  margin: "spacing",
  width: "spacing",
  height: "spacing",
  color: "colors",
  bg: "colors",
  "border-color": "colors",
  "text-color": "colors",
  background: "colors",
  "font-size": "fontSize",
  text: "fontSize",
  "font-weight": "fontWeight",
  weight: "fontWeight",
  "font-family": "fontFamily",
  family: "fontFamily",
  radius: "borderRadius",
  rounded: "borderRadius",
  "border-width": "borderWidth",
  border: "borderWidth",
  shadow: "boxShadow",
  opacity: "opacity",
  z: "zIndex",
  "z-index": "zIndex",
};

/**
 * Determines the Tailwind category based on variable name and collection
 */
function determineTailwindCategory(
  variableName: string,
  collectionName: string
): TailwindCategory | null {
  const name = sanitizeName(variableName);

  // First check collection name for category clues
  const collectionLower = collectionName.toLowerCase();

  if (collectionLower.includes("color")) return "colors";
  if (collectionLower.includes("spacing")) return "spacing";
  if (collectionLower.includes("font") && collectionLower.includes("size"))
    return "fontSize";
  if (collectionLower.includes("font") && collectionLower.includes("weight"))
    return "fontWeight";
  if (collectionLower.includes("font") && collectionLower.includes("family"))
    return "fontFamily";
  if (collectionLower.includes("radius") || collectionLower.includes("rounded"))
    return "borderRadius";
  if (collectionLower.includes("shadow")) return "boxShadow";

  // Then check variable name prefixes
  for (const prefix in categoryMapping) {
    if (name.startsWith(prefix)) {
      return categoryMapping[prefix];
    }
  }

  // Special cases for colors with standard patterns
  if (
    /^(primary|secondary|accent|neutral|success|warning|error|info)(-\d+)?$/.test(
      name
    )
  ) {
    return "colors";
  }

  // Check if the variable might be a spacing value based on naming patterns
  if (/^(xs|sm|md|lg|xl|2xl|3xl)$/.test(name) || /^(\d+)$/.test(name)) {
    return "spacing";
  }

  return null;
}

/**
 * Gets the key to use in the Tailwind config
 */
function getTailwindKey(
  variableName: string,
  category: TailwindCategory
): string {
  const name = sanitizeName(variableName);

  // Strip common prefixes based on category
  for (const prefix in categoryMapping) {
    if (categoryMapping[prefix] === category && name.startsWith(prefix + "-")) {
      return name.substring(prefix.length + 1); // +1 for the hyphen
    }
  }

  return name;
}

/**
 * Generates Tailwind config from CSS variables
 */
async function generateTailwindConfig(): Promise<string> {
  const data = (await figma.clientStorage.getAsync(
    "variablesJson"
  )) as VariablesJson;

  if (!data || Object.keys(data).length === 0) {
    return "/* No variables found */\nmodule.exports = { theme: { extend: {} } };";
  }

  // Initialize the Tailwind theme structure
  const tailwindTheme: Record<string, Record<string, string>> = {};

  // Process each collection and add variables to appropriate category
  for (const collectionName in data) {
    const collection = data[collectionName];

    // Function to process variables regardless of collection mode structure
    const processVariables = (
      variables: Array<{ name: string; value: unknown }>
    ) => {
      variables.forEach((variable) => {
        const category = determineTailwindCategory(
          variable.name,
          collectionName
        );
        if (!category) return; // Skip if we can't determine a category

        // Initialize the category if it doesn't exist
        if (!tailwindTheme[category]) {
          tailwindTheme[category] = {};
        }

        // Get the key to use in Tailwind theme
        const key = getTailwindKey(variable.name, category);

        // Add the variable with CSS var() reference
        const varName = sanitizeName(variable.name);
        if (collectionName.toLowerCase().includes("color primitive")) {
          // For Color Primitives, strip the prefix
          const parts = varName.split("-");
          if (parts.length > 1) {
            tailwindTheme[category][key] = `var(--${parts.slice(1).join("-")})`;
          } else {
            tailwindTheme[category][key] = `var(--${varName})`;
          }
        } else {
          tailwindTheme[category][key] = `var(--${varName})`;
        }
      });
    };

    // Handle simple (non-moded) collections
    if (Array.isArray(collection.variables)) {
      processVariables(collection.variables);
    }
    // Handle collections with modes - just use the default mode
    else if (collection.modes && collection.modes.length > 0) {
      const defaultMode = collection.modes[0];
      const defaultModeVars = collection.variables[defaultMode];

      if (defaultModeVars) {
        processVariables(defaultModeVars);
      }
    }
  }

  // Generate the tailwind.config.js content
  let configContent = "module.exports = {\n  theme: {\n    extend: {";

  // Add each category
  for (const category in tailwindTheme) {
    configContent += `\n      ${category}: {`;

    // Add each variable in the category
    for (const key in tailwindTheme[category]) {
      configContent += `\n        "${key}": "${tailwindTheme[category][key]}",`;
    }

    // Remove trailing comma and close the category
    configContent = configContent.slice(0, -1);
    configContent += "\n      },";
  }

  // Remove trailing comma and close the config
  if (Object.keys(tailwindTheme).length > 0) {
    configContent = configContent.slice(0, -1);
  }

  configContent += "\n    }\n  }\n};";

  return configContent;
}

async function downloadTailwindConfig() {
  const configContent = await generateTailwindConfig();
  figma.ui.postMessage({ type: "download-config", data: configContent });
}

export default downloadTailwindConfig;
