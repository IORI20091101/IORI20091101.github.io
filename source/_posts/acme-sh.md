---
layout: post
title: 申请HTTPS证书
subtitle: Babel简单配置
date: 2022-09-07
author: "toshiba"
index_img: https://yt-card-system.oss-cn-beijing.aliyuncs.com/blog/index-img/acme.png
comments: true

tags:
  - web
  - https
categories:
  - https
---

## 申请证书方式

最近博客的 HTTPS 证书到期了，捣鼓一下证书的问题。因为用的免费证书品牌 Let’s Encrypt，所以有两种申请方式。

### acme.sh

acme.sh 是一个知名的用于申请 Let’s Encrypt 证书的开源项目，也是属于脚本类型，有比较详细的文档，支持自动化更新和自动化部署。唯一缺点，如果有更新后自动部署至多个节点的需求的话，acme.sh 无法满足。如果你有一定的命令行使用经验，acme.sh 使用起来还是非常方便，强烈推荐！关于更新后自动部署至多个节点的需求，建议使用下面介绍的 ohttps。

该方法通过[官方文档](https://github.com/acmesh-official/acme.sh/wiki/%E8%AF%B4%E6%98%8E)可以快速生成证书但是可能有些点需要注意一下

```bash
# 获取脚本
curl  https://get.acme.sh | sh -s email=my@example.com

#该脚本执行了两个操作
#一、把 acme.sh 安装到你的 home 目录下: ~/.acme.sh/ 并创建 一个 bash 的 alias, 方便你的使用: alias acme.sh=~/.acme.sh/acme.sh

#二、自动为你创建 cronjob, 每天 0:00 点自动检测所有的证书, 如果快过期了, 需要更新, 则会自动更新证书.更高级的安装选项请参考: https://github.com/Neilpang/acme.sh/wiki/How-to-install

# 可以放心的是安装过程不会污染已有的系统任何功能和文件, 所有的修改都限制在安装目录中: ~/.acme.sh/

# 生成证书
# 生成证书也有两种方式  http方式跟手动dns方式
# http方式以nginx为例
#前提是nginx安装完成输入域名能够正常访问nginx欢迎页面
acme.sh --issue  -d mydomain.com   --nginx

# 复制/安装证书
acme.sh --install-cert -d yun.sdongzhi.com \
--key-file       /etc/nginx/ssl/yun/sdongzhi.com.key  \
--fullchain-file /etc/nginx/ssl/yun/fullchain.cer \
--reloadcmd     "service nginx force-reload"
```

### 遇到的问题和注意点

1. 遇到错误 Can not find conf file for domain 查看 nginx.conf 配置 server*name *: 需要改成 server_name [example.com](http://example.com) 或者 conf.d 下面引入 example.com.conf 的配置 server_name
2. ssl_certificate 使用 /etc/nginx/ssl/fullchain.cer ，而非 /etc/nginx/ssl/<domain>.cer

3, 注释掉 nginx.conf 中的 includes xxx.conf

### acme.sh 脚本手动 dns 方式

手动在域名上添加一条 txt 解析记录, 验证域名所有权.这种方式的好处是, 你不需要任何服务器, 不需要任何公网 ip, 只需要 dns 的解析记录即可完成验证. 坏处是，如果不同时配置 Automatic DNS API，使用这种方式 [acme.sh](http://acme.sh/) 将无法自动更新证书，每次都需要手动再次重新解析验证域名所有权。

```bash
acme.sh  --issue  --dns   -d mydomain.com \
 --yes-I-know-dns-manual-mode-enough-go-ahead-please

acme.sh  --renew   -d mydomain.com \
  --yes-I-know-dns-manual-mode-enough-go-ahead-please
```

### [acme.sh](http://acme.sh) 域名解析商的自动集成方式

根据文档自动集成 [https://github.com/acmesh-official/acme.sh/wiki/dnsapi](https://github.com/acmesh-official/acme.sh/wiki/dnsapi)

## [**ohttps.com**](http://ohttps.com/)

这种方式更简单，只需要注册登录[官方网站](https://ohttps.com/)安装推荐方式一步步生成即可得到证书。

可申请 Let’s Encrypt 免费通配符类型证书，还提供了证书吊销、到期前提醒、自动更新、自动部署功能。另外比 acme.sh 增加了一些非常实用的功能，主要包括可自动部署至阿里云、腾讯云、七牛云的负载均衡、内容分发 CDN、SSL 证书列表等，并可自动部署至多个 nginx 容器中。如果你有在证书更新后自动部署至多个不同节点的需求，使用http://ohttps.com就对了，在这里强烈推荐大家使用http://ohttps.com申请和管理Let’s Encrypt 颁发的免费 HTTPS 证书。

唯一遇到的问题就是添加 CNAME 记录的时候，因为我的域名在 [https://www.gandi.net/zh-Hans](https://www.gandi.net/zh-Hans) 托管添加记录的时候后面要多带一个. 要不然不会生效 比如

- 主机名：\_acme-challenge.donfuffy.com
- 记录类型：CNAME
- 记录值： \_acme-challenge.xlpm40g7wk05n9gz.ohttps.com 这里需要写成 \_acme-challenge.xlpm40g7wk05n9gz.ohttps.com. 后面需要带一个点这个应该是域名托管服务商的问题

### Nginx 配置

```bash
upstream myproject {
    server xx.xx.xx.xx:4000;
}
server {
    listen 80;
    listen [::]:80;
    server_name sdongzhi.com;

    # Redirect all HTTP requests to HTTPS with a 301 Moved Permanently response.
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name sdongzhi.com;
    root         /usr/share/nginx/html;
    ssl_certificate "/etc/nginx/ssl/fullchain.cer";
    ssl_certificate_key "/etc/nginx/ssl/sdongzhi.com.key";
    ssl_session_cache shared:SSL:1m;
    ssl_session_timeout  10m;
    # access_log /var/log/nginx/darknights.me.log main;

    # certs sent to the client in SERVER HELLO are concatenated in ssl_certificate

    # intermediate configuration. tweak to your needs.
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers 'ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA:ECDHE-RSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-RSA-AES256-SHA256:DHE-RSA-AES256-SHA:ECDHE-ECDSA-DES-CBC3-SHA:ECDHE-RSA-DES-CBC3-SHA:EDH-RSA-DES-CBC3-SHA:AES128-GCM-SHA256:AES256-GCM-SHA384:AES128-SHA256:AES256-SHA256:AES128-SHA:AES256-SHA:DES-CBC3-SHA:!DSS';
    ssl_prefer_server_ciphers on;

    # HSTS (ngx_http_headers_module is required) (15768000 seconds = 6 months)
    add_header Strict-Transport-Security max-age=15768000;

    # OCSP Stapling ---
    # fetch OCSP records from URL in ssl_certificate and cache them

    ## verify chain of trust of OCSP response using Root CA and Intermediate certs

    location / {

        log_not_found on;

        #禁止Scrapy等工具的抓取
        if ($http_user_agent ~* (Scrapy|Curl|HttpClient)) {
            return 403;
        }
        #禁止指定UA及UA为空的访问
        if ($http_user_agent ~ "FeedDemon|Indy Library|Alexa Toolbar|AskTbFXTV|AhrefsBot|CrawlDaddy|CoolpadWebkit|Java|Feedly|UniversalFeedParser|ApacheBench|Microsoft URL Control|Swiftbot|ZmEu|oBot|jaunty|Python-urllib|lightDeckReports Bot|YYSpider|DigExt|HttpClient|MJ12bot|heritrix|EasouSpider|Ezooms|^$" ) {
            return 403;
        }
        #禁止非GET|HEAD|POST方式的抓取
        if ($request_method !~ ^(GET|HEAD|POST)$) {
            return 403;
        }

        proxy_pass http://myproject;
        proxy_read_timeout 300;
        proxy_connect_timeout 300;
        proxy_redirect off;

        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Host              $http_host;
        proxy_set_header X-Real-IP         $remote_addr;
    }
}
```

### dnsapi

在`Trojan一键安装脚本`的文章里补充了根据`dnsapi`来申请证书。
