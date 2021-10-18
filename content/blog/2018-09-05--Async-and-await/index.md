---
title: "Async, await, promise"
date: "2018-09-05T09:00:00.009Z"
tab: "post"
tags: ["development", "javascript", "async"]
---
# Async and await
## See
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

# Promise
## See
* [Mozilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
* [Dave Atchley](https://www.datchley.name/es6-promises/)

## So...
I know that promise is made to greatly reduce the pain from the async works in javascript. So how does it exactly work?

## Description from Mozilla
> A Promise is a proxy for **a value not necessarily known when the promise is created.** It allows you to associate handlers with an asynchronous action's eventual success value or failure reason. This lets asynchronous methods return values like synchronous methods: **instead of immediately returning the final value, the asynchronous method returns a promise to supply the value at some point in the future.**

> A Promise is in one of these states:

* pending: initial state, neither fulfilled nor rejected.
* fulfilled: meaning that the operation completed successfully.
* rejected: meaning that the operation failed.

## Reject and Resolve
You can reject or resolve the promise based on `reason` and `value`.

## `Promise.reject(reason)`
The `Promise.reject(reason)` method returns a Promise object that is rejected with the given reason.
You can just put in anything for the reason: be it an Error object, a string...

## `Promise.resolve(value)` and `then`
The `value` is passed next as an argument to `then`. You can make use of the `value` there.

```javascript
var p = Promise.resolve([1,2,3]);
p.then(function(v) {
  console.log(v[0]); // 1
});
```

## With functionality 
Just return a promise with things in it.
```javascript
function myAsyncFunction(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onload = () => resolve(xhr.responseText);
    xhr.onerror = () => reject(xhr.statusText);
    xhr.send();
  });
}
```

## `then`
`then` can take in two functions as its parameters--the former for `resolve`, and the latter for `reject`.

```javascript
p.then((value)=>{
        // value from resolve. 
    },
    (error)=>{
        // probably error object was passed from reject
    }
)
```

or... this, using `catch`:

```javascript
p.then((val) => console.log("fulfilled:", val))  
 .catch((err) => console.log("rejected:", err));
```

## [`Promise.all(iterable)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)

> The Promise.all(iterable) method returns a single Promise that resolves **when all of the promises in the iterable argument have resolved or when the iterable argument contains no promises**. It rejects with the reason of the first promise that rejects.

> If the iterable contains non-promise values, they will be ignored, but still counted in the returned promise array value.

Spoken easily, it waits for all promises inside the iterable object (array) to be fulfilled or at least one of them to be rejected. 

```javascript
var p1 = Promise.resolve(3);
var p2 = 1337;
var p3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'foo');
}); 

Promise.all([p1, p2, p3]).then(values => { 
  console.log(values); // [3, 1337, "foo"] 
});
```

## [`Promise.race(iterable)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race)

It's just almost the same as `Promise.all`, but different in that it resolves or rejects when any one of the promises inside the iterable object rejects or resolves.

### Chaining after `Promise.race` or `Promise.all`
You can chain with `then` or `catch`, because what is returned from these is also a promise.
