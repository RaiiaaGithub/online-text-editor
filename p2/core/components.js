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
 * Represents a base component class.
 */
export class BaseComponent {
  /**
   * Represents the tag of the element
   * @type {string}
   */
  tag = "div";
  /**
   * Stores the element once it's created or changed
   */
  #element = undefined;

  /**
   * Represents the value for the id attribute on HTML elements.
   */
  #id = undefined;

  /**
   * A boolean variable indicating whether a change has occurred.
   */
  #changed = false;

  /**
   * Stores the children of an element
   */
  children = new RTArray();

  constructor(attrs = new RTArray(), classes = new RTArray()) {
    this.attrs = attrs;
    this.classes = classes;
  }

  /**
   * Returns the element associated with this class. If the element has not changed since
   * the last update, it returns the cached element. Otherwise, it creates a new element
   * based on the tag, id, classes, and attributes set in the class instance.
   * @returns {HTMLElement} The element associated with this class.
   */
  get element() {
    if (this.#element && !this.#changed) {
      return this.#element;
    }
    const element = document.createElement(this.tag);

    if (this.#id) {
      element.id = this.#id;
    }

    for (let i = 0; i < this.classes.length; i++) {
      const className = this.classes.get(i);
      if (!className) {
        continue;
      }
      element.classList.add(className);
    }

    for (let i = 0; i < this.attrs.length; i++) {
      const attr = this.attrs.get(i);
      if (!attr) {
        continue;
      }
      const { key, value } = attr;
      element.setAttribute(key, value);
    }

    for (let i = 0; i < this.children.length; i++) {
      const child = this.children.get(i);
      if (!child) {
        continue;
      }
      element.appendChild(child);
    }

    this.#changed = false;
    this.#element = element;
    return this.#element;
  }

  /**
   * Adds an ID to the object.
   * @param {string} id - The ID to be added.
   * @returns {object} The object with the ID added.
   */
  addId(id) {
    if (!StringValidators.isString(id)) {
      console.error("ID must be of type string");
      return this;
    }
    this.#id = id;
    this.#changed = true;
    return this;
  }

  /**
   * Adds a class to the element.
   * @param {string} className - The class name to add to the element.
   * @returns {this} The instance of the class with the added class.
   */
  addClass(className) {
    if (!StringValidators.isString(className)) {
      console.error("Class must be of type string");
      return this;
    }
    this.classes.push(className);
    this.#changed = true;
    return this;
  }

  /**
   * Adds a new attribute with the given key and value to the element.
   * @param {string} key - The key of the attribute to add.
   * @param {string} value - The value of the attribute to add.
   * @returns {this} The updated element with the new attribute added.
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

    this.attrs.push(new Attr(key, value));
    this.#changed = true;
    return this;
  }
}
