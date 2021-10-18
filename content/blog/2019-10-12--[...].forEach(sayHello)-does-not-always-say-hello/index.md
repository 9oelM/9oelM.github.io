---
title: "[...].forEach(saveFromZombies) does not always save people"
date: "2019-10-12T09:00:00.009Z"
tab: "post"
tags: ["development", "forEach", "javascript", "typescript"]
---

## The first encounter with the problem

I was coding as usual. 

And I faced an odd encounter with how `forEach` works. 

Here goes the code to give an example of that. Imagine the code below is the code from one of the libaries I was using:

```js
interface IWalkingDead {
  saveFromZombies: (name: string) => void;
  possibility: number;
};

const walkingDead: IWalkingDead = {
  saveFromZombies: function (name) { 
    const msg = Math.random() < this.possibility ? 
      `${name} was succesfully saved by the chance of ${this.possibility}` : 
      `R.I.P ${name} - by the chance of ${this.possibility}`;
        console.log(msg); 
    },
  possibility: 0.5,
}
```

And I spotted the code in my company's app that was kind of doing:

```js
> walkingDead.saveFromZombies('Glenn'); // 'R.I.P Glenn - by the chance of 0.5'
> walkingDead.saveFromZombies('Shane'); // 'Shane was succesfully saved by the chance of 0.5'
> walkingDead.saveFromZombies('Lori');  // 'R.I.P Lori - by the chance of 0.5'
> walkingDead.saveFromZombies('Daryl'); // 'Daryl was succesfully saved by the chance of 0.5'
```

Of course, I did not want this. It's against DRY principle. So I refactored the code to:

```js
const survivors: Array<string> = ['Glenn', 'Shane', 'Lori', 'Daryl'];
survivors.forEach(options.saveFromZombies);
```

Cooler and more succinct. 

But I was very well tricked into thinking that this would just work. See what this code gave:

```js
// survivors.forEach(options.saveFromZombies) outputs:
'R.I.P Glenn - by the chance of undefined',
'R.I.P Shane - by the chance of undefined',
'R.I.P Lori - by the chance of undefined',
'R.I.P Daryl - by the chance of undefined'
```

Oops. Everybody's dead. Ok. Now you are starting to get a grasp of why.

It's the _`this`_ binding. Let's check what `this` is actually doing inside our code:

```js
const walkingDead: IWalkingDead = {
  saveFromZombies: function (name) { 
    const msg = Math.random() < this.possibility ? 
      `${name} was succesfully saved by the chance of ${this.possibility}` : 
      `R.I.P ${name} - by the chance of ${this.possibility}`;
      console.log(msg);
      console.log(this); // <----- just added this line to check what `this` is doing
    },
  possibility: 0.5,
}
```

Well, no surprise. It outputs: 

```js
...

R.I.P Daryl - by the chance of undefined
Object [global] {
  DTRACE_NET_SERVER_CONNECTION: [Function],
  DTRACE_NET_STREAM_END: [Function],
  DTRACE_HTTP_SERVER_REQUEST: [Function],
  DTRACE_HTTP_SERVER_RESPONSE: [Function],
  DTRACE_HTTP_CLIENT_REQUEST: [Function],
  DTRACE_HTTP_CLIENT_RESPONSE: [Function],
  global: [Circular],
  process:
   process {
     title: 'node',
     version: 'v10.16.0',
     versions:
      { http_parser: '2.8.0',
        node: '10.16.0',
        v8: '6.8.275.32-node.52',
        uv: '1.28.0',
        zlib: '1.2.11',
        brotli: '1.0.7',
        ares: '1.15.0',
        modules: '64',
        nghttp2: '1.34.0',
        
....
```

Ok. So here's the main point of this article: 

> **Just passing in the reference of a function that uses `this` referring to somewhere else than a `globalThis`, into a `forEach` might cause an error in javascript because `this` will point to a global `this`.**

So what do we do? Here are some things to let you know:

## 1. Explicitly call the function 

Yeah this works. This will save some of the guys' lives. 

```js
const survivors: Array<string> = ['Glenn', 'Shane', 'Lori', 'Daryl'];
survivors.forEach((survivor: string) => options.saveFromZombies(survivor));

// outputs:
// R.I.P Glenn - by the chance of 0.5
// ...
```

Same for the normal `function` as well:

```js
const survivors: Array<string> = ['Glenn', 'Shane', 'Lori', 'Daryl'];
survivors.forEach( function (survivor: string) { walkingDead.saveFromZombies(survivor) });
// outputs:
// R.I.P Glenn - by the chance of 0.5
// ...
```

## 2. [Pass `thisArg` as an argument](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach#Syntax)

These are the parameters for `forEach`:

```js
arr.forEach(callback(currentValue [, index [, array]])[, thisArg]);
```

You can put in the object to be pointed to as `this` inside `saveFromZombies`. 

```js
const survivors: Array<string> = ['Glenn', 'Shane', 'Lori', 'Daryl'];
survivors.forEach(options.saveFromZombies, walkingDead);

// outputs:
// Glenn was succesfully saved by the chance of 0.5
// ...
```

## 3. Use `bind`

This is an explicit binding. You tell the javascript engine that you want `saveFromZombies` to be bound to `walkingDead` object. 

```js
const survivors: Array<string> = ['Glenn', 'Shane', 'Lori', 'Daryl'];
survivors.forEach(walkingDead.saveFromZombies.bind(walkingDead));

// outputs:
// R.I.P Glenn - by the chance of 0.5
// ...
```

## Further..

Of course, we can, and should apply the same principle when dealing with `map`, `filter`, ... and more. 

## Summary

- We have looked at how `this` might lose context when we put a reference of a function as a callback to `forEach`. 
- The solutions are: (1) Explicitly call the function, (2) Pass `thisArg` as an argument, and (3) Use `bind`.

Happy `forEach` coding! 