---
comments: true
layout: post
title: "Creating music player (2): Specifics"
date: 2018-06-13 09:00:00 -0100
categories: works
---
## Make the hot reloading work
```
npm install --save-dev react-app-rewired react-app-rewire-hot-loader react-hot-loader
```

just following the simple steps at [here](https://daveceddia.com/hot-reloading-create-react-app/) made it work!

## Adding redux to the project
Sources:
* [redux homepage todo example](https://redux.js.org/basics/example-todo-list)
* [naver d2](https://d2.naver.com/helloworld/1848131)

```
npm install --save react-redux redux
```

### 1. Edit the entry point for the use of redux
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import "./styles/customStyles.css";
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducer';

const store = createStore(rootReducer);

const render = Component => {
  ReactDOM.render(
    // Wrap App inside AppContainer
    <AppContainer>
    <Provider store={store}>
      <App />
    </Provider>
    </AppContainer>,
    document.getElementById('root')
  );
};

registerServiceWorker();

render(App);

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./App', () => {
    render(App);
  });
}
```
`AppContainer` is just for the hot reloading. `Provider` is to make it easy to set the context for all children elements. If you add Provider once at the top, children elements can access the store through the context.  

### 2. Project structure
```
j031:~/workspace/7omp (add4-addRedux) $ tree -L 3 -I node_modules
.
├── README.md
├── config-overrides.js
├── package.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
└── src
    ├── App.js
    ├── __test__
    │   ├── App.test.js
    │   └── theme.test.js
    ├── actions ---------------------------> for redux actions
    │   ├── constants.js
    │   └── index.js
    ├── components
    │   ├── Layout.js
    │   ├── LowerAppBar.js
    │   ├── MainContainer.js
    │   ├── Player.js
    │   └── UpperAppBar.js
    ├── index.js ---------------------------> redux entry point
    ├── logo.svg
    ├── reducers ---------------------------> for redux reducers
    │   └── reducers.js
    ├── registerServiceWorker.js
    ├── store ---------------------------> for redux store
    │   └── index.js
    └── styles
        ├── customStyles.css
        ├── customStyles.sass
        └── muiTheme.js

8 directories, 24 files
```

### 3. Make actions 
`actions/index.js`
```javascript
// Import constants (action types)
import C from "./constants";

// Action creators
export const toggleSearchButton = searchOn => ({
  type: C.TOGGLE_SEARCH_BUTTON,
  searchOn // Boolean
})
```
Action creators just literally return actions. That's it. 
But they've gotta have their types.

To make it easy for the type, I created a file called `constants`:
`actions/constants.js`
```javascript
const C = {
    TOGGLE_SEARCH_BUTTON: 'TOGGLE_SEARCH_BUTTON',
}

export default C
```

### 4. Make reducers 
`reducers/reducers.js`
```javascript
import { combineReducers } from 'redux'

/*
Reducers specify how the application's state changes in response to actions sent to the store. Remember that actions only describe what happened, but don't describe how the application's state changes.
*/

import C from '../actions/constants';

const initialState = {
    searchOn: false // search button is not clicked yet
}

// This reducer is only for storing information on user interactions in the app
// the state would be undefined for the first time, so fill it with initialState instead
function jompAppView(state = initialState, action){
    switch(action.type){
        // return new objects instead of modifying them
        case C.TOGGLE_SEARCH_BUTTON:
            return Object.assign({}, state, {
                searchOn: !state.searchOn
            })
        default: 
            return state;
        /*
        It's important to return the previous state for any unknown action.
        */
    }
}

/* state shape
{
    searchOn: false
}
*/

/*
    Finally, combine reducers
*/
const jompApp = combineReducers({
    jompAppView,
})

export default jompApp
```
This is the reducer. For now, there is only one reducer function, `jompAppView`. But in the future, there will be more reducer functions, and that is why you do `combineReducers` at the end. 

### 5. Store
`store/index.js` is empty for now. Additional configuration will require some content in this file. 

`index.js`
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import "./styles/customStyles.css";
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers/reducers';
import { toggleSearchButton } from './actions/index'

const store = createStore(reducers);

const render = Component => {
  ReactDOM.render(
    // Wrap App inside AppContainer
    <AppContainer>
    <Provider store={store}>
      <App />
    </Provider>
    </AppContainer>,
    document.getElementById('root')
  );
};

console.log(store.getState());
// Every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener
const unsubscribe = store.subscribe(() =>
  console.log(store.getState())
)

store.dispatch(toggleSearchButton())
store.dispatch(toggleSearchButton())
store.dispatch(toggleSearchButton())
store.dispatch(toggleSearchButton())
registerServiceWorker();

render(App);

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./App', () => {
    render(App);
  });
}
```

1. You create the store with reducers first
```javascript
const store = createStore(reducers);
```

2. Pass that store as a `store` `prop` into that app, wrapping it with `Provider` Element.
```javascript
<Provider store={store}>
      <App />
</Provider>
```

3. To see if the store is working well, log the state changes:
```javascript
console.log(store.getState());
// Every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener
const unsubscribe = store.subscribe(() =>
  console.log(store.getState())
)

store.dispatch(toggleSearchButton())
store.dispatch(toggleSearchButton())
store.dispatch(toggleSearchButton())
store.dispatch(toggleSearchButton())
```

4. Look into the app
In the javascript console on the browser, you've gotta see this:
```javascript
index.js:29 {jompAppView: {…}}jompAppView: {searchOn: false}__proto__: Object
index.js:29 {jompAppView: {…}}jompAppView: {searchOn: true}__proto__: Object
index.js:29 {jompAppView: {…}}jompAppView: {searchOn: false}__proto__: Object
index.js:29 {jompAppView: {…}}jompAppView: {searchOn: true}__proto__: Object
index.js:29 {jompAppView: {…}}jompAppView: {searchOn: false}__proto__: Object
```
You can see that searchOn is being switched from false and true, and vice versa. This is because of `store.dispatch` that triggerred the actions. 

## What the heck is `withstyles`
Mui supports something called `withstyles`.

See:
```javascript
import { withStyles } from '@material-ui/core/styles';
```
and do something like
```javascript
const styles = theme => ({
  card: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
    height: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  playIcon: {
    height: 38,
    width: 38,
  },
});
```

But I did not quite get the hang of how it works and how it actually gets applied to React. So I finally found the [API](https://material-ui.com/customization/css-in-js/).

