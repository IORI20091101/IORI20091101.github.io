---
layout:     post
title:      Effective JavaScript (六)
subtitle:   使用函数
date:       2018-09-14
author:     "toshiba"
header-img: "images/bg/batman/bat8.jpg"
comments: true

tags :
    - javascript
    - 读书总结
categories:
    - 读书总结
---


## 函数调用
理解函数调用， 方法调用，构造函数调用之间的不同。

```javascript

最简单的函数调用
function hello(username) {
	return "hello, " + username;
}

hello("Keyser soze");

方法调用
var obj = {
	hello: function() {
		return "hello, " + this.username;
	},
	username: "Hans, Gruber";
}

obj.hello(); // hello, Hans, Gruber


// 在函数调用过程中由调用表达式自身来确定this变量的绑定。 
  
构造函数调用

function User(name, pass) {
	this.name = name;
	this.pass = pass;
}  

var u = new User("sketcon", "123456");

与函数调用和方法调用不同的是，构造函数调用将一个全新的对象作为this变量的值，并隐式的返回这个对象作为调用结果。
构造函数的主要职责是初始化这个新对象。


```

## 熟练掌握高阶函数
高阶函数无非就是将函数作为参数或返回值的函数。将函数作为参数通常称为回调函数。


## 使用call方法自定义接收者来调用方法
通常情况下，函数或方法的接接收者（即绑定到特殊关键字this的值）是由调用者的语法决定的。但是有时我需要自定义一个接收者，幸运的是函数有一个内置的方法call来自定义接收者。可以通过函数对象的call方法来调用自身。
```
f.call(obj, arg1, arg2, arg3);

f(arg1, arg2, arg3);
```
不同的是第一个参数提供了一个显示的接收者对象。

## 使用apply方法通过不同数量的参数调用函数

这里理解有误区，接受一个数组的参数，但是方法调用时将参数依次传入方法

```
average 函数是一个称为可变参数或可变元的函数（函数的元市值其期望的参数个数）

average(1, 2, 3);

average(1);

average(1, 2, 3, 7, 9);

可变参数的版本更加简洁，优雅。


averageOfArray([1, 2, 3]);

averageOfArray([1]);

averageOfArray([1, 2, 3, 7, 9]);


// 本来average 只接受可变参数，假设我有这样一个数字数组， average函数中没有this引用，所以简单的传null就可以。
var scores = getAllScores();
average.call(null, scores)  
传入一个数组，调用时这样 average(scores[0], scores[1], scores[2])





使用apply方法指定一个可计算的参数数组来调用可变参数的函数。
使用apply方法的第一个参数给可变参数的方法提供一个接收者。

```



## 使用arguments创建可变参数的函数

```
参数可变函数的实现
function average() {
	for(var i = 0, sum = 0, n = argumants.length; i < n; i++) {
		sum += arguments[i];
	}

	return sum / n;
}
```
可变参数的函数提供了灵活的接口，不同的调用者可以使用不同数量的参数来调用它们，但是它们自身也失去了一点便利。如果使用者要使用数组的参数则只能使用 apply。 
apply方法会降低可读性而且经常导致性能损失

好的经验是

> 如果提供了一个便利的可变参数的函数，最好也提供一个需要显示指定数组的固定元数的版本。这样可以编写一个轻量级的封装，并委托固定元数的版本来实现可变参数的函数

比较拗口，代码比较直观如下：

```

固定元数的版本实现 用来作为数组参数的调用
function averageOfArray(a) {
	for(var i = 0, sum = 0, n = a.length; i < n; i++) {
		sum += a[i];
	}

	return sum / n;
}

averageOfArray([1, 2, 3]);


参数可变函数的实现可以通过调用 固定元数版本来实现
function average() {
	// averageOfArray本来就支持数组 所以无论average传入数组还是啥
	return averageOfArray(arguments);
}





```

 