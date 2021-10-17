---
title: "The rise of low-level programming (feat. WebAssembly)"
date: "2019-12-07T09:00:00.009Z"
tags: ["development", "webassembly", "low-level programming"]
---
## Back in the old days

There was no alternative to javascript. It was just javascript. Javascript just happened to be with the web when it got popular ([Look at this article by Jeff for a great insight](https://dev.to/codediodeio/the-weird-history-of-javascript-2bnb)). Yes you are right. Javascript was not the best (and altough personally, is still not now) when it first arrived. But still, I should say, before 2010~2015 (the subjective time might vary depending on readers, but I chose in between 2010 and 2015 because there were asm.js, Emscripten, ES6 starting to appear from these times, which after all triggered facilitation of many bright ideas and cool projects), **low-level programming was not really a thing for the web**. If you could do javascript, you could make an application that works nicely. No real understanding of gc, memory, types? Doesn't matter. You don't need to know the details if you are using javascript.

However, there was a limitation on performance. Around 2010~2015, What you could do the most was to use asm.js to mimic behaviors of compilers of statically typed languages like C to boost performance, including ahead-of-time compilation. Something was definitely missing.

## Where low-level programming stands today

The advent of asm.js, wasm, and emscripten stroke the world a few years ago. This means you are now able to compile statically typed languages to a binary format, which will be run directly on browser.

People now want to run many things on the web. Like, really many things. You want to run video games. You want to draw lots of complex graphics like Google Earth or AutoCAD on the web. You want to train and run ML models on the web. You don't want to install things on your computer anymore because simply because it's better if you can do most of the things on the web. 

So that's where low-level programming comes in. No need to hesitate anymore. You write code in C++, port it to wasm, and use it on the browser. That's it. So are you a web developer? Some might say it's not the time yet, but I would say it's the right time to start digging into low-level programming from today. You know how to write beautiful codes in javascript. Ok. It does not really matter if you want to just do some shopping malls or a blog with that. No practical need for performance, unless your blog runs a complex matrix calculation every single time somebody visits. But when it comes to performance, it will always be low-level from now on, **because now the boundary between the web and low-level programming is collapsing.** Being able to write javascript does not grant you a privilege anymore.

## What's more than that

Let me tell you this then: a few days ago, [W3C announced that WebAssembly has become its official recommendation, following HTML, CSS and Javascript](https://www.w3.org/2019/12/pressrelease-wasm-rec.html.en).

What's more intriguing, is that actually this thing is trying to **go beyond the web**. Aforementioned is that low-level programming is becoming useful for the web. Now, [Mozilla is working hard on WASI](https://hacks.mozilla.org/2019/03/standardizing-wasi-a-webassembly-system-interface/) (wasm system interface). This means you might be able to run wasm on any environments (any browsers, any operating systems, any runtimes). So really, in fact, not only is wasm breaking the boundary between the web and low-level programming, but also that across all runtimes and systems.

## So, where do I start?

I would recommend looking into:

- [WebAssembly](https://webassembly.org/) (and WASI as well)
- [Rust](https://www.rust-lang.org/)
- [Assemblyscript](https://assemblyscript.org/) (I'm interested in this the most, because I think the learning curve is low if you already know Typescript)

## Epilogue

Don't get me wrong here. I'm not forcing everyone to use wasm from now on. Neither am I proposing that wasm will conquer the world. **WebAssembly is not a replacement of javascript**. Also, It's at an early stage and still got many things to sort out, like parallel computation, reference types, WebIDL bindings, GC, exception handling and so on. [Even at WebAssembly for Web Developers (Google I/O ’19)](https://www.youtube.com/watch?v=njt-Qzw0mVY), it was said it's not a good idea to put everything into wasm right now.

But personally, I want to get a headstart. I want to encourage those of you who are interested to join the current from now on. Fiddling only with javascript makes my life too boring.

But low-level programming? Definitely do it if you want to dig into wasm.
