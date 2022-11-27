/**
 * @Author: 毛毛
 * @Date: 2022-11-27 13:20:03
 * @Last Modified by: 毛毛
 * @Last Modified time: 2022-11-27 13:35:21
 * 前缀树节点 每条路径就是字符
 */
export default class Node {
  // 以当前节点的字符为前缀的字符出现了多少个(访问的时候会通过当前节点)
  private pass: number = 0;
  // 以当前字符结尾的字符串出现了几次
  private end: number = 0;
  // 存储当前节点的子节点（子路径）
  public nexts: Map<number, Node> = new Map();
}
