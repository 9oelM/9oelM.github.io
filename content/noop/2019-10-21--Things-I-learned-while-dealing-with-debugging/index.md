---
title: "Things I learned while dealing with debugging"
date: "2019-10-21T09:00:00.009Z"
category: "development"
tags: ["development", "debugging"]
---

## Reality
- Before working at a company for the first time, I did not ever know that debugging is such an important thing that may take the whole day to get the issue resolved. 

## Some debugging tips
### 1. Define your problem perfectly
It sounds really obvious, but many times you are not even defining your problem, which means you don't even know what you are doing. 

- **Test out your bug, and jot down the conditions that make the bug appear.** On some conditions, it takes place. On others, it does not. That is going to be a great reference when you debug. 
- **Do not sway around inside your code, doing nothing.** Sometimes the codebase is huge, and you are just swaying from one file to another to look for 'soemthing', without knowing what exactly that 'something' is. You are going to greatly waste your time if so. 

### 2. The code is honest, and you are not. 
Yes it happens. The code looks perfectly fine, but what's shown on the screen tells you that it's not perfect. Do not ever blame the code - i.e. do not dig into the part that you already know for sure it's working.

The code is honest. The computer does not lie. It speaks for itself. Go and search the part that might cause the problem, not the part that you are simply interested in doing some `console.log` stuff.

### 3. Believe in `console.log`
Do not expect a variable to be a certain value at a certain line. Do do `console.log`. That's gonna save your life. Remember, the code is honest. You are not.  

## 4. Make debugging easier 
Face it. You will have to debug anyways. I found this article extremely useful: [Boost your JavaScript Debugging Skills With These Console Tricks](https://medium.com/better-programming/boost-your-javascript-debugging-skills-with-these-console-tricks-ab984c70298a). In short, use: `console.count`, `console.warn`, `console.table`, `console.group`, and so on. 

Organize your logs. Do do use template strings to make your life easier, like: `console.log(`foo: ${foo}`)`. 

Have your own debugging functions (that's one of the reasons why functional programming is good for debugging, too. Yeah I'm an advocate.)

## 5. Use `git rebase` & `git bisect`.

## 6. Do not leave the error behind just because it works fine for now
Believe me, it is going to cause another error. Error produces another error. It's only going to burden you more and more. 