/*
 * @Author: 毛毛
 * @Date: 2022-12-30 21:20:08
 * @Last Modified by: 毛毛
 * @Last Modified time: 2022-12-30 21:51:34
 * https://leetcode.cn/problems/median-of-two-sorted-arrays/description/
 */

export function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
  const [m, n] = [nums1.length, nums2.length];
  const [left, right] = [(m + n + 1) >> 1, (m + n + 2) >> 1];
  //将偶数和奇数的情况合并，如果是奇数，会求两次同样的 k 。
  return (
    (getKth(nums1, 0, m - 1, nums2, 0, n - 1, left) +
      getKth(nums1, 0, m - 1, nums2, 0, n - 1, right)) *
    0.5
  );
}

const getKth = (
  nums1: number[],
  start1: number,
  end1: number,
  nums2: number[],
  start2: number,
  end2: number,
  k: number
): number => {
  const len1 = end1 - start1 + 1,
    len2 = end2 - start2 + 1;
  //让 len1 的长度小于 len2，这样就能保证如果有数组空了，一定是 len1
  if (len1 > len2) return getKth(nums2, start2, end2, nums1, start1, end1, k);
  if (len1 === 0) return nums2[start2 + k - 1];
  if (k === 1) return Math.min(nums1[start1], nums2[start2]);
  const i = start1 + Math.min(len1, k >> 1) - 1,
    j = start2 + Math.min(len2, k >> 1) - 1;
  if (nums1[i] > nums2[j]) {
    return getKth(
      nums1,
      start1,
      end1,
      nums2,
      j + 1,
      end2,
      k - (j - start2 + 1)
    );
  } else {
    return getKth(
      nums1,
      i + 1,
      end1,
      nums2,
      start2,
      end2,
      k - (i - start1 + 1)
    );
  }
};
