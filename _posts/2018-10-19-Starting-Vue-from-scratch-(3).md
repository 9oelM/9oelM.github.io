---
comments: true
layout: post
title: "Starting Vue from scratch (3)"
date: 2018-10-19 09:00:00 -0100
categories: development
---

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