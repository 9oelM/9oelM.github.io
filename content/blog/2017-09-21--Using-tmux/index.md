---
title: "Using tmux"
date: "2017-09-21T09:00:00.009Z"
tags: ["linux", "tmux"]
---
## Scrolling in tmux
Using tmux, you sometimes wanna scroll up and down the window just like you used to in the normal bash shell.

It's dead simple as this:
```
ctrl + b + [
```
This will allow you to scroll.
Pressing q would quit scroll mode.
## Getting back to tmux session
```
tmux attach -t [session number]
```
would do it. you can check the session number with:
```
tmux ls
```
## Killing a window / a pane
for a window:
```
ctrl + b + &
```
for a pane:
```
ctrl + b + x
```

## Selecting a pane
```
ctrl + b + q 
```
will show you numbers on panes. Type the number of a pane to go to that pane.

