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
