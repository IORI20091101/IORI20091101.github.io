---
layout: post
title: Shield TV激活与联网
subtitle: Shield TV激活与联网
date: 2022-08-22
author: "toshiba"
index_img: https://yt-card-system.oss-cn-beijing.aliyuncs.com/blog/index_img/shield.jpeg
comments: true
tags:
  - Shield TV
  - 电视盒子
categories:
  - 娱乐
  - 电视盒子
---

# Shield TV

最早接触这个是看好多 up 主的推荐，作为传说中最强的电视盒子，也的确不让人失望，安卓系统既能兼顾爱优腾，又能使用{% label primary @Netflix %}或者{% label primary @Disney+ %}等等资源丰富的流媒体，可谓看片神器一点都不夸张。

# 使用

{% label primary @Shield TV %}本身就是一个安卓盒子，所以用起来没什么特别的，只有一开始激活的时候需要科学上网环境。 这里我建议购买的时候让商家直接激活，这样会免去后续许多麻烦。我购买的是未激活版本的所以需要全程科学上网环境否则会出现网络无法连接的问题。

## 首次激活无法联网

我家里有一个安装了{% label primary @openwrt %}的 N1 旁路由，但是一直激活不成功，我将主路由的网关跟 dns 都指向了 N1，然后使用的{% label primary @openclash %}来进行科学上网，使用了 Fake-IP 模式然后选择了全局科学都没有成功， 后来换了一个{% label primary @Shadowsocksr Plus+ %}指定了一个节点，然后使用了全局模式才激活成功了

## 已连接，无法访问互联网和网络连接受限

这种情况一般是因为盒子的时间与当地时间不同步导致，解决方法如下
首先打开安卓的开发者模式启用网络调试或者 usb 调试
然后使用使用 adb 工具包来连接盒子进行调试

```bash
adb connect 192.168.xx.xx
```

```bash
adb bash settings put global ntp_server ntp3.aliyun.com
```

```bash
adb reboot
```

> 国内 ntp 服务器 备用地址:
> ntp1.aliyun.com
> ntp2.aliyun.com
> ntp3.aliyun.com
> ntp4.aliyun.com
> ntp5.aliyun.com
> ntp6.aliyun.com
> ntp7.aliyun.com

上述方法能解决大部分联网问题

## 无法自动连接网络

