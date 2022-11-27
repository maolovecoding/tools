import { test, expect } from "vitest";

const sum = (a: number, b: number) => a + b;
test("mao", () => {
  expect(sum(10, 20)).toBe(30);
  // expect(sum(10, 20), '不等于30').toBe(20);
});
