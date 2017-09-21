---
layout: post
title: "scrolling in tmux"
date: 2017-09-21 09:00:00 -0100
categories: general linux
---
# How to
Using tmux, you sometimes wanna scroll up and down the window just like you used to in the normal bash shell.

It's dead simple as this:
```
ctrl + b + [
```
This will allow you to scroll.
Pressing q would quit scroll mode.
## Getting back to tmux session
```
tmux attach -n [session number]
```
would do it. you can check the session number with:
```
tmux ls
```
