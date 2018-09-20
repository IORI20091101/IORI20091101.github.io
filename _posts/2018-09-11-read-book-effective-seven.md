---
layout:     post
title:      Effective JavaScript (七)
subtitle:   对象和原型
date:       2018-09-19
author:     "toshiba"
header-img: "images/bg/batman/bat8.jpg"
comments: true

tags :
    - javascript
    - 读书总结
categories:
    - 读书总结
---


## 理解prototype,getPrototypeOf 和__proto__之间的不同

```
function User(name, passwordHash) {
	this.name = name;
	this.passwordHash = passwordHash;
}

User.prototype.toString = function() {
	return "[User " + this.name + " ]";
};

User.prototype.checkPassword = function(password) {
	return hash(password) === this.passwordHash;
};

var u = new User("sfalken", "objjowewe");

// ES5 提供了Obejct.getPrototypeOf() 来获得对象的原型
Object.getPrototypeOf(u) === User.prototype // true

非标准的环境提供一个特殊的__proto__属性，在这些环境下可以这样检测
u.__proto__ === User.prototype // true


```

## 使用Object.getPrototypeOf的函数而不要使用__proto__属性
并不是所有的JavaScript环境都支持通过__proto__属性来获取对象的原型，因此该属性并不是完全兼容的。由于__proto__会污染所有的对象，因此它会导致大量的Bug。

但是无论在什么情况下 <code>Object.getPrototypeOf</code>函数都是有效的。

对于没有提供ES5 API的JavaScript环境，我们可以利用__proto__属性来实现Object.getPrototypeOf的函数
```
if(typeof Object.getPrototypeOf === 'undefined') {
	Object.getPrototypeOf = function(obj) {
		var t = typeof obj;
		if(!obj || (t !== 'object' && t !== 'function')) {
			throw new TypeError("not an object");
		}

		return obj.__proto__;
	};
}
```

## 始终不要修改__ptoto__属性
原因：
* 避免修改__proto__属性的最明显原因是可移植问题。毕竟不是所有平台都支持
* 避免修改__proto__属性的另一个原因是性能问题
* 避免修改__proto__属性的最大原因是为了保持行为的可预测性。

可以使用ES5中的Object.create函数创建一个具有自定义原型链的新对象。对于不支持的ES5环境下下面有一种不依赖于__proto__可移植的实现。


## 使用构造函数与new操作符无关
```
function User(name, passwordHash) {
	this.name = name;
	this.passwordHash = passwordHash;
}
如果使用new操作符调用构造函数会是实例化一个对象，不使用new函数的接收者将是全局对象。


var u = User("hello", "pass");

u; // undefined
this.name // "hello"
this.passwordHash // "pass"

如果User定为ES5的严格代码，那么它的接收者默认为undefined

function User(name, passwordHash) {
	'use strict';
	this.name = name;
	this.passwordHash = passwordHash;
}
var u = User("hello", "pass");

// error this is undefined

```

所以无论是否用new都可以使用构造函数，为了保证代码的健壮性最好是提供一个不管怎样都会工作的代码。
```
function User(name, pass) {
	if(!(this instanceof User)) {
		return new User(name, pass);
	}

	this.name = name;
	this.pass = pass;
}

var x = User("hello", "pas1");

var y = new User("hel", "pas2");

x instanceof User // true

y instanceof User // true



```
这种方式不管怎样调用构造函数都会返回一个继承了User.prototype的实例对象。	

