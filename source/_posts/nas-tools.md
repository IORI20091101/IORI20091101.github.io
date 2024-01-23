---
layout: post
title: NASTool安装配置以及相关插件的下载配置
subtitle: 使用NASTool整合Qbittorrent、Jackett、ChineseSubFinder
date: 2024-01-18
author: "toshiba"
index_img: https://yt-card-system.oss-cn-beijing.aliyuncs.com/blog/index_img/nas-tools.png
comments: true

tags:
  - Gen8
  - NASTool
  - Qbittorrent
categories:
  - NASTool

sticky: 2
---
# 前言
之前朋友推荐搞过一个`Gen8`的服务器，安装了洗白黑裙主要用来做`Nas`, 这里主要整理一下如何使用`NASTool`来追剧。

# 约定

假设我们所有的操作都基于`Nas`的根目录，我们有两个文件夹 `/docker`,`/video` 所有的操作都基于这两个文件夹。

## 配置文件夹目录
`/docker`
  - `/docker/nastools`            // nastools配置文件夹
  - `/docker/qBittorrent`         // qBittorrent下载器配置文件夹
  - `/docker/chinesesubfinder`    // chinesesubfinder字幕下载器配置文件夹
  - `/docker/jackett`             // 自定义索引jackett配置文件夹
  - `/docker/emby`                // emby媒体服务器配置文件夹

## 媒体文件夹目录
`/video`
  - `/video/movie` // 电影文件夹
  - `/video/tv` // 电视剧文件夹
  - `/video/cartoon` // 动漫文件夹
  - `/video/link`
    - `/video/link/movie`
    - `/video/link/tv`
    - `/video/link/cartoon`

文件夹路径需要跟上面相同，以`movie`为例，`NASTool`会自动将`/video/movie`下的电影通过`硬连接`方式链接到`/video/link/movie`的文件夹下。



# `NASTool`的安装配置

## 安装

