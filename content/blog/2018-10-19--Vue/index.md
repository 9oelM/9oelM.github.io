---
title: "Vue"
date: "2018-10-19T09:00:00.009Z"
tab: "post"
tags: ["development", "javascript", "vue"]
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


# Props
Just like `react` you can put in props like:

```javascript
<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src

import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  components: {
    HelloWorld
  }
};
</script>
```

* See `msg` prop of `HelloWorld` component. You just specify them inline. Same as `react`, right?
* You import the component inside the `script` tag. 
* You specify the imported component inside the `components` key of the option object.

# Directives
Directives start with `v-`.

> they apply special reactive behavior to the rendered DOM. 

## Example with `v-if`
```javascript
<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld v-if="seen" msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  data: function(){
    return { seen: true }
  },
  components: {
    HelloWorld
  }
};
</script>
```

`v-if`'s `seen` is like a state in `react`, I think.
So If you set `seen` as `true`, `HelloWorld` component will be visible. However, if you write:

```javascript
data: function(){
    return { seen: false }
  },
```
`HelloWorld` will not be visible. 

**So what does `name` key do?** I suppose it's used for the name when you `import` the component.

## Another example with `v-on`
`HiButton.vue`
```javascript
<template>
    <button v-on:click="sayHi"></button>
</template>
<script>
export default {
  name: "HiButton",
  methods: {
    sayHi: function() {
      alert("hi")
    }
  }
}
</script>
<style lang="sass" scoped>
    button
        background: #FB1134
        height: 100px
        width: 100px
</style>
```
Look at the code above. `v-on:click` is like `onClick` in `react`. And intuition tells us that you can put any various user interactions after `on:`, like `submit`. Same as react, you are passing a reference to the function `sayHi` to `button`. And in `methods` option, you specify the job you wanna do with `sayHi`.

The `scoped` styling works with `div[attr]` form. Vue makes the styling unique to the element, for example, by rendering the button with:

**html**
```html
<button data-v-340c8b7a=""></button>
```
**css**
```css
button[data-v-340c8b7a] {
    background: #FB1134;
    height: 100px;
    width: 100px;
}
```

And here's `Home.vue`: 

`Home.vue`
```javascript
<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld v-if="seen" msg="Welcome to Your Vue.js App"/>
    <HiButton />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue"
import HiButton from "@/components/HiButton.vue"
export default {
  name: "home",
  data: function() {
    return {
      seen: true
    }
  },
  components: {
    HelloWorld,
    HiButton
  }
}
</script>
```

# How can I insert a custom prettier config

In the boilerplate created by Vue Cli, open `eslintrc.js`, and add `"prettier/pretter"` key to `rules` like this, if you were to disable semicolons in your javascript files:
```javascript
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "@vue/prettier"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "prettier/prettier": [
      "warn",
      {
        semi: false
      }
    ]
  },
  parserOptions: {
    parser: "babel-eslint"
  }
}
```
Then, `npm run lint` to check. Done!

# Components
In Vue, you can declare components in a few ways:

```javascript
Vue.component('todo-item', {
  props: ['todo'],
  template: '<li>{{ todo.text }}</li>'
})
```

This is just another way of writing:
```javascript
<template>
    <li>{{ todo.text }}</li>
</template>
<script>
export default {
    name: 'todo-item',
    props: ['todo'] // props specified inside an array
}
</script>
```

And you already know that the object being exported inside the script tag is going to be spread over to the root Vue instance. 

# Data
Data are just like states in `react`. You give `data` property in the Vue instance. 

One thing to remember is that `data` needs to be function inside template components.

