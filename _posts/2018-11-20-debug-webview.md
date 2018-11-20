---
layout:     post
title:      安卓和IOS前端页面调试
subtitle:   调试客户端的webview
date:       2018-10-20
author:     "toshiba"
header-img: "images/bg/batman/bat8.jpg"
comments: true

tags :
    - 工具
    - 调试

categories:
    - 调试
---

## 场景

我们通常会有这样的开发场景， 开发了一些前端页面，可能在手机浏览器打开，也可能在客户端的webview打开，对应不同的场景我们可能需要不通的手段来进行调试。
对于简单的页面我们一般可以通过chrome的开发工具来调试或者通过safari来直接对手机打开的页面直接进行调试。 但是对于复杂webview我们可能需要一些特殊手段来进行debug

## 抓包
对于抓包有很多工具比如 mac上面有 charles，wireShark， windows上面有fiddler 等等。我常用的一个抓包工具叫 [mitmproxy](https://mitmproxy.org/), 在github已经一万多star了，使用起来比较简单。 一条命令 <code>mitmproxy -p 4000 --set console_mouse=false</code>, 启动后 手机手动代理到 ip+端口就可以开始抓包了，对于https可能需要[安装证书](http://mitm.it/).至于安装过程就不重复了，官网已有[教程](https://docs.mitmproxy.org/stable/)。


## 安卓的webview页面
现在的安卓应用内的页面进行调试是真的方便。

* 首先打开手机的usb调试，连接到电脑。
* 第二在chrome输入 <code>chrome://inspect/#devices</code> （开发环境安卓桌面版Chrome32+ 并且 Android 系统高于 4.4）
* 第三 选择app中的页面进行调试即可


## iOS Safari

## weinre


## 微信 WebView 调试


## 参考文档

* [前端 WebView 指南之调试篇](https://75team.com/post/webview-debug.html)
* [移动端浏览器调试方法汇总](http://elevenbeans.github.io/2017/06/06/%E7%A7%BB%E5%8A%A8%E7%AB%AF%E6%B5%8F%E8%A7%88%E5%99%A8%E8%B0%83%E8%AF%95%E6%96%B9%E6%B3%95%E6%B1%87%E6%80%BB/)
* [移动端真机调试指南](https://aotu.io/notes/2017/02/24/Mobile-debug/index.html)
* [打造最舒适的webview调试环境](https://github.com/riskers/blog/issues/11)
* [移动端前端开发调试](http://yujiangshui.com/multidevice-frontend-debug/)