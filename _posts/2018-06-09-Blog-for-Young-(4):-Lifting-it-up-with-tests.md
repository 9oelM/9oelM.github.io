---
comments: true
layout: post
title: "Blog for Young (4): Lifting it up with tests"
date: 2018-06-09 09:00:00 -0100
categories: works
---
## Adding eslint to webpack
There's an [`eslint-loader`](https://github.com/webpack-contrib/eslint-loader) for webpack.

First, install eslint:
```
npm install eslint --save-dev
```
then eslint-loader:
```
npm install eslint-loader --save-dev
```

### Reference
look at [this issue on github](https://github.com/zeit/next.js/issues/2184). 
One of the replies to the issue provided the code!

### Use the code in `next.config.js`
```javascript
const withCss = require('@zeit/next-css'); //  just in case if you use css
const withSass = require('@zeit/next-sass')
const webpack = require('webpack');
const {assocPath} = require('ramda');

module.exports = withSass(withCss({ 
    webpack: (config, { dev }) => {
    const eslintRule = {
      test: /\.js$/,
      enforce: 'pre',
      exclude: /node_modules/,
      loader: 'eslint-loader',
      options: {
        // Emit errors as warnings for dev to not break webpack build.
        // Eslint errors are shown in console for dev, yay :-)
        emitWarning: dev,
      },
    };

    const rules = [].concat(eslintRule, config.module.rules);
    return assocPath(['module', 'rules'], rules, config);
    }
}));
```

and before that, since the code uses `ramda`, install it:
```
npm install --save-dev ramda
```

Then run `npm dev run`. Then you see the output from eslint:
```
j031:~/workspace (add1-eslint) $ npm run dev

> young-blog@1.0.0 dev /home/ubuntu/workspace
> next -p 8080



 WARNING  Compiled with 2 warnings                                                                                                                                                                                              3:32:08 AM


/home/ubuntu/workspace/pages/_document.js
   1:8   error  'React' is defined but never used                   no-unused-vars
   2:8   error  'ReactDOM' is defined but never used                no-unused-vars
   3:20  error  'Head' is defined but never used                    no-unused-vars
   3:26  error  'Main' is defined but never used                    no-unused-vars
   3:32  error  'NextScript' is defined but never used              no-unused-vars
   3:50  error  Strings must use doublequote                        quotes
   4:30  error  Missing semicolon                                   semi
   7:1   error  Expected indentation of 1 tab but found 2 spaces    indent
   8:1   error  Expected indentation of 2 tabs but found 4 spaces   indent
   9:1   error  Expected indentation of 3 tabs but found 6 spaces   indent
  10:1   error  Expected indentation of 4 tabs but found 8 spaces   indent
  11:1   error  Expected indentation of 4 tabs but found 8 spaces   indent
  14:1   error  Expected indentation of 5 tabs but found 10 spaces  indent
  15:1   error  Expected indentation of 5 tabs but found 10 spaces  indent
  16:1   error  Expected indentation of 5 tabs but found 10 spaces  indent
  17:1   error  Expected indentation of 5 tabs but found 10 spaces  indent
  18:1   error  Expected indentation of 5 tabs but found 10 spaces  indent
  19:1   error  Expected indentation of 4 tabs but found 8 spaces   indent
  21:1   error  Expected indentation of 4 tabs but found 8 spaces   indent
  22:1   error  Expected indentation of 5 tabs but found 10 spaces  indent
  23:1   error  Expected indentation of 5 tabs but found 10 spaces  indent
  25:1   error  Expected indentation of 4 tabs but found 8 spaces   indent
  26:1   error  Expected indentation of 3 tabs but found 6 spaces   indent
  27:1   error  Expected indentation of 2 tabs but found 4 spaces   indent
  27:6   error  Missing semicolon                                   semi
  28:1   error  Expected indentation of 1 tab but found 2 spaces    indent

✖ 26 problems (26 errors, 0 warnings)
  21 errors, 0 warnings potentially fixable with the `--fix` option.



/home/ubuntu/workspace/pages/_error.js
  6:16  error  Parsing error: Unexpected token getInitialProps

✖ 1 problem (1 error, 0 warnings)


You may use special comments to disable some warnings.
Use // eslint-disable-next-line to ignore the next line.
Use /* eslint-disable */ to ignore all warnings in a file.
> Ready on http://localhost:8080
```
Yay!

## Testing with Jest & Enzyme
### References
Again, helpful articles.
* [Zerocho](https://www.zerocho.com/category/React/post/583231469a87ec001834a0ec)