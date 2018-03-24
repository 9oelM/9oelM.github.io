---
layout: post
title: "Scope and closure (2)"
date: 2018-03-24 09:10:00 -0100
categories: development
---

##FYI
Notes made with [You don't know JS]https://github.com/getify/You-Dont-Know-JS/blob/master/scope%20%26%20closures/ch3.md).

## Writing good codes
### Function scope
> It encourages the idea that all variables belong to the function, and can be used and reused throughout the entirety of the function (and indeed, accessible even to nested scopes). This design approach can be quite useful, and certainly can make full use of the "dynamic" nature of JavaScript variables to take on values of different types as needed." 
My own example:
```javascript
function simpleArrayTest(){
    printArray(makeArray(10));
    function printArray(array){
        array.forEach((element) => console.log(element));
    }
    function makeArray(size){
        return Array(size).fill().map((x,i)=>i);
    }
}
simpleArrayTest();
// will print 1 2 3 4 5 6 7 8 9 10
```
### Hide variables inside a function.
According to the principle of Least Privilege (AKA Least Authority or Least Exposure), you should expose only what is minimally necessary, and "hide" everything else. **This way, the design keeps private details private, which is usually considered better software.**
### Create an object as a namespace
* > "A particularly strong example of (likely) variable collision occurs in the global scope. Multiple libraries loaded into your program can quite easily collide with each other if they don't properly hide their internal/private functions and variables."
* > "Such libraries typically will create a single variable declaration, often an object, with a sufficiently unique name, in the global scope. **This object is then used as a "namespace" for that library, where all specific exposures of functionality are made as properties of that object (namespace), rather than as top-level lexically scoped identifiers themselves:"**
    ```javascript
    var MyReallyCoolLibrary = {
        awesome: "stuff",
        doSomething: function() {
            // ...
        },
        doAnotherThing: function() {
            // ...
        }
    };
    ```
### Save the global scope with immediately invoked function
Immediately invoked.
```javascript
(function test(){

})();
// some codes ... that need to be written in global scope. Now function test() is not related to the global scope at all, which is good.
```

### Named would be better than anonymous
Downsides for anonymous functions:
 * Makes it difficult for stack tracing.
 * for recursion, the deprecated `arguments.callee` is required due to absence of function's name.
 * It's not more readable or understandable. 
 * So instead of doing something like this:
    ```javascript
    function simpleArrayTest(){
        printArray(makeArray(10));
        function printArray(array){
            array.forEach((element) => console.log(element));
        }
        function makeArray(size){
            return Array(size).fill().map((x,i)=>i);
        }
    }
    ```
 * do:
    ```javascript
    function simpleArrayTest(){
        printArray(makeArray(10));
        function printArray(array){
            array.forEach(
                function printNums(element){            console.log(element) 
                }); // Now it's got a name
        }
        function makeArray(size){
            return Array(size).fill().map((x,i)=>i);
        }
    }
    ```