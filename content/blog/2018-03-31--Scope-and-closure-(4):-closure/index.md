---
title: "Scope and closure (4): closure"
date: "2018-03-31T09:00:00.009Z"
tags: ["development", "javascript"]
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

### Why this does not work as intended
```javascript
for (var i=1; i<=5; i++) {
    setTimeout( function timer(){
        console.log( i );
    }, i*1000 );
}
```

So this is how I understood things:

1. The for loop does not recognize our intention, which is to output 1 2 3 4 5, one at a time per second. Instead, it goes just very fast from `i = 1` to `i = 5` (and further to `i = 6` according to the condition when the loop is escaped).
2. The `timer` function refers to the same `i` still. And by the time the loop is escaped, `setTimeout` fires and gives an output. 
3. But the second argument `setTimeout` function were correctly given because `i*1000` would have been `1000`, `2000`, `3000`, ... and `5000` respectively.
4. And so when `setTimeout` fires, it will give:
    ```javascript
    6 6 6 6 6 // one per each second
    ```
    
### Solution
The solution is IIFE and another variable to avoid referring to the same address (variable)

FYI, IIFE receives its input in this way:

```javascript
var input = "im testing";
(function(test){
        console.log(test)}
)(input); // outputs "im testing"
```

The argument (input) in the outer bracket is what the argument (test) in the inner bracket refers to. 

Both of the following ways are the solutions (copied from YDKJS):
```javascript
for (var i=1; i<=5; i++) {
    (function(){
        var j = i;
        setTimeout( function timer(){
            console.log( j );
        }, j*1000 );
    })();
}
```

```javascript
for (var i=1; i<=5; i++) {
    (function(j){
        setTimeout( function timer(){
            console.log( j );
        }, j*1000 );
    })( i );
}
```

Now, `setTimeout` is referring to a variable of changed value (1,2,3,4,5) for each time of iteration because **it has a closure over brand new scope for each iteration.**

### Another easy solution
`let` declares a variable for each iteration, which makes it unnecessary to do all the dirty works we did above:

```javascript
for (var i=1; i<=5; i++) {
    let j = i; // yay, block-scope for closure!
    setTimeout( function timer(){
        console.log( j );
    }, j*1000 );
}
```

and 

```javascript
for (let i=1; i<=5; i++) {
    setTimeout( function timer(){
        console.log( i );
    }, i*1000 );
}
```

will just work.

