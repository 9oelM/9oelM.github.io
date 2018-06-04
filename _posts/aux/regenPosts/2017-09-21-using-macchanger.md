---
comments: true
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
	ether xx:xx:xx:xx:xx:xx

lo: ....

wlan0: ...
	ether xx:xx:xx:xx:xx:xx
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
macchanger -r wlan0
Current MAC:   12:34:56:78:90:ab (The name of your vendor)
Permanent MAC: 12:34:56:78:90:ab (The name of your vendor)     
New MAC:       34:a1:f3:ds:12:39 (unknown)
```

Now turn the interface on again:
```
# ifconfig wlan0 up
```

Now there you go. Your mac address is temporarily changed.

## One problem I faced
Everything went well, but I needed to restart my wifi even after `ifconfig wlan0 up` because the connection was not established. [I searched on the web and found an answer to this.](https://askubuntu.com/questions/586269/spoofed-mac-address-changes-when-trying-to-connect-to-network)

This solution works perfectly for me:
```
sudo service network-manager stop
sudo ifconfig wlan0 down
sudo macchanger -m XX:XX:XX:XX:XX:XX wlan0
sudo ifconfig wlan0 up
sudo service network-manager start
```
This way, you do not have to manually restart wifi after `ifconfig wlan0 up`. 

## Warning
The fake mac address will be reset to the original mac address if you choose to connect to another wifi or restart the interface. Now, there is a solution to spoof the mac address every time the machine wakes up. 

See [spoofing the mac address semi-permanently](https://mr-polite.github.io/hacking/2017/09/21/changing-mac-address-semi-permanently.html).
