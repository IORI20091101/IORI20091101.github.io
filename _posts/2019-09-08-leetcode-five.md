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


 ### 2.独一无二的出现次数
 [独一无二的出现次数](https://leetcode-cn.com/problems/unique-number-of-occurrences/): 
 给你一个整数数组 arr，请你帮忙统计数组中每个数的出现次数。

如果每个数的出现次数都是独一无二的，就返回 true；否则返回 false。


提示：

* 1 <= arr.length <= 1000
* -1000 <= arr[i] <= 1000

```
示例 1：

输入：arr = [1,2,2,1,1,3]
输出：true
解释：在该数组中，1 出现了 3 次，2 出现了 2 次，3 只出现了 1 次。没有两个数的出现次数相同。
示例 2：

输入：arr = [1,2]
输出：false
示例 3：

输入：arr = [-3,0,1,-3,1,1,1,-3,10,0]
输出：true

```

#### 答案一
```javascript

/**
 * @param {number[]} arr
 * @return {boolean}
 */
var uniqueOccurrences = function(arr) {
    let objMap = {}
    
    arr.forEach(val => {
        if(objMap.hasOwnProperty(val)) {
            objMap[val]++;
        } else {
            objMap[val] = 1;
        }
    })
    
    let arr1 = Object.values(objMap);
    let arr2 = [...new Set(arr1)];
    
    return arr1.length === arr2.length;
};
```

#### 答案二
```java
class Solution {
    public boolean uniqueOccurrences(int[] arr) {
        Map<Integer, Integer> map = new HashMap<Integer, Integer>();
        Set<Inetger> set = new HashSet<Integer>();

        for(int data: arr) {
            if(map.get(data) == null) map.put(data,1);
            else map.put(data, map.get(data) + 1);
        }

        for(Integer i : map.values()) {
            if(!set.add(i)) return false;
        }

        return true;
    }
}
```
