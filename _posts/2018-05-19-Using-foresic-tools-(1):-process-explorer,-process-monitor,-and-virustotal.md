---
layout: post
title: "Using foresic tools (1): process explorer, process monitor, and virustotal"
date: 2018-05-19 09:00:00 -0100
categories: hacking
---
## Sources
* [CSO](https://www.csoonline.com/article/2883958/malware/malware-detection-in-9-easy-steps.html)

## Process explorer 

### Submit to [VirusTotal](https://www.virustotal.com/en/) to check hash
Process Explorer -> Options -> VirusTotal.com -> Check VirusTotal.com

![1](https://postfiles.pstatic.net/MjAxODA1MTlfMTc3/MDAxNTI2NjkzMTE0NDg1.c873q9HfZCtwfbPdxZtrR8aQY6E1VIrRt2CY0idq1Agg.M7dqQU-__syralfnwddSJINM1VzJsGopcYMHd8Xm9ccg.PNG.joelmun/%EC%BA%A1%EC%B2%982.PNG?type=w773)

Executables with high ratio mean higher chance of malicious behaviour.
The ratio is the number of virus engines that recognized the executable as a malicious software divided by total number of virus engines. 
If the ratio is `1/67`, it is probably a false positive, but if it's more than that, it's worth doubting. 

![2](https://postfiles.pstatic.net/MjAxODA1MTlfMzYg/MDAxNTI2NjkyNjAzNTk2.nNB0G74x8fEXioLMxxTb4ACbPA1y-oAf5kEWX5kyomMg.tXYPoNYfBHnRIRU4XZlQMRk8V0h_HH7fSytnba0iv8gg.PNG.joelmun/%EC%BA%A1%EC%B2%98.PNG?type=w773)

If you want to delete the program, stop the program on boot using Autoruns and then delete it.

### Verify image signatures

Process Explorer -> Options -> Verify image signatures

## Process monitor

### Kinds of operation

`RegQueryKey`

`RegSetInfoKey`

`RegCloseKey`

`RegOpenKey`


