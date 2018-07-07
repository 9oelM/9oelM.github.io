---
comments: true
layout: post
title: "This & Object prototypes (3): Objects"
date: 2018-06-30 09:00:00 -0100
categories: development
---

## Types and objects

### Types in JS
* string
* number
* boolean
* null
* undefined
* object

### Built-in Objects
* String
* Number
* Boolean
* Object
* Function
* Array
* Date
* RegExp
* Error

### `String` and `string`, and other primitives

```javascript
var strPrimitive = "I am a string";
typeof strPrimitive;							// "string"
strPrimitive instanceof String;					// false

var strObject = new String( "I am a string" );
typeof strObject; 								// "object"
strObject instanceof String;					// true

// inspect the object sub-type
Object.prototype.toString.call( strObject );	// [object String]
```

Things we can know:

    1. `strPrimitive` is not created by `String` constructor, so it logs `false` on `instanceof String` test.
    2. `strObject` on the other hand is created by `String` constructor.
    3. `"I am a string"` is actually **not** an object but a primitive literal and immutable value. If you want to do something like `"I am a string"[0]"` or `"I am a string".substring(2,4)`, you are going to need a temporary `String` object.

The same logic applies for other objects with corresponding primitives, such as: `1` and `new Number(1)`.

### Others

* `null` and `undefined` have no object wrappers. 
* `Object`, `Array`, `Function`, and `RegExp` are **ALL OBJECTS** regardless of whether the literal or constructed form is used (ex. `new Array()` and `[]`).
* Simpler literal form is preferred. Only use constructed form if you need extra options.

## Contents
An object contains **property names** only that act as pointers (references) to where actual values are stored. 

### Two ways of accessing

```javascript
testObject = { a: 1 }

testObject.a

testObject["a"]
```

`.` and `[ ]` operator function the same. But their usage may vary: 
* `.` operator requires an `Identifier` compatible property name. 
* `[".."]` operator can take any UTF-8 compatible string as the property name. (Ex. `["Hey++^]"`)
* You can also extend the logic to make a property name where necessary (make a string first, and then use that as a property name)
* In objects, property names are always strings. **If you use any other value besides a string (primitive) as the property, it will first be _converted_ to a string.** 

```javascript
var myObject = { };

myObject[true] = "foo";
myObject[3] = "bar";
myObject[myObject] = "baz";

myObject["true"];				// "foo"
myObject["3"];					// "bar"
myObject["[object Object]"];	// "baz"
```

Notice that for the last property `myObject`, `toString` was called to fill the prop name.

### You can also do this with `[".."]`

This is called "Computed property names".

```javascript
var prefix = "foo";

var myObject = {
	[prefix + "bar"]: "hello",
	[prefix + "baz"]: "world"
};

myObject["foobar"]; // hello
myObject["foobaz"]; // world
```

## Property vs Method
If a function belongs to an object (a class), it is referred to as a 'method' ion other languages. 

But technically, as we have seen, functions never _belong_ to objects. 

If you access a property on an object, it is a property access but a method access.

> _Perhaps_ one could argue that a function becomes a method, not at definition time, but during run-time just for that invocation, depending on how it's called at its call-site.

> The safest conclusion is probably that "function" and "method" are interchangeable in JavaScript.

## Arrays

Arrays are objects, so they can have a property like
```javascript
let test = [2,3]
test.a = "hey"

test.length // 2
```
`test.a` does not add to the length of the array. It is just a property. 

But if you use a property name that looks like a number, **it will be understood as a numeric index.** 

```javascript
let test = []
test["0"] = "zero index"
test["1"] = "first index"
test.length // 2
```

## `Object.assign(...)` (also `({ ...objectName })`)
`Object.assign` iterates over all the enumerable, owned keys on the source objects and copies them to the target object (on the LHS)

