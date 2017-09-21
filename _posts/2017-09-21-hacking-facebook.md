---
layout: post
title: "Hacking facebook"
date: 2017-09-21 09:20:00 -0100
categories: hacking
---
## What I wanted
There are many ways to hack somebody's Facebook account. 

One of the most popular methods is to use social engineering techniques. But this has a crucial limitation: you need to be physically close enough to the victim, most favorably in your LAN.

So I decided to find out some other ways like buffer overflow or brute force. Here's one of them: 

## How to
Materials:
* A dictionary
* facebook.py
* linux environment

First, download python-mechanize. 
```
$ apt-get install python-mechanize
```

## But before all that
Before running the script, I suggest that you ensure your anonymity. 

The best method I recommend is to set up/buy a VPN. Otherwise, use proxy. 

Another good solution is to go to a random place outside your house where you can access the Internet. Then run `macchanger` to temporarily change your mac address.

## Now ready
Then, just run `facebook.py` (set environment path or locate your `facebook.py` file before using it. You know this already):
```
$ python facebook.py
```
