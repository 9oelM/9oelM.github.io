---
comments: true
layout: post
title: "Starting Vue from scratch (4)"
date: 2018-10-19 09:00:00 -0100
categories: development
---
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
