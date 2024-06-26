---
title: "Next.js (1): Basic setup and understanding"
date: "2018-06-01T09:00:00.009Z"
category: "development"
---

## First things first

### See [next.js](https://nextjs.org/docs/#setup) for more. 

### Make package.json 
```
npm init
```

## Install packages 
```
npm install --save next react react-dom

> uglifyjs-webpack-plugin@0.4.6 postinstall /home/ubuntu/workspace/node_modules/webpack/node_modules/uglifyjs-webpack-plugin
> node lib/post_install.js

nexting@1.0.0 /home/ubuntu/workspace
├─┬ next@6.0.3 
│ ├─┬ @babel/core@7.0.0-beta.42 
│ │ ├─┬ @babel/code-frame@7.0.0-beta.42 
│ │ │ └─┬ @babel/highlight@7.0.0-beta.42 
│ │ │   └─┬ chalk@2.4.1 
│ │ │     ├─┬ ansi-styles@3.2.1 
│ │ │     │ └─┬ color-convert@1.9.1 
│ │ │     │   └── color-name@1.1.3 
│ │ │     └─┬ supports-color@5.4.0 
│ │ │       └── has-flag@3.0.0 
│ │ ├─┬ @babel/generator@7.0.0-beta.42 
│ │ │ ├── jsesc@2.5.1 
│ │ │ └── trim-right@1.0.1 


.....DONE

```

## Add scripts to `package.json`
```
{
  "scripts": {
    "dev": "next",
    "build": "next build",
    "start": "next start"
  }
}

copy to package.json:

{
  "name": "nexting",
  "version": "1.0.0",
  "description": ",-----.,--.                  ,--. ,---.   ,--.,------.  ,------.     '  .--./|  | ,---. ,--.,--. ,-|  || o   \\  |  ||  .-.  \\ |  .---'     |  |    |  || .-. ||  ||  |' .-. |`..'  |  |  ||  |  \\  :|  `--,      '  '--'\\|  |' '-' ''  ''  '\\ `-' | .'  /   |  ||  '--'  /|  `---.      `-----'`--' `---'  `----'  `---'  `--'    `--'`-------' `------'     -----------------------------------------------------------------",
  "main": "index.js",
  "scripts": {
    "dev": "next",
    "build": "next build",
    "start": "next start"
  },
  "author": "",
  "license": "ISC"
}

```

## `npm run dev`
```
j031:~/workspace $ npm run dev

> nexting@1.0.0 dev /home/ubuntu/workspace
> next

 DONE  Compiled successfully in 2132ms                                                                                                 7:44:44 PM

> Ready on http://localhost:3000

```

But it was not working on [c9.io](c9.io) because c9.io supports port 8080 for Node.js development. So I did:

## `npm run dev -- -p 8080` or write `next -p 8080`
So inside `package.json`:
```
{
  "name": "nexting",
  "version": "1.0.0",
  "description": ",-----.,--.                  ,--. ,---.   ,--.,------.  ,------.     '  .--./|  | ,---. ,--.,--. ,-|  || o   \\  |  ||  .-.  \\ |  .---'     |  |    |  || .-. ||  ||  |' .-. |`..'  |  |  ||  |  \\  :|  `--,      '  '--'\\|  |' '-' ''  ''  '\\ `-' | .'  /   |  ||  '--'  /|  `---.      `-----'`--' `---'  `----'  `---'  `--'    `--'`-------' `------'     -----------------------------------------------------------------",
  "main": "index.js",
  "scripts": {
    "dev": "next -p 8080", --->>>>>>>>>> changed
    "build": "next build",
    "start": "next start"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "next": "^6.0.3",
    "react": "^16.4.0",
    "react-dom": "^16.4.0"
  }
}
```

and do `npm run dev`.

I see my website working:

![next.js website first test working](https://i.imgur.com/pbfE0iP.jpg)

## Creating a sample website
```javascript

// See the <Head> tag. It's a built-in component. 

import Link from 'next/link' // imports link (react router)
import Head from 'next/head' // this imports the built-in component 'head'

export default () => (
  <div>
    <Head>
      <title>Joel's test site</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
    </Head>
    <p>Hello world!</p>
  </div>
)
```

### But let's understand what's happening with `Link` and `Head` first
* [React router api](https://knowbody.github.io/react-router-docs/api/Link.html)
* [React router training](https://reacttraining.com/react-router/web/example/custom-link)
* [Where this example is from](https://github.com/zeit/next.js/tree/canary/examples/layout-component)
* [children in react](https://mxstbr.blog/2017/02/react-children-deepdive/)
* [export default explained by mozilla](https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/export)

First, see the structure
```
j031:~/workspace/layout-component-app $ tree -L 2 -I node_modules
.
├── README.md
├── components
│   └── layout.js
├── package.json
└── pages
    ├── about.js
    ├── contact.js
    └── index.js

