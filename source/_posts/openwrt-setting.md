---
layout: post
title: iStoreOS安装及常规设置
subtitle: iStoreOS简单设置
date: 2024-01-25
author: "toshiba"
index_img: https://yt-card-system.oss-cn-beijing.aliyuncs.com/blog/index_img/iStoreOS.png
comments: true
tags:
  - OpenWrt
  - iStoreOS
categories:
  - OpenWrt

---

# 前言
软路由对我来说主要用来科学，跑一些`docker`服务，像之前说过的[`xiaoya`](http://alist.xiaoya.pro/)，去广告插件感觉效果感觉一般。这里记录一下安装的一些问题以及一些碰到的设置问题。

## `N1`
之前网购过一个`N1`刷了`OpenWrt`跑了一段时间，优点就是低功耗大概`3W`的样子，再就是价格便宜，只当作软路由不跑一些吃资源的应用还是可以用的，
缺点是带宽只能跑到500M,而且遇到过系统崩了重新安装的情况。总体来说还是可以的,安装的话可以在这里找到对应的[固件包](https://t.me/openwrt_flippy).

## `J4125软路由`
后来尝试了一下朋友推荐的这款软路由，虽然买的时候已经不是最新款了，但是新款有反馈网卡断流问题的，还有性能提升带来的功耗提高，这个对我来说已经够用了，直接物理机安装的`iStoreOS`，除了中间我搞崩溃过一次重新安装了一直稳定服务。

# 安装
首先从官网[下载固件](https://fw.koolcenter.com/iStoreOS/)，默认最新即可.我的是[`x86_64`](https://fw.koolcenter.com/iStoreOS/x86_64/)架构的所以选择这个文件夹下面类似`	istoreos-22.03.6-2024011910-x86-64-squashfs-combined.img.gz`的镜像保存待用。
如果你不清楚自己的机器应该下载什么版本可以这样查看操作系统的信息
```bash
 uname -a  # Linux iStoreOS 5.10.201 #0 SMP Tue Jan 16 11:33:34 2024 x86_64 GNU/Linux
```
通过[官方教程安装](https://doc.linkease.com/zh/guide/istoreos/install_x86.html#_1-%E8%A7%86%E9%A2%91%E4%BB%8B%E7%BB%8D)
简单方便小白也可以操作，这里就不赘述了。

## 安装服务
`iStoreOS`自带商店可以安装一些常用的应用
![](https://yt-card-system.oss-cn-beijing.aliyuncs.com/blog/in_post/istore/istore.png)
有一些我们可能需要的应用这里没有，可以从[Are-u-ok](https://github.com/AUK9527/Are-u-ok)下载到本地，然后在商店的手动安装需要的应用

## 手动卸载

列出已经安装的软件包
```bash
opkg list-installed
```
 根据关键词筛选已经安装的软件包
```bash
opkg list-installed ｜ grep luci-app-ssr-plus 
```
卸载软件
```bash
opkg remove luci-app-ssr-plus
```


## Socat端口转发
自己配置端口转发也可以，需要在防火墙的端口转发和通信规则里都需要设置，比较繁琐，安装`Socat`做端口转发配置方便。


## 内网穿透

- [zerotier](https://www.zerotier.com/)
- [tailscale](https://tailscale.com/)

## 动态 DNS
如果有公网`ip`,可以在[dnspod.cn](https://console.dnspod.cn/),9元买一个域名，解析记录写上公网`ip`地址，然后在个人的API密钥里面申请`ddns`生成`ID`跟`Token`存下备用。
然后配置软路由下的动态DNS主要填写以下几个字段

- DDNS 服务提供商选择: dnspod.cn
- 查询主机名： sdongzhi.com
- 域名： **.sdongzhi.com** 
- 用户名： ID
- 密码： Token

其中主要需要注意的点就是域名这个字段前面需要有一个`.` 我一开始一直没添加成功就是因为这个，这样就会在重新拨号的时候通知域名服务商自动解析


## 计划任务
我安装的`xiaoya`服务需要隔一段时间重启一下，之前是写脚本，后来发现在`系统==》计划任务`,这里添加`crontab`任务， 可以使用[https://crontab.guru/](https://crontab.guru/),这个工具来配置，简单明了。

## 网络接口
网络接口的配置一般默认即可,可以按自己需要修改
- `iStoreOS`的`lan`口默认为：`http://192.168.100.1`
- 用户名： root
- 密码： password

# 一些建议
我的软路由是`4G`内存版本的，但是我尝试插上了一块`1T`的硬盘，安装了`nas-tools`、`qBittorrent`、`jackett`、破解版的`Emby`,想做个简单的影音系统并做个照片同步，但是后来系统占用异常高导致无法上网，所以后来重装了系统把所有影音相关都删除，让软路由做好自己份内的事情即可，`All in one === All in boom`谨记。




# 参考
[^1]: [iStoreOS文档](https://doc.linkease.com/zh/guide/istoreos/)



