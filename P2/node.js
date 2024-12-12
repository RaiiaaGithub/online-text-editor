// Definição de um Nó da Árvore
class Node {
    constructor(value) {
      this.value = value;
      this.left = null; // Filho à esquerda
      this.right = null; // Filho à direita
    }
  }
  
  // Definição da Árvore Binária
  class BinaryTree {
    constructor() {
      this.root = null; // Inicialmente a árvore está vazia
    }
  
    // Método para inserir um novo valor
    insert(value) {
      const newNode = new Node(value);
      if (this.root === null) {
        this.root = newNode; // Se a árvore estiver vazia, o novo nó é a raiz
      } else {
        this.insertNode(this.root, newNode); // Caso contrário, insere o nó de forma recursiva
      }
    }
  
    // Método recursivo para inserir o nó
    insertNode(node, newNode) {
      if (newNode.value < node.value) {
        if (node.left === null) {
          node.left = newNode;
        } else {
          this.insertNode(node.left, newNode); // Recursão para o lado esquerdo
        }
      } else {
        if (node.right === null) {
          node.right = newNode;
        } else {
          this.insertNode(node.right, newNode); // Recursão para o lado direito
        }
      }
    }
  
    // Método para exibir a árvore em ordem (in-order)
    inOrder(node = this.root) {
      if (node !== null) {
        this.inOrder(node.left); // Visita o filho esquerdo
        console.log(node.value);  // Visita o nó atual
        this.inOrder(node.right); // Visita o filho direito
      }
    }
  }
  
  // Exemplo de uso da Árvore Binária
  const tree = new BinaryTree();
  tree.insert(50);
  tree.insert(30);
  tree.insert(70);
  tree.insert(20);
  tree.insert(40);
  tree.insert(60);
  tree.insert(80);
  
  console.log("Árvore Binária (In-order):");
  tree.inOrder(); 
  