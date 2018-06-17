---
comments: true
layout: post
title: "Creating music player (3): Digging redux + react"
date: 2018-06-16 09:00:00 -0100
categories: works
---
## Starting off
[Last time](https://9oelm.github.io/works/2018/06/13/Creating-music-player-(2)-Specifics.html), we looked into how redux in a web development project could be installed and set up. Now we are going to find out how to actually connect the source with redux configruations (for example, editing state in the `store` when a button is clicked)

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