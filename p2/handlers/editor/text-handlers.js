import {
  createInputLine,
  getLineNumber,
} from "../../components/editor/input-line.js";
import KEYS from "../../core/constants/keys.js";
import GlobalService from "../../core/singleton.js";
import RTDoublyNode from "../../core/structures/notch.js";
import { stringSplitEndlines, stringSubstring } from "../../utils/strings.js";
import { getCaretPosition } from "./caret-handler.js";

const globalService = new GlobalService();

/**
 * Handles rendering file lines by calling the renderLine function with the editor input list head and index 0.
 * @param {Event} e - The event object that triggered the function call.
 */
export function handleRenderFileLines(e) {
  renderLine(globalService.editorInputList.head, 0);
}

/**
 * Recursively renders a line of input based on the node and iterator values.
 * @param {RTDoublyNode} node - The current node to render.
 * @param {number} iterator - The current iterator value.
 */
function renderLine(node, iterator) {
  let newLine;

  if (!node) {
    newLine = createInputLine(iterator + 1);
  } else if (iterator === 0) {
    newLine = createInputLine(iterator + 1, node.value ?? "");
  } else {
    newLine = createInputLine(iterator + 1, node.value ?? "", false);
  }

  const codeWrapper = document.querySelector(".code-wrapper");
  codeWrapper.appendChild(newLine);
  globalService.editorInputList.push(newLine);

  if (!node || !node.next) {
    return;
  }

  renderLine(node.next, iterator + 1);
}

/**
 * Handles the creation of a new line in the input buffer.
 * @param {Event} e - The event that triggered the creation of a new line.
 */
export function handleNewLine(e, textContent = "") {
  e.preventDefault();
  const activeInput = document.querySelector(
    '.input-line[data-current-line="true"]'
  );

  if (!activeInput) {
    console.log("No active input was found");
    return;
  }

  const lineNumber = getLineNumber(activeInput);

  const newLine = createInputLine(lineNumber + 1, textContent);
  activeInput.after(newLine);
  activeInput.removeAttribute("data-current-line");
  newLine.querySelector(".input").focus();

  const newNode = globalService.editorInputList.insertAfter(
    newLine,
    (line) => getLineNumber(line) === lineNumber
  );

  updateLineNumber(newNode);
}

/**
 * Updates the line numbers of a linked list of nodes by a specified increment.
 * @param {RTDoublyNode} node - The starting node of the linked list.
 * @param {number} [increment=1] - The amount by which to increment the line numbers.
 */
function updateLineNumber(node, increment = 1) {
  let current = node;
  while (current) {
    if (!current.next) {
      return;
    }

    const lineNumber = getLineNumber(current.next.value);
    current.next.value.querySelector(".line-number").textContent =
      lineNumber + increment;

    current = current.next;
  }
}

/**
 * Handles the backspace key event for a text input field.
 * @param {Event} e - The event object for the key press.
 */
export function handleTextBackspace(e) {
  removeLine(e);
}

/**
 * Handles control commands based on the event and buffer provided.
 * @param {Event} e - The event triggering the control command.
 */
export function handleControlCommands(e) {
  switch (e.key) {
    // Copy and paste commands are detected using the event listeners "copy" and "paste"
    case KEYS.CTRL:
      return;
    case KEYS.X:
      cutLine(e);
      break;
    default:
      globalService.commandBuffer.clear();
      return;
  }
  globalService.commandBuffer.clear();
}

export function cutLine(e) {
  copyLine(e);

  const activeInput = document.querySelector(
    '.input-line[data-current-line="true"]'
  );
  const spanElement = activeInput.querySelector(".input");

  if (getCaretPosition(activeInput) === 1 && spanElement.textContent > 0) {
    spanElement.textContent = "";
    return;
  }

  removeLine(e, false);
}

export function copyLine(e) {
  const activeInput = document.querySelector(
    '.input-line[data-current-line="true"]'
  );
  const spanElement = activeInput.querySelector(".input");
  const { start, end, size } = getCaretPosition();

  if (size > 0) {
    const selected = stringSubstring(spanElement.textContent, start, end);
    if (selected.error) {
      console.error(selected.error);
      return;
    }
    globalService.clipboardBuffer.insertFirst(selected.ok);
    console.log(`Added ${selected.ok ?? "undefined"} to the clipboard`);
    stringSplitEndlines(selected.ok.selected + selected.ok.after);

    // FIX:
    console.log(selected.ok);
    return;
  }

  e.preventDefault();

  const inputNode = globalService.editorInputList.find(
    (line) => getLineNumber(line) === getLineNumber(activeInput)
  );

  if (!inputNode) {
    return;
  }

  if (globalService.clipboardBuffer.size > 20) {
    globalService.clipboardBuffer.pop();
  }

  globalService.clipboardBuffer.insertFirst(spanElement.textContent);
  console.log(
    `Added ${spanElement.textContent ?? "undefined"} to the clipboard`
  );
  stringSplitEndlines(spanElement.textContent);
}

async function pasteLine(e) {
  e.preventDefault();

  const clipboardApiText = navigator.clipboard.readText().then((text) => {
    console.log("clipboard", text);
    console.log(text.split("\n"));
    console.log(text.split("\r"));
  });
}

export function removeLine(e, trackCaret = true) {
  const activeInput = document.querySelector(
    '.input-line[data-current-line="true"]'
  );

  if (!activeInput) return;

  const textInput = activeInput.querySelector(".input");
  const { start, end } = getCaretPosition();

  if (!!trackCaret) {
    if (start - end !== 0) {
      return;
    }

    if (start !== 0) {
      return;
    }
  }

  const lineNumber = getLineNumber(activeInput);
  if (lineNumber === 1) {
    return;
  }

  e.preventDefault();

  const previousLine = activeInput.previousElementSibling;

  if (!previousLine) {
    return;
  }

  const previousInput = previousLine.querySelector(".input");
  const activeText = textInput.textContent;

  const removedNode = globalService.editorInputList.remove(
    (line) => getLineNumber(line) === lineNumber
  );

  updateLineNumber(removedNode, -1);

  if (previousInput && trackCaret) {
    previousInput.textContent += activeText;
  }

  activeInput.remove();
  previousLine.setAttribute("data-current-line", "true");
  previousLine.querySelector(".input").focus();
}
