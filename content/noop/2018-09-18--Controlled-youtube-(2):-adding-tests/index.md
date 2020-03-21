---
title: "Controlled youtube (2): adding tests"
date: "2018-09-18T09:00:00.009Z"
category: "works"
---
So... I've done some works on this project, and now the project looks like this:

```
.
├── README.md  ---------------------> readme file
├── config-overrides.js ------------> overrides config on create-react-app
├── coverage -----------------------> test coverage report
│   ├── clover.xml
│   ├── coverage-final.json
│   ├── lcov-report
│   │   ├── base.css
│   │   ├── block-navigation.js
│   │   ├── index.html
│   │   ├── prettify.css
│   │   ├── prettify.js
│   │   ├── sort-arrow-sprite.png
│   │   ├── sorter.js
│   │   └── src
│   │       ├── App.js.html
│   │       ├── actions
│   │       ├── components
│   │       ├── index.html
│   │       ├── index.js.html
│   │       ├── layout
│   │       ├── modules
│   │       ├── pages
│   │       ├── reducers
│   │       ├── registerServiceWorker.js.html
│   │       └── store
│   └── lcov.info
├── gulpfile.js -------------------> gulpfile for project automation
├── package-lock.json 
├── package.json 
├── public ------------------------> default create-react-app folder
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
└── src
    ├── App.js --------------------> the app
    ├── __test__ ------------------> test scripts, not yet done
    │   ├── App.test.js
    │   ├── actions
    │   ├── components
    │   │   └── Drawer
    │   ├── layout
    │   ├── modules
    │   └── reducers
    │       └── reducers.test.js
    ├── actions -------------------> redux actions 
    │   ├── constants.js
    │   └── index.js
    ├── components ----------------> react components
    │   ├── BottomNav
    │   ├── Containers
    │   │   └── index.js
    │   ├── Drawer
    │   │   ├── Drawer.js
    │   │   └── DrawerItems.js
    │   ├── SearchResult
    │   │   ├── SearchResultCard.js
    │   │   └── SearchResultPanel.js
    │   ├── SideMenu
    │   ├── TopNav
    │   │   └── TopNav.js
    │   └── VideoPlayer
    │       ├── VideoPlayer.js
    │       └── VideoPlayerPanel.js
    ├── index.js ------------------> entry point for everything
    ├── layout
    │   ├── contentPage.js
    │   └── default.js
    ├── modules
    │   └── resize.js
    ├── pages
    │   ├── About.js
    │   ├── Home.js
    │   ├── SearchResultView.js
    │   ├── Settings.js
    │   └── VideoPlayerView.js
    ├── reducers ------------------> redux reducers
    │   └── reducers.js
    ├── registerServiceWorker.js --> create-react-app default file
    ├── setupTests.js -------------> for jest config 
    ├── static --------------------> for static files
    ├── store ---------------------> redux store config
    │   └── index.js
    └── styles --------------------> custom styles in sass, compiled into css
        ├── output
        │   └── master.css
        └── source
            ├── ContentPage.sass
            ├── Drawer.sass
            ├── Normalize.sass
            ├── SearchResult.sass
            ├── TopNav.sass
            ├── VideoPlayer.sass
            └── master.sass
```

Now I need to go onto component testing with jest & enzyme, but I know nothing, so now I need to find things out.

## Seeing Jest output in detail
```
react-scripts-rewired test --env=jsdom --coverage --verbose
```
will output

