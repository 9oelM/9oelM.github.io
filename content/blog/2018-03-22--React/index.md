---
title: "React"
date: "2018-03-22T09:00:00.009Z"
category: "development"
---
## FYI
My notes are overwritten on the content copied from https://reactjs.org/tutorial/tutorial.html.

## Component
  ```
  class ShoppingList extends React.Component {
    render() {
      return (
        <div className="shopping-list">
          <h1>Shopping List for {this.props.name}</h1>
          <ul>
            <li>Instagram</li>
            <li>WhatsApp</li>
            <li>Oculus</li>
          </ul>
        </div>
      );
    }
  }
  ```
React component class, or React component type. A component takes in parameters, called props, and returns a hierarchy of views to display via the render method.

### The first practice

```javascript
class Square extends React.Component {
/*
React components can have state by setting this.state in the constructor, which should be considered private to the component. Let’s store the current value of the square in state, and change it when the square is clicked.

So I think it's just like a... private variable inside an object.
and the concept of the constructor is the same thing. It initializes variables. 
*/

/* commented out because Square class doesn’t have state anymore.
  constructor(props) {
    super(props); // In JavaScript classes, you need to explicitly call super(); when defining the constructor of a subclass.
    this.state = {
      value: null,
    };
  }
*/  
  render() {
      // Whenever this.setState is called, an update to the component is scheduled, causing 
      // React to merge in the passed state update and rerender the component along with its descendants. 
    return (
      <button className="square" onClick={() => this.props.onClick()}>       
        {this.props.value}
      </button>// and when I am inserting javascript code into this tag,
               // I can just use a normal mustache method to do it.
               // and it seems that setState and getState are predefined functions (setter and getter) to manage the state.
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null), // fill the array with null
    };
  }

handleClick(i) {
    const squares = this.state.squares.slice(); 
    //We call .slice() to copy the squares array instead of mutating the existing array.
    squares[i] = 'X';
    this.setState({squares: squares});
  }

//Square no longer keeps its own state; it receives its value from its parent Board and informs its parent when it’s clicked. We call components like this controlled components.

    renderSquare(i) {
    return (
        <Square value={this.state.squares[i]
        onClick={() => this.handleClick(i)}} 
        />
    ); // this is a 'prop' called value.
       // I think this is related to Square component class.
       // for sure this is a method to put the value into the 
       // above render() function in Square component.

       // we’re passing down two props from Board to Square: value and onClick. The latter is a function that Square can call. 
  }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
```

## JSX
* It is a "syntax extension to JavaScript".
* React embraces the fact that **rendering logic is inherently coupled with other UI logic:** how events are handled, how the state changes over time, and how the data is prepared for display.
* You can **embed** any JavaScript expression in JSX by wrapping it in curly braces: `<p>4+4 is {4+4}</p>`.
* We split JSX over multiple lines for **readability**. While it isn’t required, when doing this, we also recommend wrapping it in parentheses to **avoid the pitfalls of automatic semicolon insertion**:
  ```javascript
  const element = ( // ( <- here if you don't understand
  <div>
    <h1>Hello!</h1>
    <h2>Good to see you here.</h2>
  </div>
  ); // <- ) here
  ```
* you can use JSX inside of if statements and for loops, assign it to variables, accept it as arguments, and return it from functions: 
  ```javascript
  function getGreeting(user) {
    if (user) {
      return <h1>Hello, {formatName(user)}!</h1>;
    }
    return <h1>Hello, Stranger.</h1>;
  }
  ```
* JSX Prevents Injection Attacks because it converts the values embedded in JSX to string before rendering them. I think it means this: 
  ```html
  const title = </h1><script>window.alert('this is malicious');<script><h1>
  // This is safe:
  const element = <h1>{title}</h1>;
  ```

## Rendering elements
* **An element**:
  * is the smallest building block of react apps
  * describes what you want to see on the screen
  * are plain objects, and are cheap to create
  * are immutable. Once you create an element, you can’t change its children or attributes. An element is like a single frame in a movie: it represents the UI at a certain point in time.
* To render a React element into a root DOM node, pass both to ReactDOM.render():
```javascript
const element = <h1>Hello, world</h1>;
ReactDOM.render(element, document.getElementById('root'));
```

## Components and props
* Components:
  * let you split the UI into independent, reusable pieces, and think about each piece in isolation.
  * are like JavaScript functions-- They **accept arbitrary inputs (called “props”)** and return React elements describing what should appear on the screen. 
  * should start with capital letter because React treats tags starting with lowercase letters as DOM tags.
* Making components 
  * Method 1: Using ES6 Class
  ```javascript
  class Welcome extends React.Component {
    render() {
      return <h1>Hello, {this.props.name}</h1>;
    }
  }
  ```
  * Method 2: Just writing a function
  ```javascript
  function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
  }
  ```
* **Elements can also represent user-defined components. (not only html tags)**
  ```javascript
  const element = <Welcome name="Sara" />;
  ```
* **Components can refer to other components in their output!!**
  ```javascript
  function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
  }

  function App() {
    return (
      <div>
        <Welcome name="Sara" />
        <Welcome name="Cahal" />
        <Welcome name="Edite" />
      </div>
    );
  }

  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );
  ```
* **Props are read-only.**
  * All React components must act like 'pure' functions with respect to their props.
  * You must not modify props.
  * Instead, you are going to use 'state'. **State** allows React components to change their output over time in response to user actions, network responses, and anything else, without violating this rule.


## Lifecycle
It's about usage of resources. 

### 1. Mounting
It is when an element is rendered to the DOM for the first time.

### 2. Unmounting
It is when the DOM produced by the element is removed. 

## Lifecycle hooks (methods for mounting and unmounting)
### 1. `componentDidMount()`
This method runs after the component output has been rendered to the DOM.

### 2. `componentWillUnmount()`
This method runs before the component output will be removed.

## State

### Using `setState()`
do not do:
```
this.state.sth = "something";
```

do:
```
this.setState({sth: "something"});
```

### `this.props` and `this.state` may be updated asynchronously.
So you should avoid using `this.state` and `this.props` at the same time because it is dangerous. Instead, use a function with previous state as the first argument:
```
this.setState((prevState, props) => ({
  counter: prevState.counter + props.increment
}));
```

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

![react-gallery-test](https://blogfiles.pstatic.net/MjAxODA1MTlfMTU3/MDAxNTI2NjkxNDMxODg1.gnJDESfxrwOiaSaO6Qq0JNgoaYMypXzMKJCtgsWCtDYg.-QzniA0cwk20GfI2kyzgCystNW3pboQLQX-oQmKgbf0g.PNG.joelmun/30966478_572440763134394_2020511486_o.png)

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
