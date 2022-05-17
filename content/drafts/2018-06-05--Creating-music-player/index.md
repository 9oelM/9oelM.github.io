---
title: "Creating music player"
date: "2018-06-05T09:00:00.009Z"
category: "works"
---
## Set up
```
npm install -g create-react-app

create-react-app 7omp

cd 7omp

npm install --save @material-ui/core typeface-roboto @material-ui/icons
```

## And simple test
`App.js`
```javascript
import React, { Component } from 'react';
import 'typeface-roboto';
import Button from '@material-ui/core/Button';

class App extends Component {
  render() {
    return (
      <Button variant="contained" color="primary">
      Hello World
    </Button>
    );
  }
}

export default App;
```

And check on the server if the app is working properly. 

## Add theme
`src/styles/theme.js`

```javascript
import purple from '@material-ui/core/colors/purple';
import red from '@material-ui/core/colors/red';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#ffcccb',
      main: '#ef9a9a',
      dark: '#ba6b6c',
      contrastText: '#000',
    },
    secondary: {
      light: '#ffc1e3',
      main: '#f48fb1',
      dark: '#bf5f82',
      contrastText: '#000',
    },
  },
});

export default theme;
```

## Add logic test for the theme
`src/__test__/theme.test.js`

```javascript
import Theme from '../styles/theme';

const customThemeInserted = {
    primary: {
        light: '#ffcccb',
        main: '#ef9a9a',
        dark: '#ba6b6c',
        contrastText: '#000',
    },
    secondary: {
        light: '#ffc1e3',
        main: '#f48fb1',
        dark: '#bf5f82',
        contrastText: '#000',
    }
}

/*
The theme contains palette object created by createMuiTheme function
*/

test('The palette of the theme has been inserted correctly', () => {
    expect(Theme).toHaveProperty('palette');
    expect(Theme.palette).toHaveProperty('primary', customThemeInserted.primary);
    expect(Theme.palette).toHaveProperty('secondary', customThemeInserted.secondary);
})

```

## [Apply the theme](https://github.com/mui-org/material-ui/issues/6446)
`layout.js`

```javascript
import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import Theme from '../styles/theme'

class Layout extends Component {
    
    render(){
        const { children } = this.props;    
        return (
        <MuiThemeProvider theme={Theme}>
        <Grid container  direction = "column">
            {children}
        </Grid>
        </MuiThemeProvider>
        )
    }
}

export default Layout;
```

## Add support for sass
```
npm install --save node-sass-chokidar
```

## Try out on production 
```
npm install -g serve
serve -s build
serve -p 8080
```

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

## Starting off
[Last time](https://joel.is-a.dev/works/2018/06/13/Creating-music-player-(2)-Specifics.html), we looked into how redux in a web development project could be installed and set up. Now we are going to find out how to actually connect the source with redux configruations (for example, editing state in the `store` when a button is clicked)

## Redux and React are not... a family
They are just separate, unrelated libraries. They are just good to be used together. 

## Subscribing
Passing a function as an argument to `store.subscribe` function would append that function to it:
```javascript
store.subscribe(() => console.log("something happened - perhaps write something more like store.getState().data"))
```

When you wanna unsubscribe it, just call that function returned from `subscribe` function:
```javascript
const unsubscribe = store.subscribe(() => console.log("something happened - perhaps write something more like store.getState().data"))

unsubscribe(); // stop logging
```

## Container components 
For now, I will just need one container component, which is `UpperAppBarContainer`. 

First you need to pass `this.props.onClick` to `UpperAppBar`'s prop:
`components/UpperAppBar.js`
```javascript
class UpperAppBar extends React.Component {
    
    render() {
        const { classes, onClick } = this.props; {/* <-- Here */}
        return (
            <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          
          <Typography variant="title" color="inherit" className={classes.flex}>
            7o Music Player
          </Typography>
          <IconButton color = "inherit" aria-label="Search" onClick = {onClick} > {/* <-- And Here */}
            <SearchIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
        );
    }
}
```

And then you need to make a container component with `react-redux`. 
`components/containers/containers.js`
```javascript
import React from 'react'
import UpperAppBar from '../UpperAppBar'
import { connect } from 'react-redux'
import { toggleSearchButton } from '../../actions/index'

export const UpperAppBarContainer = connect(
    null, // no new states needed to be told
    dispatch => ({
        onClick(){
            dispatch(toggleSearchButton())
            console.log("clicked"); // just for testing purpose
        }
    })
)(UpperAppBar)
```
I don't know well, but inside that `connect` function, you are passing the `onClick` function as a prop to the `UpperAppBar`. And the 

[sohamkamani.com](https://www.sohamkamani.com/blog/2017/03/31/react-redux-connect-explained/)
> mapStateToProps and mapDispatchToProps are both pure functions that are provided the stores “state” and “dispatch” respectively. **Furthermore, both functions have to return an object, whose keys will then be passed on as the props of the component they are connected to.**
