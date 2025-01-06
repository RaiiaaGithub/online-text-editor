import { RTTry } from "../core/try.js";

/**
 * Splits a string into three parts based on the given start and end indexes.
 * @param {string} string - The input string to be split.
 * @param {number} startIndex - The starting index of the substring to extract.
 * @param {number} [endIndex=startIndex] - The ending index of the substring to extract.
 * @returns {RTTry} An RTTry object containing the before, selected, and after parts of the string.
 */
export function stringSubstring(string, startIndex, endIndex = startIndex) {
  if (
    startIndex < 0 ||
    startIndex > string.length ||
    endIndex < 0 ||
    endIndex > string.length
  ) {
    return new RTTry(
      undefined,
      new RangeError(
        "startIndex and endIndex must be within the bounds of the string."
      )
    );
  }

  if (startIndex > endIndex) {
    return new RTTry(
      undefined,
      new Error("startIndex cannot be greater than endIndex.")
    );
  }

  return new RTTry(
    {
      before: string.slice(0, startIndex),
      selected: string.slice(startIndex, endIndex),
      after: string.slice(endIndex),
    },
    undefined
  );
}

/**
 * Splits a string into an array of lines based on line breaks.
 * @param {string} text - The input text to split into lines.
 * @returns {string[]} An array of lines extracted from the input text.
 */
export function stringSplitEndlines(text) {
  const lines = text.replace(/ /g, " ").split(/\r\n|\r|\n/);
  return lines;
}

/**
 * Replaces leading spaces in a string with non-breaking spaces.
 * @param {string} str - The input string to process.
 * @returns {string} The string with leading spaces replaced by non-breaking spaces.
 */
export function replaceLeadingSpaces(str = "") {
  const match = str.match(/^(\s*)([a-zA-Z0-9\W])/);
  if (match) {
    const leadingSpaces = match[1];
    const nbsp = "&nbsp;".repeat(leadingSpaces.length);
    return nbsp + match[2] + str.substring(match[0].length);
  }
  return str;
}