# Instance lifecycle hooks
Just like react. right? [Just look at the API and find out what you need](https://vuejs.org/v2/guide/instance.html#Lifecycle-Diagram). 

Lifecycle functions are also inside the vue instance, like:
```javascript
let vm = new Vue({
    created: function(){
        console.log("I was just created")
    }
})
```

# Note on arrow functions: do not use it 
Arrow functions would be bound to the parent context (think about arrow functions used as member functions inside the class, making it needless to `bind` it to the class manually). So you **should not** use arrow functions because `this` will not be bound to the Vue instance but something else that a function finds as a parent.

# Directive shorthands
`v-on`
```javascript
<button @click="sayHi"></button>
```

`v-bind`
```javascript
<a :href="url"> ... </a>
```

# What is `v-bind` used for
It is used for manipulating attribute values inside html tags with data in Vue. 

## `class`
```javascript
<div class="static"
     v-bind:class="{ active: isActive, 'text-danger': hasError }">
</div>
```
classes named `active` and `text-danger` will only render depending on bools `isActive` and `hasError`:

```javascript
data: {
  isActive: true,
  hasError: false
}
```

or, if you want to make it even simpler:

```javascript
<template>
<div class="static"
     :class="classObject">
</div>
</template>
<script>
export default {
    data: {
      classObject: {
        active: true,
        'text-danger': false
      }
    }
}
// or use a computed property
export default {
    data: {
        isActive: true,
        error: null
    },
    computed: {
      classObject: function () {
        return {
          active: this.isActive && !this.error,
          'text-danger': this.error && this.error.type === 'fatal'
        }
      }
    }
}
</script>
```

## `style`
It's pretty much the same.
```javascript
<div v-bind:style="styleObject"></div>
// ...
data: {
  styleObject: {
    color: 'red',
    fontSize: '13px'
  }
}
```


# For loops
```javascript
<template>
  <div>
    <li v-for="(letter, index) in msgArr" v-bind:key="`letter-${index}`">
      {{ letter }}
    </li>
    </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  computed: {
    msgArr: function () {
      return this.msg.split(" ")
    }
  }
}
</script>
```

With the `msg` prop being "Welcome to Your Vue.js App", this is going to show something like:
* Welcome
* to
* Your
* Vue.js
* App

# Event modifiers
You attach it with modifiers that start with a period. 
If you want to `preventDefault()`, you can simply:

```javascript
<form v-on:submit.prevent="onSubmit"></form>
```

# `v-model`
It's for two-way data bindings. 

# Add `element`
It is supported for `vue-cli@3`.
```
vue add element
```

# Importing 
If you do not want to import components separately, just do:
```javascript
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

...

```
in your `index.js` file.

# `i18n`
Add these lines
```javascript
import locale from 'element-ui/lib/locale/lang/ko'

Vue.use(ElementUI, { locale });
```

And in fact, running `vue add element` would guide you through all this and automate this process.

# Let's try this out

## `<slot>` is like `{children}` in `react`
So we use `<slot>` in layouts to mean that something will go into there.

`@/layout/Default.vue`
```javascript
<template>
    <el-row>
        <el-col :span="24"><slot/></el-col>
    </el-row>
</template>
<script>
export default {
    name: "DefaultLayout"
}
</script>
```

`@/views/Home.vue`
```javascript
<template>
  <DefaultLayout>
  <el-card>
    <div slot="header" class="clearfix">
    <span>Card name</span>
  </div>
  <div v-for="o in 4" :key="o" class="text item">
    {{'List item ' + o }}
  </div>
  </el-card>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from "@/layouts/Default.vue"

export default {
  name: "Home",
  components: {
    DefaultLayout,
  }
}
</script>

```

`@/App.vue`
```javascript
<template>
  <div><router-view></router-view></div>
</template>

<script>
export default{
  name: "App"
}
</script>

<style>
</style>
```

`router-view` just renders what is there in the route.
Routing configs are done here inside `router.js`:

```javascript
import Vue from "vue"
import Router from "vue-router"
import Home from "./views/Home.vue"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
})

// You are going to use this in `main.js`
```

# How to Vue.js + Typescript

# 1. Install typescript configs and Vue.js environments using `@vue.cli`

# 2. Typescript basics

## Declaring a variable
Every variable has a type. 
```ts
var data3:number=10;
data3="ddd";
console.log(data3);
```
As you see, you attach the type after the name of the variable, withy the colon "`:`".

```ts
function test1(value:number){
    console.log("value="+value);
}

test1(10);

function test2(value1:number,value2:number):number{
    return value1+value2;
}

var result:string=test2(10,"20");
```
this one above also. You just attach the type of what's right just in front. 

### Function arguments
```ts
function test1(value:number){
    console.log("value="+value);
}
```

### Function return value
```ts
function test2(value1:number,value2:number):number{
    return value1+value2;
}
```

### Again, just to review, variable type
```ts
var result:string=test2(10,"20");
```

# 3. Starting off 
A part of `Helloworld.vue`:
```ts
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class HelloWorld extends Vue {
  @Prop()
  private msg!: string;
}
</script>
```

You declare things in Vue + Typescript with `@` annotation. It's called a **decorator**.

## Define your template class
You inherit `Vue` class:
```ts
export default class HelloWorld extends Vue
```

and it's even simpler to declare class members:
```ts
export default class MyComponent extends Vue {
    //data
    public list:string[] = ["a","b","c"]
    private sth:string[] = ["a","b"]
    //props
	@Prop
    private msg!:string;
    
    //computed
    get sampleData(){
            
    }
    //methods
    iAmMethod(){

    }
}
```

## What exactly is a [decorator](https://www.typescriptlang.org/docs/handbook/decorators.html)
Decorators are a stage 2 proposal for JavaScript and are available as an **experimental** feature of TypeScript.

A Decorator is a special kind of declaration that **can be attached to a class declaration, method, accessor, property, or parameter.**

### Class decorator
The one we see above is **a class decorator.**

A Class Decorator is declared just before a class declaration. The class decorator is applied to the constructor of the class and can be used to observe, modify, or replace a class definition. 

That's it for now. So this part:
```ts
@Component
export default class HelloWorld extends Vue 
```
would mean that `Component` decorator would do necessary operations on the class `HelloWorld` to make it a proper Vue component.

## Difference between `public` and `private` in this Vue project
