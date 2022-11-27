/**
 * @Author: 毛毛
 * @Date: 2022-11-27 20:28:13
 * @Last Modified by: 毛毛
 * @Last Modified time: 2022-11-27 21:08:40
 * 力扣 剑指offer35 https://leetcode.cn/problems/fu-za-lian-biao-de-fu-zhi-lcof/
 * 复杂链表的复制
 */
class Node<T> {
  val: T;
  next: Node<T> | null;
  random: Node<T> | null;
  constructor(val: T, next: Node<T> | null, random: Node<T> | null) {
    this.val = val;
    this.next = next;
    this.random = random;
  }
}

const copyListWithRand = <T>(head: Node<T> | null) => {
  // 拷贝的节点 全都放在原节点的下一个
  let p1 = head,
    p2 = head,
    res: Node<T> | null;
  if (!head) return head;
  // val1 -> val2 -> val3
  // val1 -> val1' -> val2 -> val2' -> val3 -> val3' -> ...
  while (p1) {
    const temp = new Node(p1.val, p1.next, null);
    p1.next = temp;
    p1 = temp.next;
  }
  res = head.next;
  // 设置random
  while (p2) {
    if (p2.random) {
      p2.next!.random = p2.random.next;
    }
    p2 = p2.next!.next;
  }
  // TODO 为什么不能设置random的时候 同时分割？ 如果第一百个节点的random指向第二个节点 是没办法找回来的
  // split
  let p3: Node<T> | null = head,
    copyNode: Node<T> | null,
    next: Node<T> | null;
  while (p3) {
    next = p3.next!.next;
    copyNode = p3.next;
    p3.next = next;
    copyNode!.next = next !== null ? next.next : null;
    p3 = next;
  }
  return res;
};

export { Node, copyListWithRand };