```
 PASS  src/__test__/components/Drawer/Drawer.test.js
  Drawer component
    ✓ renders Drawer with id (10ms)

  console.error node_modules/fbjs/lib/warning.js:33
    Warning: React depends on requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills

  console.error node_modules/fbjs/lib/warning.js:33
    Warning: React depends on requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills

 PASS  src/__test__/reducers/reducers.test.js
  Store
    ✓ should handle toggleDrawer action (4ms)
    ✓ should handle requestSearch action (1ms)
    ✓ should handle receiveSearch action (1ms)

Test Suites: 2 passed, 2 total
Tests:       4 passed, 4 total
Snapshots:   0 total
Time:        2.555s
Ran all test suites.
-----------------------------|----------|----------|----------|----------|-------------------|
File                         |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
-----------------------------|----------|----------|----------|----------|-------------------|
All files                    |     6.73 |     7.07 |     9.23 |       10 |                   |
 src                         |     1.28 |        0 |        0 |      2.7 |                   |
  App.js                     |        0 |        0 |        0 |        0 |  1,15,16,18,19,23 |
  index.js                   |        0 |        0 |        0 |        0 |... 24,25,28,29,30 |
  registerServiceWorker.js   |        0 |        0 |        0 |        0 |... 40,141,142,143 |
  setupTests.js              |      100 |      100 |      100 |      100 |                   |
 src/actions                 |      100 |      100 |      100 |      100 |                   |
  constants.js               |      100 |      100 |      100 |      100 |                   |
  index.js                   |      100 |      100 |      100 |      100 |                   |
 src/components/Containers   |        0 |        0 |        0 |        0 |                   |
  index.js                   |        0 |        0 |        0 |        0 |... 11,13,16,19,24 |
 src/components/Drawer       |    66.67 |      100 |       25 |    66.67 |                   |
  Drawer.js                  |      100 |      100 |      100 |      100 |                   |
  DrawerItems.js             |       50 |      100 |        0 |       50 |          14,21,30 |
 src/components/SearchResult |        0 |        0 |        0 |        0 |                   |
  SearchResultCard.js        |        0 |        0 |        0 |        0 |... 12,20,24,49,55 |
  SearchResultPanel.js       |        0 |        0 |        0 |        0 |... ,6,10,11,20,34 |
 src/components/TopNav       |        0 |        0 |        0 |        0 |                   |
  TopNav.js                  |        0 |        0 |        0 |        0 |... 51,53,54,62,68 |
 src/components/VideoPlayer  |        0 |        0 |        0 |        0 |                   |
  VideoPlayer.js             |        0 |        0 |        0 |        0 |... 12,20,22,26,27 |
  VideoPlayerPanel.js        |        0 |        0 |        0 |        0 |... ,5,6,8,9,24,25 |
 src/layout                  |        0 |        0 |        0 |        0 |                   |
  contentPage.js             |        0 |        0 |        0 |        0 |... 13,17,19,28,32 |
  default.js                 |        0 |        0 |        0 |        0 |   1,2,3,5,6,11,15 |
 src/modules                 |        0 |        0 |        0 |        0 |                   |
  resize.js                  |        0 |        0 |        0 |        0 |... ,9,10,11,12,14 |
 src/pages                   |        0 |        0 |        0 |        0 |                   |
  About.js                   |        0 |        0 |        0 |        0 |                   |
  Home.js                    |        0 |        0 |        0 |        0 |... ,9,10,11,14,15 |
  SearchResultView.js        |        0 |        0 |        0 |        0 |       1,2,3,5,6,7 |
  Settings.js                |        0 |        0 |        0 |        0 |                   |
  VideoPlayerView.js         |        0 |        0 |        0 |        0 |... ,4,5,7,8,13,14 |
 src/reducers                |      100 |      100 |      100 |      100 |                   |
  reducers.js                |      100 |      100 |      100 |      100 |                   |
 src/store                   |        0 |        0 |        0 |        0 |                   |
  index.js                   |        0 |        0 |        0 |        0 |           1,2,4,6 |
-----------------------------|----------|----------|----------|----------|-------------------|
```

