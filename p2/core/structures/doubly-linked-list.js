import RTDoublyNode from "./notch.js";

/**
 * Represents a doubly linked list.
 */
export default class RTDoublyLinkedList {
  #head;
  #tail;
  #size;

  constructor() {
    this.#head = null;
    this.#tail = null;
    this.#size = 0;
  }

  /**
   * Getter method to retrieve the header of a linked list.
   * @returns The head node of the linked list.
   */
  get head() {
    return this.#head;
  }

  /**
   * Getter method to retrieve the tail of a linked list.
   * @returns The tail node of the linked list.
   */
  get tail() {
    return this.#tail;
  }

  /**
   * Getter method to retrieve the size property of the object.
   * @returns The size property of the object.
   */
  get size() {
    return this.#size;
  }

  /**
   * Checks if the list is empty.
   * @returns {boolean} - True if the list is empty, false otherwise.
   */
  isEmpty() {
    return this.size === 0;
  }

  /**
   * Adds a new node to the beginning of the list.
   * @param value - The value to be stored in the new node.
   */
  insertFirst(value) {
    const newNode = new RTDoublyNode(value);
    if (this.isEmpty()) {
      this.#head = newNode;
      this.#tail = newNode;
    } else {
      newNode.next = this.head;
      this.#head.prev = newNode;
      this.#head = newNode;
    }
    this.#size++;
  }

  /**
   * Adds a new node to the end of the list.
   * @param value - The value to be stored in the new node.
   */
  push(value) {
    const newNode = new RTDoublyNode(value);
    if (this.isEmpty()) {
      this.#head = newNode;
      this.#tail = newNode;
    } else {
      this.#tail.next = newNode;
      newNode.prev = this.tail;
      this.#tail = newNode;
    }
    this.#size++;
  }

  /**
   * Removes the first node from the list.
   * @returns The value of the removed node, or null if the list is empty.
   */
  removeFirst() {
    if (this.isEmpty()) {
      return null;
    }
    const removedNode = this.head;
    this.#head = this.head.next;
    if (this.head) {
      this.#head.prev = null;
    } else {
      this.#tail = null;
    }
    this.#size--;
    return removedNode.value;
  }

  /**
   * Removes the last node from the list.
   * @returns The value of the removed node, or null if the list is empty.
   */
  pop() {
    if (this.isEmpty()) {
      return null;
    }
    const removedNode = this.tail;
    this.#tail = this.tail.prev;
    if (this.tail) {
      this.#tail.next = null;
    } else {
      this.#head = null;
    }
    this.#size--;
    return removedNode.value;
  }

  clear() {
    if (this.isEmpty()) {
      return;
    }
    this.#tail = null;
    this.#head = null;
    this.#size = 0;
  }

  /**
   * Searches for a node containing the given value.
   * @param value - The value to search for.
   * @returns The node containing the value, or null if not found.
   */
  find(value) {
    let current = this.head;
    while (current) {
      if (current.value === value) {
        return current;
      }
      current = current.next;
    }
    return null;
  }

  /**
   * Prints the contents of the list to the console.
   */
  print() {
    let current = this.head;
    const list = [];
    while (current) {
      list.push(current.value);
      current = current.next;
    }
    console.log(list.join(" -> "));
  }
}
