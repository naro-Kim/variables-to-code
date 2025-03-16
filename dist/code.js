/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/utils/parser.ts":
/*!*****************************!*\
  !*** ./src/utils/parser.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   hslValueToString: () => (/* binding */ hslValueToString),
/* harmony export */   pxToRem: () => (/* binding */ pxToRem),
/* harmony export */   rgbToHsl: () => (/* binding */ rgbToHsl)
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
const pxToRem = (px, base = 16) => `${px / base}rem`;


/***/ }),

/***/ "./src/utils/utils-css.ts":
/*!********************************!*\
  !*** ./src/utils/utils-css.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   downloadCSS: () => (/* binding */ downloadCSS),
/* harmony export */   exportCSS: () => (/* binding */ exportCSS),
/* harmony export */   generateCSS: () => (/* binding */ generateCSS)
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
 * Formats a variable value into a CSS-compatible string
 */
function formatValueForCSS(value, type) {
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
            const hsl = (0,_parser__WEBPACK_IMPORTED_MODULE_0__.rgbToHsl)({ r: r * 255, g: g * 255, b: b * 255 });
            if (a < 1) {
                return `hsla(${(0,_parser__WEBPACK_IMPORTED_MODULE_0__.hslValueToString)(hsl)}, ${a.toFixed(2)})`;
            }
            return `hsl(${(0,_parser__WEBPACK_IMPORTED_MODULE_0__.hslValueToString)(hsl)})`;
        }
    }
    return JSON.stringify(value);
}
/**
 * Sanitizes a name for CSS variable use
 */
