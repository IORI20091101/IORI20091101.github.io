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

### 2.二叉搜索树中的搜索
[二叉搜索树中的搜索](https://leetcode-cn.com/problems/search-in-a-binary-search-tree/):
给定二叉搜索树（BST）的根节点和一个值。 你需要在BST中找到节点值等于给定值的节点。 返回以该节点为根的子树。 如果节点不存在，则返回 NULL。
例如，
```
给定二叉搜索树:

        4
       / \
      2   7
     / \
    1   3

和值: 2
你应该返回如下子树:

      2     
     / \   
    1   3
在上述示例中，如果要找的值是 5，但因为没有节点值为 5，我们应该返回 NULL。
```

#### 答案一

```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} val
 * @return {TreeNode}
 */
var searchBST = function(root, val) {
    if(root === null) {
        return null;
    }
    
    if(root.val > val) {
        return searchBST(root.left, val);
    } else if(root.val === val) {
        return root;
    } else {
        return searchBST(root.right, val);
    }
};
```

#### 答案二
```java
// 迭代
class Solution {
    public TreeNode searchBST(TreeNode root, int val) {
        while(root != null) {
            if(root.val == val) {
                return root;
            } else if(root.val > val) {
                root = root.left;
            } else {
                root = root.right;
            }
        }
        return null;
    }
}
```

#### 答案三

```java
//按照逻辑递归
class Solution {
    public TreeNode searchBST(TreeNode root, int val) {
        if(root == null) 
            return null;
        
        if(root.val == val) {
            return root;
        } else if(val < root.val) {
            return searchBST(root.left, val);
        } else {
            return searchBST(root.right, val);
        }
    }
}
```

### 3.N叉树的后序遍历
[N叉树的后序遍历](https://leetcode-cn.com/problems/n-ary-tree-postorder-traversal/):给定一个 N 叉树，返回其节点值的后序遍历。

例如，给定一个 3叉树 :
![](https://cdn.darknights.cn/assets/images/in-post/leetcode/narytree.png)
返回其后序遍历: [5,6,3,2,4,1].

说明: 递归法很简单，你可以使用迭代法完成此题吗?


#### 答案一
```javascript

/**
 * // Definition for a Node.
 * function Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */
/**
 * 第一种方式：递归
 * @param {Node} root
 * @return {number[]}
 */
var postorder = function(root) {
    if(!root) return [];

    var res = [];
    recusion(root);
    return res;

    function recusion(root) {
        if(!root) return;

        for(var i = 0; i < root.children.length; i++) {
            recusion(root.children[i]);
        }
        res.push(root.val);
    }
};

```

#### 答案二
```javascript
/**
 * 第二种方式：迭代
 * @param {Node} root
 * @return {number[]}
 */
var postorder2 = function(root) {
    if(!root) return [];
    var res = [], arr = [root];
    while(arr.length) {
        var current = arr.pop();
        for(var i = 0; i < current.children.length; i++) {
            arr.push(current.children[i]);
        }
        res.unshift(current.val);
    }
    return res;
}

```

### 答案三
```java
class Solution {
    public List<Integer> postorder(Node root) {
        List<Integer> res = new ArrayList<Integer>();
        if(root == null) return res;
        for(Node cur: root.children) {
            res.addAll(postorder(cur));
        }
        res.add(root.val);
        return res;
    }
}
```


### 4.N叉树的前序遍历
例如，给定一个 3叉树 :
![](https://cdn.darknights.cn/assets/images/in-post/leetcode/narytree.png)
返回其前序遍历: [1,3,5,6,2,4]。
说明: 递归法很简单，你可以使用迭代法完成此题吗?

#### 答案一
```javascript
/**
 * // Definition for a Node.
 * function Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */
/**
 * @param {Node} root
 * @return {number[]}
 */
var preorder = function(root) {
    if(!root) return [];
    var res = [];
    recusion(root);
    return res;
    
    function recusion(root) {
        if(!root) return;
        res.push(root.val);
        for(var i = 0; i < root.children.length; i++) {
            recusion(root.children[i]);
        }
    }
};
```

#### 答案二
```java
class Solution {
    public List<Integer> preorder(Node root) {
        List<Integer> res = new ArrayList<Integer>();
        if(root == null) return res;
        res.add(root.val);
        for(Node cur: root.children) {
            res.addAll(preorder(cur));
        }
        return res;
    }
}
```

#### 答案三
迭代
```java
class Solution {
    public List<Integer> preorder(Node root) {
        List<Integer> res = new ArrayList<Integer>();
        if(root == null) return res;
    
        Stack<Node> stack = new Stack<>();
        stack.push(root);
        while(!stack.isEmpty()) {
            Node cur = stack.pop();
            res.add(cur.val);

            List<Node> nodeList = cur.children;
            for(int i = nodeList.size() - 1; i >= 0; i--) {
                stack.push(nodeList.get(i));
            }
        }

        return res;
    }
}
```



### 5.Nim 游戏
[Nim 游戏](https://leetcode-cn.com/problems/nim-game/submissions/):
你和你的朋友，两个人一起玩 Nim 游戏：桌子上有一堆石头，每次你们轮流拿掉 1 - 3 块石头。 拿掉最后一块石头的人就是获胜者。你作为先手。
你们是聪明人，每一步都是最优解。 编写一个函数，来判断你是否可以在给定石头数量的情况下赢得游戏。
```
示例:

输入: 4
输出: false 
解释: 如果堆中有 4 块石头，那么你永远不会赢得比赛；
     因为无论你拿走 1 块、2 块 还是 3 块石头，最后一块石头总是会被你的朋友拿走。

```

#### 答案一
分析:随机拿1-3块石头，这里的4是一个临界点，依次以，5，6，7，8举例计算，发现每次能被4整除时一定会返回false,其他返回true
```javascript
/**
 * @param {number} n
 * @return {boolean}
 */
var canWinNim = function(n) {
    return n % 4 ? true: false;  
};
```

### 6.山脉数组的峰顶索引
[山脉数组的峰顶索引](https://leetcode-cn.com/problems/peak-index-in-a-mountain-array/):
我们把符合下列属性的数组 A 称作山脉：
* A.length >= 3
* 存在 0 < i < A.length - 1 使得A[0] < A[1] < ... A[i-1] < A[i] > A[i+1] > ... > A[A.length - 1]

给定一个确定为山脉的数组，返回任何满足 A[0] < A[1] < ... A[i-1] < A[i] > A[i+1] > ... > A[A.length - 1] 的 i 的值。

提示：
* 3 <= A.length <= 10000
* 0 <= A[i] <= 10^6
* A 是如上定义的山脉

```
示例 1：

输入：[0,1,0]
输出：1
示例 2：

输入：[0,2,1,0]
输出：1
 


```

#### 答案一
分析：通过读题其实是返回数组中最大值的索引
```javascript
/**
 * @param {number[]} A
 * @return {number}
 */
var peakIndexInMountainArray = function(A) {
    return A.findIndex(val => val == Math.max(...A));
};
```

#### 答案二
后台的解题方法更多可以参考一下
```java
// 打桩法，也叫单向扫描，代码如下：时间复杂度为O(n)，效率略低，但是此方法具有普适性，也就是说这个方法可适用于在一般数组中找最大值。
class Solution {
    public int peakIndexInMountainArray(int[] a) {
        if(A == null || A,length < 3>) {
            return 0;
        }

        int max = Integer.MIN_VALUE;
        int ans = 0;
        for(int i = 0; i < A.length; i++) {
            if(A[i] > max) {
                max = A[i];
                ans = i;
            }
        }
        return ans;
    }
}

// 双指针，也叫双向扫描，左右两边同时向中间扫描，以找出最大值，这个算法其实是在打桩法之上的一个效率优化，
// 时间复杂度为O(n/2)--->O(n)，效率较低，但比打桩法效率高，同时也具有普适性。
class Solution {
    public int peakIndexInMountainArray(int[] A) {
        if(A == null || A,length < 3>) {
            return 0;
        }
        int max = Integer.MIN_VALUE;
        int ans = 0;

        int left = 0;
        int right = A.length - 1;

        while(left < right) {
            if(left <= right && A[left] > max) {
                max = A[left];
                ans = left;
            }
            if(left <= right && A[right] > max) {
                max = A[right];
                ans = right;
            }
            left++;
            right--;
        }

        return ans;
    }
}

// 分治法，二分查找，是适用于此题的最佳解法，时间复杂度为O(logn)，优点是效率高，缺点是不具有普适性。因为此题数组特殊，所以可用这种方法提高查找效率。
class Solution {
    public int peakIndexInMountainArray(int[] A) {
         if (A == null || A.length < 3)  {
            return 0;
        }
        
        int ans = 0;
    
        int left = 0;
        int right = A.length;

        while(left < right) {
            int center = (left + right) / 2;
            if(A[center] > A[center - 1] && A[center] > A[center + 1]) {
                ans = center;
                break;
            } else if(A[center] < A[center - 1]) {
                right = center;
            } else {
                left = center;
            }
        }
        return ans;

    }
}

```