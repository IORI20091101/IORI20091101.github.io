---
layout:     post
title:      JAVASCRIPT面试题 
subtitle:   一些好的javascript面试题总结
date:       2018-09-11
author:     "toshiba"
header-img: "images/bg/batman/bat8.jpg"
comments: true

tags :
    - 面试
    - JAVASCRIPT

categories:
    - 面试
---




## 使用立即调用函数IIFE创建局部作用域
```javascript

function wrapElements(a) {
	var result = [], i, n;
	for(i = 0, n = a.length; i < n; i++) {
		result[i] = function() { return a[i] }
	}

	return result;
}

var wrapped = wrapElements([10, 20, 30, 40, 50]);

var f = wrapped[0];

f();  // ? 输出结果 undefined


// 更具有欺骗性的例子
function wrapElements(a) {
	var result = [];
	for(var i = 0, n = a.length; i < n; i++) {
		result[i] = function() { return a[i] }
	}

	return result;
}

var wrapped = wrapElements([10, 20, 30, 40, 50]);

var f = wrapped[0];


f();  // ? 输出结果 undefined


```

在流行的JavaScript的引擎中的另一个缺陷是函数命名表达式的声明进行提升。

```
var f = g() { returen 17; }
g(); // 17 (在非标准的环境中，标准环境会报错 g is not defined)


我们应该怎样做
var f = function g() { return 17; }
var g = null;

```
