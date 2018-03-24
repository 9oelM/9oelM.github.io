---
layout: post
title: "Scope and closure"
date: 2018-03-24 09:10:00 -0100
categories: development
---

###FYI
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
* The javascript engine will look into the immediate scope first where the variable is referenced, and if it cannot find the variable, it will look at the outer scope, and then outer scope and so on (until the global scope).
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
