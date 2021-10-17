---
title: "New javascript specifications in 2019 (What's new in Javascript - Google I/O '19)"
date: "2019-09-10T09:00:00.009Z"
tags: ["development", "javascript", "Google I/O '19"]
---

# Must must must watch!
I got so much great insight from [this video in Google IO 2019](https://youtu.be/c0oy0vQKEZE) detailing latest javascript specs.

## Improvements from the past
- 2x faster javascript parsing on Chrome 75 (V8 v7.5) compared to Chrome 61 (V8 v6.1)
- 11x faster async on Chrome 74 (Node.js 12) compared to Chrome 55 (Node.js 7) 
- -20% memory usage on Chrome 76 compared to Chrome 70

# What's new

## Public & private class fields
### Before

#### You arbitrarily set a private class variable that is accessible outside the class
```js
class Hello {
  constructor(){
    this._msg = 'Hello'
  }
  get msg(){
    return this._msg  
  }
  prepareBye(){
    this._msg = 'Bye'
  } 
}
```

#### You have to call `super(...)` in a child class
```js
class Animal{
  constructor(name){
    this.name = name  
  }
}

class Cat extends Animal{
  constructor(name){
    super(name)
    this.likesBaths = false
  }
}
```

### After
#### You can omit the constructor
```js
class Hello {
  _msg = 'Hello'
  get msg(){
    return this._msg  
  }
  prepareBye(){
    this._msg = 'Bye'
  } 
}
```

#### You can declare private fields
```js
class Hello {
  #msg = 'Hello'
  get msg(){
    return this.#msg  
  }
  prepareBye(){
    this.#msg = 'Bye'
  } 
}
```

An error is going to occur if you try to access `helloInstance.#msg`.

#### You don't have to call `super(...)` in a child class
```js
class Animal{
  constructor(name){
    this.name = name  
  }
}

class Cat extends Animal{
  likesBaths = false
}
```

## Regular expressions
### Before
#### You have to run an inconvenient, unnatural loop to get match objects
```js
const string = 'hex nums: DEADBEEF CAFE'
const regex = /\b\p{ASCII_Hex_Digit}+\b/gu
let match
let result = []
while (match = regex.exec(string)){
  result = [match, ...result]
}
/*
result = 
[
  [
    'CAFE',
    index: 19,
    input: 'hex nums: DEADBEEF CAFE',
    groups: undefined
  ],
  [
    'DEADBEEF',
    index: 10,
    input: 'hex nums: DEADBEEF CAFE',
    groups: undefined
  ]
]
// NOTE: this weird-looking array is actually a valid array; each element contains its value (in this example, string) and also has properties (index, input, groups)
*/
```

### After
#### You can get all match objects with `str.matchAll(regex)`
```js
for (const match of string.matchAll(regex)){
  result = [match, ...result]
}
// result: same as above
```

## Numeric literals
### Before
#### Confusing
```js
const num = 1000000000000
```

### After
#### Clear
```js
const num = 1_000_000_000_000
```

## `BigInt`
### Before
#### Wrong calculation
```js
const num = 1234567890123456789 * 123 
num // 151851 ... 0000, which is obviously wrong
```

### After
#### Correct calculation with BigInt literal
```js
const = 1234567890123456789n * 123n
num // 151851 ... 158047n correct.
```

## Intl & Locale
### Locale for different languages for numbers
```js
12_345_678_901_234_567_890n.toLocaleString('en')
// '12,345,678,901,234,567,890'
const nf = new Intl.NumberFormat('fr')
nf.format(12_345_678_901_234_567_890n)
// 12 345 678 901 234 567 890
```

## Flattening an array
### Before
#### Used a 3rd party library

#### Used `map` and `flat` together
```js
[2,3,4].map(x=>[x,x]).flat() // slower
```

### After
#### `array.flat`
```js
const array = [1, [2, [3]]]
const array2 = [1, [2, [3]]]
array.flat() // [1,2,[3]]
array2.flat(Infinity) // [1,2,3]
```

#### `flatMap`
```js
[2,3,4].flatMap(x=>[x,x]) // faster
```

## `Object.fromEntries`
### Before
#### There is no convenient way back to make it into the original object
```js
const object = {x : 42, y : 50 }
const entries = Object.entries(object) // returns an array of arrays containing key and value
const result = {}

for (const [k, v] of entries){
  result[k] = v
}
```

### After
#### There is a convenient way back to make it into the original object
```js
const result = Object.fromEntries(entries)
```

## `Map`
#### You can play around with `Map` and objects

```js
const object = { language: 'Javascript', coolness: 9001 }
const map = new Map(Object.entries(object))
const objectCopy = Object.fromEntries(map)
```

## `GlobalThis`
### Before
#### You have to manually look for the global `this`
```js
const getGlobalThis = function () { 
  if (typeof self !== 'undefined') { return self; } 
  if (typeof window !== 'undefined') { return window; } 
  if (typeof global !== 'undefined') { return global; } 
  throw new Error('unable to locate global object'); 
}; 

const globalThis = getGlobal(); 
```

### After
#### You already have `globalThis`
```js
const gt = globalThis
```

## Stable sort
### Before
Sort was differently implemented in different javascript engines. 
#### Sort results were not consistent.

This is the code snippet from [itnext](https://itnext.io/whats-new-in-javascript-google-i-o-2019-summary-d16bd2308412):

```js
const list = [
  { name: 'Anna', age: 21 },
  { name: 'Barbra', age: 25 },
  { name: 'Zoe', age: 18 },
  { name: 'Natasha', age: 25 }
];
list.sort((a,b)=>b.age-a.age)
// possible result
[
  { name: 'Natasha', age: 25 }
  { name: 'Barbra', age: 25 },
  { name: 'Anna', age: 21 },
  { name: 'Zoe', age: 18 },
]
```

### After
#### Sort results are now consistent
Sort always returns the same result, with other keys sorted in their range as well

```js
const list = [
  { name: 'Anna', age: 21 },
  { name: 'Barbra', age: 25 },
  { name: 'Zoe', age: 18 },
  { name: 'Natasha', age: 25 }
];
list.sort((a,b)=>b.age-a.age)
// always
[
  { name: 'Barbra', age: 25 },
  { name: 'Natasha', age: 25 },
  { name: 'Anna', age: 21 },
  { name: 'Zoe', age: 18 }
]
```

## `Intl`
### Before
You used 3rd party libraries like `momentjs`.

### After
#### You can rely on `Intl.RelativeTimeFormat`

```js
const { log } = console
const rtfEspanol= new Intl.RelativeTimeFormat('es', {
  numeric: 'auto'
});
log( rtfEspanol.format( 5, 'day' ) ); // dentro de 5 días
log( rtfEspanol.format( -5, 'day' ) ); // hace 5 días
log( rtfEspanol.format( 15, 'minute' ) ); // dentro de 15 minutos

const rtfKo = new Intl.RelativeTimeFormat('ko')
rtf.format(5, 'day') // "5일 후"
```

#### `Intl.ListFormat`
```js
const lfEspanol = new Intl.ListFormat('es', {
  type: 'disjunction'
});
const list = [ 'manzanas', 'mangos', 'plátanos' ];
log( lfEspanol.format( list ) ); // manzanas, mangos o plátanos
```

#### Other new `Intl` APIs like `DateTimeFormat#formatRange`, `Locale` also exist 

Side note: these features might need to be still be specifically built depending on the version of 12.x you are using. For more, check this [PR in node repo](https://github.com/nodejs/node/pull/29522).


## Top-level async
### Before
#### `await` is wrapped by an outer `async`
```js
async function main(){
  const result = await doSomethingAsync();
  doSomethingElse();
}

main();

// or..

(async () => {
  const result = await doSomethingAsync();
  doSomethingElse();
})()
```

### After
#### Top-level `await` is possible
```js
const result = await doSomethingAsync();
doSomethingElse();
```

## More `Promise` APIs

First we need to know about [the promise state definitions](https://dev.to/dance2die/promise-race-vs-promise-any-and-promise-all-vs-promise-allsettled-26if#promise-state-definitions):

- Fulfilled: When a promise is resolved successfully. (opposite of `rejected`)
- Rejected: When a promise failed.
- Pending: When a promise is “neither fulfilled nor rejected“.
- Settled: Not really a state but an umbrella term to describe that **a promise is either `fulfilled` or `rejected` (important for the new methods)**

### Before
#### Only two: `Promise.all` & `Promise.race`
#### `Promise.all`
- Returns a `Promise` when all promises in an interable are `fulfilled` or one of them gets `rejected`.
- Returns a single `Promise` that that resolves when all of the promises passed as an iterable have resolved or when the iterable contains no promises ([See MDN Docs for more](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all))

```js
const promises = [
  fetch('/component-a.css')
  fetch('/component-b.css')
  fetch('/component-c.css')
]
try{
  const styleResponses = await Promise.all(promises)
  enableStyles(styleResponses)
  renderNewUi();
}
catch(reason){
  displayError(reason)
}
```

#### `Promise.race`
- Returns a Promise as soon as one of the inputs settles
- Returns a `Promise` that fulfills or rejects as soon as one of the promises in an iterable fulfills or rejects, with the value or reason from that promise.

```js
try{
  const result = await Promise.race([
    performHeavyComputation(),
    rejectAfterTimeout(2000),
  ])
  renderResult(result)
} catch(error){
  renderError(error)
}
```

### After
#### We've got two more: `Promise.allSettled` & `Promise.any`
#### `Promise.allSettled`
- When all of the input promises are settled (either fulfilled or rejected). 
- You don't care about the success or failure

```js
const promises = [
  fetch('/api-1')
  fetch('/api-2')
  fetch('/api-3')
]

await Promise.allSettled(promises)
removeLoadingIndicator(); // you want to do this regardless of successes or failures in promises.
```

#### `Promise.any`
- Gives a signal as soon as one of the promises fulfills 
- It does not reject early when one of the promises rejects (it is going to wait to see if other promises will reject too)
- Only if ALL promises reject, you end up in the `catch` block. 
- Otherwise it will give you the first promise that fulfills 
- Similar to `.race`, but `.race` rejects as soon as one of the promises rejects. But `.any` is still going to wait. 
- In short, `.any` is going to wait for the first promise that fulfills, but `.race` is going to wait for the first promise that either fulfills or rejects. 

```js
const promises = [
  fetch('./endpoint-a').then(()=>'a'),
  fetch('./endpoint-b').then(()=>'b'),
  fetch('./endpoint-c').then(()=>'c'),
]
try{
  const first = await Promise.any(promises)
  // Any of the promises was fulfilled
  console.log(first)
} catch (error){
  // All promises were rejected
  console.log(error)
}
```

## WeakRef

Objects are strongly referenced in javascript. `WeakMap` and `WeakSet` allow garabge collection at any time.  `WeakRef` is kind of more advanced API than these. 

### Before
#### Inefficient use of `Map` with a memory leak 
- `Map` holds onto values and keys strongly, so image `name`s and data will never be garbage-colelcted, which is going to cause a memory leak. 
- `WeakMap` is not going to help here because it does not storing a key as a string. 

```js
function getImage(name){
  const image = performExpensiveOperation(name)
  return image
}

const cache = new Map()
function getImageCached(name){
  if(cache.has(name)) return cache.get(name)
  const image = performExpensiveOperation(name)
  cache.set(name, image)
  return image
}
```

### After
#### Use `WeakRef` to allow garbage collection

```js
const cache = new Map()
function getImageCached(name){
  let ref = cache.get(name);
  if (ref !== undefined){ // You have a ref already
    const deref = ref.deref()
    if (deref !== undefined) return deref // garbage collector may have cleaned up some of the references if it were running out of memory, OR simply the reference has not yet been added. Check if this happened. 
  }
  const image = performExpensiveOperation(name)
  ref = new WeakRef(image)
  cache.set(name, ref) // You set a ref as a value instead of the image itself 
  return image
}
```

But recognize one last problem: the `name` keys in the `cache` won't be removed. 

#### Use `WeakRef` & `FinalizationGroup` to allow garbage collection

```js
const finalizationGroup = new FinalizationGroup(iterator => {
  for (const name of iterator){
    const ref = cache.get(name)
    if (ref !== undefined && ref.deref() === undefined){ // name still exists, but there is no corresponding reference. Delete name as it is dangling. 
      cache.delete(name)
    }
  }
})

const cache = new Map()
function getImageCached(name){
  let ref = cache.get(name);
  if (ref !== undefined){
    const deref = ref.deref()
    if (deref !== undefined) return deref 
  }
  const image = performExpensiveOperation(name)
  ref = new WeakRef(image)
  cache.set(name, ref) // You set a ref as a value instead of the image itself 
  finalizationGroup.register(image, name); // Removes the name (only for name, not for ref) from the cache once the data is garbage-collected.
  return image
}
```

