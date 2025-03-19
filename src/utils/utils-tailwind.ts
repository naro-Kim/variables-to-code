import { VariablesJson } from "@src/types";
import { sanitizeName } from "./parser";

// Categories for Tailwind config
type TailwindCategory =
  | "spacing"
  | "colors"
  | "fontSize"
  | "fontFamily"
  | "borderRadius"
  | "borderWidth"
  | "boxShadow"
  | "opacity"
  | "zIndex"
  | "screens";

/**
 * Maps category prefixes to Tailwind theme categories
 */
const categoryMapping: Record<string, TailwindCategory> = {
  breakpoint: "screens",
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
  let category: TailwindCategory | null = null;
  // First check collection name for category clues
  const collectionLower = collectionName.toLowerCase();
  if (collectionLower.includes("color")) category = "colors";
  if (collectionLower.includes("spacing")) category = "spacing";

  // Special cases for font properties
  if (collectionLower.includes("type set") && variableName.includes("size"))
    category = "fontSize";
  if (collectionLower.includes("type set") && variableName.includes("family"))
    category = "fontFamily";

  // Special cases for border properties
  if (collectionLower.includes("tokens") || variableName.includes("rounded"))
    category = "borderRadius";
  if (collectionLower.includes("shadow")) category = "boxShadow";

  // Then check variable name prefixes
  for (const prefix in categoryMapping) {
    if (name.startsWith(prefix)) {
      category = categoryMapping[prefix];
    }
  }

  // Special cases for colors with standard patterns
  if (
    /^(primary|secondary|accent|neutral|success|warning|error|info)(-\d+)?$/.test(
      name
    )
  ) {
    category = "colors";
  }

  // Check if the variable might be a spacing value based on naming patterns
  if (/^(xs|sm|md|lg|xl|2xl|3xl)$/.test(name) || /^(\d+)$/.test(name)) {
    category = "spacing";
  }

  return category;
}

/**
 * Gets the key to use in the Tailwind config
 */
function getTailwindKey(
  variableName: string,
  category: TailwindCategory
): string {
  const name = sanitizeName(variableName);

  if (category === "spacing") {
    for (const prefix of ["breakpoint-", "breakpoints-", "screens-"]) {
      if (name.startsWith(prefix)) {
        return name.substring(prefix.length);
      }
    }
  }

  // Special handling for colors - strip color prefix
  if (category === "colors") {
    for (const prefix of ["colors-", "bg-", "background-", "text-", "brand-"]) {
      if (name.startsWith(prefix)) {
        return name.substring(prefix.length);
      }
    }
  }

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
    if (collectionName.toLowerCase() === "tokens") continue; // Skip token collection

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

        // Updated size token check with more comprehensive patterns
        if (category === "spacing") {
          const breakpointPattern =
            /^(breakpoint-)?(xs|sm|md|lg|xl|2xl|3xl|4xl|\d+)$/;
          if (breakpointPattern.test(varName)) {
            tailwindTheme["screens"][key] = `var(--${varName})`;
          }
        }

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
  let configContent =
    'module.exports = {\n  content: [\n    "./components/**/*.{js,ts,jsx,tsx,mdx}",\n    "./pages/**/*.{js,ts,jsx,tsx,mdx}",\n    "./app/**/*.{js,ts,jsx,tsx,mdx}",\n    "./src/**/*.{js,ts,jsx,tsx,mdx}",\n],\ntheme: {\n    extend: {';

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
