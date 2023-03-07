---
layout: post
title: Gen8服务器相关
subtitle: Gen8服务器相关折腾流水账
date: 2023-01-15
author: "toshiba"
index_img: https://yt-card-system.oss-cn-beijing.aliyuncs.com/blog/index-img/gen8.jpg
comments: true

tags:
  - Gen8
  - 服务器
  - homelab
categories:
  - 页面布局
---

# 由来
很久之前就想搞一个`Nas`，实现观影自由，在这之前看了好多比如`蜗牛星际`之类的，加上上双网卡可以上软路由，一度非常心动。在这之前我只有一个一百多块的`N1`，刷了`Openwrt`一直用着挺好，可以实现京东自动签到，科学等功能，甚至还能跑`Docker`， 后来家里宽带提速了我发现`N1`有点跟不上，虽然论坛说它跑满500M带宽没有问题，实际使用还是有点差距的。啰嗦了这么多总结一下需求：
* 软路由最好有`Openwrt`实现科学
* `Nas`可以安装黑群晖
* 可以安装`Ubuntu`跑一些服务脚本

`蜗牛星际`本来是我的首选，后来朋友[漠然](https://mritd.me/)告诉我，还是`Gen8`作为家庭服务器要稳定一些他家里有一台跑着很好，而且噪音也比`Gen10 Plus`要小很多，我一想也是怕矿渣不够稳定，所以就上了目前这台服务器，使用到现在还是很满意的，并没有`all in boom`.

# ESXi
`Gen8`底层安装了`ESXi`虚拟机软件，然后分别安装了

* 黑群晖
* Ubuntu Server
* OpenWrt
* Windows Server


## {% label primary @Openwrt %}
`OpenWrt`安装了`iStoreOS`, 主要用到了`OpenClash`来做科学， 挂载了阿里云`WebDAV`用来看电影，同时安装了组网工具`ZeroTier`和`TailScale`,虽然也能够跑`Docker`，但是一个路由系统还是尽量简单点做好份内事情就可以。

### 公网无法访问的问题
我家里有公网IP，但是我发现如果主路由代理到openwrt后，局域网内服务重启就无法再通过公网域名访问到了，所以尽量不去修改主路由的dns跟网关，需要设置代理的设备请自行设置，否则会出现公网无法访问的问题。


## {% label primary @Ubuntu Server %}
`ubuntu`中，使用docker安装了青龙面板来做京东一些签到任务，然后安装了`ShellClash`，本来已经有了软路由这里安装这个是为了使用`Rclone`挂载 `Google Drive`的共享盘，本地能够挂载了就可以安装`Emby`看谷歌盘里的资源了大概有个几百T。

## {% label primary @群晖 %}
虚拟机中安装黑群晖的好处是没有兼容性问题，而且可以自由升级不像蜗牛星际安装好了升级可能会有兼容性问题。
安装用到了这个项目[arpl](https://github.com/fbelavenuto/arpl)，上传到`ESXi`路径下自动启动，主要做好配置即可，主要选一下型号版本
![](https://yt-card-system.oss-cn-beijing.aliyuncs.com/blog/in-post/gen8/synology.png)
做好以上配置即可，序列号跟mac地址可以在淘宝购买。

### 硬盘直通
还有一个硬盘直通的问题，将插入的硬盘通过`ESXi`直通给黑群晖才能够识别
```bash
vmkfstools -z /vmfs/devices/disks/xxxxxxxxxxxxxxxx  虚拟机目录/hdd1.vmdk
```
比如我的群晖直通了这样四块硬盘
```bash
vmkfstools -z /vmfs/devices/disks/t10.ATA_____ST6000VN0012D2BB186__________________________________ZR14FY6S  /vmfs/volumes/datastore1/XPEnology/hdd1.vmdk
```

### 友好关机工具
防止类似突然断电的关机导致数据有问题，朋友封装了一个docker工具，发起关机命令来友好关机
```bash
docker run -dt --cgroupns host --pid host --network host --restart always --name open-vm-tools -v /root/.ssh:/root/.ssh mritd/open-vm-tools
```



### 观影服务

![](https://yt-card-system.oss-cn-beijing.aliyuncs.com/blog/in-post/gen8/docker.png)
观影主要安装了`nas-tools`等一堆docker服务目前可以实现
![](https://yt-card-system.oss-cn-beijing.aliyuncs.com/blog/in-post/gen8/nastools.png)
实现了添加关注即可自动下载到对应分类，豆瓣点击想看可以自动下载等等功能，网上还有其他一些追影方式，由于实在精力有限就不去探索了，有机会再去尝试。

由于本文涉及的链条过于长，一些系统跟服务到安装就没有写详细的教程了，网上都有现成的教程，这里就不赘述了，我这里主要用来记录一下自己折腾的过程。

# 参考


[^1]: [群晖 + Nas-Tools 一个懂事的媒体库](http://www.liuocean.com/2022/09/12/qun-hui-nastools-yi-ge-dong-shi-de-mei-ti-ku/)
[^2]: [安装NAS Tools，打造自动化观影、追剧系统，NAS媒体库整理工具，威联通Docker版NAS Tools安装教程~feat.威联通HS 264](https://www.youtube.com/watch?v=kUOelSHhfto&list=LL&index=2)

