---
comments: true
layout: post
title: "Blog for Young (5): Authentication"
date: 2018-06-09 09:00:00 -0100
categories: works
---
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
