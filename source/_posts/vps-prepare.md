---
layout: post
title: 新购VPS的一些初始化设置
subtitle: 最近买了一些vps，需要一些常规设置，记录一些常用命令
date: 2022-09-08 15:53:03
author: "toshiba"
index_img: https://yt-card-system.oss-cn-beijing.aliyuncs.com/blog/index-img/vps.png
comments: true
tags:
  - VPS
  - ubuntu
  - 系统
categories:
  - VPS
---

最近买了一些`VPS`做测试,会用到一些常用设置，在这里记录一下

# 开启密钥登陆

#### 本地制作密钥对

```bash
ssh-keygen -t rsa -C "youremail@example.com"
```

或者

```bash
ssh-keygen -t ed25519
```

将本地公钥导入远程`VPS`的 {% label primary @/root/.ssh/authorized_keys %},第一次可能要输入密码

```bash
ssh-copy-id root@example.sdongzhi.com
```

#### 设置密钥登陆

先登录到 VPS 上,编辑{% label primary @/etc/ssh/sshd_config %}文件,找到以下字段进行修改

```bash
vi /etc/ssh/sshd_config


RSAAuthentication yes
PubkeyAuthentication yes
PermitRootLogin yes
#AuthorizedKeysFile	.ssh/authorized_keys .ssh/authorized_keys2
```

尝试如果可以免密码登陆的话，禁用密码登录

```bash
PasswordAuthentication no
```

重启`SSH`服务

```bash
service sshd restart
```

# 安装 `Docker`

# 安装 `docker-compose`

# 参考

[^1]: [Docker-从入门到实践](https://yeasy.gitbook.io/docker_practice/install/ubuntu)
