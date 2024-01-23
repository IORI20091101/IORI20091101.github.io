---
layout: post
title: 分别使用EMBY和WEBDAV搭建自己的影视媒体中心
subtitle: 使用VPS搭建EMBY挂载Google Drive创建属于自己的媒体中心
date: 2022-08-22
author: "toshiba"
index_img: https://yt-card-system.oss-cn-beijing.aliyuncs.com/blog/index_img/emby.png
comments: true
tags:
  - EMBY
  - rclone
  - Google Drive
categories:
  - 娱乐
  - EMBY
---

# 阿里云盘搭建影视服务

## 阿里云盘账号

随意一个账号即可，我用的时候错过了之前获取大容量的时机，去万能的淘宝花二三十走的邀请一人送 800G 的活动，这样可以有 8000G 的空间。

## 不限型号的小主机或者软路由最好能刷{% label primary @OpenWrt %}的系统

WebDAV 的服务最好在内网，所以我选择放到了我的{% label primary @N1 %}上了，这里要说一下{% label primary @N1 %}其实如果带宽不超过 500M，没有太复杂的需求，使用{% label primary @N1 %}绝对是一个好的选择，3 瓦的功率加上实用的功能，物有所值。

## 支持播放{% label primary @WebDAV %}协议的视频播放软件

这个用的我朋友推荐的{% label primary @nplayer %},花了 30 元买的无广告版本，内网播放贼流畅，它还支持{% label primary @Google Drive %}的共享网盘播放，除了播放没有海报墙速度还是很可观的，当然{% label primary @Google Drive %}是需要科学上网环境的。