function sanitizeNameForCSS(name) {
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
                collection.variables.forEach((variable) => {
                    const varName = sanitizeNameForCSS(`${collectionName}-${variable.name}`);
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
                        const varName = sanitizeNameForCSS(`${collectionName}-${variable.name}`);
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
            if (collection.modes &&
                collection.modes.length > 1 &&
                typeof collection.variables === "object" &&
                !Array.isArray(collection.variables)) {
                // Skip the first mode as it's already in :root
                for (let i = 1; i < collection.modes.length; i++) {
                    const modeName = collection.modes[i];
                    const modeVars = collection.variables[modeName];
                    if (modeVars) {
                        cssOutput += `[data-theme="${sanitizeNameForCSS(modeName)}"] {\n`;
                        modeVars.forEach((variable) => {
                            const varName = sanitizeNameForCSS(`${collectionName}-${variable.name}`);
                            const varValue = formatValueForCSS(variable.value, collection.type);
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
function exportCSS() {
    return __awaiter(this, void 0, void 0, function* () {
        const cssContent = yield generateCSS();
        figma.ui.postMessage({ type: "export-css", data: cssContent });
    });
}
function downloadCSS() {
    return __awaiter(this, void 0, void 0, function* () {
        const cssContent = yield generateCSS();
        figma.ui.postMessage({ type: "download-css", data: cssContent });
    });
}


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
/* harmony import */ var _utils_utils_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/utils-css */ "./src/utils/utils-css.ts");
/* harmony import */ var _utils_utils_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/utils-json */ "./src/utils/utils-json.ts");


figma.on("run", _utils_utils_json__WEBPACK_IMPORTED_MODULE_1__.exportJSON);
figma.showUI(__html__, { width: 480, height: 800 });
figma.ui.onmessage = (msg) => {
    const type = msg.type;
    switch (type) {
        case "download-variables":
            (0,_utils_utils_json__WEBPACK_IMPORTED_MODULE_1__.downloadJSON)();
            break;
        case "download-css":
            (0,_utils_utils_css__WEBPACK_IMPORTED_MODULE_0__.downloadCSS)();
            break;
        case "download-config":
            // downloadTailwindConfig();
            break;
    }
};

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDeEI7QUFDQTtBQUNBLFlBQVksNkRBQVc7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdmFyaWFibGVzLXRvLWNvZGUvLi9zcmMvdXRpbHMvcGFyc2VyLnRzIiwid2VicGFjazovL3ZhcmlhYmxlcy10by1jb2RlLy4vc3JjL3V0aWxzL3V0aWxzLWNzcy50cyIsIndlYnBhY2s6Ly92YXJpYWJsZXMtdG8tY29kZS8uL3NyYy91dGlscy91dGlscy1qc29uLnRzIiwid2VicGFjazovL3ZhcmlhYmxlcy10by1jb2RlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3ZhcmlhYmxlcy10by1jb2RlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly92YXJpYWJsZXMtdG8tY29kZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3ZhcmlhYmxlcy10by1jb2RlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdmFyaWFibGVzLXRvLWNvZGUvLi9zcmMvbWFpbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgcmdiVG9Ic2wgPSAoeyByLCBnLCBiIH0pID0+IHtcbiAgICByIC89IDI1NTtcbiAgICBnIC89IDI1NTtcbiAgICBiIC89IDI1NTtcbiAgICBjb25zdCBtYXggPSBNYXRoLm1heChyLCBnLCBiKTtcbiAgICBjb25zdCBtaW4gPSBNYXRoLm1pbihyLCBnLCBiKTtcbiAgICBsZXQgaCA9IDA7XG4gICAgbGV0IHMgPSAwO1xuICAgIGNvbnN0IGwgPSAobWF4ICsgbWluKSAvIDI7XG4gICAgaWYgKG1heCAhPT0gbWluKSB7XG4gICAgICAgIGNvbnN0IGQgPSBtYXggLSBtaW47XG4gICAgICAgIHMgPSBsID4gMC41ID8gZCAvICgyIC0gbWF4IC0gbWluKSA6IGQgLyAobWF4ICsgbWluKTtcbiAgICAgICAgc3dpdGNoIChtYXgpIHtcbiAgICAgICAgICAgIGNhc2UgcjpcbiAgICAgICAgICAgICAgICBoID0gKGcgLSBiKSAvIGQgKyAoZyA8IGIgPyA2IDogMCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGc6XG4gICAgICAgICAgICAgICAgaCA9IChiIC0gcikgLyBkICsgMjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgYjpcbiAgICAgICAgICAgICAgICBoID0gKHIgLSBnKSAvIGQgKyA0O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGggLz0gNjtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgaDogTWF0aC5yb3VuZChoICogMzYwKSxcbiAgICAgICAgczogTWF0aC5yb3VuZChzICogMTAwKSxcbiAgICAgICAgbDogTWF0aC5yb3VuZChsICogMTAwKSxcbiAgICB9O1xufTtcbmV4cG9ydCBjb25zdCBoc2xWYWx1ZVRvU3RyaW5nID0gKHsgaCwgcywgbCB9KSA9PiBgJHtofSwgJHtzfSUsICR7bH0lYDtcbmV4cG9ydCBjb25zdCBweFRvUmVtID0gKHB4LCBiYXNlID0gMTYpID0+IGAke3B4IC8gYmFzZX1yZW1gO1xuIiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5pbXBvcnQgeyBoc2xWYWx1ZVRvU3RyaW5nLCByZ2JUb0hzbCB9IGZyb20gXCIuL3BhcnNlclwiO1xuLyoqXG4gKiBGb3JtYXRzIGEgdmFyaWFibGUgdmFsdWUgaW50byBhIENTUy1jb21wYXRpYmxlIHN0cmluZ1xuICovXG5mdW5jdGlvbiBmb3JtYXRWYWx1ZUZvckNTUyh2YWx1ZSwgdHlwZSkge1xuICAgIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBcImluaXRpYWxcIjtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIikge1xuICAgICAgICAvLyBIYW5kbGUgc3BhY2luZywgc2l6aW5nIHZhbHVlc1xuICAgICAgICBpZiAodHlwZSA9PT0gXCJGTE9BVFwiIHx8IHR5cGUgPT09IFwiSU5URUdFUlwiKSB7XG4gICAgICAgICAgICByZXR1cm4gYCR7dmFsdWV9cHhgO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZS50b1N0cmluZygpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gICAgLy8gSGFuZGxlIGNvbG9yIHZhbHVlc1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgaWYgKFwiclwiIGluIHZhbHVlICYmIFwiZ1wiIGluIHZhbHVlICYmIFwiYlwiIGluIHZhbHVlKSB7XG4gICAgICAgICAgICBjb25zdCB7IHIsIGcsIGIsIGEgPSAxIH0gPSB2YWx1ZTtcbiAgICAgICAgICAgIGNvbnN0IGhzbCA9IHJnYlRvSHNsKHsgcjogciAqIDI1NSwgZzogZyAqIDI1NSwgYjogYiAqIDI1NSB9KTtcbiAgICAgICAgICAgIGlmIChhIDwgMSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBgaHNsYSgke2hzbFZhbHVlVG9TdHJpbmcoaHNsKX0sICR7YS50b0ZpeGVkKDIpfSlgO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGBoc2woJHtoc2xWYWx1ZVRvU3RyaW5nKGhzbCl9KWA7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcbn1cbi8qKlxuICogU2FuaXRpemVzIGEgbmFtZSBmb3IgQ1NTIHZhcmlhYmxlIHVzZVxuICovXG5mdW5jdGlvbiBzYW5pdGl6ZU5hbWVGb3JDU1MobmFtZSkge1xuICAgIC8vIFJlcGxhY2Ugc3BhY2VzIGFuZCBzcGVjaWFsIGNoYXJhY3RlcnMgd2l0aCBkYXNoZXNcbiAgICByZXR1cm4gbmFtZVxuICAgICAgICAudHJpbSgpXG4gICAgICAgIC50b0xvd2VyQ2FzZSgpXG4gICAgICAgIC5yZXBsYWNlKC9bXmEtejAtOV0vZywgXCItXCIpXG4gICAgICAgIC5yZXBsYWNlKC8tKy9nLCBcIi1cIikgLy8gUmVwbGFjZSBtdWx0aXBsZSBjb25zZWN1dGl2ZSBkYXNoZXMgd2l0aCBhIHNpbmdsZSBkYXNoXG4gICAgICAgIC5yZXBsYWNlKC9eLXwtJC9nLCBcIlwiKTsgLy8gUmVtb3ZlIGxlYWRpbmcvdHJhaWxpbmcgZGFzaGVzXG59XG4vKipcbiAqIEdlbmVyYXRlcyBDU1MgY3VzdG9tIHByb3BlcnRpZXMgZnJvbSB2YXJpYWJsZXNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlQ1NTKCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSAoeWllbGQgZmlnbWEuY2xpZW50U3RvcmFnZS5nZXRBc3luYyhcInZhcmlhYmxlc0pzb25cIikpO1xuICAgICAgICBpZiAoIWRhdGEgfHwgT2JqZWN0LmtleXMoZGF0YSkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gXCIvKiBObyB2YXJpYWJsZXMgZm91bmQgKi9cIjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgY3NzT3V0cHV0ID0gYDpyb290IHtcXG5gO1xuICAgICAgICAvLyBQcm9jZXNzIGVhY2ggY29sbGVjdGlvblxuICAgICAgICBmb3IgKGNvbnN0IGNvbGxlY3Rpb25OYW1lIGluIGRhdGEpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbGxlY3Rpb24gPSBkYXRhW2NvbGxlY3Rpb25OYW1lXTtcbiAgICAgICAgICAgIGNzc091dHB1dCArPSBgICAvKiAke2NvbGxlY3Rpb25OYW1lfSAqL1xcbmA7XG4gICAgICAgICAgICAvLyBIYW5kbGUgc2ltcGxlIChub24tbW9kZWQpIGNvbGxlY3Rpb25zIGZpcnN0XG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShjb2xsZWN0aW9uLnZhcmlhYmxlcykpIHtcbiAgICAgICAgICAgICAgICBjb2xsZWN0aW9uLnZhcmlhYmxlcy5mb3JFYWNoKCh2YXJpYWJsZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB2YXJOYW1lID0gc2FuaXRpemVOYW1lRm9yQ1NTKGAke2NvbGxlY3Rpb25OYW1lfS0ke3ZhcmlhYmxlLm5hbWV9YCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhclZhbHVlID0gZm9ybWF0VmFsdWVGb3JDU1ModmFyaWFibGUudmFsdWUsIGNvbGxlY3Rpb24udHlwZSk7XG4gICAgICAgICAgICAgICAgICAgIGNzc091dHB1dCArPSBgICAtLSR7dmFyTmFtZX06ICR7dmFyVmFsdWV9O1xcbmA7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBIYW5kbGUgY29sbGVjdGlvbnMgd2l0aCBtb2Rlc1xuICAgICAgICAgICAgZWxzZSBpZiAoY29sbGVjdGlvbi5tb2RlcyAmJiBjb2xsZWN0aW9uLm1vZGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAvLyBBZGQgZGVmYXVsdCBtb2RlIHZhcmlhYmxlcyB0byA6cm9vdFxuICAgICAgICAgICAgICAgIGNvbnN0IGRlZmF1bHRNb2RlID0gY29sbGVjdGlvbi5tb2Rlc1swXTtcbiAgICAgICAgICAgICAgICBjb25zdCBkZWZhdWx0TW9kZVZhcnMgPSBjb2xsZWN0aW9uLnZhcmlhYmxlc1tkZWZhdWx0TW9kZV07XG4gICAgICAgICAgICAgICAgaWYgKGRlZmF1bHRNb2RlVmFycykge1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0TW9kZVZhcnMuZm9yRWFjaCgodmFyaWFibGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhck5hbWUgPSBzYW5pdGl6ZU5hbWVGb3JDU1MoYCR7Y29sbGVjdGlvbk5hbWV9LSR7dmFyaWFibGUubmFtZX1gKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhclZhbHVlID0gZm9ybWF0VmFsdWVGb3JDU1ModmFyaWFibGUudmFsdWUsIGNvbGxlY3Rpb24udHlwZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjc3NPdXRwdXQgKz0gYCAgLS0ke3Zhck5hbWV9OiAke3ZhclZhbHVlfTtcXG5gO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY3NzT3V0cHV0ICs9IGB9XFxuXFxuYDtcbiAgICAgICAgLy8gUHJvY2VzcyBtb2RlcyBmb3IgZWFjaCBjb2xsZWN0aW9uIHdpdGggdGhlbWUgdmFyaWFudHNcbiAgICAgICAgZm9yIChjb25zdCBjb2xsZWN0aW9uTmFtZSBpbiBkYXRhKSB7XG4gICAgICAgICAgICBjb25zdCBjb2xsZWN0aW9uID0gZGF0YVtjb2xsZWN0aW9uTmFtZV07XG4gICAgICAgICAgICBpZiAoY29sbGVjdGlvbi5tb2RlcyAmJlxuICAgICAgICAgICAgICAgIGNvbGxlY3Rpb24ubW9kZXMubGVuZ3RoID4gMSAmJlxuICAgICAgICAgICAgICAgIHR5cGVvZiBjb2xsZWN0aW9uLnZhcmlhYmxlcyA9PT0gXCJvYmplY3RcIiAmJlxuICAgICAgICAgICAgICAgICFBcnJheS5pc0FycmF5KGNvbGxlY3Rpb24udmFyaWFibGVzKSkge1xuICAgICAgICAgICAgICAgIC8vIFNraXAgdGhlIGZpcnN0IG1vZGUgYXMgaXQncyBhbHJlYWR5IGluIDpyb290XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBjb2xsZWN0aW9uLm1vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG1vZGVOYW1lID0gY29sbGVjdGlvbi5tb2Rlc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbW9kZVZhcnMgPSBjb2xsZWN0aW9uLnZhcmlhYmxlc1ttb2RlTmFtZV07XG4gICAgICAgICAgICAgICAgICAgIGlmIChtb2RlVmFycykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3NzT3V0cHV0ICs9IGBbZGF0YS10aGVtZT1cIiR7c2FuaXRpemVOYW1lRm9yQ1NTKG1vZGVOYW1lKX1cIl0ge1xcbmA7XG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlVmFycy5mb3JFYWNoKCh2YXJpYWJsZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhck5hbWUgPSBzYW5pdGl6ZU5hbWVGb3JDU1MoYCR7Y29sbGVjdGlvbk5hbWV9LSR7dmFyaWFibGUubmFtZX1gKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB2YXJWYWx1ZSA9IGZvcm1hdFZhbHVlRm9yQ1NTKHZhcmlhYmxlLnZhbHVlLCBjb2xsZWN0aW9uLnR5cGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNzc091dHB1dCArPSBgICAtLSR7dmFyTmFtZX06ICR7dmFyVmFsdWV9O1xcbmA7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNzc091dHB1dCArPSBgfVxcblxcbmA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNzc091dHB1dDtcbiAgICB9KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBleHBvcnRDU1MoKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgY29uc3QgY3NzQ29udGVudCA9IHlpZWxkIGdlbmVyYXRlQ1NTKCk7XG4gICAgICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKHsgdHlwZTogXCJleHBvcnQtY3NzXCIsIGRhdGE6IGNzc0NvbnRlbnQgfSk7XG4gICAgfSk7XG59XG5leHBvcnQgZnVuY3Rpb24gZG93bmxvYWRDU1MoKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgY29uc3QgY3NzQ29udGVudCA9IHlpZWxkIGdlbmVyYXRlQ1NTKCk7XG4gICAgICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKHsgdHlwZTogXCJkb3dubG9hZC1jc3NcIiwgZGF0YTogY3NzQ29udGVudCB9KTtcbiAgICB9KTtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG4vKipcbiAqIFJlc29sdmVzIHZhcmlhYmxlIGFsaWFzZXMgcmVjdXJzaXZlbHlcbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFyaWFibGUgdmFsdWUgdGhhdCBtaWdodCBiZSBhbiBhbGlhc1xuICogQHBhcmFtIHZhcmlhYmxlcyBBbGwgYXZhaWxhYmxlIHZhcmlhYmxlcyBmb3IgbG9va3VwXG4gKiBAcGFyYW0gdmlzaXRlZElkcyBTZXQgb2YgYWxyZWFkeSB2aXNpdGVkIHZhcmlhYmxlIElEcyB0byBwcmV2ZW50IGluZmluaXRlIHJlY3Vyc2lvblxuICogQHJldHVybnMgVGhlIHJlc29sdmVkIHZhbHVlXG4gKi9cbmZ1bmN0aW9uIHJlc29sdmVWYXJpYWJsZUFsaWFzKHZhbHVlLCB2YXJpYWJsZXMsIHZpc2l0ZWRJZHMgPSBuZXcgU2V0KCkpIHtcbiAgICAvLyBDaGVjayBpZiB0aGUgdmFsdWUgaXMgYSB2YXJpYWJsZSBhbGlhc1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiZcbiAgICAgICAgdmFsdWUgIT09IG51bGwgJiZcbiAgICAgICAgXCJ0eXBlXCIgaW4gdmFsdWUgJiZcbiAgICAgICAgdmFsdWUudHlwZSA9PT0gXCJWQVJJQUJMRV9BTElBU1wiKSB7XG4gICAgICAgIGNvbnN0IGFsaWFzVmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgLy8gUHJldmVudCBjaXJjdWxhciByZWZlcmVuY2VzXG4gICAgICAgIGlmICh2aXNpdGVkSWRzLmhhcyhhbGlhc1ZhbHVlLmlkKSkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKFwiQ2lyY3VsYXIgcmVmZXJlbmNlIGRldGVjdGVkIGluIHZhcmlhYmxlIGFsaWFzZXM6XCIsIGFsaWFzVmFsdWUuaWQpO1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlOyAvLyBSZXR1cm4gdGhlIG9yaWdpbmFsIGFsaWFzIHRvIGF2b2lkIGluZmluaXRlIHJlY3Vyc2lvblxuICAgICAgICB9XG4gICAgICAgIC8vIEZpbmQgdGhlIHJlZmVyZW5jZWQgdmFyaWFibGVcbiAgICAgICAgY29uc3QgcmVmZXJlbmNlZFZhcmlhYmxlID0gdmFyaWFibGVzLmZpbmQoKHYpID0+IHYuaWQgPT09IGFsaWFzVmFsdWUuaWQpO1xuICAgICAgICBpZiAocmVmZXJlbmNlZFZhcmlhYmxlKSB7XG4gICAgICAgICAgICAvLyBHZXQgdGhlIGFwcHJvcHJpYXRlIG1vZGUgSUQgLSB1c2luZyB0aGUgZmlyc3QgbW9kZSBhcyBkZWZhdWx0XG4gICAgICAgICAgICBjb25zdCBtb2RlSWQgPSBPYmplY3Qua2V5cyhyZWZlcmVuY2VkVmFyaWFibGUudmFsdWVzQnlNb2RlKVswXTtcbiAgICAgICAgICAgIGlmIChtb2RlSWQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCByZWZlcmVuY2VkVmFsdWUgPSByZWZlcmVuY2VkVmFyaWFibGUudmFsdWVzQnlNb2RlW21vZGVJZF07XG4gICAgICAgICAgICAgICAgLy8gVHJhY2sgdGhpcyBJRCB0byBwcmV2ZW50IGNpcmN1bGFyIHJlZmVyZW5jZXNcbiAgICAgICAgICAgICAgICB2aXNpdGVkSWRzLmFkZChhbGlhc1ZhbHVlLmlkKTtcbiAgICAgICAgICAgICAgICAvLyBSZWN1cnNpdmVseSByZXNvbHZlIGluIGNhc2UgdGhlIHJlZmVyZW5jZWQgdmFsdWUgaXMgYWxzbyBhbiBhbGlhc1xuICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlVmFyaWFibGVBbGlhcyhyZWZlcmVuY2VkVmFsdWUsIHZhcmlhYmxlcywgdmlzaXRlZElkcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gUmV0dXJuIG9yaWdpbmFsIHZhbHVlIGlmIGl0J3Mgbm90IGFuIGFsaWFzIG9yIHJlZmVyZW5jZWQgdmFyaWFibGUgbm90IGZvdW5kXG4gICAgcmV0dXJuIHZhbHVlO1xufVxuLy8gVmFyaWFibGVzIOuNsOydtO2EsCDqsIDsoLjsmKTquLBcbmV4cG9ydCBmdW5jdGlvbiBnZXRWYXJpYWJsZXMoKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgY29uc3QgdmFyaWFibGVzID0geWllbGQgZmlnbWEudmFyaWFibGVzLmdldExvY2FsVmFyaWFibGVzQXN5bmMoKTsgLy8g66qo65OgIFZhcmlhYmxlcyDqsIDsoLjsmKTquLBcbiAgICAgICAgY29uc3QgY29sbGVjdGlvbnMgPSB5aWVsZCBmaWdtYS52YXJpYWJsZXMuZ2V0TG9jYWxWYXJpYWJsZUNvbGxlY3Rpb25zQXN5bmMoKTsgLy8g66qo65OgIFZhcmlhYmxlcyBDb2xsZWN0aW9uIOqwgOyguOyYpOq4sFxuICAgICAgICBjb25zdCB0b2tlbkRhdGEgPSB7fTtcbiAgICAgICAgLy8gUHJvY2VzcyBlYWNoIGNvbGxlY3Rpb25cbiAgICAgICAgY29sbGVjdGlvbnMuZm9yRWFjaCgoY29sbGVjdGlvbikgPT4ge1xuICAgICAgICAgICAgY29uc3QgY29sbGVjdGlvbk5hbWUgPSBjb2xsZWN0aW9uLm5hbWU7XG4gICAgICAgICAgICBpZiAoIXRva2VuRGF0YVtjb2xsZWN0aW9uTmFtZV0pIHtcbiAgICAgICAgICAgICAgICAvLyBJbml0aWFsaXplIHRoZSBjb2xsZWN0aW9uIHN0cnVjdHVyZSBiYXNlZCBvbiB3aGV0aGVyIGl0IGhhcyBtb2Rlc1xuICAgICAgICAgICAgICAgIGNvbnN0IGhhc01vZGVzID0gY29sbGVjdGlvbi5tb2Rlcy5sZW5ndGggPiAxO1xuICAgICAgICAgICAgICAgIHRva2VuRGF0YVtjb2xsZWN0aW9uTmFtZV0gPSB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiXCIsIC8vIFdpbGwgYmUgc2V0IGxhdGVyXG4gICAgICAgICAgICAgICAgICAgIHZhcmlhYmxlczoge30sIC8vIFdpbGwgYmUgc2V0IGxhdGVyXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBpZiAoaGFzTW9kZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQWRkIG1vZGVzIG9ubHkgaWYgdGhlcmUgYXJlIG11bHRpcGxlIG1vZGVzXG4gICAgICAgICAgICAgICAgICAgIHRva2VuRGF0YVtjb2xsZWN0aW9uTmFtZV0ubW9kZXMgPSBjb2xsZWN0aW9uLm1vZGVzLm1hcCgobW9kZSkgPT4gbW9kZS5uYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW5EYXRhW2NvbGxlY3Rpb25OYW1lXS52YXJpYWJsZXMgPSB7fTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEZvciBjb2xsZWN0aW9ucyB3aXRob3V0IG11bHRpcGxlIG1vZGVzLCBpbml0aWFsaXplIHZhcmlhYmxlcyBhcyBhcnJheVxuICAgICAgICAgICAgICAgICAgICB0b2tlbkRhdGFbY29sbGVjdGlvbk5hbWVdLnZhcmlhYmxlcyA9IFtdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBGaW5kIGFsbCB2YXJpYWJsZXMgYmVsb25naW5nIHRvIHRoaXMgY29sbGVjdGlvblxuICAgICAgICAgICAgICAgIGNvbnN0IGNvbGxlY3Rpb25WYXJpYWJsZXMgPSB2YXJpYWJsZXMuZmlsdGVyKCh2YXJpYWJsZSkgPT4gdmFyaWFibGUudmFyaWFibGVDb2xsZWN0aW9uSWQgPT09IGNvbGxlY3Rpb24uaWQpO1xuICAgICAgICAgICAgICAgIC8vIEFkZCB0eXBlIGluZm9ybWF0aW9uIGlmIGF2YWlsYWJsZSAoZnJvbSB0aGUgZmlyc3QgdmFyaWFibGUpXG4gICAgICAgICAgICAgICAgaWYgKGNvbGxlY3Rpb25WYXJpYWJsZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbkRhdGFbY29sbGVjdGlvbk5hbWVdLnR5cGUgPSBjb2xsZWN0aW9uVmFyaWFibGVzWzBdLnJlc29sdmVkVHlwZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGhhc01vZGVzKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFByb2Nlc3MgdmFyaWFibGVzIGZvciBlYWNoIG1vZGVcbiAgICAgICAgICAgICAgICAgICAgY29sbGVjdGlvbi5tb2Rlcy5mb3JFYWNoKChtb2RlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBtb2RlTmFtZSA9IG1vZGUubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuRGF0YVtjb2xsZWN0aW9uTmFtZV0udmFyaWFibGVzW21vZGVOYW1lXSA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQWRkIHZhcmlhYmxlIHZhbHVlcyBmb3IgdGhpcyBtb2RlXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xsZWN0aW9uVmFyaWFibGVzLmZvckVhY2goKHZhcmlhYmxlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFsdWVGb3JNb2RlID0gdmFyaWFibGUudmFsdWVzQnlNb2RlW21vZGUubW9kZUlkXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBSZXNvbHZlIGFueSB2YXJpYWJsZSBhbGlhc2VzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzb2x2ZWRWYWx1ZSA9IHJlc29sdmVWYXJpYWJsZUFsaWFzKHZhbHVlRm9yTW9kZSwgdmFyaWFibGVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBBZGQgdGhlIHZhcmlhYmxlIHdpdGggaXRzIHJlc29sdmVkIHZhbHVlIGZvciB0aGlzIG1vZGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2tlbkRhdGFbY29sbGVjdGlvbk5hbWVdLnZhcmlhYmxlc1ttb2RlTmFtZV0ucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHZhcmlhYmxlLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiB2YXJpYWJsZS5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHJlc29sdmVkVmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBGb3IgY29sbGVjdGlvbnMgd2l0aG91dCBtdWx0aXBsZSBtb2RlcywganVzdCB1c2UgdGhlIGZpcnN0IG1vZGVcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGVmYXVsdE1vZGUgPSBjb2xsZWN0aW9uLm1vZGVzWzBdO1xuICAgICAgICAgICAgICAgICAgICAvLyBBZGQgdmFyaWFibGUgdmFsdWVzIGRpcmVjdGx5IHRvIHRoZSBhcnJheVxuICAgICAgICAgICAgICAgICAgICBjb2xsZWN0aW9uVmFyaWFibGVzLmZvckVhY2goKHZhcmlhYmxlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZUZvck1vZGUgPSB2YXJpYWJsZS52YWx1ZXNCeU1vZGVbZGVmYXVsdE1vZGUubW9kZUlkXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJlc29sdmUgYW55IHZhcmlhYmxlIGFsaWFzZXNcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc29sdmVkVmFsdWUgPSByZXNvbHZlVmFyaWFibGVBbGlhcyh2YWx1ZUZvck1vZGUsIHZhcmlhYmxlcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBBZGQgdGhlIHZhcmlhYmxlIHdpdGggaXRzIHJlc29sdmVkIHZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbkRhdGFbY29sbGVjdGlvbk5hbWVdLnZhcmlhYmxlcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiB2YXJpYWJsZS5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiB2YXJpYWJsZS5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcmVzb2x2ZWRWYWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBmaWdtYS5jbGllbnRTdG9yYWdlLnNldEFzeW5jKFwidmFyaWFibGVzSnNvblwiLCB0b2tlbkRhdGEpO1xuICAgIH0pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGV4cG9ydEpTT04oKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgeWllbGQgZ2V0VmFyaWFibGVzKCk7XG4gICAgICAgIGNvbnN0IGRhdGEgPSB5aWVsZCBmaWdtYS5jbGllbnRTdG9yYWdlLmdldEFzeW5jKFwidmFyaWFibGVzSnNvblwiKTtcbiAgICAgICAgY29uc3QganNvblN0cmluZyA9IEpTT04uc3RyaW5naWZ5KGRhdGEsIG51bGwsIDIpO1xuICAgICAgICBmaWdtYS51aS5wb3N0TWVzc2FnZSh7IHR5cGU6IFwiZXhwb3J0LXZhcmlhYmxlc1wiLCBkYXRhOiBqc29uU3RyaW5nIH0pO1xuICAgIH0pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGRvd25sb2FkSlNPTigpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBjb25zdCBkYXRhID0geWllbGQgZmlnbWEuY2xpZW50U3RvcmFnZS5nZXRBc3luYyhcInZhcmlhYmxlc0pzb25cIik7XG4gICAgICAgIGNvbnN0IGpzb25TdHJpbmcgPSBKU09OLnN0cmluZ2lmeShkYXRhLCBudWxsLCAyKTtcbiAgICAgICAgZmlnbWEudWkucG9zdE1lc3NhZ2UoeyB0eXBlOiBcImRvd25sb2FkLXZhcmlhYmxlc1wiLCBkYXRhOiBqc29uU3RyaW5nIH0pO1xuICAgIH0pO1xufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBkb3dubG9hZENTUyB9IGZyb20gXCIuL3V0aWxzL3V0aWxzLWNzc1wiO1xuaW1wb3J0IHsgZG93bmxvYWRKU09OLCBleHBvcnRKU09OIH0gZnJvbSBcIi4vdXRpbHMvdXRpbHMtanNvblwiO1xuZmlnbWEub24oXCJydW5cIiwgZXhwb3J0SlNPTik7XG5maWdtYS5zaG93VUkoX19odG1sX18sIHsgd2lkdGg6IDQ4MCwgaGVpZ2h0OiA4MDAgfSk7XG5maWdtYS51aS5vbm1lc3NhZ2UgPSAobXNnKSA9PiB7XG4gICAgY29uc3QgdHlwZSA9IG1zZy50eXBlO1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICBjYXNlIFwiZG93bmxvYWQtdmFyaWFibGVzXCI6XG4gICAgICAgICAgICBkb3dubG9hZEpTT04oKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiZG93bmxvYWQtY3NzXCI6XG4gICAgICAgICAgICBkb3dubG9hZENTUygpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJkb3dubG9hZC1jb25maWdcIjpcbiAgICAgICAgICAgIC8vIGRvd25sb2FkVGFpbHdpbmRDb25maWcoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=