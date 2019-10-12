---
layout:     post
title:      LeetCode刷题总结(简单版四)
subtitle:   对LeetCode刷过的题目进行整理总结，方便后期查阅复习。
date:       2019-09-07
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

### 1.反转字符串中的单词 III
[反转字符串中的单词 III](https://leetcode-cn.com/problems/reverse-words-in-a-string-iii/submissions/)：
给定一个字符串，你需要反转字符串中每个单词的字符顺序，同时仍保留空格和单词的初始顺序。

注意：在字符串中，每个单词由单个空格分隔，并且字符串中不会有任何额外的空格。

```
示例 1:

输入: "Let's take LeetCode contest"
输出: "s'teL ekat edoCteeL tsetnoc" 
```


#### 答案一

```javascript
/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function(s) {
    return (s.split(' ').map(val => val.split('').reverse().join(''))).join(' ');
};

```
#### 答案二

稍微有点取巧的做法，reverse函数也可以用双指针实现。

```java
class Solution 
{
    public String reverseWords(String s) 
    {
        String[] sp=s.split(" ");
        StringBuilder sb=new StringBuilder();
        for(int i=0;i<=sp.length-1;i++)
        {
            StringBuilder t=new StringBuilder();
            t.append(sp[i]);
            sb.append(t.reverse().toString()).append(" ");
        }
        return sb.substring(0,sb.length()-1);
    }
}
```

### 2.反转字符串
[反转字符串](https://leetcode-cn.com/problems/reverse-string/):
编写一个函数，其作用是将输入的字符串反转过来。输入字符串以字符数组 char[] 的形式给出。

不要给另外的数组分配额外的空间，你必须原地修改输入数组、使用 O(1) 的额外空间解决这一问题。

你可以假设数组中的所有字符都是 ASCII 码表中的可打印字符。

```
示例 1：

输入：["h","e","l","l","o"]
输出：["o","l","l","e","h"]
示例 2：

输入：["H","a","n","n","a","h"]
输出：["h","a","n","n","a","H"]

```

#### 答案一
reverse

```javascript
/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function(s) {
    return s.reverse();
};
```

#### 答案二
其实本题并不是想考reverse, 感觉应该是想考reverse的实现
```javascript
/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function(s) {
    var len = s.length;
    for(var i = 0, center = Math.floor(len / 2); i < center; i++) {
        let edx = len - i - 1;
        let temp = s[edx];
        s[edx] = s[i];
        s[i] = temp;
    }
    return s;
};
```

### 3.数组拆分 I
[数组拆分 I](https://leetcode-cn.com/problems/array-partition-i/):
给定长度为 2n 的数组, 你的任务是将这些数分成 n 对, 例如 (a1, b1), (a2, b2), ..., (an, bn) ，使得从1 到 n 的 min(ai, bi) 总和最大。

提示:
* n 是正整数,范围在 [1, 10000].
* 数组中的元素范围在 [-10000, 10000].

```

示例 1:

输入: [1,4,3,2]

输出: 4
解释: n 等于 2, 最大总和为 4 = min(1, 2) + min(3, 4).
```

#### 答案一
首先排序 ,然后将index为奇数的进行求和.
```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var arrayPairSum = function(nums) {
    let sortNums = nums.sort((a, b) => a - b);
    let sum = 0;
    sortNums.forEach(function(val, key) {
      if(key % 2 === 0)  {
          sum += val;
      }
    });
    
    return sum;
    
};
```

### 4.键盘行
[键盘行](https://leetcode-cn.com/problems/keyboard-row/):

给定一个单词列表，只返回可以使用在键盘同一行的字母打印出来的单词。键盘如下图所示。
![](https://cdn.darknights.cn/assets/images/in-post/leetcode/keyboard.png)
注意：

* 你可以重复使用键盘上同一字符。
* 你可以假设输入的字符串将只包含字母。


```
示例：

输入: ["Hello", "Alaska", "Dad", "Peace"]
输出: ["Alaska", "Dad"]
```

#### 答案一
分析: 定好map对应关系 两层遍历就可以,可以先取到首字母的指然后判断是否跟首字母相等

```javascript

/**
 * @param {string[]} words
 * @return {string[]}
 */
var findWords = function(words) {
    let alObj = {
        q: 0,w: 0,e: 0,r: 0, t: 0,y: 0,u: 0,i: 0,q: 0,o: 0,p: 0,
        a: 1,s: 1,d: 1,f: 1,g: 1,h: 1,j: 1,k: 1,l: 1,
        z: 2,x: 2,c: 2,v: 2,b: 2,n: 2,m: 2
    };
    
    let lWords = words.map(val => val.toLowerCase());
    let leng = lWords.length;
    
    let result = [];
    
    lWords.forEach((str, key) => {
        let flag = true;    
        let first =  alObj[str.charAt(0)];
        for(let i = 0; i < str.length; i++) {
            let current = alObj[str.charAt(i)];
            if(first !== current) {
                flag = false;
                break;
            }
        }
        if(flag) {
            result.push(words[key]);
        }
    });
    
    return result;
    
};
```

#### 答案二
正则表达式匹配
```javascript
var findWords = function(words) {
    let reg1 = new RegExp("[qwertyuiop]", "i");
    let reg2 = new RegExp("[asdfghjkl]", "i");
    let reg3 = new RegExp("[zxcvbnm]", "i");
    let result = [];
    words.forEach(word => {
        let flag1 = reg1.test(word);
        let flag2 = reg2.test(word);
        let flag3 = reg3.test(word);
        
        if((flag1 && !flag2 && !flag3)||(!flag1 && !flag2 && flag3)||(!flag1 && flag2 && !flag3)){
            result.push(word);
        }
    })

    return result;
    
}

```