因为{% label primary @OpenWrt %}内置了{% label primary @WebDAV %}的服务，所以打开[阿里云盘](https://www.aliyundrive.com/drive)网页版在控制台中找到{% label primary @Local Storage %}> {% label primary @token %}> {% label primary @refresh_token %},粘贴到{% label primary @WebDAV %}的服务中即可，就不过多介绍了。

# 前期准备

阿里云盘搭建服务播放起来其实很流畅，我也用了一段时间，直到有一天我帮一个朋友买了一个`EMBY`的非公益服，有海报墙界面比较好看，瞬间对这个感兴趣起来，后续又看了一些教程我就打算自己来搭建一下`EMBY`服务，不过`EMBY`其实是有公益服的而且大部分都是公益服，需要去考试跟签到才能获取帐号跟观看

> - [1.Terminus 终点站](https://embywiki.911997.xyz/)
> - [2.普拉斯影业](https://t.me/Plus_Movie_Best)
> - [3.卷毛鼠](https://t.me/Curly_Mouse), 这家用户颇有微词
> - [4.Odyssey+](https://odysseyplus.notion.site/odysseyplus/Odyssey-f54b8a881f7044619151c3e55bdfaeb8)
> - [5.Pornemby 考研公益服](https://t.me/Pornemby)
> - [6.Haochi Emby](https://t.me/hcEmby)
> - [7.猫熊影业](https://t.me/EmbyClub)
> - [8.OtakuDrive](https://t.me/OMGemby)

当然也有收费服务我之前用过这个，如果不愿去签到考试可以使用这个但是这里不作为推荐

> - [深蓝影库](http://slyk.cc/)

到了这里其实已经可以愉快的观影了，但是我对于搭建这种服务还是比较感兴趣的，所以还是选择继续折腾。想搭建`EMBY`服务最重要一点就是资源，不可能自己去从头整理下载，所以这里我选择去购买`Google资源盘`，当然如果愿意去下载整理可以去花钱开一个无限容量的网盘自己整理。

## 一台 VPS

这里需要的机器需要一定的配置，我目前的机器是 DigitalOcean 的`8 GB Memory / 4 AMD vCPUs / 160 GB Disk / SFO3 `，我试过 4G 内存在扫描媒体库的时候经常会死机，所以配置需要稍微高一点，这里我推荐两种机器

> - [DigitalOcean](https://cloud.digitalocean.com/) 他家的机器入口流量是不计费的，我们扫描媒体库的时候主要是入口流量，如果出入口流量都计费的话，很容易就流量用光了
> - [NetCUP](https://www.netcup.eu/vserver/#root-server-details),他家的配置也比较高价格比较合适，只是注册比较特殊特殊，可以参考[NetCup 创建企业账号并申请免税教程](https://www.qishe.org/3238.html)来注册使用

## 网盘资源

我购买的网盘资源是这两家

> - [GD 团队盘资源(@fatshare)](https://t.me/fatsharegd)
> - [Z 小店导航](https://newredirect.org/)

# EMBY 服务搭建

## 安装 rclone 挂载工具

`rclone`可以通过`GoogleApi`来读取网盘文件，实现将`Google资源盘`挂载到本地，挂载成功后就可以使用`EMBY`服务来读取播放了

```bash
curl https://rclone.org/install.sh | sudo bash
```

## 配置 rclone

```bash
rclone config
```

这里所有的配置都可以参考[^1],只是有几个细节需要注意,教程里面有`client_id`跟`client_secret`这两个字端，需要设置不能留空

- 启用[Google Drive API](https://console.cloud.google.com/apis/api/drive.googleapis.com/metrics?project=starlit-water-356105)
- 创建`OAuth 2.0客户端`,选择桌面应用，并且将`client_id`跟`client_secret`保存下来
- 需要将应用发布

如果默认留空每日读取数据是有限制的，播放视频的时候还可能会出现`不兼容的流`，应用如果不发布应用 rlcone 认证的 token 也会很快过期，这里需要注意一下

## CentOS 系统

如果是 CentOS 系统需要安装`fuse`，否则无法挂载

```bash
yum install fuse -y

```

## 挂载单盘

```bash
/usr/bin/rclone mount emby: /home/gdrive \
 --umask 0000 \
 --default-permissions \
 --allow-non-empty \
 --allow-other \
 --buffer-size 32M \
 --dir-cache-time 12h \
 --vfs-read-chunk-size 64M \
 --vfs-read-chunk-size-limit 1G &
```

设置`systemctl`服务

```
cat > /etc/systemd/system/rclone.service <<EOF
[Unit]
Description=Rclone
AssertPathIsDirectory=LocalFolder
After=network-online.target

[Service]
Type=simple
ExecStart=/usr/bin/rclone mount update: /home/update \
 --umask 0000 \
 --default-permissions \
 --allow-non-empty \
 --allow-other \
 --buffer-size 32M \
 --dir-cache-time 12h \
 --vfs-read-chunk-size 64M \
 --vfs-read-chunk-size-limit 1G
ExecStop=/bin/fusermount -u LocalFolder
Restart=on-abort
User=root

[Install]
WantedBy=default.target
EOF
```

## 挂载多个盘

这里是优化版本

```bash
cat > /etc/systemd/system/rclone@.service <<EOF
[Unit]
Description=rclone mount %I drive
After=network.target
[Service]
Type=simple
ExecStart=/usr/bin/rclone mount %i: /home/%i --use-mmap --umask 000 --default-permissions --no-check-certificate --allow-other --allow-non-empty --dir-cache-time 24h --cache-dir=/home/cache --vfs-cache-mode full --buffer-size 256M --vfs-read-ahead 512M --vfs-read-chunk-size 32M --vfs-read-chunk-size-limit 128M --vfs-cache-max-size 20G --low-level-retries 200 --config /root/.config/rclone/rclone.conf
[Install]
WantedBy=multi-user.target
EOF
```

```bash
for a in `grep '^\[' /root/.config/rclone/rclone.conf`
do
    b=${a:1:-1}
    [ ! -d "/home/${b}" ] && mkdir /home/${b}
    systemctl enable rclone@${b}
    systemctl start rclone@${b}
done
```

## 取消挂载

```bash
for a in `grep '^\[' /root/.config/rclone/rclone.conf`
do
    b=${a:1:-1}
    systemctl disable rclone@${b}

done
```

```bash
for a in `grep '^\[' /root/.config/rclone/rclone.conf`
do
   b=${a:1:-1}
    umount  /home/${b}

done
```

其他卸载硬盘

```bash
	fusermount -qzu /home
```

## 查看是否挂载成功

```bash
df -h
```

## 遇到过 EMBY 权限问题

```bash
sudo chmod -R 777 /var/lib/emby
```

## 安装 EMBY

去[EMBY 下载页](https://emby.media/download.html)复制对应的下载链接

```bash
apt-get install wget && wget https://github.com/MediaBrowser/Emby.Releases/releases/download/4.7.6.0/emby-server-deb_4.7.6.0_amd64.deb
```

```bash
dpkg -i emby-server-deb_4.7.6.0_amd64.deb
```

## 卸载 EMBY

```
apt remove emby-server
```

## 使用Docker安装开新版

```bash
docker run -d -e PUID=1000 -e PGID=1000 -v /home:/home -v /root/emby:/config -p 8096:8096 -p 8920:8920 --name=emby xinjiawei1/emby_unlockd:latest
```
我自己购买了`Premiere`版本，如果你喜欢 `Emby`，请购买支持正版 `Emby Premiere`！

如果 rclone 挂载资源盘，EMBY 安装都没有问题，就可以愉快的观影了，效果如下：
![](https://yt-card-system.oss-cn-beijing.aliyuncs.com/blog/in_post/emby/emby.png)
enjoy~


补充：
## 指定域名或IP走软路由
如果emby服务器线路质量不太好，可以指定域名与IP挂代理访问观看，可以提升观影质量。

```
- DOMAIN,xx.imetyou.com,🔰 节点选择
- DOMAIN,xxpilipili.emby.com,🔰 节点选择
- DOMAIN,two.mulgore.net,🔰 节点选择
- IP-CIDR,xxx.xxx.xxx.xxx/8,🔰 节点选择
```

# 参考

[^1]: [VPS 搭建 EMBY & 挂载 Google Drive 搭建自己的媒体中心](https://www.unvone.com/71884.html)
[^2]: [NetCUP：自建 EMBY 最具性价比服务器购买指南](https://mrchou.com/topic/buy-a-netcup-server-for-emby.html)
[^3]: [再来谈谈 Emby+Google Drive 的私人影视库搭建](https://mrchou.com/internet/lets-talk-about-private-media-library-build-by-emby-and-google-drive.html)
[^4]: [Emby 公益服推荐—全网最全集合](https://zhuanlan.zhihu.com/p/441468707)
[^5]: [GoIndex - 无服务器架构 Google Drive 目录索引程序](https://p3terx.com/archives/goindex-google-drive-directory-index.html)
[^6]: [重新学习并解锁破解emby4.6.7,4.7.*版本](https://blog.peos.cn/2022/08/12/emby467-emby47.html)
[^7]: [群晖：EMBY解锁Premiere的方法](https://csyan.cn/2021/08/%E7%BE%A4%E6%99%96%EF%BC%9Aemby%E8%A7%A3%E9%94%81premiere%E7%9A%84%E6%96%B9%E6%B3%95.html)
