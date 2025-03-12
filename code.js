"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Variables 데이터 가져오기
function getVariables() {
    return __awaiter(this, void 0, void 0, function* () {
        const variables = yield figma.variables.getLocalVariablesAsync(); // 모든 Variables 가져오기
        const collections = yield figma.variables.getLocalVariableCollectionsAsync(); // 모든 Variables Collection 가져오기
        const tokenData = {};
        console.log(collections);
        variables.forEach((variable) => {
            const group = variable.variableCollectionId || "default";
            if (!tokenData[group])
                tokenData[group] = {};
            tokenData[group][variable.name] = variable.valuesByMode;
        });
        return tokenData;
    });
}
// JSON 다운로드 트리거
function exportJSON() {
    return __awaiter(this, void 0, void 0, function* () {
        const tokens = yield getVariables();
        const jsonString = JSON.stringify(tokens, null, 2);
        console.log(jsonString);
        // figma.ui.postMessage({ type: "download", data: jsonString });
    });
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
