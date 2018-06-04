---
comments: true
title: "Turning monitor mode on and off"
date: 2017-09-25 09:00:00 -0100
categories: hacking
layout: post
---
## On
This would just work:
```
airmon-ng start wlan0
```
This also works:
```
ifconfig wlan0 down
iwconfig wlan0 mode monitor
ifconfig wlan0 up
```
To scout the nearby APs, you do:
```
airodump-ng wlan0mon (or whatever the name ifconfig gives)
```
## Off
```
~# airmon-ng stop wlan0mon
PHY	Interface	Driver		Chipset

phy0	wlan0mon	ath9k_htc	Atheros Communications, Inc. AR9271 802.11n
		(mac80211 station mode vif enabled on [phy0]wlan0)
		(mac80211 monitor mode vif disabled for [phy0]wlan0mon)
~# service network-manager start
```
For my computer, I do not have to type `service network-manager start`. It just works. 

## For more
see [the official documentation](https://www.aircrack-ng.org/doku.php?id=airmon-ng).
