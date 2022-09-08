---
layout: post
title: Trojan一键安装脚本
subtitle: 在VPS上安装使用x-ui、Trojan、Trojan-go
date: 2022-09-08
author: "toshiba"
index_img: https://yt-card-system.oss-cn-beijing.aliyuncs.com/blog/index-img/trojan.jpeg
comments: true
tags:
  - Trojan
  - 网络
categories:
  - 网络
---

# 准备工作

## 一台 vps

海外`VPS`,这里推荐搬瓦工的`CN2 GIA`线路，或者有针对大陆网络优化的线路。

## 一个域名并做好解析

> - freenom 免费域名
> - Namesilo
> - gandi.net
> - GoDaddy

选一个顺眼又便宜的即可

## 域名证书

使用[{% label primary @acme.sh %}](https://github.com/acmesh-official/acme.sh/wiki/%E8%AF%B4%E6%98%8E)脚本来生成免费证书，

#### 安装 nginx

```bash
apt install nginx
```

#### 安装 acme：

```bash
curl https://get.acme.sh | sh
```

#### 添加软链接：

```bash
ln -s /root/.acme.sh/acme.sh /usr/local/bin/acme.sh
```

#### 切换 CA 机构：

```bash
acme.sh --set-default-ca --server letsencrypt
```

#### 申请证书：

```bash
acme.sh --issue -d 你的域名 -k ec-256 --webroot /var/www/html
```

#### 安装证书：

```bash
acme.sh --install-cert -d 你的域名 --ecc --key-file       /etc/x-ui/server.key  --fullchain-file /etc/x-ui/server.crt --reloadcmd "systemctl force-reload nginx"
```

由于我使用的`Gandi`，所以我生成证书的方式如下：

```bash
export GANDI_LIVEDNS_KEY="fdmlfsdklmfdkmqsdfk"
```

```bash
./acme.sh --issue --dns dns_gandi_livedns -d example.com -d www.example.com

```

# 安装 x-ui 面板

```bash
bash <(curl -Ls https://raw.githubusercontent.com/vaxilu/x-ui/master/install.sh)
```

# 安装 Trojan

## 官方脚本

推荐使用[官方脚本](https://github.com/trojan-gfw/trojan)安装，免去挖矿风险

```bash
apt install sudo  #debian
yum install sudo  #contos
```

```bash
sudo bash -c "$(curl -fsSL https://raw.githubusercontent.com/trojan-gfw/trojan-quickstart/master/trojan-quickstart.sh)"

```

{% note success %}
官方脚本需要自己设置服务器配置，包括密码、证书等，设置路径为： /usr/local/etc/trojan.config.json
{% endnote %}

## Trojan 面板脚本

#### 安装

```bash
source <(curl -sL https://git.io/trojan-install)
```

#### 卸载

```bash
source <(curl -sL https://git.io/trojan-install) --remove
```

# 安装 Trojan-go

项目地址：[trojan-go](https://github.com/p4gefau1t/trojan-go)，首先从[这里](https://github.com/p4gefau1t/trojan-go/releases/)找到对应系统版本的链接，比如`ubuntu`对应[trojan-go-linux-amd64.zip](https://github.com/p4gefau1t/trojan-go/releases/download/v0.10.6/trojan-go-linux-amd64.zip)

#### 下载：

```bash
wget https://github.com/p4gefau1t/trojan-go/releases/download/v0.10.6/trojan-go-linux-amd64.zip
```

#### 安装：

```bash
unzip -o trojan-go-linux-amd64.zip -d /usr/local/bin/trojan-go
```

#### 删除安装包：

```bash
rm trojan-go-linux-amd64.zip
```

#### 设置一个`service`

```bash
vim /etc/systemd/system/trojan-go.service
```

#### 添加如下内容：

原本的配置文件地址是`/usr/local/etc/trojan-go/config.json`,为了方便把它修改成`/etc/trojan-go/config.json`

```bash
[Unit]
Description=Trojan-Go
After=network.target nss-lookup.target
Wants=network-online.target

[Service]
Type=simple
User=root
ExecStart=/usr/local/bin/trojan-go/trojan-go -config /etc/trojan-go/config.json
Restart=on-failure
RestartSec=15

[Install]
WantedBy=multi-user.target
```

#### 创建配置文件

```bash
mkdir -p /etc/trojan-go
```

```bash
vim /etc/trojan-go/config.json
```

#### 输入如下内容：

```json
{
  "run_type": "server",
  "local_addr": "0.0.0.0",
  "local_port": 443,
  "remote_addr": "127.0.0.1",
  "remote_port": 80,
  "password": ["fuckgfw"],
  "ssl": {
    "cert": "/etc/ssl/certs/example.com.cer",
    "key": "/etc/ssl/certs/example.com.key",
    "sni": "example.com"
  },
  "router": {
    "enabled": true,
    "block": ["geoip:private"]
  }
}
```

#### 启动服务

```bash
systemctl enable trojan-go
systemctl start trojan-go
```

# 一键安装最新内核并开启 BBR 脚本

这个要不要开仁者见仁，这里用的秋水逸冰[^2]的脚本

```bash
wget --no-check-certificate -O /opt/bbr.sh https://github.com/teddysun/across/raw/master/bbr.sh
```

```bash
chmod 755 /opt/bbr.sh
```

```bash
/opt/bbr.sh
```

#### 查看内核

```bash
uname -r
```

查看内核版本，显示为新版内核就表示 OK 了。然后经过下面几步验证一下

#### step1

```bash
# 输入
sysctl net.ipv4.tcp_available_congestion_control

# 返回值
net.ipv4.tcp_available_congestion_control = bbr cubic reno
# 或者
net.ipv4.tcp_available_congestion_control = reno cubic bbr
```

#### step2

```bash
# 输入
sysctl net.ipv4.tcp_congestion_control

# 返回值
net.ipv4.tcp_congestion_control = bbr
```

#### step3

```bash
# 输入
sysctl net.core.default_qdisc

# 返回值
net.core.default_qdisc = fq
```

#### step4

```bash
# 输入
lsmod | grep bbr

# 返回值
tcp_bbr                20480  3
```

# 参考

[^1]: [x-ui 面板实现单端口多用户合租](https://bulianglin.com/archives/nicename.html)
[^2]: [一键安装最新内核并开启 BBR 脚本](https://teddysun.com/489.html)
