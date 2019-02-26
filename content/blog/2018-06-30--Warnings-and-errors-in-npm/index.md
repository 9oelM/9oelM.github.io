---
title: "Warnings and errors in npm"
date: "2018-06-30T09:00:00.009Z"
category: "development"
---

```
npm ERR! peer dep missing: react@^15.0.0, required by react-youtube-autocomplete@1.0.20
npm ERR! peer dep missing: react-dom@^15.0.0, required by react-youtube-autocomplete@1.0.20
npm ERR! peer dep missing: ajv@^6.0.0, required by ajv-keywords@3.2.0
npm ERR! peer dep missing: react@^0.14.0 || ^15.0.0-0, required by react-typeahead-component2@0.10.2
```

Ahhhh what is this error. 

I looked into [version expression convention on npm](https://docs.npmjs.com/misc/semver#caret-ranges-123-025-004).

well first, the caret `^` means:

> Allows changes that do not modify the left-most non-zero digit in the [major, minor, patch] tuple. 

Some examples from the website:
```
^1.2.3 := >=1.2.3 <2.0.0
^0.2.3 := >=0.2.3 <0.3.0
^0.0.3 := >=0.0.3 <0.0.4
```

So from my errors, I find that:
```
react@^15.0.0 is >=15.0.0 <16.0.0 
react-dom@^15.0.0 is >=15.0.0 <16.0.0
ajv@^6.0.0 is >=6.0.0 < 7.0.0
react@^0.14.0 || ^15.0.0-0 is >=0.14.0 <0.2.0 or >=15.0.0 <16.0.0
```
So essentially I had to install something like:
```
react@15.6.2
react-dom@15.6.2
ajv@6.5.1
```

So like:
```
npm install --save react@15.6.2 react-dom@15.6.2 ajv@6.5.1
```

and the errors were gone!

For more reference (like semantic versioning), see [this post](https://60devs.com/npm-install-specific-version.html). 
