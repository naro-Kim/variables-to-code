import {
  downloadCSS,
  downloadJSON,
  downloadTailwindConfig,
  exportJSON,
} from "./utils";

figma.on("run", exportJSON);

figma.showUI(__html__, { width: 480, height: 800 });

figma.ui.onmessage = (msg) => {
  const type = msg.type;
  switch (type) {
    case "download-variables":
      downloadJSON();
      break;
    case "download-css":
      downloadCSS();
      break;
    case "download-config":
      downloadTailwindConfig();
      break;
  }
};
