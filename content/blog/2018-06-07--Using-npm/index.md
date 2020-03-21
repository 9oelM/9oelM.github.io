---
title: "Using npm"
date: "2018-06-07T09:00:00.009Z"
category: "development"
---
## Uninstall
```
npm uninstall [package]
```

## Uninstall and remove it from project dependency
```
npm --save uninstall [package]
```

## Uninstall and remove it from dev dependency
```
npm --save-dev uninstall [package]
```

## How to change a devDependency to dependency
```
npm install [package] --save-prod
```

## How to change dependency to devDependecy
```
npm install [package] --save-dev
```

## How to check if a dependency is being used
```
npm install -g npm-check

npm-check
```

and it will give you a nice outline of the things happening. This could give you a great insight of what to possibly `uninstall`.:

```
j031:~/workspace $ npm-check

@zeit/next-sass   😕  NOTUSED?  Still using @zeit/next-sass?
                               Depcheck did not find code similar to require('@zeit/next-sass') or import from '@zeit/next-sass'.
                               Check your code before removing as depcheck isn't able to foresee all ways dependencies can be used.
                               Use --skip-unused to skip this check.
                               To remove this package: npm uninstall --save @zeit/next-sass

grommet-css       😕  NOTUSED?  Still using grommet-css?
                               Depcheck did not find code similar to require('grommet-css') or import from 'grommet-css'.
                               Check your code before removing as depcheck isn't able to foresee all ways dependencies can be used.
                               Use --skip-unused to skip this check.
                               To remove this package: npm uninstall --save grommet-css

node-sass         😕  NOTUSED?  Still using node-sass?
                               Depcheck did not find code similar to require('node-sass') or import from 'node-sass'.
                               Check your code before removing as depcheck isn't able to foresee all ways dependencies can be used.
                               Use --skip-unused to skip this check.
                               To remove this package: npm uninstall --save node-sass

path              😕  NOTUSED?  Still using path?
                               Depcheck did not find code similar to require('path') or import from 'path'.
                               Check your code before removing as depcheck isn't able to foresee all ways dependencies can be used.
                               Use --skip-unused to skip this check.
                               To remove this package: npm uninstall --save-dev path

Use npm-check -u for interactive update.
```

## Check if a module is installed
```
npm list --depth=0 | grep <module_name>
```

## Dealing with errors

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
