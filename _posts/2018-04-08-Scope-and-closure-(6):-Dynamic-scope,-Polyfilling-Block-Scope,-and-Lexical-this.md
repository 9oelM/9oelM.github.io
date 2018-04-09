---
layout: post
title: "Scope and closure (6): Dynamic scope, Polyfilling Block Scope, and Lexical-this"
date: 2018-04-08 09:00:00 -0100
categories: development
---

## Dynamic scope 

> "Dynamic scope seems to imply, and for good reason, that there's a model whereby **scope can be determined dynamically at runtime**, rather than statically at author-time." 

What's important is **where a function is called from.** The scope chain is based on the call stack. 

### `this`
`this` is similar to dynamic scope in that it cares about how a function is called.

## Try-catch instead of a block 

in ES6:
```javascript
function doSomethingWith(thing){
    // some useful calculations
}

{
    let someVariableToBeContained = 0;
    doSomethingWith(someVariableToBeContained);
}

doSomethingWith(someVariableToBeContained); // error
```
would just work. But before ES6:

```javascript
function doSomethingWith(thing){
    // some useful calculations
}

try {
    throw 0;
}
catch(a){
     doSomethingWith(someVariableToBeContained);
}
doSomethingWith(someVariableToBeContained); // error
```
..yeah. 

### `let` block

```javascript
let(sth = 0){
    console.log(sth);
}

// scope is limited to the inside of this (explicit) block.
```
but this is not supported by ES6 syntax. It needs a tool to convert itself. So just doing a normal block would be okay too.

### `Lexical-this`

javascript had this problem that when you do not have favorable function scopes, `this` keyword could not be used except when you use something like `var self = this`.

ES6 solves this problem by the arrow function by introducing `lexical-this`.
Below code is copied from YDKJS:

```javascript
var obj = {
    count: 0,
    cool: function coolFn() {
        // no need for var self = this;
        if (this.count < 1) {
            setTimeout( () => { // arrow-function ftw?
                this.count++; 
                // you do not have to refer to self here anymore. 
                console.log( "awesome?" );
            }, 100 );
        }
    }
};

obj.cool(); // awesome?
```

And below code is more awesome because it shows our intention by adding `bind()`.

```javascript
var obj = {
    count: 0,
    cool: function coolFn() {
        if (this.count < 1) {
            setTimeout( function timer(){
                this.count++; // `this` is safe because of `bind(..)`
                console.log( "more awesome" );
            }.bind( this ), 100 ); // look, `bind()`!
        }
    }
};
obj.cool(); // more awesome
```





