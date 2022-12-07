/**
 * @Author: 毛毛
 * @Date: 2022-11-30 23:03:49
 * @Last Modified by: 毛毛
 * @Last Modified time: 2022-11-30 23:33:48
 * @description 并查集
 */
class Node<T> {
  value: T;
  constructor(value: T) {
    this.value = value;
  }
}

class UnionSet<T> {
  nodes: Map<T, Node<T>> = new Map();
  parents: Map<Node<T>, Node<T>> = new Map();
  sizeMap: Map<Node<T>, number> = new Map();
  unionSet(values: T[]) {
    for (const value of values) {
      const node = new Node(value);
      this.nodes.set(value, node);
      this.parents.set(node, node);
      this.sizeMap.set(node, 1);
    }
  }
  private findFather(node: T) {
    let curr = this.nodes.get(node)!;
    const path: Node<T>[] = [];
    // 一直往上查 找到根父亲
    while (curr !== this.parents.get(curr)) {
      path.push(curr);
      curr = this.parents.get(curr)!;
    }
    while (path.length) {
      this.parents.set(path.pop()!, curr);
    }
    return curr;
  }
  find(node: T) {
    let curr = this.nodes.get(node)!;
    // 一直往上查 找到根父亲
    while (curr !== this.parents.get(curr)) {
      curr = this.parents.get(curr)!;
    }
    return curr.value;
  }
  isSameSet(a: T, b: T) {
    if (!this.nodes.has(a) || !this.nodes.has(b)) {
      return false;
    }
    return this.findFather(a) === this.findFather(b);
  }
  union(a: T, b: T) {
    if (!this.nodes.has(a) || !this.nodes.has(b)) return;
    let aHead = this.findFather(a);
    let bHead = this.findFather(b);
    // 不是一个集合 需要union
    if (aHead !== bHead) {
      const aSize = this.sizeMap.get(aHead)!;
      const bSize = this.sizeMap.get(bHead)!;
      const big = aSize >= bSize ? aHead : bHead;
      const small = big !== aHead ? aHead : bHead;
      this.parents.set(small, big);
      this.sizeMap.set(big, aSize + bSize);
      this.sizeMap.delete(small);
    }
  }
}

export { UnionSet };
