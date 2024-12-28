import { createInputLine } from "../components/editor/input-line.js";
import AREAS from "../core/constants/areas.js";
import KEYS from "../core/constants/keys.js";
import GlobalService from "../core/singleton.js";
import RTQueue from "../core/structures/queue.js";

const globalService = new GlobalService();

/**
 * Handles commands based on the current area in the application.
 * @returns {boolean} - Returns true if the command was successfully handled, false otherwise.
 */
export function handleCommands() {
  const area = globalService.currentArea;
  const buffer = globalService.commandBuffer;

  switch (area) {
    case AREAS.EDITOR:
      return handleEditorCommands(buffer);
    case AREAS.FILE_EXPLORER:
      return handleFileExplorerCommands(buffer);
    default:
      return false;
  }
}

/**
 * Handles editor commands based on the provided buffer.
 * @param {RTQueue} buffer - The buffer containing the editor commands.
 * @returns None
 */
function handleEditorCommands(buffer) {
  const firstKey = buffer.peek();

  switch (firstKey) {
    case KEYS.ENTER: {
      const editorPane = document.querySelector(".code-wrapper");
      const inputElement = createInputLine();
      editorPane.appendChild(inputElement);
    }
  }
  if (buffer.peek)
    if (buffer.peek() === KEYS.CTRL || buffer.peek() === KEYS.META) {
    }
}

function handleFileExplorerCommands(buffer) {}
