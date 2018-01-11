---
title: "Difference among const, let, and var"
categories: scripting
date: 2017-10-01 09:00:00 -0100
layout: post
---
### `var`
**Varaiable declaration**
```
var foo = 'bar1';
var foo = 'bar2';
```
makes no error.

**Hoisting**
```
console.log(foo); // undefined
var foo;
```
Hoisting works for `var`.

### `let` and `const`
### Sources
* https://gist.github.com/LeoHeo/7c2a2a6dbcf80becaaa1e61e90091e5d
* http://blog.nekoromancer.kr/2016/01/26/es6-var-let-%EA%B7%B8%EB%A6%AC%EA%B3%A0-const/
