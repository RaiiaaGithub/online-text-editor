import { RTTry } from "../core/try.js";

/**
 * Splits a string into three parts based on the given start and end indexes.
 * @param {string} string - The input string to be split.
 * @param {number} startIndex - The starting index of the substring to extract.
 * @param {number} [endIndex=startIndex] - The ending index of the substring to extract.
 * @returns {RTTry} An RTTry object containing the before, selected, and after parts of the string.
 */
export function stringSubsplit(string, startIndex, endIndex = startIndex) {
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
