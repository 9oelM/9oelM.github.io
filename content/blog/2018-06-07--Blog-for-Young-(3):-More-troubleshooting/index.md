---
title: "Blog for Young (2): More troubleshooting"
date: "2018-06-07T09:00:00.009Z"
category: "works"
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
2. Search more...

And I found this:
1. I was referring to `grommet.min.js` from a CDN. 
2. And this was not right, as this source was referring to `React` while it was just put inside `<head>` tag. It could not refer to `React`. 
3. So I did this to `_document.js`:

```javascript
import React from "react";
import ReactDOM from "react-dom";
import Document, { Head, Main, NextScript } from 'next/document';
import "../static/grommet-dxc.min.css"
import "../static/style.css"
import Grommet from "grommet"

export default class CustomDocument extends Document {
  render() {
    return (
      <html>
        <Head>
        {/* This is going to be your global head */}
          <link rel = "stylesheet" href = "/_next/static/style.css" />
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
          <link href="https://fonts.googleapis.com/css?family=Work+Sans:300,400,700" rel="stylesheet"/>
          <script src = {Grommet.grommetux}></script>
        </Head>
        
        <body>
          <Main /> {/* each routed page will go inside here */}
          <NextScript /> {/* You don't have to care about this. */}
          
        </body>
      </html>
    )
  }
}
```

Now the project runs perfectly without the reference error!

## Another error
Another one was this:

```
warning.js:33 Warning: Expected server HTML to contain a matching <a> in <article>.
```

well, this one...

I found on github that this is just a warning and it does not show up on actualy production. So I ran the production server:

```
next build
next start -p 8080 # c9.io only supports port 8080 for node.js
```

and no error happened. So all errors have been solved.

## Another error after I installed eslint
[Solution on stackoverflow](https://stackoverflow.com/questions/46840646/eslint-complaining-about-getinitialprops)

All things set correctly, I still got an error on `getInitialProps` when I ran eslint:
```
/home/ubuntu/workspace/pages/_error.js
  6:16  error  Parsing error: Unexpected token getInitialProps

✖ 1 problem (1 error, 0 warnings)
```
And so I installed `babel-eslint` and added this line in `.eslintrc.json`: 
```
"parser": "babel-eslint",
```

and it complained no more. 
