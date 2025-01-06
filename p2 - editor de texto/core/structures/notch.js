/**
 * A node in the doubly linked list.
 */
export default class RTDoublyNode {
  constructor(value) {
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}
