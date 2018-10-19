---
comments: true
layout: post
title: "Starting Vue from scratch"
date: 2018-10-19 09:00:00 -0100
categories: development
---
# No time
Really, I've got no time to learn Vue. I need to get basic concepts in the shortest length of time.

# Vue Cli 3.0 
We are going to use Vue Cli@3.0.

## Initial settings
Update `nvm` and `npm` to an appropriate version
```
j031:~/workspace $ nvm install 8.9
Downloading https://nodejs.org/dist/v8.9.4/node-v8.9.4-linux-x64.tar.xz...
######################################################################## 100.0%
Now using node v8.9.4 (npm v5.6.0)
j031:~/workspace $ npm --version
5.6.0
j031:~/workspace $ node --version
v8.9.4
j031:~/workspace $ 
```
then install vue cli
```
npm install -g @vue/cli
```
and check:
```
j031:~/workspace $ vue --version
3.0.5
```

# Enable instant prototyping

Install:
```
npm install -g @vue/cli-service-global
```

And just load up your component file:

```
vue serve App.vue
```

And now if you are running your app on a container, it may show some error saying something like "invalid host error". This is how you solve it:

Make `vue.config.js` in the project root:
```javascript
// vue.config.js
module.exports = {
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    disableHostCheck: true
  }
}
```
Then you are good to go. You will see your vue file loaded on the webpage.
For more troubleshotting, see:
* [#828](https://github.com/vuejs/vue-cli/issues/828)
* [#1616](https://github.com/vuejs/vue-cli/issues/1616)
* [Webpack documentation](https://webpack.js.org/configuration/dev-server/#devserver-disablehostcheck)
* [Naver blog post](http://blog.naver.com/PostView.nhn?blogId=1231jjong&logNo=221278068483&categoryNo=0&parentCategoryNo=0&viewDate=&currentPage=1&postListTopCurrentPage=1&from=postView&userTopListOpen=true&userTopListCount=20&userTopListManageOpen=false&userTopListCurrentPage=1)
* [vue-cli documentation](https://cli.vuejs.org/guide/webpack.html#simple-configuration)

# Go further
You can point to the entry file and Vue Cli will automatically bundle things up for you.

# Create a project
```
vue create test
```
It will go over interactive prompts and select things as you would like them to be!

After then, it will initialize project files automatically. Beautiful! **You don't need to create a boilerplate for your Vue project right?**
