---
title: "Hacking instagram (1)"
categories: hacking
date: 2017-09-00 09:20:00 -0100
layout: post
---
## What I found
[This repo](https://github.com/Mr-Polite/instagram-py). And so I just needed to follow a few steps.

## Steps (After following all directions from the repo's `README.md`)
1. Launch tor
```
service tor start
```
2. Execute the source file
```
instagram-py userID wordlist
```
What I saw is that this works. This is authentic. But there were some problems.

## Issues
1. The script will take a long time to read your wordlist if it's long. 
Initially I was thinking of trying crackstation's approx. 15GB wordlist on the Instagram account that I made for a testing purpose. But it will just take too long time to process your wordlist even before trying it.

2. The script is certainly faster than [Ethical-H4CK3R's `Instagram` script](https://github.com/Ethical-H4CK3R/Instagram), but still, this is the limitation of bruteforcing with one single machine. Firstly, using tor network will greatly slow your network down. Secondly, you need to switch IP Addresses from time to time because Instagram will suspend login attempts from suspicious IPs, which would make the program even slower.

