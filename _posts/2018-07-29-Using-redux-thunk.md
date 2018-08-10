---
comments: true
layout: post
title: "Using redux-thunk"
date: 2018-07-29 09:00:00 -0100
categories: development
---
# The problem

So I have been building the app [Youtube-Lite](https://github.com/9oelM/Youtube-Lite), and I finally have faced the moment where I need asynchronous function working with `redux`. So I had to dig into this. 

## Ref

I mainly referred to the articles from [redux.js.org](https://redux.js.org/advanced/asyncactions) for this post. 

... and, also [velopert's blog](https://velopert.com/3401).

## So what the heck is `redux-thunk`

### It's a **middleware**
A middleware is like a bridge from action to reducer. 
You can do additional things in between them, such as [logging](https://github.com/evgenyrodionov/redux-logger).

How do you add a middleware to your react-redux application? Like this, using `applyMiddleware`:
```javascript
import { createStore, applyMiddleware } from 'redux'
import reducers from '../reducers/index'
import { createMiddleware } from 'my-middleware'

const mw = createMiddleware()

const store = createStore(reducers, applyMiddleware(mw))

export default store;
```

And so obviously, as we could expect, `redux-thunk` is a type of middleware as well. 

### `redux-thunk`
Well, [a thunk is a function that wraps an expression to delay its evaluation](https://github.com/reduxjs/redux-thunk#whats-a-thunk).

So `redux-thunk` allows some kind of data from an asynchronous operation or the asynchronous operation itself to be made use of with `redux`.

## Let's apply this to my app

### 1. Apply middleware in `store/index.js`
```
npm --save-dev install redux-thunk
```

```javascript
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import reducers from '../reducers/reducers'

const store = createStore(
  reducers, applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store
```

### 2. Get reducers right according to the asynchronous actions (`REQUEST_SEARCH` and `RECEIVE_SEARCH`)
```javascript
import { combineReducers } from 'redux'
import {
  REQUEST_SEARCH,
  RECEIVE_SEARCH,
  TOGGLE_DRAWER
} from '../actions/constants'

function viewReducer(state = {
  isDrawerOpen: false,
}, action) {
  switch (action.type) {
    case TOGGLE_DRAWER:
      return {
        ...state,
        isDrawerOpen: !state.isDrawerOpen,
      }
    default:
      return state
    /*
        It's important to return the previous state for any unknown action.
        */
  }
}

function searchReducer(state = {
  searchResults: [], // nothing is received as a result yet
  isFetching: false,
  searchWord: ''
}, action){
  switch(action.type){
    // return new objects instead of modifying them
    case REQUEST_SEARCH:
      return {
        ...state,
        isFetching: true,
        searchWord: action.searchWord
      }
    case RECEIVE_SEARCH:
      return {
        ...state,
        isFetching: false,
        searchResults: action.searchResults
      }
    default:
      return state
  }
}
const rootReducer = combineReducers({
  viewReducer,
  searchReducer
})

export default rootReducer
```

### 3. Create thunk action creator!
```javascript
import C from './constants'

export const requestSearch = searchWord => ({
  type: C.REQUEST_SEARCH,
  searchWord,
})

export const receiveSearch = searchResults => ({
  type: C.RECEIVE_SEARCH,
  searchResults,
})

export const toggleDrawer = isDrawerOpen => ({
  type: C.TOGGLE_DRAWER,
  isDrawerOpen,
})

// Thunk action creator
export function fetchSearchResults(searchWord){
  return (dispatch) => {
    dispatch(requestSearch(searchWord))
    /*
      your code for requesting the search results
      that would return searchResults. (fetch, ajax, whatever)
    */
    dispatch(receiveSearch(searchResults))
  }
}
```

As you see, we now have this thunk action creator which would have `dispatch` function inside, so that you could dispatch actions internally whenever you want to based on situations. 