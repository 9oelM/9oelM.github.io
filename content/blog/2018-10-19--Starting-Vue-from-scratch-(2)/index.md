---
title: "Starting Vue from scratch (2)"
date: "2018-10-19T09:00:00.009Z"
category: "development"
---

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


