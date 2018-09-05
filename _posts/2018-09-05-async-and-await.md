---
comments: true
layout: post
title: "async and await"
date: 2018-09-05 09:00:00 -0100
categories: development
---
# See
* [javascript.info](https://javascript.info/async-await)
* [Mozilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)

## Basics
Ok. This is not ES6. Its ES8 (ECMAScript 2017) syntax. 
* > The async function declaration defines an asynchronous function, which returns an AsyncFunction object. An asynchronous function is a function which operates asynchronously via the event loop, using an implicit Promise to return its result.

* `async function` returns: 
    > A **Promise** which will be resolved with the value returned by the async function, or rejected with an uncaught exception thrown from within the async function.
* `async` function can have `await`. This waits for the passed promise to be fulfilled. It **pauses** the execution of the async function. Once it's got the value, it resumes execution.
* `await` is only valid in `async` function. 
    ```javascript
    function test(){
        await new Promise((resolve,reject)=>resolve(1))
    }
    ```
    It's going to cause a syntax error.
* If `async` function returns something other than a promise, it will be wrapped automatically into a resolved promise with the value in it:
    ```javascript
    async function f() {
        return 1;
    }

    f().then(alert); // 1
    ```