2 directories, 6 files
```

and the contents:

`layout.js`
```javascript
import Link from 'next/link'
import Head from 'next/head'

export default ({ children, title = 'This is the default title' }) => (
  <div>
    <Head>
      <title>{ title }</title>
      <meta charSet='utf-8' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
    </Head>
    <header>
      <nav>
        <Link href='/'><a>Home</a></Link> |
        <Link href='/about'><a>About</a></Link> |
        <Link href='/contact'><a>Contact</a></Link>
      </nav>
    </header>

    { children }

    <footer>
      {'I`m here to stay'}
    </footer>
  </div>
)

```

`about.js`
```javascript
import Layout from '../components/layout'

export default () => (
  <Layout title='About us'>
    <div>About us</div>
  </Layout>
)
```

`contact.js`
```javascript
import Layout from '../components/layout'

export default () => (
  <Layout title='Contact us'>
    <div>Contact</div>
  </Layout>
)
```

`index.js`
```javascript
import Layout from '../components/layout'

export default () => (
  <Layout>
    <div>Hello World.</div>
  </Layout>
)

```

And the rendered website is as follows:

`websiteRootUrl`
![webiste root url](https://i.imgur.com/X1eizx9.jpg)

```html
<html>

<head>
    <title class="next-head">This is the default title</title>
    <meta charset="utf-8" class="next-head">
    <meta name="viewport" content="initial-scale=1.0, width=device-width" class="next-head">
    <link rel="preload" href="/_next/-/page/index.js" as="script">
    <link rel="preload" href="/_next/-/page/_app.js" as="script">
    <link rel="preload" href="/_next/-/page/_error.js" as="script">
    <link rel="preload" href="/_next/static/commons/manifest.js" as="script">
    <link rel="preload" href="/_next/static/commons/main.js" as="script">
</head>

<body>
    <div id="__next">
        <div>
            <header>
                <nav><a href="/">Home</a> |<a href="/about">About</a> |<a href="/contact">Contact</a></nav>
            </header>
            <div>Hello World.</div>
            <footer>I`m here to stay</footer>
        </div>
    </div>
    <div id="__next-error"></div>
    <script>
        __NEXT_DATA__ = {
            "props": {
                "pageProps": {}
            },
            "page": "/",
            "pathname": "/",
            "query": {},
            "buildId": "-",
            "assetPrefix": "",
            "nextExport": false,
            "err": null,
            "chunks": []
        }
        module = {}
        __NEXT_LOADED_PAGES__ = []
        __NEXT_LOADED_CHUNKS__ = []

        __NEXT_REGISTER_PAGE = function(route, fn) {
            __NEXT_LOADED_PAGES__.push({
                route: route,
                fn: fn
            })
        }

        __NEXT_REGISTER_CHUNK = function(chunkName, fn) {
            __NEXT_LOADED_CHUNKS__.push({
                chunkName: chunkName,
                fn: fn
            })
        }

        false
    </script>
    <script async="" id="__NEXT_PAGE__/_app" src="/_next/-/page/_app.js"></script>
    <script async="" id="__NEXT_PAGE__/_error" src="/_next/-/page/_error.js"></script>
    <script src="/_next/static/commons/manifest.js"></script>
    <script src="/_next/static/commons/main.js"></script>
    <script src="/_next/-/page/about.js"></script>
    <script src="/_next/-/page/about.js"></script>
    <script src="/_next/-/page/contact.js"></script>
    <script src="/_next/-/page/contact.js"></script>
    <script src="/_next/-/page/index.js"></script>
</body>

</html>
```

