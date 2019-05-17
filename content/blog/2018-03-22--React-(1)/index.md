---
title: "React (1)"
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