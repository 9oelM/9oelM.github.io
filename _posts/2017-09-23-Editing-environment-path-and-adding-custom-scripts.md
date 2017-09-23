---
layout: post
date: 2017-09-23 09:10:00 -0100
title: "Editing environment path and adding custom scripts"
categories: general linux
---
## How to (copied from [linuxconfig](https://linuxconfig.org/linux-path-environment-variable))
```
$ echo $PATH
/home/lilo/bin:/usr/local/bin:/usr/bin:/bin:/usr/games
$ PATH=$PATH:/bin/myscripts
$ export PATH
$ echo $PATH
/home/lilo/bin:/usr/local/bin:/usr/bin:/bin:/usr/games:/bin/myscripts
```

## Checking environment variables
type 
```
env
```
and it will show you everything.

## Where are they stored (copied from [unix.stackexchange.com](https://unix.stackexchange.com/questions/813/how-to-determine-where-an-environment-variable-came-from)
System wide
* /etc/environment: specifically meant for environment variables
* /etc/env.d/*: environment variables, split in multiple files
* /etc/profile: all types of initialization scripts
* /etc/profile.d/*: initialization scripts
* /etc/bashrc: meant for functions and aliases

User specific
* ~/.bash_profile: initialization for all interactive (bash-)shells
* ~/.bashrc: initialization for login (bash-)shells
* ~/.profile: used for all shells
* ~/.cshrc, ~/.tcshrc, ~/.zshrc, ~/.tcshrc: similar for non-bash shells

 
