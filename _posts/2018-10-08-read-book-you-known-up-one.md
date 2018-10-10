---
layout:     post
title:      你不知道的JavaScript(一)
subtitle:   你不知道的JavaScript上卷-基础篇
date:       2018-10-08
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

## 作用域
JavaScript没有块级作用域的相关功能。但是使用<code>with</code>、<code>try...catch</code>可以创建块级作用域

## 变量提升

提升时函数优先
```
foo();

var foo;

foo = function() {
  console.log(2);
}


function foo() {
  console.log(1);
}

```
输入结果是1，函数声明优先，同名的var变量会被忽略，但是后面的重新赋值仍然有效，第二次执行foo得到的结果就是2了。


## 作用域闭包

```

function foo() {
  var a = 2;

  function bar() {
    console.log(a);
  }

  bar();
}

foo();

```

这个是闭包吗？ 从技术上来讲，也许是。但是确切的说不是。准确的说bar()对a的引用方法是词法作用域的查找规则，这些规则只是闭包的一部分。但确实是非常重要的一部分。


来看一个清晰的闭包例子
```
function foo() {
  var a = 2;

  function bar() {
    console.log(a);
  }

  return bar;
}


var baz = foo();

baz(); // 2  这是一个闭包的效果
```
函数 bar() 的词法作用域能够访问foo() 的内部作用域。然后我们将bar()函数本身当作一个值类型进行传递， 在这个例子中，我们将bar所引用的函数对象本身当作返回值。





## 动态作用域
JavaScript只有词法作用域，并没有动态作用域

```
function foo() {
  console.log(a);
}

function bar() {
  var a = 3;
  foo();
}


var a = 2;

bar();  // 输出结果为2

```
词法作用域，让foo在查找a时，只在全局作用域找到 <code>var a = 2</code>, 所以这里显示2。 这里可能会疑惑为什么没有找到bar方法内部， 因为这里只是执行foo方法，如果像下面这样写，才会读到a = 3

```
function bar() {
  var a = 3;

  function foo() {
    console.log(a);
  }

  foo();
}


var a = 2;

bar();


```

## 块级作用域的替代方案

ES5之前块级作用域的解决方案catch或with

```
try{ throw 2 } catch(a){
  console.log(a);  // 2
}

console.log(a);

```

let作用域或着let声明还可以这样用
```
let(a = 2) {
  console.log(a); // 2
}

console.log(a); // ReferenceError

```
与隐式的劫持一个已经存在的作用域不同， let声明会显示的创建一个作用域并与其进行绑定。显示作用域不仅更突出，在代码重构时也表现更加健壮。
但是ES6语法不包含这个我们可以选择，合法的ES6语法，
```
{
  let a = 2;
  console.log(a);
}

```
还可以选择使用bable转换器 let-er这个转换器然后开启 这个设置项 。这样就可以直接使用了。


## 关于this

为什么要使用this？ this提供了一种更优雅的方式来隐式的传递对象引用，因此可以将API设计的更加简洁并且易于复用。

```

function foo(num) {
  console.log("foo:" + num);
  this.count++;
}

foo.count = 0;

var i;

for(i = 0; i < 10; i++) {
  if(i > 5) {
    foo(i);
  }
}

//foo: 6
//foo: 7
//foo: 8
//foo: 9

console.log(foo.count); // 0

```

这里的this并没有指向自身， foo被当作方法调用时，this代表的是函数的接收者。 这里非严格模式下指向的是全局对象，然而全局对象进行++运算结果是NaN，foo.count作为foo这个函数对象的一个属性从来没有改变过。

我们可以这样来改进x
```

function foo(num) {
  console.log("foo:" + num);
  data.count++;
}

var data = {
  count: 0;
}
var i;

for(i = 0; i < 10; i++) {
  if(i > 5) {
    foo(i);
  }
}

//foo: 6
//foo: 7
//foo: 8
//foo: 9


console.log(foo.count); // 4

```

这样貌似解决了问题，但是忽略了真正的问题，无法理解this的含义和工作原理而是返回了舒适区。

另一种结局方案是使用foo标识符来替代this引用函数对象，但是同样回避了this的问题，并且完全依赖于变量foo的词法作用域

```

function foo(num) {
  console.log("foo:" + num);
  foo.count++;
}

foo.count = 0;

var i;

for(i = 0; i < 10; i++) {
  if(i > 5) {
    foo(i);
  }
}

//foo: 6
//foo: 7
//foo: 8
//foo: 9

console.log(foo.count); // 4

```

我们可以强制使用this执行foo函数对象
```
function foo(num) {
  console.log("foo:" + num);
  data.count++;
}

var data = {
  count: 0;
}
var i;

for(i = 0; i < 10; i++) {
  if(i > 5) {
    foo.call(foo,i);
  }
}

//foo: 6
//foo: 7
//foo: 8
//foo: 9


console.log(foo.count); // 4

```

## this的绑定规则

### 默认绑定
这是最常用的函数调用类型，独立函数调用。 这种情况this默认指向了全局对象
```
function foo() {
  console.log(this.a);
}

var a = 2;

foo(); // 2

```

### 隐式绑定

```
function foo() {
  console.log(this.a);
}

var obj = {
  a: 2,
  foo: foo
}

obj.foo(); // 2

```
这种方式加上了对于obj对象的引用，拥有了上下文，当函数引用有上下文对象时，隐式绑定规则会把函数调用中的this绑定到这个上细纹对象。

对象属性的引用链只有上一层或者说最后一层在调用位置中起作用。举例来说：
```
function foo() {
  console.log(this.a);
}

var obj2 = {
  a: 42,
  foo: foo
}

var obj1 = {
  a: 2,
  obj2: obj2
}


obj1.obj2.foo(); // 42  最后一个obj2起作用


```

