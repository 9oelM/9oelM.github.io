---
comments: true
layout: post
title: "Using Socket.io"
date: 2018-10-07 09:00:00 -0100
categories: development
---
# What it is
[Socket.io](https://socket.io/docs/) is "a library that enables real-time, bidirectional and event-based communication between the browser and the server."

Judging from the explanation, I think it dramatically eases polling for changes and maintaining the connection.

# So let's try it
You need Nodejs installed beforehand, of course. 
```
npm install --save socket.io socket.io-client express
```

and make `index.js` to just check if express is running well:
```javascript
var app = require('express')();
var http = require('http').Server(app);

app.get('/', function(req, res){
  res.send('<h1>Hello world</h1>');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

```

and then run `node index.js` on your terminal. You should be able to access the Hello World page on `localhost:3000`.

# Ok. But with `React`?
It's just about using proxy (for development only)

## Sources
* [daveceddia.com](https://daveceddia.com/create-react-app-express-backend/)
* [freecodecamp](https://medium.freecodecamp.org/how-to-make-create-react-app-work-with-a-node-backend-api-7c5c48acb1b0)

## First things
Ok. Let's start again from scratch.

First, get `create-react-app`.
```
npm install -g create-react-app
```

And then do `create-react-app your-app`, where `your-app` is going to be the root directory for your repository.

And if for some reason, especially on Windows environment, [installing `create-react-app` fails for some reason](https://github.com/facebook/react/issues/11933) with an error output saying `npm install --save --save-exact --loglevel error react react-dom react-scripts has failed`, switch to `yarn`:

```
npm install -g yarn

yarn global add create-react-app

create-react-app my-app
```
boom! done. 

## Project structure
Now, move the codes produced by `create-react-app` into `client` directory that you need to create.

And install a few things as below:

```
npm install -g yarn nodemon
npm install --save socket.io socket.io-client express
npm install --save-dev concurrently
```

and then fill up your `package.json` as follows:
```
{
  "name": "chat",
  "version": "1.0.0",
  "scripts": {
    "client": "cd client && yarn start",
    "server": "nodemon server.js",
    "dev": "concurrently --kill-others-on-fail \"yarn server\" \"yarn client\""
  },
  "dependencies": {
    "express": "^4.16.3",
    "socket.io": "^2.1.1",
    "socket.io-client": "^2.1.1"
  },
  "devDependencies": {
    "concurrently": "^4.0.1"
  }
}
```

and run `yarn` to keep it up to date with the `lock` file.

create `server.js` as below:
```javascript
const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
```

and if you open up on your browser `localhost:8080/api/hello`, 

you are going to see:
```
{"express":"Hello From Express"}
```
on your browser. 

## So far
So far, this has been the project structure:
```
j031:~/workspace/chat (master) $ tree -L 3 -I node_modules                                             
.
├── README.md
├── client
│   ├── public
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   └── manifest.json
│   └── src
│       ├── App.css
│       ├── App.js
│       ├── App.test.js
│       ├── index.css
│       ├── index.js
│       ├── logo.svg
│       └── serviceWorker.js
├── package-lock.json
├── package.json
├── server.js
└── yarn.lock

3 directories, 15 files
```