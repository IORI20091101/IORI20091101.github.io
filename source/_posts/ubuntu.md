---
layout: post
title: ubuntu的常用命令
subtitle: 记录一些ubuntu常用命令
date: 2023-02-09 15:53:03
author: "toshiba"
index_img: https://yt-card-system.oss-cn-beijing.aliyuncs.com/blog/index-img/ubuntu.jpeg
comments: true
tags:
  - ubuntu
  - 系统
categories:
  - ubuntu
---


# 压缩文件夹

```bash
tar zcvf  emby0207.data emby
```

# 解压缩文件夹

```bash
tar zxvf  emby0207.data
```


# 修改主机名
```bash
hostnamectl set-hostname openwrt
```

# 查找文件夹位置
```bash
find ~ -name "emby0115.data" -print
```



# 查看文件大小信息
```bash
# ls -hl file
# e.g.
ls -hl ~/.bashrc
```

# 查看目录大小信息

```bash
# du -h --max-depth=1 folder
# e.g.
du -h --max-depth=1 ~/Music/
```

# 查看磁盘大小信息

```bash
# df -hl disk
# e.g.
df -hl /dev/sda1
```