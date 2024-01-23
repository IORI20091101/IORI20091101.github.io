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

![](https://yt-card-system.oss-cn-beijing.aliyuncs.com/blog/in_post/eslint/airbnb.png)
![](https://yt-card-system.oss-cn-beijing.aliyuncs.com/blog/in_post/eslint/standard.png)

这个两种规范都可以，但是这里推荐使用第一种。在选择了一种规范后如何来遵守呢。这里就要使用我们的神器<code>Eslint</code>,Eslint 是一个 JS Linter 工具

> 它的灵感来源于 PHP Linter，将源代码解析成 AST，然后检测 AST 来判断代码是否符合规则。ESLint 使用 esprima 将源代码解析吃成 AST，然后你就可以使用任意规则来检测 AST 是否符合预期，这也是 ESLint 高可扩展性的原因。

Lint 工具

> 代码检查是一种静态的分析，常用于寻找有问题的模式或者代码，并且不依赖于具体的编码风格。对大多数编程语言来说都会有代码检查，一般来说编译程序会内置检查工具。

> JavaScript 是一个动态的弱类型语言，在开发中比较容易出错。因为没有编译程序，为了寻找 JavaScript 代码错误通常需要在执行过程中不断调试。像 ESLint 这样的可以让程序员在编码的过程中发现问题而不是在执行的过程中。

不过我们通常不会单独来使用，一般情况都是在编辑器上安装插件，这样开发的时候才能直接看到不符合规范的地方别将其解决。另外，编辑器仍然推荐<code>vscode</code>或者<code>webstorm</code>。

到这里我们已经有了规范标准跟代码的校验工具，我们还需要<code>Prettier</code>,有了它我们就可以随心所欲的写代码，同字面意思 Prettier 让我们的代码更漂亮一些。可以选择启动一个 nodejs 服务来监听文件变化也可以使用编辑器自带的 watch 功能，通常我们希望格式化的过程是自动的因此我们选择设置编辑器自动保存，自动保存的时候执行代码检查跟格式化的操作,这样也不需要单独起服务。

### vsCode

以<code>vscode</code>为例，首先安装这两款插件<code>Prettier</code>，<code>Eslint</code>。
然后全局安装 <code>Prettier</code>跟<code>Eslint</code>

```
yarn add prettier --dev --exact
# or globally
yarn global add prettier


$ npm install -g eslint

```

然后开始配置 Prettier,这个一般按照官方给出的[基本配置](https://prettier.io/docs/en/options.html),一般需要调节就这几项或者使用默认配置即可，另外还可以通过 override 来对不同类型的文件执行一些规则。prettier 本身的可配置项确实比较少，他本身就是为了让用户少思考这些风格，把代码风格全部交给他.

废话说完直接开干

```
$ mkdir awesome-project
$ cd awesome-project
$ npm init -y
$ eslint --init

```

### 配置 Prettier

一共有三种方式支持对 Prettier 进行配置：

- 根目录创建.prettierrc 文件，能够写入 YML、JSON 的配置格式，并且支持.yaml/.yml/.json/.js 后缀；
- 根目录创建.prettier.config.js 文件，并对外 export 一个对象；
- 在 package.json 中新建 prettier 属性。

我们选择<code>.prettierrc.js</code>来配置,一下配置可以根据自己的喜好来配置或者使用 Prettier 的默认配置也没毛病

```javascript
module.exports = {
  printWidth: 100,
  // tab缩进大小,默认为2
  tabWidth: 2,
  // 使用tab缩进，默认false
  useTabs: true,
  // 使用分号, 默认true
  semi: true,
  // 使用单引号, 默认false(在jsx中配置无效, 默认都是双引号)
  singleQuote: true,
  // use double quotes instead of single quotes in jsx
  jsxSingleQuote: false,
  // 行尾逗号,默认none,可选 none|es5|all
  // es5 包括es5中的数组、对象
  // all 包括函数对象等所有可选
  trailingComma: "none",
  // JSX标签闭合位置 默认false
  // false: <div
  //          className=""
  //          style={{}}
  //       >
  // true: <div
  //          className=""
  //          style={{}} >
  jsxBracketSameLine: true,
  bracketSpacing: true, //对象大括号直接是否有空格，默认为true，效果：{ foo: bar }
  // 箭头函数参数括号 默认avoid 可选 avoid| always
  // avoid 能省略括号的时候就省略 例如x => x
  // always 总是有括号
  arrowParens: "avoid",
  // decide whether to break the html according to the display style
  htmlWhitespaceSensitivity: "css",
  //parser: "babylon" //代码的解析引擎，默认为babylon，与babel相同。
};
```

### 配置 Eslint

接下来开始配置 Eslint

```javascript
module.export = {
  root: true,
  parserOptions: {
    parser: "babel-eslint",
  },
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true,
  },
  extends: ["airbnb", "plugin:vue/essential", "plugin:prettier/recommended"],
  rules: {
    "prettier/prettier": "error",
    // allow async-await
    "generator-star-spacing": "off",
    // allow debugger during development
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "jsx-a11y/href-no-hash": ["off"],
    "react/jsx-filename-extension": [
      "warn",
      {
        extensions: [".js", ".jsx"],
      },
    ],
    "max-len": [
      "warn",
      {
        tabWidth: 2,
        ignoreComments: false,
        ignoreTrailingComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      },
    ],
  },
};
```

同时这里也推荐 AlloyTeam 的 [eslint-config-alloy](https://github.com/AlloyTeam/eslint-config-alloy)。

## 参考文档

- [深入理解 ESLint](https://mp.weixin.qq.com/s/X2gShxrCw0ukZigjE_45kA)
- [ESLint 工作原理探讨](https://mp.weixin.qq.com/s?__biz=MjM5MTA1MjAxMQ==&mid=2651230875&idx=1&sn=092211db96adfc85a26b457f7e9421a0&chksm=bd494b1f8a3ec20902ad0df7d6a3735b536fe585086abc9035fe24d69549bb4c81cf88658515&scene=21#wechat_redirect)
- [使用 ESLint+Prettier 来统一前端代码风格](https://segmentfault.com/a/1190000015315545)
- [理解 Prettier 并用它统一你的代码风格](https://www.meteorlxy.cn/posts/2019/08/05/understand-and-use-prettier.html)
