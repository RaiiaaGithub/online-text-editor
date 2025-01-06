import Element from "../../core/components";

/**
 * Creates an input line element with line number and content.
 * @param {number} [lineNumber=1] - The line number for the input line.
 * @param {string} [content=""] - The content of the input line.
 * @returns {HTMLElement} - The input line element with line number and content.
 */
export function createFile(fileName = "untitled.txt") {
  const element = new Element()
    .setTag("li")
    .setTextContent(fileName)
    .addClass("file")
    .addAttr("data-file-extension", fileName.split(".").pop());

  document.addEventListener("mousedown", handleOpenFile);
  return element.element;
}
