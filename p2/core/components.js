import RTArray from "./structures/array.js";
import StringValidators from "./validators/string-validators.js";

/**
 * Represents an attribute with a key and value.
 */
export class Attr {
  /**
   * Constructor function to create a key-value pair object.
   * @param {string} key - The key of the key-value pair.
   * @param {string} value - The value of the key-value pair.
   */
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }
}

/**
 * Class that represents an HTML element with builder flow.
 */
export default class Element {
  /**
   * Represents the tag of the element
   */
  #tag = "div";

  /**
   * Represents the value for the id attribute on HTML elements.
   */
  #id = undefined;

  /**
   * Initializes a new RTArray object and assigns it to the 'attrs' variable.
   */
  #attrs = new RTArray();

  /**
   * Initialize a new RTArray object and assign it to the 'classes' property.
   */
  #classes = new RTArray();

  /**
   * Initialize a new RTArray and assign it to the 'children' property of the current object.
   */
  #children = new RTArray();

  /**
   * Represents the text content of an HTML element.
   */
  #textContent = "";

  /**
   * Returns the element associated with this class. If the element has not changed since
   * the last update, it returns the cached element. Otherwise, it creates a new element
   * based on the tag, id, classes, and attributes set in the class instance.
   * @returns {HTMLElement} The element associated with this class.
   */
  get element() {
    const element = document.createElement(this.#tag);

    if (this.#id) {
      element.id = this.#id;
    }

    for (let i = 0; i < this.#classes.length; i++) {
      const className = this.#classes.get(i);
      if (!className) {
        continue;
      }
      element.classList.add(className);
    }

    for (let i = 0; i < this.#attrs.length; i++) {
      const attr = this.#attrs.get(i);
      if (!attr) {
        continue;
      }
      const { key, value } = attr;
      element.setAttribute(key, value);
    }

    element.textContent = this.#textContent;

    for (let i = 0; i < this.#children.length; i++) {
      const child = this.#children.get(i);
      if (!child) {
        continue;
      }
      element.appendChild(child);
    }

    return element;
  }

  /**
   * Sets the tag for the current object.
   * @param {string} tag - The tag to be set for the object.
   * @returns {Element} This object with the tag set.
   */
  setTag(tag) {
    if (!StringValidators.isString(tag)) {
      console.error("Tag must be of type string");
      return this;
    }
    this.#tag = tag;
    return this;
  }

  /**
   * Sets the ID of the object.
   * @param {string} id - The ID to set for the object.
   * @returns {Element} The object with the ID set.
   */
  setId(id) {
    if (!StringValidators.isString(id)) {
      console.error("ID must be of type string");
      return this;
    }
    this.#id = id;
    return this;
  }

  /**
   * Get the text content stored in the private field #textContent.
   * @returns The text content stored in the private field #textContent.
   */
  getTextContent() {
    return this.#textContent;
  }

  /**
   * Sets the text content of an element.
   * @param {string} text - The text content to set.
   * @returns {Element} The instance of the object with the text content set.
   */
  setTextContent(text) {
    this.#textContent = text;
    return this;
  }

  /**
   * Adds a class to the element.
   * @param {string} className - The class name to add to the element.
   * @returns {Element} The instance of the class with the added class.
   */
  addClass(className) {
    if (!StringValidators.isString(className)) {
      console.error("Class must be of type string");
      return this;
    }
    this.#classes.push(className);
    return this;
  }

  /**
   * Adds a new attribute with the given key and value to the element.
   * @param {string} key - The key of the attribute to add.
   * @param {string} value - The value of the attribute to add.
   * @returns {Element} The updated element with the new attribute added.
   */
  addAttr(key, value) {
    if (!StringValidators.isString(key)) {
      console.error("The key of an attribute must be of type string");
      return this;
    }

    if (!StringValidators.isString(value)) {
      console.error("The value of an attribute must be of type string");
      return this;
    }

    this.#attrs.push(new Attr(key, value));
    return this;
  }

  /**
   * Add a child element to the current element.
   * @param {Element} element - The child element to add.
   * @returns {Element} The updated element with the new child added.
   */
  addChildren(element) {
    this.#children.push(element);
    return this;
  }
}
