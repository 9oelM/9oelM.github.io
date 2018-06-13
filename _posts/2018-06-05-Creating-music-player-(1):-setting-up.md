---
comments: true
layout: post
title: "Creating music player (1): setting up"
date: 2018-06-05 09:00:00 -0100
categories: works
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