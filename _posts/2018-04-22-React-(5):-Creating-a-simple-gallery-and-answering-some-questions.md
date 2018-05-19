---
layout: post
title: "React (5): Creating a simple gallery and answering some questions"
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

I just wanted to get really simple and get the taste of React. This is the code that I wrote for a Gallery app:

```javascript
import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
        <Gallery/>
    );
  }
}

class Gallery extends Component{
  
  render(){
    const listOfPictures= [
        {
          url: "https://images.pexels.com/photos/9816/pexels-photo-9816.jpeg",
          date: "2018. 02. 03.",
          title: "People"
        },
        {
          url: "https://images.pexels.com/photos/106052/pexels-photo-106052.jpeg",
          date: "2016. 03. 07.",
          title: "Dutch people"
        },
        {
          url: "https://images.pexels.com/photos/433452/pexels-photo-433452.jpeg",
          date: "2013. 07. 22.",
          title: "Party"
        }
        
      ];
        
      const pictures = listOfPictures.map((eachPic) =>
        { return <Picture key = {eachPic.url} url = {eachPic.url} date = {eachPic.date} title = {eachPic.title}/> }
      );
      
      return (<div>{pictures}</div>);
  }
}

class Picture extends Component{
  
  render(){
    return (
      <figure className = "image-container">
        <img className = "image"  src = {this.props.url} alt = {this.props.title}/>
        <figcaption>{`${this.props.date} ${this.props.title}`}</figcaption>
      </figure>
    );
  }
}

export default App; 
/* And in index.js, you do 
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker(); */
```

![react-gallery-test](https://blog.naver.com/PostView.nhn?blogId=joelmun&Redirect=View&logNo=221279318070&categoryNo=7&isAfterWrite=true&isMrblogPost=false&isHappyBeanLeverage=true&contentLength=4291&proxyReferer=http%3A%2F%2Fblog.editor.naver.com%2Feditor&redirect=View&widgetTypeCall=true&topReferer=http%3A%2F%2Fblog.editor.naver.com%2Feditor&directAccess=false#)

And of course, there are some questions (some of which I already got answers) that arose:

### 1. How can I store `listOfPictures` in a better way? It looks ugly to just declare it inside the Gallery class. 


### 2. How can I return multiple components at once?
* [React Official Documentation](https://reactjs.org/docs/lists-and-keys.html)
* [Stackoverflow post](https://stackoverflow.com/questions/32157286/rendering-react-components-from-array-of-objects)

I think using `map` function is the cleanest way. 
```javascript
const pictures = listOfPictures.map((eachPic) =>
        { return <Picture key = {eachPic.url} url = {eachPic.url} date = {eachPic.date} title = {eachPic.title}/> }
      );
      
      return (<div>{pictures}</div>);
```


### 3. Does React not allow me to return multiple elements at once?
* [Stackoverflow: Before React 16, No. After, yes.](https://stackoverflow.com/questions/34893506/return-multiple-elements-inside-react-render)
From React 16, you can do:
```javascript
render() {
  return (
    <>
      <ChildA />
      <ChildB />
      <ChildC />
    </>
  );
}
```
or
```javascript
render() {
  return (
    <React.Fragment>
      <ChildA />
      <ChildB />
      <ChildC />
    </React.Fragment>
  );
}
```
But prior to React 16, the render method could only render a single root node. So you had to wrap around the nodes with a single set of div tags. 

### 4. Are there any other ways that I can declare a component?
Yes.

* [Medium post](https://medium.com/@the.benhawy/3-ways-to-create-react-components-8b3620e4ea0)
* [Stackoverflow](https://stackoverflow.com/questions/39766694/2-different-ways-to-create-react-component)

#### 1. `React.createClass`
```html
var MyComponent = React.createClass({
   render() {
      return <div>
                <h1>Hello World!</h1>
                <p>This is my first React Component.</p>
             </div>
      }
})

// then do
ReactDOM.render(<MyComponent />, document.getElementById('react-component'));
```
You do not need a `babel` for this. This was introduced in `ES5`.

#### 2. `class` 
```html
class MyComponent extends React.Component{
   render() {
      return <div>
                <h1>Hello World!</h1>
                <p>This is my first React Component.</p>
             </div>
      }
}
```

#### 3. Stateless functional component
>  Stateless components are simple reusable components which do not need to maintain state. 

> Somewhere in the application, you need to bind data, or remember things. Stateless components are dumb (and that is good), they cannot remember and they cannot give context to other parts of the UI.

```html
const MyComponent = () => {
      return <div>
                <h1>Hello World!</h1>
                <p>This is my first React Component.</p>
             </div>
      }
```
You don't need a `render()` function for this. Just return it. 