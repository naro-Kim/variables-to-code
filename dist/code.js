/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
                    type: undefined, // Will be set later
                    variables: undefined, // Will be set later
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
/* harmony import */ var _utils_utils_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/utils-json */ "./src/utils/utils-json.ts");

figma.on("run", _utils_utils_json__WEBPACK_IMPORTED_MODULE_0__.exportJSON);
figma.showUI(__html__, { width: 480, height: 800 });
figma.ui.onmessage = (msg) => {
    const type = msg.type;
    switch (type) {
        case "download-variables":
            (0,_utils_utils_json__WEBPACK_IMPORTED_MODULE_0__.downloadJSON)();
            break;
        case "download-css":
            console.log("CSS");
            break;
        case "download-config":
            console.log("Config");
            break;
    }
};

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29kZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQWE7QUFDYixpQkFBaUIsU0FBSSxJQUFJLFNBQUk7QUFDN0IsNEJBQTRCLCtEQUErRCxpQkFBaUI7QUFDNUc7QUFDQSxvQ0FBb0MsTUFBTSwrQkFBK0IsWUFBWTtBQUNyRixtQ0FBbUMsTUFBTSxtQ0FBbUMsWUFBWTtBQUN4RixnQ0FBZ0M7QUFDaEM7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBLDBFQUEwRTtBQUMxRSxzRkFBc0Y7QUFDdEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3Qix5QkFBeUI7QUFDekIscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekIscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxLQUFLO0FBQ0w7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLDRDQUE0QztBQUMzRSxLQUFLO0FBQ0w7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBLCtCQUErQiw4Q0FBOEM7QUFDN0UsS0FBSztBQUNMOzs7Ozs7O1VDbklBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOOEQ7QUFDOUQsZ0JBQWdCLHlEQUFVO0FBQzFCLHlCQUF5Qix5QkFBeUI7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLCtEQUFZO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3ZhcmlhYmxlcy10by1jb2RlLy4vc3JjL3V0aWxzL3V0aWxzLWpzb24udHMiLCJ3ZWJwYWNrOi8vdmFyaWFibGVzLXRvLWNvZGUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdmFyaWFibGVzLXRvLWNvZGUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3ZhcmlhYmxlcy10by1jb2RlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdmFyaWFibGVzLXRvLWNvZGUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly92YXJpYWJsZXMtdG8tY29kZS8uL3NyYy9tYWluLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG4vKipcbiAqIFJlc29sdmVzIHZhcmlhYmxlIGFsaWFzZXMgcmVjdXJzaXZlbHlcbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFyaWFibGUgdmFsdWUgdGhhdCBtaWdodCBiZSBhbiBhbGlhc1xuICogQHBhcmFtIHZhcmlhYmxlcyBBbGwgYXZhaWxhYmxlIHZhcmlhYmxlcyBmb3IgbG9va3VwXG4gKiBAcGFyYW0gdmlzaXRlZElkcyBTZXQgb2YgYWxyZWFkeSB2aXNpdGVkIHZhcmlhYmxlIElEcyB0byBwcmV2ZW50IGluZmluaXRlIHJlY3Vyc2lvblxuICogQHJldHVybnMgVGhlIHJlc29sdmVkIHZhbHVlXG4gKi9cbmZ1bmN0aW9uIHJlc29sdmVWYXJpYWJsZUFsaWFzKHZhbHVlLCB2YXJpYWJsZXMsIHZpc2l0ZWRJZHMgPSBuZXcgU2V0KCkpIHtcbiAgICAvLyBDaGVjayBpZiB0aGUgdmFsdWUgaXMgYSB2YXJpYWJsZSBhbGlhc1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiZcbiAgICAgICAgdmFsdWUgIT09IG51bGwgJiZcbiAgICAgICAgXCJ0eXBlXCIgaW4gdmFsdWUgJiZcbiAgICAgICAgdmFsdWUudHlwZSA9PT0gXCJWQVJJQUJMRV9BTElBU1wiKSB7XG4gICAgICAgIGNvbnN0IGFsaWFzVmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgLy8gUHJldmVudCBjaXJjdWxhciByZWZlcmVuY2VzXG4gICAgICAgIGlmICh2aXNpdGVkSWRzLmhhcyhhbGlhc1ZhbHVlLmlkKSkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKFwiQ2lyY3VsYXIgcmVmZXJlbmNlIGRldGVjdGVkIGluIHZhcmlhYmxlIGFsaWFzZXM6XCIsIGFsaWFzVmFsdWUuaWQpO1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlOyAvLyBSZXR1cm4gdGhlIG9yaWdpbmFsIGFsaWFzIHRvIGF2b2lkIGluZmluaXRlIHJlY3Vyc2lvblxuICAgICAgICB9XG4gICAgICAgIC8vIEZpbmQgdGhlIHJlZmVyZW5jZWQgdmFyaWFibGVcbiAgICAgICAgY29uc3QgcmVmZXJlbmNlZFZhcmlhYmxlID0gdmFyaWFibGVzLmZpbmQoKHYpID0+IHYuaWQgPT09IGFsaWFzVmFsdWUuaWQpO1xuICAgICAgICBpZiAocmVmZXJlbmNlZFZhcmlhYmxlKSB7XG4gICAgICAgICAgICAvLyBHZXQgdGhlIGFwcHJvcHJpYXRlIG1vZGUgSUQgLSB1c2luZyB0aGUgZmlyc3QgbW9kZSBhcyBkZWZhdWx0XG4gICAgICAgICAgICBjb25zdCBtb2RlSWQgPSBPYmplY3Qua2V5cyhyZWZlcmVuY2VkVmFyaWFibGUudmFsdWVzQnlNb2RlKVswXTtcbiAgICAgICAgICAgIGlmIChtb2RlSWQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCByZWZlcmVuY2VkVmFsdWUgPSByZWZlcmVuY2VkVmFyaWFibGUudmFsdWVzQnlNb2RlW21vZGVJZF07XG4gICAgICAgICAgICAgICAgLy8gVHJhY2sgdGhpcyBJRCB0byBwcmV2ZW50IGNpcmN1bGFyIHJlZmVyZW5jZXNcbiAgICAgICAgICAgICAgICB2aXNpdGVkSWRzLmFkZChhbGlhc1ZhbHVlLmlkKTtcbiAgICAgICAgICAgICAgICAvLyBSZWN1cnNpdmVseSByZXNvbHZlIGluIGNhc2UgdGhlIHJlZmVyZW5jZWQgdmFsdWUgaXMgYWxzbyBhbiBhbGlhc1xuICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlVmFyaWFibGVBbGlhcyhyZWZlcmVuY2VkVmFsdWUsIHZhcmlhYmxlcywgdmlzaXRlZElkcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gUmV0dXJuIG9yaWdpbmFsIHZhbHVlIGlmIGl0J3Mgbm90IGFuIGFsaWFzIG9yIHJlZmVyZW5jZWQgdmFyaWFibGUgbm90IGZvdW5kXG4gICAgcmV0dXJuIHZhbHVlO1xufVxuLy8gVmFyaWFibGVzIOuNsOydtO2EsCDqsIDsoLjsmKTquLBcbmV4cG9ydCBmdW5jdGlvbiBnZXRWYXJpYWJsZXMoKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgY29uc3QgdmFyaWFibGVzID0geWllbGQgZmlnbWEudmFyaWFibGVzLmdldExvY2FsVmFyaWFibGVzQXN5bmMoKTsgLy8g66qo65OgIFZhcmlhYmxlcyDqsIDsoLjsmKTquLBcbiAgICAgICAgY29uc3QgY29sbGVjdGlvbnMgPSB5aWVsZCBmaWdtYS52YXJpYWJsZXMuZ2V0TG9jYWxWYXJpYWJsZUNvbGxlY3Rpb25zQXN5bmMoKTsgLy8g66qo65OgIFZhcmlhYmxlcyBDb2xsZWN0aW9uIOqwgOyguOyYpOq4sFxuICAgICAgICBjb25zdCB0b2tlbkRhdGEgPSB7fTtcbiAgICAgICAgLy8gUHJvY2VzcyBlYWNoIGNvbGxlY3Rpb25cbiAgICAgICAgY29sbGVjdGlvbnMuZm9yRWFjaCgoY29sbGVjdGlvbikgPT4ge1xuICAgICAgICAgICAgY29uc3QgY29sbGVjdGlvbk5hbWUgPSBjb2xsZWN0aW9uLm5hbWU7XG4gICAgICAgICAgICBpZiAoIXRva2VuRGF0YVtjb2xsZWN0aW9uTmFtZV0pIHtcbiAgICAgICAgICAgICAgICAvLyBJbml0aWFsaXplIHRoZSBjb2xsZWN0aW9uIHN0cnVjdHVyZSBiYXNlZCBvbiB3aGV0aGVyIGl0IGhhcyBtb2Rlc1xuICAgICAgICAgICAgICAgIGNvbnN0IGhhc01vZGVzID0gY29sbGVjdGlvbi5tb2Rlcy5sZW5ndGggPiAxO1xuICAgICAgICAgICAgICAgIHRva2VuRGF0YVtjb2xsZWN0aW9uTmFtZV0gPSB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IHVuZGVmaW5lZCwgLy8gV2lsbCBiZSBzZXQgbGF0ZXJcbiAgICAgICAgICAgICAgICAgICAgdmFyaWFibGVzOiB1bmRlZmluZWQsIC8vIFdpbGwgYmUgc2V0IGxhdGVyXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBpZiAoaGFzTW9kZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQWRkIG1vZGVzIG9ubHkgaWYgdGhlcmUgYXJlIG11bHRpcGxlIG1vZGVzXG4gICAgICAgICAgICAgICAgICAgIHRva2VuRGF0YVtjb2xsZWN0aW9uTmFtZV0ubW9kZXMgPSBjb2xsZWN0aW9uLm1vZGVzLm1hcCgobW9kZSkgPT4gbW9kZS5uYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW5EYXRhW2NvbGxlY3Rpb25OYW1lXS52YXJpYWJsZXMgPSB7fTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEZvciBjb2xsZWN0aW9ucyB3aXRob3V0IG11bHRpcGxlIG1vZGVzLCBpbml0aWFsaXplIHZhcmlhYmxlcyBhcyBhcnJheVxuICAgICAgICAgICAgICAgICAgICB0b2tlbkRhdGFbY29sbGVjdGlvbk5hbWVdLnZhcmlhYmxlcyA9IFtdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBGaW5kIGFsbCB2YXJpYWJsZXMgYmVsb25naW5nIHRvIHRoaXMgY29sbGVjdGlvblxuICAgICAgICAgICAgICAgIGNvbnN0IGNvbGxlY3Rpb25WYXJpYWJsZXMgPSB2YXJpYWJsZXMuZmlsdGVyKCh2YXJpYWJsZSkgPT4gdmFyaWFibGUudmFyaWFibGVDb2xsZWN0aW9uSWQgPT09IGNvbGxlY3Rpb24uaWQpO1xuICAgICAgICAgICAgICAgIC8vIEFkZCB0eXBlIGluZm9ybWF0aW9uIGlmIGF2YWlsYWJsZSAoZnJvbSB0aGUgZmlyc3QgdmFyaWFibGUpXG4gICAgICAgICAgICAgICAgaWYgKGNvbGxlY3Rpb25WYXJpYWJsZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbkRhdGFbY29sbGVjdGlvbk5hbWVdLnR5cGUgPSBjb2xsZWN0aW9uVmFyaWFibGVzWzBdLnJlc29sdmVkVHlwZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGhhc01vZGVzKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFByb2Nlc3MgdmFyaWFibGVzIGZvciBlYWNoIG1vZGVcbiAgICAgICAgICAgICAgICAgICAgY29sbGVjdGlvbi5tb2Rlcy5mb3JFYWNoKChtb2RlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBtb2RlTmFtZSA9IG1vZGUubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuRGF0YVtjb2xsZWN0aW9uTmFtZV0udmFyaWFibGVzW21vZGVOYW1lXSA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQWRkIHZhcmlhYmxlIHZhbHVlcyBmb3IgdGhpcyBtb2RlXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xsZWN0aW9uVmFyaWFibGVzLmZvckVhY2goKHZhcmlhYmxlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFsdWVGb3JNb2RlID0gdmFyaWFibGUudmFsdWVzQnlNb2RlW21vZGUubW9kZUlkXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBSZXNvbHZlIGFueSB2YXJpYWJsZSBhbGlhc2VzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzb2x2ZWRWYWx1ZSA9IHJlc29sdmVWYXJpYWJsZUFsaWFzKHZhbHVlRm9yTW9kZSwgdmFyaWFibGVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBBZGQgdGhlIHZhcmlhYmxlIHdpdGggaXRzIHJlc29sdmVkIHZhbHVlIGZvciB0aGlzIG1vZGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2tlbkRhdGFbY29sbGVjdGlvbk5hbWVdLnZhcmlhYmxlc1ttb2RlTmFtZV0ucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHZhcmlhYmxlLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiB2YXJpYWJsZS5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHJlc29sdmVkVmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBGb3IgY29sbGVjdGlvbnMgd2l0aG91dCBtdWx0aXBsZSBtb2RlcywganVzdCB1c2UgdGhlIGZpcnN0IG1vZGVcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGVmYXVsdE1vZGUgPSBjb2xsZWN0aW9uLm1vZGVzWzBdO1xuICAgICAgICAgICAgICAgICAgICAvLyBBZGQgdmFyaWFibGUgdmFsdWVzIGRpcmVjdGx5IHRvIHRoZSBhcnJheVxuICAgICAgICAgICAgICAgICAgICBjb2xsZWN0aW9uVmFyaWFibGVzLmZvckVhY2goKHZhcmlhYmxlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZUZvck1vZGUgPSB2YXJpYWJsZS52YWx1ZXNCeU1vZGVbZGVmYXVsdE1vZGUubW9kZUlkXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJlc29sdmUgYW55IHZhcmlhYmxlIGFsaWFzZXNcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc29sdmVkVmFsdWUgPSByZXNvbHZlVmFyaWFibGVBbGlhcyh2YWx1ZUZvck1vZGUsIHZhcmlhYmxlcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBBZGQgdGhlIHZhcmlhYmxlIHdpdGggaXRzIHJlc29sdmVkIHZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbkRhdGFbY29sbGVjdGlvbk5hbWVdLnZhcmlhYmxlcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiB2YXJpYWJsZS5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiB2YXJpYWJsZS5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcmVzb2x2ZWRWYWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBmaWdtYS5jbGllbnRTdG9yYWdlLnNldEFzeW5jKFwidmFyaWFibGVzSnNvblwiLCB0b2tlbkRhdGEpO1xuICAgIH0pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGV4cG9ydEpTT04oKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgeWllbGQgZ2V0VmFyaWFibGVzKCk7XG4gICAgICAgIGNvbnN0IGRhdGEgPSB5aWVsZCBmaWdtYS5jbGllbnRTdG9yYWdlLmdldEFzeW5jKFwidmFyaWFibGVzSnNvblwiKTtcbiAgICAgICAgY29uc3QganNvblN0cmluZyA9IEpTT04uc3RyaW5naWZ5KGRhdGEsIG51bGwsIDIpO1xuICAgICAgICBmaWdtYS51aS5wb3N0TWVzc2FnZSh7IHR5cGU6IFwiZXhwb3J0LXZhcmlhYmxlc1wiLCBkYXRhOiBqc29uU3RyaW5nIH0pO1xuICAgIH0pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGRvd25sb2FkSlNPTigpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBjb25zdCBkYXRhID0geWllbGQgZmlnbWEuY2xpZW50U3RvcmFnZS5nZXRBc3luYyhcInZhcmlhYmxlc0pzb25cIik7XG4gICAgICAgIGNvbnN0IGpzb25TdHJpbmcgPSBKU09OLnN0cmluZ2lmeShkYXRhLCBudWxsLCAyKTtcbiAgICAgICAgZmlnbWEudWkucG9zdE1lc3NhZ2UoeyB0eXBlOiBcImRvd25sb2FkLXZhcmlhYmxlc1wiLCBkYXRhOiBqc29uU3RyaW5nIH0pO1xuICAgIH0pO1xufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBkb3dubG9hZEpTT04sIGV4cG9ydEpTT04gfSBmcm9tIFwiLi91dGlscy91dGlscy1qc29uXCI7XG5maWdtYS5vbihcInJ1blwiLCBleHBvcnRKU09OKTtcbmZpZ21hLnNob3dVSShfX2h0bWxfXywgeyB3aWR0aDogNDgwLCBoZWlnaHQ6IDgwMCB9KTtcbmZpZ21hLnVpLm9ubWVzc2FnZSA9IChtc2cpID0+IHtcbiAgICBjb25zdCB0eXBlID0gbXNnLnR5cGU7XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgIGNhc2UgXCJkb3dubG9hZC12YXJpYWJsZXNcIjpcbiAgICAgICAgICAgIGRvd25sb2FkSlNPTigpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJkb3dubG9hZC1jc3NcIjpcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ1NTXCIpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJkb3dubG9hZC1jb25maWdcIjpcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ29uZmlnXCIpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==