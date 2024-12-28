import RTDoublyLinkedList from "./doubly-linked-list.js";

/**
 * Represents a stack data structure using a doubly linked list.
 */
export default class RTStack {
  #list;

  constructor() {
    this.#list = new RTDoublyLinkedList();
  }

  /**
   * Get the size of the stack.
   */
  get size() {
    return this.#list.size;
  }

  /**
   * Check if the stack is empty.
   * @returns {boolean} True if the stack is empty, false otherwise.
   */
  isEmpty() {
    return this.#list.isEmpty();
  }

  /**
   * Adds the given data to the top of the stack.
   * @param data - The data to be added to the stack.
   */
  push(data) {
    this.#list.insertFirst(data);
  }

  /**
   * Removes and returns the data from the top of the stack.
   * @returns The data from the top of the stack, or null if the stack is empty.
   */
  pop() {
    return this.#list.removeFirst();
  }

  /**
   * Returns the data value of the element at the top of the stack without removing it.
   * @returns The data value of the element at the top of the stack, or null if the stack is empty.
   */
  peek() {
    return this.#list.head?.value;
  }

  /**
   * Prints the elements of the stack in order from top to bottom.
   * This method iterates through the underlying linked list and prints each element separated by " -> ".
   */
  print() {
    this.#list.print();
  }
}
