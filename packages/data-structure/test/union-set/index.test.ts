import { test, expect } from "vitest";
import { UnionSet } from "@tools/data-structure/src/union-set";
test("UnionSet", () => {
  const union = new UnionSet<number>();
  union.unionSet([1,2,3,4]);
  expect(union.isSameSet(1, 2)).toBe(false)
  union.union(1, 2)
  expect(union.isSameSet(1, 2)).toBe(true)
  union.union(2, 3)
  expect(union.isSameSet(3, 2)).toBe(true)
  expect(union.isSameSet(3, 1)).toBe(true)
  expect(union.sizeMap.size).toBe(2)
});
