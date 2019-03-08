---
title: "Youtube lite: looking back"
date: "2019-03-02T09:00:00.009Z"
category: "works"
---
So I nearly worked half a year (indeed!) on the project [Youtube Lite](https://youtube-lite.js.org).
Here's a [related post on that if you wanna see.](https://9oelm.github.io/2018-09-18--Controlled-youtube-(2):-adding-tests/)

# Things I learned

## Never start testing after you've coded
- It makes it really hard to pass tests if you are not keeping up with making tests along with your project code. 
- I did not know anything about testing, so I just went onto making functions first and then _at last_ the tests. The problem was, errors arose from the tests. Then if I resolved one error, another would be up, and then another, then another, and so on. This was a really tiring process; I spent so much time on this, and then the tests started working. 
- Even if the tests are working, if you haven't started making tests from the beginning, there would be a LOT of tests to add. So this is actually quite daunting; It's just better to start from the beginning.
- TDD. Make a function and have a proof against it with a test. It's never bad to make tests. 

## For web projects, webpack would suffice
- Out of curiosity at first, I used `gulp` instead of `webpack`. But it turned out that it's not a really right choice. `gulp` is just for automation in general, but `webpack` is specifically for web projects, offering bundling and automation. 
- Moreoever, `gulp` is undergoing a breaking change from 3.x to 4, so things are still a bit quirky if you want to use the most recent version. 

## create-react-app
- Well, I don't know. Facebook decided to not offer developers an ability to manage webpack configs in `create-react-app`. And it's trying to offer it in the future ([see this issue](https://github.com/facebook/create-react-app/issues/6303)), but we've gotta wait. This is awful, because if you want some adjustments to your webpack config, you will either need to `eject` or use [`react-app-rewired`](https://github.com/timarney/react-app-rewired). Perhaps this was one of ther reasons I had to resort to `gulp`. 
- in `create-react-app` v.1.x, you needed to separately compile `sass` in order for it to work. In v.2.x, although the patches came through to enable this, this left me a bad impression, because I am really a big fan of `sass`.

## Refactor every time you code
- It's really hard to refactor code as you procrastinate on it, because the amount of codes increase dramatically. 
- Have a habit to refactor code every time you commit/push/...

## Setup, setup, setup
- Project setup is really important. Choosing suitable tools will make your life happier. Get dependencies for linting, bundling, warning, testing, ... anything that helps make your life easier. 
- Also, keep updated with project dependencies. It may be a good idea to use something like [Dependabot](https://dependabot.com/). If you have like 10+ dependencies to update and you update them once and tests break, you don't know which one they break from. 
- It gets really difficult for you to change dependencies after you have subsisted on them for a while. So your initial decision becomes important.