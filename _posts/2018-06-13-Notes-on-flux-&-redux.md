---
comments: true
layout: post
title: "Notes on flux & redux"
date: 2018-06-13 09:00:00 -0100
categories: development
---
## Inside Flux
### Store
* Flux stores the data on application states inside `store`, which is outside of react.
* Store is the only place where the view could be updated from and data could be modified. 

### Action
* Action is produced from the interaction between an user and the application.

### Dispatcher
* It puts actions into a queue and puts actions out into appropriate stores. 

## Immutable
Flux's actions and state data are immutable. 

## Using flux means...
View components are not managing the application states.

## Source
[Naver](https://d2.naver.com/helloworld/1848131) did a great job at explaining redux and project structure.

