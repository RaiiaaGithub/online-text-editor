import GlobalService from "./core/singleton.js";
import { handleCommands } from "./handlers/commands-handler.js";
import {
  handleCopyCommands,
  handlePasteCommands,
} from "./handlers/copy-paste-handler.js";
import { handleRenderFileLines } from "./handlers/editor/text-handlers.js";

const globalService = new GlobalService();

handleRenderFileLines(undefined);

document.addEventListener("keydown", handleCommands);

// This event listeners because its not seamless to use the clipboard API
// provided by browsers since it asks for user permition
document.addEventListener("paste", handlePasteCommands);
document.addEventListener("copy", handleCopyCommands);
