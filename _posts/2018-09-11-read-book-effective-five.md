---
layout:     post
title:      Effective JavaScript (五)
subtitle:   理解变量提升
date:       2018-09-11
author:     "toshiba"
header-img: "images/bg/batman/bat8.jpg"
comments: true

tags :
    - javascript
    - 读书总结
categories:
    - 读书总结
---


## 理解变量提升

try...catch 语句将补货的异常绑定到一个变量，该变量的作用域只是catch语句块。
```javascript

  function test() {
    var x = "var", result = [];
    result.push(x);

    try {
      throw "exception";
    } catch(x) {
      x = "catch";
    }

    result.push(x);

    return result;
  }

  test(); // ["var", "var"]
  

```

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


// 为了避免这种问题需要用一个立即调用的函数创建一个局部作用域

(function() {
  var j = i;
  result[j] = function() { return a[j]; }
})();

// or

(function(j) {
  result[j] = function() { return a[j]; }
})(i);


```

## 当心命名函数表达式笨拙的作用域

```
function double(x) { return x * 2; }

这里既可以是一个函数声明，也可以是一个命名函数表达式

var f = function(x) { return x * 2; }

var f = function double(x) { return x * 2 }

根据ECMAScript规范， 此语句将该函数绑定到变量f，而不是变量double。

匿名和命名函数表但是的官方区别在于后者会绑定到其函数名相同的变量上，该变量将作为该函数内的一个局部变量。（只能在函数内部调用）可以用来写递归函数表达式

```

> 命名函数表达式是作用域和兼容性问题臭名昭著的来源，这归结于ECMAScript规范的历史中很不幸的错误以及流行的JavaScript引擎中的Bug. 规范的错误在ES3中就已经存在，JavaScript引擎被要求将命名函数表达式的作用域表示为一个对象，这有点像with，该作用域对象也继承了Object.prototype的属性，这意味着仅仅是给函数表达式命名也会将Object.prototype中的所有属性引入到作用域中。

```
var constructor = function() { return null; }

var f = function f() {
  return constructor();
}

f();  // 结果 {} (in ES3 环境中)。这里错误的使用了Object.prototype.constructor (Object的构造函数)
```

幸运的ES5修正了这个问题，但是有些JavaScript仍然使用过时的对象作用域，还有些更不符合标准的对于匿名函数的表达式也使用对象的作用域。

```
var constructor = function() { return null; }

var f = function () {
  return constructor();
}

f();  // 结果 {} (在更不标准的环境中)。本来这里应该正确解析不使用对象的作用域但是不标准的环境导致匿名函数表达式仍然使用对象作用域

```

> 最好的做法就是避免任何时候在Object.prototype中添加属性，以及避免使用与标准Object.prototype属性同名的局部变量

在流行的JavaScript的引擎中的另一个缺陷是函数命名表达式的声明进行提升。

```
var f = g() { returen 17; }
g(); // 17 (在非标准的环境中，标准环境会报错 g is not defined)

我们应该怎样做
var f = function g() { return 17; }
var g = null;

```

> 由于命名函数表达式会导致很多问题，所以不值得使用