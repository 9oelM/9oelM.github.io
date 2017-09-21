---
layout: post
title: "Using macchanger"
date: 2017-09-21 09:30:00 -0100
categories: hacking
---
# What is macchanger
Macchanger is a little program that helps you fake (sometimes called spoof) your mac address. 

## Using ifconfig and macchanger
The usage is really simple.

First, if you don't hace macchanger, install it:
```
$ apt-get install macchanger
```

Then find your mac address:
```
$ ifconfig
...
information about interfaces

eth0: ....
	*ether xx:xx:xx:xx:xx:xx*

lo: ....

wlan0: ...
	*ether xx:xx:xx:xx:xx:xx*
...
```
What you need to see is the `eth0` interface and `wlan0` (sometimes eth1, or some other. You need to figure it out yourself). `eth0` is the ethernet (wired)interface, and `wlan0` is wireless LAN interface. 

So if you are using a wired connection, you need to care about `eth0`. You need to care about `wlan0` if you are using a wireless connection. 

If you are still worried, just change mac addresses of both interfaces. 

Then you get your network interface turned off, for example:
```
# ifconfig wlan0 down
```
You are going to see that your wireless(or wired) connection is gone on your taskbar, for example. If you are still unsure, check by using `ifconfig` again, and the interface you turned off won't be shown anymore. 

and use macchanger to generate a new mac address (there are many options. Just do `macchanger -h` or `man macchanger` to check it out):
```
# macchanger -r wlan0
```
# macchanger -r wlan0
Current MAC:   12:34:56:78:90:ab (The name of your vendor)
Permanent MAC: 12:34:56:78:90:ab (The name of your vendor)     
New MAC:       34:a1:f3:ds:12:39 (unknown)
```

Now turn the interface on again:
```
# ifconfig wlan0 up
```
Now there you go. Your mac address is temporarily changed. 
