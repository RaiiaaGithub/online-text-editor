import AREAS from "../core/constants/areas.js";
import KEYS from "../core/constants/keys.js";
import GlobalService from "../core/singleton.js";
import RTQueue from "../core/structures/queue.js";
import { handleCaretMovement } from "./editor/caret-handler.js";
import {
  handleControlCommands,
  handleNewLine,
  handleTextBackspace,
} from "./editor/text-handlers.js";

const globalService = new GlobalService();

/**
 * Handles keyboard commands based on the current area in the application.
 * Prevents the default behavior of the event.
 * Enqueues the key pressed into the command buffer.
 * Determines the current area and calls the appropriate command handler function.
 * @param {Event} e - The keyboard event triggering the command.
 * @returns {boolean} Returns false if the current area is not recognized.
 */
export function handleCommands(e) {
  globalService.commandBuffer.enqueue(e.key);

  const area = globalService.currentArea;
  const buffer = globalService.commandBuffer;

  switch (area) {
    case AREAS.EDITOR:
      handleEditorCommands(e);
      break;
    case AREAS.FILE_EXPLORER:
      handleFileExplorerCommands(buffer);
      break;
    default:
      break;
  }

  if (buffer.size > 1) {
    buffer.clear();
  }
}

/**
 * Handles editor commands based on the key pressed and the buffer state.
 * @param {Event} e - The event object containing information about the key press.
 * @param {RTQueue} buffer - The buffer object that stores the key press history.
 * @returns None
 */
function handleEditorCommands(e) {
  const buffer = globalService.commandBuffer;
  const firstKey = buffer.peek();
  switch (firstKey) {
    case KEYS.ENTER: {
      handleNewLine(e);
      buffer.clear();
      break;
    }
    case KEYS.BACKSPACE:
      handleTextBackspace(e);
      buffer.clear();
      break;
    case KEYS.ARROW_UP:
    case KEYS.ARROW_DOWN:
    case KEYS.ARROW_LEFT:
    case KEYS.ARROW_RIGHT:
      handleCaretMovement(e);
      buffer.clear();
      break;
    case KEYS.CTRL:
      handleControlCommands(e);
      break;
    default:
      buffer.clear();
  }
}

function handleFileExplorerCommands(buffer) {}
