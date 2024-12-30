import {
  createInputLine,
  getLineNumber,
} from "../../components/editor/input-line.js";
import GlobalService from "../../core/singleton.js";
import RTDoublyNode from "../../core/structures/notch.js";
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
    newLine = createInputLine(iterator + 1, node.value);
  } else {
    newLine = createInputLine(iterator + 1, node.value, false);
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
export function handleNewLine(e) {
  const activeInput = document.querySelector(
    '.input-line[data-current-line="true"]'
  );

  if (!activeInput) {
    console.log("No active input was found");
    e.preventDefault();
    return;
  }

  const lineNumber = getLineNumber(activeInput);

  const newLine = createInputLine(lineNumber + 1);
  activeInput.after(newLine);
  activeInput.removeAttribute("data-current-line");
  newLine.querySelector(".input").focus();

  const newNode = globalService.editorInputList.insertAfter(
    newLine,
    (line) => getLineNumber(line) === lineNumber
  );

  updateLineNumber(newNode);

  e.preventDefault();
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

export function handleTextBackspace(e) {
  const activeInput = document.querySelector(
    '.input-line[data-current-line="true"]'
  );

  if (!activeInput) return;

  const textInput = activeInput.querySelector(".input");
  const { start, end, selection } = getCaretPosition();

  if (start - end !== 0) {
    return;
  }

  if (start !== 0) {
    return;
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

  if (previousInput) {
    previousInput.textContent += activeText;
  }

  activeInput.remove();
  previousLine.setAttribute("data-current-line", "true");

  const otherLines = document.querySelectorAll(
    '.input-line[data-current-line="true"]'
  );

  otherLines.forEach((line) => {
    if (line !== previousLine) {
      line.removeAttribute("data-current-line");
    }
  });

  const wSelection = window.getSelection();
  const range = document.createRange();

  range.setStart(
    previousInput.childNodes[0] || previousInput,
    previousInput.textContent.length
  );
  range.collapse(true);

  wSelection.removeAllRanges();
  wSelection.addRange(range);
}
