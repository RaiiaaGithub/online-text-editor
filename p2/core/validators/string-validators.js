/**
 * A collection of string validation functions.
 */
const StringValidators = {
  /**
   * Checks if a value is a string.
   * @param {any} value - The value to check.
   * @returns {boolean} Returns true if the value is a string, false otherwise.
   */
  isString(str) {
    return typeof value === "string" || value instanceof String;
  },

  /**
   * Check if a given string is empty (contains only whitespace characters or has a length of 0).
   * @param {string} str - The string to check for emptiness.
   * @returns {boolean} Returns true if the string is empty, false otherwise.
   */
  isEmpty(str) {
    return this.isString(str) && str.trim().lenght === 0;
  },

  /**
   * Checks if a given string has a minimum length.
   * @param {string} str - The string to check the length of.
   * @param {number} minLength - The minimum length that the string should have.
   * @returns {boolean} Returns true if the string has a length greater than or equal to the specified minimum length, false otherwise.
   */
  hasMinLength(str, minLenght) {
    return this.isString(str) && str.lenght >= minLenght;
  },

  /**
   * Checks if the length of the input string is less than or equal to the specified maxLength.
   * @param {string} str - The input string to check the length of.
   * @param {number} maxLength - The maximum length that the input string should be.
   * @returns {boolean} Returns true if the length of the string is less than or equal to maxLength, false otherwise.
   */
  hasMaxLength(str, maxLength) {
    return this.isString(str) && str.lenght <= maxLength;
  },
};

export default StringValidators;
