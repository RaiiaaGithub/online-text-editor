/**
 * Represents a graph data structure with nodes and edges.
 */
class Graph {
  constructor() {
    this.adjacencyList = new Map();
  }

  /**
   * Adds a node to the adjacency list with an empty array as its value.
   * @param node - The node to be added to the adjacency list.
   */
  addNode(node) {
    this.adjacencyList.set(node, []);
  }

  /**
   * Adds an edge between two nodes in the graph. If the nodes do not exist in the graph,
   * they are added before creating the edge.
   * @param node1 - The first node to connect.
   * @param node2 - The second node to connect.
   */
  addEdge(node1, node2) {
    if (!this.adjacencyList.has(node1)) {
      this.addNode(node1);
    }
    if (!this.adjacencyList.has(node2)) {
      this.addNode(node2);
    }
    this.adjacencyList.get(node1).push(node2);
    this.adjacencyList.get(node2).push(node1);
  }

  /**
   * Removes a node from the adjacency list along with all its connections.
   * @param node - The node to be removed from the adjacency list.
   */
  removeNode(node) {
    if (!this.adjacencyList.has(node)) {
      console.error("Node does not exist");
      return;
    }
    for (const value of this.adjacencyList.values()) {
      const index = value.indexOf(node);
      if (index < 0) {
        continue;
      }
      value.splice(index, 1);
    }
    this.adjacencyList.delete(node);
  }

  /**
   * Removes an edge between two nodes in the graph.
   * @param node1 - The first node of the edge.
   * @param node2 - The second node of the edge to be removed.
   */
  removeEdge(node1, node2) {
    if (!this.adjacencyList.has(node1) || !this.adjacencyList.has(node2)) {
      console.error(
        `Node does not exists.\nNode1: ${this.adjacencyList.get(
          node1
        )}\nNode2: ${this.adjacencyList.get(node2)}`
      );
      return;
    }
    const index = this.adjacencyList.get(node1).indexOf(node2);
    if (index < 0) {
      console.error(`Node ${node2} is not linked to node ${node1}`);
      return;
    }
    this.adjacencyList.get(node1).splice(index, 1);
  }

  /**
   * Display the adjacency list representation of a graph by printing each node and its corresponding edges.
   */
  display() {
    console.log("Graph:");
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
graph.addEdge(2, 2);

graph.removeEdge(2, 2);
graph.removeNode(3);

graph.display();
