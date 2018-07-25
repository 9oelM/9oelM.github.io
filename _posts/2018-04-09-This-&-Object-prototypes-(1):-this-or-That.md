---
comments: true
layout: post
title: "This & Object prototypes (1): this or That?"
date: 2018-04-09 09:00:00 -0100
categories: development
---
## Using `this` is confusing

### The first confusion
```javascript
function test(){
    this.count++; 
    // this is actually a global variable here..
}

test.count = 0; 
// you are adding count property to the test function.
// this.count and test.count are *different*.

test();
test();
test();

console.log(test.count); 
// 0
console.log(window.count); 
// NaN because it was not initialized
```

### Avoiding using `this`
```javascript
function test(){
    test.count++; 
    // you are incrementing count property that belongs to test function.
}

test.count = 0; 
// you are initializing the count property. 

test();
test();
test();

console.log(test.count); 
// 3
```

### Or, using `Function.prototype.call()`
```javascript
call([thisObj[, arg1[, arg2[,  [, argN]]]]])  
```
The `call()` method allows you to point to the object in the first argument. Additional arguments serve as arguments for the object (function) in the first argument. 

Simply said, it [calls a method of an object, substituting another object for the current object.](https://docs.microsoft.com/en-us/scripting/javascript/reference/call-method-function-javascript) It allows you to change the `this` object of a function from the original context to the new object specified by thisObj. 

If you omit the first argument, `thisObj` would be the `global` object. 

```javascript
function test(num){
    this.count += num;
    // you are incrementing count property that belongs to test function.
}

test.count = 0; 
// you are initializing the count property. 

test.call(test, 1);
test.call(test, -1);
test.call(test, 1); 
// the test function serves as thisObj. 
// Now, this inside test function points to the function itself.

console.log(test.count);  
// 1
```

```javascript
window.count = 0;

function test(num){
    this.count += num;
}

test.count = 0; 

test(1);
test(-1);
test(1); 
// this inside test function points to the global object, window. 
// this is not what we want.
console.log(test.count);  
// 0
console.log(window.count);
// 1
```

### Warning on `this` and scopes
`this` does not refer to a function's lexical scope. 

Consider the code copied from YDKJS:

```javascript
function foo() {
    var a = 2;
    this.bar();
}

function bar() {
    console.log( this.a );
}

foo(); // logs undefined
```

> "the developer who writes such code is **attempting to use this to create a bridge between the lexical scopes of foo() and bar()**, so that bar() has access to the variable a in the inner scope of foo(). No such bridge is possible. You cannot use a this reference to look something up in a lexical scope. It is not possible."

## `this`
* `this` is NOT author-time binding. It's a runtime binding. It depends on contexts. It's not about WHERE the function is called from, but **HOW** the function is called. 