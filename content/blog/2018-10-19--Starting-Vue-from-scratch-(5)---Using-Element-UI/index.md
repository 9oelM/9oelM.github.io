---
title: "Starting Vue from scratch (5) - Using Element UI"
date: "2018-10-19T09:00:00.009Z"
category: "development"
---
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

