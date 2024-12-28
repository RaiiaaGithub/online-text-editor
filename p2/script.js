import GlobalService from "./core/singleton.js";
import { handleCommands } from "./handlers/commands-handler.js";

const globalService = new GlobalService();

document.addEventListener("keydown", (e) => {
  e.preventDefault();

  globalService.commandBuffer.enqueue(e.key);

  const result = handleCommands();
});
