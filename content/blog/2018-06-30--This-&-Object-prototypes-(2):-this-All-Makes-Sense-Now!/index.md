---
title: "This & Object prototypes (2): this All Makes Sense Now!"
date: "2018-06-30T09:00:00.009Z"
category: "development"
---
### 1. Default binding

without the strict mode in effect, the global object is eligible for the default binding:
    
```javascript
function foo() {
    console.log( this.a );
}

var a = 2;

foo(); // 2
```
    
however, **with** the strict mode in effect, the global object is **not** eligible for the default binding:

```javascript
function foo() {
    "use strict";
    console.log( this.a );
}

var a = 2;

foo(); // TypeError: `this` is `undefined`
```

yet, if the call-site is in strict mode, it does not matter (default binding works). It only does not work when the strict mode is applied inside the contents of the function call:

```javascript
function foo() {
    console.log( this.a );
}

var a = 2;

(function(){ // call-site
    "use strict";

    foo(); // 2
})();
```

### 2. Implicit binding

> When there is a context object (object having a reference to a function or a variable) for a function reference, the implicit binding rule says that **it's that object which should be used for the function call's this binding**.

```javascript
function foo() {
    console.log( this.a );
}

var obj = {
    a: 2,
    foo: foo
};

obj.foo(); // 2
```

'shadowing'(?) works too:

```javascript   
function foo() {
    console.log( this.a );
}

var obj2 = {
    a: 42,
    foo: foo
};

var obj1 = {
    a: 2,
    obj2: obj2
};

obj1.obj2.foo(); // 42
```
    
you **lose a implicit binding** when you call an implicitly bound function from a global function. 

Just any global context calling the function that had an implicit binding would look for a global variable. 

```javascript   
function foo() {
    console.log( this.a );
}

var obj = {
    a: 2,
    foo: foo
};

var bar = obj.foo; // function reference/alias!

var a = "oops, global"; // `a` also property on global object

bar(); // "oops, global"
```

### 3. Explicit binding
Use `call` and `apply` to use a selected object for `this` binding. Also refer to [the previous post](https://9oelm.github.io/development/2018/04/09/This-&-Object-prototypes-(1)-this-or-That.html).

Invoke `foo` with explicit binding to `obj` using `call`:

```javascript
function foo() {
    console.log( this.a );
}

var obj = {
    a: 2
};

foo.call( obj ); // 2
```

#### The trick: hard binding

You use `foo.call` no matter where the call site is. This allows you to always bind to the object you want to.

```javascript
function foo() {
    console.log( this.a );
}

var obj = {
    a: 2
};

var bar = function() {
    foo.call( obj ); // -->>>> you use `foo.call` no matter where the call site is
};

bar(); // 2
setTimeout( bar, 100 ); // 2

// `bar` hard binds `foo`'s `this` to `obj`
// so that it cannot be overriden
bar.call( window ); // 2
```

#### So you can use the hard binding like this

Nothing to be explained. Just return the function `foo.apply(...)` to use `bar(...)`.
    
```javascript
function foo(something) {
    console.log( this.a, something );
    return this.a + something;
}

var obj = {
    a: 2
};

var bar = function() {
    return foo.apply( obj, arguments );
};

var b = bar( 3 ); // 2 3
console.log( b ); // 5
```

#### `Function.prototype.bind`

Because this is a common pattern, ES5 has a built in utility `Function.prototype.bind` that does the same thing:

```javascript
function foo(something) {
    console.log( this.a, something );
    return this.a + something;
}

var obj = {
    a: 2
};

var bar = foo.bind( obj );

var b = bar( 3 ); // 2 3
console.log( b ); // 5
```

### 4. `new` Binding

Essentially what you are doing with `new` is just to call another function that serves as a constructor. 

> When a function is invoked with new in front of it, otherwise known as a constructor call, the following things are done automatically:

1. a brand new object is created (aka, constructed) out of thin air
2. the newly constructed object is [[Prototype]]-linked
3. the newly constructed object is set as the this binding for that function call
4. unless the function returns its own alternate object, the new-invoked function call will automatically return the newly constructed object.
    
```javascript
function foo(a) {
this.a = a;
}

var bar = new foo( 2 );
console.log( bar.a ); // 2
```
    
## Precedence 
    
First, speaking of the answer:

```javascript
Default < Implicit < Explicit < new
```

### `Implicit < Explicit` 

```javascript
function foo() {
    console.log( this.a );
}

var obj1 = {
    a: 2,
    foo: foo
};

var obj2 = {
    a: 3,
    foo: foo
};
// Implicit
obj1.foo(); // 2
obj2.foo(); // 3

// Explicit
obj1.foo.call( obj2 ); // 3
obj2.foo.call( obj1 ); // 2
```

### `Implicit < new`

```javascript
function foo(something) {
    this.a = something;
}

var obj1 = {
    foo: foo
};

var obj2 = {};

obj1.foo( 2 );
console.log( obj1.a ); // 2

obj1.foo.call( obj2, 3 );
console.log( obj2.a ); // 3

var bar = new obj1.foo( 4 );
console.log( obj1.a ); // 2
console.log( bar.a ); // 4
```

### `Explicit < new`

`new` can override `hard binding` (a form of explicit binding)
notice that `new bar(3)` does not change `obj1.a` to 3, but creates a new object named `baz` that contains `baz.a` which is 3.

```javascript
function foo(something) {
    this.a = something;
}

var obj1 = {};

var bar = foo.bind( obj1 );
bar( 2 );
console.log( obj1.a ); // 2

var baz = new bar( 3 );
console.log( obj1.a ); // 2
console.log( baz.a ); // 3
```
    
### 4 Rules determining `this`
Just look at the four questions to answer [here](https://github.com/getify/You-Dont-Know-JS/blob/master/this%20%26%20object%20prototypes/ch2.md#determining-this) at the original writing. 

### Exceptions

#### `this` is ignored when you pass `null` or `undefined`

```javascript
function foo() {
    console.log( this.a );
}

var a = 2;

foo.call( null ); // 2
```

### Safer `this` using `Object.create(null)`
You wanna create an empty object without any side effects that can be used with `this`.

```javascript
function foo(a,b) {
	console.log( "a:" + a + ", b:" + b );
}

// our DMZ empty object
var ø = Object.create( null );

// spreading out array as parameters
foo.apply( ø, [2, 3] ); // a:2, b:3

// currying with `bind(..)`
var bar = foo.bind( ø, 2 );
bar( 3 ); // a:2, b:3
```

`Object.create(null)` has no deligation to `Object.prototype`, so it's more empty than `{}`.

### Lexical `this` using ES6 arrow function

> Arrow-functions adopt the this binding from the enclosing (function or global) scope.

```javascript
function foo() {
	// return an arrow function
	return (a) => {
		// `this` here is lexically adopted from `foo()`
		console.log( this.a );
	};
}

var obj1 = {
	a: 2
};

var obj2 = {
	a: 3
};

var bar = foo.call( obj1 );
bar.call( obj2 ); // 2, not 3!
```

`foo` is made bound to `obj1`, so would `bar`.

> The lexical binding of an arrow-function cannot be overridden (even with `new`).
