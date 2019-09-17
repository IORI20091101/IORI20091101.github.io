---
layout:     post
title:      在浏览器输入 URL 回车之后发生了什么
subtitle:   在浏览器输入 URL 回车之后的一系列流程解析
date:       2019-09-16
author:     "toshiba"
header-img: "images/bg/batman/bat3.jpg"
comments: true

tags :
    - 基础
    - 面试
    - HSTS

categories:
    - 面试
---

本文内容来自[在浏览器输入 URL 回车之后发生了什么](https://4ark.me/post/b6c7c0a2.html), 自己在此记录一下用来复习巩固.要了解更多内容请[查看原文](https://4ark.me/post/b6c7c0a2.html).

在浏览器输入 URL 回车之后发生了什么？
这是一个老生常谈的问题，基本面试的过程中都会遇到这个问题，这里将这个问题自己描述一遍供将来复习参考。
大致流程如下
* 1.URL解析
* 2.DNS查询
* 3.TCP连接
* 4.处理请求
* 5.接受响应
* 6.渲染页面



### 一、URL解析

#### 地址解析
首先判断你输入的是一个合法的URL还是一个带搜索的关键词，并且根据你输入的内容自动完成字符编码等操作。

#### HSTS
由于安全隐患，会使用HSTS强制客户端使用HTTPS访问页面。[你不知道的HSTS](https://www.barretlee.com/blog/2015/10/22/hsts-intro/)

#### 检查缓存
![](https://cdn.darknights.cn/assets/images/in-post/browser-input/cache.png)



### DNS查询
![](https://cdn.darknights.cn/assets/images/in-post/browser-input/dns.png)

#### 1.浏览器缓存
浏览器会先检查是否在缓存中，没有则调用系统库函数进行查询。 操作系统没有设定浏览器存储DNS记录的时间长短，不同的浏览器会存储各自的一个固定时间，时长为2~30分钟不等。


#### 2.操作系统缓存
操作系统也有自己的 DNS缓存，但在这之前，会向检查域名是否存在本地的 Hosts 文件里，没有则向 DNS 服务器发送查询请求。
 如果浏览器缓存里没有找到需要的记录，浏览器会做一个操作系统调用（windows里是gethostname），这样子，就可以获得系统缓存里的记录啦。

#### 3.路由器缓存
路由器也有自己的缓存。如果还是没有找到需要的缓存，将前面的查询请求发给路由器，它一般会有自己的DNS缓存。



#### 4.ISP DNS缓存
ISP DNS 就是在客户端电脑上设置的首选 DNS 服务器，它们在大多数情况下都会有缓存。
每一个ISP（网络服务提供商），或一个大学，甚至是一个大学里的系都会有一个自己的本地域名服务器，他会在url第一次访问时缓存该域名的指向。下次再访问时，他会从缓存里把这个url曾经指向的IP调出来。


#### 5.根域名服务器查询
在前面所有步骤没有缓存的情况下，本地 DNS 服务器会将请求转发到互联网上的根域，下面这个图很好的诠释了整个流程：
![](https://cdn.darknights.cn/assets/images/in-post/browser-input/search.png)

需要注意的点

* 递归方式：一路查下去中间不返回，得到最终结果才返回信息（浏览器到本地DNS服务器的过程）
* 迭代方式，就是本地DNS服务器到根域名服务器查询的方式。
* 什么是 DNS 劫持
* 前端 dns-prefetch 优化


递归查询：
    主机向本地域名服务器的查询一般都是采用递归查询。
    如果主机所询问的本地域名服务器不知道被查询的域名的IP地址，那么本地域名服务器就以DNS客户的身份，向其根域名服务器继续发出查询请求报文(即替主机继续查询)，而不是让主机自己进行下一步查询。因此，递归查询返回的查询结果或者是所要查询的IP地址，或者是返回一个失败的响应，表示无法查询到所需的IP地址

迭代查询：
    本地域名服务器向根域名服务器的查询通常是采用迭代查询。
    当根域名服务器收到本地域名服务器发出的迭代查询请求报文时，要么返回给本地域名服务器所要查询的IP地址，要么返回给本地域名服务器下一步应当查询的域名服务器的IP地址。

举个栗子：假设的主机想知道另一个主机（域名为 my.xxsilence.net)的IP地址。具体步骤如下：

① 主机先向其本地域名服务器进行递归查询，如果缓存中没有，继续下一步。

② 本地域名服务器采用迭代查询，先向一个根域名服务器查询。

③ 根域名服务器告诉本地域名服务器，下一次查询的顶级域名服务器 dns.net。

④ 本地域名服务器向顶级域名服务器 dns.net。

⑤ 顶级域名服务器 dns.net，下一次应查询的权限域名服务器dns.xxsilence.net的IP地址。

⑥ 本地域名服务器向权限域名服务器dns.xxsilence.net进行查询。

⑦ 权限域名服务器dns.xxsilence.net告诉本地域名服务器，所查询的主机的IP地址。

⑧ 本地域名服务器最后把查询结果告诉主机。


### TCP连接
TCP/IP 分四层,在发送数据时,每层都要对数据进行封装

![](https://cdn.darknights.cn/assets/images/in-post/browser-input/tcp.png)


#### 应用层:发送HTTP请求

在前面的步骤我们已经得到服务器的 IP 地址，浏览器会开始构造一个 HTTP 报文，其中包括：
* 请求报头（Request Header）：请求方法、目标地址、遵循的协议等等
* 请求主体（其他参数）

其中需要注意的点：
* 浏览器只能发送 GET、POST 方法，而打开网页使用的是 GET 方法

传输层会发起一条到达服务器的 TCP 连接，为了方便传输，会对数据进行分割（以报文段为单位），并标记编号，方便服务器接受时能够准确地还原报文信息。

在建立连接前，会先进行 TCP 三次握手。[通俗解释TCP协议三次握手](https://github.com/jawil/blog/issues/14)、[计算机网络](https://hit-alibaba.github.io/interview/basic/network/HTTP.html)


#### 传输层: TCP传输报文

# 文章参考
* [在浏览器输入 URL 回车之后发生了什么](https://4ark.me/post/b6c7c0a2.html)
* [DNS查找域名的过程](http://www.cnblogs.com/xsilence/)


