class Node {
  value: number;
  in = 0; // 入度
  out = 0; // 出度
  nexts: Node[] = []; // 可直接到达的点（出度对应的）
  edges: Edge[] = []; // 边
  constructor(value: number) {
    this.value = value;
  }
}

class Edge {
  constructor(public weight: number, public from: Node, public to: Node) {}
}

class Graph {
  nodes = new Map<number, Node>();
  edges = new Set<Edge>();
}

export {};
