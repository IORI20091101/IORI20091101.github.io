---
layout:     post
title:      Effective JavaScript
subtitle:   编写高质量JavaScript代码的68个有效的方法
date:       2018-06-19
author:     "toshiba"
header-img: "images/bg/batman/bat8.jpg"
comments: true

tags :
    - javascript
categories:
    - 读书总结
---


## 第一条，了解你使用的JavaScript版本

由于不同的浏览器，对于JS的实现不同，我们必须精心编写代码保证他们在所有浏览器下工作如一。否则你可能面临这样的困境--应用程序在你自己的计算机上运行良好，但是部署到不同的环境时却无法运行。
例如，const关键字在支持非标准特性的JavaScript引擎上测试时运行良好，但是当将它部署到不识别const关键字的web浏览器上就会出现语法错误。
为此，ES5引入了一种版本控制的考量<code>严格模式</code>。此特性允许你选择在受限制的JavaScript版本中禁止使用一些JavaScript语言中问题较多或者易于出错的特性。
由于其语法设计向后兼容，因此即使在那些没有实现严格模式检查的环境中仍然可以执行严格代码（strict code）
```javascript
"use strict";
```