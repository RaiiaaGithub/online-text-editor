import {
  getLineNumber,
  setActiveInput,
} from "../../components/editor/input-line.js";
import KEYS from "../../core/constants/keys.js";
import GlobalService from "../../core/singleton.js";

const globalService = new GlobalService();

export function handleCaretMovement(e) {
  const activeInput = document.querySelector(
    '.input-line[data-current-line="true"]'
  );
  const lineNumber = getLineNumber(activeInput);

  const { start, end, size } = getCaretPosition();

  const currentNode = globalService.editorInputList.find(
    (line) => getLineNumber(line) === lineNumber
  );

  switch (e.key) {
    case KEYS.ARROW_UP: {
      if (lineNumber === 1) {
        return;
      }
      activeInput.removeAttribute("data-current-line");
      setActiveInput(currentNode.prev.value);
      break;
    }
    case KEYS.ARROW_DOWN: {
      if (lineNumber >= globalService.editorInputList.size - 1) {
        return;
      }
      activeInput.removeAttribute("data-current-line");
      setActiveInput(currentNode.next.value);
      break;
    }
  }
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
}

export function getCaretPosition() {
  const selection = window.getSelection();
  return {
    start: selection.focusOffset,
    end: selection.anchorOffset,
    size: selection.anchorOffset - selection.focusOffset,
    selection: selection,
  };
}
