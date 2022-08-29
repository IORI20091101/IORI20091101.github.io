---
title: Nginx共用443端口
subtitle: Nginx共用443端口记录一下个人博客的配置
date: 2022-08-25 15:23:52
index_img: https://yt-card-system.oss-cn-beijing.aliyuncs.com/blog/index-img/nginx.png
author:     "toshiba"
comments: true
tags :
    - Nginx
    - 运维
categories:
    - Nginx
---

# Nginx共享443端口
最近把自己的博客重新捣鼓了一下换成了现在这个主题，但是只放一个博客又有点浪费所以又搭建了一个 {% label primary @Trojan %}，那么问题来了，博客与{% label primary @Trojan %}都需要占用443端口,如何才能满足条件呢？
以我博客的域名为例;
{% note success %}
sdongzhi.com
{% endnote %}

## 同一个域名
如果将主域名走{% label primary @Trojan %},{% label primary @remote_addr %}走博客对应的端口,这样可以满足非正常流量走443，正常的流量走博客，缺点就是同一个域名，而且把流量转发这个功能交给{% label primary @Trojan %}感觉并不可靠，引用大佬的话[^1]
>虽然 Trojan 提供了「非标请求」的转发功能，但是毕竟是一个新生事物，所有流量都过它手，在稳定、性能、灵活等等方面都不够好，而且还不支持 TLS 转发

## 不同的域名
我们将转发的功能交给{% label primary @Nginx %},由它来控制流量的转发，有多个子域名让不同的子域名来做不同的事情,比如：

| 域名           | 功能   |
| :--------:    | :-----:  |
| sdongzhi.com  | 显示博客 |
| cloud.sdongzhi.com  |  转发Trojan流量同时作为伪装做一个网盘服务   |
| v2ray.sdongzhi.com |  来转发vmess流量   |


对于普通的服务，我们通过 {% label primary @server_name %} 字段来对应不同的域名，然后通过 {% label primary @proxy_pass %}进行 {% label primary @https %}反向代理，但是 {% label primary @Trojan %}无法通过 {% label primary @proxy_pass %} 反代
>Nginx 支持基于 SNI 的 4 层转发。简单说就是：识别 SNI 信息，然后直接转发 TCP/UDP 数据流。这个可以比 7 层的虚拟主机转发厉害太多了，该功能由 ngx_stream_ssl_preread_module 模块提供，但是 Nginx 默认不启用该模块，配置起来也很简单，需要注意的是该模块属于 stream ，不是大家常用的 http。

所以根据[程小白大佬](https://www.chengxiaobai.com/trouble-maker/trojan-shared-443-port-scheme)的设置，我将自己的配置记录如下：

```nginx

# 流量转发核心配置
stream {
    # 这里就是 SNI 识别，将域名映射成一个配置名
    map $ssl_preread_server_name $backend_name {
        sdongzhi.com web;
        cloud.sdongzhi.com proxy_trojan;
        default web;
    }

    # web，配置转发详情
    upstream web {
        server 127.0.0.1:10443;
    }

    # trojan，配置转发详情
    upstream trojan {
        server 127.0.0.1:10241;
    }

    upstream proxy_trojan {
        server 127.0.0.1:10249;
    }


    # 监听 443 并开启 ssl_preread
    server {
        listen 443 reuseport;
        listen [::]:443 reuseport;
        proxy_pass  $backend_name;
        proxy_protocol on;
        ssl_preread on;
    }

    # 这里的 server 就是用来帮 Trojan 卸载代理协议的中间层
  	# 原来的 upstream trojan 配置不需要改动
    server {
        listen 10249 proxy_protocol;
        proxy_pass  trojan;
    }
}

```

网站的nginx配置如下：

```nginx
server {
    listen 80;
    listen 10443 ssl http2 proxy_protocol;
    server_name sdongzhi.com;
    ssl_certificate      /root/.acme.sh/sdongzhi.com/fullchain.cer;
    ssl_certificate_key  /root/.acme.sh/sdongzhi.com/sdongzhi.com.key;

    port_in_redirect off;
    gzip on;
    gzip_http_version 1.1;
    gzip_vary on;
    gzip_comp_level 6;
    gzip_proxied any;
    gzip_types text/plain text/css application/json application/javascript application/x-javascript text/javascript;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_session_cache    shared:SSL:1m;
    ssl_session_timeout  5m;
    ssl_ciphers  HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers  on;


    if ($ssl_protocol = "") {
        return 301 https://$host$request_uri;
    }

    #root /usr/share/nginx/html;
    #index index.html;
    location / {
        proxy_pass http://127.0.0.1:8080;
    }

}
```
这样网站的{% label primary @sdongzhi.com %} 走进这里， {% label primary @cloud.sdongzhi.com %}会进{% label primary @Trojan %}通过 {% label primary @Trojan %}来分发，{% label primary @remote_addr %}我搭建了一个网盘服务来做伪装



# 参考

[^1]: [Trojan 共用 443 端口方案](https://www.chengxiaobai.com/trouble-maker/trojan-shared-443-port-scheme)
[^2]: [VPS 初体验（四）trojan 和 Nginx 共用 443 端口](https://kiku.vip/2021/10/17/trojan%20%E5%92%8C%20Nginx%20%E5%85%B1%E7%94%A8%20443%20%E7%AB%AF%E5%8F%A3/)
[^3]: [Xray通过SNI回落功能实现伪装与按域名分流](https://qoant.com/2021/04/xray-fallbacks-sni/)
