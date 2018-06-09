---
comments: true
layout: post
title: "Blog for Young (3): More troubleshooting"
date: 2018-06-07 09:00:00 -0100
categories: works
---


## Error
I kept getting this error, greatly increasing the loading speed for the website:

Now the website looks like this right now

![Website now](https://i.imgur.com/XmhDPcL.png)

But it keeps throwing me an error. 

Everything loads perfectly except in regards to speed.

So the error from the console is this one:

```javascript
grommet.min.js:1 Uncaught ReferenceError: React is not defined
    at Object.<anonymous> (grommet.min.js:1)
    at t (grommet.min.js:1)
    at Object.<anonymous> (grommet.min.js:26)
    at t (grommet.min.js:1)
    at Object.<anonymous> (grommet.min.js:1)
    at t (grommet.min.js:1)
    at grommet.min.js:1
    at grommet.min.js:1
```

and I found that this is related to.. either `import` or webpack:

* [might be webpack](https://stackoverflow.com/questions/32070303/uncaught-referenceerror-react-is-not-defined)
* [might be import problem](https://teamtreehouse.com/community/solved-uncaught-reference-error-react-not-defined)

And I think this link might help as well:

* [github: importing jQuery in nextjs](https://github.com/zeit/next.js/issues/1465)
* [github grommet sample](https://github.com/grommet/next-sample)

These are the things that I have done to solve the problem:

1. Check if all `.js` files that use `react` have `import` statements. 
2. 