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