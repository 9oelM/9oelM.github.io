---
comments: true
layout: post
title: "Page transition in React"
date: 2018-08-11 09:00:00 -0100
categories: development
---

I always wondered how this sleek transition effects work in React and Native apps, so this is now a chance to find something out. 

# Resources
## Articles for transition
* [react-router-page-transition](https://www.npmjs.com/package/react-router-page-transition)
* [How to manage page transition animations in React and GSAP](https://medium.com/@agm1984/how-to-manage-page-transition-animations-in-react-ba09c66655c6)
* [Single-Page React Applications With the React-Router and React-Transition-Group Modules](https://code.tutsplus.com/tutorials/single-page-react-applications-with-react-router-and-react-transition-group-modules--cms-24507?ec_unit=translation-info-language)
* [GSAP Homepage](https://greensock.com/get-started-js)
* [Make your web app feel native with React page transitions](https://blog.etch.team/react-page-transitions-make-your-website-feel-native-bf2804b011dc)

## Examples
* [Working example for above post](https://stackblitz.com/edit/react-49vg63)
* [Another cool example with some great transition effect](https://codepen.io/sdras/pen/gWWQgb)
* [Simple page transition example](https://codesandbox.io/s/qqxj18wj9)

## Articles for routing
* [redirecting in react](https://medium.com/@anneeb/redirecting-in-react-4de5e517354a)
* [statckoverflow post on redirecting on react](https://stackoverflow.com/questions/34735580/how-to-do-a-redirect-to-another-route-with-react-router)
* [programmatically navigate in react-router](https://tylermcginnis.com/react-router-programmatically-navigate/)

# Get things ready
```
npm install --save react-transition-group@^1 react-router-dom^4 
```
Install `react-transition-group` of version ^1.0 and `react-router` of version ^4. 

# Route it
Use react router to determine routes.
```javascript
// layout
import Layout from './layout/default'

// pages

import Home from './pages/Home'
import SearchResultView from './pages/SearchResultView'
import VideoPlayerView from './pages/VideoPlayerView'

// react
import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

// styles
import 'typeface-roboto'
import './styles/output/master.css'
import CssBaseline from '@material-ui/core/CssBaseline'
import './modules/resize'

class App extends Component {
  render() {
    return (
      <Fragment>
        <Layout>
          <CssBaseline />
          <Route exact path="/" component={Home} />
          <Route exact path="/searchResultView" component={SearchResultView} />
          <Route exact path="/videoPlayerView" component={VideoPlayerView} />
        </Layout>
      </Fragment>
    )
  }
}

export default App

```

# Wrap it with `BrowserRouter`
`index.js`
```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import store from './store/index'

const render = Component =>
  ReactDOM.render(
    <Provider store={store}>
      <AppContainer>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AppContainer>
    </Provider>,
    document.getElementById('root')
  )
registerServiceWorker()
render(App)

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./App', () => {
    render(App)
  })
}

```

# Specify the redirect action on event
First you are going to need `withRouter` from `react-router-dom`,
and then create a handler that would push the path you specify newly into the history object. 

> "Under the hood it’s what’s keeping track of session history for React Router. When a component is rendered by React Router, that component is passed three different props: location, match, and history. This history prop comes from the History library and has a ton of fancy properties on it related to routing. In this case, the one we’re interested is history.push. What it does is it pushes a new entry onto the history stack - aka redirecting the user to another route." - from [tylermcginnis.com](https://tylermcginnis.com/react-router-programmatically-navigate/)

and then export the component, wrapping it with `withRouter`. 

Then what will hapen is that when the search results are up, the component will trigger page redirection to `/searchResultView`.

`TopNav.js`

```javascript
import React from 'react'
import PropTypes from 'prop-types'
import { withStyles, createMuiTheme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import YoutubeAutocomplete from 'new-material-react-youtube-autocomplete'
import Drawer from '../Drawer/Drawer'
import { withRouter } from 'react-router-dom'

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
  },
}
class TopNav extends React.Component {
    //@@@@@@@@@@@@@@@@@@@ here
  handleRedirection = () => {
    this.props.history.push('/searchResultView')
  }

  render() {
    const {
      classes,
      onToggle,
      isDrawerOpen,
      onSearchTrigger,
      onSearchResults,
    } = this.props

    return (
      <div className={classes.root} id="TopNav">
        <Drawer isDrawerOpen={isDrawerOpen} onToggle={onToggle} />
        <AppBar position="static">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
              onClick={onToggle}
            >
              <MenuIcon />
            </IconButton>
            <YoutubeAutocomplete
              option={{
                key: 'AIzaSyB8R4Bqkx25_-c58L7v1QaLReVw1FWea28',
                type: ['video', 'playist'],
                maxResults: 15,
              }}
              placeholderText="Search youtube"
              onSearchResults={results => {
                onSearchResults(results)
                //@@@@@@@@@@@@@@@@@@@ and here
                this.handleRedirection()
              }}
              onSearchTrigger={searchWord => {
                onSearchTrigger(searchWord)
              }}
            />
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

TopNav.propTypes = {
  classes: PropTypes.object.isRequired,
}
//@@@@@@@@@@@@@@@@@@@ and finally here
export default withStyles(styles)(withRouter(TopNav))

```