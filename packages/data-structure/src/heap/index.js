// 最小堆
class MinHeap {
  constructor() {
      this.heap = []
  }
  size() {
      return this.heap.length;
  }
  clear() {
      this.heap.clear();
  }
  // 上滤
  slftUp(index) {
      const curr = this.heap[index];
      while (index > 0) {
          // 获取父节点
          const parentIndex = (index - 1) >> 1;
          const parent = this.heap[parentIndex]
          if (parent <= curr) break;

          this.heap[index] = parent;
          index = parentIndex
      }
      this.heap[index] = curr;
  }
  // 下滤
  slftDown(index) {
      let curr = this.heap[index]
      const half = this.size() >> 1
      while (index < half) {
          // 拿到子节点
          // 一定有左子节点
          let childIndex = (index << 1) + 1;
          let child = this.heap[childIndex]
          const rightIndex = childIndex + 1;
          if (rightIndex < this.size() && child > this.heap[rightIndex]) {
              child = this.heap[childIndex = rightIndex]
          }
          if (child >= curr) break;
          this.heap[index] = child;
          index = childIndex
      }
      this.heap[index] = curr;
  }

  add(value) {
      this.heap.push(value)
      // 上滤
      this.slftUp(this.size() - 1);
  }
  remove() {
      this.heap[0] = this.heap.pop()
      // 下滤
      this.slftDown(0)
  }
  rem(value) {
      if (this.get() > value) return;
      this.heap[0] = value
      this.slftDown(0)
  }
  get() {
      return this.heap[0]
  }
}

// 堆的实现
class Heap {
  constructor(compare) {
    this._size = 1
    this.heap = [null]
    // 默认最大堆 不传递的话
    if (typeof compare === 'function') this.compare = compare
    else this.compare = (a, b) => a - b
  }
  // 上滤
  up(index) {
    let parent = index >> 1
    while (parent >= 1) {
      if (this.compare(this.heap[index], this.heap[parent]) > 0) {
        this.swap(index, parent)
        index = parent
        parent = index >> 1
      } else break
    }
  }
  // 下浮
  down(index) {
    let leftSonIndex, rightSonIndex, half = this._size >> 1
    while (index < half) {
      // 找到子节点中 更（大或者小）满足要求的值
      leftSonIndex = index << 1
      rightSonIndex = leftSonIndex + 1
      const i = rightSonIndex < this._size ? this.compare(this.heap[leftSonIndex], this.heap[rightSonIndex]) > 0 ? leftSonIndex : rightSonIndex : leftSonIndex
      if (this.compare(this.heap[i], this.heap[index]) > 0) {
        this.swap(i, index)
        index = i
      } else break
    }
  }
  // 插入一个数据
  insert(value) {
    this.heap.push(value)
    // 上滤
    this.up(this._size++)
  }
  remove(index) {
    if (this.size() <= 0) return
    // this.swap(index + 1, --this._size)
    this.heap[1] = this.heap.pop()
    this._size--
    // 下虑
    this.down(index + 1)
  }
  // 返回堆顶 的数据
  top() {
    if (this.size() > 0) return this.heap[1]
  }
  size() {
    return this._size - 1
  }
  swap(i, j) {
    this.heap[i] ^= this.heap[j]
    this.heap[j] ^= this.heap[i]
    this.heap[i] ^= this.heap[j]
  }
}

const heap = new Heap((a, b) => b - a)
heap.insert(6)
heap.insert(5)
heap.insert(4)
heap.insert(3)
heap.insert(2)
heap.insert(1)
heap.remove(0)
console.log(heap.heap)
console.log(heap.size())
