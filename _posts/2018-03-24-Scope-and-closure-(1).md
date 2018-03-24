---
layout: post
title: "Scope and closure (1)"
date: 2018-03-24 09:10:00 -0100
categories: development
---

## FYI
Notes made with [You don't know JS](https://github.com/getify/You-Dont-Know-JS/blob/master/scope%20%26%20closures/ch1.md).

### Simplified steps in compilation
1. Tokenizing: breaking the code into single parts, like `var test = 2` to `var` and `test` and `=` and `2`.
2. Parsing: "taking a stream (array) of tokens and turning it into **a tree of nested elements**, which collectively represent the grammatical structure of the program. This tree is called an "AST" (Abstract Syntax Tree)."
3. Code generation: the process of taking an AST and turning it into executable code (machine readable)
4. Note: Compilation happens really fast for javascript.

### Explained
1. Compiler declares a variable (if not previously declared in the current scope)
2. When executing, Engine looks up the variable in Scope and assigns to it, if found.

### LHS and RHS (*more of non-LHS*) reference
1. LHS reference: `a` in `var a = 1`. **For assigning a value to a variable. **
2. RHS reference: **for referencing a value to a variable. **
    ```javascript
    function hi(comment){
        window.alert(comment);
    }
    hi("hi");
    ```
    * RHS function call to `hi()` function in the last line.
    * LHS reference for `comment = "hi"`
    * RHS reference for `comment` in `window.alert(comment)`.
    * RHS reference for `window`.

### Nested scope
* Scopes can be nested inside other scopes. 
* The javascript engine will look into **the immediate scope first where the variable is referenced**, and if it cannot find the variable, it will look at the outer scope, and then outer scope and so on (until the global scope).
* if **RHS look-up fails**, it will cause a `ReferenceError`.
    ```javascript
    console.log(i);
    ```
    this will cause an error since compiler does not know the variable `i` at all.

* if **LHS look-up fails and the program is not in `strict` mode**, the global scope will create a new variable of that name in the global scope. For example:
    ```javascript
    i = 1;
    console.log(i);
    // LHS lookup fails in the first line and the global scope will make a new variable called i.
    // in other words, it will do var i; for us. 
    ```
    this works perfectly fine without any errors in javascript.

### Two types of scope
1. Lexical scope (widely used)
2. Dynamic scope

### Lexical scope
* > "The lexing process examines a string of source code characters and **assigns semantic meaning to the tokens** as a result of some stateful parsing."
* The lexical scope is defined at the lexing (write) time and is based on the scopes and variables that I write. 
* _**Scope look-up stops once it finds the first match. The same identifier name can be specified at multiple layers of nested scope, which is called "shadowing"**_ (the inner identifier "shadows" the outer identifier). Regardless of shadowing, scope look-up always starts at the innermost scope being executed at the time, and **works its way outward/upward until the first match, and stops.** My understanding is this:
    ```javascript
    function a(){
        var test = 1; 
        console.log(test); // will log 1 because var test = 1 is in the current scope
        function b(){
            var test = 2; 
            // will log 2 because var test = 2 is in the current scope
            console.log(test);
            function c(){
                var test = 3; // will log 3 because var test = 3 is in the current scope
                console.log(test);
            }
            c();
        }
        b();
    }
    a(); // a is executed here
    ```
* But if you allege to have two variables of the same name that can be referenced at the same time, you could attach one to the global object as its property (FYI, Global variables are also automatically properties of the global object like `window`) . For example:
    ```javascript
    window.test = "another 0";
    function a(){
        var test = "0";
        console.log(test); // logs 0
        console.log(window.test); // logs another 0
    }
    a();
    // This is completely possible. 
    ```

### Other ways in Lexical scope
> "Both of them are equally frowned-upon in the wider community as bad practices to use in your code. But the typical arguments against them are often missing the most important point: **cheating lexical scope leads to poorer performance.**"

### 1. `eval()`
* The `eval(..)` function in JavaScript takes a string as an argument, and **treats the contents of the string as if it had actually been authored code at that point in the program.**
For example:
    ```javascript
    function a(str){
        eval(str);
        console(b); // will print 0
    }
    a("b = 0");
    ```
* Note: `eval()` in `strict` mode is almost useless because "eval(..) when used in a strict-mode program operates in its own lexical scope, which means declarations made inside of the eval() do not actually modify the enclosing scope."
* Note 2: this function is not really worth using because it does not add anything to the program most of the time. 

### 2. `with()`: deprecated. So I'm not gonna study it. 

### `eval()` and `with()` are never good. 
> "The JavaScript Engine has a number of performance optimizations that it performs during the compilation phase. Some of these boil down to being able to essentially statically analyze the code as it lexes, and pre-determine where all the variable and function declarations are, so that it takes less effort to resolve identifiers during execution."

> "But if the Engine finds an eval(..) or with in the code, **it essentially has to assume that all its awareness of identifier location may be invalid, because it cannot know at lexing time exactly what code you may pass to eval(..) to modify the lexical scope, or the contents of the object you may pass to with to create a new lexical scope to be consulted."**

> "In other words, in the pessimistic sense, **most of those optimizations it would make are pointless if eval(..) or with are present, so it simply doesn't perform the optimizations at all.**"
