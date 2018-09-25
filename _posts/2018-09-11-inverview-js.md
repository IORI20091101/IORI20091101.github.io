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


什么时候函数柯里化？柯里化的作用

* 延迟计算
* 参数复用， 当在多次调用同一个函数，并且传递的参数绝大多数相同，那么该函数可能是一个很好的柯里化候选
* 动态创建函数， 这可以是在部分计算出结果后，在此基础上动态生成新的函数处理后面的业务，这样省略了计算


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

## 创建一个原型为null的对象用作字典

防止原型污染的最简单的方式之一就是一开始就不使用原型。但是ES5发布之前并没有一个标准的方式创建一个空原型的新对象。你可能会这样做
该例子是否能创建一个原型为null的对象。不能的话要怎么做
```
function C() { }

C.prototype = null;

var o = new C();

Object.getPrototypeOf(o) === null; // false
Object.getPrototypeOf(o) === Object.prototype // true

// ES5之后应该这样做
var x = Object.create(null);

Object.getPrototypeOf(o) === null; // true

在不支持Object.create的JavaScript环境中特殊对象__proto__提供了对对象内部原型链的读写访问

var x = { __proto__: null };

x instanceof Object;  // false;

```
第二种貌似更方便，但是有了Object.create函数后，Object.create是更值得推荐的方式。
