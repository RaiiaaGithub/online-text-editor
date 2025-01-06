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
   * Inserts a new node after a node that meets a specified condition function.
   * @param {any} value - The value of the new node to be inserted.
   * @param {function} conditionFn - The condition function that determines where to insert the new node.
   * @returns The newly inserted node.
   * @throws {Error} If the conditionFn is not a function.
   */
  insertAfter(value, conditionFn) {
    if (typeof conditionFn !== "function") {
      throw new Error("Condition must be a function");
    }

    let current = this.head;

    while (current) {
      if (!conditionFn(current.value)) {
        current = current.next;
        continue;
      }

      const newNode = new RTDoublyNode(value);
      newNode.next = current.next;
      newNode.prev = current;

      if (current.next) {
        current.next.prev = newNode;
      } else {
        this.#tail = newNode;
      }

      current.next = newNode;

      this.#size++;
      return newNode;
    }
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
    return removedNode;
  }

  /**
   * Removes a node from the linked list based on the provided condition function.
   * @param {(el: Element) => boolean} conditionFn - The function that determines whether a node should be removed.
   * @returns The value of the removed node.
   * @throws {Error} If the conditionFn is not a function.
   */
  remove(conditionFn) {
    if (typeof conditionFn !== "function") {
      throw new Error("Condition must be a function");
    }

    let current = this.head;
    let removedNode = null;

    while (current) {
      if (conditionFn(current.value)) {
        removedNode = current;
        break;
      }
      current = current.next;
    }

    if (!removedNode) {
      return null;
    }

    if (removedNode.prev) {
      removedNode.prev.next = removedNode.next;
    } else {
      this.#head = removedNode.next;
    }

    if (removedNode.next) {
      removedNode.next.prev = removedNode.prev;
    } else {
      this.#tail = removedNode.prev;
    }

    this.#size--;
    return removedNode;
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
   * Finds a node in the linked list that satisfies the given condition function.
   * @param {Function} conditionFn - The function that defines the condition to be met.
   * @returns The node that satisfies the condition function.
   * @throws {Error} If the conditionFn is not a function.
   */
  find(conditionFn) {
    if (typeof conditionFn !== "function") {
      throw new Error("Condition must be a function");
    }

    let current = this.head;

    while (current) {
      if (!conditionFn(current.value)) {
        current = current.next;
        continue;
      }
      return current;
    }
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
