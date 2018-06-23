---
comments: true
layout: post
title: "Semicolon in javascript"
date: 2018-06-23 09:00:00 -0100
categories: development
---
## Preface
If you are thinking of mingliging with this to make some kind of use of this, just go for coffeescript...

## Sources
* [wikibooks](https://en.wikibooks.org/wiki/JavaScript/Automatic_semicolon_insertion)
* [inimino](http://inimino.org/~inimino/blog/javascript_semicolons)
* [ES6 official doc](http://www.ecma-international.org/ecma-262/6.0/index.html#sec-automatic-semicolon-insertion)
* [Brandoncode](http://www.bradoncode.com/blog/2015/08/26/javascript-semi-colon-insertion/)

## Automatic Semicolon Insertion?

> In JavaScript, a semicolon is automatically inserted when:
> * two statements are separated by a line terminator
> * two statements are separated by a closing brace ('}')
> * a line terminator follows a break, continue, return, or throw.

### Case 1: two statements are separated by a line terminator
for the below code here:
```
return
3;
```
the semicolon is inserted right after the return statement where the line terminator exists.
```
return;
3;
```

## Case 2: Two statements are separated by a closing brace ('}')


## Case 3: A line terminator follows a break, continue, return, or throw

## Ecma international tells when semicolons must be used
> Certain ECMAScript statements (empty statement, let, const, import, and export declarations, variable statement, expression statement, debugger statement, continue statement, break statement, return statement, and throw statement) must be terminated with semicolons.



