---
title: "Set up multiple monitors on Optimus laptop running Kali linux"
date: "2021-09-17T09:00:00.009Z"
category: ["javascript", "prototype pollution"]
---

# Prototype pollution
_Note_: if you already know what this is, you can just pass this section.

Javascript has a very special feature in its language, called `prototype`. Unlike other major programming languages, Javascript will inherit its properties from prototype.

# A very simple example
```js
const b = {}
b.__proto__.TEST = () => 1

const c = {}

c.TEST() // 1
```

# Why `JSON.parse`?

We see dozens of examples on the Internet just using `JSON.parse` without any explanations. Before explaining why `JSON.parse` is needed, let's see why some code that wouldn't work for prototype pollution:

```js
const isObject = obj => obj && obj.constructor && obj.constructor === Object;

function merge(a, b) {
    console.log(b); // prints { __proto__: { admin: 1 } }
    for (var attr in b) {
        console.log("Current attribute: " + attr); // prints Current attribute: __proto__
        if (isObject(a[attr]) && isObject(b[attr])) {
            merge(a[attr], b[attr]);
        } else {
            a[attr] = b[attr];
        }
    }
    return a
}

function clone(a) {
    return merge({}, a);
}

clone({ __proto__: { TEST: 1 }})

const A = {}

A.TEST // undefined (doesn't work)
```

The reason it's not working here is that `__proto__` does not become a user-generated property in the newly created object from `{ __proto__: { TEST: 1 }}`. So if you log the object on any debugging tool, it will just log `{}`, like this:

![Empty object]()

However, if you use `JSON.parse`, strangely enough, it will preserve `__proto__` key of the object just like any other objects.

Because all objects point to the same prototype of `Object`, adding a property to the prototype will cause another object to have the same property too, referenced from the same prototype.

Some prominent CVEs related to prototype pollution:
- 