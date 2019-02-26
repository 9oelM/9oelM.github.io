---
title: "How to typescript + Vue"
date: "2018-10-24T09:00:00.009Z"
category: "development"
---
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
