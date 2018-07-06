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


## 原始类型优于封装对象
除了对象之外，JavaScript有5个原始值类型： 布尔值，数字，字符串，null, undefined;
以String为例

```javascript
  var s = new String('hello');

  s + "world";  // "hello world"

  s[4]          // "o"

  typeof "hello" // "string"

  typeof s        // "Object"

  // 每个string都是一个单独的对象其总等于自身，对于非严格相等运算符，结果相同
  var s1 = new String("hello");

  var s2 = new String("hello");

  s1 === s2; // false

  s1 == s2 // false
```

这些封装的行为并不十分正确所以<code>用处不大</code> ， 其存在的理由是他们的使用方法。例如
隐式封装后会有一个奇怪的结果，你可以对原始类型的值设置属性，但是对其没有丝毫影响.
每次隐式的封装都会产生一个新的String对象 <code>"hello"</code> 每次写这个相当于声明了一个新的对象，更新第一个对象的someProperty不会对第二个对象产生影响

```javascript
"hello".toUpperCase();  // HELLO



  "hello".someProperty = 17;

  "hello".someProperty; // undefined

```


## 避免对混合类型使用==运算符

下面的表达式的值其实是true， 对于看似无关的值使用==实际是相等的。
```javascript
  "1.0e0" == { valueOf: function() { return true } }    // true

  // 理由如下
  Number("1.0e0")   // 转换为数字 1

  // 对象调用 valueOf方法返回true， 再转换为数字，得到1

  // 所以结果相等

```

我们可以使用隐式的强制转换做一些事情，但是仍然推荐使用严格模式进行比较。


例子一, 这个例子使用了隐式的类型转换，跟数字进行比较会将字符串转为数字，从而得到正确的结果
```javascript
  var today = new Date();

  if(form.month.value == (today.getMonth() + 1) &&
    form.day.value == today.getDate()) {
    // happy birthday
  }

```

例子二， 这个例子使用了显示的 Number，或者一元运算符 + 将字符串转为数字, 从而清晰的向大家表达了代码到底在做什么样的转换， 不要求读者记住这些转换
```javascript
  var today = new Date();

  if(+form.month.value == (today.getMonth() + 1) &&
   +form.day.value == today.getDate()) {
    // happy birthday
  }

```


例子三， 一个更好的例子 使用严格相等运算， 这个过程没有涉及任何转换，读者读起来更加清晰，否则读者需要记住这些强制转换来解读代码的行为
```javascript
  var today = new Date();

  if(+form.month.value === (today.getMonth() + 1) &&
    +form.day.value === today.getDate()) {
    // happy birthday
  }

```

## == 运算符强制转换规则

| 参数类型1        | 参数类型2   |  参数类型3  |
| --------   | -----:  | :----:  |
| null     | undefined |   不转换，总是返回true    |
| null或undefined       |   其他任何非null或undefined的类型   |    不转换，总是返回false    |
| 原始类型的值：string, number,boolean        |    Date对象    |  将原始类型转换为数字，将Date对象转换为原始类型（优先尝试toString方法，再尝试valueOf方法）  |
| 原始类型的值：string, number,boolean        |    非Date对象    |  将原始类型转换为数字，将非Date对象转换为原始类型（优先尝试valueOf方法，再尝试toString方法）  |
| 原始类型的值：string, number,boolean        |    原始类型的值：string, number,boolean    |  将原始类型转换为数字  |


## 由一张图片引发的思考

![](https://darknights.b0.upaiyun.com/assets/images/in-post/read-book-effective/js-convert.jpg)


参考文章
> * [JavaScript中,{}+{}等于多少?](http://www.cnblogs.com/ziyunfei/archive/2012/09/15/2685885.html)
> * [你有必要知道的 25 个 JavaScript 面试题](https://github.com/dwqs/blog/issues/17)
> * [数据类型转换](https://javascript.ruanyifeng.com/grammar/conversion.html#toc4)
> * [JS数据类型转换 - 数字转换](https://blog.csdn.net/divd567/article/details/77247773)


