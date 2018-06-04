---
comments: true
layout: post
title: "Hacking kakaotalk (1)"
date: 2017-10-05 09:00:00 -0100
categories: hacking
---
## Get the APK
use somewhere like [https://apps.evozi.com/apk-downloader/](https://apps.evozi.com/apk-downloader/) to download the apk of an application.

![Download apk]({{site.url}}/assets/images/HackingKakaotalk/1downloadApk.png) 

![Download apk 2]({{site.url}}/assets/images/HackingKakaotalk/2downloadApk2.png)

## Using [dex2jar](https://github.com/pxb1988/dex2jar)
```
sh d2j-dex2jar.sh [flags] ~/path/to/apk_to_decompile.apk
```
would output the file `apk_to_decompile-dex2jar.jar`.

in this case,
```
sh d2j-dex2jar.sh com.kakao.talk.apk 
```
would do. I would add flag `-v` to generate verbose output. Then you could see the process.

then you would see
```
com.kakao.talk.apk
com.kakao.talk-dex2jar.jar
```
in your directory.

I wanted to view the contents:
```
$ jar tvf com.kakao.talk-dex2jar.jar
     0 Thu Oct 05 19:07:44 EDT 2017 a/
     0 Thu Oct 05 19:07:44 EDT 2017 a/a/
     0 Thu Oct 05 19:07:44 EDT 2017 a/a/a/
   570 Thu Oct 05 19:07:44 EDT 2017 a/a/a/a.class
     0 Thu Oct 05 19:07:44 EDT 2017 android/
     0 Thu Oct 05 19:07:44 EDT 2017 android/opengl/
     0 Thu Oct 05 19:07:44 EDT 2017 android/opengl/a/
   271 Thu Oct 05 19:07:44 EDT 2017 android/opengl/a/a$f.class
  1071 Thu Oct 05 19:07:44 EDT 2017 android/opengl/a/a$a.class
  2003 Thu Oct 05 19:07:44 EDT 2017 android/opengl/a/a$b.class
   289 Thu Oct 05 19:07:44 EDT 2017 android/opengl/a/a$r.class
  2691 Thu Oct 05 19:07:44 EDT 2017 android/opengl/a/a$c.class
   452 Thu Oct 05 19:07:44 EDT 2017 android/opengl/a/a$g.class
  1089 Thu Oct 05 19:07:44 EDT 2017 android/opengl/a/a$d.class
   470 Thu Oct 05 19:07:44 EDT 2017 android/opengl/a/a$h.class
  1014 Thu Oct 05 19:07:44 EDT 2017 android/opengl/a/a$e.class
  2261 Thu Oct 05 19:07:44 EDT 2017 android/opengl/a/a$i.class
   292 Thu Oct 05 19:07:44 EDT 2017 android/opengl/a/a$j.class
   822 Thu Oct 05 19:07:44 EDT 2017 android/opengl/a/a$k.class
   867 Thu Oct 05 19:07:44 EDT 2017 android/opengl/a/a$l.class
  6804 Thu Oct 05 19:07:44 EDT 2017 android/opengl/a/a$m.class
   633 Thu Oct 05 19:07:44 EDT 2017 android/opengl/a/a$n.class
   188 Thu Oct 05 19:07:44 EDT 2017 android/opengl/a/a$o.class
   955 Thu Oct 05 19:07:44 EDT 2017 android/opengl/a/a$p.class
   561 Thu Oct 05 19:07:44 EDT 2017 android/opengl/a/a$q.class
  5656 Thu Oct 05 19:07:44 EDT 2017 android/opengl/a/a.class
     0 Thu Oct 05 19:07:44 EDT 2017 android/support/
     0 Thu Oct 05 19:07:44 EDT 2017 android/support/a/

..... 
.....

really long lines... wc command gives 10611 of lines!

.....
.....

   436 Thu Oct 05 19:08:14 EDT 2017 h/b/o.class
   436 Thu Oct 05 19:08:14 EDT 2017 h/b/p.class
   469 Thu Oct 05 19:08:14 EDT 2017 h/b/q.class
   445 Thu Oct 05 19:08:14 EDT 2017 h/b/r.class
   459 Thu Oct 05 19:08:14 EDT 2017 h/b/s.class
   459 Thu Oct 05 19:08:14 EDT 2017 h/b/t.class
   424 Thu Oct 05 19:08:14 EDT 2017 h/b/u.class
   369 Thu Oct 05 19:08:14 EDT 2017 h/b/v.class
   372 Thu Oct 05 19:08:14 EDT 2017 h/b/w.class
   994 Thu Oct 05 19:08:14 EDT 2017 org/apache/commons/a/d.class
  3566 Thu Oct 05 19:08:14 EDT 2017 org/apache/commons/a/f.class
     0 Thu Oct 05 19:08:14 EDT 2017 org/apache/commons/b/
  7660 Thu Oct 05 19:08:14 EDT 2017 org/apache/commons/b/i.class
     0 Thu Oct 05 19:08:14 EDT 2017 org/apmem/
     0 Thu Oct 05 19:08:14 EDT 2017 org/apmem/tools/
     0 Thu Oct 05 19:08:14 EDT 2017 org/apmem/tools/layouts/
  3404 Thu Oct 05 19:08:14 EDT 2017 org/apmem/tools/layouts/FlowLayout$LayoutParams.class
```

## Open the jar
use [`JD-GUI`](http://jd.benow.ca/) or [`JD Java Decompiler Mirror`](https://varaneckas.com/jad/) to open the source file.

```
dpkg -i jd-gui_1.4.0-0_all.deb 
```

## See the source code
![See source]({{site.url}}/assets/images/HackingKakaotalk/3seeSource.png)

As we can easily discover, almost all java codes are obfuscated. A normal human being cannot just understand the code. What do we do?

