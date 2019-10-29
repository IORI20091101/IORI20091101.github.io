---
layout:     post
title:      LeetCode刷题总结(简单版五)
subtitle:   对LeetCode刷过的题目进行整理总结，方便后期查阅复习。
date:       2019-09-08
author:     "toshiba"
header-img: "images/bg/batman/bat8.jpg"
comments: true

tags :
    - 面试
    - 基础
    - LeetCode

categories:
    - LeetCode
---

本文将LeetCode刷过的题目进行简单的总结和记录，便于自己进行复习，同时将看到的解题思路进行汇总让其他的小伙伴能够理解。

### 1.两个数组的交集
[两个数组的交集](https://leetcode-cn.com/problems/intersection-of-two-arrays/)：
给定两个数组，编写一个函数来计算它们的交集。

```
示例 1:

输入: nums1 = [1,2,2,1], nums2 = [2,2]
输出: [2]
示例 2:

输入: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
输出: [9,4]

```

说明:

* 输出结果中的每个元素一定是唯一的。
* 我们可以不考虑输出结果的顺序。



#### 答案一
自己的解法常规思路不推荐

```javascript
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersection = function(nums1, nums2) {
    
    let resultDup = [];
    nums1.forEach(val => {
        nums2.forEach(v => {
            if(val == v) {
                resultDup.push(val);
            }
        })
    });
    
    let result = [];
    while(resultDup.length > 0) {
        let val = resultDup.shift();
        if(resultDup.indexOf(val) < 0) {
            result.push(val);    
        }
    }

    return result;
    
};

```

同样js解法利用Set去重复
```javascript
var intersection = function(nums1, nums2) {
    let hash1 = new Set(nums1)
    let hash2 = new Set()

    for(let i = 0; i < nums.length; i++) {
        if(has2.has(nums2[i])) {
            hash2.add(nums2[i])
        }
    }
    return [...hash2]
}

```

利用数组api解法,更简洁
```javascript
var intersection = function(nums1, nums2) {
    return [...new Set(nums1.filter(v => nums2.includes(v)))];
}
```

 #### 答案二
 ```java
 class Solution {
     public int[] intersection(int[] nums1, int[] nums2) {
         HashSet<Integer> set1 = new HashSet<Integer>();
         for(Integer n : nums1) set1.add(n);

         HashSet<Integer> set2 = new HashSet<Integer>();
         for(Integer n : nums2) set2.add(n);

         set1.retainAll(set2);

         int[] output = new int[set1.size()];
         int idx = 0;
         for(int s : set) output[idx++] = s;
         return output;

     }
 }
 ```