/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/exportJson.ts":
/*!***************************!*\
  !*** ./src/exportJson.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   exportJSON: () => (/* binding */ exportJSON)
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
        return tokenData;
    });
}
// JSON 다운로드 트리거
function exportJSON() {
    return __awaiter(this, void 0, void 0, function* () {
        const tokens = yield getVariables();
        const jsonString = JSON.stringify(tokens, null, 2);
        figma.ui.postMessage({ type: "export-varaibles", data: jsonString });
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
/* harmony import */ var _exportJson__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./exportJson */ "./src/exportJson.ts");

figma.on("run", _exportJson__WEBPACK_IMPORTED_MODULE_0__.exportJSON);
figma.showUI(__html__, { width: 480, height: 1000 });
figma.ui.onmessage = (msg) => {
    if (msg.type === "export-varaibles") {
        (0,_exportJson__WEBPACK_IMPORTED_MODULE_0__.exportJSON)();
    }
};

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29kZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFhO0FBQ2IsaUJBQWlCLFNBQUksSUFBSSxTQUFJO0FBQzdCLDRCQUE0QiwrREFBK0QsaUJBQWlCO0FBQzVHO0FBQ0Esb0NBQW9DLE1BQU0sK0JBQStCLFlBQVk7QUFDckYsbUNBQW1DLE1BQU0sbUNBQW1DLFlBQVk7QUFDeEYsZ0NBQWdDO0FBQ2hDO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwRUFBMEU7QUFDMUUsc0ZBQXNGO0FBQ3RGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0IseUJBQXlCO0FBQ3pCLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBLCtCQUErQiw0Q0FBNEM7QUFDM0UsS0FBSztBQUNMOzs7Ozs7O1VDNUhBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOMEM7QUFDMUMsZ0JBQWdCLG1EQUFVO0FBQzFCLHlCQUF5QiwwQkFBMEI7QUFDbkQ7QUFDQTtBQUNBLFFBQVEsdURBQVU7QUFDbEI7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3ZhcmlhYmxlcy10by1jb2RlLy4vc3JjL2V4cG9ydEpzb24udHMiLCJ3ZWJwYWNrOi8vdmFyaWFibGVzLXRvLWNvZGUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdmFyaWFibGVzLXRvLWNvZGUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3ZhcmlhYmxlcy10by1jb2RlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdmFyaWFibGVzLXRvLWNvZGUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly92YXJpYWJsZXMtdG8tY29kZS8uL3NyYy9tYWluLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG4vKipcbiAqIFJlc29sdmVzIHZhcmlhYmxlIGFsaWFzZXMgcmVjdXJzaXZlbHlcbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFyaWFibGUgdmFsdWUgdGhhdCBtaWdodCBiZSBhbiBhbGlhc1xuICogQHBhcmFtIHZhcmlhYmxlcyBBbGwgYXZhaWxhYmxlIHZhcmlhYmxlcyBmb3IgbG9va3VwXG4gKiBAcGFyYW0gdmlzaXRlZElkcyBTZXQgb2YgYWxyZWFkeSB2aXNpdGVkIHZhcmlhYmxlIElEcyB0byBwcmV2ZW50IGluZmluaXRlIHJlY3Vyc2lvblxuICogQHJldHVybnMgVGhlIHJlc29sdmVkIHZhbHVlXG4gKi9cbmZ1bmN0aW9uIHJlc29sdmVWYXJpYWJsZUFsaWFzKHZhbHVlLCB2YXJpYWJsZXMsIHZpc2l0ZWRJZHMgPSBuZXcgU2V0KCkpIHtcbiAgICAvLyBDaGVjayBpZiB0aGUgdmFsdWUgaXMgYSB2YXJpYWJsZSBhbGlhc1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiZcbiAgICAgICAgdmFsdWUgIT09IG51bGwgJiZcbiAgICAgICAgXCJ0eXBlXCIgaW4gdmFsdWUgJiZcbiAgICAgICAgdmFsdWUudHlwZSA9PT0gXCJWQVJJQUJMRV9BTElBU1wiKSB7XG4gICAgICAgIGNvbnN0IGFsaWFzVmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgLy8gUHJldmVudCBjaXJjdWxhciByZWZlcmVuY2VzXG4gICAgICAgIGlmICh2aXNpdGVkSWRzLmhhcyhhbGlhc1ZhbHVlLmlkKSkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKFwiQ2lyY3VsYXIgcmVmZXJlbmNlIGRldGVjdGVkIGluIHZhcmlhYmxlIGFsaWFzZXM6XCIsIGFsaWFzVmFsdWUuaWQpO1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlOyAvLyBSZXR1cm4gdGhlIG9yaWdpbmFsIGFsaWFzIHRvIGF2b2lkIGluZmluaXRlIHJlY3Vyc2lvblxuICAgICAgICB9XG4gICAgICAgIC8vIEZpbmQgdGhlIHJlZmVyZW5jZWQgdmFyaWFibGVcbiAgICAgICAgY29uc3QgcmVmZXJlbmNlZFZhcmlhYmxlID0gdmFyaWFibGVzLmZpbmQoKHYpID0+IHYuaWQgPT09IGFsaWFzVmFsdWUuaWQpO1xuICAgICAgICBpZiAocmVmZXJlbmNlZFZhcmlhYmxlKSB7XG4gICAgICAgICAgICAvLyBHZXQgdGhlIGFwcHJvcHJpYXRlIG1vZGUgSUQgLSB1c2luZyB0aGUgZmlyc3QgbW9kZSBhcyBkZWZhdWx0XG4gICAgICAgICAgICBjb25zdCBtb2RlSWQgPSBPYmplY3Qua2V5cyhyZWZlcmVuY2VkVmFyaWFibGUudmFsdWVzQnlNb2RlKVswXTtcbiAgICAgICAgICAgIGlmIChtb2RlSWQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCByZWZlcmVuY2VkVmFsdWUgPSByZWZlcmVuY2VkVmFyaWFibGUudmFsdWVzQnlNb2RlW21vZGVJZF07XG4gICAgICAgICAgICAgICAgLy8gVHJhY2sgdGhpcyBJRCB0byBwcmV2ZW50IGNpcmN1bGFyIHJlZmVyZW5jZXNcbiAgICAgICAgICAgICAgICB2aXNpdGVkSWRzLmFkZChhbGlhc1ZhbHVlLmlkKTtcbiAgICAgICAgICAgICAgICAvLyBSZWN1cnNpdmVseSByZXNvbHZlIGluIGNhc2UgdGhlIHJlZmVyZW5jZWQgdmFsdWUgaXMgYWxzbyBhbiBhbGlhc1xuICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlVmFyaWFibGVBbGlhcyhyZWZlcmVuY2VkVmFsdWUsIHZhcmlhYmxlcywgdmlzaXRlZElkcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gUmV0dXJuIG9yaWdpbmFsIHZhbHVlIGlmIGl0J3Mgbm90IGFuIGFsaWFzIG9yIHJlZmVyZW5jZWQgdmFyaWFibGUgbm90IGZvdW5kXG4gICAgcmV0dXJuIHZhbHVlO1xufVxuLy8gVmFyaWFibGVzIOuNsOydtO2EsCDqsIDsoLjsmKTquLBcbmZ1bmN0aW9uIGdldFZhcmlhYmxlcygpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBjb25zdCB2YXJpYWJsZXMgPSB5aWVsZCBmaWdtYS52YXJpYWJsZXMuZ2V0TG9jYWxWYXJpYWJsZXNBc3luYygpOyAvLyDrqqjrk6AgVmFyaWFibGVzIOqwgOyguOyYpOq4sFxuICAgICAgICBjb25zdCBjb2xsZWN0aW9ucyA9IHlpZWxkIGZpZ21hLnZhcmlhYmxlcy5nZXRMb2NhbFZhcmlhYmxlQ29sbGVjdGlvbnNBc3luYygpOyAvLyDrqqjrk6AgVmFyaWFibGVzIENvbGxlY3Rpb24g6rCA7KC47Jik6riwXG4gICAgICAgIGNvbnN0IHRva2VuRGF0YSA9IHt9O1xuICAgICAgICAvLyBQcm9jZXNzIGVhY2ggY29sbGVjdGlvblxuICAgICAgICBjb2xsZWN0aW9ucy5mb3JFYWNoKChjb2xsZWN0aW9uKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjb2xsZWN0aW9uTmFtZSA9IGNvbGxlY3Rpb24ubmFtZTtcbiAgICAgICAgICAgIGlmICghdG9rZW5EYXRhW2NvbGxlY3Rpb25OYW1lXSkge1xuICAgICAgICAgICAgICAgIC8vIEluaXRpYWxpemUgdGhlIGNvbGxlY3Rpb24gc3RydWN0dXJlIGJhc2VkIG9uIHdoZXRoZXIgaXQgaGFzIG1vZGVzXG4gICAgICAgICAgICAgICAgY29uc3QgaGFzTW9kZXMgPSBjb2xsZWN0aW9uLm1vZGVzLmxlbmd0aCA+IDE7XG4gICAgICAgICAgICAgICAgdG9rZW5EYXRhW2NvbGxlY3Rpb25OYW1lXSA9IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogdW5kZWZpbmVkLCAvLyBXaWxsIGJlIHNldCBsYXRlclxuICAgICAgICAgICAgICAgICAgICB2YXJpYWJsZXM6IHVuZGVmaW5lZCwgLy8gV2lsbCBiZSBzZXQgbGF0ZXJcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGlmIChoYXNNb2Rlcykge1xuICAgICAgICAgICAgICAgICAgICAvLyBBZGQgbW9kZXMgb25seSBpZiB0aGVyZSBhcmUgbXVsdGlwbGUgbW9kZXNcbiAgICAgICAgICAgICAgICAgICAgdG9rZW5EYXRhW2NvbGxlY3Rpb25OYW1lXS5tb2RlcyA9IGNvbGxlY3Rpb24ubW9kZXMubWFwKChtb2RlKSA9PiBtb2RlLm5hbWUpO1xuICAgICAgICAgICAgICAgICAgICB0b2tlbkRhdGFbY29sbGVjdGlvbk5hbWVdLnZhcmlhYmxlcyA9IHt9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gRm9yIGNvbGxlY3Rpb25zIHdpdGhvdXQgbXVsdGlwbGUgbW9kZXMsIGluaXRpYWxpemUgdmFyaWFibGVzIGFzIGFycmF5XG4gICAgICAgICAgICAgICAgICAgIHRva2VuRGF0YVtjb2xsZWN0aW9uTmFtZV0udmFyaWFibGVzID0gW107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIEZpbmQgYWxsIHZhcmlhYmxlcyBiZWxvbmdpbmcgdG8gdGhpcyBjb2xsZWN0aW9uXG4gICAgICAgICAgICAgICAgY29uc3QgY29sbGVjdGlvblZhcmlhYmxlcyA9IHZhcmlhYmxlcy5maWx0ZXIoKHZhcmlhYmxlKSA9PiB2YXJpYWJsZS52YXJpYWJsZUNvbGxlY3Rpb25JZCA9PT0gY29sbGVjdGlvbi5pZCk7XG4gICAgICAgICAgICAgICAgLy8gQWRkIHR5cGUgaW5mb3JtYXRpb24gaWYgYXZhaWxhYmxlIChmcm9tIHRoZSBmaXJzdCB2YXJpYWJsZSlcbiAgICAgICAgICAgICAgICBpZiAoY29sbGVjdGlvblZhcmlhYmxlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuRGF0YVtjb2xsZWN0aW9uTmFtZV0udHlwZSA9IGNvbGxlY3Rpb25WYXJpYWJsZXNbMF0ucmVzb2x2ZWRUeXBlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoaGFzTW9kZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gUHJvY2VzcyB2YXJpYWJsZXMgZm9yIGVhY2ggbW9kZVxuICAgICAgICAgICAgICAgICAgICBjb2xsZWN0aW9uLm1vZGVzLmZvckVhY2goKG1vZGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG1vZGVOYW1lID0gbW9kZS5uYW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW5EYXRhW2NvbGxlY3Rpb25OYW1lXS52YXJpYWJsZXNbbW9kZU5hbWVdID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBBZGQgdmFyaWFibGUgdmFsdWVzIGZvciB0aGlzIG1vZGVcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxlY3Rpb25WYXJpYWJsZXMuZm9yRWFjaCgodmFyaWFibGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZUZvck1vZGUgPSB2YXJpYWJsZS52YWx1ZXNCeU1vZGVbbW9kZS5tb2RlSWRdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJlc29sdmUgYW55IHZhcmlhYmxlIGFsaWFzZXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZXNvbHZlZFZhbHVlID0gcmVzb2x2ZVZhcmlhYmxlQWxpYXModmFsdWVGb3JNb2RlLCB2YXJpYWJsZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEFkZCB0aGUgdmFyaWFibGUgd2l0aCBpdHMgcmVzb2x2ZWQgdmFsdWUgZm9yIHRoaXMgbW9kZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuRGF0YVtjb2xsZWN0aW9uTmFtZV0udmFyaWFibGVzW21vZGVOYW1lXS5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogdmFyaWFibGUubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHZhcmlhYmxlLmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcmVzb2x2ZWRWYWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEZvciBjb2xsZWN0aW9ucyB3aXRob3V0IG11bHRpcGxlIG1vZGVzLCBqdXN0IHVzZSB0aGUgZmlyc3QgbW9kZVxuICAgICAgICAgICAgICAgICAgICBjb25zdCBkZWZhdWx0TW9kZSA9IGNvbGxlY3Rpb24ubW9kZXNbMF07XG4gICAgICAgICAgICAgICAgICAgIC8vIEFkZCB2YXJpYWJsZSB2YWx1ZXMgZGlyZWN0bHkgdG8gdGhlIGFycmF5XG4gICAgICAgICAgICAgICAgICAgIGNvbGxlY3Rpb25WYXJpYWJsZXMuZm9yRWFjaCgodmFyaWFibGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlRm9yTW9kZSA9IHZhcmlhYmxlLnZhbHVlc0J5TW9kZVtkZWZhdWx0TW9kZS5tb2RlSWRdO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmVzb2x2ZSBhbnkgdmFyaWFibGUgYWxpYXNlc1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzb2x2ZWRWYWx1ZSA9IHJlc29sdmVWYXJpYWJsZUFsaWFzKHZhbHVlRm9yTW9kZSwgdmFyaWFibGVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEFkZCB0aGUgdmFyaWFibGUgd2l0aCBpdHMgcmVzb2x2ZWQgdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuRGF0YVtjb2xsZWN0aW9uTmFtZV0udmFyaWFibGVzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHZhcmlhYmxlLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHZhcmlhYmxlLmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiByZXNvbHZlZFZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0b2tlbkRhdGE7XG4gICAgfSk7XG59XG4vLyBKU09OIOuLpOyatOuhnOuTnCDtirjrpqzqsbBcbmV4cG9ydCBmdW5jdGlvbiBleHBvcnRKU09OKCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGNvbnN0IHRva2VucyA9IHlpZWxkIGdldFZhcmlhYmxlcygpO1xuICAgICAgICBjb25zdCBqc29uU3RyaW5nID0gSlNPTi5zdHJpbmdpZnkodG9rZW5zLCBudWxsLCAyKTtcbiAgICAgICAgZmlnbWEudWkucG9zdE1lc3NhZ2UoeyB0eXBlOiBcImV4cG9ydC12YXJhaWJsZXNcIiwgZGF0YToganNvblN0cmluZyB9KTtcbiAgICB9KTtcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgZXhwb3J0SlNPTiB9IGZyb20gXCIuL2V4cG9ydEpzb25cIjtcbmZpZ21hLm9uKFwicnVuXCIsIGV4cG9ydEpTT04pO1xuZmlnbWEuc2hvd1VJKF9faHRtbF9fLCB7IHdpZHRoOiA0ODAsIGhlaWdodDogMTAwMCB9KTtcbmZpZ21hLnVpLm9ubWVzc2FnZSA9IChtc2cpID0+IHtcbiAgICBpZiAobXNnLnR5cGUgPT09IFwiZXhwb3J0LXZhcmFpYmxlc1wiKSB7XG4gICAgICAgIGV4cG9ydEpTT04oKTtcbiAgICB9XG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9