`websiteRootUrl/contact`
![website contact page](https://i.imgur.com/DlnSYuU.jpg)

```html
<html>

<head>
    <title class="next-head">Contact us</title>
    <meta charset="utf-8" class="next-head">
    <meta name="viewport" content="initial-scale=1.0, width=device-width" class="next-head">
    <link rel="preload" href="/_next/-/page/index.js" as="script">
    <link rel="preload" href="/_next/-/page/_app.js" as="script">
    <link rel="preload" href="/_next/-/page/_error.js" as="script">
    <link rel="preload" href="/_next/static/commons/manifest.js" as="script">
    <link rel="preload" href="/_next/static/commons/main.js" as="script">
</head>

<body>
    <div id="__next">
        <div>
            <header>
                <nav><a href="/">Home</a> |<a href="/about">About</a> |<a href="/contact">Contact</a></nav>
            </header>
            <div>Contact</div>
            <footer>I`m here to stay</footer>
        </div>
    </div>
    <div id="__next-error"></div>
    <script>
        __NEXT_DATA__ = {
            "props": {
                "pageProps": {}
            },
            "page": "/",
            "pathname": "/",
            "query": {},
            "buildId": "-",
            "assetPrefix": "",
            "nextExport": false,
            "err": null,
            "chunks": []
        }
        module = {}
        __NEXT_LOADED_PAGES__ = []
        __NEXT_LOADED_CHUNKS__ = []

        __NEXT_REGISTER_PAGE = function(route, fn) {
            __NEXT_LOADED_PAGES__.push({
                route: route,
                fn: fn
            })
        }

        __NEXT_REGISTER_CHUNK = function(chunkName, fn) {
            __NEXT_LOADED_CHUNKS__.push({
                chunkName: chunkName,
                fn: fn
            })
        }

        false
    </script>
    <script async="" id="__NEXT_PAGE__/" src="/_next/-/page/index.js"></script>
    <script async="" id="__NEXT_PAGE__/_app" src="/_next/-/page/_app.js"></script>
    <script async="" id="__NEXT_PAGE__/_error" src="/_next/-/page/_error.js"></script>
    <script src="/_next/static/commons/manifest.js"></script>
    <script src="/_next/static/commons/main.js"></script>
    <script src="/_next/-/page/about.js"></script>
    <script src="/_next/-/page/about.js"></script>
    <script src="/_next/-/page/contact.js"></script>
    <script src="/_next/-/page/contact.js"></script>
</body>

</html>
```

`websiteRootUrl/about`
![website about page](https://i.imgur.com/r3bP5Lt.jpg)

```html
<html>

<head>
    <title class="next-head">About us</title>
    <meta charset="utf-8" class="next-head">
    <meta name="viewport" content="initial-scale=1.0, width=device-width" class="next-head">
    <link rel="preload" href="/_next/-/page/index.js" as="script">
    <link rel="preload" href="/_next/-/page/_app.js" as="script">
    <link rel="preload" href="/_next/-/page/_error.js" as="script">
    <link rel="preload" href="/_next/static/commons/manifest.js" as="script">
    <link rel="preload" href="/_next/static/commons/main.js" as="script">
</head>

<body>
    <div id="__next">
        <div>
            <header>
                <nav><a href="/">Home</a> |<a href="/about">About</a> |<a href="/contact">Contact</a></nav>
            </header>
            <div>About us</div>
            <footer>I`m here to stay</footer>
        </div>
    </div>
    <div id="__next-error"></div>
    <script>
        __NEXT_DATA__ = {
            "props": {
                "pageProps": {}
            },
            "page": "/",
            "pathname": "/",
            "query": {},
            "buildId": "-",
            "assetPrefix": "",
            "nextExport": false,
            "err": null,
            "chunks": []
        }
        module = {}
        __NEXT_LOADED_PAGES__ = []
        __NEXT_LOADED_CHUNKS__ = []

        __NEXT_REGISTER_PAGE = function(route, fn) {
            __NEXT_LOADED_PAGES__.push({
                route: route,
                fn: fn
            })
        }

        __NEXT_REGISTER_CHUNK = function(chunkName, fn) {
            __NEXT_LOADED_CHUNKS__.push({
                chunkName: chunkName,
                fn: fn
            })
        }

        false
    </script>
    <script async="" id="__NEXT_PAGE__/_app" src="/_next/-/page/_app.js"></script>
    <script async="" id="__NEXT_PAGE__/_error" src="/_next/-/page/_error.js"></script>
    <script src="/_next/static/commons/manifest.js"></script>
    <script src="/_next/static/commons/main.js"></script>
    <script src="/_next/-/page/about.js"></script>
    <script src="/_next/-/page/about.js"></script>
    <script src="/_next/-/page/contact.js"></script>
    <script src="/_next/-/page/contact.js"></script>
    <script src="/_next/-/page/index.js"></script>
</body>

</html>
```

### We can learn these
1. `children` in `export default ({ children, title = 'This is the default title' })` is actually what is inside `<Layout>` tags in different pages. 
2. you pass the `title` prop in to set it again to a different value.
3. you are exporting a function by doing `export default () => ...`
4. `*.js` inside the `pages` directory will become a subURL, like `websiteRootUrl/whatIsInsidePagesDirectory`
5. `Link` allows us to link to another react page (directory). 
6. `index.js` will become the page in the root URL (without any subdirectories)
7. `layout.js` serves as kind of a template here (if you are used to MVC pattern, you've seen this kind of thing many times in `/layout` folder)
8. `Head` is just `head`.

