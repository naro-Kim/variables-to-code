/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/utils/constant.ts":
/*!*******************************!*\
  !*** ./src/utils/constant.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fontWeightValues: () => (/* binding */ fontWeightValues),
/* harmony export */   sizeOrderRank: () => (/* binding */ sizeOrderRank)
/* harmony export */ });
const sizeOrderRank = {
    "2xs": 1,
    xs: 2,
    sm: 3,
    base: 4,
    md: 5,
    lg: 6,
    xl: 7,
    "2xl": 8,
    "3xl": 9,
};
// Font weight values - used to identify which numeric values should NOT be converted to rem
const fontWeightValues = new Set([
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900",
    "thin",
    "extralight",
    "light",
    "normal",
    "medium",
    "semibold",
    "bold",
    "extrabold",
    "black",
]);


/***/ }),

/***/ "./src/utils/index.ts":
/*!****************************!*\
  !*** ./src/utils/index.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   downloadCSS: () => (/* reexport safe */ _utils_css__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   downloadJSON: () => (/* reexport safe */ _utils_json__WEBPACK_IMPORTED_MODULE_1__.downloadJSON),
/* harmony export */   downloadTailwindConfig: () => (/* reexport safe */ _utils_tailwind__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   exportJSON: () => (/* reexport safe */ _utils_json__WEBPACK_IMPORTED_MODULE_1__.exportJSON)
/* harmony export */ });
/* harmony import */ var _utils_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils-css */ "./src/utils/utils-css.ts");
/* harmony import */ var _utils_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils-json */ "./src/utils/utils-json.ts");
/* harmony import */ var _utils_tailwind__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils-tailwind */ "./src/utils/utils-tailwind.ts");






/***/ }),

/***/ "./src/utils/parser.ts":
/*!*****************************!*\
  !*** ./src/utils/parser.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   hslValueToString: () => (/* binding */ hslValueToString),
/* harmony export */   pxToRem: () => (/* binding */ pxToRem),
/* harmony export */   rgbToHsl: () => (/* binding */ rgbToHsl),
/* harmony export */   sanitizeName: () => (/* binding */ sanitizeName)
/* harmony export */ });
const rgbToHsl = ({ r, g, b }) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;
    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }
    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100),
    };
};
const hslValueToString = ({ h, s, l }) => `${h}, ${s}%, ${l}%`;
const pxToRem = (px, base = 16) => {
    if (px % 4 === 0) {
        return `${px / 4}rem`; // Convert to Tailwind's 0.25rem units
    }
    return `${px / base}rem`;
};
const sanitizeName = (name) => {
    // Replace spaces and special characters with dashes
    return name
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "-")
        .replace(/-+/g, "-") // Replace multiple consecutive dashes with a single dash
        .replace(/^-|-$/g, ""); // Remove leading/trailing dashes
};


/***/ }),

/***/ "./src/utils/utils-css.ts":
/*!********************************!*\
  !*** ./src/utils/utils-css.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   generateCSS: () => (/* binding */ generateCSS)
/* harmony export */ });
/* harmony import */ var _constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constant */ "./src/utils/constant.ts");
/* harmony import */ var _parser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parser */ "./src/utils/parser.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


/**
 * Formats a variable value into a CSS-compatible string
 */
function formatValueForCSS(value, type, collectionName, variableName) {
    if (value === null || value === undefined) {
        return "initial";
    }
    if (typeof value === "number") {
        if (value === 0) {
            return "0";
        }
        // Special case 1: If collection is spacing, convert to rem
        if (collectionName.toLowerCase().includes("spacing")) {
            return (0,_parser__WEBPACK_IMPORTED_MODULE_1__.pxToRem)(value);
        }
        // Special case 2: If numeric and not font weight property, convert to rem
        const nameLower = variableName.toLowerCase();
        const isFontWeight = nameLower.includes("weight") ||
            (nameLower.includes("font") && _constant__WEBPACK_IMPORTED_MODULE_0__.fontWeightValues.has(String(value)));
        if (!isFontWeight) {
            // For spacing, sizing values, convert to rem
            return (0,_parser__WEBPACK_IMPORTED_MODULE_1__.pxToRem)(value);
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
            const hsl = (0,_parser__WEBPACK_IMPORTED_MODULE_1__.rgbToHsl)({ r: r * 255, g: g * 255, b: b * 255 });
            if (a < 1) {
                return `hsla(${(0,_parser__WEBPACK_IMPORTED_MODULE_1__.hslValueToString)(hsl)}, ${a.toFixed(2)})`;
            }
            return `hsl(${(0,_parser__WEBPACK_IMPORTED_MODULE_1__.hslValueToString)(hsl)})`;
        }
    }
    return JSON.stringify(value);
}
/**
 * Process variable name based on collection
 * For Color Primitives, remove the prefix
 */
function processVariableName(name, collectionName) {
    const sanitized = (0,_parser__WEBPACK_IMPORTED_MODULE_1__.sanitizeName)(name);
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
function sortCSSVariables(variables) {
    return [...variables].sort((a, b) => {
        const aName = (0,_parser__WEBPACK_IMPORTED_MODULE_1__.sanitizeName)(a.name);
        const bName = (0,_parser__WEBPACK_IMPORTED_MODULE_1__.sanitizeName)(b.name);
        // Extract prefix (everything before the last dash)
        const aLastDashIndex = aName.lastIndexOf("-");
        const bLastDashIndex = bName.lastIndexOf("-");
        const aPrefix = aLastDashIndex !== -1 ? aName.substring(0, aLastDashIndex) : aName;
        const bPrefix = bLastDashIndex !== -1 ? bName.substring(0, bLastDashIndex) : bName;
        // First sort by prefix
        if (aPrefix !== bPrefix) {
            return aPrefix.localeCompare(bPrefix);
        }
        // Extract the last part (after the last dash)
        const aSuffix = aLastDashIndex !== -1 ? aName.substring(aLastDashIndex + 1) : "";
        const bSuffix = bLastDashIndex !== -1 ? bName.substring(bLastDashIndex + 1) : "";
        // Check if suffixes are size-related values
        const aIsSize = aSuffix in _constant__WEBPACK_IMPORTED_MODULE_0__.sizeOrderRank;
        const bIsSize = bSuffix in _constant__WEBPACK_IMPORTED_MODULE_0__.sizeOrderRank;
        // If both are size values, sort by size order
        if (aIsSize && bIsSize) {
            return _constant__WEBPACK_IMPORTED_MODULE_0__.sizeOrderRank[aSuffix] - _constant__WEBPACK_IMPORTED_MODULE_0__.sizeOrderRank[bSuffix];
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
function generateCSS() {
    return __awaiter(this, void 0, void 0, function* () {
        const data = (yield figma.clientStorage.getAsync("variablesJson"));
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
                    const varValue = formatValueForCSS(variable.value, collection.type, collectionName, variable.name);
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
                        const varValue = formatValueForCSS(variable.value, collection.type, collectionName, variable.name);
                        cssOutput += `  --${varName}: ${varValue};\n`;
                    });
                }
            }
        }
        cssOutput += `}\n}\n\n`;
        // Process modes for each collection with theme variants
        for (const collectionName in data) {
            const collection = data[collectionName];
            if (collection.modes &&
                collection.modes.length > 1 &&
                typeof collection.variables === "object" &&
                !Array.isArray(collection.variables)) {
                // Skip the first mode as it's already in :root
                for (let i = 1; i < collection.modes.length; i++) {
                    const modeName = collection.modes[i];
                    const modeVars = collection.variables[modeName];
                    if (modeVars) {
                        cssOutput += `@layer base {\n  .${(0,_parser__WEBPACK_IMPORTED_MODULE_1__.sanitizeName)(modeName)} {\n`;
                        const sortedModeVars = sortCSSVariables(modeVars);
                        sortedModeVars.forEach((variable) => {
                            const varName = processVariableName(variable.name, collectionName);
                            const varValue = formatValueForCSS(variable.value, collection.type, collectionName, variable.name);
                            cssOutput += `  --${varName}: ${varValue};\n`;
                        });
                        cssOutput += `  }\n}\n\n`;
                    }
                }
            }
        }
        return cssOutput;
    });
}
function downloadCSS() {
    return __awaiter(this, void 0, void 0, function* () {
        const cssContent = yield generateCSS();
        figma.ui.postMessage({ type: "download-css", data: cssContent });
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (downloadCSS);


/***/ }),

/***/ "./src/utils/utils-json.ts":
/*!*********************************!*\
  !*** ./src/utils/utils-json.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   downloadJSON: () => (/* binding */ downloadJSON),
/* harmony export */   exportJSON: () => (/* binding */ exportJSON),
/* harmony export */   getVariables: () => (/* binding */ getVariables)
/* harmony export */ });

var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * Resolves variable aliases recursively
 * @param value The variable value that might be an alias
 * @param variables All available variables for lookup
 * @param visitedIds Set of already visited variable IDs to prevent infinite recursion
 * @returns The resolved value
 */
