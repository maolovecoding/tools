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
  this.tail = new DLinkedList(-1, -1, this.head, null);
  this.head.next = this.tail;
  this.size = 0;
};

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
  const node = this.map.get(key);
  if (node) {
    this.moveToHead(node);
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
    // 存在key对应的值了 移动到头结点
    node.value = value;
    this.moveToHead(node);
  } else {
    node = new DLinkedList(key, value, null, null);
    this.map.set(key, node);
    this.addToHead(node);
    if (++this.size > this.capacity) {
      // 删除最后一个节点
      const tail = this.removeTail();
      this.map.delete(tail.key);
      this.size--;
    }
  }
};
LRUCache.prototype.addToHead = function (node) {
  node.prev = this.head;
  node.next = this.head.next;
  this.head.next.prev = node;
  this.head.next = node;
};
LRUCache.prototype.removeNode = function (node) {
  node.prev.next = node.next;
  node.next.prev = node.prev;
};
LRUCache.prototype.moveToHead = function (node) {
  this.removeNode(node);
  this.addToHead(node);
};
LRUCache.prototype.removeTail = function () {
  const res = this.tail.prev;
  this.removeNode(res);
  return res;
};

const lru = new LRUCache(1);
lru.put(2, 1);
console.log(lru.get(2));
lru.put(3, 2);
console.log(lru.get(2));
console.log(lru.get(3));
// [[1],[2,1],[2],[3,2],[2],[3]]
console.log(lru.tail.prev.value);
console.log(lru.head.next.value);