我给朋友买了一个{% label primary @Shield TV %}按照[悟空百科](https://didiboy0702.gitbook.io/wukongdaily/wan-ke-yun-ji-qiao/google-tv-xiu-gai-ntp-fu-wu-qi-di-zhi)来设置了时间校准，写入了国内的 ntp 服务器，以为没问题了就给朋友送过去了，后来他说盒子总是无法自动联网，需要手动点一下，我拿回来查了半天最后找到了原因。首先悟空百科的教程没有问题，需要看自己自己的{% label primary @Shield TV %}的安卓版本，我当时为了求快把下面的命令全输入了导致的问题。

> 如果你没有使用软路由，而是在电视盒子里使用了代理软件比如 clash 或者其他 vpn，那么你会发现，即便修改了时间服务器地址，每次重启盒子，首先是 wifi 并不会自动连接，其次就算连接也还是会提示网络受限。这是因为 Android 原生电视盒子的联网原理导致的，源码中有一个叫做 isCaptivePortal() 的函数，用来检查网络状况的判断，它需要一个返回值 http 204 （空内容的意思）的网址，源码里默认使用 clients3.google.com/generate_204 这个网址，很显然这个网址，你若没用代理是访问不到的。因此安卓就没法正确判断当前的网络状态，所以要想解决此问题，需要我们换成一个能在国内直接访问的，用于返回 http 204 的网址。我们姑且把它叫做验证服务器吧。目前已经有很多公司制作了这样的验证服务器。

```
小米： connect.rom.miui.com/generate_204
华为： connectivitycheck.platform.hicloud.com/generate_204
Vivo： wifi.vivo.com.cn/generate_204
```

```bash
# 打开网络调试
# 如果你是Android 11.0 以上的电视盒子（还比较少）
# 这里要看清楚版本！！！
# 这里要看清楚版本！！！
# 这里要看清楚版本！！！
adb bash settings put global captive_portal_mode 1

#Android 10.0 以下的电视盒子（比较多） 这里要选对版本
# 这里要看清楚版本！！！
# 这里要看清楚版本！！！
# 这里要看清楚版本！！！
adb bash settings put global captive_portal_detection_enabled 1

# 设置一个返回204 空内容的服务器
adb bash settings put global captive_portal_use_https 0
adb bash settings put global captive_portal_http_url http://connect.rom.miui.com/generate_204
```

如果选对了版本按照上述步骤操作并没有问题，如果已经写错了我们需要把 {% label primary @captive_portal_detection_enabled %} 这个值修改回 0

```bash
adb bash settings put global captive_portal_detection_enabled 0
```

因为 7.1.2 开始，{% label primary @captive_portal_detection_enabled %} 已被废弃，现在改为了{% label primary @captive_portal_mode %}选项，该选项可设置为以下 3 种值：

> - 0：彻底禁用检测(Don’t attempt to detect captive portals.)
> - 1：检测到需要登录则弹窗提醒（默认值）(When detecting a captive portal, display a notification that prompts the user to sign in.)
> - 2：检测到需要登录则自动断开此热点并不再自动连接(When detecting a captive portal, immediately disconnect from the network and do not reconnect to that network in the future.)

# 其他

## 自动打开 clash for Android

还有一个有用的技巧就是通过 {% label primary @Boot on Launch %} 这个软件将 clash 在盒子启动的时候自动启动，这样免去了手动启动科学的烦恼。

## 好用的软件推荐

- YouTube TV
- Netflix
- Disney+
- emby 自建或非公益服
- clash for Android
- TiviMate IPTV 电视直播软件

## 为什么不选 Apple TV

体验来说我更倾向于 Apple TV，但是要使用必须家里有软路由不像{% label primary @Shield TV %}只要安装了 clash for Android 就可以了，而且 Apple TV 没有爱优腾，虽然有些淘宝买家可以安装破解版，具体使用就不太清楚了，所以还是感觉{% label primary @Shield TV %}自由一些，这个就智者见智了。


## 奈飞解锁的问题
原生安卓盒子的奈飞检测比较严格，如果机场是DNS解锁的奈飞，即使家里有软路由也有可能检测到代理而无法访问，这是盒子自身的限制，想要完美观影，需要有原声IP或者家宽的节点，我试过`Ytoo`一些节点是可以的，其他的如果不行请尝试安装 `Clash for Android TV`,这样即使是DNS解锁的机场也是可以观看的, 也有人说通过修改软路由第三方规则修改也是可以的，我尝试过没有成功，后面有机会再试一下。

补充：通过软路由劫持dns可以解决奈飞解锁的问题
```bash
# fix time server, redirect all udp 123 to local timeserver
iptables -t nat -N TIMER
iptables -t nat -A TIMER  -d 192.168.100.1 -j RETURN
iptables -t nat -A TIMER  -p udp  -j REDIRECT --to-ports 123
iptables -t nat -I PREROUTING -p udp --dport 123 -j TIMER

# netflix dns fix
iptables -t nat -N NETFLIX
iptables -t nat -A NETFLIX  -d 192.168.100.1 -j RETURN
iptables -t nat -A NETFLIX  -p udp  -j REDIRECT --to-ports 192.168.100.1
iptables -t nat -I PREROUTING -p udp --dport 53 -j NETFLIX


iptables -t nat -A PREROUTING -p udp --dport 53 -j DNAT --to-destination 192.168.100.1
iptables -t nat -A PREROUTING -p tcp --dport 53 -j DNAT --to-destination 192.168.100.1
iptables -t nat -A PREROUTING -p udp --dport 853 -j DNAT --to-destination 192.168.100.1
iptables -t nat -A PREROUTING -p tcp --dport 853 -j DNAT --to-destination 192.168.100.1

iptables -t nat -I PREROUTING -i br-lan -p udp --dport 53 -j DNAT --to 192.168.100.1
iptables -t nat -I PREROUTING -i br-lan -p tcp --dport 53 -j DNAT --to 192.168.100.1

```

### `Netflix解锁彻底解决`
我的情况是家里软路由订阅机场手机跟电脑解锁没问题，特定机场出现`使用代理`的提示，也有机场有原生节点可以支持奈飞解锁，对于不能解锁的原因如下，引用`github`一位老哥的回答

>如果你使用的代理服务器是DNS解锁的服务器（通俗解释：基于来源请求的域名判断，将访问Netflix的请求通过另一个原本就能观看Netflix的服务器进行代理）
>那么就要求代理客户端（如 Clash）以域名的方式发起TCP请求，Clash默认是以域名发起请求，
>但Clash得知请域名的前提是，Netflix APP端以域名的方式发起请求，并且Clash DNS解析过相应的域名，留下了ip与域名的映射关系。
>但个别盒子比如firestick则直接向8.8.8.8以TCP方式53端口发起DNS查询，然后发起对ip的请求，即便劫持8.8.8.8到Clash DNS，由于Clash不具备解析tcp >dns请求的能力（游戏内核除外），这种情况下Clash便无法得知ip与域名的对应关系，只能同样以ip的方式建立和代理服务器的链接，此时你的代理服务器便无法得知你访问的是Netflix域名，即便你使用全局代理也无法观看，除非这个代理服务器把所有相关ip列入Netflix规则中（此规则非Clash的分流规则）。
>如果你的代理服务器是原本就可以观看Netflix的（所谓原生节点），那么无论代理客户端以ip还是域名发起请求都可以观看，所以全局代理也一定可以。

最终解决方案就是安装`MosDNS`[^9],开启将`Dnsmasq` 域名解析请求转发到 `MosDNS` 服务器,使用默认配置即可，甚至`OpenClash`，`防火墙`，不需要额外配置。以前提示代理的机场也均可稳定解锁。

# 参考

[^1]: [悟空百科](https://didiboy0702.gitbook.io/wukongdaily/wan-ke-yun-ji-qiao/google-tv-xiu-gai-ntp-fu-wu-qi-di-zhi)
[^2]: [关于 ANDROID 5.0-7.1.2 网络图标上的感叹号及其解决办法](https://zhuanlan.zhihu.com/p/111004889)
[^3]: [Android 7.1.2 无法禁用检测](https://github.com/Noisyfox/NoExclamation/issues/2)
[^4]: [消除 Android8.1 原生系统无线网感叹号](https://www.jianshu.com/p/23e85be8522a)
[^5]: [Nvidia Shield TV 2017 国行刷美版固件指南](https://github.com/0neday/Nvidia-Shield-TV-2017-Cookbook)
[^6]: [Netflix Unblocking Fix For Android TV/Fire TV/Chromecast/PS4](https://www.reddit.com/r/NetflixViaVPN/comments/p9doud/netflix_unblocking_fix_for_android_tvfire/)
[^7]: [Netflix怎么总是被检测到代理](https://github.com/vernesong/OpenClash/issues/230)
[^8]: [节点采用解锁服务后，TV端仍检测到代理，怎么破](https://github.com/vernesong/OpenClash/issues/1130)
[^9]: [OpenWrt 安装 MosDNS v5 超傻瓜方式](https://github.com/IrineSistiana/mosdns/discussions/455)
[^10]: [OpenWRT+MOSDNS+OpenClash防止dns泄漏](https://www.20040313.xyz/index.php/2023/09/22/openwrtmosdnsopenclash%E9%98%B2%E6%AD%A2dns%E6%B3%84%E6%BC%8F/)
[^11]: [openclash+mosdns防dns泄漏内核绕过中国ip](https://www.right.com.cn/forum/thread-8293938-1-1.html)