function resolveVariableAlias(value, variables, visitedIds = new Set()) {
    // Check if the value is a variable alias
    if (typeof value === "object" &&
        value !== null &&
        "type" in value &&
        value.type === "VARIABLE_ALIAS") {
        const aliasValue = value;
        // Prevent circular references
        if (visitedIds.has(aliasValue.id)) {
            console.warn("Circular reference detected in variable aliases:", aliasValue.id);
            return value; // Return the original alias to avoid infinite recursion
        }
        // Find the referenced variable
        const referencedVariable = variables.find((v) => v.id === aliasValue.id);
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
function getVariables() {
    return __awaiter(this, void 0, void 0, function* () {
        const variables = yield figma.variables.getLocalVariablesAsync(); // 모든 Variables 가져오기
        const collections = yield figma.variables.getLocalVariableCollectionsAsync(); // 모든 Variables Collection 가져오기
        const tokenData = {};
        // Process each collection
        collections.forEach((collection) => {
            const collectionName = collection.name;
            if (!tokenData[collectionName]) {
                // Initialize the collection structure based on whether it has modes
                const hasModes = collection.modes.length > 1;
                tokenData[collectionName] = {
                    type: "", // Will be set later
                    variables: {}, // Will be set later
                };
                if (hasModes) {
                    // Add modes only if there are multiple modes
                    tokenData[collectionName].modes = collection.modes.map((mode) => mode.name);
                    tokenData[collectionName].variables = {};
                }
                else {
                    // For collections without multiple modes, initialize variables as array
                    tokenData[collectionName].variables = [];
                }
                // Find all variables belonging to this collection
                const collectionVariables = variables.filter((variable) => variable.variableCollectionId === collection.id);
                // Add type information if available (from the first variable)
                if (collectionVariables.length > 0) {
                    tokenData[collectionName].type = collectionVariables[0].resolvedType;
                }
                if (hasModes) {
                    // Process variables for each mode
                    collection.modes.forEach((mode) => {
                        const modeName = mode.name;
                        tokenData[collectionName].variables[modeName] = [];
                        // Add variable values for this mode
                        collectionVariables.forEach((variable) => {
                            const valueForMode = variable.valuesByMode[mode.modeId];
                            // Resolve any variable aliases
                            const resolvedValue = resolveVariableAlias(valueForMode, variables);
                            // Add the variable with its resolved value for this mode
                            tokenData[collectionName].variables[modeName].push({
                                name: variable.name,
                                id: variable.id,
                                value: resolvedValue,
                            });
                        });
                    });
                }
                else {
                    // For collections without multiple modes, just use the first mode
                    const defaultMode = collection.modes[0];
                    // Add variable values directly to the array
                    collectionVariables.forEach((variable) => {
                        const valueForMode = variable.valuesByMode[defaultMode.modeId];
                        // Resolve any variable aliases
                        const resolvedValue = resolveVariableAlias(valueForMode, variables);
                        // Add the variable with its resolved value
                        tokenData[collectionName].variables.push({
                            name: variable.name,
                            id: variable.id,
                            value: resolvedValue,
                        });
                    });
                }
            }
        });
        figma.clientStorage.setAsync("variablesJson", tokenData);
    });
}
function exportJSON() {
    return __awaiter(this, void 0, void 0, function* () {
        yield getVariables();
        const data = yield figma.clientStorage.getAsync("variablesJson");
        const jsonString = JSON.stringify(data, null, 2);
        figma.ui.postMessage({ type: "export-variables", data: jsonString });
    });
}
function downloadJSON() {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield figma.clientStorage.getAsync("variablesJson");
        const jsonString = JSON.stringify(data, null, 2);
        figma.ui.postMessage({ type: "download-variables", data: jsonString });
    });
}


/***/ }),

/***/ "./src/utils/utils-tailwind.ts":
/*!*************************************!*\
  !*** ./src/utils/utils-tailwind.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parser */ "./src/utils/parser.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

/**
 * Maps category prefixes to Tailwind theme categories
 */
