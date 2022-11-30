import {
  Node,
  copyListWithRand,
} from "@tools/leetcode";
import { test, expect } from "vitest";

test("剑指offer35. 复杂链表的复制", () => {
  const head = new Node(7, null, null);
  const node1 = new Node(13, null, null);
  const node2 = new Node(11, null, null);
  const node3 = new Node(10, null, null);
  const node4 = new Node(1, null, null);

  head.next = node1;
  node1.next = node2;
  node2.next = node3;
  node3.next = node4;

  head.random = null;
  node1.random = head;
  node2.random = node4;
  node3.random = node2;
  node4.random = head;

  const res = copyListWithRand(head);
  expect(res).toEqual(head)
  const resHead = res;
  const resNode1 = res?.next;
  const resNode2 = resNode1?.next;
  const resNode3 = resNode2?.next;
  const resNode4 = resNode3?.next;
  expect(resHead?.val).toEqual(head.val)
  // console.log(res?.val, head.val)
  // console.log(resNode4?.val)
  // console.log(resNode1?.random?.val)
});
