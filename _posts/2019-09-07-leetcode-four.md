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


#### 答案一：

```javascript
/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function(s) {
    return (s.split(' ').map(val => val.split('').reverse().join(''))).join(' ');
};

```
#### 答案二:

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
