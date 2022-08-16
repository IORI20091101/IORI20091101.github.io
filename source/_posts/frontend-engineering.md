---
layout:     post
title:      前端工程化思考
subtitle:   对前段工程化的一些经验总结，同时归纳出一套适合自己的最佳实践
date:       2020-03-31
author:     "toshiba"
header-img: "images/bg/batman/bat1.jpg"
comments: true

tags :
    - javascript
    - 前端工程化
categories:
    - 前端工程化
---

### 前端工程化思考

[前端集成解决方案](https://www.google.com.hk/search?safe=strict&es_sm=91&q=%E5%89%8D%E7%AB%AF%E9%9B%86%E6%88%90%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88&revid=1986939511&sa=X&ei=uqT7VKjBAaelmQXeyIGIBg&ved=0CFsQ1QIoAA&biw=1415&bih=805)

前端工程化出现的最终目的还是为了提升开发效率和运行性能。
从早期的选择类库与框架到<code>gulp/grunt</code>等构建构建工具的使用都是围绕着这个最终目的来进行的。

引用[fouber](https://github.com/fouber)的话，前端工程化大致分这几个阶段

* 第一阶段：库/框架的选型
* 第二阶段：简单的构建化
* 第三阶段：JS/CSS模块化
* 第四阶段：组件化开发和“智能”静态资源管理

选择jQuery,Vue,ReactJs等框架或者类库就属于第一阶段，使用gulp或者webpack等等不同的工具对静态资源进行处理属于第二阶段，目前可能大部分人属于第二阶段，至于JS和Css模块化目前基于Vue和React的框架都是使用webpack打包内置了这个概念。然后我们需要知道为什么要这么做以及怎样做

So, 我们需要脱离这种刀耕火种的原始状态。让我们的开发更加流畅顺滑。

> 前端集成解决方案，英文翻译为 Front-end Integrated Solution，缩写 fis，发音 [fɪs]

* 前端：指前端领域，即 web 研发中常用的浏览器客户端相关技术，比如 html、js、css 等
* 集成：将一些孤立的事物或元素通过某种方式改变原有的分散状态集中在一起，产生联系，从而构成一个有机整体的过程。
* 解决方案：针对某些已经体现出的，或者可以预期的问题，不足，缺陷，需求等等，所提出的一个解决问题的方案，同时能够确保加以有效的执行。


### 不同的项目不同的架构
前端而言，我们目前接触到的项目一般会分为SPA单页应用和MPA多页应用, 通常对于门户网站我倾向于多页应用，一是可能每个页面之前可能关系不大使用多页面将功能拆分开会容易一点，再就是技术选型比较随意一点，还有一个原因是SEO,虽然可以通过服务端渲染首屏来解决这个问题但这种解决方案跟NodeJS搭配应该会比较舒服（基于Java的服务端渲染我了解不足），如果后台换了呢，我们希望能有一套通用的解决方案而不想跟后台或者前端框架绑定的太过严重。

我们所有的方案都需要满足一些条件可以
![](https://yt-card-system.oss-cn-beijing.aliyuncs.com/blog/in-post/engine/book.jpg)

### 方案一





## 参考文档
* [前端工程化基础](https://github.com/fouber/blog/issues/10#)
* [前端工程与性能优化](https://github.com/fouber/blog/issues/3)
* [前端工程与模块化框架](https://github.com/fouber/blog/issues/4)
* [大公司里怎样开发和部署前端代码](https://github.com/fouber/blog/issues/6)
* [前端开发体系建设日记](https://github.com/fouber/blog/issues/2)

