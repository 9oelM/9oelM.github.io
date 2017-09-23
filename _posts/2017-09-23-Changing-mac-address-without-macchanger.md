---
layout: post
title: "Changing mac address without macchanger"
date: 2017-09-23 09:00:00 -0100
categories: general linux
---
## How to (got the info from [wikibooks](https://en.wikibooks.org/wiki/Changing_Your_MAC_Address/Linux))
really easy. Just enter the following commands sequentially:
```
/etc/init.d/networking stop
ifconfig eth0 hw ether 02:01:02:03:04:08
/etc/init.d/networking start 
```
Then, do `ifconfig` to check the mac address of eth0 interface. It should be 02:01:02:03:04:08. 
