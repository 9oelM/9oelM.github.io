---
title: "Scope and closure (5): modules"
tab: "post"
date: "2018-04-07T09:00:00.009Z"
tags: ["development", "javascript"]
---

## Getting the hang of it
```javascript
function myModule(){
    
    var testString = "im testing";
    var hi = "hi";
    
    function test(){
        console.log(testString);
    }
    
    function hi(){
        console.log(hi);
    }
    // more functions...
}
```

function `test` has a closure over the scope of the function `myModule`. Nothing really special is going on here.

```javascript
function myModule(){
    
    var testString = "im testing";
    var hi = "hi";
    
    function test(){
        console.log(testString);
    }
    
    function hi(){
        console.log(hi);
    }
    
    return {
        test: test;
        hi: hi;
    }
    // more functions...
}

var moduleTest = myModule();
moduleTest.test();
moduleTest.hi();
```

And here are some important points:
1. `test()` and `hi()` cannot be invoked without invoking `myModule()`. Without it, the creation of the inner scope and the closures would not occur.
2. The object we return has references on it to our inner functions, **but not to our inner data variables.** We keep those hidden and private.
3. **It is not required that we return an actual object (literal) from our module. We could just _return back an inner function_ directly.**

And from this we can deduce two important conditions for a module:
1 There must be an **outer enclosing function**, and it must be invoked at least once (each time creates a new module instance).
2. **The enclosing function must return back at least one inner function**, so that this inner function has closure over the private scope, and can access and/or modify that private state.

## Modules with IIFE
You can enclose the module to give it a truly private scope. This means you could invoke the module multiple times and you don't have a confusion in the references of variables. 

```javascript
var moduleTest = (function myModule(){
    
    var testString = "im testing";
    var hi = "hi";
    
    function test(){
        console.log(testString);
    }
    
    function hi(){
        console.log(hi);
    }
    
    return {
        test: test;
        hi: hi;
    }
    // more functions...
})(); // you could pass parameters down if you want

moduleTest.test();
moduleTest.hi();
```

## Modules in ES6
1. In ES6, each file is a separate module. 
2. ES6 modules do not have an "inline" format, they must be defined in separate files (one per module). 
3. **The contents inside the module file are treated as if enclosed in a scope closure**, just like with the function-closure modules seen earlier.

`testString.js`

```javascript
function test(testString){
    console.log(testString);
}
export test; // export functionName
```

`hi.js`

```javascript
function hi(hi){
    for(let i = 0; i < 3; i++)
        console.log(hi);
}
export hi;
```

`output.js`

```javascript
import test from "testString" 
// import arbitraryNameForObject from fileNameWithoutExtension
// used when you want to import selective functions from a module
module hiMachine from "hi" 
// module arbitraryNameForObject from fileNameWithoutExtension
// used when you want to import the whole module

test("I'm just testing"); // logs "I'm just testing"

hiMachine.hi("hey"); // logs "hi hi hi"
```

### For more
see [Mozila](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/import) for help. In fact, these are all the possible ways to import (copied from this link):

```javascript
import name from "module-name";
import * as name from "module-name";
import { member } from "module-name";
import { member as alias } from "module-name";
import { member1 , member2 } from "module-name";
import { member1 , member2 as alias2 , [...] } from "module-name";
import defaultMember, { member [ , [...] ] } from "module-name";
import defaultMember, * as alias from "module-name";
import defaultMember from "module-name";
import "module-name";
```
