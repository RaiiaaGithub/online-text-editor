class Graph {
  constructor() {
    this.adjacencyList = new Map();
  }

  // Adiciona um vértice
  addNode(node) {
    this.adjacencyList.set(node, []);
  }

  // Adiciona uma aresta entre dois vértices
  addEdge(node1, node2) {
    if (!this.adjacencyList.has(node1)) {
      this.addNode(node1);
    }
    if (!this.adjacencyList.has(node2)) {
      this.addNode(node2);
    }
    this.adjacencyList.get(node1).push(node2);
    this.adjacencyList.get(node2).push(node1); // Grafo não direcionado
  }

  // Exibe o grafo
  display() {
    for (let [node, edges] of this.adjacencyList) {
      console.log(`${node} -> ${edges.join(", ")}`);
    }
  }
}
const graph = new Graph();

graph.addNode(1);
graph.addNode(2);
graph.addNode(3);


graph.addEdge(1, 2);
graph.addEdge(1, 3);

console.log("Grafo:");
graph.display();
