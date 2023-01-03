---
title: "Yet another blog in nextjs"
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

## Adding eslint to webpack
There's an [`eslint-loader`](https://github.com/webpack-contrib/eslint-loader) for webpack.

First, install eslint:
```
npm install eslint --save-dev
```
then eslint-loader:
```
npm install eslint-loader --save-dev
```

### Reference
look at [this issue on github](https://github.com/zeit/next.js/issues/2184). 
One of the replies to the issue provided the code!

### Use the code in `next.config.js`
```javascript
const withCss = require('@zeit/next-css'); //  just in case if you use css
const withSass = require('@zeit/next-sass')
const webpack = require('webpack');
const {assocPath} = require('ramda');

module.exports = withSass(withCss({ 
    webpack: (config, { dev }) => {
    const eslintRule = {
      test: /\.js$/,
      enforce: 'pre',
      exclude: /node_modules/,
      loader: 'eslint-loader',
      options: {
        // Emit errors as warnings for dev to not break webpack build.
        // Eslint errors are shown in console for dev, yay :-)
        emitWarning: dev,
      },
    };

    const rules = [].concat(eslintRule, config.module.rules);
    return assocPath(['module', 'rules'], rules, config);
    }
}));
```

and before that, since the code uses `ramda`, install it:
```
npm install --save-dev ramda
```

Then run `npm dev run`. Then you see the output from eslint:
```
j031:~/workspace (add1-eslint) $ npm run dev

> young-blog@1.0.0 dev /home/ubuntu/workspace
> next -p 8080



 WARNING  Compiled with 2 warnings                                                                                                                                                                                              3:32:08 AM


/home/ubuntu/workspace/pages/_document.js
   1:8   error  'React' is defined but never used                   no-unused-vars
   2:8   error  'ReactDOM' is defined but never used                no-unused-vars
   3:20  error  'Head' is defined but never used                    no-unused-vars
   3:26  error  'Main' is defined but never used                    no-unused-vars
   3:32  error  'NextScript' is defined but never used              no-unused-vars
   3:50  error  Strings must use doublequote                        quotes
   4:30  error  Missing semicolon                                   semi
   7:1   error  Expected indentation of 1 tab but found 2 spaces    indent
   8:1   error  Expected indentation of 2 tabs but found 4 spaces   indent
   9:1   error  Expected indentation of 3 tabs but found 6 spaces   indent
  10:1   error  Expected indentation of 4 tabs but found 8 spaces   indent
  11:1   error  Expected indentation of 4 tabs but found 8 spaces   indent
  14:1   error  Expected indentation of 5 tabs but found 10 spaces  indent
  15:1   error  Expected indentation of 5 tabs but found 10 spaces  indent
  16:1   error  Expected indentation of 5 tabs but found 10 spaces  indent
  17:1   error  Expected indentation of 5 tabs but found 10 spaces  indent
  18:1   error  Expected indentation of 5 tabs but found 10 spaces  indent
  19:1   error  Expected indentation of 4 tabs but found 8 spaces   indent
  21:1   error  Expected indentation of 4 tabs but found 8 spaces   indent
  22:1   error  Expected indentation of 5 tabs but found 10 spaces  indent
  23:1   error  Expected indentation of 5 tabs but found 10 spaces  indent
  25:1   error  Expected indentation of 4 tabs but found 8 spaces   indent
  26:1   error  Expected indentation of 3 tabs but found 6 spaces   indent
  27:1   error  Expected indentation of 2 tabs but found 4 spaces   indent
  27:6   error  Missing semicolon                                   semi
  28:1   error  Expected indentation of 1 tab but found 2 spaces    indent

✖ 26 problems (26 errors, 0 warnings)
  21 errors, 0 warnings potentially fixable with the `--fix` option.



/home/ubuntu/workspace/pages/_error.js
  6:16  error  Parsing error: Unexpected token getInitialProps

✖ 1 problem (1 error, 0 warnings)


You may use special comments to disable some warnings.
Use // eslint-disable-next-line to ignore the next line.
Use /* eslint-disable */ to ignore all warnings in a file.
> Ready on http://localhost:8080
```
Yay!

## Testing with Jest & Enzyme
### References
Again, helpful articles.
* [Zerocho](https://www.zerocho.com/category/React/post/583231469a87ec001834a0ec)

## References
* [medium post](https://medium.com/of-all-things-tech-progress/starting-with-authentication-a-tutorial-with-node-js-and-mongodb-25d524ca0359)
* [zerocho](https://medium.com/of-all-things-tech-progress/starting-with-authentication-a-tutorial-with-node-js-and-mongodb-25d524ca0359)
* [webframeworks post](http://webframeworks.kr/tutorials/expressjs/auth_log_in_out/)
* [next.js discussion on login](https://github.com/zeit/next.js/issues/153)

And I even found this: 
* [authentication library for nextjs](https://github.com/iaincollins/next-auth)
"connect-mongo": "^2.0.1",
    "dotenv": "^5.0.1",
    "express-session": "^1.15.6",
    "mongodb": "^3.0.7",
    "nedb": "^1.8.0",
    "next": "^6.0.0",
    "next-auth": "^1.8.5",
    "nodemailer": "^4.6.4",
    "nodemailer-direct-transport": "^3.3.2",
    "nodemailer-smtp-transport": "^2.7.4",
    "passport-facebook": "^2.1.1",
    "passport-google-oauth": "^1.0.0",
    "passport-twitter": "^1.0.4",
## Install things
```
npm install --save next-auth connect-mongo dotenv express-session mongodb nedb nodemailer nodemailer-direct-transport nodemailer-smtp-transport poassport-facebook passport-google-oauth passport-twitter
```

### 1. Create `index.js` and paste the following in
```javascript
// Include Next.js, Next Auth and a Next Auth config
const next = require('next')
const nextAuth = require('next-auth')
const nextAuthConfig = require('./next-auth.config')

// Load environment variables from .env
require('dotenv').load()

// Initialize Next.js
const nextApp = next({
  dir: '.',
  dev: (process.env.NODE_ENV === 'development')
})

// Add next-auth to next app
nextApp
.prepare()
.then(() => {
  // Load configuration and return config object
  return nextAuthConfig()
})
.then(nextAuthOptions => {
  // Pass Next.js App instance and NextAuth options to NextAuth
  return nextAuth(nextApp, nextAuthOptions)  
})
.then((response) => { // port 8080 for c9.io
  console.log(`Ready on http://localhost:${process.env.PORT || 8080}`)
})
.catch(err => {
  console.log('An error occurred, unable to start the server')
  console.log(err)
})
```

### 2. edit `package.json` like this
```javascript
"scripts": {
    "dev": "NODE_ENV=development node index.js",
    "build": "next build",
    "start": "next start"
  },
```

### 3. Create new files
```
j031:~/workspace (add2-adminPage) $ tree . -L 3 -I node_modules                                
.
├── README.md
├── components
│   ├── article.js
│   ├── copyright.js
│   ├── fixedHeading
│   │   ├── fakeButton.js
│   │   ├── fixedHeadingLayout.js
│   │   ├── menuButton.js
│   │   └── title.js
│   ├── footer.js
│   ├── header.js
│   ├── layout.js
│   ├── mainContent
│   │   ├── mainContent.js
│   │   └── mainContentLayout.js
│   ├── misc
│   │   └── sidebar.js
│   └── slideMenu.js
├── index.js
├── next-auth-config.js ---------------------> This
├── next-auth.functions.js ---------------------> This
├── next-auth.providers.js ---------------------> This
├── next.config.js
├── note
├── package.json --------------------> this (only npm run dev)
├── pages
│   ├── _document.js
│   ├── _error.js
│   ├── auth ---------------------> This
│   │   ├── callback.js ---------------------> This
│   │   ├── check-email.js ---------------------> This
│   │   ├── error.js ---------------------> This
│   │   └── index.js ---------------------> This
│   ├── cyadmin.js
│   └── index.js
└── styles
    ├── font.sass
    ├── grommet-button-fix.scss
    ├── grommet-dxc.min.scss
    ├── grommet-heading-fix.sass
    ├── master.sass
    ├── menu-button-responsive-fix.sass
    └── react-burger-menu-custom-style.scss

7 directories, 36 files
```

### 4. Just copy the contents of the files from the repository into the corresponding files newly created.

### 5. Write `.eslintignore` at your root directory
```
next-auth*
/home/ubuntu/workspace/index.js
/home/ubuntu/workspace/pages/_error.js
auth
```
you do this because `next build` will crash because of the chained output from eslint. For some reason, it will crash if there is any output from eslint. As a temporary tweak, just disable eslint or prevent output from eslint during build.

### 6. Install `mongodb-org` just for c9...
Yeah. It cannot support `mongod` for some reason. So do:
```
sudo apt-get install -y mongodb-org
```
And follow additional steps here:
[C9's explanation on how to run mongodb on c9.io](https://community.c9.io/t/setting-up-mongodb/1717)

### 7. Run `mongod` 
```
./mongod --httpinterface

this is equivalent to:

mongod --bind_ip=$IP --dbpath=data --nojournal --rest --httpinterface "$@"

because in the step 6, you do:

mongod --bind_ip=$IP --dbpath=data --nojournal --rest "$@" > mongod 

for c9's specific environment.  
```

### 8. Launch up with `node index.js` from your root directory (I found that `NODE_ENV=development node index.js` does not work for some reason)

### 9. Browse `/auth`

Now you can see the `auth` page! 
The only thing you have to do now is to customize. 

![Browse /auth](https://i.imgur.com/x08iynD.jpg)

### 10. Add oAuth
