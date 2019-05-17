---
title: "React (3)"
date: "2018-03-22T09:00:00.009Z"
category: "development"
---
## FYI
My notes are overwritten on the content copied from https://reactjs.org/docs.

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