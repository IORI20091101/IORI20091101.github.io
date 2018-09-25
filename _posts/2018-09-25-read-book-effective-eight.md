---
layout:     post
title:      Effective JavaScript (八)
subtitle:   数组和字典
date:       2018-09-25
author:     "toshiba"
header-img: "images/bg/batman/bat8.jpg"
comments: true

tags :
    - javascript
    - 读书总结
categories:
    - 读书总结
---


## 使用Object的直接实例构造轻量级的字典

```
var dict = { alice: 34, bob: 24, chris: 62 };

var people = [];

for(var name in dict) {
	people.push(name + ": " + dict[name]);
}

people; // ["alice: 34", "bob: 24", "chris: 62"];

```

我们创建一个自定义的字典类会怎样呢
```

function NaiveDict() {}

NaiveDict.prototype.count = function() {
	var i = 0;
	for(var name in this) {
		i++;
	}

	return i;
};

NaiveDict.prototype.toString = function() {
	return "[object NaiveDict]";
};

var dict = new NaiveDict();

dict.alice = 34;
dict.bob = 24;
dict.chris = 62;

dict.count(); // 5

```

这样有一个问题，count会枚举出所有的属性包括了toString 和count,而不仅仅是我们需要的值。


```
var dict = new Array();

dict.alice = 34;
dict.bob = 24;
dict.chris = 62;

```
这样也会有问题，代码对原型污染很脆弱，应用程序的其他库有可能会打猴子补丁，比如
> 原型污染是指当枚举字典的条目时，原型对象中的一些属性可能会导致出现一些不期望的属性。

```
Array.prototype.first = function() {
	return this[0];
}

Array.prototype.last = function() {
	return this[1];
}

var names = [];
for(var name in dict) {
	names.push(name);
}

names; ["alice", "bob", "chris", "first", "last"]

```
使用使用 <code>new Object() </code>可能会面临同样的问题，但是使用 <code>{}</code>的方式会更好, 虽然不能保证对于原型污染时安全的，任何人仍然能增加属性到Object.prototype，但是风险可以降低到仅仅局限于Object.prototype

* 坚持使用Object的直接实例原则可以使for...in循环摆脱原型污染的影响
* 使用对象字面量构建轻量级字典

## 使用null原型以防止原型污染

防止原型污染的最简单的方式之一就是一开始就不使用原型。但是ES5发布之前并没有一个标准的方式创建一个空原型的新对象。你可能会这样做
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


* 在ES5中要使用Object.create(null)创建自由原型的空对象是不太容易被污染的。
* 在一些老环境中考虑使用{ __proto__: null }， 但是它既不是标准的也不是可移植的还有可能在未来被删除
* 绝对不要使用__proto__作为字典中的key


## 使用hasOwnProperty方法避免原型污染
JavaScript的对象操作总是以继承的方式工作，即使一个空的对象字面量也继承了Object.prototype的大量属性
```
var dict = {}
"alice" in dict; //false;
"bob" in dict; //false;
"chris" in dict; //false;

// toString 和valueOf方法继承自Object.prototype
"toString" in dict; //false;  
"valueOf" in dict; //false;
```
幸运的是Object.hasOwnProperty方法可以用来判断属性是否继承自原型对象。
```
dict.hasOwnProperty("alice");     // false
dict.hasOwnProperty("toString");  // false
dict.hasOwnProperty("valueOf");   // false
```
不幸的是我们没有完全解决问题，当调用dict.hasOwnProperty时，我们请求调查对象的hasOwnProperty方法，通常情况下，该方法会简单的继承自Object.property对象，然而如果字典中存储一个同名的条目时，那么原型中的hasOwnProperty方法不能再被捕获到。

```
dict.hasOwnProperty = 10;

dict.hasOwnProperty("alice");
// error dict.hasOwnProperty is not a function
```
这是有可能的,最安全的方式就是

```
var hasOwn = Object.prototype.hasOwnProperty;
或者
var hasOwn = {}.hasOwnProperty;

hasOwn.call(dict, "alice");
```
不管起接收者的hasOwnProperty方法是否被覆盖，该方法都能工作。


我们开始创建一个字典类 版本一
```
function Dict(elements) {
	this.elements = elements || {};
}

Dict.prototype.has = function(key) {
	return {}.hasOwnProperty.call(this.elements, key);
}

Dict.prototype.get = function(key) {
	return this.has(key) ? this.elements[key] : undefined;
}

Dict.prototype.set = function(key, val) {
	this.elements[key] = val;
}

Dict.prototype.remove = function(key) {
	delete this.elements[key];
}

var dict = new Dict({
	alice: 34,
	bob: 24,
	chris: 62
});

dict.has("alice");    // true
dict.get("bob");      // 24
dict.has("valueOf")   //false

```
在一些JavaScript的环境中，特殊的属性名__proto__可能导致自身的污染问题__proto__属性只是简单的继承Object.prototype,所以我们的例子会有一个问题
```
var dict = new Dict();
dict.has("__proto__"); // ?

```
这段代码在不同的环境下可能会有不同的结果，所以为了达到最大的可移植性和安全性，便有了下面更复杂但是更安全的实现
这里检测到__proto__的可以 重新设置一个新属性作为实例对象的一个属性，随对象而在但是不会去设置对象的__proto__
```
function Dict(elements) {
	this.elements = elements || {};
	this.hasSpecialProto = false;
	this.specialProto = undefined;
}

Dict.prototype.has = function(key) {
	if(key === "__proto__") { 
		return this.hasSpecialProto;
	}
	return {}.hasOwnProperty.call(this.elements, key);
}

Dict.prototype.get = function(key) {
	if(key === "__proto__") { 
		return this.specialProto;
	}
	return this.has(key) ? this.elements[key] : undefined;
}

Dict.prototype.set = function(key, val) {
	if(key === "__proto__") {
		this.hasSpecialProto = true;

		this.specialProto = val;
	} else {
		this.elements[key] = val;	
	}
	
}

Dict.prototype.remove = function(key) {
	if(key === "__proto__") {
		this.hasSpecialProto = false;
		this.sepcialProto = undefined;
	} else {
		delete this.elements[key];	
	}
	
}

var dict = new Dict({
	alice: 34,
	bob: 24,
	chris: 62
});

dict.has("alice");    // true
dict.get("bob");      // 24
dict.has("valueOf")   //false

```