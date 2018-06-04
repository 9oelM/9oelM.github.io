---
comments: true
layout: post
title: "Blog for Young (2): Starting off"
date: 2018-06-04 09:00:00 -0100
categories: works
---


## Set up basic things ([see previous post on basic things with next.js](https://9oelm.github.io/development/2018/06/01/Next.js-(1)-Basic-setup-and-understanding.html))

### Install next, react, react-dom & grommet command line tools and grommet
```
npm init

npm install --save next react react-dom

npm install --save grommet
```

### Create `_document.js` inside `pages`
```
j031:~/workspace $ tree -L 2 -I node_modules
.
├── README.md
├── package.json
└── pages
    └── _document.js
```

Why `_document.js`? 
> Pages in Next.js skip the definition of the surrounding document's markup. For example, you never include <html>, <body>, etc. **To override that default behavior, you must create a file at ./pages/_document.js**, where you can extend the Document class.

`_document.js`
```javascript
// pages/_document.js
import Document, { Head, Main, NextScript } from 'next/document';

export default class CustomDocument extends Document {
  render() {
    return (
      <html>
        <Head>
        /* This is going to be your global head */
          { }
        </Head>
        <body>
          <Main /> /* each routed page will go inside here */
          <NextScript /> /* You don't have to care about this. */
        </body>
      </html>
    )
  }
}
```

### Make `pages/index.js` 
`index.js` will be `/` if you were entering the website with an URL.

### Make `pages/_error.js`
This page will be shown if there is an error. This is a custom error page. 

### Make `/next.config.js`
This is going to contain your settings.

### Make `components` folder and put components inside it.

### Make `static` folder and put static assets inside it.

## So far
Directory structure
```
j031:~/workspace $ tree -L 2 -I node_modules                                                                                   
.
├── README.md
├── components
├── next.config.js
├── package.json
└── pages
    ├── _document.js
    ├── _error.js
    └── index.js
    
+ node_modules ofc
```

### Include CSS

I'm using sass.

First, get the loader for sass (`node-sass` is a peer)
```
npm install --save @zeit/next-sass node-sass
```

And edit `next.config.js` to apply the changes
```javascript
const withSass = require('@zeit/next-sass')

module.exports = withSass({
  webpack(config, options) {
    // Further custom configuration here
    return config
  }
})
```

> The stylesheet is compiled to .next/static/style.css. You have to include it into the page using a custom _document.js. The file will be served from **`/_next/static/style.css`**

There will be only one stylesheet (`/_next/static/style.css`)in the end no matter how many stylesheets you import inside `/pages`. 

## Darn it. it's hard. I got it launched up finally:

![Website launched](https://i.imgur.com/t5EFRrR.jpg)

## And this is what we've got so far:

### Structure
```
j031:~/workspace $ tree -L 2 -I node_modules                                    
.
├── README.md
├── components
├── next.config.js
├── npm-debug.log
├── package.json
├── pages
│   ├── _document.js
│   ├── _error.js
│   └── index.js
└── static
    └── styles.scss

3 directories, 8 files
```

### `/next.config.js`
```javascript
const withSass = require('@zeit/next-sass')

module.exports = withSass({
  webpack(config, options) {
    // Further custom configuration here
    return config
  }
})
```

### `/pages/_document.js`
```javascript
// _document.js
// pages/_document.js
import Document, { Head, Main, NextScript } from 'next/document';

export default class CustomDocument extends Document {
  render() {
    return (
      <html>
        <Head>
        {/* This is going to be your global head */}
          <link rel="stylesheet" href="/_next/static/style.css" />
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

### `/pages/_error.js`
run 
```
npm install --save isomorphic-unfetch
```
to get the dependency first.

then
```javascript
import React from 'react'
import Error from 'next/error'
import fetch from 'isomorphic-unfetch'

export default class Page extends React.Component {
  static async getInitialProps() {
    const res = await fetch('https://api.github.com/repos/zeit/next.js')
    const statusCode = res.statusCode > 200 ? res.statusCode : false
    const json = await res.json()

    return { statusCode, stars: json.stargazers_count }
  }

  render() {
    if (this.props.statusCode) {
      return <Error statusCode={this.props.statusCode} />
    }

    return (
      <div>
        Next stars: {this.props.stars}
      </div>
    )
  }
}
```

### `/pages/index.js`
```javascript
import "../static/styles.scss"

export default () => <div className="example">Hello World!</div>
```

### `/static/styles.scss`
```css
$font-size: 50px;
.example {
  font-size: $font-size;
}
```
