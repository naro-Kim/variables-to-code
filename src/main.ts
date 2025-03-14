import { downloadJSON, exportJSON } from "./utils/utils-json";

figma.on("run", exportJSON);

figma.showUI(__html__, { width: 480, height: 800 });

figma.ui.onmessage = (msg) => {
  const type = msg.type;
  switch (type) {
    case "download-variables":
      downloadJSON();
      break;
    case "download-css":
      console.log("CSS");
      break;
    case "download-config":
      console.log("Config");
      break;
  }
};
