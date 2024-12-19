class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree {
  constructor() {
    this.root = null;
    this.insertOrder = []; // Para armazenar a ordem de inserção
  }

  // Método para inserir um novo valor
  insert(value) {
    const newNode = new Node(value);
    if (this.root === null) {
      this.root = newNode; // Se a árvore estiver vazia, o novo nó é a raiz
    } else {
      this.insertNode(this.root, newNode); // Caso contrário, insere o nó de forma recursiva
    }
    this.insertOrder.push(value); // Adiciona o valor à ordem de inserção
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

  // Método para exibir a ordem de inserção dos valores
  showInsertionOrder() {
    console.log("Ordem de inserção dos valores:", this.insertOrder.join(", "));
  }

  // Método para exibir a árvore de forma visual (hierárquica)
  display(node = this.root, space = 0, count = 5) {
    if (node === null) return;

    // Aumenta o espaço à medida que desce pela árvore
    space += count;

    // Primeiro, imprime o filho direito (mais distante)
    this.display(node.right, space);

    // Imprime o valor do nó com indentação
    console.log();
    for (let i = count; i < space; i++) {
      process.stdout.write(" "); // Adiciona espaços para mostrar a árvore
    }
    console.log(node.value);
    // Agora, imprime o filho esquerdo
    this.display(node.left, space);
  }
}

const tree = new BinaryTree();


tree.insert(1);
tree.insert(2);
tree.insert(4);
tree.insert(3);



console.log("Árvore Binária:");
tree.inOrder();


console.log("\nÁrvore Visual:");
tree.display(tree.root, 10, 3);
