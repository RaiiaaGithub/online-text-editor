import { RTTry } from "../try.js";

/**
 * Represents an array-like data structure with additional functionality.
 */
export default class RTArray {
  /**
   * Represents the current length of the array
   * @type {number}
   */
  #length;
  /**
   * Represents where the data is stored
   * @type {[key: number]: unknown}
   */
  #data;

  /**
   * Constructor for creating an instance of a class.
   * @param {{[key: number]: unknown}} [data={}] - Optional data object to initialize the instance with.
   */
  constructor(data = {}) {
    this.#length = 0;
    this.#data = {};
  }

  /**
   * Adds a new value to the end of the array-like data structure.
   * @param {unknown} value - The value to be added to the data structure.
   * @returns {Array} - The updated data structure after adding the new value.
   */
  push(value) {
    this.#data[this.#length] = value;
    this.#length++;
    return this.#data;
  }

  /**
   * Removes and returns the last element from the data structure.
   * @returns The last element that was removed from the data structure.
   */
  pop() {
    const value = this.#data[this.#length - 1];
    delete this.#data[this.#length - 1];
    this.#length--;
    return value;
  }

  /**
   * Retrieves the value at the specified index from the data array.
   * @param {number} index - The index of the value to retrieve.
   * @returns The value at the specified index, or undefined if the index is invalid.
   */
  get(index) {
    const { error } = this.#validateIndex(index);
    if (error) {
      console.error(error);
      return;
    }
    return this.#data[index];
  }

  /**
   * Removes an item from the data structure at the specified index.
   * @param {number} index - The index of the item to be removed.
   * @returns The removed item from the data structure.
   */
  remove(index) {
    const { error } = this.#validateIndex(index);
    if (error) {
      console.error(error);
      return;
    }
    const value = this.#data[index];
    this.#shiftItems(index);
    return value;
  }

  /**
   * Shifts all items in the data structure starting from the given index to the left by one position.
   * @param {number} index - The index from which to start shifting the items.
   */
  #shiftItems(index) {
    const { error } = this.#validateIndex(index);
    if (error) {
      console.error(error);
      return;
    }

    for (let i = index; i < this.#length - 1; i++) {
      this.#data[i] = this.#data[n + 1];
    }
    delete this.#data[this.#length - 1];
    this.#length--;
  }

  /**
   * Validates the index to ensure it is a valid integer.
   * @param {number} index - The index to validate.
   * @returns {RTTry} - An RTTry object containing the validated index or an error message.
   */
  #validateIndex(index) {
    if (typeof index !== "number" || !Number.isInteger(index)) {
      return new RTTry(undefined, new Error("Index must be an integer"));
    }
    if (index < 0 || index > this.#length - 1) {
      return new RTTry(
        undefined,
        new Error("Index does not exist nor is it accessible")
      );
    }
    return new RTTry(index);
  }
}
