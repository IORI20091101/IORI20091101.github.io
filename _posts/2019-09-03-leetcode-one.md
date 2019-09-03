---
layout:     post
title:      LeetCode刷题总结(简单版一)
subtitle:   对LeetCode刷过的题目进行整理总结，方便后期查阅复习。
date:       2019-09-03
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

### 宝石与石头
[宝石与石头](https://leetcode-cn.com/problems/jewels-and-stones/)：
给定字符串J 代表石头中宝石的类型，和字符串 S代表你拥有的石头。 S 中每个字符代表了一种你拥有的石头的类型，你想知道你拥有的石头中有多少是宝石。
J 中的字母不重复，J 和 S中的所有字符都是字母。字母区分大小写，因此"a"和"A"是不同类型的石头。
```
示例1:
输入: J = "aA", S = "aAAbbbb"
输出: 3

示例1:
输入: J = "z", S = "ZZ"
输出: 0
```
注意:
S 和 J 最多含有50个字母。
J 中的字符不重复。

#### 答案一：
分析：最笨的方法肯定是双层遍历。
```javascript
/**
 * @param {string} J
 * @param {string} S
 * @return {number}
 */
var numJewelsInStones = function(J, S) {
    var jLen = J.length;
    var sLen = S.length;
    var sum = 0;
    for(var i = 0; i < jLen; i++) {
        var j = J.charAt(i);
        for(var k = 0; k < sLen; k++) {
            if(j === S.charAt(k)) {
                sum++;
            }
        }   
    }
    
    return sum;
    
};
```

#### 答案二：
通过题解得到了另一种思路就是将J进行循环遍历然后将S中的匹配值全部替换为空，这样长度的差值就是宝石的数量
```
/**
 * @param {string} J
 * @param {string} S
 * @return {number}
 */
var numJewelsInStones = function(J, S) {
    var jLen = J.length,
        sLen = S.length;
        var news= S;
    for(var i = 0; i < jLen; i++) {
        news = news.replace(new RegExp(J.charAt(i), 'g'), "");
    }
    
    return sLen - news.length;
    
};

```

### IP地址无效化
[IP地址无效化](https://leetcode-cn.com/problems/defanging-an-ip-address/)：
给你一个有效的 IPv4 地址 address，返回这个 IP 地址的无效化版本。
所谓无效化 IP 地址，其实就是用 "[.]" 代替了每个 "."。
```
示例1:
输入：address = "1.1.1.1"
输出："1[.]1[.]1[.]1"

示例2:
输入：address = "255.100.50.0"
输出："255[.]100[.]50[.]0"
```
#### 答案一
分析：最简单直接的方案就是正则表达式替换
```
/**
 * @param {string} address
 * @return {string}
 */
var defangIPaddr = function(address) {
    return address.replace(/\./g, '[.]');
};
```


### 删除链表中的节点
[删除链表中的节点](https://leetcode-cn.com/problems/delete-node-in-a-linked-list/):
请编写一个函数，使其可以删除某个链表中给定的（非末尾）节点，你将只被给定要求被删除的节点。
现有一个链表 -- head = [4,5,1,9]，它可以表示为:
![](https://cdn.darknights.cn/assets/images/in-post/leetcode/237_example.png)
```
示例1
输入: head = [4,5,1,9], node = 5
输出: [4,1,9]
解释: 给定你链表中值为 5 的第二个节点，那么在调用了你的函数之后，该链表应变为 4 -> 1 -> 9.

示例2
输入: head = [4,5,1,9], node = 1
输出: [4,5,9]
解释: 给定你链表中值为 1 的第三个节点，那么在调用了你的函数之后，该链表应变为 4 -> 5 -> 9.

```
说明:
* 链表至少包含两个节点。
* 链表中所有节点的值都是唯一的。
* 给定的节点为非末尾节点并且一定是链表中的一个有效节点。
* 不要从你的函数中返回任何结果。

#### 答案一
分析：说实话这道题目对于前端的同学来说其实很难理解。但是对于后台同学这个就太简单了，首先要理解[单向链表的概念](https://blog.csdn.net/jianyuerensheng/article/details/51200274)。对于本题只需要将删除后的节点指向新节点
```java
public void deleteNode(ListNode node) {
    node.val = node.next.val;
    node.next = node.next.next;
}
```

#### 答案二
对于使用javascript的版本需要首先定义一个单向链表
```
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} node
 * @return {void} Do not return anything, modify node in-place instead.
 */
var deleteNode = function(node) {
  node.val = node.next.val;
  node.next = node.next.next;
};

var deleteNode = function(node) {
  node = Object.assign(node, node.next)
};

```

### 查找重复的电子邮箱
[查找重复的电子邮箱](https://leetcode-cn.com/problems/duplicate-emails/): 编写一个 SQL 查询，查找 <code>Person</code> 表中所有重复的电子邮箱。
```
示例：
+----+---------+
| Id | Email   |
+----+---------+
| 1  | a@b.com |
| 2  | c@d.com |
| 3  | a@b.com |
+----+---------+

返回结果：
+---------+
| Email   |
+---------+
| a@b.com |
+---------+
```

#### 答案一
```
select Email
from Person
group by Email
having count(Email) > 1
```

#### 答案二
```
select Email from
(
    select Email, count(Email) as num
    from Person
    group by Email
) as statistic
where num > 1;
```

### 大的国家
[大的国家](https://leetcode-cn.com/problems/big-countries/):这里有张 World 表
```
+-----------------+------------+------------+--------------+---------------+
| name            | continent  | area       | population   | gdp           |
+-----------------+------------+------------+--------------+---------------+
| Afghanistan     | Asia       | 652230     | 25500100     | 20343000      |
| Albania         | Europe     | 28748      | 2831741      | 12960000      |
| Algeria         | Africa     | 2381741    | 37100000     | 188681000     |
| Andorra         | Europe     | 468        | 78115        | 3712000       |
| Angola          | Africa     | 1246700    | 20609294     | 100990000     |
+-----------------+------------+------------+--------------+---------------+
```
如果一个国家的面积超过300万平方公里，或者人口超过2500万，那么这个国家就是大国家。

编写一个SQL查询，输出表中所有大国家的名称、人口和面积。

例如，根据上表，我们应该输出:
```
+--------------+-------------+--------------+
| name         | population  | area         |
+--------------+-------------+--------------+
| Afghanistan  | 25500100    | 652230       |
| Algeria      | 37100000    | 2381741      |
+--------------+-------------+--------------+

```

### 二叉搜索树的范围和
[二叉搜索树的范围和](https://leetcode-cn.com/problems/range-sum-of-bst/): 给定二叉搜索树的根结点 root，返回 L 和 R（含）之间的所有结点的值的和。
二叉搜索树保证具有唯一的值。

```
示例1:
输入：root = [10,5,15,3,7,null,18], L = 7, R = 15
输出：32

示例2:
输入：root = [10,5,15,3,7,13,18,1,null,6], L = 6, R = 10
输出：23
``` 
提示
* 树中的结点数量最多为 10000 个。
* 最终的答案保证小于 2^31。

#### 答案一