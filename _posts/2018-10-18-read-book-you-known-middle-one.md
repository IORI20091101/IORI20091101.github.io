---
layout:     post
title:      你不知道的JavaScript中卷(一)
subtitle:   你不知道的JavaScript
date:       2018-10-18
author:     "toshiba"
header-img: "images/bg/batman/bat9.jpg"
comments: true

tags :
    - javascript
    - 读书总结
categories:
    - 读书总结
---

本书是读完 Effective JavaScript之后开的进行的阅读，整理自己需要注意的点。方便以后巩固。

## 字符串
```
var a = "foo";
b = ["f", "o", "o"];

var c = Array.prototype.join.call(a, "-");

var d = Array.prototype.map.call(a, function(v) {
	return v.toUpperCase() + "."
}).join("");


c; // "f-o-o"

d; // "F.O.O."

```

## 数字
```
var a = 5E10;

a; // 50000000000

a.toExponential(); // "5e+10"


// toFixed 用来显示小数部分的显示位数
var a = 42.59;

a.toFixed(0);  // "43"

a.toFixed(1);  // "42.6"

a.toFixed(2);  // "42.59"


42.toFixed(3); // SyntaxError 报错 42. 被视为一个整体 所以没有访问toFixed

以下访问方式都没有问题

(42).toFixed(3);  // "42.000"
0.42.toFixed(3);  // "0.420"
42..toFixed(3);   // "42.000"


// toPrecision 方法用来制定有效数位的显示位数

var a = 42.59;

a.toPrecision(1); // "4e+1"
a.toPrecision(2); // "43"
a.toPrecision(3); // "42.6"
a.toPrecision(4); // "42.59"
a.toPrecision(5); // "42.590"



```

## 浮点数

```
0.1 + 0.2 === 0.3; // false

由于浮点数的精读问题导致
0.1 + 0.2; // 0.3000000000000004;

```

那么如果判断0.1 + 0.2 和 0.3 是否相等呢， 最常见的做法是设置一个误差范围值， 通常称为"机器精度"， 对于JavaScript来说这个值通常是2^-52;
ES6开始，该值定义在<code>Number.EPSILON</code>
```

if(!Number.EPSILON) {
	Number.EPSILON = Math.pow(2, -52);
}


function numbersCloseEnoughToEqual(n1, n2) {
	return Math.abs(n1 - n2) < Number.EPSILON;
}

var a = 0.1 + 0.2;
var b = 0.3;

numbersCloseEnoughToEqual(a, b);  // true;

numbersCloseEnoughToEqual(0.0000001, 0.0000002); // false;


```


## 整数检测
要检测一个值是否是整数，可以使用ES6种的Number.isInteger方法
```
Number.isInteger(42);     // true

Number.isInteger(42.00);  // true

Number.isInteger(45.3);   // false

// ES6 之前的polyfill Number.isInteger

if(!Number.isInteger) {
	Number.isInteger = function(num) {
		return typeof num == 'number' && num % 1 == 0;
	}
}


// 最大安全数

Numbe.isSafeInteger(Number.MAX_SAFE_INTEGER); // true
Numbe.isSafeInteger(Math.pow(2, 53)); // false
Numbe.isSafeInteger(Math.pow(2, 53) - 1); // true

// ES6 之前的polyfill Number.isSafeInteger

if(!Number.isSafeInteger) {
	Number.isSafeInteger = function(num) {
		return Number.isInteger(num) && Math.abs(num) <= Number.MAX_SAFE_INTEGER;
	}
}



```
## 零值
JavaScript有一个常规的0(+0), 和一个-0
-0， 除了可以作为常量以外，也可以是某些数学运算的返回值

```

var a = 0 / -3; // -0

var b = 0 * -3; // -0

加法和减法运算不会得到负零


根据规范对于负零进行字符串化操作会返回"0"
var a = -0;

a.toString();
a + "";
String(a);
JSON.stringify(a)

以上都会返回 "0", 但是返回来将其从字符串转换为数字，得到的结果是准确的

+"-0";            // -0
Number("-0");     // -0
JSON.parse("-0"); // -0


0 === -0; // true

0 == -0;  // true

0 > -0;    // false

判断是否是 -0

function isNegZero(n) {
	n = Number(n);

	return (n === 0) && (1 / n === -Infinity);
}


isNegZero(-0);      // true
isNegZero(0 / -3);  // true
isNegZero(0);       // false

```

我们为什么需要-0呢，有些应用程序中的数据需要以级数形式来表示(比如动画帧的移动速度), 数字的符号为sign用来代表其他信息(比如移动方向),此时如果一个值为0的变量失去了它的符号位，它的方向信息就回丢失。所以保留0值的符号为可以防止这类情况发生。


## 特殊等式
如前所述，NaN和0在相等比较时表现有些特别，由于NaN和自身不相等，所以必须使用ES6中的Number.isNaN或者polyfill, 而 +0 和 -0 的比较我们也需要借助于 isNegZero这样的工具函数。

ES6引入了一个工具方法Object.is(...)来判断两个值是否绝对相等用来处理上面特殊情况
```

var a = 2 / "foo"; 
var b = -3 * 0;

Object.is(a, NaN); // true

Object.is(b, -0);  // true

Object.is(b, 0);   // false


ES6之前的polyfill

if(!Object.is) {
	Object.is = function(v1, v2) {
		//判断是否是-0
		if(v1 === 0 && v2 === 0) {
			return 1 / v1 === 1 / v2;
		}

		// 判断是否是NaN
		if(v1 !== v1) {
			return v2 !== v2;
		}

		return v1 === v2;
	}
}

```