## " Warning: React depends on requestAnimationFrame. Make sure that you load a polyfill in older browsers. http://fb.me/react-polyfills"
How do I solve this? I suddenly faced this error while I have done nothing wrong. So I looked for [answers on github](https://github.com/facebook/create-react-app/issues/3199).

It seems that the issue is NOT an error, but just a warning, so it's just a matter of being bothered by it. But if we are being too bothered, here's the solution from the github issues (actually this problem was resolved as of `react-scripts@1.0.15`, but since I am using `react-app-rewired` which is not really maintained, I had to fix this):

So first, make `tempPolyfills.js` as follows:
```javascript
const raf = global.requestAnimationFrame = (cb) => {
  setTimeout(cb, 0)
}

export default raf
```

and `setupTests.js` (at the top level inside `src`):
```javascript
import raf from './tempPolyfills'
import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

// Make Enzyme functions available in all test files without importing
global.shallow = shallow;
global.render = render;
global.mount = mount;
global.toJson = toJson;

// Fail tests on any warning
console.error = message => {
   throw new Error(message);
};
```

and of course, install `enzyme-to-json`:
```
npm install --save-dev enzyme-to-json
```

And now, if you try on jest, it is not going to complain, free from warnigs!

## Excluding from tests
`setupTests.js` and `tempPolyfills.js` are still in the coverage reported by `istanbul`. Excluding them is an easy peasy job. Just add to `package.json` this snippet:
```
"jest": {
    "setupFiles": [
      "<rootDir>/src/setupTests.js"
    ],
    "coveragePathIgnorePatterns": [
      "/node_modules/",
      "setupTests.js",
      "tempPolyfills.js",
      "src/index.js",
      "registerServiceWorker.js"
    ]
  }
```
You can put regex pattern strings in `coveragePathIgnorePatterns` to ignore files and folders. See more at the [Jest docs](https://jestjs.io/docs/en/configuration.html#coveragepathignorepatterns-array-string). 

## Testing a component 
* Sources: 
    * [freecodecamp](https://medium.freecodecamp.org/the-right-way-to-test-react-components-548a4736ab22)

### Important points to inspect when testing a component
* What it renders
* The props the component receives
* The state the component holds (if any)
* What the component does when the user interacts with it (via clicking, dragging, keyboard input, etc)
* The context the component is rendered in
* What the component does when you call methods on its instance (public ref interface)
* Side effects that occur as part of the component lifecycle (componentDidMount, componentWillUnmount, etc)

+ Don't test the things already covered by the library. 

### Hands on
And the component I'm testing is this:
```javascript
import React from "react"
import PropTypes from "prop-types"
import Drawer from "@material-ui/core/Drawer"
import DrawerItems from "./DrawerItems"

const Drawer2 = ({ isDrawerOpen, onToggle }) => 
  <Drawer open={isDrawerOpen} anchor="left" onClose={onToggle} id="drawer">
    <div tabIndex={0} role="button" onClick={onToggle} onKeyDown={onToggle}>
      <DrawerItems />
    </div>
  </Drawer>

Drawer2.propTypes = {
  isDrawerOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
}

export default Drawer2
```
And here are the contracts I found on this component (though simple):

* `Drawer` always gets rendered.
* `div` inside `Drawer` always gets rendered.
* `div` receives `tabIndex` and `role` as props (but isn't this too trivial to test? So did not test this). 
* `DrawerItems` inside `div` always gets rendered. 
* `Drawer2` receives two props which are directly applied to `open`, `onClose` in `Drawer`, and `onClick`, `onKeyDown` in `div` as props. 

There are no conditional renderings going on here, so there are not so many contracts I can identify, but these are just about them, I think. And so, these are the tests:



..............


woops.. a big problem appeared. When I tried to `mount` the component under test, it gave me an error, while `shallow` did not. After 

After a length of hours of fighting against the errrors, I found that there is some kind of a consistent error happening on the `DrawerItems` component. And it turns out to be a composite problem between `react-app-rewired` and `react` and ... `material-ui`. 

So I got this lesson:
1. Use the framework that is maintained (not `react-app-rewired`, but the official `react-scripts`)
2. If you are to add tests, add the tests from the beginning of the project. 
And after all, I found that the component of the matter was `DrawerItem`. When I tried to `mount` it, it gave me the same error. But React rendered it perfectly, so only `enzyme` had a problem dealing with this component. 

So I had no choice, but to render it shallowly or entirely with `ReactDOM` on each component.

So these are my testing scripts and corresponding components: 
`Drawer.js`
```javascript
import React from "react"
import PropTypes from "prop-types"
import Drawer from "@material-ui/core/Drawer"
import DrawerItems from "./DrawerItems"

const Drawer2 = ({ isDrawerOpen, onToggle }) => (
  <Drawer open={isDrawerOpen} anchor="left" onClose={onToggle} id="drawer">
    <div tabIndex={0} role="button" onClick={onToggle} onKeyDown={onToggle}>
      <DrawerItems />
    </div>
  </Drawer>
)

Drawer2.propTypes = {
  isDrawerOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
}

export default Drawer2

```

`Drawer.test.js`
```javascript
import * as React from "react"
import { shallow } from "enzyme"
import Drawer from "../../../components/Drawer/Drawer"
import DrawerItems from "../../../components/Drawer/DrawerItems"
describe("Drawer", () => {
  const props = {
    isDrawerOpen: true,
    onToggle: f => f,
  }
  const shallowDrawer = shallow(<Drawer {...props} />)
  it("renders Drawer with id", () =>
    expect(shallowDrawer.find("#drawer").length).toBe(1))

  it("renders div", () => expect(shallowDrawer.find("div").length).toBe(1))

  it("renders DrawerItems", () =>
    expect(shallowDrawer.find(DrawerItems).length).toBe(1))
})
```

`DrawerItems.js`
```javascript

```

`DrawerItems.test.js`
```javascript
import * as React from "react"
import { shallow } from "enzyme"
import renderer from "react-test-renderer"
import Drawer from "../../../components/Drawer/Drawer"
import DrawerItems from "../../../components/Drawer/DrawerItems"
import DrawerItem from "../../../components/Drawer/DrawerItem"

describe("DrawerItems", () => {
  const shallowDrawerItems = shallow(<DrawerItems />)
  it("renders multiple items", () => {
    expect(shallowDrawerItems.find(DrawerItem).length).toBeGreaterThan(1)
  })
})

```

`DrawerItem.js`
```javascript
import React from "react"
import PropTypes from "prop-types"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import { Link } from "react-router-dom"

const DrawerItem = ({ link, name, children }) => (
  <ListItem button>
    <Link to={link}>
      <ListItemIcon>{children}</ListItemIcon>
      <ListItemText primary={name} />
    </Link>
  </ListItem>
)

DrawerItem.propTypes = {
  link: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}

export default DrawerItem
```

`DrawerItem.test.js`
```javascript
import * as React from "react"
import ReactDOM from "react-dom"
import MemoryRouter from "react-router/MemoryRouter"
import DrawerItem from "../../../components/Drawer/DrawerItem"

describe("DrawerItem", () => {
  const props = {
    link: "/settings",
    name: "Settings",
    children: <div />,
  }
  it("accepts link prop", () => {
    const node = document.createElement("div")

    ReactDOM.render(
      <MemoryRouter>
        <DrawerItem {...props} />
      </MemoryRouter>,
      node
    )

    const href = node.querySelector("a").getAttribute("href")

    expect(href).toEqual("/settings")
  })
})

```

## More talking
But still, I felt like I had to test props like `onClick` that receives `onToggle` prop, which is a functionality assumed to work well. But `mount` never worked, so it was not really possible to test this..