使用`Docker`来安装配置`NASTool`,这里我拉取了[diluka/nas-tools](https://hub.docker.com/r/diluka/nas-tools)来配置，这里的版本是`2.9.1`这个版本还支持`BT`，最新的[官方版本](https://hub.docker.com/r/nastool/nas-tools)里，因为一些不可描述的原因只支持`PT`。

## 配置
`/docker`文件夹下新建`nastools`文件夹启动一个新的容器配置如下
![](https://yt-card-system.oss-cn-beijing.aliyuncs.com/blog/in-post/nas/nas.png)

然后就可以进入启动页面进行配置 `http://192.168.100.xxx:3000`,初次登陆账号是：`admin`, 密码：`password`, 如何不能登录，可以在输出日志看到账号密码。

## 基础配置

媒体里需要一个`TMDB API Key`, 需要在[https://www.themoviedb.org/settings/api](https://www.themoviedb.org/settings/api)这里注册登陆获取密钥。（注意：配置好后如何在搜索里面无法看到`TMDB`的热门电影跟电视剧，需要在`系统`中设置代理服务）


## 媒体库

媒体库需要设置为`/video/link`下面的文件夹

| nas路径 | docker目录 |
| ------ | ----- |
| /docker/nastools/config  | /config |
| /video | /video |

![](https://yt-card-system.oss-cn-beijing.aliyuncs.com/blog/in-post/nas/media.png)

## 目录同步

这里安装如下图片设置需要注意的是同步方式需要为`硬连接`。
![](https://yt-card-system.oss-cn-beijing.aliyuncs.com/blog/in-post/nas/sync.png)

## 索引器
索引器可以使用内建索引，这里我使用了[`Jackett`](https://hub.docker.com/r/linuxserver/jackett),配置对应文件夹

| nas路径 | docker目录 |
| ------ | ----- |
| /docker/jackett/config  | /config |
| /docker/jackett/downloads | /downloads |

进入`http://192.168.100.xxx:9117`获取到`Api Key`，然后 `Add indexer`选取`Public`的代表`BT`,勾选一批然后通过`Test`筛选出可以使用的即可。
在`NASTool`中选择`Jackett`填写`ip:9117`跟`Api Key`， 测试显示成功即可。

## 下载器

下载器我选择了`Qbittorrent`,还是使用`Docker`安装`docker pull linuxserver/qbittorrent`， 配置如下：

| nas路径 | docker目录 |
| ------ | ----- |
| /docker/qbittorrent/config  | /config |
| /video | /downloads |

初次登陆账号：`admin`, 密码：`adminadmin`
需要注意的是在设置--》连接 --》端口 需要点一下随机越大越好，因为默认的`6881`一般会被封导致下载没有速度，再就是需要在设置--》`BitTorrent`最底下添加从网上找的`tracker`否则下载也没有速度

tracker列表
* [https://github.com/ngosang/trackerslist](https://github.com/ngosang/trackerslist)
* [https://github.com/XIU2/TrackersListCollection](https://github.com/XIU2/TrackersListCollection)
* [Torrent tracker list 2024](https://thomas.vanhoutte.be/miniblog/torrent-tracker-list-2024-open-and-working-torrent-trackers/)

也可以自行搜索添加。
同样，在`NASTool`下载器中选择`Qbittorrent`填写`ip`、`端口`、`用户名`、`密码`， 测试显示成功即可。

## 媒体服务器

媒体服务器我使用过`Jellyfin`跟`Emby`,其实差别不大，但是感觉上还是`Emby`要好用一点，也购买了`Emby`的终身订阅。后来发现其实有破解版本，如果只是自己用的话可以尝试一下这个版本[xinjiawei1/emby_unlockd](https://hub.docker.com/r/xinjiawei1/emby_unlockd) ,或者[lovechen/embyserver](https://hub.docker.com/r/lovechen/embyserver)这个版本
安装：`docker pull xinjiawei1/emby_unlockd`


| nas路径 | docker目录 |
| ------ | ----- |
| /docker/emby/config  | /config |
| /docker/cache/config  | /config |
| /video/link | /media |

关于`Emby`的配置就不赘述了，需要在`Emby`中获取一个`Api Key`在`NASTool`中使用，`Emby`的媒体库路径这里就是映射的目录`/media`，我们选择其中的电影电视剧文件夹挂载即可。
在`NASTool`媒体服务器中选择`Emby`填写`http://ip:8096`、`Api Key`， 测试显示成功即可。

## 字幕
字幕下载可以使用默认的 `OpenSubtitles`，其实挺好用也不需要额外配置，这里也可以选择[`ChineseSubFinder`](https://registry.hub.docker.com/r/allanpk716/chinesesubfinder/), 安装`docker pull allanpk716/chinesesubfinder:latest-lite`。

| nas路径 | docker目录 |
| ------ | ----- |
| /docker/chinesesubfinder/config  | /config |
| /docker/chinesesubfinder/cache  | /app/cache |
| /video | /media |

### 基础配置

* 电影目录 `/media/link/movie`
* 电视剧目录 `/media/link/tv`

### 进阶配置

* 字幕选择Emby格式
* 启用TMDB API填写之前获取的`Api Key`,检测一下是否可用

### 字幕源设置

* [射手网](https://assrt.net/user/register.xml)免费注册账号, 在[用户面板](https://assrt.net/usercp.php)获取密钥
* SubtitleBest 需要使用该[电报机器人](https://t.me/SubtitleBestBot)获取`ApiKey`

### EMBY配置
填写之前设置好的`http://ip:8096`、`Api Key`，检测是否成功。

### APIKey
最后在实验室下获取该字幕下载器的 `APIKey`, 这里用来填写入`NASTool`, 

http://192.168.100.141:19035

| 服务器地址 | Api Key | 本地路径 | 远程路径 |
| ------ | ----- | ------ | ----- |
| http://192.168.100.xxx:19035  | 该步获取的`APIKey` | /video | /media |

最后两个路径如果设置的相同可以不用填写。字幕下载器这里没有测试按钮，但是可以在`NASTool`的右上角查看实时日志，当添加一部新电影时如果通过`ChineseSubFinder`去下载字幕了就代表成功了

### 手动上传字幕
如果自动下载字幕失败了，可以通过手动搜索字幕的方式去字幕网站下载，然后上传到媒体库中，这样就可以实现手动下载字幕。
在`ChineseSubFinder`的库中找到没有字幕的电影点击搜索
![](https://yt-card-system.oss-cn-beijing.aliyuncs.com/blog/in-post/nas/s1.png)
点击任意一个网址去下载字幕文件
![](https://yt-card-system.oss-cn-beijing.aliyuncs.com/blog/in-post/nas/s2.png)
最后在库里的对应电影点击上传按钮将下载的字幕文件上传即可。


## 豆瓣
在豆瓣网站上获取自己豆瓣用户ID 跟 `Cookie`,这样在豆瓣上对某部电影点了想看，就会自动去下载，方便了很多。


# 结尾
至此使用`NASTool`的安装配置流程，以及相关使用服务的配置都做了简单的介绍，如果你的`Nas`有足够的空间，就可以愉快的观影追剧了。



# 参考


[^1]: [群晖 + Nas-Tools 一个懂事的媒体库](http://www.liuocean.com/2022/09/12/qun-hui-nastools-yi-ge-dong-shi-de-mei-ti-ku/)
[^2]: [安装NAS Tools，打造自动化观影、追剧系统，NAS媒体库整理工具，威联通Docker版NAS Tools安装教程~feat.威联通HS 264](https://www.youtube.com/watch?v=kUOelSHhfto&list=LL&index=2)

