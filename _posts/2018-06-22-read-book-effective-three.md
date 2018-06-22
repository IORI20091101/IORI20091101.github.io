---
layout:     post
title:      Effective JavaScript (三)
subtitle:   当心隐式的强制转换
date:       2018-06-22
author:     "toshiba"
header-img: "images/bg/batman/bat8.jpg"
comments: true

tags :
    - javascript
    - 读书总结
categories:
    - 读书总结
---


## 当心隐式的强制转换

JavaScript对类型的错误出奇宽容,算数运算符 - 、*、%、/都会把参数转为数字。然而 + 会根据参数来决定
位运算符不仅会将操作数转换为数字，而且还会将操作数转换为32位整数(表示数字的子集)。这些运算符包括算术运算符(~ 、& 、^ 、| 、<<、>>、>>>)

```javascript
  3 + true; // 4
  2 + 3;    // 5
  "2" + 3;  // 23
  "17" * 3; // 51
  "8" | "1" // 9
```

## 注意NaN
NaN不等于其自身，所以测试一个值是否是NaN是行不通的 ，标准库里面的isNaN也是不可靠的，因为它也带有隐式的强制转换，尝试将参数转为数字
```javascript
  var x = NaN;
  x === NaN;  // false

  isNaN(NaN); // true

  // 由于隐式的类型转换所以以下 都会返回true
  isNaN("foo");
  isNaN(undefined);
  isNaN({});
  isNaN({ valueOf: "foo" });

  // 由于NaN是不等于其自身的，所以真正正确判断一个参数是否是NaN的方法是判断是否等于自身
  function isReallyNaN(x) {
    return x !== x;
  }

```

## 对象的隐式转换
```javascript
  // 对象转换成字符串
  "the Math object: " + Math; // "the Math object: [object Math]"
  "the JSON object: " + JSON; // "the JSON object: [object JSON]"

  // 对象转换成数字， 对象可以通过valueOf 方法转为数字,你可以控制对象的类型转换

  // 这里讲调用对象的toString 进行拼接
  "J" + { toString: function() { return "S"; } };  // "JS"

  // 通过valueOf将对象转为数字
  2 * { valueOf: function() { return 3; } };       // 6

```

如果一个对象同时有toString 和valueOf方法 ，运算符 + 应该调用哪个方法呢，JavaScript通过盲目的选择valueOf方法而不是toString方法来解决这种含糊的情况，这就意味着如果有人打算对一个对象执行字符串连接操作，那么产生的行为会出乎意料
```javascript
  var obj = {
    toString: function() {
      return "[object MyObject]";
    },
    valueOf: function() {
      return 17;
    }
  }

  "object: " + obj; // "object: 17";
```
> 这里例子说明，valueOf方法才真正是为那些代表数值的对象(如 Number对象)而设计的。对于这些对象toString 和valueOf方法应返回一致的结果。一般情况下，字符串的强制转换远比数字转换更常见、更有用。 最好避免使用valueOf方法，除非对象的确是一个数字的抽象，并且obj.toString()能产生一个obj.valueOf() 的字符串表示。


## 真值运算
if、||、&&等运算符逻辑上需要布尔值作为操作参数，但实际上可以接受任何值。JavaScript会按照简单的隐式强制转换规则将值解释为布尔值。

false, 0, -0,"", NaN,null, undefined 外的所有值会转换为false， 其他所有值都为真值。

因为数字0和字符串""会转换为false,因此通过隐式转换来判断一个值是否已经定义是不准确的需要通过判断，应该通过以下方式来进行判断

```javascript
  if(typeof x === 'undefined') {}
  if(x === undefined) {}
```


## 原始类型由于封装对象
除了对象之外，JavaScript有5个原始值类型： 布尔值，数字，字符串，null, undefined


