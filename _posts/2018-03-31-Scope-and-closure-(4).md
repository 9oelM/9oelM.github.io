---
layout: post
title: "Scope and closure (4)"
date: 2018-03-31 09:00:00 -0100
categories: development
---
## Definition of closure
> Closure is when a function is able to remember and access its lexical scope even when that function is executing outside its lexical scope.
> Closure lets the function continue to access the lexical scope it was defined in at author-time.

## Closure in practice
```javascript
function outer(){
    var a = 1;
    function inner(){
        console.log(a);
    }
    return inner; // here it is returned as a value, not as console.log(a);
}
var test = outer(); // mark 1
test();
```

`inner()` has an access to the variable `a` according to the rule of lexical scope. `outer()` returns the function `inner` itself as a _value_, not as a return value of the function.

Now `test` receives the value of `inner` function. and `test` is run. But now it's **executed outside of its lexical scope**. 

At mark 1, the `outer()` function becomes no more useful. However the variable inside, which is `a`, can still be referenced by `inner()` that is not yet executed.

This, without understanding, of course happens, but it's just a detailed look at how javascript behaves. 

## Loops and closure

`Still writing..`