一个最常见的this对象绑定问题就是隐式绑定的函数会丢失绑定对象，也就是说它会应用默认绑定，从而吧this绑定到全局对象或着<code>undefined</code>这取决于是否是严格模式
```
function foo() {
  console.log(this.a);
}

var obj = {
  a: 2,
  foo: foo
}


var bar = obj.foo;

var a = "oops, global";

bar(); // oops, global
```
还有一种，参数传递也是一种隐式赋值，因此我们穿日函数时也会被隐式赋值

```
function foo() {
  console.log(this.a);
}

function doFoo(fn) {
  fn();
}

var obj = {
  a: 2,
  foo: foo
}


var bar = obj.foo;

var a = "oops, global";

doFoo(obj.foo); // oops, global

```
同理如果向setTimeout中传递函数对象，同样会丢失this。



### 显示绑定
显示绑定通常使用 <code>call</code>、<code>apply</code>、<code>bind</code>，这些方式来实现。

```

function foo() {
  console.log(this.a);
}

var obj = {
  a: 2
}

foo.call(obj);

```
foo.call(...)， 我们可以调用foo时强制把它的this绑定到obj上。

可惜的是显示绑定仍然无法解决我们之前提出的丢失绑定的问题。但是显示绑定的一个变种可以帮我们解决。


```

function foo() {
  console.log(this.a);
}

var obj = {
  a: 2
}

var bar = function() {
  foo.call(obj);
}

bar(); // 2

setTimeout(bar, 100); // 2

bar.call(window); // 2

```

硬绑定的典型应用场景就是创建一个包裹函数，负责接收参数并返回值
```

function foo(something) {
  console.log(this.a, something);
}

var obj = {
  a: 2
}

var bar = function() {
  return foo.apply(obj, arguments);
}


var b = bar(3); // 2, 3

console.log(b);  // 5

```

另一种使用方法是创建一个可以重复使用的辅助函数

```

function foo(something) {
  console.log(this.a);
  return this.a + something;
}

function bind(fn, obj) {
  return function() {
    fn.apply(obj, arguments);
  }
}


var obj = {
  a: 2
}

var bar = bind(foo, obj);

var b = bar(3); // 2 3

console.log(b); // 5


```

由于硬绑定是一种非常常用的模式，所以ES5提供了内置的方法<code>Function.ptototype.bind</code>，它的用法如下
```
function foo(something) {
  console.log(this.a);
  return this.a + something;
}


var obj = {
  a: 2
}

var bar = foo.bind(obj);

var b = bar(3); // 2 3

console.log(b); // 5


```


### new绑定
虽然JavaScript中也有new操作符，使用方法看起来跟那些面向类的语言意义，绝大多数开发者都认为JavaScript中的new的机制也跟那些语言一样，然而JavaScript中的new机制实际上跟面向类的语言完全不同。
* 构造函数 首先JavaScript中的构造函数只是使用new操作符调用的函数，它们并不会属于某个类，也不会实例化一个类，实际上它们甚至不能说是一种特殊的函数类型，它们只是被new操作符调用的普通函数而已。 函数被使用new操作符调用成为构造函数调用，实际上不存在所谓的构造函数，只有对于函数的构造调用。

```
function foo() {
  this.a = a;
}

var bar = new foo(2);

console.log(bar.a); // 2

```
我们创造了一个新的对象，并把它绑定到foo调用中的this上。


## 优先级

显示绑定比隐式绑定优先级要高， new绑定比隐式绑定优先级要高， 但是new绑定会得到一个新的对象。

## 判断this

* 函数是否在new中调用， 如果是的话this绑定的是新创建的对象。

* 函数是否通过<code>call</code>，<code>apply</code>,或者硬绑定调用，如果是的话this是指定的对象

* 函数是否在某个上下文对象中（隐式绑定）如果是的话，this绑定的是上下文对象。

* 如果都不是的话，使用默认绑定。如果在严格模式下绑定到undefined， 否则绑定到全局对象。

## 被忽略的this

如果你把null或undefined作为this绑定对象传入call，apply或者bind，这些值会在调用时被忽略，实际应用的是默认绑定规则
```

function foo() {
  console.log(this.a);
}

var a = 2;

foo.call(null); // 2

```
使用null忽略this可能产生一些副作用，如果某个函数确实使用了this（比如第三方库的一个函数）， 那默认绑定规则会把this绑定到全局对象。这将导致不可预计的后果。
所以我们使用一个更安全的空对象
在JavaScript中创建一个空对象最简单的方法是Obejct.create(null), 它和{}很像，但是不会创建Object.ptototype，所以它比{}更空
```
option + o
var ø = Object.create(null);


```

## 间接引用

还有一个需要注意的情况你可能创建一个函数的间接引用，调用这个函数会应用默认绑定规则

间接引用最容易在赋值时发生
```

function foo() {
  console.log(this.a);
}

var a = 2;

var o = {
  a: 3,
  foo: foo
}

var p = {
  a: 4
}

o.foo(); // 3

(p.foo = o.foo)(); // 2


```
赋值表达式p.foo = o.foo的返回值是目标函数的引用，因此调用位置是foo() 而不是p.foo()或者o.foo();


## this词法

<code>self = this</code>和箭头函数看起来都可以取代bind但本质上想取代的是this机制。如果你经常编写this风格的代码，但是绝大部份都会是用self = this,或者箭头函数，那么你或许应该
* 只使用此法作用域并且完全抛弃错误this风格代码;
* 完全采用this风格，在必要时使用bind，避免使用self = this 和 箭头函数。


