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
        let cssOutput = `:root {\n`;
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
        cssOutput += `}\n\n`;
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
                        cssOutput += `[data-theme="${(0,_parser__WEBPACK_IMPORTED_MODULE_1__.sanitizeName)(modeName)}"] {\n`;
                        const sortedModeVars = sortCSSVariables(modeVars);
                        sortedModeVars.forEach((variable) => {
                            const varName = processVariableName(variable.name, collectionName);
                            const varValue = formatValueForCSS(variable.value, collection.type, collectionName, variable.name);
                            cssOutput += `  --${varName}: ${varValue};\n`;
                        });
                        cssOutput += `}\n\n`;
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
function determineTailwindCategory(variableName, collectionName) {
    const name = (0,_parser__WEBPACK_IMPORTED_MODULE_0__.sanitizeName)(variableName);
    // First check collection name for category clues
    const collectionLower = collectionName.toLowerCase();
    if (collectionLower.includes("color"))
        return "colors";
    if (collectionLower.includes("spacing"))
        return "spacing";
    if (collectionLower.includes("font") && collectionLower.includes("size"))
        return "fontSize";
    if (collectionLower.includes("font") && collectionLower.includes("weight"))
        return "fontWeight";
    if (collectionLower.includes("font") && collectionLower.includes("family"))
        return "fontFamily";
    if (collectionLower.includes("radius") || collectionLower.includes("rounded"))
        return "borderRadius";
    if (collectionLower.includes("shadow"))
        return "boxShadow";
    // Then check variable name prefixes
    for (const prefix in categoryMapping) {
        if (name.startsWith(prefix)) {
            return categoryMapping[prefix];
        }
    }
    // Special cases for colors with standard patterns
    if (/^(primary|secondary|accent|neutral|success|warning|error|info)(-\d+)?$/.test(name)) {
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
function getTailwindKey(variableName, category) {
    const name = (0,_parser__WEBPACK_IMPORTED_MODULE_0__.sanitizeName)(variableName);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29kZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvQnNDO0FBQ2tCO0FBQ0Y7QUFDbUI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0hsRSxvQkFBb0IsU0FBUztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTyw0QkFBNEIsU0FBUyxRQUFRLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRTtBQUM1RDtBQUNQO0FBQ0Esa0JBQWtCLE9BQU8sTUFBTTtBQUMvQjtBQUNBLGNBQWMsVUFBVTtBQUN4QjtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDO0FBQ2hDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM5Q0EsaUJBQWlCLFNBQUksSUFBSSxTQUFJO0FBQzdCLDRCQUE0QiwrREFBK0QsaUJBQWlCO0FBQzVHO0FBQ0Esb0NBQW9DLE1BQU0sK0JBQStCLFlBQVk7QUFDckYsbUNBQW1DLE1BQU0sbUNBQW1DLFlBQVk7QUFDeEYsZ0NBQWdDO0FBQ2hDO0FBQ0EsS0FBSztBQUNMO0FBQzZEO0FBQ2dCO0FBQzdFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLGdEQUFPO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDLHVEQUFnQjtBQUMzRDtBQUNBO0FBQ0EsbUJBQW1CLGdEQUFPO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixpQkFBaUI7QUFDckMsd0JBQXdCLGlEQUFRLEdBQUcsb0NBQW9DO0FBQ3ZFO0FBQ0EsK0JBQStCLHlEQUFnQixNQUFNLElBQUksYUFBYTtBQUN0RTtBQUNBLDBCQUEwQix5REFBZ0IsTUFBTTtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IscURBQVk7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLHFEQUFZO0FBQ2xDLHNCQUFzQixxREFBWTtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyxvREFBYTtBQUNoRCxtQ0FBbUMsb0RBQWE7QUFDaEQ7QUFDQTtBQUNBLG1CQUFtQixvREFBYSxZQUFZLG9EQUFhO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0M7QUFDaEM7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLGdCQUFnQjtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsUUFBUSxJQUFJLFVBQVU7QUFDOUQsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEMsUUFBUSxJQUFJLFVBQVU7QUFDbEUscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QjtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLDZCQUE2QjtBQUM3RDtBQUNBO0FBQ0E7QUFDQSxxREFBcUQscURBQVksV0FBVyxJQUFJO0FBQ2hGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdELFFBQVEsSUFBSSxVQUFVO0FBQ3RFLHlCQUF5QjtBQUN6Qix1Q0FBdUM7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQix3Q0FBd0M7QUFDdkUsS0FBSztBQUNMO0FBQ0EsaUVBQWUsV0FBVyxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3JMZDtBQUNiLGlCQUFpQixTQUFJLElBQUksU0FBSTtBQUM3Qiw0QkFBNEIsK0RBQStELGlCQUFpQjtBQUM1RztBQUNBLG9DQUFvQyxNQUFNLCtCQUErQixZQUFZO0FBQ3JGLG1DQUFtQyxNQUFNLG1DQUFtQyxZQUFZO0FBQ3hGLGdDQUFnQztBQUNoQztBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0EsMEVBQTBFO0FBQzFFLHNGQUFzRjtBQUN0RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0IseUJBQXlCO0FBQ3pCLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsS0FBSztBQUNMO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQiw0Q0FBNEM7QUFDM0UsS0FBSztBQUNMO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsOENBQThDO0FBQzdFLEtBQUs7QUFDTDs7Ozs7Ozs7Ozs7Ozs7OztBQ25JQSxpQkFBaUIsU0FBSSxJQUFJLFNBQUk7QUFDN0IsNEJBQTRCLCtEQUErRCxpQkFBaUI7QUFDNUc7QUFDQSxvQ0FBb0MsTUFBTSwrQkFBK0IsWUFBWTtBQUNyRixtQ0FBbUMsTUFBTSxtQ0FBbUMsWUFBWTtBQUN4RixnQ0FBZ0M7QUFDaEM7QUFDQSxLQUFLO0FBQ0w7QUFDd0M7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLHFEQUFZO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixxREFBWTtBQUM3QjtBQUNBO0FBQ0E7QUFDQSxzREFBc0Q7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlFQUFpRSxTQUFTLGVBQWU7QUFDekY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyxxREFBWTtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9FQUFvRSx5QkFBeUI7QUFDN0Y7QUFDQTtBQUNBLG9FQUFvRSxRQUFRO0FBQzVFO0FBQ0E7QUFDQTtBQUNBLGdFQUFnRSxRQUFRO0FBQ3hFO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDQUErQyxZQUFZLGVBQWU7QUFDMUU7QUFDQTtBQUNBLHdDQUF3QyxTQUFTLEdBQUc7QUFDcEQ7QUFDQTtBQUNBLCtDQUErQyxJQUFJLE1BQU0sNkJBQTZCO0FBQ3RGO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QztBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLEtBQUssSUFBSTtBQUMxQztBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQiw4Q0FBOEM7QUFDN0UsS0FBSztBQUNMO0FBQ0EsaUVBQWUsc0JBQXNCLEVBQUM7Ozs7Ozs7VUMvS3RDO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOeUY7QUFDekYsZ0JBQWdCLDhDQUFVO0FBQzFCLHlCQUF5Qix5QkFBeUI7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLG9EQUFZO0FBQ3hCO0FBQ0E7QUFDQSxZQUFZLG1EQUFXO0FBQ3ZCO0FBQ0E7QUFDQSxZQUFZLDhEQUFzQjtBQUNsQztBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly92YXJpYWJsZXMtdG8tY29kZS8uL3NyYy91dGlscy9jb25zdGFudC50cyIsIndlYnBhY2s6Ly92YXJpYWJsZXMtdG8tY29kZS8uL3NyYy91dGlscy9pbmRleC50cyIsIndlYnBhY2s6Ly92YXJpYWJsZXMtdG8tY29kZS8uL3NyYy91dGlscy9wYXJzZXIudHMiLCJ3ZWJwYWNrOi8vdmFyaWFibGVzLXRvLWNvZGUvLi9zcmMvdXRpbHMvdXRpbHMtY3NzLnRzIiwid2VicGFjazovL3ZhcmlhYmxlcy10by1jb2RlLy4vc3JjL3V0aWxzL3V0aWxzLWpzb24udHMiLCJ3ZWJwYWNrOi8vdmFyaWFibGVzLXRvLWNvZGUvLi9zcmMvdXRpbHMvdXRpbHMtdGFpbHdpbmQudHMiLCJ3ZWJwYWNrOi8vdmFyaWFibGVzLXRvLWNvZGUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdmFyaWFibGVzLXRvLWNvZGUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3ZhcmlhYmxlcy10by1jb2RlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdmFyaWFibGVzLXRvLWNvZGUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly92YXJpYWJsZXMtdG8tY29kZS8uL3NyYy9tYWluLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBzaXplT3JkZXJSYW5rID0ge1xuICAgIFwiMnhzXCI6IDEsXG4gICAgeHM6IDIsXG4gICAgc206IDMsXG4gICAgYmFzZTogNCxcbiAgICBtZDogNSxcbiAgICBsZzogNixcbiAgICB4bDogNyxcbiAgICBcIjJ4bFwiOiA4LFxuICAgIFwiM3hsXCI6IDksXG59O1xuLy8gRm9udCB3ZWlnaHQgdmFsdWVzIC0gdXNlZCB0byBpZGVudGlmeSB3aGljaCBudW1lcmljIHZhbHVlcyBzaG91bGQgTk9UIGJlIGNvbnZlcnRlZCB0byByZW1cbmV4cG9ydCBjb25zdCBmb250V2VpZ2h0VmFsdWVzID0gbmV3IFNldChbXG4gICAgXCIxMDBcIixcbiAgICBcIjIwMFwiLFxuICAgIFwiMzAwXCIsXG4gICAgXCI0MDBcIixcbiAgICBcIjUwMFwiLFxuICAgIFwiNjAwXCIsXG4gICAgXCI3MDBcIixcbiAgICBcIjgwMFwiLFxuICAgIFwiOTAwXCIsXG4gICAgXCJ0aGluXCIsXG4gICAgXCJleHRyYWxpZ2h0XCIsXG4gICAgXCJsaWdodFwiLFxuICAgIFwibm9ybWFsXCIsXG4gICAgXCJtZWRpdW1cIixcbiAgICBcInNlbWlib2xkXCIsXG4gICAgXCJib2xkXCIsXG4gICAgXCJleHRyYWJvbGRcIixcbiAgICBcImJsYWNrXCIsXG5dKTtcbiIsImltcG9ydCBkb3dubG9hZENTUyBmcm9tIFwiLi91dGlscy1jc3NcIjtcbmltcG9ydCB7IGRvd25sb2FkSlNPTiwgZXhwb3J0SlNPTiB9IGZyb20gXCIuL3V0aWxzLWpzb25cIjtcbmltcG9ydCBkb3dubG9hZFRhaWx3aW5kQ29uZmlnIGZyb20gXCIuL3V0aWxzLXRhaWx3aW5kXCI7XG5leHBvcnQgeyBkb3dubG9hZENTUywgZG93bmxvYWRKU09OLCBkb3dubG9hZFRhaWx3aW5kQ29uZmlnLCBleHBvcnRKU09OIH07XG4iLCJleHBvcnQgY29uc3QgcmdiVG9Ic2wgPSAoeyByLCBnLCBiIH0pID0+IHtcbiAgICByIC89IDI1NTtcbiAgICBnIC89IDI1NTtcbiAgICBiIC89IDI1NTtcbiAgICBjb25zdCBtYXggPSBNYXRoLm1heChyLCBnLCBiKTtcbiAgICBjb25zdCBtaW4gPSBNYXRoLm1pbihyLCBnLCBiKTtcbiAgICBsZXQgaCA9IDA7XG4gICAgbGV0IHMgPSAwO1xuICAgIGNvbnN0IGwgPSAobWF4ICsgbWluKSAvIDI7XG4gICAgaWYgKG1heCAhPT0gbWluKSB7XG4gICAgICAgIGNvbnN0IGQgPSBtYXggLSBtaW47XG4gICAgICAgIHMgPSBsID4gMC41ID8gZCAvICgyIC0gbWF4IC0gbWluKSA6IGQgLyAobWF4ICsgbWluKTtcbiAgICAgICAgc3dpdGNoIChtYXgpIHtcbiAgICAgICAgICAgIGNhc2UgcjpcbiAgICAgICAgICAgICAgICBoID0gKGcgLSBiKSAvIGQgKyAoZyA8IGIgPyA2IDogMCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGc6XG4gICAgICAgICAgICAgICAgaCA9IChiIC0gcikgLyBkICsgMjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgYjpcbiAgICAgICAgICAgICAgICBoID0gKHIgLSBnKSAvIGQgKyA0O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGggLz0gNjtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgaDogTWF0aC5yb3VuZChoICogMzYwKSxcbiAgICAgICAgczogTWF0aC5yb3VuZChzICogMTAwKSxcbiAgICAgICAgbDogTWF0aC5yb3VuZChsICogMTAwKSxcbiAgICB9O1xufTtcbmV4cG9ydCBjb25zdCBoc2xWYWx1ZVRvU3RyaW5nID0gKHsgaCwgcywgbCB9KSA9PiBgJHtofSwgJHtzfSUsICR7bH0lYDtcbmV4cG9ydCBjb25zdCBweFRvUmVtID0gKHB4LCBiYXNlID0gMTYpID0+IHtcbiAgICBpZiAocHggJSA0ID09PSAwKSB7XG4gICAgICAgIHJldHVybiBgJHtweCAvIDR9cmVtYDsgLy8gQ29udmVydCB0byBUYWlsd2luZCdzIDAuMjVyZW0gdW5pdHNcbiAgICB9XG4gICAgcmV0dXJuIGAke3B4IC8gYmFzZX1yZW1gO1xufTtcbmV4cG9ydCBjb25zdCBzYW5pdGl6ZU5hbWUgPSAobmFtZSkgPT4ge1xuICAgIC8vIFJlcGxhY2Ugc3BhY2VzIGFuZCBzcGVjaWFsIGNoYXJhY3RlcnMgd2l0aCBkYXNoZXNcbiAgICByZXR1cm4gbmFtZVxuICAgICAgICAudHJpbSgpXG4gICAgICAgIC50b0xvd2VyQ2FzZSgpXG4gICAgICAgIC5yZXBsYWNlKC9bXmEtejAtOV0vZywgXCItXCIpXG4gICAgICAgIC5yZXBsYWNlKC8tKy9nLCBcIi1cIikgLy8gUmVwbGFjZSBtdWx0aXBsZSBjb25zZWN1dGl2ZSBkYXNoZXMgd2l0aCBhIHNpbmdsZSBkYXNoXG4gICAgICAgIC5yZXBsYWNlKC9eLXwtJC9nLCBcIlwiKTsgLy8gUmVtb3ZlIGxlYWRpbmcvdHJhaWxpbmcgZGFzaGVzXG59O1xuIiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5pbXBvcnQgeyBmb250V2VpZ2h0VmFsdWVzLCBzaXplT3JkZXJSYW5rIH0gZnJvbSBcIi4vY29uc3RhbnRcIjtcbmltcG9ydCB7IGhzbFZhbHVlVG9TdHJpbmcsIHB4VG9SZW0sIHJnYlRvSHNsLCBzYW5pdGl6ZU5hbWUgfSBmcm9tIFwiLi9wYXJzZXJcIjtcbi8qKlxuICogRm9ybWF0cyBhIHZhcmlhYmxlIHZhbHVlIGludG8gYSBDU1MtY29tcGF0aWJsZSBzdHJpbmdcbiAqL1xuZnVuY3Rpb24gZm9ybWF0VmFsdWVGb3JDU1ModmFsdWUsIHR5cGUsIGNvbGxlY3Rpb25OYW1lLCB2YXJpYWJsZU5hbWUpIHtcbiAgICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gXCJpbml0aWFsXCI7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgaWYgKHZhbHVlID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gXCIwXCI7XG4gICAgICAgIH1cbiAgICAgICAgLy8gU3BlY2lhbCBjYXNlIDE6IElmIGNvbGxlY3Rpb24gaXMgc3BhY2luZywgY29udmVydCB0byByZW1cbiAgICAgICAgaWYgKGNvbGxlY3Rpb25OYW1lLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoXCJzcGFjaW5nXCIpKSB7XG4gICAgICAgICAgICByZXR1cm4gcHhUb1JlbSh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gU3BlY2lhbCBjYXNlIDI6IElmIG51bWVyaWMgYW5kIG5vdCBmb250IHdlaWdodCBwcm9wZXJ0eSwgY29udmVydCB0byByZW1cbiAgICAgICAgY29uc3QgbmFtZUxvd2VyID0gdmFyaWFibGVOYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGNvbnN0IGlzRm9udFdlaWdodCA9IG5hbWVMb3dlci5pbmNsdWRlcyhcIndlaWdodFwiKSB8fFxuICAgICAgICAgICAgKG5hbWVMb3dlci5pbmNsdWRlcyhcImZvbnRcIikgJiYgZm9udFdlaWdodFZhbHVlcy5oYXMoU3RyaW5nKHZhbHVlKSkpO1xuICAgICAgICBpZiAoIWlzRm9udFdlaWdodCkge1xuICAgICAgICAgICAgLy8gRm9yIHNwYWNpbmcsIHNpemluZyB2YWx1ZXMsIGNvbnZlcnQgdG8gcmVtXG4gICAgICAgICAgICByZXR1cm4gcHhUb1JlbSh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgICAvLyBIYW5kbGUgY29sb3IgdmFsdWVzXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICBpZiAoXCJyXCIgaW4gdmFsdWUgJiYgXCJnXCIgaW4gdmFsdWUgJiYgXCJiXCIgaW4gdmFsdWUpIHtcbiAgICAgICAgICAgIGNvbnN0IHsgciwgZywgYiwgYSA9IDEgfSA9IHZhbHVlO1xuICAgICAgICAgICAgY29uc3QgaHNsID0gcmdiVG9Ic2woeyByOiByICogMjU1LCBnOiBnICogMjU1LCBiOiBiICogMjU1IH0pO1xuICAgICAgICAgICAgaWYgKGEgPCAxKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGBoc2xhKCR7aHNsVmFsdWVUb1N0cmluZyhoc2wpfSwgJHthLnRvRml4ZWQoMil9KWA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYGhzbCgke2hzbFZhbHVlVG9TdHJpbmcoaHNsKX0pYDtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xufVxuLyoqXG4gKiBQcm9jZXNzIHZhcmlhYmxlIG5hbWUgYmFzZWQgb24gY29sbGVjdGlvblxuICogRm9yIENvbG9yIFByaW1pdGl2ZXMsIHJlbW92ZSB0aGUgcHJlZml4XG4gKi9cbmZ1bmN0aW9uIHByb2Nlc3NWYXJpYWJsZU5hbWUobmFtZSwgY29sbGVjdGlvbk5hbWUpIHtcbiAgICBjb25zdCBzYW5pdGl6ZWQgPSBzYW5pdGl6ZU5hbWUobmFtZSk7XG4gICAgLy8gQ2hlY2sgaWYgdGhpcyBiZWxvbmdzIHRvIENvbG9yIFByaW1pdGl2ZXMgY29sbGVjdGlvblxuICAgIGlmIChjb2xsZWN0aW9uTmFtZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKFwiY29sb3IgcHJpbWl0aXZlXCIpKSB7XG4gICAgICAgIGNvbnN0IHBhcnRzID0gc2FuaXRpemVkLnNwbGl0KFwiLVwiKTtcbiAgICAgICAgaWYgKHBhcnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIC8vIFJlbW92ZSB0aGUgZmlyc3QgcGFydCAocHJlZml4KVxuICAgICAgICAgICAgcmV0dXJuIHBhcnRzLnNsaWNlKDEpLmpvaW4oXCItXCIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzYW5pdGl6ZWQ7XG59XG4vKipcbiAqIFNvcnRzIHZhcmlhYmxlcyBieSB0aGVpciBwcmVmaXggYW5kIG51bWVyaWMgb3JkZXIgd2l0aGluIGVhY2ggcHJlZml4IGdyb3VwXG4gKi9cbmZ1bmN0aW9uIHNvcnRDU1NWYXJpYWJsZXModmFyaWFibGVzKSB7XG4gICAgcmV0dXJuIFsuLi52YXJpYWJsZXNdLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgY29uc3QgYU5hbWUgPSBzYW5pdGl6ZU5hbWUoYS5uYW1lKTtcbiAgICAgICAgY29uc3QgYk5hbWUgPSBzYW5pdGl6ZU5hbWUoYi5uYW1lKTtcbiAgICAgICAgLy8gRXh0cmFjdCBwcmVmaXggKGV2ZXJ5dGhpbmcgYmVmb3JlIHRoZSBsYXN0IGRhc2gpXG4gICAgICAgIGNvbnN0IGFMYXN0RGFzaEluZGV4ID0gYU5hbWUubGFzdEluZGV4T2YoXCItXCIpO1xuICAgICAgICBjb25zdCBiTGFzdERhc2hJbmRleCA9IGJOYW1lLmxhc3RJbmRleE9mKFwiLVwiKTtcbiAgICAgICAgY29uc3QgYVByZWZpeCA9IGFMYXN0RGFzaEluZGV4ICE9PSAtMSA/IGFOYW1lLnN1YnN0cmluZygwLCBhTGFzdERhc2hJbmRleCkgOiBhTmFtZTtcbiAgICAgICAgY29uc3QgYlByZWZpeCA9IGJMYXN0RGFzaEluZGV4ICE9PSAtMSA/IGJOYW1lLnN1YnN0cmluZygwLCBiTGFzdERhc2hJbmRleCkgOiBiTmFtZTtcbiAgICAgICAgLy8gRmlyc3Qgc29ydCBieSBwcmVmaXhcbiAgICAgICAgaWYgKGFQcmVmaXggIT09IGJQcmVmaXgpIHtcbiAgICAgICAgICAgIHJldHVybiBhUHJlZml4LmxvY2FsZUNvbXBhcmUoYlByZWZpeCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gRXh0cmFjdCB0aGUgbGFzdCBwYXJ0IChhZnRlciB0aGUgbGFzdCBkYXNoKVxuICAgICAgICBjb25zdCBhU3VmZml4ID0gYUxhc3REYXNoSW5kZXggIT09IC0xID8gYU5hbWUuc3Vic3RyaW5nKGFMYXN0RGFzaEluZGV4ICsgMSkgOiBcIlwiO1xuICAgICAgICBjb25zdCBiU3VmZml4ID0gYkxhc3REYXNoSW5kZXggIT09IC0xID8gYk5hbWUuc3Vic3RyaW5nKGJMYXN0RGFzaEluZGV4ICsgMSkgOiBcIlwiO1xuICAgICAgICAvLyBDaGVjayBpZiBzdWZmaXhlcyBhcmUgc2l6ZS1yZWxhdGVkIHZhbHVlc1xuICAgICAgICBjb25zdCBhSXNTaXplID0gYVN1ZmZpeCBpbiBzaXplT3JkZXJSYW5rO1xuICAgICAgICBjb25zdCBiSXNTaXplID0gYlN1ZmZpeCBpbiBzaXplT3JkZXJSYW5rO1xuICAgICAgICAvLyBJZiBib3RoIGFyZSBzaXplIHZhbHVlcywgc29ydCBieSBzaXplIG9yZGVyXG4gICAgICAgIGlmIChhSXNTaXplICYmIGJJc1NpemUpIHtcbiAgICAgICAgICAgIHJldHVybiBzaXplT3JkZXJSYW5rW2FTdWZmaXhdIC0gc2l6ZU9yZGVyUmFua1tiU3VmZml4XTtcbiAgICAgICAgfVxuICAgICAgICAvLyBJZiBvbmx5IG9uZSBpcyBhIHNpemUgdmFsdWUsIGtlZXAgb3JpZ2luYWwgb3JkZXJcbiAgICAgICAgaWYgKGFJc1NpemUgIT09IGJJc1NpemUpIHtcbiAgICAgICAgICAgIC8vIFByZXNlcnZlIHRoZSBvcmlnaW5hbCBvcmRlciBieSByZXR1cm5pbmcgMFxuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICAgICAgLy8gSWYgYm90aCBhcmUgbnVtZXJpYywgc29ydCBudW1lcmljYWxseVxuICAgICAgICBjb25zdCBhTnVtID0gcGFyc2VJbnQoYVN1ZmZpeCwgMTApO1xuICAgICAgICBjb25zdCBiTnVtID0gcGFyc2VJbnQoYlN1ZmZpeCwgMTApO1xuICAgICAgICBpZiAoIWlzTmFOKGFOdW0pICYmICFpc05hTihiTnVtKSkge1xuICAgICAgICAgICAgcmV0dXJuIGFOdW0gLSBiTnVtO1xuICAgICAgICB9XG4gICAgICAgIC8vIE90aGVyd2lzZSwgc29ydCBhbHBoYWJldGljYWxseSBmb3Igbm9uLXNpemUsIG5vbi1udW1lcmljIHZhbHVlc1xuICAgICAgICByZXR1cm4gYVN1ZmZpeC5sb2NhbGVDb21wYXJlKGJTdWZmaXgpO1xuICAgIH0pO1xufVxuLyoqXG4gKiBHZW5lcmF0ZXMgQ1NTIGN1c3RvbSBwcm9wZXJ0aWVzIGZyb20gdmFyaWFibGVzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZUNTUygpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBjb25zdCBkYXRhID0gKHlpZWxkIGZpZ21hLmNsaWVudFN0b3JhZ2UuZ2V0QXN5bmMoXCJ2YXJpYWJsZXNKc29uXCIpKTtcbiAgICAgICAgaWYgKCFkYXRhIHx8IE9iamVjdC5rZXlzKGRhdGEpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIFwiLyogTm8gdmFyaWFibGVzIGZvdW5kICovXCI7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGNzc091dHB1dCA9IGA6cm9vdCB7XFxuYDtcbiAgICAgICAgLy8gUHJvY2VzcyBlYWNoIGNvbGxlY3Rpb25cbiAgICAgICAgZm9yIChjb25zdCBjb2xsZWN0aW9uTmFtZSBpbiBkYXRhKSB7XG4gICAgICAgICAgICBjb25zdCBjb2xsZWN0aW9uID0gZGF0YVtjb2xsZWN0aW9uTmFtZV07XG4gICAgICAgICAgICBjc3NPdXRwdXQgKz0gYCAgLyogJHtjb2xsZWN0aW9uTmFtZX0gKi9cXG5gO1xuICAgICAgICAgICAgLy8gSGFuZGxlIHNpbXBsZSAobm9uLW1vZGVkKSBjb2xsZWN0aW9ucyBmaXJzdFxuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoY29sbGVjdGlvbi52YXJpYWJsZXMpKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc29ydGVkVmFyaWFibGVzID0gc29ydENTU1ZhcmlhYmxlcyhjb2xsZWN0aW9uLnZhcmlhYmxlcyk7XG4gICAgICAgICAgICAgICAgc29ydGVkVmFyaWFibGVzLmZvckVhY2goKHZhcmlhYmxlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhck5hbWUgPSBwcm9jZXNzVmFyaWFibGVOYW1lKHZhcmlhYmxlLm5hbWUsIGNvbGxlY3Rpb25OYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFyVmFsdWUgPSBmb3JtYXRWYWx1ZUZvckNTUyh2YXJpYWJsZS52YWx1ZSwgY29sbGVjdGlvbi50eXBlLCBjb2xsZWN0aW9uTmFtZSwgdmFyaWFibGUubmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIGNzc091dHB1dCArPSBgICAtLSR7dmFyTmFtZX06ICR7dmFyVmFsdWV9O1xcbmA7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBIYW5kbGUgY29sbGVjdGlvbnMgd2l0aCBtb2Rlc1xuICAgICAgICAgICAgZWxzZSBpZiAoY29sbGVjdGlvbi5tb2RlcyAmJiBjb2xsZWN0aW9uLm1vZGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAvLyBBZGQgZGVmYXVsdCBtb2RlIHZhcmlhYmxlcyB0byA6cm9vdFxuICAgICAgICAgICAgICAgIGNvbnN0IGRlZmF1bHRNb2RlID0gY29sbGVjdGlvbi5tb2Rlc1swXTtcbiAgICAgICAgICAgICAgICBjb25zdCBkZWZhdWx0TW9kZVZhcnMgPSBjb2xsZWN0aW9uLnZhcmlhYmxlc1tkZWZhdWx0TW9kZV07XG4gICAgICAgICAgICAgICAgaWYgKGRlZmF1bHRNb2RlVmFycykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzb3J0ZWRNb2RlVmFycyA9IHNvcnRDU1NWYXJpYWJsZXMoZGVmYXVsdE1vZGVWYXJzKTtcbiAgICAgICAgICAgICAgICAgICAgc29ydGVkTW9kZVZhcnMuZm9yRWFjaCgodmFyaWFibGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhck5hbWUgPSBwcm9jZXNzVmFyaWFibGVOYW1lKHZhcmlhYmxlLm5hbWUsIGNvbGxlY3Rpb25OYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhclZhbHVlID0gZm9ybWF0VmFsdWVGb3JDU1ModmFyaWFibGUudmFsdWUsIGNvbGxlY3Rpb24udHlwZSwgY29sbGVjdGlvbk5hbWUsIHZhcmlhYmxlLm5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3NzT3V0cHV0ICs9IGAgIC0tJHt2YXJOYW1lfTogJHt2YXJWYWx1ZX07XFxuYDtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNzc091dHB1dCArPSBgfVxcblxcbmA7XG4gICAgICAgIC8vIFByb2Nlc3MgbW9kZXMgZm9yIGVhY2ggY29sbGVjdGlvbiB3aXRoIHRoZW1lIHZhcmlhbnRzXG4gICAgICAgIGZvciAoY29uc3QgY29sbGVjdGlvbk5hbWUgaW4gZGF0YSkge1xuICAgICAgICAgICAgY29uc3QgY29sbGVjdGlvbiA9IGRhdGFbY29sbGVjdGlvbk5hbWVdO1xuICAgICAgICAgICAgaWYgKGNvbGxlY3Rpb24ubW9kZXMgJiZcbiAgICAgICAgICAgICAgICBjb2xsZWN0aW9uLm1vZGVzLmxlbmd0aCA+IDEgJiZcbiAgICAgICAgICAgICAgICB0eXBlb2YgY29sbGVjdGlvbi52YXJpYWJsZXMgPT09IFwib2JqZWN0XCIgJiZcbiAgICAgICAgICAgICAgICAhQXJyYXkuaXNBcnJheShjb2xsZWN0aW9uLnZhcmlhYmxlcykpIHtcbiAgICAgICAgICAgICAgICAvLyBTa2lwIHRoZSBmaXJzdCBtb2RlIGFzIGl0J3MgYWxyZWFkeSBpbiA6cm9vdFxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgY29sbGVjdGlvbi5tb2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBtb2RlTmFtZSA9IGNvbGxlY3Rpb24ubW9kZXNbaV07XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG1vZGVWYXJzID0gY29sbGVjdGlvbi52YXJpYWJsZXNbbW9kZU5hbWVdO1xuICAgICAgICAgICAgICAgICAgICBpZiAobW9kZVZhcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNzc091dHB1dCArPSBgW2RhdGEtdGhlbWU9XCIke3Nhbml0aXplTmFtZShtb2RlTmFtZSl9XCJdIHtcXG5gO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc29ydGVkTW9kZVZhcnMgPSBzb3J0Q1NTVmFyaWFibGVzKG1vZGVWYXJzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvcnRlZE1vZGVWYXJzLmZvckVhY2goKHZhcmlhYmxlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFyTmFtZSA9IHByb2Nlc3NWYXJpYWJsZU5hbWUodmFyaWFibGUubmFtZSwgY29sbGVjdGlvbk5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhclZhbHVlID0gZm9ybWF0VmFsdWVGb3JDU1ModmFyaWFibGUudmFsdWUsIGNvbGxlY3Rpb24udHlwZSwgY29sbGVjdGlvbk5hbWUsIHZhcmlhYmxlLm5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNzc091dHB1dCArPSBgICAtLSR7dmFyTmFtZX06ICR7dmFyVmFsdWV9O1xcbmA7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNzc091dHB1dCArPSBgfVxcblxcbmA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNzc091dHB1dDtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGRvd25sb2FkQ1NTKCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGNvbnN0IGNzc0NvbnRlbnQgPSB5aWVsZCBnZW5lcmF0ZUNTUygpO1xuICAgICAgICBmaWdtYS51aS5wb3N0TWVzc2FnZSh7IHR5cGU6IFwiZG93bmxvYWQtY3NzXCIsIGRhdGE6IGNzc0NvbnRlbnQgfSk7XG4gICAgfSk7XG59XG5leHBvcnQgZGVmYXVsdCBkb3dubG9hZENTUztcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG4vKipcbiAqIFJlc29sdmVzIHZhcmlhYmxlIGFsaWFzZXMgcmVjdXJzaXZlbHlcbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFyaWFibGUgdmFsdWUgdGhhdCBtaWdodCBiZSBhbiBhbGlhc1xuICogQHBhcmFtIHZhcmlhYmxlcyBBbGwgYXZhaWxhYmxlIHZhcmlhYmxlcyBmb3IgbG9va3VwXG4gKiBAcGFyYW0gdmlzaXRlZElkcyBTZXQgb2YgYWxyZWFkeSB2aXNpdGVkIHZhcmlhYmxlIElEcyB0byBwcmV2ZW50IGluZmluaXRlIHJlY3Vyc2lvblxuICogQHJldHVybnMgVGhlIHJlc29sdmVkIHZhbHVlXG4gKi9cbmZ1bmN0aW9uIHJlc29sdmVWYXJpYWJsZUFsaWFzKHZhbHVlLCB2YXJpYWJsZXMsIHZpc2l0ZWRJZHMgPSBuZXcgU2V0KCkpIHtcbiAgICAvLyBDaGVjayBpZiB0aGUgdmFsdWUgaXMgYSB2YXJpYWJsZSBhbGlhc1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiZcbiAgICAgICAgdmFsdWUgIT09IG51bGwgJiZcbiAgICAgICAgXCJ0eXBlXCIgaW4gdmFsdWUgJiZcbiAgICAgICAgdmFsdWUudHlwZSA9PT0gXCJWQVJJQUJMRV9BTElBU1wiKSB7XG4gICAgICAgIGNvbnN0IGFsaWFzVmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgLy8gUHJldmVudCBjaXJjdWxhciByZWZlcmVuY2VzXG4gICAgICAgIGlmICh2aXNpdGVkSWRzLmhhcyhhbGlhc1ZhbHVlLmlkKSkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKFwiQ2lyY3VsYXIgcmVmZXJlbmNlIGRldGVjdGVkIGluIHZhcmlhYmxlIGFsaWFzZXM6XCIsIGFsaWFzVmFsdWUuaWQpO1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlOyAvLyBSZXR1cm4gdGhlIG9yaWdpbmFsIGFsaWFzIHRvIGF2b2lkIGluZmluaXRlIHJlY3Vyc2lvblxuICAgICAgICB9XG4gICAgICAgIC8vIEZpbmQgdGhlIHJlZmVyZW5jZWQgdmFyaWFibGVcbiAgICAgICAgY29uc3QgcmVmZXJlbmNlZFZhcmlhYmxlID0gdmFyaWFibGVzLmZpbmQoKHYpID0+IHYuaWQgPT09IGFsaWFzVmFsdWUuaWQpO1xuICAgICAgICBpZiAocmVmZXJlbmNlZFZhcmlhYmxlKSB7XG4gICAgICAgICAgICAvLyBHZXQgdGhlIGFwcHJvcHJpYXRlIG1vZGUgSUQgLSB1c2luZyB0aGUgZmlyc3QgbW9kZSBhcyBkZWZhdWx0XG4gICAgICAgICAgICBjb25zdCBtb2RlSWQgPSBPYmplY3Qua2V5cyhyZWZlcmVuY2VkVmFyaWFibGUudmFsdWVzQnlNb2RlKVswXTtcbiAgICAgICAgICAgIGlmIChtb2RlSWQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCByZWZlcmVuY2VkVmFsdWUgPSByZWZlcmVuY2VkVmFyaWFibGUudmFsdWVzQnlNb2RlW21vZGVJZF07XG4gICAgICAgICAgICAgICAgLy8gVHJhY2sgdGhpcyBJRCB0byBwcmV2ZW50IGNpcmN1bGFyIHJlZmVyZW5jZXNcbiAgICAgICAgICAgICAgICB2aXNpdGVkSWRzLmFkZChhbGlhc1ZhbHVlLmlkKTtcbiAgICAgICAgICAgICAgICAvLyBSZWN1cnNpdmVseSByZXNvbHZlIGluIGNhc2UgdGhlIHJlZmVyZW5jZWQgdmFsdWUgaXMgYWxzbyBhbiBhbGlhc1xuICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlVmFyaWFibGVBbGlhcyhyZWZlcmVuY2VkVmFsdWUsIHZhcmlhYmxlcywgdmlzaXRlZElkcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gUmV0dXJuIG9yaWdpbmFsIHZhbHVlIGlmIGl0J3Mgbm90IGFuIGFsaWFzIG9yIHJlZmVyZW5jZWQgdmFyaWFibGUgbm90IGZvdW5kXG4gICAgcmV0dXJuIHZhbHVlO1xufVxuLy8gVmFyaWFibGVzIOuNsOydtO2EsCDqsIDsoLjsmKTquLBcbmV4cG9ydCBmdW5jdGlvbiBnZXRWYXJpYWJsZXMoKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgY29uc3QgdmFyaWFibGVzID0geWllbGQgZmlnbWEudmFyaWFibGVzLmdldExvY2FsVmFyaWFibGVzQXN5bmMoKTsgLy8g66qo65OgIFZhcmlhYmxlcyDqsIDsoLjsmKTquLBcbiAgICAgICAgY29uc3QgY29sbGVjdGlvbnMgPSB5aWVsZCBmaWdtYS52YXJpYWJsZXMuZ2V0TG9jYWxWYXJpYWJsZUNvbGxlY3Rpb25zQXN5bmMoKTsgLy8g66qo65OgIFZhcmlhYmxlcyBDb2xsZWN0aW9uIOqwgOyguOyYpOq4sFxuICAgICAgICBjb25zdCB0b2tlbkRhdGEgPSB7fTtcbiAgICAgICAgLy8gUHJvY2VzcyBlYWNoIGNvbGxlY3Rpb25cbiAgICAgICAgY29sbGVjdGlvbnMuZm9yRWFjaCgoY29sbGVjdGlvbikgPT4ge1xuICAgICAgICAgICAgY29uc3QgY29sbGVjdGlvbk5hbWUgPSBjb2xsZWN0aW9uLm5hbWU7XG4gICAgICAgICAgICBpZiAoIXRva2VuRGF0YVtjb2xsZWN0aW9uTmFtZV0pIHtcbiAgICAgICAgICAgICAgICAvLyBJbml0aWFsaXplIHRoZSBjb2xsZWN0aW9uIHN0cnVjdHVyZSBiYXNlZCBvbiB3aGV0aGVyIGl0IGhhcyBtb2Rlc1xuICAgICAgICAgICAgICAgIGNvbnN0IGhhc01vZGVzID0gY29sbGVjdGlvbi5tb2Rlcy5sZW5ndGggPiAxO1xuICAgICAgICAgICAgICAgIHRva2VuRGF0YVtjb2xsZWN0aW9uTmFtZV0gPSB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiXCIsIC8vIFdpbGwgYmUgc2V0IGxhdGVyXG4gICAgICAgICAgICAgICAgICAgIHZhcmlhYmxlczoge30sIC8vIFdpbGwgYmUgc2V0IGxhdGVyXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBpZiAoaGFzTW9kZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQWRkIG1vZGVzIG9ubHkgaWYgdGhlcmUgYXJlIG11bHRpcGxlIG1vZGVzXG4gICAgICAgICAgICAgICAgICAgIHRva2VuRGF0YVtjb2xsZWN0aW9uTmFtZV0ubW9kZXMgPSBjb2xsZWN0aW9uLm1vZGVzLm1hcCgobW9kZSkgPT4gbW9kZS5uYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW5EYXRhW2NvbGxlY3Rpb25OYW1lXS52YXJpYWJsZXMgPSB7fTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEZvciBjb2xsZWN0aW9ucyB3aXRob3V0IG11bHRpcGxlIG1vZGVzLCBpbml0aWFsaXplIHZhcmlhYmxlcyBhcyBhcnJheVxuICAgICAgICAgICAgICAgICAgICB0b2tlbkRhdGFbY29sbGVjdGlvbk5hbWVdLnZhcmlhYmxlcyA9IFtdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBGaW5kIGFsbCB2YXJpYWJsZXMgYmVsb25naW5nIHRvIHRoaXMgY29sbGVjdGlvblxuICAgICAgICAgICAgICAgIGNvbnN0IGNvbGxlY3Rpb25WYXJpYWJsZXMgPSB2YXJpYWJsZXMuZmlsdGVyKCh2YXJpYWJsZSkgPT4gdmFyaWFibGUudmFyaWFibGVDb2xsZWN0aW9uSWQgPT09IGNvbGxlY3Rpb24uaWQpO1xuICAgICAgICAgICAgICAgIC8vIEFkZCB0eXBlIGluZm9ybWF0aW9uIGlmIGF2YWlsYWJsZSAoZnJvbSB0aGUgZmlyc3QgdmFyaWFibGUpXG4gICAgICAgICAgICAgICAgaWYgKGNvbGxlY3Rpb25WYXJpYWJsZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbkRhdGFbY29sbGVjdGlvbk5hbWVdLnR5cGUgPSBjb2xsZWN0aW9uVmFyaWFibGVzWzBdLnJlc29sdmVkVHlwZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGhhc01vZGVzKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFByb2Nlc3MgdmFyaWFibGVzIGZvciBlYWNoIG1vZGVcbiAgICAgICAgICAgICAgICAgICAgY29sbGVjdGlvbi5tb2Rlcy5mb3JFYWNoKChtb2RlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBtb2RlTmFtZSA9IG1vZGUubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuRGF0YVtjb2xsZWN0aW9uTmFtZV0udmFyaWFibGVzW21vZGVOYW1lXSA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQWRkIHZhcmlhYmxlIHZhbHVlcyBmb3IgdGhpcyBtb2RlXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xsZWN0aW9uVmFyaWFibGVzLmZvckVhY2goKHZhcmlhYmxlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFsdWVGb3JNb2RlID0gdmFyaWFibGUudmFsdWVzQnlNb2RlW21vZGUubW9kZUlkXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBSZXNvbHZlIGFueSB2YXJpYWJsZSBhbGlhc2VzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzb2x2ZWRWYWx1ZSA9IHJlc29sdmVWYXJpYWJsZUFsaWFzKHZhbHVlRm9yTW9kZSwgdmFyaWFibGVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBBZGQgdGhlIHZhcmlhYmxlIHdpdGggaXRzIHJlc29sdmVkIHZhbHVlIGZvciB0aGlzIG1vZGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2tlbkRhdGFbY29sbGVjdGlvbk5hbWVdLnZhcmlhYmxlc1ttb2RlTmFtZV0ucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHZhcmlhYmxlLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiB2YXJpYWJsZS5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHJlc29sdmVkVmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBGb3IgY29sbGVjdGlvbnMgd2l0aG91dCBtdWx0aXBsZSBtb2RlcywganVzdCB1c2UgdGhlIGZpcnN0IG1vZGVcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGVmYXVsdE1vZGUgPSBjb2xsZWN0aW9uLm1vZGVzWzBdO1xuICAgICAgICAgICAgICAgICAgICAvLyBBZGQgdmFyaWFibGUgdmFsdWVzIGRpcmVjdGx5IHRvIHRoZSBhcnJheVxuICAgICAgICAgICAgICAgICAgICBjb2xsZWN0aW9uVmFyaWFibGVzLmZvckVhY2goKHZhcmlhYmxlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZUZvck1vZGUgPSB2YXJpYWJsZS52YWx1ZXNCeU1vZGVbZGVmYXVsdE1vZGUubW9kZUlkXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJlc29sdmUgYW55IHZhcmlhYmxlIGFsaWFzZXNcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc29sdmVkVmFsdWUgPSByZXNvbHZlVmFyaWFibGVBbGlhcyh2YWx1ZUZvck1vZGUsIHZhcmlhYmxlcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBBZGQgdGhlIHZhcmlhYmxlIHdpdGggaXRzIHJlc29sdmVkIHZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbkRhdGFbY29sbGVjdGlvbk5hbWVdLnZhcmlhYmxlcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiB2YXJpYWJsZS5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiB2YXJpYWJsZS5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcmVzb2x2ZWRWYWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBmaWdtYS5jbGllbnRTdG9yYWdlLnNldEFzeW5jKFwidmFyaWFibGVzSnNvblwiLCB0b2tlbkRhdGEpO1xuICAgIH0pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGV4cG9ydEpTT04oKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgeWllbGQgZ2V0VmFyaWFibGVzKCk7XG4gICAgICAgIGNvbnN0IGRhdGEgPSB5aWVsZCBmaWdtYS5jbGllbnRTdG9yYWdlLmdldEFzeW5jKFwidmFyaWFibGVzSnNvblwiKTtcbiAgICAgICAgY29uc3QganNvblN0cmluZyA9IEpTT04uc3RyaW5naWZ5KGRhdGEsIG51bGwsIDIpO1xuICAgICAgICBmaWdtYS51aS5wb3N0TWVzc2FnZSh7IHR5cGU6IFwiZXhwb3J0LXZhcmlhYmxlc1wiLCBkYXRhOiBqc29uU3RyaW5nIH0pO1xuICAgIH0pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGRvd25sb2FkSlNPTigpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBjb25zdCBkYXRhID0geWllbGQgZmlnbWEuY2xpZW50U3RvcmFnZS5nZXRBc3luYyhcInZhcmlhYmxlc0pzb25cIik7XG4gICAgICAgIGNvbnN0IGpzb25TdHJpbmcgPSBKU09OLnN0cmluZ2lmeShkYXRhLCBudWxsLCAyKTtcbiAgICAgICAgZmlnbWEudWkucG9zdE1lc3NhZ2UoeyB0eXBlOiBcImRvd25sb2FkLXZhcmlhYmxlc1wiLCBkYXRhOiBqc29uU3RyaW5nIH0pO1xuICAgIH0pO1xufVxuIiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5pbXBvcnQgeyBzYW5pdGl6ZU5hbWUgfSBmcm9tIFwiLi9wYXJzZXJcIjtcbi8qKlxuICogTWFwcyBjYXRlZ29yeSBwcmVmaXhlcyB0byBUYWlsd2luZCB0aGVtZSBjYXRlZ29yaWVzXG4gKi9cbmNvbnN0IGNhdGVnb3J5TWFwcGluZyA9IHtcbiAgICBzcGFjaW5nOiBcInNwYWNpbmdcIixcbiAgICBzcGFjZTogXCJzcGFjaW5nXCIsXG4gICAgc2l6ZTogXCJzcGFjaW5nXCIsXG4gICAgZ2FwOiBcInNwYWNpbmdcIixcbiAgICBwYWQ6IFwic3BhY2luZ1wiLFxuICAgIG1hcmdpbjogXCJzcGFjaW5nXCIsXG4gICAgd2lkdGg6IFwic3BhY2luZ1wiLFxuICAgIGhlaWdodDogXCJzcGFjaW5nXCIsXG4gICAgY29sb3I6IFwiY29sb3JzXCIsXG4gICAgYmc6IFwiY29sb3JzXCIsXG4gICAgXCJib3JkZXItY29sb3JcIjogXCJjb2xvcnNcIixcbiAgICBcInRleHQtY29sb3JcIjogXCJjb2xvcnNcIixcbiAgICBiYWNrZ3JvdW5kOiBcImNvbG9yc1wiLFxuICAgIFwiZm9udC1zaXplXCI6IFwiZm9udFNpemVcIixcbiAgICB0ZXh0OiBcImZvbnRTaXplXCIsXG4gICAgXCJmb250LXdlaWdodFwiOiBcImZvbnRXZWlnaHRcIixcbiAgICB3ZWlnaHQ6IFwiZm9udFdlaWdodFwiLFxuICAgIFwiZm9udC1mYW1pbHlcIjogXCJmb250RmFtaWx5XCIsXG4gICAgZmFtaWx5OiBcImZvbnRGYW1pbHlcIixcbiAgICByYWRpdXM6IFwiYm9yZGVyUmFkaXVzXCIsXG4gICAgcm91bmRlZDogXCJib3JkZXJSYWRpdXNcIixcbiAgICBcImJvcmRlci13aWR0aFwiOiBcImJvcmRlcldpZHRoXCIsXG4gICAgYm9yZGVyOiBcImJvcmRlcldpZHRoXCIsXG4gICAgc2hhZG93OiBcImJveFNoYWRvd1wiLFxuICAgIG9wYWNpdHk6IFwib3BhY2l0eVwiLFxuICAgIHo6IFwiekluZGV4XCIsXG4gICAgXCJ6LWluZGV4XCI6IFwiekluZGV4XCIsXG59O1xuLyoqXG4gKiBEZXRlcm1pbmVzIHRoZSBUYWlsd2luZCBjYXRlZ29yeSBiYXNlZCBvbiB2YXJpYWJsZSBuYW1lIGFuZCBjb2xsZWN0aW9uXG4gKi9cbmZ1bmN0aW9uIGRldGVybWluZVRhaWx3aW5kQ2F0ZWdvcnkodmFyaWFibGVOYW1lLCBjb2xsZWN0aW9uTmFtZSkge1xuICAgIGNvbnN0IG5hbWUgPSBzYW5pdGl6ZU5hbWUodmFyaWFibGVOYW1lKTtcbiAgICAvLyBGaXJzdCBjaGVjayBjb2xsZWN0aW9uIG5hbWUgZm9yIGNhdGVnb3J5IGNsdWVzXG4gICAgY29uc3QgY29sbGVjdGlvbkxvd2VyID0gY29sbGVjdGlvbk5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICBpZiAoY29sbGVjdGlvbkxvd2VyLmluY2x1ZGVzKFwiY29sb3JcIikpXG4gICAgICAgIHJldHVybiBcImNvbG9yc1wiO1xuICAgIGlmIChjb2xsZWN0aW9uTG93ZXIuaW5jbHVkZXMoXCJzcGFjaW5nXCIpKVxuICAgICAgICByZXR1cm4gXCJzcGFjaW5nXCI7XG4gICAgaWYgKGNvbGxlY3Rpb25Mb3dlci5pbmNsdWRlcyhcImZvbnRcIikgJiYgY29sbGVjdGlvbkxvd2VyLmluY2x1ZGVzKFwic2l6ZVwiKSlcbiAgICAgICAgcmV0dXJuIFwiZm9udFNpemVcIjtcbiAgICBpZiAoY29sbGVjdGlvbkxvd2VyLmluY2x1ZGVzKFwiZm9udFwiKSAmJiBjb2xsZWN0aW9uTG93ZXIuaW5jbHVkZXMoXCJ3ZWlnaHRcIikpXG4gICAgICAgIHJldHVybiBcImZvbnRXZWlnaHRcIjtcbiAgICBpZiAoY29sbGVjdGlvbkxvd2VyLmluY2x1ZGVzKFwiZm9udFwiKSAmJiBjb2xsZWN0aW9uTG93ZXIuaW5jbHVkZXMoXCJmYW1pbHlcIikpXG4gICAgICAgIHJldHVybiBcImZvbnRGYW1pbHlcIjtcbiAgICBpZiAoY29sbGVjdGlvbkxvd2VyLmluY2x1ZGVzKFwicmFkaXVzXCIpIHx8IGNvbGxlY3Rpb25Mb3dlci5pbmNsdWRlcyhcInJvdW5kZWRcIikpXG4gICAgICAgIHJldHVybiBcImJvcmRlclJhZGl1c1wiO1xuICAgIGlmIChjb2xsZWN0aW9uTG93ZXIuaW5jbHVkZXMoXCJzaGFkb3dcIikpXG4gICAgICAgIHJldHVybiBcImJveFNoYWRvd1wiO1xuICAgIC8vIFRoZW4gY2hlY2sgdmFyaWFibGUgbmFtZSBwcmVmaXhlc1xuICAgIGZvciAoY29uc3QgcHJlZml4IGluIGNhdGVnb3J5TWFwcGluZykge1xuICAgICAgICBpZiAobmFtZS5zdGFydHNXaXRoKHByZWZpeCkpIHtcbiAgICAgICAgICAgIHJldHVybiBjYXRlZ29yeU1hcHBpbmdbcHJlZml4XTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBTcGVjaWFsIGNhc2VzIGZvciBjb2xvcnMgd2l0aCBzdGFuZGFyZCBwYXR0ZXJuc1xuICAgIGlmICgvXihwcmltYXJ5fHNlY29uZGFyeXxhY2NlbnR8bmV1dHJhbHxzdWNjZXNzfHdhcm5pbmd8ZXJyb3J8aW5mbykoLVxcZCspPyQvLnRlc3QobmFtZSkpIHtcbiAgICAgICAgcmV0dXJuIFwiY29sb3JzXCI7XG4gICAgfVxuICAgIC8vIENoZWNrIGlmIHRoZSB2YXJpYWJsZSBtaWdodCBiZSBhIHNwYWNpbmcgdmFsdWUgYmFzZWQgb24gbmFtaW5nIHBhdHRlcm5zXG4gICAgaWYgKC9eKHhzfHNtfG1kfGxnfHhsfDJ4bHwzeGwpJC8udGVzdChuYW1lKSB8fCAvXihcXGQrKSQvLnRlc3QobmFtZSkpIHtcbiAgICAgICAgcmV0dXJuIFwic3BhY2luZ1wiO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn1cbi8qKlxuICogR2V0cyB0aGUga2V5IHRvIHVzZSBpbiB0aGUgVGFpbHdpbmQgY29uZmlnXG4gKi9cbmZ1bmN0aW9uIGdldFRhaWx3aW5kS2V5KHZhcmlhYmxlTmFtZSwgY2F0ZWdvcnkpIHtcbiAgICBjb25zdCBuYW1lID0gc2FuaXRpemVOYW1lKHZhcmlhYmxlTmFtZSk7XG4gICAgLy8gU3RyaXAgY29tbW9uIHByZWZpeGVzIGJhc2VkIG9uIGNhdGVnb3J5XG4gICAgZm9yIChjb25zdCBwcmVmaXggaW4gY2F0ZWdvcnlNYXBwaW5nKSB7XG4gICAgICAgIGlmIChjYXRlZ29yeU1hcHBpbmdbcHJlZml4XSA9PT0gY2F0ZWdvcnkgJiYgbmFtZS5zdGFydHNXaXRoKHByZWZpeCArIFwiLVwiKSkge1xuICAgICAgICAgICAgcmV0dXJuIG5hbWUuc3Vic3RyaW5nKHByZWZpeC5sZW5ndGggKyAxKTsgLy8gKzEgZm9yIHRoZSBoeXBoZW5cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbmFtZTtcbn1cbi8qKlxuICogR2VuZXJhdGVzIFRhaWx3aW5kIGNvbmZpZyBmcm9tIENTUyB2YXJpYWJsZXNcbiAqL1xuZnVuY3Rpb24gZ2VuZXJhdGVUYWlsd2luZENvbmZpZygpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBjb25zdCBkYXRhID0gKHlpZWxkIGZpZ21hLmNsaWVudFN0b3JhZ2UuZ2V0QXN5bmMoXCJ2YXJpYWJsZXNKc29uXCIpKTtcbiAgICAgICAgaWYgKCFkYXRhIHx8IE9iamVjdC5rZXlzKGRhdGEpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIFwiLyogTm8gdmFyaWFibGVzIGZvdW5kICovXFxubW9kdWxlLmV4cG9ydHMgPSB7IHRoZW1lOiB7IGV4dGVuZDoge30gfSB9O1wiO1xuICAgICAgICB9XG4gICAgICAgIC8vIEluaXRpYWxpemUgdGhlIFRhaWx3aW5kIHRoZW1lIHN0cnVjdHVyZVxuICAgICAgICBjb25zdCB0YWlsd2luZFRoZW1lID0ge307XG4gICAgICAgIC8vIFByb2Nlc3MgZWFjaCBjb2xsZWN0aW9uIGFuZCBhZGQgdmFyaWFibGVzIHRvIGFwcHJvcHJpYXRlIGNhdGVnb3J5XG4gICAgICAgIGZvciAoY29uc3QgY29sbGVjdGlvbk5hbWUgaW4gZGF0YSkge1xuICAgICAgICAgICAgY29uc3QgY29sbGVjdGlvbiA9IGRhdGFbY29sbGVjdGlvbk5hbWVdO1xuICAgICAgICAgICAgLy8gRnVuY3Rpb24gdG8gcHJvY2VzcyB2YXJpYWJsZXMgcmVnYXJkbGVzcyBvZiBjb2xsZWN0aW9uIG1vZGUgc3RydWN0dXJlXG4gICAgICAgICAgICBjb25zdCBwcm9jZXNzVmFyaWFibGVzID0gKHZhcmlhYmxlcykgPT4ge1xuICAgICAgICAgICAgICAgIHZhcmlhYmxlcy5mb3JFYWNoKCh2YXJpYWJsZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjYXRlZ29yeSA9IGRldGVybWluZVRhaWx3aW5kQ2F0ZWdvcnkodmFyaWFibGUubmFtZSwgY29sbGVjdGlvbk5hbWUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWNhdGVnb3J5KVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuOyAvLyBTa2lwIGlmIHdlIGNhbid0IGRldGVybWluZSBhIGNhdGVnb3J5XG4gICAgICAgICAgICAgICAgICAgIC8vIEluaXRpYWxpemUgdGhlIGNhdGVnb3J5IGlmIGl0IGRvZXNuJ3QgZXhpc3RcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0YWlsd2luZFRoZW1lW2NhdGVnb3J5XSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFpbHdpbmRUaGVtZVtjYXRlZ29yeV0gPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvLyBHZXQgdGhlIGtleSB0byB1c2UgaW4gVGFpbHdpbmQgdGhlbWVcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qga2V5ID0gZ2V0VGFpbHdpbmRLZXkodmFyaWFibGUubmFtZSwgY2F0ZWdvcnkpO1xuICAgICAgICAgICAgICAgICAgICAvLyBBZGQgdGhlIHZhcmlhYmxlIHdpdGggQ1NTIHZhcigpIHJlZmVyZW5jZVxuICAgICAgICAgICAgICAgICAgICBjb25zdCB2YXJOYW1lID0gc2FuaXRpemVOYW1lKHZhcmlhYmxlLm5hbWUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY29sbGVjdGlvbk5hbWUudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhcImNvbG9yIHByaW1pdGl2ZVwiKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gRm9yIENvbG9yIFByaW1pdGl2ZXMsIHN0cmlwIHRoZSBwcmVmaXhcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcnRzID0gdmFyTmFtZS5zcGxpdChcIi1cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFydHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhaWx3aW5kVGhlbWVbY2F0ZWdvcnldW2tleV0gPSBgdmFyKC0tJHtwYXJ0cy5zbGljZSgxKS5qb2luKFwiLVwiKX0pYDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhaWx3aW5kVGhlbWVbY2F0ZWdvcnldW2tleV0gPSBgdmFyKC0tJHt2YXJOYW1lfSlgO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFpbHdpbmRUaGVtZVtjYXRlZ29yeV1ba2V5XSA9IGB2YXIoLS0ke3Zhck5hbWV9KWA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAvLyBIYW5kbGUgc2ltcGxlIChub24tbW9kZWQpIGNvbGxlY3Rpb25zXG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShjb2xsZWN0aW9uLnZhcmlhYmxlcykpIHtcbiAgICAgICAgICAgICAgICBwcm9jZXNzVmFyaWFibGVzKGNvbGxlY3Rpb24udmFyaWFibGVzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIEhhbmRsZSBjb2xsZWN0aW9ucyB3aXRoIG1vZGVzIC0ganVzdCB1c2UgdGhlIGRlZmF1bHQgbW9kZVxuICAgICAgICAgICAgZWxzZSBpZiAoY29sbGVjdGlvbi5tb2RlcyAmJiBjb2xsZWN0aW9uLm1vZGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBjb25zdCBkZWZhdWx0TW9kZSA9IGNvbGxlY3Rpb24ubW9kZXNbMF07XG4gICAgICAgICAgICAgICAgY29uc3QgZGVmYXVsdE1vZGVWYXJzID0gY29sbGVjdGlvbi52YXJpYWJsZXNbZGVmYXVsdE1vZGVdO1xuICAgICAgICAgICAgICAgIGlmIChkZWZhdWx0TW9kZVZhcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc1ZhcmlhYmxlcyhkZWZhdWx0TW9kZVZhcnMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBHZW5lcmF0ZSB0aGUgdGFpbHdpbmQuY29uZmlnLmpzIGNvbnRlbnRcbiAgICAgICAgbGV0IGNvbmZpZ0NvbnRlbnQgPSBcIm1vZHVsZS5leHBvcnRzID0ge1xcbiAgdGhlbWU6IHtcXG4gICAgZXh0ZW5kOiB7XCI7XG4gICAgICAgIC8vIEFkZCBlYWNoIGNhdGVnb3J5XG4gICAgICAgIGZvciAoY29uc3QgY2F0ZWdvcnkgaW4gdGFpbHdpbmRUaGVtZSkge1xuICAgICAgICAgICAgY29uZmlnQ29udGVudCArPSBgXFxuICAgICAgJHtjYXRlZ29yeX06IHtgO1xuICAgICAgICAgICAgLy8gQWRkIGVhY2ggdmFyaWFibGUgaW4gdGhlIGNhdGVnb3J5XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiB0YWlsd2luZFRoZW1lW2NhdGVnb3J5XSkge1xuICAgICAgICAgICAgICAgIGNvbmZpZ0NvbnRlbnQgKz0gYFxcbiAgICAgICAgXCIke2tleX1cIjogXCIke3RhaWx3aW5kVGhlbWVbY2F0ZWdvcnldW2tleV19XCIsYDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFJlbW92ZSB0cmFpbGluZyBjb21tYSBhbmQgY2xvc2UgdGhlIGNhdGVnb3J5XG4gICAgICAgICAgICBjb25maWdDb250ZW50ID0gY29uZmlnQ29udGVudC5zbGljZSgwLCAtMSk7XG4gICAgICAgICAgICBjb25maWdDb250ZW50ICs9IFwiXFxuICAgICAgfSxcIjtcbiAgICAgICAgfVxuICAgICAgICAvLyBSZW1vdmUgdHJhaWxpbmcgY29tbWEgYW5kIGNsb3NlIHRoZSBjb25maWdcbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKHRhaWx3aW5kVGhlbWUpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGNvbmZpZ0NvbnRlbnQgPSBjb25maWdDb250ZW50LnNsaWNlKDAsIC0xKTtcbiAgICAgICAgfVxuICAgICAgICBjb25maWdDb250ZW50ICs9IFwiXFxuICAgIH1cXG4gIH1cXG59O1wiO1xuICAgICAgICByZXR1cm4gY29uZmlnQ29udGVudDtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGRvd25sb2FkVGFpbHdpbmRDb25maWcoKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgY29uc3QgY29uZmlnQ29udGVudCA9IHlpZWxkIGdlbmVyYXRlVGFpbHdpbmRDb25maWcoKTtcbiAgICAgICAgZmlnbWEudWkucG9zdE1lc3NhZ2UoeyB0eXBlOiBcImRvd25sb2FkLWNvbmZpZ1wiLCBkYXRhOiBjb25maWdDb250ZW50IH0pO1xuICAgIH0pO1xufVxuZXhwb3J0IGRlZmF1bHQgZG93bmxvYWRUYWlsd2luZENvbmZpZztcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgZG93bmxvYWRDU1MsIGRvd25sb2FkSlNPTiwgZG93bmxvYWRUYWlsd2luZENvbmZpZywgZXhwb3J0SlNPTiwgfSBmcm9tIFwiLi91dGlsc1wiO1xuZmlnbWEub24oXCJydW5cIiwgZXhwb3J0SlNPTik7XG5maWdtYS5zaG93VUkoX19odG1sX18sIHsgd2lkdGg6IDQ4MCwgaGVpZ2h0OiA4MDAgfSk7XG5maWdtYS51aS5vbm1lc3NhZ2UgPSAobXNnKSA9PiB7XG4gICAgY29uc3QgdHlwZSA9IG1zZy50eXBlO1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICBjYXNlIFwiZG93bmxvYWQtdmFyaWFibGVzXCI6XG4gICAgICAgICAgICBkb3dubG9hZEpTT04oKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiZG93bmxvYWQtY3NzXCI6XG4gICAgICAgICAgICBkb3dubG9hZENTUygpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJkb3dubG9hZC1jb25maWdcIjpcbiAgICAgICAgICAgIGRvd25sb2FkVGFpbHdpbmRDb25maWcoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=