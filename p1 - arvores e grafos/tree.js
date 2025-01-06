/**
 * Represents a node in a binary tree data structure.
 */
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

/**
 * Represents a binary tree data structure.
 */
class BinaryTree {
  constructor() {
    this.root = null;
    this.insertOrder = []; // Para armazenar a ordem de inserção
  }

  insert(value) {
    const newNode = new Node(value);
    if (!this.root) {
      this.root = newNode;
      this.insertOrder.push(value);
      return;
    }

    this.insertNode(this.root, newNode);
    this.insertOrder.push(value);
  }

  /**
   * Inserts a new node into a binary search tree.
   * @param node - The current node being evaluated for insertion.
   * @param newNode - The new node to be inserted.
   */
  insertNode(node, newNode) {
    if (newNode.value < node.value) {
      // Goes left
      if (!node.left) {
        node.left = newNode;
        return;
      }
      this.insertNode(node.left, newNode);
      return;
    }

    // Goes right
    if (!node.right) {
      node.right = newNode;
      return;
    }
    this.insertNode(node.right, newNode);
  }

  /**
   * Removes a node from the binary search tree starting from the root node.
   * @param node - The node to be removed from the tree.
   */
  remove(node) {
    this.root = this.removeNode(this.root, node);
  }

  /**
   * Removes a node from a binary search tree.
   * @param currentNode - The current node being evaluated.
   * @param node - The value of the node to be removed.
   * @returns The updated binary search tree after removing the specified node.
   */
  removeNode(currentNode, node) {
    if (!currentNode) {
      return null;
    }

    if (node < currentNode.value) {
      // Goes left
      currentNode.left = this.removeNode(currentNode.left, node);
      return currentNode;
    } else if (node > currentNode.value) {
      // Goes right
      currentNode.right = this.removeNode(currentNode.right, node);
      return currentNode;
    }

    if (!currentNode.left && !currentNode.right) {
      return null;
    }
    if (!currentNode.left) {
      return currentNode.right;
    }
    if (!currentNode.right) {
      return currentNode.left;
    }

    // Apply the algorithm to get the min value node on the right subtree - Isto foi explicado pelo professor. Feliz Natal :D
    const successor = this.finMinNode(currentNode.right);
    currentNode.value = successor.value;
    currentNode.right = null;
    return currentNode;
  }

  /**
   * Finds the minimum node in a binary search tree starting from the given node.
   */
  finMinNode(node) {
    while (!!node.left) {
      node = node.left;
    }
    return node;
  }

  /**
   * Display the values of the binary search tree in order.
   */
  displayInOrder(node = this.root) {
    if (!!node) {
      this.displayInOrder(node.left);
      console.log(node.value);
      this.displayInOrder(node.right);
    }
  }

  /**
   * Logs the insertion order of values in the insertOrder array to the console.
   */
  showInsertionOrder() {
    console.log("Ordem de inserção dos valores:", this.insertOrder.join(", "));
  }

  /**
   * Display the nodes of the binary tree in a breadth-first traversal order.
   * If the tree is empty, it logs "Tree is empty".
   */
  display() {
    if (!this.root) {
      console.log("Tree is empty");
      return;
    }

    const nodeList = [];
    nodeList.push(this.root);

    while (nodeList.length > 0) {
      const currentNode = nodeList.shift();

      const leftValue = currentNode.left ?? "no value";
      const rightValue = currentNode.right ?? "no value";

      console.log(
        `${currentNode.value} -> Left: ${leftValue.value}, Right: ${rightValue.value}`
      );

      if (!!currentNode.left) {
        nodeList.push(currentNode.left);
      }
      if (!!currentNode.right) {
        nodeList.push(currentNode.right);
      }
    }
  }
}

const tree = new BinaryTree();

tree.insert(11);
tree.insert(5);
tree.insert(18);
tree.insert(12);
tree.insert(6);
tree.insert(10);
tree.insert(9);
tree.insert(15);
tree.insert(8);
tree.insert(1);
tree.insert(2);
tree.insert(17);
tree.insert(16);
tree.insert(13);
tree.insert(7);
tree.insert(14);
tree.insert(3);
tree.insert(19);
tree.insert(4);
tree.insert(20);

console.log("Árvore Binária:");
tree.displayInOrder();

tree.remove(9);

console.log("\nÁrvore Visual:");
tree.display(tree.root, 0, 10);
