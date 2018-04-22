---
layout: post
title: "React (5): Creating a simple gallery"
date: 2018-04-22 09:00:00 -0100
categories: development
---
## Exploring, astray

So from [React (1)](https://9oelm.github.io/development/2018/03/21/React-(1).html) to [React (4)](https://9oelm.github.io/development/2018/04/05/React-(4).html), I think I learned things, so I plan to create a little gallery app.

I did not know anything, so I decided to go for the easiest way: `create-react-app`.

It was completely for newbies like me. It installed everything needed automatically for me.

```
$ create-react-app my app

...
...

Success! Created my-app at /home/ubuntu/workspace/my-app
Inside that directory, you can run several commands:

  npm start
    Starts the development server.

  npm run build
    Bundles the app into static files for production.

  npm test
    Starts the test runner.

  npm run eject
    Removes this tool and copies build dependencies, configuration files
    and scripts into the app directory. If you do this, you can’t go back!

We suggest that you begin by typing:

  cd my-app
  npm start

Happy hacking!
```

and `npm start` started development server automatically.
```
$ npm start

...

Compiled successfully!

You can now view my-app in the browser.

  Local:            http://localhost:8080/
  On Your Network:  http://172.17.0.30:8080/

Note that the development build is not optimized.
To create a production build, use npm run build.
```

And it showed me a default hello world kind of page. 
But I could not know anything. I did not understand what each of files accounted for in the working directory. So I just wanted to know about them first:

```
├── README.md
├── node_modules (many modules inside it)
├── package.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
└── src
    ├── App.css # The styles for the App component
    ├── App.js # The 'App' component
    ├── App.test.js # UI Test script
    ├── index.css # styles for the index page itself (not specifically for the App component)
    ├── index.js # where the app starts
    ├── logo.svg # just a react logo in vector image form
    └── registerServiceWorker.js # for better experience (see below)
```
I did not know well about `registerServiceWorker` [so I looked it up on stackoverflow:](https://stackoverflow.com/questions/47953732/what-does-registerserviceworker-do-in-react-js) 

> The service worker is a web API that helps you cache your assets and other files so that when the user is offline or on slow network, he/she can still see results on the screen. As such, it helps you build a better user experience, that's what you should know about service worker's for now. It's all about adding offline capabilities to your site.

And then I wanted to view react components on the browser so I installed react debugger on chrome. 

