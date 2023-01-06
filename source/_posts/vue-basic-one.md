---
layout: post
title: Vue.js基础使用手册
subtitle: 将Vue.js一些主要点记录整理
date: 2022-11-14
author: "toshiba"
index_img: https://yt-card-system.oss-cn-beijing.aliyuncs.com/blog/index-img/vue.webp
comments: true

tags:
  - Vue.js
  - 前端框架
categories:
  - Vue.js
---

# 基础知识点整理

### 演练场

- [Vue SFC Playground](https://sfc.vuejs.org/#eNp9UMtqwzAQ/JXtXtJCbNGrcQO99Q960cWNN4mDXqzWbsH437tK6lBaCAhpZ0cazeyMrynV00jYYJv3PCTZ2UBfKbJAT4dudAKzDQB9J93j07UGYJKRw4oAfD42sHkj5yK8R3b9w+ZKLeXQTVdrbh8oEPLJdUKKANrT826eiwosS2sUXbpDSKPAVPnYk3uxqLxFpVpze41bHHxxW/ku1eccgya52LI/RLbYrEYtatSCLZ5EUm6MyYd9yX/OdeSj0armMcjgqabsqw+On5lYhS1uf2kYbU7EFVPoiYnvaf65+k93nRAu36DOh1k=)

- [JSFiddle](https://jsfiddle.net/yyx990803/2ke1ab0z/)
- [stackblitz](https://stackblitz.com/edit/vitejs-vite-tl5w64?file=index.html&terminal=dev)

### cdn

* [https://unpkg.com/](https://unpkg.com/)
* [https://cdnjs.com/libraries/vue](https://cdnjs.com/libraries/vue)
* [https://www.jsdelivr.com/package/npm/vue](https://www.jsdelivr.com/package/npm/vue)

### 使用全版本构建
```html
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>

<div id="app">{{ message }}</div>

<script>
  const { createApp } = Vue
  
  createApp({
    data() {
      return {
        message: 'Hello Vue!'
      }
    }
  }).mount('#app')
</script>

```

### 使用 ES 模块构建版本
```html
<div id="app">{{ message }}</div>

<script type="module">
  import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
  
  createApp({
    data() {
      return {
        message: 'Hello Vue!'
      }
    }
  }).mount('#app')
</script>

```
### 启用 Import maps
```html
<script type="importmap">
  {
    "imports": {
      "vue": "https://unpkg.com/vue@3/dist/vue.esm-browser.js"
    }
  }
</script>

<div id="app">{{ message }}</div>

<script type="module">
  import { createApp } from 'vue'

  createApp({
    data() {
      return {
        message: 'Hello Vue!'
      }
    }
  }).mount('#app')
</script>

```

### 作为jQuery替代品

如果不需要构建步骤只想在`html`中使用则可以使用[peite-vue](https://github.com/vuejs/petite-vue),作为一个声明式的`jQuery`替代品。更加轻量精简只有6kb.


### 创建 Vue 应用

```bash
npm init vue@latest
```

该命令会调用 [create-vue](https://github.com/vuejs/create-vue) 这个 `Vue` 官方的项目脚手架工具 来创建一个简单项目

# 参考

[^1]: [Vue.js 官方文档](https://cn.vuejs.org/guide/introduction.html)
