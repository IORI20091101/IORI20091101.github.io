---
layout: post
title: Shield TV激活与联网
subtitle: Shield TV激活与联网
date: 2022-08-22
author: "toshiba"
index_img: https://yt-card-system.oss-cn-beijing.aliyuncs.com/blog/index-img/shield.jpeg
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

# 参考

[^1]: [悟空百科](https://didiboy0702.gitbook.io/wukongdaily/wan-ke-yun-ji-qiao/google-tv-xiu-gai-ntp-fu-wu-qi-di-zhi)
[^2]: [关于 ANDROID 5.0-7.1.2 网络图标上的感叹号及其解决办法](https://zhuanlan.zhihu.com/p/111004889)
[^3]: [Android 7.1.2 无法禁用检测](https://github.com/Noisyfox/NoExclamation/issues/2)
[^4]: [消除 Android8.1 原生系统无线网感叹号](https://www.jianshu.com/p/23e85be8522a)
