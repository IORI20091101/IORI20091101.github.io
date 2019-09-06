---
layout:     post
title:      LeetCode刷题总结(简单版三)
subtitle:   对LeetCode刷过的题目进行整理总结，方便后期查阅复习。
date:       2019-09-05
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

### 1.自除数
[自除数](https://leetcode-cn.com/problems/self-dividing-numbers/)：
自除数 是指可以被它包含的每一位数除尽的数。
例如，128 是一个自除数，因为 128 % 1 == 0，128 % 2 == 0，128 % 8 == 0。
还有，自除数不允许包含 0 。
给定上边界和下边界数字，输出一个列表，列表的元素是边界（含边界）内所有的自除数。

注意：
* 每个输入参数的边界满足 1 <= left <= right <= 10000。


```
示例 1：

输入： 
上边界left = 1, 下边界right = 22
输出： [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 15, 22]
```

#### 答案一：
分析： 关键点就是对数字进行拆分取整数和取余数,我自己的解法代码有点复杂冗余，下面是根据题解的优化方法：

```javascript
/**
 * @param {number} left
 * @param {number} right
 * @return {number[]}
 */
var selfDividingNumbers = function (left, right) {
    let arr = [];
    for(let i = left; i <= right; i++) {
        let n = i;
        let flag = true;
        while(n) {
            if (i % (n % 10) === 0) {
                n = Math.floor(n / 10);
            } else {
                flag = false;
                break;
            }
        }
        if(flag) {
            arr.push(i);
        }
    }
    return arr;
};

```