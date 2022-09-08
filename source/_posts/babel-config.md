---
layout: post
title: Babel最简单配置
subtitle: Babel简单配置
date: 2020-04-24
author: "toshiba"
header-img: "images/bg/batman/bat8.jpg"
comments: true

tags:
  - Babel
  - 前端工程化
categories:
  - 前端工程化
---

本文需要重新整理

### Babel

关于 Babel 相信大家都不陌生，自从 ES2015 提供了一些新的语法让众多前端爱好者们爱不释手，但是现在的浏览器对于大部分的语法并不支持，那么如何才能在自己的项目中用上自己喜欢的语法呢？这里少不了这个工具[<code>Babel</code>](https://babeljs.io/)。

它是一个转换器，作用就是将新的语法转换成能被大部分浏览器识别的代码。换言之，只要安装了 Babel 你就可以在你的项目中随心所欲的使用最新的语法。下面我们来看一下它的配置(主要针对 babel@7)
配置文件一般为<code>.babelrc</code>或者 <code>babel.config.js</code>

首先安装<code>@babel/core</code>，这是 babel 的核心。

```bash
$ npm install @babel/core
```

然后安装 <code>@@babel/cli</code>以便能够在命令行使用 babel

```javascript
$ npm install @babel/cli
```

### Plugins

如果需要转换剪头函数我们需要在<code>.babelrc</code>中，配置 Plugin

```javascript
/* .babelrc */
{
  "plugins": ["@babel/plugin-transform-arrow-functions"]
}
```

转换前

```javascript
/* 转换前 */
const fn = () => {};

/* 转换后 */
const fn = function () {};
```

如果再想添加结构赋值的语法怎么办呢再加插件

```javascript
/* .babelrc */
{
  "plugins": [
    "@babel/plugin-transform-arrow-functions",
    "@babel/plugin-transform-destructuring"
  ]
}
```

不可能将所有新的语法都加到插件里所以<code>Babel</code>向我们提供了<code>presets</code>,它是一个插件的合集这样我们就不需要一个个的引入了。官方提供了很多 presets，比如 preset-env（处理 es6+规范语法的插件集合）、preset-stage（处理尚处在提案语法的插件集合）、preset-react（处理 react 语法的插件集合）等，这里我们主要介绍下 preset-env：

安装

```javascript
$ npm install @babel/preset-env
```

```javascript
/* .babelrc */
{
  "presets": ["@babel/preset-env"]
}
```

### preset-env

preset-env 可以让你使用 es6 的语法去写代码，并且只转换需要转换的代码。默认情况下 preset-env 什么都不需要配置，此时他转换所有 es6+的代码，然而我们可以提供一个 targets 配置项指定运行环境，以下配置会将 es6 的代码转换成 IE8 以上浏览器支持的代码。

```javascript
/* .babelrc */
{
  "presets": [
    ["@babel/preset-env", {
      "targets": "ie >= 8"
    }]
  ]
}
```

### @babel/polyfill

<code>Babel</code>只会去转换语法，但是新的 Api(Promise,Proxy,WeekSet, WeekMap) 并不能转换，需要通过 @babel/polyfill 来 plofill,因此我们需要安装<code>@babel/polyfill</code>

```javascript
$ npm install @babel/polyfill --save-dev
```

美中不足的是这个包很大我们可能并不需要加载全部，我们希望能够按需加载 <code>preset-env</code>可以通过配置<code>useBuiltIns</code>来解决这个问题

```javascript
/* .babelrc */
{
  "presets": [
    ["@babel/preset-env", {
      "modules": false,
      "useBuiltIns": "entry",
      "targets": "ie >= 8"
    }]
  ]
}
```

<code>useBuiltIns</code>得值可以是<code>entry</code>或者<code>useage</code>， <code>entry</code>会在入口处将所有 IE8 以上浏览器不支持 api 的 polyfile 引入进来，如下：

```javascript
/* test.js */
import '@babel/polyfill'

const fn = () => {}
new Promise(() => {})


/* test-compiled.js */
import "core-js/modules/es6.array.copy-within";
import "core-js/modules/es6.array.every";
import "core-js/modules/es6.array.fill";
...   //省略若干引入
import "core-js/modules/web.immediate";
import "core-js/modules/web.dom.iterable";
import "regenerator-runtime/runtime";

var fn = function fn() {};
new Promise(function () {});
```

这样通常就满足需要了，另一个配置<code>useage</code>更强大可以扫描代码只将所用到的 API 引入进来这样更加智能，只不过该功能还处于试验阶段。

### @babel/runtime

当我们进行编写一些复杂的语法时比如<code>class</code>，会有一些重复的<code>helper</code>函数

```javascript
/* test.js */
class Test {}

/* test-compiled.js */
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var Test = function Test() {
  _classCallCheck(this, Test);
};
```

如果每个文件都要重复定义<code>\_classCallCheck</code>会有重复代码，这时候可以使用<code>@babel/runtime</code>,它里面有各种各样的辅助函数。但是引入时如果全部引入又是一种浪费， 这时又需要<code>@babel/plugin-transform-runtime</code>这个插件了，他会帮我们自动引入 helper 函数

```javascript
npm install @babel/runtime @babel/plugin-transform-runtime

```

<code>@babel/plugin-transform-runtime</code>还提供了一个 corejs 的配置，作用是将 polyfill 代码中使用的变量隔离到局部作用域中，防止在 polyfill 的时候污染全局变量。

安装插件

```javascript
npm install @babel/runtime-corejs2 --save-dev
```

```javascript
/* .babelrc */
{
  "presets": [
    ["@babel/preset-env", {
      "modules": false,
      "useBuiltIns": "usage",
      "targets": "ie >= 8"
    }]
  ],
  "plugins": [
    ["@babel/plugin-transform-runtime", {
      "corejs": 2
    }]
  ]
}

```

> 注意：这里一定要配置 corejs，同时安装@babel/runtime-corejs2，不配置的情况下@babel/plugin-transform-runtime 默认是不引入这些 polyfill 的 helper 的。corejs 的值现阶段一般指定为 2，可以近似理解为是@babel/runtime 的版本

### 配置文件

到目前为止配置文件已经够用了配置如下：

```javascript
/* .babelrc */

{
  "presets": [
    ["@babel/preset-env", {
      "useBuiltIns": "entry", // useage
      "modules": false,
      "targets": "ie >= 8"
    }]
  ],
  "plugins": [
    ["@babel/plugin-transform-runtime", {
      "corejs": 2
    }]
  ]
}

```

## 参考文档

- [史上最清晰易懂的 babel 配置解析](https://segmentfault.com/a/1190000018721165)
- [Babel 7](https://blog.windstone.cc/es6/babel/babel-v7.html#preset)
- [一口(很长的)气了解 Babel](https://mp.weixin.qq.com/s/qetiJo47IyssYWAr455xHQ)
- [babel-polyfill 的相关知识](https://segmentfault.com/a/1190000019577505)
- [不容错过的 Babel7 知识](https://juejin.im/post/5ddff3abe51d4502d56bd143)
- [傻傻分不清之 —— babel 全家桶](https://vince.xin/2019/06/29/%E5%82%BB%E5%82%BB%E5%88%86%E4%B8%8D%E6%B8%85%E4%B9%8B-%E2%80%94%E2%80%94-babel-%E5%85%A8%E5%AE%B6%E6%A1%B6/#babel-%E6%89%A7%E8%A1%8C%E8%BF%87%E7%A8%8B)
- [import、require、export、module.exports 混合使用详解](https://github.com/ShowJoy-com/showjoy-blog/issues/39)
- [在 2016 年学 JavaScript 是一种什么样的体验？](https://zhuanlan.zhihu.com/p/22782487)
- [我 TMD 到底要怎样才能在生产环境中用上 ES6 模块化？](https://printempw.github.io/how-could-i-use-es6-modules-in-production/)
