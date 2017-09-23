---
layout: post
title: "Changing mac address semi permanently"
date: 2017-09-21 09:40:00 -0100
categories: hacking
---
## How to
Dead simple.

Open up the file /etc/network/interfaces. It will show you something like:
```
# This file describes the network interfaces avilable on your system 
# and how to activate them. For more information, see interfaces(5).

source etc/network/interfaces.d/*

# The loopback network interface
auto lo
iface lo inet loopback
```
and add at the end of the file, this line:
```
pre-up ifconfig eth0 hw ether xx:xx:xx:xx:xx:xx
```
This will spoof your mac address to xx:xx:xx:xx:xx:xx every time your computer boots up.
