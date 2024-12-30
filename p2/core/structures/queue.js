import RTDoublyLinkedList from "./doubly-linked-list.js";

/**
 * Represents a queue data structure using a doubly linked list.
 */
export default class RTQueue {
  #list;

  constructor() {
    this.#list = new RTDoublyLinkedList();
  }

  /**
   * Get the size of the list.
   */
  get size() {
    return this.#list.size;
  }

  /**
   * Check if the list is empty.
   * @returns {boolean} True if the list is empty, false otherwise.
   */
  isEmpty() {
    return this.#list.size === 0;
  }

  /**
   * Adds the given data to the end of the queue.
   * @param data - The data to be added to the queue.
   */
  enqueue(data) {
    this.#list.push(data);
  }

  /**
   * Removes and returns the first element from the queue.
   * @returns The first element in the queue.
   */
  dequeue() {
    return this.#list.removeFirst();
  }

  clear() {
    this.#list.clear();
  }

  /**
   * Returns the data value of the node at the front of the queue without removing it.
   * @returns The data value of the node at the front of the queue, or null if the queue is empty.
   */
  peek() {
    return this.#list.head?.value;
  }

  /**
   * Print the elements of the linked list in order.
   * This method iterates through the linked list and prints each element separated by " -> ".
   */
  print() {
    this.#list.print();
  }
}