```javascript
class Dog{
    constructor(name){
        this.name = "name"
    }   
}

let testObj = { person: "Joel" }
let additionalObj = { 
                        say: () => console.log("hello"), 
                        friends: ["B", "E", "Q"],
                        pet: new Dog("Matt")
                    }
let newObj = Object.assign(
    {},  // <<--- the target (newly created) object
    additionalObj,
    testObj
)

console.log(newObj)
/*
    {say: ƒ, friends: Array(3), pet: Dog, person: "Joel"}
*/

console.log(`${newObj.say === additionalObj.say},
${newObj.friends === additionalObj.friends},
${newObj.pet === additionalObj.pet},
${newObj.person === testObj.person}
`)
/*  it shows that properties are copied via `=` assignment only.
    true,
    true,
    true,
    true
*/
```

An alternative to `Object.assign(...)` is `{ ...objectName, ..}` syntax:

```javascript
class Dog{
    constructor(name){
        this.name = "name"
    }   
}

let testObj = { person: "Joel" }
let additionalObj = { 
                        say: () => console.log("hello"), 
                        friends: ["B", "E", "Q"],
                        pet: new Dog("Matt")
                    }
let newObj = {
    ...testObj,
    ...additionalObj
    // you can override properties here
    // like, pet: new Dog("Sally")
    // Notice how simpler and clearer the syntax is!
}

console.log(newObj)
/*
    {say: ƒ, friends: Array(3), pet: Dog, person: "Joel"}
*/

console.log(`${newObj.say === additionalObj.say},
${newObj.friends === additionalObj.friends},
${newObj.pet === additionalObj.pet},
${newObj.person === testObj.person}
`)
/*  it shows that properties are copied via `=` assignment only.
    true,
    true,
    true,
    true
*/
```

## Property descriptors

From ES5 onwards, all properties are described in terms of a **property descriptor**.

### `Object.getOwnPropertyDescriptor()`

Following on from the last example:
```javascript
Object.getOwnPropertyDescriptor( newObj, "friends" );

// See you have three characteristics: writable, enumerable and configurable.
// {value: Array(3), writable: true, enumerable: true, configurable: true}
```

### `Object.defineProperty()`
```javascript
var test = {};

Object.defineProperty( test, "myProp", {
	value: "hey",
	writable: true,
	configurable: true,
	enumerable: true
} );

test.myProp; // hey
```

It's just a difficult way of doing `var test = { myProp: "hey" }`. Just know that there's a function called `Object.defineProperty()`.

### Writable

You cannot chance a value of a property if you set `writable` as `false`. 

```javascript
var test = {};

Object.defineProperty( test, "myProp", {
	value: "hey",
	writable: false,
	configurable: true,
	enumerable: true
} );

test.myProp = "it cannot change";

test.myProp // hey
```

Yeap. It does not change. 

If you `use strict`, you get an error by attempting to modify the value: 

```javascript
'use strict'

var test = {}

Object.defineProperty( test, "myProp", {
	value: "hey",
	writable: false,
	configurable: true,
	enumerable: true
} );

test.myProp = "it cannot change"
/*
logs:
    Uncaught TypeError: Cannot assign to read only property 'myProp' of object '#<Object>'
*/
```

### Configurable

If it's configurable, you can modify its descriptor definition using `defineProperty()` function.

```javascript
var test = {}

Object.defineProperty( test, "myProp", {
	value: "hey",
	writable: true,
	configurable: false,
	enumerable: true
} );

Object.defineProperty( test, "myProp", {
	value: "hey",
	writable: true,
	configurable: true,
	enumerable: true
} ); 

delete test.myProp //fail
test.myProp // "hey". still here. not deleted. 
/*
    Uncaught TypeError: Cannot redefine property: myProp
    at Function.defineProperty (<anonymous>)
*/
```

As you might have noticed, it is just a one-way action, so it cannot be undone.

## Immutability 

### Object constant
```javascript
var myObject = {};

Object.defineProperty( myObject, "NOT_CHANGING", {
    value: "whatsup",
    writable: false,
    configurable: false
} );
```
Effect: cannot be changed, redefined or deleted.

### Prevent extensions
```javascript
var myObject = {
    a: 2
};

Object.preventExtensions( myObject );

myObject.b = "something";
myObject.b; // undefined
```
Effect: prevent the object from being added to new properties. 

