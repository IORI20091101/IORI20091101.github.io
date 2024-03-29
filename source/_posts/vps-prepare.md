---
layout: post
title: 新购VPS的一些初始化设置
subtitle: 最近买了一些vps，需要一些常规设置，记录一些常用命令
date: 2022-09-08 15:53:03
author: "toshiba"
index_img: https://yt-card-system.oss-cn-beijing.aliyuncs.com/blog/index_img/vps.png
comments: true
tags:
  - VPS
  - ubuntu
  - 系统
categories:
  - VPS

sticky: 1
---

最近买了一些`VPS`做测试,会用到一些常用设置，在这里记录一下


# 更换ubuntu软件源
Ubuntu配置的默认源并不是国内的服务器，下载更新软件都比较慢。首先备份源列表文件sources.list：
```bash
# 首先备份源列表
sudo cp /etc/apt/sources.list /etc/apt/sources.list_backup
```

打开sources.list文件修改,选择合适的源，替换原文件的内容，保存编辑好的文件, 以阿里云更新服务器为例（可以分别测试阿里云、清华、中科大、163源的速度，选择最快的）

```bash
sudo vi /etc/apt/sources.list
```
```bash
deb http://mirrors.aliyun.com/ubuntu/ bionic main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ bionic-security main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ bionic-updates main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ bionic-proposed main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ bionic-backports main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-security main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-updates main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-proposed main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-backports main restricted universe multiverse
```

刷新源

```bash
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install build-essential
```


# 允许root用户登陆
```bash
sudo vim /etc/ssh/sshd_config  
# PermitRootLogin yes

sudo passwd root

sudo  systemctl  restart  ssh

```

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

#### 卸载旧版本

```bash
  sudo apt-get remove docker \
               docker-engine \
               docker.io
```

#### 使用 APT 安装

```bash
  sudo apt-get update
```

```bash
  sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
```

#### 添加软件源的 GPG 密钥

为了确认所下载软件包的合法性，需要添加软件源的 GPG 密钥。如果是国内

```bash
curl -fsSL https://mirrors.aliyun.com/docker-ce/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
```

如果是国外

```bash
# 官方源
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
```

### 添加 Docker 软件源

sources.list 中添加 Docker 软件源

国内：

```bash
echo \
  "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://mirrors.aliyun.com/docker-ce/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

国外:

```bash
# 官方源
echo \
  "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

#### 安装 Docker

```bash
sudo apt-get update
```

```bash
sudo apt-get install docker-ce docker-ce-cli containerd.io
```

#### 使用脚本安装 Docker

获取安装脚本

```bash
curl -fsSL get.docker.com -o get-docker.sh
```

执行安装

```bash
sudo sh get-docker.sh --mirror Aliyun
# sudo sh get-docker.sh --mirror AzureChinaCloud
```

#### 启动 Docker

```bash
sudo systemctl enable docker
sudo systemctl start docker
```

# 安装 `docker-compose`

在 Linux 上的也安装十分简单，从 官方 [GitHub Release](https://github.com/docker/compose/releases) 处直接下载编译好的二进制文件即可。
例如，在 Linux 64 位系统上直接下载对应的二进制包。

```bash
sudo curl -L https://github.com/docker/compose/releases/download/1.27.4/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose

# 国内用户可以使用以下方式加快下载
sudo curl -L https://download.fastgit.org/docker/compose/releases/download/1.27.4/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose

sudo chmod +x /usr/local/bin/docker-compose
```

#### 卸载 Docker compose

```bash
sudo rm /usr/local/bin/docker-compose
```


# Ubuntu安装 `smb`服务
最近阿里云`WebDAV`服务貌似不稳定，所以通过[CloudDrive2](https://hub.docker.com/r/cloudnas/clouddrive2-unstable),来挂载阿里云盘然后功过`smb`协议来共享播发

```bash
sudo apt install samba
```
备份旧文件
```bash
sudo cp /etc/samba/smb.conf /etc/samba/smb.conf.back
```
编辑`smb.conf`
```bash
sudo vim /etc/samba/smb.conf
```
输入一下内容
```bash
[shared]
    comment=luhuadong
    path=/home/aliyun/videos
    browseable=yes
    writable=yes
    guest ok=yes
```

给smb服务添加访问用户并设置密码
```bash
sudo smbpasswd -a $USER
# sudo smbpasswd -a root

```
重启服务
```bash
sudo systemctl restart smbd
sudo systemctl restart nmbd
```

访问 Samba 服务

输入 `smb://your-ip/shared/` 即可访问分享的硬盘。




# ubuntu常用命令

## 压缩文件夹

```bash
tar zcvf  emby0207.data emby
```

## 解压缩文件夹

```bash
tar zxvf  emby0207.data
```


## 修改主机名
```bash
hostnamectl set-hostname openwrt
```

## 查找文件夹位置
```bash
find ~ -name "emby0115.data" -print
```



## 查看文件大小信息
```bash
# ls -hl file
# e.g.
ls -hl ~/.bashrc
```

## 查看目录大小信息

```bash
# du -h --max-depth=1 folder
# e.g.
du -h --max-depth=1 ~/Music/
```

## 查看磁盘大小信息

```bash
# df -hl disk
# e.g.
df -hl /dev/sda1
```

## Docker无法停止的问题
错误信息如下
```bash
Error response from daemon: cannot stop container
```

解决方式：

第一步，Get the container id
```bash
docker ps
```

第二步，Get the containerd-shim process id
```bash
sudo ps awx | grep containerd-shim | grep <<container_id>> | awk '{print $1}'
```

第三步， kill the process id

```bash
sudo kill -9 <<process_id>>
```



# 参考

[^1]: [Docker-从入门到实践](https://yeasy.gitbook.io/docker_practice/install/ubuntu)
[^2]: [vps ping 测试、去程/回程路由跟踪、vps 一键测试脚本](https://v2xtls.org/vps-ping%e6%b5%8b%e8%af%95%e3%80%81%e5%8e%bb%e7%a8%8b-%e5%9b%9e%e7%a8%8b%e8%b7%af%e7%94%b1%e8%b7%9f%e8%b8%aa%e3%80%81vps%e4%b8%80%e9%94%ae%e6%b5%8b%e8%af%95%e8%84%9a%e6%9c%ac/)
