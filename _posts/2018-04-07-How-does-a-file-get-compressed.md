---
comments: true
layout: post
title: "How does a file get compressed?"
date: 2018-04-07 09:00:00 -0100
categories: knowledge
---
You know, you sometimes compress files. And today I needed to send a relatively big folder to my friend so I just compressed it. This folder contained a lot of texts (programming assignments and samples and so on, and also lecture notes, things like that). Sometimes I just do so for an enclosing purpose, but this time I did it for both that and file size reduction. Surprisingly, the file size was reduced from 4.9GB down to 1.38GB.

![beforeCompression](https://7oel.weebly.com/uploads/9/5/6/3/95631532/screen-shot-2017-08-11-at-19-56-37_1_orig.png)

![afterCompression](https://7oel.weebly.com/uploads/9/5/6/3/95631532/screen-shot-2017-08-11-at-19-56-41_orig.png)

But I remember that when I compressed .mp3 files together in one folder, they did not reduce in their size almost not at all. So I became curious of the logic behind compression. So I searched up on the Internet.

Compression logic (thanks to howstuffworks.com)
If you have a sentence:

```
"Ask not what your country can do for you -- ask what you can do for your country."
```

Then you can reduce (or change, if you'd like) to: 
```
"1 not 2 3 4 5 6 7 8 -- 1 2 8 5 6 7 3 4"
```

It's just like defining variables and using them again and again. So the compressor looks for a repetition that could help reduce the file size. But unlike text files, mp3s or image files have more unique patterns which make it harder to find matching repetitions to decrease the file size. 