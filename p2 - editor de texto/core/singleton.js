import AREAS from "./constants/areas.js";
import RTDoublyLinkedList from "./structures/doubly-linked-list.js";
import RTQueue from "./structures/queue.js";
import RTStack from "./structures/stack.js";
import StringValidators from "./validators/string-validators.js";

/**
 * Represents a Global Service class that manages command buffer, undo buffer, editor input list, and current area.
 */
export default class GlobalService {
  #commandBuffer;
  #undoBuffer;
  #redoBuffer;
  #clipboardBuffer;
  #editorInputList;
  #currentArea;

  constructor() {
    if (GlobalService.instance) {
      return GlobalService.instance;
    }

    // Load required data for the app
    this.#commandBuffer = new RTQueue();
    this.#undoBuffer = new RTStack();
    this.#redoBuffer = new RTStack();
    this.#editorInputList = new RTDoublyLinkedList();
    this.#currentArea = AREAS.EDITOR;

    this.#clipboardBuffer = new RTDoublyLinkedList();
    GlobalService.instance = this;
  }

  get commandBuffer() {
    return this.#commandBuffer;
  }

  get undoBuffer() {
    return this.#undoBuffer;
  }

  get redoBuffer() {
    return this.#redoBuffer;
  }

  get clipboardBuffer() {
    return this.#clipboardBuffer;
  }

  get editorInputList() {
    return this.#editorInputList;
  }

  get currentArea() {
    return this.#currentArea;
  }

  set currentArea(value) {
    if (!StringValidators.isString(value) || StringValidators.isEmpty()) {
      return;
    }
    this.#currentArea = value;
  }
}
