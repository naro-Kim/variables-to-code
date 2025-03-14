import { exportJSON } from "./exportJson";

figma.on("run", exportJSON);

figma.showUI(__html__, { width: 480, height: 800 });

figma.ui.onmessage = (msg) => {
  if (msg.type === "export-varaibles") {
    exportJSON();
  }
};
