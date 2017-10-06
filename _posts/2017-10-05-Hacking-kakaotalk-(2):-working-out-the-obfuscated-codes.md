---
layout: post
title: "Hacking kakaotalk (2): working out the obfuscated codes"
date: 2017-10-05 09:00:00 -0100
categories: hacking
---
## Previously
In the [**previous post**](https://mr-polite.github.io/hacking/2017/10/05/Hacking-kakaotalk-(1).html), we were faced with the obfuscated java codes. Now we have to solve them.

## References
* [Tom Keetch's Steelcon 2015 Reverse-Engineering Obfuscated Android Applications](https://www.slideshare.net/TomKeetch/steelcon-2015-reverseengineering-obfuscated-android-applications)
* [Post on stackexchange about working with android obfuscation](https://reverseengineering.stackexchange.com/questions/11908/working-with-android-obfuscation)
* [Caleb Fenton's guide on Android deobfuscation](https://www.slideshare.net/tekproxy/tetcon-2016)
* [android cracking blog](http://androidcracking.blogspot.kr/2014/12/simplify-android-deobfuscator-decryptor.html)
* [scottylab's post](https://medium.com/@scottyab/auto-de-obfuscation-of-crash-stacktraces-for-android-c25a37782890)
* [technotalkative](http://www.technotalkative.com/part-3-reverse-engineering-using-other-tools/)
* [scala team's blog](https://blog.scalac.io/2016/02/11/android-reverse-engineering.html)

## What is smali? (from technotalkative)
> smali/baksmali is an assembler/disassembler for the dex format used by dalvik, Android’s Java VM implementation. The syntax is loosely based on Jasmin’s/dedexer’s syntax, and supports the full functionality of the dex format (annotations, debug info, line info, etc.)
> IDEs like Eclipse, Android Studio compiles and generate .dex (Dalvik Executable) file from Java source code written by developers in form of a apk file. In order to Reverse Engineer an apk, we need to extract the .dex file, its in unreadable format, so we need to convert .dex to Smali language.

## Pivot
As of now, I'm not really familiar with reverse engineering at java code level. I decided to dig into this later. For now, I'm going to try smali.

## Disassembling `.apk` to `.smali`
`baksmali` is installed on kali linux by default.

1. `unzip com.kakao.talk.apk` to get .dex file
2. `baksmali -x classes.dex -o smalis` to convert .dex into .smali


