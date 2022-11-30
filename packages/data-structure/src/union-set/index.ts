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
  private findFather(node: Node<T>) {
    const path: Node<T>[] = [];
    // 一直往上查 找到根父亲
    while (node !== this.parents.get(node)) {
      path.push(node);
      node = this.parents.get(node)!;
    }
    while (path.length) {
      this.parents.set(path.pop()!, node);
    }
    return node;
  }
  isSameSet(a: T, b: T) {
    if (!this.nodes.has(a) || !this.nodes.has(b)) {
      return false;
    }
    return (
      this.findFather(this.nodes.get(a)!) ===
      this.findFather(this.nodes.get(b)!)
    );
  }
  union(a: T, b: T) {
    if (!this.nodes.has(a) || !this.nodes.has(b)) return;
    let aHead = this.findFather(this.nodes.get(a)!);
    let bHead = this.findFather(this.nodes.get(b)!);
    // 不是一个集合 需要union
    if (aHead !== bHead) {
      const aSize = this.sizeMap.get(aHead)!;
      const bSize = this.sizeMap.get(bHead)!;
      const big = aSize >= bSize ? aHead : bHead;
      const small = big !== aHead ? aHead : bHead;
      this.parents.set(small, big);
      this.sizeMap.set(big, aSize + bSize);
      this.sizeMap.delete(small);
      // if (aSize >= bSize) {
      //   this.parents.set(bHead, aHead);
      //   this.sizeMap.set(aHead, aSize + bSize);
      //   this.sizeMap.delete(bHead);
      // } else {
      //   this.parents.set(aHead, bHead);
      //   this.sizeMap.set(bHead, aSize + bSize);
      //   this.sizeMap.delete(aHead);
      // }
    }
  }
}

export { UnionSet };
