---
layout: post
title: "Using bluetooth on kali linux"
date: 2017-09-28 09:00:00 -0100
categories: general linux
---
Check bluetooth status
```
/etc/init.d/bluetooth status
```
And turn it on:
```
/etc/init.d/bluetooth start
```
This way bluetooth is going to work. 

`stop` will stop bluetooth.

Bluetooth is not turned on by default on boot on kali linux.

Another equivalent way is:
```
service bluetooth start(stop)
```
```
service bluetooth status
```
