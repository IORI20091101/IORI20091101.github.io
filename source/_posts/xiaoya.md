---
layout: post
title: 搭建小雅影视服务
subtitle: 使用VPS或者软路由搭建小雅来观看影视
date: 2023-09-26
author: "toshiba"
index_img: https://yt-card-system.oss-cn-beijing.aliyuncs.com/blog/index_img/xiaoya.png
comments: true
tags:
  - EMBY
  - xiaoya
  - 阿里云盘
categories:
  - 娱乐
  - EMBY
---

# 前言
之前买了阿里云盘的`6T`会员到了`2014`，又通过邀请获取了`8T`的空间,陆续存了好多资源，本来岁月静好但是这几个月突然发现空间被陆续收回了，只剩下`7T`左右只能不断的删除资源烦不胜烦，所以今年的`8T`会员就没敢续，理性续费。 所以问题来了当我们没有那么多的空间的时候该如何酣畅淋漓的观影呢。之前我写了一篇关于自建`Emby`服务的文章，但是如果我没有别的资源盘，我又想使用阿里网盘该如何解决呢。

## 小雅
答案就是[小雅](http://alist.xiaoya.pro/)的资源盘，这里面资源比较丰富，它的原理就是在你点击观看影片的时候调用阿里云的`api`将你要观看电影转存到你阿里云盘的指定目录下这样就可以实现满速观看了。（ps：阿里云盘更新接口后分享视频已经开始限速了基本没法看了，所以这里这种方案暂时可以，后续政策再变化就不好说了，再次呼吁大家谨慎续费）


## 准备

要部署小雅的服务
1，需要一台`VPS`，或者软路由，或者使用家用电脑，能支持`Docker`即可
2，需要阿里云盘的账号保证云盘里面有剩余空间，留多点不用频繁清理

## 安装

### 一键安装
```bash
bash -c "$(curl http://docker.xiaoya.pro/update_new.sh)"
```
![](https://yt-card-system.oss-cn-beijing.aliyuncs.com/blog/in_post/xiaoya/image%20%281%29.png)

### Docker安装
```bash
docker pull xiaoyaliu/alist
```

```bash
docker run --name xiaoya -v /root/docker/xiaoya:/data -p 5678:80 -d xiaoyaliu/alist:latest
```

### 配置文件
有几个需要配置的文件
![](https://yt-card-system.oss-cn-beijing.aliyuncs.com/blog/in_post/xiaoya/WX20230928-141053.png)

#### `mytoken.txt`
从[这里](https://alist.nn.ci/zh/guide/drivers/aliyundrive.html)获取`mytoken.txt`,以前用这个就可以观影，现在用它来获取电影的分享链接。
也可以参考`[这里](https://t.me/PlutoPlayer/239324)`来获取

#### `myopentoken.txt`
从[阿里云盘Open](https://alist.nn.ci/zh/guide/drivers/aliyundrive_open.html)获取`myopentoken.txt`, 获取官方授权的`opentoken`

#### 转存目录的 `temp_transfer_folder_id.txt`
比如想将文件缓存到自己的阿里云盘路径为`https://www.aliyundrive.com/drive/file/resource/640xxxxxxxxxxxxxxxxxxxca8a`，这个文件内容则为`640xxxxxxxxxxxxxxxxxxxca8a`

这些都配置好了启动容器，过一段时间就可以访问 `http://xxxxx:5678`来观影了。如果挂载`webdav` 账号密码为

用户: `guest`

密码: `guest_Api789`

路径: `/dav`

#### 自定义登录密码`guestpass.txt`
在该文件中输入登录密码

#### 强制登录`guestlogin.txt`
通过此文件的存在与否来决定是否开启强制登入 格式：空白文件，不需要强制登入功能，则删除此文件

如果你的xiaoya放在公网，为了防止别人蹭网，可以设置强制登入，新增 `/etc/xiaoya/guestlogin.txt` 这个文件，重启即可，文件有没有内容无所谓，如果取消强制登入就删除这个文件。强制登入的账号为 dav，密码使用 `/etc/xiaoya/guestpass.txt` 里设置的，同时`webdav`连接使用 `dav` 这个用户
用户: `dav`

密码: `guestpass.txt中定义`

路径: `/dav`


#### 显示自己的阿里云盘内容`show_my_ali.txt`
通过此文件的存在与否来决定是否加载自己的阿里云盘 格式：空白文件，不需要加载的，则删除此文件


#### 显示自己的阿里云盘内容`docker_address.txt`

配合 TVBOX的alist搜索 格式：http://xxxxx:5678 （最后不要加 /)
配置地址 `http://xxxxx:5678/tvbox/my.json`


#### 代理`proxy.txt`
使用代理，http，https，socks5 协议 格式：http://xxxxx:7890 或 socks5://xxxxx:7891 （最后不要加 /)

#### 自定义tvbox配置文件`my.json`
自定义tvbox配置文件


#### 挂载自定义直播源`tv.txt`
挂载自定义直播源到xiaoya 格式：tvbox的直播源格式，如图所示
备注：直播源有格式，区域限制等问题，有的可以在网页观看，有的需要用播放器才能看



#### pikpak网盘`pikpak.txt`
⽤来观看pikpak分享
格式："xxxxxxxx" "yyyyyyyy"
备注：账号可以是邮箱和⼿机号，⼿机号前⾯要加区号，也就是 “+86xxxx” 这样，注册如果⽤⾕歌快捷⽅式登⼊的话是⽆法使⽤⾕歌邮箱登⼊的（alist不⽀持）

#### 挂载自己一个或多个 pikpak账号`pikpak_list.txt`
 格式：挂载名 "账号" "密码" ，用空格分开（pikpak2 “abc@hotmail.com" "123456"），每行一个



> ps: 现在小雅支持自定义阿里云盘分享跟`pikpak`网盘分享，我们可以将一些长期稳的分享挂在到小雅服务上，首先更新最新的小雅镜像，然后定义以下文件到小雅路径

#### 自定义`pikpak`分享,`pikpakshare_list.txt`
挂载自己一个或多个 pikpak分享 格式：挂载名 分享ID 分享目录 ，用空格分开（赵霸道 VNRT8Wr8BGyw1kt1HkijKR4Qo1 VNQf6ZmWE3pVWGpuFriGqyPzo1），每行一个 备注：挂载名不能有空格



#### 自定义阿里云分享,`alishare_list.txt`
文件：alishare_list.txt 用途：挂载自定义分享ID 格式：挂载名 阿里分享ID 文件folder id，用空格分开，每行一个 120T电影资源 ZpevUcDZ2Pn 636c8ba0703acd24cd44b19dd00312ef15b1e8 60T各种资料 s6NBDauc5VZ 63b16e82a50ca34f6c7466293235a06d1af8ea3


#### `alist`套娃`alist_list.txt`
文件：alist_list.txt 用途：挂载一个或多个 Alist 套娃 格式：挂载名 alist版本（v2或v3）网址 目录，用空格分开每行一个 备注：挂载名不能有空格，网址最后不要有斜杠


***[示例文件下载](https://yt-card-system.oss-cn-beijing.aliyuncs.com/xiaoya%202.zip)***


现在就可以愉快的观影了～



# 参考

[^1]: [极空间nas docke 挂载xiaoya/alist正确配置](https://post.smzdm.com/p/ad9ko04z/)
[^2]: [NAS最新小雅Alist保姆级安装教程](https://post.smzdm.com/p/a0qnlpqw/)
[^3]: [配置文件示范](https://video.otscp.com/%E5%B0%8F%E9%9B%85%E8%B5%84%E6%BA%90/%E5%B0%8F%E9%9B%85%E8%BD%AC%E5%AD%98%E6%96%87%E4%BB%B6%E5%A4%B9/%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6%E7%A4%BA%E8%8C%83)


