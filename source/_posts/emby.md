---
layout:     post
title:      分别使用EMBY和WEBDAV搭建自己的影视媒体中心
subtitle:   使用VPS搭建EMBY挂载Google Drive创建属于自己的媒体中心
date:       2022-08-22
author:     "toshiba"
index_img: https://yt-card-system.oss-cn-beijing.aliyuncs.com/blog/index-img/emby.png
comments: true
tags :
    - EMBY
    - rclone
    - Google Drive
categories:
    - 娱乐
    - EMBY
---

# 阿里云盘搭建影视服务

## 阿里云盘账号
随意一个账号即可，我用的时候错过了之前获取大容量的时机，去万能的淘宝花二三十走的邀请一人送800G的活动，这样可以有8000G的空间。

## 不限型号的小主机或者软路由最好能刷{% label primary @OpenWrt %}的系统
WebDAV的服务最好在内网，所以我选择放到了我的{% label primary @N1 %}上了，这里要说一下{% label primary @N1 %}其实如果带宽不超过500M，没有太复杂的需求，使用{% label primary @N1 %}绝对是一个好的选择，3瓦的功率加上实用的功能，物有所值。

## 支持播放{% label primary @WebDAV %}协议的视频播放软件
这个用的我朋友推荐的{% label primary @nplayer %},花了30元买的无广告版本，内网播放贼流畅，它还支持{% label primary @Google Drive %}的共享网盘播放，除了播放没有海报墙速度还是很可观的，当然{% label primary @Google Drive %}是需要科学上网环境的。

因为{% label primary @OpenWrt %}内置了{% label primary @WebDAV %}的服务，所以打开[阿里云盘](https://www.aliyundrive.com/drive)网页版在控制台中找到{% label primary @Local Storage %}> {% label primary @token %}> {% label primary @refresh_token %},粘贴到{% label primary @WebDAV %}的服务中即可，就不过多介绍了。




# EMBY服务搭建

阿里云盘搭建服务播放起来其实很流畅，我也用了一段时间，直到有一天我帮一个朋友买了一个EMBY的非公益服，有海报墙界面比较好看，瞬间对这个感兴趣起来，后续又看了一些教程我就打算自己来搭建一下EMBY服务

## 提前准备
* 一台VPS
* 网盘资源








# 参考

[^1]: [VPS搭建EMBY & 挂载Google Drive 搭建自己的媒体中心](https://www.unvone.com/71884.html)
[^2]: [Docker部署EMBY](https://mrchou.com/internet/how-to-set-emby-by-docker.html)

