---
title: Nginx共用443端口
subtitle: Nginx共用443端口
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









[^1]: [Trojan 共用 443 端口方案](https://www.chengxiaobai.com/trouble-maker/trojan-shared-443-port-scheme)
[^2]: [VPS 初体验（四）trojan 和 Nginx 共用 443 端口](https://kiku.vip/2021/10/17/trojan%20%E5%92%8C%20Nginx%20%E5%85%B1%E7%94%A8%20443%20%E7%AB%AF%E5%8F%A3/)
[^3]: [Xray通过SNI回落功能实现伪装与按域名分流](https://qoant.com/2021/04/xray-fallbacks-sni/)
