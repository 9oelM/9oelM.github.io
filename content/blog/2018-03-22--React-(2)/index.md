---
title: "React (2)"
date: "2018-03-22T09:00:00.009Z"
category: "development"
---
## FYI
My notes are overwritten on the content copied from https://reactjs.org/docs.

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

