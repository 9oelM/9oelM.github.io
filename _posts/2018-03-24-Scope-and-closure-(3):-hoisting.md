---
layout: post
title: "Scope and closure (3): hoisting"
date: 2018-03-24 09:10:00 -0100
categories: development
---

## FYI
Notes made with [You don't know JS](https://github.com/getify/You-Dont-Know-JS/blob/master/scope%20%26%20closures/ch4.md).

### Important points on hoisting
* Hoisting is just basic. Just remember hoisting happens **per scope** and only on variable and function **declarations**, not assignments or reference.
* Also remember **functions are hoisted first, and then variables.**
* **The hoisted functions or variables will override any other functions or variables that have the same name.**
* Function declarations that appear inside of normal blocks like `if` typically hoist to the enclosing (outer) scope.