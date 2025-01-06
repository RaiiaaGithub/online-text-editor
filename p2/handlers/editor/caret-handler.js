import {
  getLineNumber,
  setActiveInput,
} from "../../components/editor/input-line.js";
import KEYS from "../../core/constants/keys.js";
import GlobalService from "../../core/singleton.js";

const globalService = new GlobalService();

/**
 * Handles the movement of the caret in the editor based on the key pressed.
 * @param {Event} e - The event object containing information about the key pressed.
 */
export function handleCaretMovement(e) {
  const activeInput = document.querySelector(
    '.input-line[data-current-line="true"]'
  );
  const lineNumber = getLineNumber(activeInput);

  const { start } = getCaretPosition();

  const currentNode = globalService.editorInputList.find(
    (line) => getLineNumber(line) === lineNumber
  );

  let targetNode = null;

  switch (e.key) {
    case KEYS.ARROW_UP: {
      if (lineNumber === 1) {
        return;
      }
      targetNode = currentNode.prev;
      break;
    }
    case KEYS.ARROW_DOWN: {
      if (lineNumber >= globalService.editorInputList.size) {
        return;
      }
      targetNode = currentNode.next;
      break;
    }
    default:
      return;
  }

  if (!targetNode) return;

  activeInput.removeAttribute("data-current-line");
  setActiveInput(targetNode.value, start);
}

/**
 * Handles the caret position in an input field by setting the current line attribute.
 * @param {Event} e - The event object triggered by the input field.
 */
export function handleCaretPosition(e) {
  if (
    !e.target.classList.contains("input") &&
    !e.target.classList.contains("input-line") &&
    !e.target.classList.contains("line-number")
  ) {
    return;
  }

  const activeInput = document.querySelector(
    '.input-line[data-current-line="true"]'
  );
  activeInput.removeAttribute("data-current-line");
  const currentLine = e.target.closest(".input-line");
  currentLine.setAttribute("data-current-line", "true");

  if (e.key === " ") {
    e.preventDefault();
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const spaceNode = document.createTextNode("\u00A0"); // Non-breaking space
    range.insertNode(spaceNode);
    range.setStartAfter(spaceNode);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
  }
}

export function getCaretPosition() {
  const selection = window.getSelection();
  return {
    start: selection.focusOffset,
    end: selection.anchorOffset,
    size: Math.abs(selection.anchorOffset - selection.focusOffset),
    selection: selection,
  };
}