const categoryMapping = {
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
function determineTailwindCategory(variableName, collectionName) {
    const name = (0,_parser__WEBPACK_IMPORTED_MODULE_0__.sanitizeName)(variableName);
    let category = null;
    // First check collection name for category clues
    const collectionLower = collectionName.toLowerCase();
    if (collectionLower.includes("color"))
        category = "colors";
    if (collectionLower.includes("spacing"))
        category = "spacing";
    // Special cases for font properties
    if (collectionLower.includes("type set") && variableName.includes("size"))
        category = "fontSize";
    if (collectionLower.includes("type set") && variableName.includes("family"))
        category = "fontFamily";
    // Special cases for border properties
    if (collectionLower.includes("tokens") || variableName.includes("rounded"))
        category = "borderRadius";
    if (collectionLower.includes("shadow"))
        category = "boxShadow";
    // Then check variable name prefixes
    for (const prefix in categoryMapping) {
        if (name.startsWith(prefix)) {
            category = categoryMapping[prefix];
        }
    }
    // Special cases for colors with standard patterns
    if (/^(primary|secondary|accent|neutral|success|warning|error|info)(-\d+)?$/.test(name)) {
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
function getTailwindKey(variableName, category) {
    const name = (0,_parser__WEBPACK_IMPORTED_MODULE_0__.sanitizeName)(variableName);
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
function generateTailwindConfig() {
    return __awaiter(this, void 0, void 0, function* () {
        const data = (yield figma.clientStorage.getAsync("variablesJson"));
        if (!data || Object.keys(data).length === 0) {
            return "/* No variables found */\nmodule.exports = { theme: { extend: {} } };";
        }
        // Initialize the Tailwind theme structure
        const tailwindTheme = {};
        // Process each collection and add variables to appropriate category
        for (const collectionName in data) {
            const collection = data[collectionName];
            if (collectionName.toLowerCase() === "tokens")
                continue; // Skip token collection
            // Function to process variables regardless of collection mode structure
            const processVariables = (variables) => {
                variables.forEach((variable) => {
                    const category = determineTailwindCategory(variable.name, collectionName);
                    if (!category)
                        return; // Skip if we can't determine a category
                    // Initialize the category if it doesn't exist
                    if (!tailwindTheme[category]) {
                        tailwindTheme[category] = {};
                    }
                    // Get the key to use in Tailwind theme
                    const key = getTailwindKey(variable.name, category);
                    // Add the variable with CSS var() reference
                    const varName = (0,_parser__WEBPACK_IMPORTED_MODULE_0__.sanitizeName)(variable.name);
                    // Updated size token check with more comprehensive patterns
                    if (category === "spacing") {
                        const breakpointPattern = /^(breakpoint-)?(xs|sm|md|lg|xl|2xl|3xl|4xl|\d+)$/;
                        if (breakpointPattern.test(varName)) {
                            tailwindTheme["screens"][key] = `var(--${varName})`;
                        }
                    }
                    if (collectionName.toLowerCase().includes("color primitive")) {
                        // For Color Primitives, strip the prefix
                        const parts = varName.split("-");
                        if (parts.length > 1) {
                            tailwindTheme[category][key] = `var(--${parts.slice(1).join("-")})`;
                        }
                        else {
                            tailwindTheme[category][key] = `var(--${varName})`;
                        }
                    }
                    else {
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
        let configContent = 'module.exports = {\n  content: [\n    "./components/**/*.{js,ts,jsx,tsx,mdx}",\n    "./pages/**/*.{js,ts,jsx,tsx,mdx}",\n    "./app/**/*.{js,ts,jsx,tsx,mdx}",\n    "./src/**/*.{js,ts,jsx,tsx,mdx}",\n],\ntheme: {\n    extend: {';
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
    });
}
function downloadTailwindConfig() {
    return __awaiter(this, void 0, void 0, function* () {
        const configContent = yield generateTailwindConfig();
        figma.ui.postMessage({ type: "download-config", data: configContent });
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (downloadTailwindConfig);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/utils/index.ts");

figma.on("run", _utils__WEBPACK_IMPORTED_MODULE_0__.exportJSON);
figma.showUI(__html__, { width: 480, height: 800 });
figma.ui.onmessage = (msg) => {
    const type = msg.type;
    switch (type) {
        case "download-variables":
            (0,_utils__WEBPACK_IMPORTED_MODULE_0__.downloadJSON)();
            break;
        case "download-css":
            (0,_utils__WEBPACK_IMPORTED_MODULE_0__.downloadCSS)();
            break;
        case "download-config":
            (0,_utils__WEBPACK_IMPORTED_MODULE_0__.downloadTailwindConfig)();
            break;
    }
};

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29kZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvQnNDO0FBQ2tCO0FBQ0Y7QUFDbUI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0hsRSxvQkFBb0IsU0FBUztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTyw0QkFBNEIsU0FBUyxRQUFRLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRTtBQUM1RDtBQUNQO0FBQ0Esa0JBQWtCLE9BQU8sTUFBTTtBQUMvQjtBQUNBLGNBQWMsVUFBVTtBQUN4QjtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDO0FBQ2hDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM5Q0EsaUJBQWlCLFNBQUksSUFBSSxTQUFJO0FBQzdCLDRCQUE0QiwrREFBK0QsaUJBQWlCO0FBQzVHO0FBQ0Esb0NBQW9DLE1BQU0sK0JBQStCLFlBQVk7QUFDckYsbUNBQW1DLE1BQU0sbUNBQW1DLFlBQVk7QUFDeEYsZ0NBQWdDO0FBQ2hDO0FBQ0EsS0FBSztBQUNMO0FBQzZEO0FBQ2dCO0FBQzdFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLGdEQUFPO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDLHVEQUFnQjtBQUMzRDtBQUNBO0FBQ0EsbUJBQW1CLGdEQUFPO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixpQkFBaUI7QUFDckMsd0JBQXdCLGlEQUFRLEdBQUcsb0NBQW9DO0FBQ3ZFO0FBQ0EsK0JBQStCLHlEQUFnQixNQUFNLElBQUksYUFBYTtBQUN0RTtBQUNBLDBCQUEwQix5REFBZ0IsTUFBTTtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IscURBQVk7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLHFEQUFZO0FBQ2xDLHNCQUFzQixxREFBWTtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyxvREFBYTtBQUNoRCxtQ0FBbUMsb0RBQWE7QUFDaEQ7QUFDQTtBQUNBLG1CQUFtQixvREFBYSxZQUFZLG9EQUFhO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0MsV0FBVztBQUNqRDtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsZ0JBQWdCO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxRQUFRLElBQUksVUFBVTtBQUM5RCxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0QyxRQUFRLElBQUksVUFBVTtBQUNsRSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLEdBQUc7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyw2QkFBNkI7QUFDN0Q7QUFDQTtBQUNBO0FBQ0EsbURBQW1ELE9BQU8scURBQVksYUFBYTtBQUNuRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdEQUFnRCxRQUFRLElBQUksVUFBVTtBQUN0RSx5QkFBeUI7QUFDekIseUNBQXlDLEdBQUc7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQix3Q0FBd0M7QUFDdkUsS0FBSztBQUNMO0FBQ0EsaUVBQWUsV0FBVyxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3JMZDtBQUNiLGlCQUFpQixTQUFJLElBQUksU0FBSTtBQUM3Qiw0QkFBNEIsK0RBQStELGlCQUFpQjtBQUM1RztBQUNBLG9DQUFvQyxNQUFNLCtCQUErQixZQUFZO0FBQ3JGLG1DQUFtQyxNQUFNLG1DQUFtQyxZQUFZO0FBQ3hGLGdDQUFnQztBQUNoQztBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0EsMEVBQTBFO0FBQzFFLHNGQUFzRjtBQUN0RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0IseUJBQXlCO0FBQ3pCLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsS0FBSztBQUNMO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQiw0Q0FBNEM7QUFDM0UsS0FBSztBQUNMO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsOENBQThDO0FBQzdFLEtBQUs7QUFDTDs7Ozs7Ozs7Ozs7Ozs7OztBQ25JQSxpQkFBaUIsU0FBSSxJQUFJLFNBQUk7QUFDN0IsNEJBQTRCLCtEQUErRCxpQkFBaUI7QUFDNUc7QUFDQSxvQ0FBb0MsTUFBTSwrQkFBK0IsWUFBWTtBQUNyRixtQ0FBbUMsTUFBTSxtQ0FBbUMsWUFBWTtBQUN4RixnQ0FBZ0M7QUFDaEM7QUFDQSxLQUFLO0FBQ0w7QUFDd0M7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixxREFBWTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixxREFBWTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzREFBc0Q7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlFQUFpRSxTQUFTLGVBQWU7QUFDekY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyxxREFBWTtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFFQUFxRSxRQUFRO0FBQzdFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9FQUFvRSx5QkFBeUI7QUFDN0Y7QUFDQTtBQUNBLG9FQUFvRSxRQUFRO0FBQzVFO0FBQ0E7QUFDQTtBQUNBLGdFQUFnRSxRQUFRO0FBQ3hFO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDQUErQyx3Q0FBd0Msa0JBQWtCLHVCQUF1QixrQkFBa0IscUJBQXFCLGtCQUFrQixxQkFBcUIsa0JBQWtCLGdCQUFnQixlQUFlO0FBQy9QO0FBQ0E7QUFDQSx3Q0FBd0MsU0FBUyxHQUFHO0FBQ3BEO0FBQ0E7QUFDQSwrQ0FBK0MsSUFBSSxNQUFNLDZCQUE2QjtBQUN0RjtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUM7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyxLQUFLLElBQUk7QUFDMUM7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsOENBQThDO0FBQzdFLEtBQUs7QUFDTDtBQUNBLGlFQUFlLHNCQUFzQixFQUFDOzs7Ozs7O1VDdk10QztVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTnlGO0FBQ3pGLGdCQUFnQiw4Q0FBVTtBQUMxQix5QkFBeUIseUJBQXlCO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxvREFBWTtBQUN4QjtBQUNBO0FBQ0EsWUFBWSxtREFBVztBQUN2QjtBQUNBO0FBQ0EsWUFBWSw4REFBc0I7QUFDbEM7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdmFyaWFibGVzLXRvLWNvZGUvLi9zcmMvdXRpbHMvY29uc3RhbnQudHMiLCJ3ZWJwYWNrOi8vdmFyaWFibGVzLXRvLWNvZGUvLi9zcmMvdXRpbHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vdmFyaWFibGVzLXRvLWNvZGUvLi9zcmMvdXRpbHMvcGFyc2VyLnRzIiwid2VicGFjazovL3ZhcmlhYmxlcy10by1jb2RlLy4vc3JjL3V0aWxzL3V0aWxzLWNzcy50cyIsIndlYnBhY2s6Ly92YXJpYWJsZXMtdG8tY29kZS8uL3NyYy91dGlscy91dGlscy1qc29uLnRzIiwid2VicGFjazovL3ZhcmlhYmxlcy10by1jb2RlLy4vc3JjL3V0aWxzL3V0aWxzLXRhaWx3aW5kLnRzIiwid2VicGFjazovL3ZhcmlhYmxlcy10by1jb2RlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3ZhcmlhYmxlcy10by1jb2RlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly92YXJpYWJsZXMtdG8tY29kZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3ZhcmlhYmxlcy10by1jb2RlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdmFyaWFibGVzLXRvLWNvZGUvLi9zcmMvbWFpbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3Qgc2l6ZU9yZGVyUmFuayA9IHtcbiAgICBcIjJ4c1wiOiAxLFxuICAgIHhzOiAyLFxuICAgIHNtOiAzLFxuICAgIGJhc2U6IDQsXG4gICAgbWQ6IDUsXG4gICAgbGc6IDYsXG4gICAgeGw6IDcsXG4gICAgXCIyeGxcIjogOCxcbiAgICBcIjN4bFwiOiA5LFxufTtcbi8vIEZvbnQgd2VpZ2h0IHZhbHVlcyAtIHVzZWQgdG8gaWRlbnRpZnkgd2hpY2ggbnVtZXJpYyB2YWx1ZXMgc2hvdWxkIE5PVCBiZSBjb252ZXJ0ZWQgdG8gcmVtXG5leHBvcnQgY29uc3QgZm9udFdlaWdodFZhbHVlcyA9IG5ldyBTZXQoW1xuICAgIFwiMTAwXCIsXG4gICAgXCIyMDBcIixcbiAgICBcIjMwMFwiLFxuICAgIFwiNDAwXCIsXG4gICAgXCI1MDBcIixcbiAgICBcIjYwMFwiLFxuICAgIFwiNzAwXCIsXG4gICAgXCI4MDBcIixcbiAgICBcIjkwMFwiLFxuICAgIFwidGhpblwiLFxuICAgIFwiZXh0cmFsaWdodFwiLFxuICAgIFwibGlnaHRcIixcbiAgICBcIm5vcm1hbFwiLFxuICAgIFwibWVkaXVtXCIsXG4gICAgXCJzZW1pYm9sZFwiLFxuICAgIFwiYm9sZFwiLFxuICAgIFwiZXh0cmFib2xkXCIsXG4gICAgXCJibGFja1wiLFxuXSk7XG4iLCJpbXBvcnQgZG93bmxvYWRDU1MgZnJvbSBcIi4vdXRpbHMtY3NzXCI7XG5pbXBvcnQgeyBkb3dubG9hZEpTT04sIGV4cG9ydEpTT04gfSBmcm9tIFwiLi91dGlscy1qc29uXCI7XG5pbXBvcnQgZG93bmxvYWRUYWlsd2luZENvbmZpZyBmcm9tIFwiLi91dGlscy10YWlsd2luZFwiO1xuZXhwb3J0IHsgZG93bmxvYWRDU1MsIGRvd25sb2FkSlNPTiwgZG93bmxvYWRUYWlsd2luZENvbmZpZywgZXhwb3J0SlNPTiB9O1xuIiwiZXhwb3J0IGNvbnN0IHJnYlRvSHNsID0gKHsgciwgZywgYiB9KSA9PiB7XG4gICAgciAvPSAyNTU7XG4gICAgZyAvPSAyNTU7XG4gICAgYiAvPSAyNTU7XG4gICAgY29uc3QgbWF4ID0gTWF0aC5tYXgociwgZywgYik7XG4gICAgY29uc3QgbWluID0gTWF0aC5taW4ociwgZywgYik7XG4gICAgbGV0IGggPSAwO1xuICAgIGxldCBzID0gMDtcbiAgICBjb25zdCBsID0gKG1heCArIG1pbikgLyAyO1xuICAgIGlmIChtYXggIT09IG1pbikge1xuICAgICAgICBjb25zdCBkID0gbWF4IC0gbWluO1xuICAgICAgICBzID0gbCA+IDAuNSA/IGQgLyAoMiAtIG1heCAtIG1pbikgOiBkIC8gKG1heCArIG1pbik7XG4gICAgICAgIHN3aXRjaCAobWF4KSB7XG4gICAgICAgICAgICBjYXNlIHI6XG4gICAgICAgICAgICAgICAgaCA9IChnIC0gYikgLyBkICsgKGcgPCBiID8gNiA6IDApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBnOlxuICAgICAgICAgICAgICAgIGggPSAoYiAtIHIpIC8gZCArIDI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGI6XG4gICAgICAgICAgICAgICAgaCA9IChyIC0gZykgLyBkICsgNDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBoIC89IDY7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIGg6IE1hdGgucm91bmQoaCAqIDM2MCksXG4gICAgICAgIHM6IE1hdGgucm91bmQocyAqIDEwMCksXG4gICAgICAgIGw6IE1hdGgucm91bmQobCAqIDEwMCksXG4gICAgfTtcbn07XG5leHBvcnQgY29uc3QgaHNsVmFsdWVUb1N0cmluZyA9ICh7IGgsIHMsIGwgfSkgPT4gYCR7aH0sICR7c30lLCAke2x9JWA7XG5leHBvcnQgY29uc3QgcHhUb1JlbSA9IChweCwgYmFzZSA9IDE2KSA9PiB7XG4gICAgaWYgKHB4ICUgNCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gYCR7cHggLyA0fXJlbWA7IC8vIENvbnZlcnQgdG8gVGFpbHdpbmQncyAwLjI1cmVtIHVuaXRzXG4gICAgfVxuICAgIHJldHVybiBgJHtweCAvIGJhc2V9cmVtYDtcbn07XG5leHBvcnQgY29uc3Qgc2FuaXRpemVOYW1lID0gKG5hbWUpID0+IHtcbiAgICAvLyBSZXBsYWNlIHNwYWNlcyBhbmQgc3BlY2lhbCBjaGFyYWN0ZXJzIHdpdGggZGFzaGVzXG4gICAgcmV0dXJuIG5hbWVcbiAgICAgICAgLnRyaW0oKVxuICAgICAgICAudG9Mb3dlckNhc2UoKVxuICAgICAgICAucmVwbGFjZSgvW15hLXowLTldL2csIFwiLVwiKVxuICAgICAgICAucmVwbGFjZSgvLSsvZywgXCItXCIpIC8vIFJlcGxhY2UgbXVsdGlwbGUgY29uc2VjdXRpdmUgZGFzaGVzIHdpdGggYSBzaW5nbGUgZGFzaFxuICAgICAgICAucmVwbGFjZSgvXi18LSQvZywgXCJcIik7IC8vIFJlbW92ZSBsZWFkaW5nL3RyYWlsaW5nIGRhc2hlc1xufTtcbiIsInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuaW1wb3J0IHsgZm9udFdlaWdodFZhbHVlcywgc2l6ZU9yZGVyUmFuayB9IGZyb20gXCIuL2NvbnN0YW50XCI7XG5pbXBvcnQgeyBoc2xWYWx1ZVRvU3RyaW5nLCBweFRvUmVtLCByZ2JUb0hzbCwgc2FuaXRpemVOYW1lIH0gZnJvbSBcIi4vcGFyc2VyXCI7XG4vKipcbiAqIEZvcm1hdHMgYSB2YXJpYWJsZSB2YWx1ZSBpbnRvIGEgQ1NTLWNvbXBhdGlibGUgc3RyaW5nXG4gKi9cbmZ1bmN0aW9uIGZvcm1hdFZhbHVlRm9yQ1NTKHZhbHVlLCB0eXBlLCBjb2xsZWN0aW9uTmFtZSwgdmFyaWFibGVOYW1lKSB7XG4gICAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIFwiaW5pdGlhbFwiO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiKSB7XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIFwiMFwiO1xuICAgICAgICB9XG4gICAgICAgIC8vIFNwZWNpYWwgY2FzZSAxOiBJZiBjb2xsZWN0aW9uIGlzIHNwYWNpbmcsIGNvbnZlcnQgdG8gcmVtXG4gICAgICAgIGlmIChjb2xsZWN0aW9uTmFtZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKFwic3BhY2luZ1wiKSkge1xuICAgICAgICAgICAgcmV0dXJuIHB4VG9SZW0odmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFNwZWNpYWwgY2FzZSAyOiBJZiBudW1lcmljIGFuZCBub3QgZm9udCB3ZWlnaHQgcHJvcGVydHksIGNvbnZlcnQgdG8gcmVtXG4gICAgICAgIGNvbnN0IG5hbWVMb3dlciA9IHZhcmlhYmxlTmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBjb25zdCBpc0ZvbnRXZWlnaHQgPSBuYW1lTG93ZXIuaW5jbHVkZXMoXCJ3ZWlnaHRcIikgfHxcbiAgICAgICAgICAgIChuYW1lTG93ZXIuaW5jbHVkZXMoXCJmb250XCIpICYmIGZvbnRXZWlnaHRWYWx1ZXMuaGFzKFN0cmluZyh2YWx1ZSkpKTtcbiAgICAgICAgaWYgKCFpc0ZvbnRXZWlnaHQpIHtcbiAgICAgICAgICAgIC8vIEZvciBzcGFjaW5nLCBzaXppbmcgdmFsdWVzLCBjb252ZXJ0IHRvIHJlbVxuICAgICAgICAgICAgcmV0dXJuIHB4VG9SZW0odmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZS50b1N0cmluZygpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gICAgLy8gSGFuZGxlIGNvbG9yIHZhbHVlc1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgaWYgKFwiclwiIGluIHZhbHVlICYmIFwiZ1wiIGluIHZhbHVlICYmIFwiYlwiIGluIHZhbHVlKSB7XG4gICAgICAgICAgICBjb25zdCB7IHIsIGcsIGIsIGEgPSAxIH0gPSB2YWx1ZTtcbiAgICAgICAgICAgIGNvbnN0IGhzbCA9IHJnYlRvSHNsKHsgcjogciAqIDI1NSwgZzogZyAqIDI1NSwgYjogYiAqIDI1NSB9KTtcbiAgICAgICAgICAgIGlmIChhIDwgMSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBgaHNsYSgke2hzbFZhbHVlVG9TdHJpbmcoaHNsKX0sICR7YS50b0ZpeGVkKDIpfSlgO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGBoc2woJHtoc2xWYWx1ZVRvU3RyaW5nKGhzbCl9KWA7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcbn1cbi8qKlxuICogUHJvY2VzcyB2YXJpYWJsZSBuYW1lIGJhc2VkIG9uIGNvbGxlY3Rpb25cbiAqIEZvciBDb2xvciBQcmltaXRpdmVzLCByZW1vdmUgdGhlIHByZWZpeFxuICovXG5mdW5jdGlvbiBwcm9jZXNzVmFyaWFibGVOYW1lKG5hbWUsIGNvbGxlY3Rpb25OYW1lKSB7XG4gICAgY29uc3Qgc2FuaXRpemVkID0gc2FuaXRpemVOYW1lKG5hbWUpO1xuICAgIC8vIENoZWNrIGlmIHRoaXMgYmVsb25ncyB0byBDb2xvciBQcmltaXRpdmVzIGNvbGxlY3Rpb25cbiAgICBpZiAoY29sbGVjdGlvbk5hbWUudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhcImNvbG9yIHByaW1pdGl2ZVwiKSkge1xuICAgICAgICBjb25zdCBwYXJ0cyA9IHNhbml0aXplZC5zcGxpdChcIi1cIik7XG4gICAgICAgIGlmIChwYXJ0cy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAvLyBSZW1vdmUgdGhlIGZpcnN0IHBhcnQgKHByZWZpeClcbiAgICAgICAgICAgIHJldHVybiBwYXJ0cy5zbGljZSgxKS5qb2luKFwiLVwiKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc2FuaXRpemVkO1xufVxuLyoqXG4gKiBTb3J0cyB2YXJpYWJsZXMgYnkgdGhlaXIgcHJlZml4IGFuZCBudW1lcmljIG9yZGVyIHdpdGhpbiBlYWNoIHByZWZpeCBncm91cFxuICovXG5mdW5jdGlvbiBzb3J0Q1NTVmFyaWFibGVzKHZhcmlhYmxlcykge1xuICAgIHJldHVybiBbLi4udmFyaWFibGVzXS5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgIGNvbnN0IGFOYW1lID0gc2FuaXRpemVOYW1lKGEubmFtZSk7XG4gICAgICAgIGNvbnN0IGJOYW1lID0gc2FuaXRpemVOYW1lKGIubmFtZSk7XG4gICAgICAgIC8vIEV4dHJhY3QgcHJlZml4IChldmVyeXRoaW5nIGJlZm9yZSB0aGUgbGFzdCBkYXNoKVxuICAgICAgICBjb25zdCBhTGFzdERhc2hJbmRleCA9IGFOYW1lLmxhc3RJbmRleE9mKFwiLVwiKTtcbiAgICAgICAgY29uc3QgYkxhc3REYXNoSW5kZXggPSBiTmFtZS5sYXN0SW5kZXhPZihcIi1cIik7XG4gICAgICAgIGNvbnN0IGFQcmVmaXggPSBhTGFzdERhc2hJbmRleCAhPT0gLTEgPyBhTmFtZS5zdWJzdHJpbmcoMCwgYUxhc3REYXNoSW5kZXgpIDogYU5hbWU7XG4gICAgICAgIGNvbnN0IGJQcmVmaXggPSBiTGFzdERhc2hJbmRleCAhPT0gLTEgPyBiTmFtZS5zdWJzdHJpbmcoMCwgYkxhc3REYXNoSW5kZXgpIDogYk5hbWU7XG4gICAgICAgIC8vIEZpcnN0IHNvcnQgYnkgcHJlZml4XG4gICAgICAgIGlmIChhUHJlZml4ICE9PSBiUHJlZml4KSB7XG4gICAgICAgICAgICByZXR1cm4gYVByZWZpeC5sb2NhbGVDb21wYXJlKGJQcmVmaXgpO1xuICAgICAgICB9XG4gICAgICAgIC8vIEV4dHJhY3QgdGhlIGxhc3QgcGFydCAoYWZ0ZXIgdGhlIGxhc3QgZGFzaClcbiAgICAgICAgY29uc3QgYVN1ZmZpeCA9IGFMYXN0RGFzaEluZGV4ICE9PSAtMSA/IGFOYW1lLnN1YnN0cmluZyhhTGFzdERhc2hJbmRleCArIDEpIDogXCJcIjtcbiAgICAgICAgY29uc3QgYlN1ZmZpeCA9IGJMYXN0RGFzaEluZGV4ICE9PSAtMSA/IGJOYW1lLnN1YnN0cmluZyhiTGFzdERhc2hJbmRleCArIDEpIDogXCJcIjtcbiAgICAgICAgLy8gQ2hlY2sgaWYgc3VmZml4ZXMgYXJlIHNpemUtcmVsYXRlZCB2YWx1ZXNcbiAgICAgICAgY29uc3QgYUlzU2l6ZSA9IGFTdWZmaXggaW4gc2l6ZU9yZGVyUmFuaztcbiAgICAgICAgY29uc3QgYklzU2l6ZSA9IGJTdWZmaXggaW4gc2l6ZU9yZGVyUmFuaztcbiAgICAgICAgLy8gSWYgYm90aCBhcmUgc2l6ZSB2YWx1ZXMsIHNvcnQgYnkgc2l6ZSBvcmRlclxuICAgICAgICBpZiAoYUlzU2l6ZSAmJiBiSXNTaXplKSB7XG4gICAgICAgICAgICByZXR1cm4gc2l6ZU9yZGVyUmFua1thU3VmZml4XSAtIHNpemVPcmRlclJhbmtbYlN1ZmZpeF07XG4gICAgICAgIH1cbiAgICAgICAgLy8gSWYgb25seSBvbmUgaXMgYSBzaXplIHZhbHVlLCBrZWVwIG9yaWdpbmFsIG9yZGVyXG4gICAgICAgIGlmIChhSXNTaXplICE9PSBiSXNTaXplKSB7XG4gICAgICAgICAgICAvLyBQcmVzZXJ2ZSB0aGUgb3JpZ2luYWwgb3JkZXIgYnkgcmV0dXJuaW5nIDBcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgICAgIC8vIElmIGJvdGggYXJlIG51bWVyaWMsIHNvcnQgbnVtZXJpY2FsbHlcbiAgICAgICAgY29uc3QgYU51bSA9IHBhcnNlSW50KGFTdWZmaXgsIDEwKTtcbiAgICAgICAgY29uc3QgYk51bSA9IHBhcnNlSW50KGJTdWZmaXgsIDEwKTtcbiAgICAgICAgaWYgKCFpc05hTihhTnVtKSAmJiAhaXNOYU4oYk51bSkpIHtcbiAgICAgICAgICAgIHJldHVybiBhTnVtIC0gYk51bTtcbiAgICAgICAgfVxuICAgICAgICAvLyBPdGhlcndpc2UsIHNvcnQgYWxwaGFiZXRpY2FsbHkgZm9yIG5vbi1zaXplLCBub24tbnVtZXJpYyB2YWx1ZXNcbiAgICAgICAgcmV0dXJuIGFTdWZmaXgubG9jYWxlQ29tcGFyZShiU3VmZml4KTtcbiAgICB9KTtcbn1cbi8qKlxuICogR2VuZXJhdGVzIENTUyBjdXN0b20gcHJvcGVydGllcyBmcm9tIHZhcmlhYmxlc1xuICovXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVDU1MoKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgY29uc3QgZGF0YSA9ICh5aWVsZCBmaWdtYS5jbGllbnRTdG9yYWdlLmdldEFzeW5jKFwidmFyaWFibGVzSnNvblwiKSk7XG4gICAgICAgIGlmICghZGF0YSB8fCBPYmplY3Qua2V5cyhkYXRhKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBcIi8qIE5vIHZhcmlhYmxlcyBmb3VuZCAqL1wiO1xuICAgICAgICB9XG4gICAgICAgIGxldCBjc3NPdXRwdXQgPSBgQGxheWVyIGJhc2Uge1xcbiAgOnJvb3Qge1xcbmA7XG4gICAgICAgIC8vIFByb2Nlc3MgZWFjaCBjb2xsZWN0aW9uXG4gICAgICAgIGZvciAoY29uc3QgY29sbGVjdGlvbk5hbWUgaW4gZGF0YSkge1xuICAgICAgICAgICAgY29uc3QgY29sbGVjdGlvbiA9IGRhdGFbY29sbGVjdGlvbk5hbWVdO1xuICAgICAgICAgICAgY3NzT3V0cHV0ICs9IGAgIC8qICR7Y29sbGVjdGlvbk5hbWV9ICovXFxuYDtcbiAgICAgICAgICAgIC8vIEhhbmRsZSBzaW1wbGUgKG5vbi1tb2RlZCkgY29sbGVjdGlvbnMgZmlyc3RcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGNvbGxlY3Rpb24udmFyaWFibGVzKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNvcnRlZFZhcmlhYmxlcyA9IHNvcnRDU1NWYXJpYWJsZXMoY29sbGVjdGlvbi52YXJpYWJsZXMpO1xuICAgICAgICAgICAgICAgIHNvcnRlZFZhcmlhYmxlcy5mb3JFYWNoKCh2YXJpYWJsZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB2YXJOYW1lID0gcHJvY2Vzc1ZhcmlhYmxlTmFtZSh2YXJpYWJsZS5uYW1lLCBjb2xsZWN0aW9uTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhclZhbHVlID0gZm9ybWF0VmFsdWVGb3JDU1ModmFyaWFibGUudmFsdWUsIGNvbGxlY3Rpb24udHlwZSwgY29sbGVjdGlvbk5hbWUsIHZhcmlhYmxlLm5hbWUpO1xuICAgICAgICAgICAgICAgICAgICBjc3NPdXRwdXQgKz0gYCAgLS0ke3Zhck5hbWV9OiAke3ZhclZhbHVlfTtcXG5gO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gSGFuZGxlIGNvbGxlY3Rpb25zIHdpdGggbW9kZXNcbiAgICAgICAgICAgIGVsc2UgaWYgKGNvbGxlY3Rpb24ubW9kZXMgJiYgY29sbGVjdGlvbi5tb2Rlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgLy8gQWRkIGRlZmF1bHQgbW9kZSB2YXJpYWJsZXMgdG8gOnJvb3RcbiAgICAgICAgICAgICAgICBjb25zdCBkZWZhdWx0TW9kZSA9IGNvbGxlY3Rpb24ubW9kZXNbMF07XG4gICAgICAgICAgICAgICAgY29uc3QgZGVmYXVsdE1vZGVWYXJzID0gY29sbGVjdGlvbi52YXJpYWJsZXNbZGVmYXVsdE1vZGVdO1xuICAgICAgICAgICAgICAgIGlmIChkZWZhdWx0TW9kZVZhcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc29ydGVkTW9kZVZhcnMgPSBzb3J0Q1NTVmFyaWFibGVzKGRlZmF1bHRNb2RlVmFycyk7XG4gICAgICAgICAgICAgICAgICAgIHNvcnRlZE1vZGVWYXJzLmZvckVhY2goKHZhcmlhYmxlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB2YXJOYW1lID0gcHJvY2Vzc1ZhcmlhYmxlTmFtZSh2YXJpYWJsZS5uYW1lLCBjb2xsZWN0aW9uTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB2YXJWYWx1ZSA9IGZvcm1hdFZhbHVlRm9yQ1NTKHZhcmlhYmxlLnZhbHVlLCBjb2xsZWN0aW9uLnR5cGUsIGNvbGxlY3Rpb25OYW1lLCB2YXJpYWJsZS5uYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNzc091dHB1dCArPSBgICAtLSR7dmFyTmFtZX06ICR7dmFyVmFsdWV9O1xcbmA7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjc3NPdXRwdXQgKz0gYH1cXG59XFxuXFxuYDtcbiAgICAgICAgLy8gUHJvY2VzcyBtb2RlcyBmb3IgZWFjaCBjb2xsZWN0aW9uIHdpdGggdGhlbWUgdmFyaWFudHNcbiAgICAgICAgZm9yIChjb25zdCBjb2xsZWN0aW9uTmFtZSBpbiBkYXRhKSB7XG4gICAgICAgICAgICBjb25zdCBjb2xsZWN0aW9uID0gZGF0YVtjb2xsZWN0aW9uTmFtZV07XG4gICAgICAgICAgICBpZiAoY29sbGVjdGlvbi5tb2RlcyAmJlxuICAgICAgICAgICAgICAgIGNvbGxlY3Rpb24ubW9kZXMubGVuZ3RoID4gMSAmJlxuICAgICAgICAgICAgICAgIHR5cGVvZiBjb2xsZWN0aW9uLnZhcmlhYmxlcyA9PT0gXCJvYmplY3RcIiAmJlxuICAgICAgICAgICAgICAgICFBcnJheS5pc0FycmF5KGNvbGxlY3Rpb24udmFyaWFibGVzKSkge1xuICAgICAgICAgICAgICAgIC8vIFNraXAgdGhlIGZpcnN0IG1vZGUgYXMgaXQncyBhbHJlYWR5IGluIDpyb290XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBjb2xsZWN0aW9uLm1vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG1vZGVOYW1lID0gY29sbGVjdGlvbi5tb2Rlc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbW9kZVZhcnMgPSBjb2xsZWN0aW9uLnZhcmlhYmxlc1ttb2RlTmFtZV07XG4gICAgICAgICAgICAgICAgICAgIGlmIChtb2RlVmFycykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3NzT3V0cHV0ICs9IGBAbGF5ZXIgYmFzZSB7XFxuICAuJHtzYW5pdGl6ZU5hbWUobW9kZU5hbWUpfSB7XFxuYDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNvcnRlZE1vZGVWYXJzID0gc29ydENTU1ZhcmlhYmxlcyhtb2RlVmFycyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzb3J0ZWRNb2RlVmFycy5mb3JFYWNoKCh2YXJpYWJsZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhck5hbWUgPSBwcm9jZXNzVmFyaWFibGVOYW1lKHZhcmlhYmxlLm5hbWUsIGNvbGxlY3Rpb25OYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB2YXJWYWx1ZSA9IGZvcm1hdFZhbHVlRm9yQ1NTKHZhcmlhYmxlLnZhbHVlLCBjb2xsZWN0aW9uLnR5cGUsIGNvbGxlY3Rpb25OYW1lLCB2YXJpYWJsZS5uYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjc3NPdXRwdXQgKz0gYCAgLS0ke3Zhck5hbWV9OiAke3ZhclZhbHVlfTtcXG5gO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjc3NPdXRwdXQgKz0gYCAgfVxcbn1cXG5cXG5gO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjc3NPdXRwdXQ7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBkb3dubG9hZENTUygpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBjb25zdCBjc3NDb250ZW50ID0geWllbGQgZ2VuZXJhdGVDU1MoKTtcbiAgICAgICAgZmlnbWEudWkucG9zdE1lc3NhZ2UoeyB0eXBlOiBcImRvd25sb2FkLWNzc1wiLCBkYXRhOiBjc3NDb250ZW50IH0pO1xuICAgIH0pO1xufVxuZXhwb3J0IGRlZmF1bHQgZG93bmxvYWRDU1M7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuLyoqXG4gKiBSZXNvbHZlcyB2YXJpYWJsZSBhbGlhc2VzIHJlY3Vyc2l2ZWx5XG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhcmlhYmxlIHZhbHVlIHRoYXQgbWlnaHQgYmUgYW4gYWxpYXNcbiAqIEBwYXJhbSB2YXJpYWJsZXMgQWxsIGF2YWlsYWJsZSB2YXJpYWJsZXMgZm9yIGxvb2t1cFxuICogQHBhcmFtIHZpc2l0ZWRJZHMgU2V0IG9mIGFscmVhZHkgdmlzaXRlZCB2YXJpYWJsZSBJRHMgdG8gcHJldmVudCBpbmZpbml0ZSByZWN1cnNpb25cbiAqIEByZXR1cm5zIFRoZSByZXNvbHZlZCB2YWx1ZVxuICovXG5mdW5jdGlvbiByZXNvbHZlVmFyaWFibGVBbGlhcyh2YWx1ZSwgdmFyaWFibGVzLCB2aXNpdGVkSWRzID0gbmV3IFNldCgpKSB7XG4gICAgLy8gQ2hlY2sgaWYgdGhlIHZhbHVlIGlzIGEgdmFyaWFibGUgYWxpYXNcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmXG4gICAgICAgIHZhbHVlICE9PSBudWxsICYmXG4gICAgICAgIFwidHlwZVwiIGluIHZhbHVlICYmXG4gICAgICAgIHZhbHVlLnR5cGUgPT09IFwiVkFSSUFCTEVfQUxJQVNcIikge1xuICAgICAgICBjb25zdCBhbGlhc1ZhbHVlID0gdmFsdWU7XG4gICAgICAgIC8vIFByZXZlbnQgY2lyY3VsYXIgcmVmZXJlbmNlc1xuICAgICAgICBpZiAodmlzaXRlZElkcy5oYXMoYWxpYXNWYWx1ZS5pZCkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcIkNpcmN1bGFyIHJlZmVyZW5jZSBkZXRlY3RlZCBpbiB2YXJpYWJsZSBhbGlhc2VzOlwiLCBhbGlhc1ZhbHVlLmlkKTtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTsgLy8gUmV0dXJuIHRoZSBvcmlnaW5hbCBhbGlhcyB0byBhdm9pZCBpbmZpbml0ZSByZWN1cnNpb25cbiAgICAgICAgfVxuICAgICAgICAvLyBGaW5kIHRoZSByZWZlcmVuY2VkIHZhcmlhYmxlXG4gICAgICAgIGNvbnN0IHJlZmVyZW5jZWRWYXJpYWJsZSA9IHZhcmlhYmxlcy5maW5kKCh2KSA9PiB2LmlkID09PSBhbGlhc1ZhbHVlLmlkKTtcbiAgICAgICAgaWYgKHJlZmVyZW5jZWRWYXJpYWJsZSkge1xuICAgICAgICAgICAgLy8gR2V0IHRoZSBhcHByb3ByaWF0ZSBtb2RlIElEIC0gdXNpbmcgdGhlIGZpcnN0IG1vZGUgYXMgZGVmYXVsdFxuICAgICAgICAgICAgY29uc3QgbW9kZUlkID0gT2JqZWN0LmtleXMocmVmZXJlbmNlZFZhcmlhYmxlLnZhbHVlc0J5TW9kZSlbMF07XG4gICAgICAgICAgICBpZiAobW9kZUlkKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVmZXJlbmNlZFZhbHVlID0gcmVmZXJlbmNlZFZhcmlhYmxlLnZhbHVlc0J5TW9kZVttb2RlSWRdO1xuICAgICAgICAgICAgICAgIC8vIFRyYWNrIHRoaXMgSUQgdG8gcHJldmVudCBjaXJjdWxhciByZWZlcmVuY2VzXG4gICAgICAgICAgICAgICAgdmlzaXRlZElkcy5hZGQoYWxpYXNWYWx1ZS5pZCk7XG4gICAgICAgICAgICAgICAgLy8gUmVjdXJzaXZlbHkgcmVzb2x2ZSBpbiBjYXNlIHRoZSByZWZlcmVuY2VkIHZhbHVlIGlzIGFsc28gYW4gYWxpYXNcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZVZhcmlhYmxlQWxpYXMocmVmZXJlbmNlZFZhbHVlLCB2YXJpYWJsZXMsIHZpc2l0ZWRJZHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8vIFJldHVybiBvcmlnaW5hbCB2YWx1ZSBpZiBpdCdzIG5vdCBhbiBhbGlhcyBvciByZWZlcmVuY2VkIHZhcmlhYmxlIG5vdCBmb3VuZFxuICAgIHJldHVybiB2YWx1ZTtcbn1cbi8vIFZhcmlhYmxlcyDrjbDsnbTthLAg6rCA7KC47Jik6riwXG5leHBvcnQgZnVuY3Rpb24gZ2V0VmFyaWFibGVzKCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGNvbnN0IHZhcmlhYmxlcyA9IHlpZWxkIGZpZ21hLnZhcmlhYmxlcy5nZXRMb2NhbFZhcmlhYmxlc0FzeW5jKCk7IC8vIOuqqOuToCBWYXJpYWJsZXMg6rCA7KC47Jik6riwXG4gICAgICAgIGNvbnN0IGNvbGxlY3Rpb25zID0geWllbGQgZmlnbWEudmFyaWFibGVzLmdldExvY2FsVmFyaWFibGVDb2xsZWN0aW9uc0FzeW5jKCk7IC8vIOuqqOuToCBWYXJpYWJsZXMgQ29sbGVjdGlvbiDqsIDsoLjsmKTquLBcbiAgICAgICAgY29uc3QgdG9rZW5EYXRhID0ge307XG4gICAgICAgIC8vIFByb2Nlc3MgZWFjaCBjb2xsZWN0aW9uXG4gICAgICAgIGNvbGxlY3Rpb25zLmZvckVhY2goKGNvbGxlY3Rpb24pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNvbGxlY3Rpb25OYW1lID0gY29sbGVjdGlvbi5uYW1lO1xuICAgICAgICAgICAgaWYgKCF0b2tlbkRhdGFbY29sbGVjdGlvbk5hbWVdKSB7XG4gICAgICAgICAgICAgICAgLy8gSW5pdGlhbGl6ZSB0aGUgY29sbGVjdGlvbiBzdHJ1Y3R1cmUgYmFzZWQgb24gd2hldGhlciBpdCBoYXMgbW9kZXNcbiAgICAgICAgICAgICAgICBjb25zdCBoYXNNb2RlcyA9IGNvbGxlY3Rpb24ubW9kZXMubGVuZ3RoID4gMTtcbiAgICAgICAgICAgICAgICB0b2tlbkRhdGFbY29sbGVjdGlvbk5hbWVdID0ge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIlwiLCAvLyBXaWxsIGJlIHNldCBsYXRlclxuICAgICAgICAgICAgICAgICAgICB2YXJpYWJsZXM6IHt9LCAvLyBXaWxsIGJlIHNldCBsYXRlclxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgaWYgKGhhc01vZGVzKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEFkZCBtb2RlcyBvbmx5IGlmIHRoZXJlIGFyZSBtdWx0aXBsZSBtb2Rlc1xuICAgICAgICAgICAgICAgICAgICB0b2tlbkRhdGFbY29sbGVjdGlvbk5hbWVdLm1vZGVzID0gY29sbGVjdGlvbi5tb2Rlcy5tYXAoKG1vZGUpID0+IG1vZGUubmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuRGF0YVtjb2xsZWN0aW9uTmFtZV0udmFyaWFibGVzID0ge307XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBGb3IgY29sbGVjdGlvbnMgd2l0aG91dCBtdWx0aXBsZSBtb2RlcywgaW5pdGlhbGl6ZSB2YXJpYWJsZXMgYXMgYXJyYXlcbiAgICAgICAgICAgICAgICAgICAgdG9rZW5EYXRhW2NvbGxlY3Rpb25OYW1lXS52YXJpYWJsZXMgPSBbXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gRmluZCBhbGwgdmFyaWFibGVzIGJlbG9uZ2luZyB0byB0aGlzIGNvbGxlY3Rpb25cbiAgICAgICAgICAgICAgICBjb25zdCBjb2xsZWN0aW9uVmFyaWFibGVzID0gdmFyaWFibGVzLmZpbHRlcigodmFyaWFibGUpID0+IHZhcmlhYmxlLnZhcmlhYmxlQ29sbGVjdGlvbklkID09PSBjb2xsZWN0aW9uLmlkKTtcbiAgICAgICAgICAgICAgICAvLyBBZGQgdHlwZSBpbmZvcm1hdGlvbiBpZiBhdmFpbGFibGUgKGZyb20gdGhlIGZpcnN0IHZhcmlhYmxlKVxuICAgICAgICAgICAgICAgIGlmIChjb2xsZWN0aW9uVmFyaWFibGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW5EYXRhW2NvbGxlY3Rpb25OYW1lXS50eXBlID0gY29sbGVjdGlvblZhcmlhYmxlc1swXS5yZXNvbHZlZFR5cGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChoYXNNb2Rlcykge1xuICAgICAgICAgICAgICAgICAgICAvLyBQcm9jZXNzIHZhcmlhYmxlcyBmb3IgZWFjaCBtb2RlXG4gICAgICAgICAgICAgICAgICAgIGNvbGxlY3Rpb24ubW9kZXMuZm9yRWFjaCgobW9kZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbW9kZU5hbWUgPSBtb2RlLm5hbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbkRhdGFbY29sbGVjdGlvbk5hbWVdLnZhcmlhYmxlc1ttb2RlTmFtZV0gPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEFkZCB2YXJpYWJsZSB2YWx1ZXMgZm9yIHRoaXMgbW9kZVxuICAgICAgICAgICAgICAgICAgICAgICAgY29sbGVjdGlvblZhcmlhYmxlcy5mb3JFYWNoKCh2YXJpYWJsZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlRm9yTW9kZSA9IHZhcmlhYmxlLnZhbHVlc0J5TW9kZVttb2RlLm1vZGVJZF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmVzb2x2ZSBhbnkgdmFyaWFibGUgYWxpYXNlc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc29sdmVkVmFsdWUgPSByZXNvbHZlVmFyaWFibGVBbGlhcyh2YWx1ZUZvck1vZGUsIHZhcmlhYmxlcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQWRkIHRoZSB2YXJpYWJsZSB3aXRoIGl0cyByZXNvbHZlZCB2YWx1ZSBmb3IgdGhpcyBtb2RlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW5EYXRhW2NvbGxlY3Rpb25OYW1lXS52YXJpYWJsZXNbbW9kZU5hbWVdLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiB2YXJpYWJsZS5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogdmFyaWFibGUuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiByZXNvbHZlZFZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gRm9yIGNvbGxlY3Rpb25zIHdpdGhvdXQgbXVsdGlwbGUgbW9kZXMsIGp1c3QgdXNlIHRoZSBmaXJzdCBtb2RlXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRlZmF1bHRNb2RlID0gY29sbGVjdGlvbi5tb2Rlc1swXTtcbiAgICAgICAgICAgICAgICAgICAgLy8gQWRkIHZhcmlhYmxlIHZhbHVlcyBkaXJlY3RseSB0byB0aGUgYXJyYXlcbiAgICAgICAgICAgICAgICAgICAgY29sbGVjdGlvblZhcmlhYmxlcy5mb3JFYWNoKCh2YXJpYWJsZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFsdWVGb3JNb2RlID0gdmFyaWFibGUudmFsdWVzQnlNb2RlW2RlZmF1bHRNb2RlLm1vZGVJZF07XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBSZXNvbHZlIGFueSB2YXJpYWJsZSBhbGlhc2VzXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZXNvbHZlZFZhbHVlID0gcmVzb2x2ZVZhcmlhYmxlQWxpYXModmFsdWVGb3JNb2RlLCB2YXJpYWJsZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQWRkIHRoZSB2YXJpYWJsZSB3aXRoIGl0cyByZXNvbHZlZCB2YWx1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW5EYXRhW2NvbGxlY3Rpb25OYW1lXS52YXJpYWJsZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogdmFyaWFibGUubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogdmFyaWFibGUuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHJlc29sdmVkVmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgZmlnbWEuY2xpZW50U3RvcmFnZS5zZXRBc3luYyhcInZhcmlhYmxlc0pzb25cIiwgdG9rZW5EYXRhKTtcbiAgICB9KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBleHBvcnRKU09OKCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIHlpZWxkIGdldFZhcmlhYmxlcygpO1xuICAgICAgICBjb25zdCBkYXRhID0geWllbGQgZmlnbWEuY2xpZW50U3RvcmFnZS5nZXRBc3luYyhcInZhcmlhYmxlc0pzb25cIik7XG4gICAgICAgIGNvbnN0IGpzb25TdHJpbmcgPSBKU09OLnN0cmluZ2lmeShkYXRhLCBudWxsLCAyKTtcbiAgICAgICAgZmlnbWEudWkucG9zdE1lc3NhZ2UoeyB0eXBlOiBcImV4cG9ydC12YXJpYWJsZXNcIiwgZGF0YToganNvblN0cmluZyB9KTtcbiAgICB9KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBkb3dubG9hZEpTT04oKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgY29uc3QgZGF0YSA9IHlpZWxkIGZpZ21hLmNsaWVudFN0b3JhZ2UuZ2V0QXN5bmMoXCJ2YXJpYWJsZXNKc29uXCIpO1xuICAgICAgICBjb25zdCBqc29uU3RyaW5nID0gSlNPTi5zdHJpbmdpZnkoZGF0YSwgbnVsbCwgMik7XG4gICAgICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKHsgdHlwZTogXCJkb3dubG9hZC12YXJpYWJsZXNcIiwgZGF0YToganNvblN0cmluZyB9KTtcbiAgICB9KTtcbn1cbiIsInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuaW1wb3J0IHsgc2FuaXRpemVOYW1lIH0gZnJvbSBcIi4vcGFyc2VyXCI7XG4vKipcbiAqIE1hcHMgY2F0ZWdvcnkgcHJlZml4ZXMgdG8gVGFpbHdpbmQgdGhlbWUgY2F0ZWdvcmllc1xuICovXG5jb25zdCBjYXRlZ29yeU1hcHBpbmcgPSB7XG4gICAgYnJlYWtwb2ludDogXCJzY3JlZW5zXCIsXG4gICAgc3BhY2luZzogXCJzcGFjaW5nXCIsXG4gICAgc3BhY2U6IFwic3BhY2luZ1wiLFxuICAgIHNpemU6IFwic3BhY2luZ1wiLFxuICAgIGdhcDogXCJzcGFjaW5nXCIsXG4gICAgcGFkOiBcInNwYWNpbmdcIixcbiAgICBtYXJnaW46IFwic3BhY2luZ1wiLFxuICAgIHdpZHRoOiBcInNwYWNpbmdcIixcbiAgICBoZWlnaHQ6IFwic3BhY2luZ1wiLFxuICAgIGNvbG9yOiBcImNvbG9yc1wiLFxuICAgIGJnOiBcImNvbG9yc1wiLFxuICAgIFwiYm9yZGVyLWNvbG9yXCI6IFwiY29sb3JzXCIsXG4gICAgXCJ0ZXh0LWNvbG9yXCI6IFwiY29sb3JzXCIsXG4gICAgYmFja2dyb3VuZDogXCJjb2xvcnNcIixcbiAgICBcImZvbnQtc2l6ZVwiOiBcImZvbnRTaXplXCIsXG4gICAgdGV4dDogXCJmb250U2l6ZVwiLFxuICAgIFwiZm9udC1mYW1pbHlcIjogXCJmb250RmFtaWx5XCIsXG4gICAgZmFtaWx5OiBcImZvbnRGYW1pbHlcIixcbiAgICByYWRpdXM6IFwiYm9yZGVyUmFkaXVzXCIsXG4gICAgcm91bmRlZDogXCJib3JkZXJSYWRpdXNcIixcbiAgICBcImJvcmRlci13aWR0aFwiOiBcImJvcmRlcldpZHRoXCIsXG4gICAgYm9yZGVyOiBcImJvcmRlcldpZHRoXCIsXG4gICAgc2hhZG93OiBcImJveFNoYWRvd1wiLFxuICAgIG9wYWNpdHk6IFwib3BhY2l0eVwiLFxuICAgIHo6IFwiekluZGV4XCIsXG4gICAgXCJ6LWluZGV4XCI6IFwiekluZGV4XCIsXG59O1xuLyoqXG4gKiBEZXRlcm1pbmVzIHRoZSBUYWlsd2luZCBjYXRlZ29yeSBiYXNlZCBvbiB2YXJpYWJsZSBuYW1lIGFuZCBjb2xsZWN0aW9uXG4gKi9cbmZ1bmN0aW9uIGRldGVybWluZVRhaWx3aW5kQ2F0ZWdvcnkodmFyaWFibGVOYW1lLCBjb2xsZWN0aW9uTmFtZSkge1xuICAgIGNvbnN0IG5hbWUgPSBzYW5pdGl6ZU5hbWUodmFyaWFibGVOYW1lKTtcbiAgICBsZXQgY2F0ZWdvcnkgPSBudWxsO1xuICAgIC8vIEZpcnN0IGNoZWNrIGNvbGxlY3Rpb24gbmFtZSBmb3IgY2F0ZWdvcnkgY2x1ZXNcbiAgICBjb25zdCBjb2xsZWN0aW9uTG93ZXIgPSBjb2xsZWN0aW9uTmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgIGlmIChjb2xsZWN0aW9uTG93ZXIuaW5jbHVkZXMoXCJjb2xvclwiKSlcbiAgICAgICAgY2F0ZWdvcnkgPSBcImNvbG9yc1wiO1xuICAgIGlmIChjb2xsZWN0aW9uTG93ZXIuaW5jbHVkZXMoXCJzcGFjaW5nXCIpKVxuICAgICAgICBjYXRlZ29yeSA9IFwic3BhY2luZ1wiO1xuICAgIC8vIFNwZWNpYWwgY2FzZXMgZm9yIGZvbnQgcHJvcGVydGllc1xuICAgIGlmIChjb2xsZWN0aW9uTG93ZXIuaW5jbHVkZXMoXCJ0eXBlIHNldFwiKSAmJiB2YXJpYWJsZU5hbWUuaW5jbHVkZXMoXCJzaXplXCIpKVxuICAgICAgICBjYXRlZ29yeSA9IFwiZm9udFNpemVcIjtcbiAgICBpZiAoY29sbGVjdGlvbkxvd2VyLmluY2x1ZGVzKFwidHlwZSBzZXRcIikgJiYgdmFyaWFibGVOYW1lLmluY2x1ZGVzKFwiZmFtaWx5XCIpKVxuICAgICAgICBjYXRlZ29yeSA9IFwiZm9udEZhbWlseVwiO1xuICAgIC8vIFNwZWNpYWwgY2FzZXMgZm9yIGJvcmRlciBwcm9wZXJ0aWVzXG4gICAgaWYgKGNvbGxlY3Rpb25Mb3dlci5pbmNsdWRlcyhcInRva2Vuc1wiKSB8fCB2YXJpYWJsZU5hbWUuaW5jbHVkZXMoXCJyb3VuZGVkXCIpKVxuICAgICAgICBjYXRlZ29yeSA9IFwiYm9yZGVyUmFkaXVzXCI7XG4gICAgaWYgKGNvbGxlY3Rpb25Mb3dlci5pbmNsdWRlcyhcInNoYWRvd1wiKSlcbiAgICAgICAgY2F0ZWdvcnkgPSBcImJveFNoYWRvd1wiO1xuICAgIC8vIFRoZW4gY2hlY2sgdmFyaWFibGUgbmFtZSBwcmVmaXhlc1xuICAgIGZvciAoY29uc3QgcHJlZml4IGluIGNhdGVnb3J5TWFwcGluZykge1xuICAgICAgICBpZiAobmFtZS5zdGFydHNXaXRoKHByZWZpeCkpIHtcbiAgICAgICAgICAgIGNhdGVnb3J5ID0gY2F0ZWdvcnlNYXBwaW5nW3ByZWZpeF07XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gU3BlY2lhbCBjYXNlcyBmb3IgY29sb3JzIHdpdGggc3RhbmRhcmQgcGF0dGVybnNcbiAgICBpZiAoL14ocHJpbWFyeXxzZWNvbmRhcnl8YWNjZW50fG5ldXRyYWx8c3VjY2Vzc3x3YXJuaW5nfGVycm9yfGluZm8pKC1cXGQrKT8kLy50ZXN0KG5hbWUpKSB7XG4gICAgICAgIGNhdGVnb3J5ID0gXCJjb2xvcnNcIjtcbiAgICB9XG4gICAgLy8gQ2hlY2sgaWYgdGhlIHZhcmlhYmxlIG1pZ2h0IGJlIGEgc3BhY2luZyB2YWx1ZSBiYXNlZCBvbiBuYW1pbmcgcGF0dGVybnNcbiAgICBpZiAoL14oeHN8c218bWR8bGd8eGx8MnhsfDN4bCkkLy50ZXN0KG5hbWUpIHx8IC9eKFxcZCspJC8udGVzdChuYW1lKSkge1xuICAgICAgICBjYXRlZ29yeSA9IFwic3BhY2luZ1wiO1xuICAgIH1cbiAgICByZXR1cm4gY2F0ZWdvcnk7XG59XG4vKipcbiAqIEdldHMgdGhlIGtleSB0byB1c2UgaW4gdGhlIFRhaWx3aW5kIGNvbmZpZ1xuICovXG5mdW5jdGlvbiBnZXRUYWlsd2luZEtleSh2YXJpYWJsZU5hbWUsIGNhdGVnb3J5KSB7XG4gICAgY29uc3QgbmFtZSA9IHNhbml0aXplTmFtZSh2YXJpYWJsZU5hbWUpO1xuICAgIGlmIChjYXRlZ29yeSA9PT0gXCJzcGFjaW5nXCIpIHtcbiAgICAgICAgZm9yIChjb25zdCBwcmVmaXggb2YgW1wiYnJlYWtwb2ludC1cIiwgXCJicmVha3BvaW50cy1cIiwgXCJzY3JlZW5zLVwiXSkge1xuICAgICAgICAgICAgaWYgKG5hbWUuc3RhcnRzV2l0aChwcmVmaXgpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5hbWUuc3Vic3RyaW5nKHByZWZpeC5sZW5ndGgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8vIFNwZWNpYWwgaGFuZGxpbmcgZm9yIGNvbG9ycyAtIHN0cmlwIGNvbG9yIHByZWZpeFxuICAgIGlmIChjYXRlZ29yeSA9PT0gXCJjb2xvcnNcIikge1xuICAgICAgICBmb3IgKGNvbnN0IHByZWZpeCBvZiBbXCJjb2xvcnMtXCIsIFwiYmctXCIsIFwiYmFja2dyb3VuZC1cIiwgXCJ0ZXh0LVwiLCBcImJyYW5kLVwiXSkge1xuICAgICAgICAgICAgaWYgKG5hbWUuc3RhcnRzV2l0aChwcmVmaXgpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5hbWUuc3Vic3RyaW5nKHByZWZpeC5sZW5ndGgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8vIFN0cmlwIGNvbW1vbiBwcmVmaXhlcyBiYXNlZCBvbiBjYXRlZ29yeVxuICAgIGZvciAoY29uc3QgcHJlZml4IGluIGNhdGVnb3J5TWFwcGluZykge1xuICAgICAgICBpZiAoY2F0ZWdvcnlNYXBwaW5nW3ByZWZpeF0gPT09IGNhdGVnb3J5ICYmIG5hbWUuc3RhcnRzV2l0aChwcmVmaXggKyBcIi1cIikpIHtcbiAgICAgICAgICAgIHJldHVybiBuYW1lLnN1YnN0cmluZyhwcmVmaXgubGVuZ3RoICsgMSk7IC8vICsxIGZvciB0aGUgaHlwaGVuXG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG5hbWU7XG59XG4vKipcbiAqIEdlbmVyYXRlcyBUYWlsd2luZCBjb25maWcgZnJvbSBDU1MgdmFyaWFibGVzXG4gKi9cbmZ1bmN0aW9uIGdlbmVyYXRlVGFpbHdpbmRDb25maWcoKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgY29uc3QgZGF0YSA9ICh5aWVsZCBmaWdtYS5jbGllbnRTdG9yYWdlLmdldEFzeW5jKFwidmFyaWFibGVzSnNvblwiKSk7XG4gICAgICAgIGlmICghZGF0YSB8fCBPYmplY3Qua2V5cyhkYXRhKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBcIi8qIE5vIHZhcmlhYmxlcyBmb3VuZCAqL1xcbm1vZHVsZS5leHBvcnRzID0geyB0aGVtZTogeyBleHRlbmQ6IHt9IH0gfTtcIjtcbiAgICAgICAgfVxuICAgICAgICAvLyBJbml0aWFsaXplIHRoZSBUYWlsd2luZCB0aGVtZSBzdHJ1Y3R1cmVcbiAgICAgICAgY29uc3QgdGFpbHdpbmRUaGVtZSA9IHt9O1xuICAgICAgICAvLyBQcm9jZXNzIGVhY2ggY29sbGVjdGlvbiBhbmQgYWRkIHZhcmlhYmxlcyB0byBhcHByb3ByaWF0ZSBjYXRlZ29yeVxuICAgICAgICBmb3IgKGNvbnN0IGNvbGxlY3Rpb25OYW1lIGluIGRhdGEpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbGxlY3Rpb24gPSBkYXRhW2NvbGxlY3Rpb25OYW1lXTtcbiAgICAgICAgICAgIGlmIChjb2xsZWN0aW9uTmFtZS50b0xvd2VyQ2FzZSgpID09PSBcInRva2Vuc1wiKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlOyAvLyBTa2lwIHRva2VuIGNvbGxlY3Rpb25cbiAgICAgICAgICAgIC8vIEZ1bmN0aW9uIHRvIHByb2Nlc3MgdmFyaWFibGVzIHJlZ2FyZGxlc3Mgb2YgY29sbGVjdGlvbiBtb2RlIHN0cnVjdHVyZVxuICAgICAgICAgICAgY29uc3QgcHJvY2Vzc1ZhcmlhYmxlcyA9ICh2YXJpYWJsZXMpID0+IHtcbiAgICAgICAgICAgICAgICB2YXJpYWJsZXMuZm9yRWFjaCgodmFyaWFibGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2F0ZWdvcnkgPSBkZXRlcm1pbmVUYWlsd2luZENhdGVnb3J5KHZhcmlhYmxlLm5hbWUsIGNvbGxlY3Rpb25OYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFjYXRlZ29yeSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjsgLy8gU2tpcCBpZiB3ZSBjYW4ndCBkZXRlcm1pbmUgYSBjYXRlZ29yeVxuICAgICAgICAgICAgICAgICAgICAvLyBJbml0aWFsaXplIHRoZSBjYXRlZ29yeSBpZiBpdCBkb2Vzbid0IGV4aXN0XG4gICAgICAgICAgICAgICAgICAgIGlmICghdGFpbHdpbmRUaGVtZVtjYXRlZ29yeV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhaWx3aW5kVGhlbWVbY2F0ZWdvcnldID0ge307XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gR2V0IHRoZSBrZXkgdG8gdXNlIGluIFRhaWx3aW5kIHRoZW1lXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGtleSA9IGdldFRhaWx3aW5kS2V5KHZhcmlhYmxlLm5hbWUsIGNhdGVnb3J5KTtcbiAgICAgICAgICAgICAgICAgICAgLy8gQWRkIHRoZSB2YXJpYWJsZSB3aXRoIENTUyB2YXIoKSByZWZlcmVuY2VcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFyTmFtZSA9IHNhbml0aXplTmFtZSh2YXJpYWJsZS5uYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gVXBkYXRlZCBzaXplIHRva2VuIGNoZWNrIHdpdGggbW9yZSBjb21wcmVoZW5zaXZlIHBhdHRlcm5zXG4gICAgICAgICAgICAgICAgICAgIGlmIChjYXRlZ29yeSA9PT0gXCJzcGFjaW5nXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGJyZWFrcG9pbnRQYXR0ZXJuID0gL14oYnJlYWtwb2ludC0pPyh4c3xzbXxtZHxsZ3x4bHwyeGx8M3hsfDR4bHxcXGQrKSQvO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJyZWFrcG9pbnRQYXR0ZXJuLnRlc3QodmFyTmFtZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWlsd2luZFRoZW1lW1wic2NyZWVuc1wiXVtrZXldID0gYHZhcigtLSR7dmFyTmFtZX0pYDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoY29sbGVjdGlvbk5hbWUudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhcImNvbG9yIHByaW1pdGl2ZVwiKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gRm9yIENvbG9yIFByaW1pdGl2ZXMsIHN0cmlwIHRoZSBwcmVmaXhcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcnRzID0gdmFyTmFtZS5zcGxpdChcIi1cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFydHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhaWx3aW5kVGhlbWVbY2F0ZWdvcnldW2tleV0gPSBgdmFyKC0tJHtwYXJ0cy5zbGljZSgxKS5qb2luKFwiLVwiKX0pYDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhaWx3aW5kVGhlbWVbY2F0ZWdvcnldW2tleV0gPSBgdmFyKC0tJHt2YXJOYW1lfSlgO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFpbHdpbmRUaGVtZVtjYXRlZ29yeV1ba2V5XSA9IGB2YXIoLS0ke3Zhck5hbWV9KWA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAvLyBIYW5kbGUgc2ltcGxlIChub24tbW9kZWQpIGNvbGxlY3Rpb25zXG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShjb2xsZWN0aW9uLnZhcmlhYmxlcykpIHtcbiAgICAgICAgICAgICAgICBwcm9jZXNzVmFyaWFibGVzKGNvbGxlY3Rpb24udmFyaWFibGVzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIEhhbmRsZSBjb2xsZWN0aW9ucyB3aXRoIG1vZGVzIC0ganVzdCB1c2UgdGhlIGRlZmF1bHQgbW9kZVxuICAgICAgICAgICAgZWxzZSBpZiAoY29sbGVjdGlvbi5tb2RlcyAmJiBjb2xsZWN0aW9uLm1vZGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBjb25zdCBkZWZhdWx0TW9kZSA9IGNvbGxlY3Rpb24ubW9kZXNbMF07XG4gICAgICAgICAgICAgICAgY29uc3QgZGVmYXVsdE1vZGVWYXJzID0gY29sbGVjdGlvbi52YXJpYWJsZXNbZGVmYXVsdE1vZGVdO1xuICAgICAgICAgICAgICAgIGlmIChkZWZhdWx0TW9kZVZhcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc1ZhcmlhYmxlcyhkZWZhdWx0TW9kZVZhcnMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBHZW5lcmF0ZSB0aGUgdGFpbHdpbmQuY29uZmlnLmpzIGNvbnRlbnRcbiAgICAgICAgbGV0IGNvbmZpZ0NvbnRlbnQgPSAnbW9kdWxlLmV4cG9ydHMgPSB7XFxuICBjb250ZW50OiBbXFxuICAgIFwiLi9jb21wb25lbnRzLyoqLyoue2pzLHRzLGpzeCx0c3gsbWR4fVwiLFxcbiAgICBcIi4vcGFnZXMvKiovKi57anMsdHMsanN4LHRzeCxtZHh9XCIsXFxuICAgIFwiLi9hcHAvKiovKi57anMsdHMsanN4LHRzeCxtZHh9XCIsXFxuICAgIFwiLi9zcmMvKiovKi57anMsdHMsanN4LHRzeCxtZHh9XCIsXFxuXSxcXG50aGVtZToge1xcbiAgICBleHRlbmQ6IHsnO1xuICAgICAgICAvLyBBZGQgZWFjaCBjYXRlZ29yeVxuICAgICAgICBmb3IgKGNvbnN0IGNhdGVnb3J5IGluIHRhaWx3aW5kVGhlbWUpIHtcbiAgICAgICAgICAgIGNvbmZpZ0NvbnRlbnQgKz0gYFxcbiAgICAgICR7Y2F0ZWdvcnl9OiB7YDtcbiAgICAgICAgICAgIC8vIEFkZCBlYWNoIHZhcmlhYmxlIGluIHRoZSBjYXRlZ29yeVxuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gdGFpbHdpbmRUaGVtZVtjYXRlZ29yeV0pIHtcbiAgICAgICAgICAgICAgICBjb25maWdDb250ZW50ICs9IGBcXG4gICAgICAgIFwiJHtrZXl9XCI6IFwiJHt0YWlsd2luZFRoZW1lW2NhdGVnb3J5XVtrZXldfVwiLGA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBSZW1vdmUgdHJhaWxpbmcgY29tbWEgYW5kIGNsb3NlIHRoZSBjYXRlZ29yeVxuICAgICAgICAgICAgY29uZmlnQ29udGVudCA9IGNvbmZpZ0NvbnRlbnQuc2xpY2UoMCwgLTEpO1xuICAgICAgICAgICAgY29uZmlnQ29udGVudCArPSBcIlxcbiAgICAgIH0sXCI7XG4gICAgICAgIH1cbiAgICAgICAgLy8gUmVtb3ZlIHRyYWlsaW5nIGNvbW1hIGFuZCBjbG9zZSB0aGUgY29uZmlnXG4gICAgICAgIGlmIChPYmplY3Qua2V5cyh0YWlsd2luZFRoZW1lKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjb25maWdDb250ZW50ID0gY29uZmlnQ29udGVudC5zbGljZSgwLCAtMSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uZmlnQ29udGVudCArPSBcIlxcbiAgICB9XFxuICB9XFxufTtcIjtcbiAgICAgICAgcmV0dXJuIGNvbmZpZ0NvbnRlbnQ7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBkb3dubG9hZFRhaWx3aW5kQ29uZmlnKCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGNvbnN0IGNvbmZpZ0NvbnRlbnQgPSB5aWVsZCBnZW5lcmF0ZVRhaWx3aW5kQ29uZmlnKCk7XG4gICAgICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKHsgdHlwZTogXCJkb3dubG9hZC1jb25maWdcIiwgZGF0YTogY29uZmlnQ29udGVudCB9KTtcbiAgICB9KTtcbn1cbmV4cG9ydCBkZWZhdWx0IGRvd25sb2FkVGFpbHdpbmRDb25maWc7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGRvd25sb2FkQ1NTLCBkb3dubG9hZEpTT04sIGRvd25sb2FkVGFpbHdpbmRDb25maWcsIGV4cG9ydEpTT04sIH0gZnJvbSBcIi4vdXRpbHNcIjtcbmZpZ21hLm9uKFwicnVuXCIsIGV4cG9ydEpTT04pO1xuZmlnbWEuc2hvd1VJKF9faHRtbF9fLCB7IHdpZHRoOiA0ODAsIGhlaWdodDogODAwIH0pO1xuZmlnbWEudWkub25tZXNzYWdlID0gKG1zZykgPT4ge1xuICAgIGNvbnN0IHR5cGUgPSBtc2cudHlwZTtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgY2FzZSBcImRvd25sb2FkLXZhcmlhYmxlc1wiOlxuICAgICAgICAgICAgZG93bmxvYWRKU09OKCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImRvd25sb2FkLWNzc1wiOlxuICAgICAgICAgICAgZG93bmxvYWRDU1MoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiZG93bmxvYWQtY29uZmlnXCI6XG4gICAgICAgICAgICBkb3dubG9hZFRhaWx3aW5kQ29uZmlnKCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICB9XG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9