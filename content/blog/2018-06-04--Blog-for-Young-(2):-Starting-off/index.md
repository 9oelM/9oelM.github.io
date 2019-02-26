---
title: "Blog for Young (1): Starting off"
date: "2018-06-04T09:00:00.009Z"
category: "works"
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

## Why are the styles not being applied?
This was my `index.js` and the styles for the website were not being applied. I did not know why. 

```javascript
import Layout from "../components/layout"
import Card from 'grommet/components/Card';

export default () => (
    <Layout>
        <Card thumbnail='http://grommet.io/img/carousel-1.png'
          label='Sample Label'
          heading='Sample Heading'
          description='Sample description providing more details.'
           />
    </Layout>
)
```

After a tiring length of search for the answer on Google, I found the [answer](https://github.com/grommet/grommet/issues/640): `<Grommet.App>`.

I needed to wrap the components inside `<Grommet.App>`. It was that simple.

```javascript
import Layout from "../components/layout"
import Card from 'grommet/components/Card';
import Grommet from 'grommet'

export default () => (
    <Grommet.App>
    <Layout>
        <Card thumbnail='http://grommet.io/img/carousel-1.png'
          label='Sample Label'
          heading='Sample Heading'
          description='Sample description providing more details.'
           />
    </Layout>
    </Grommet.App>
)
```

And now the styling works. And also, you need to add the core element cdn to make styling work:

```javascript
// _document.js
import Document, { Head, Main, NextScript } from 'next/document';

export default class CustomDocument extends Document {
  render() {
    return (
      <html>
        <Head>
        {/* This is going to be your global head */}
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/grommet/1.10.1/grommet.min.css" />
          <script src = "https://cdnjs.cloudflare.com/ajax/libs/grommet/1.10.1/grommet.min.js"></script>
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

## Troubleshooting
Now I had to convert the theme of the blog to `dxc`. To do that I had to `import "grommet/grommet-dxc.min.css";` But this kept throwing me an error:

```
 ERROR  Failed to compile with 1 errors                                                                                                                                                     10:12:43 AM

 error  in ./node_modules/grommet/grommet-dxc.min.css

Module parse failed: Unexpected character '@' (5:3)
You may need an appropriate loader to handle this file type.
|  *
|  * github.com/inuitcss | inuitcss.com
|  */@-webkit-keyframes fadein{from{opacity:0}to{opacity:1}}@keyframes fadein{from{opacity:0}to{opacity:1}}/*!
|  * inuitcss, by @csswizardry
|  *
```

Webpack does not support css loaders by default so you have to install it.

And a few searches revealed to me that this is a webpack config problem.

Ok so [webpack.js.org says:](https://webpack.js.org/concepts/#loaders)
```javascript
//At a high level, loaders have two purposes in your webpack configuration:

//The test property identifies which file or files should be transformed.
//The use property indicates which loader should be used to do the transforming.

const path = require('path');

const config = {
  output: {
    filename: 'my-first-webpack.bundle.js'
  },
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  }
};

module.exports = config;
```

So I went ahead to make few changes:

`/static/styles.scss`
```css
@import "grommet/grommet-dxc.min.css";
```

`next.config.js`
```javascript
const withCss = require('@zeit/next-css');
module.exports = withCss({ /* extra optional config */ })
```

And now the website works.

### Before
![Before](https://i.imgur.com/KpUR0E7.jpg)

### After 
![After](https://i.imgur.com/u5OGkIM.jpg)
