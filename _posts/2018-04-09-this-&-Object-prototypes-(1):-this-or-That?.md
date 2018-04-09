---
layout: post
title: "this & Object prototypes (1): this or That?"
date: 2018-04-09 09:00:00 -0100
categories: development
---
## Letting `this` point to the right place

### Method 1: Not using `this`
```javascript
function test() {
    if(test.sampleString.search("hi first") == 0)
        test.sampleString += " hi again";
    else
        test.sampleString = "hi first";
    console.log(test.sampleString);
    
    this.stringSum += test.sampleString;
}

test.sampleString = "this will not work";

test(); // hi first
test(); // hi first hi again
test(); // hi first hi again hi again
```

### Method 2: Using `this` confidently
