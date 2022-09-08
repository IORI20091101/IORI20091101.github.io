---
layout: post
title: 删除手机多余的根证书
subtitle: 删除手机多余的根证书
date: 2022-08-20
author: "toshiba"
index_img: https://yt-card-system.oss-cn-beijing.aliyuncs.com/blog/index-img/apple.png
comments: true
tags:
  - ios
  - 手机
  - 工具
categories:
  - ios
---

## 前言

相信 iphone 用户会碰到这样一种情况，就是安装了各种抓包工具，比如

- Charles
- Surge
- Mitmproxy

之类的工具，需要安装证书，才能抓到 https 的请求包，多次尝试之后呢我们就积累了一堆的

`设置—>通用—> 描述文件` 本来这样也没有问题随时在这里可以移除，我们`设置—>通用—> 关于本机—>证书信任设置` 会显示受信任证书列表，我们可以自由开关是否信任。

事情的起因就是我们换了手机或者重新从备份中恢复了手机，软件不存在了描述文件也就不存在了，但是受信任证书列表中还是显示一堆没有用的根证书，我们又重新安装了一遍软件重新生成了证书，受信任证书又一次添加了重复的根证书，之前的已经不生效了，我们发现描述文件是不在了但是受信任证书列表中的则一直存在无法删除。甚至会出现两到三个一样的根证书，这时候它们除了能够用来逼死强迫症已经没什么用了，我们就要想办法把它删除掉。

## 操作步骤

### 第一步

备份 iPhone 系统数据到 Mac 上，然后使用 iMazing 查看备份数据

### 第二步

在备份的 KeychainDomain 目录中找到 TrustStore.sqlite3 数据文件，点击下方的 Copy to Mac 将其导出到本地某个目录（这里假设是在 ~/TrustStore.sqlite3）

### 第三步

使用 [ADVTrustStore](https://github.com/ADVTOOLS/ADVTrustStore) 项目导出证书~/foo.crt

```bash
./iosCertTrustManager.py -t ~/TrustStore.sqlite3 -e ~/foo.crt
```

这里需要把所有的都导出来依次安装

### 第四步

通过 Airdrop 将生成的 crt 文件发送到手机上然后安装，只能一个一个的发送然后一个一个的安装

### 第五部

安装完毕后再从 `设置—>通用—> 描述文件` 全部移除即可，这时候 `设置—>通用—> 关于本机—>证书信任设置` 已经变得干干净净了
