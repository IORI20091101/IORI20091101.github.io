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

方法调用

```
var username="test";

function hello() {
	"use strict";
	return "hello, " + this.username;
}

hello(); "hello, undefined"

```


bind绑定方法接收者，下面例子返回什么结果， 用尽可能多的方法修复该例子

```
var buffer = {
	entries: [],
	add: function(s) {
		this.entries.push(s);
	},
	concat: function() {
		return this.entries.join("");
	}
}

var source = ["867", "-", "5309"];

source.forEach(buffer.add);  // error: entries is undefined


```


函数柯里化 一道有难度的面试题,完成plus函数 满足通过所有的测试条件

```

'use strict';
function plus(n){
  
}
module.exports = plus


'use strict';
var assert = require('assert')

var plus = require('../lib/assign-4')

describe('闭包应用',function(){
  it('plus(0) === 0',function(){
    assert.equal(0,plus(0).toString())
  })
  it('plus(1)(1)(2)(3)(5) === 12',function(){
    assert.equal(12,plus(1)(1)(2)(3)(5).toString())
  })
  it('plus(1)(4)(2)(3) === 10',function(){
    assert.equal(10,plus(1)(4)(2)(3).toString())
  })
  it('方法引用',function(){
    var plus2 = plus(1)(1)
    assert.equal(12,plus2(1)(4)(2)(3).toString())
  })
})
```
