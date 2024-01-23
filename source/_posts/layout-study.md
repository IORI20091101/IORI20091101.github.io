---
layout: post
title: 理解各种css布局(一)
subtitle: 圣杯布局与双飞翼布局
date: 2022-09-13
author: "toshiba"
index_img: https://yt-card-system.oss-cn-beijing.aliyuncs.com/blog/index_img/layout.jpeg
comments: true

tags:
  - 页面布局
  - css
categories:
  - 页面布局
---

# 圣杯布局

`html`结构

```html
<div class="header">头部</div>
<div class="main clearfix">
  <div class="center">中间自适应</div>
  <!-- 因为相对来说，center中为主要内容，所以写前边，这样也有利于SEO -->
  <div class="left">左列定宽</div>
  <div class="right">右列定宽</div>
</div>
<div class="footer">底部</div>
```

`CSS`

```css
.header {
  height: 40px;
  background: lightblue;
}
.footer {
  height: 100px;
  background: lightcoral;
}

.clearfix::after {
  content: "";
  display: block;
  clear: both;
}

.main {
  margin-left: 200px;
  margin-right: 300px;
  /* padding: 0 300px 0 200px; */
}

.center {
  width: 100%;
  height: 500px;
  background: lightgray;
  float: left;
}
.left {
  width: 200px;
  height: 500px;
  background: lightpink;
  float: left;
  margin-left: -100%;
  position: relative;
  left: -200px;
}
.right {
  width: 300px;
  height: 500px;
  background: lightgreen;
  float: left;
  margin-left: -300px;
  position: relative;
  right: -300px;
}
```

![](https://yt-card-system.oss-cn-beijing.aliyuncs.com/blog/in_post/layout/layout.png)
[点击查看 demo](https://codepen.io/IORI20091101/project/editor/DaExon)

# 双飞翼布局

`html`

```html
<div class="header">头部</div>
<div class="main clearfix">
  <div class="center">
    <div class="inner">中间自适应</div>
  </div>
  <div class="left">左列定宽</div>
  <div class="right">右列定宽</div>
</div>
<div class="footer">底部</div>
```

`CSS`

```css
.header {
  height: 40px;
  background: lightblue;
}
.footer {
  height: 100px;
  background: lightcoral;
}

.clearfix::after {
  content: "";
  display: block;
  clear: both;
}

.center {
  width: 100%;
  height: 500px;
  background: lightgray;
  float: left;
}
.left {
  width: 200px;
  height: 500px;
  background: lightpink;
  float: left;
  margin-left: -100%;
}
.right {
  width: 300px;
  height: 500px;
  background: lightgreen;
  float: left;
  margin-left: -300px;
}

.inner {
  height: 100%;
  background-color: green;
  margin: 0 300px 0 200px;
}
```

![](https://yt-card-system.oss-cn-beijing.aliyuncs.com/blog/in_post/layout/layout1.png)
[点击查看 demo](https://codepen.io/IORI20091101/pen/QWrdyjW)

# 参考

[^1]: [CSS 之圣杯布局与双飞翼布局](https://juejin.cn/post/6973562604581027853)
[^2]: [深入理解圣杯布局和双飞翼布局](https://juejin.cn/post/6844903817104850952)
[^3]: [圣杯布局与双飞翼布局的区别](https://www.jianshu.com/p/9e91adf50247)
