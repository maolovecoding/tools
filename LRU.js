function DLinkedList(key, value, prev, next) {
  this.key = key;
  this.value = value;
  this.prev = prev;
  this.next = next;
}
/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
  this.capacity = capacity;
  this.map = new Map();
  this.head = new DLinkedList(-1, -1, null, null);
  this.tail = new DLinkedList(-1, -1, null, null);
};

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
  const node = this.map.get(key);
  if (node) {
    // 被访问 移动到头结点
    const headNext = this.head.next;
    if (node !== this.tail.prev) {
      const nodePrev = node.prev;
      const nodeNext = node.next;
      if (nodePrev) nodePrev.next = nodeNext;
      if (nodeNext) nodeNext.prev = nodePrev;
    } else {
      const nodePrev = node.prev;
      nodePrev.next = this.tail;
      this.tail.prev = nodePrev;
    }
    this.head.next = node;
    if (headNext) node.next = headNext.next;
    if (headNext) headNext.prev = node;
    node.prev = this.head;
    return node.value;
  }
  return -1;
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
  let node = this.map.get(key);
  if (node) {
    // 存在key对应的值了
  } else {
    node = new DLinkedList(key, value, null, null);
    if (this.head.next === null) {
      this.head.next = node;
      this.tail.prev = node;
      node.prev = this.head;
      node.next = this.tail;
    }
    const headNext = this.head.next;
    this.head.next = node;
    node.prev = this.head;
    node.next = headNext;
    headNext.prev = node;
    this.map.set(key, node);
  }
};

const lru = new LRUCache(10);
lru.put(1, 10);
lru.put(2, 20);
// console.log(lru.get(1));
console.log(lru.tail.prev);
console.log(lru.head.next)
