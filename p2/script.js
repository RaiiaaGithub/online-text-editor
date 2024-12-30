import GlobalService from "./core/singleton.js";
import { handleCommands } from "./handlers/commands-handler.js";
import { handleRenderFileLines } from "./handlers/editor/text-handlers.js";

const globalService = new GlobalService();

handleRenderFileLines(undefined);

document.addEventListener("keydown", handleCommands);
