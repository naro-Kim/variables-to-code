"use strict";

// Variables 데이터 가져오기
async function getVariables() {
  const variables = await figma.variables.getLocalVariablesAsync(); // 모든 Variables 가져오기
  const collections = await figma.variables.getLocalVariableCollectionsAsync(); // 모든 Variables Collection 가져오기
  const tokenData: { [key: string]: { [key: string]: unknown } } = {};

  console.log(collections);

  variables.forEach((variable) => {
    const group = variable.variableCollectionId || "default";
    if (!tokenData[group]) tokenData[group] = {};
    tokenData[group][variable.name] = variable.valuesByMode;
  });

  return tokenData;
}

// JSON 다운로드 트리거
async function exportJSON() {
  const tokens = await getVariables();
  const jsonString = JSON.stringify(tokens, null, 2);

  console.log(jsonString);
  // figma.ui.postMessage({ type: "download", data: jsonString });
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