### Doing the above two things at once: `Object.seal(..)`
It's literally just that. It seals the object by calling `preventExtensions()` and making `configurable` property as `false`.

### Doing one thing more: `Object.freeze(..)`
Things it does:
* `Object.seal(..)`
* sets `writable` as `false`

## `[[Get]]`
`myObject.myProp` works through `[[Get]]` operation. 

> The default built-in `[[Get]]` operation for an object first inspects the object for a property of the requested name, and if it finds it, it will return the value accordingly.

Otherwise it returns `undefined` for the requested property that is not found. 

## `[[Put]]`
Simple assignment like `let something = 1` would not just call `[[Put]]`. 

If a property is already present in an object:
> 1. Is the property an accessor descriptor (see "Getters & Setters" section below)? If so, call the setter, if any.
> 2. Is the property a data descriptor with `writable` of `false`? If so, silently fail in `non-strict mode`, or throw `TypeError` in `strict mode`.
> 3. Otherwise, set the value to the existing property as normal.

If a property is not present, it is more complex, which will be covered later. 

## Getters & Setters 
You can override getters and setters like:
```javascript
const myObj = {
    get a(){
        return this._a
    },
    set a(val){
        this._a = val - 1
    }
}

> myObj.a
    undefined
> myObj.a = 4
    4
> myObj.a
    3
```

## Existence
Distinguishing between `undefined` as a property and that as nothing.
```javascript
const myObj = {
    test: undefined
}

//both would log undefined

myObj.test // undefined
myObj.sofeiewagionweiogw // undefined

"test" in myObj // true
"sofeiewagionweiogw" in myObj // false

myObj.hasOwnProperty("test") // true
myObj.hasOwnProperty("sofeiewagionweiogw") // false
```

### `in` vs `hasownProperty(..)`
`in`: checks the object itself and the prototype chain to see if the property is present in these by **looking at the existence of the property name supplied**.

`hasOwnProperty(..)` checks only the target object itself. It will NOT go over the prototype chain. 

## Enumeration
```javascript
var myObject = { };

Object.defineProperty(
    myObject,
    "a",
    // make `a` enumerable, as normal
    { enumerable: true, value: 2 }
);

Object.defineProperty(
    myObject,
    "b",
    // make `b` NON-enumerable
    { enumerable: false, value: 3 }
);

myObject.b; // 3
("b" in myObject); // true
myObject.hasOwnProperty( "b" ); // true

// .......

for (var k in myObject) {
    console.log( k, myObject[k] );
}
// "a" 2
```

It's just that `b` exists, but it does not get referred to inside `for..in` loop.

* You can check with `propertyIsEnumerable(..)` too see if the property name exists directly on the object and is enumerable.
* `Object.keys(..)` returns an array of all enumerable properties. 
* `Object.getOwnPropertyNames(..)` returns an array of all properties regardless. Both `keys(..)` and `getOwnPropertyNames(..)` would inspect only the direct object. 

## Iteration

### `for..in` 
iterates over enumerable properties on an object. You are getting the values directly. 

### Normal `(let i = 0; i < arr.length; i++)` loop
iterates over indices to get values.  

### `forEach(..)`
iterates over all values in an array, ignoring any callback return values. 
```javascript 
const arr = [3,4,5,6]
let test = arr.forEach((elem)=>{console.log(elem); return 3})
test // undefined. 
```
### `every(..)`
iterates until the end or the callback returns a falsy value. 
```javascript
const arr = [3,4,5,6]
arr.every((elem,index)=> { console.log(elem); return index == 2 ? false : true})
/*
logs:
3
4
5
*/
```

### `some(..)`
reverse of `every(..)`. Iterates until the end or the callback returns a truthy value.
```javascript
arr.some((elem,index)=> { console.log(elem); return index == 2 ? false : true})
/*
logs:
3
*/
```

### Index order is not guaranteed
> The order of iteration over an object's properties is not guaranteed and may vary between different JS engines.

### `for..of` 
