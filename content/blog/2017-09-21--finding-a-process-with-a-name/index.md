---
title: "Finding a process with a name"
date: "2017-09-21T09:00:00.009Z"
tags: ["linux", "kali"]
---
Many times you want to look for a process to kill it.
Here's how:
```
$ pgrep bash
2121
2233
2456
2586
```
the default pgrep command shows the PIDs of all matching processes.

```
$ pgrep bash -l
2121 bash
2233 bash
2456 bash
2586 bash
```
the -l option would also show you the process names. This is useful for something like:
```
pgrep i915 -l
330 i915/signal:0
332 i915/signal:1
333 i915/signal:2
334 i915/signal:4
```
where each process has a slightly different name.

## Killing a process
Simply:
```
kill [pid] (equivalent to kill -TERM [pid])
```
If a process is behaving errorneously and it won't shut down, do:
```
kill -9 (or -KILL) [pid]
```
This option forcefully shuts down a process, whereas the default option (without any flags attached) means to kill a process step by step, which is actually -15 or -TERM option.

## Easier killing
```
pkill -9 bash
```
It is the same as:
```
kill -9 `pgrep bash`
```
Simply killing all the instances of process  named the same is:
```
killall [process name]
```
