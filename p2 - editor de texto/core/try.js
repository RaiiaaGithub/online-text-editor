/**
 * Represents a custom class RTTry with properties ok and error.
 */
export class RTTry {
  /**
   * Value returned if the operation went well
   * @type {unknown}
   */
  ok;

  /**
   * Value return if an error was declared
   * @type {Error}
   */
  error;

  /**
   * Constructor function for creating an instance of a custom class.
   * @param {unknown} [ok=undefined] - The value to be assigned to the 'ok' property.
   * @param {Error} [error=undefined] - The value to be assigned to the 'error' property.
   * @returns None
   */
  constructor(ok = undefined, error = undefined) {
    this.ok = ok;
    this.error = error;
  }
}
