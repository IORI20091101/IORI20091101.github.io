---
layout: post
title: 使用Eslint&Prettier来统一代码风格
subtitle: Eslint配合Prettier格式化代码
date: 2020-04-23
author: "toshiba"
header-img: "images/bg/batman/bat1.jpg"
comments: true

tags:
  - eslint
  - prettier
  - 前端工程化
categories:
  - 前端工程化
---

### 代码风格

当我们进行开发的时候，每个人写的代码风格不统一是很让人不爽的一件事情，那么如何来解决这个问题呢，首先我们需要选定一种规范；这里常用的规范有这两种

- [Airbnb](https://github.com/airbnb)
- [Standardjs](https://standardjs.com/)

![](https://cdn.darknights.cn/assets/images/in-post/eslint/airbnb.png)
![](https://cdn.darknights.cn/assets/images/in-post/eslint/standard.png)

这个两种规范都可以，但是这里推荐使用第一种。在选择了一种规范后如何来遵守呢。这里就要使用我们的神器<code>Eslint</code>,Eslint 是一个 JS Linter 工具

> 它的灵感来源于 PHP Linter，将源代码解析成 AST，然后检测 AST 来判断代码是否符合规则。ESLint 使用 esprima 将源代码解析吃成 AST，然后你就可以使用任意规则来检测 AST 是否符合预期，这也是 ESLint 高可扩展性的原因。

不过我们通常不会单独来使用，一般情况都是在编辑器上安装插件，这样开发的时候才能直接看到不符合规范的地方别将其解决。另外，编辑器仍然推荐<code>vscode</code>或者<code>webstorm</code>。

Lint 工具

> 代码检查是一种静态的分析，常用于寻找有问题的模式或者代码，并且不依赖于具体的编码风格。对大多数编程语言来说都会有代码检查，一般来说编译程序会内置检查工具。

> JavaScript 是一个动态的弱类型语言，在开发中比较容易出错。因为没有编译程序，为了寻找 JavaScript 代码错误通常需要在执行过程中不断调试。像 ESLint 这样的可以让程序员在编码的过程中发现问题而不是在执行的过程中。

到这里我们已经有了规范标准跟代码的校验工具，我们还需要<code>Prettier</code>,有了它我们就可以随心所欲的写代码，启动一个服务来来监听文件变化这样代码会自动格式化。同字面意思 Prettier 让我们的代码更漂亮一些。

## 参考文档

- [深入理解 ESLint](https://mp.weixin.qq.com/s/X2gShxrCw0ukZigjE_45kA)
- [ESLint 工作原理探讨](https://mp.weixin.qq.com/s?__biz=MjM5MTA1MjAxMQ==&mid=2651230875&idx=1&sn=092211db96adfc85a26b457f7e9421a0&chksm=bd494b1f8a3ec20902ad0df7d6a3735b536fe585086abc9035fe24d69549bb4c81cf88658515&scene=21#wechat_redirect)
- [使用 ESLint+Prettier 来统一前端代码风格](https://segmentfault.com/a/1190000015315545)
