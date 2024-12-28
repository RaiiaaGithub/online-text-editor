import Element from "../../core/components.js";

/**
 * Creates an input line element with line number and input span.
 * @param {number} [lineNumber=1] - The line number to display on the input line.
 * @returns {Element} - The input line element with line number and input span.
 */
export function createInputLine(lineNumber = 1) {
  const element = new Element()
    .addClass("input-line")
    .addAttr("data-current-line", "false")
    .addChildren(
      new Element()
        .setTag("span")
        .addClass("line-number")
        .setTextContent(lineNumber).element
    )
    .addChildren(new Element().setTag("span").addClass("input").element);
  return element.element;
}
