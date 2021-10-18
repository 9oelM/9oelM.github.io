---
tags: ["development", "javascript"]
title: "Difference among const, let, var"
tab: "post"
date: "2017-10-01T09:00:00.009Z"
---
### `var` 
**Varaiable declaration**
```
var foo = 'bar1';
var foo = 'bar2';
```
makes no error.

**Hoisting**
```
console.log(foo); // undefined
var foo;
```
Hoisting works for `var`.

**Scope**
For `var`, it's a **function scope**.
```
function test(){
  var foo = 'bar1';
  cosole.log(foo); // bar1
  if (true) {
    var foo = 'bar2';
    console.log(foo); // bar2
  }
  console.log(foo); // foo outside changed to bar2. Means foo outside the if statement and foo inside it are the same variables. 
}
```

### `let` and `const`
**Variable declaration**
```
let foo = "test";
let foo = "test2";
```
makes an error.

**Hoisting**
```
console.log(foo);
// Error: Uncaught ReferenceError: foo is not defined
let foo;
```
No hoisting for `let` and `const`.

**Scope**
Block-scope for `let` and `const`.
```
let foo = 'bar1';
console.log(foo); // bar1
if (true) {
  let foo = 'bar2';
  console.log(foo) // bar2
}
console.log(foo); // bar1
```

### `let` vs `const`
It's all about immutability.
```
let test = 1
test = 2 // possible

const test2 = 1
test = 2 // impossible
```
and `const` should always be assigned a value when it is declared:
```
const abc = "abc" // correct
const fgh;
fgh = "fgh"; // incorrect. Cannot happen 
```

### Sources
* https://gist.github.com/LeoHeo/7c2a2a6dbcf80becaaa1e61e90091e5d
* http://blog.nekoromancer.kr/2016/01/26/es6-var-let-%EA%B7%B8%EB%A6%AC%EA%B3%A0-const/
* https://gist.github.com/LeoHeo/7c2a2a6dbcf80becaaa1e61e90091e5d\
* https://medium.com/craft-academy/javascript-variables-should-you-use-let-var-or-const-394f7645c88f
