import Element from "../../core/components.js";
import { handleCaretPosition } from "../../handlers/editor/caret-handler.js";

/**
 * Creates an input line element with line number and content.
 * @param {number} [lineNumber=1] - The line number for the input line.
 * @param {string} [content=""] - The content of the input line.
 * @returns {HTMLElement} - The input line element with line number and content.
 */
export function createInputLine(lineNumber = 1, content = "", focus = true) {
  const element = new Element()
    .addClass("input-line")
    .addChildren(
      new Element()
        .setTag("span")
        .addClass("line-number")
        .setTextContent(String(lineNumber)).element
    )
    .addChildren(
      new Element()
        .setTextContent(content)
        .setTag("span")
        .addClass("input")
        .addAttr("contenteditable", "true").element
    );

  if (focus) {
    element.addAttr("data-current-line", "true");
  }

  document.addEventListener("mousedown", handleCaretPosition);
  return element.element;
}

/**
 * Retrieves the line number associated with a given element.
 * @param {Element} element - The element containing the line number information.
 * @returns {number | undefined} The line number parsed from the element, or undefined if element is falsy.
 */
export function getLineNumber(element) {
  if (!element) {
    return;
  }
  return parseInt(element.querySelector(".line-number").textContent, 10);
}

/**
 * Sets the given element as the active input by adding a data attribute and focusing on the input field.
 * @param {Element} element - The element to set as active input.
 */
export function setActiveInput(element, caretPos = 0) {
  element.setAttribute("data-current-line", "true");
  const spanElement = element.querySelector(".input");
  spanElement.focus();
}
