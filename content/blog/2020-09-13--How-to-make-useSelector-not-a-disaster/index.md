---
title: "How to make useSelector not a disaster"
date: "2020-09-13T09:00:00.009Z"
tags: ["javascript", "react", "useSelector"]
---

_Disclaimer_: We will focus on `useSelector` itself in this article, rather than third-party libraries like `reselect`, because it's out of scope of the article. 

# How was it like before?

Now, before talking about `useSelector`, we need to know some background. Let's go back to pre-function component era, where all we needed to care about were the `props`. Not so much you needed to do. Choices were `PureComponent` and `shouldComponentUpdate`. Nothing else. Like this:

```ts
import React from 'react'

interface Props {
  readonly shouldShowRed: boolean;
}

class SomeDiv extends React.PureComponent<Props, {}> {
  public render() {
    return (
      <div style={{
        width: '300px',
        height: '300px',
        background: this.props.shouldShowRed ? 'red' : 'white'
      }}>
      hi
      </div>
    )
  }
}

export default SomeDiv;
```

Right. So if you make such component, this component is only going to update when `shouldShowRed` is changed. Otherwise, it is going to stay still even if its parent renders for some reason. It goes the same for `shouldComponentUpdate`; It just gives you additional tooling to specify your own method of telling the component when to update.

# Using it with redux?

Again, using the component with redux was pretty straightforward too. Just create a container and pass states and dispatches (I didn't write any `mapDispatchToProps` for the sake of simplicity) mapped as props: 

```ts
// Presentational component (same as the above component)
import React from 'react'

interface Props {
  readonly shouldShowRed: boolean;
}

class SomeDiv extends React.PureComponent<Props, {}> {
  public render() {
    return (
      <div style={{
        width: '300px',
        height: '300px',
        background: this.props.shouldShowRed ? 'red' : 'white'
      }}>
      hi
      </div>
    )
  }
}

export default SomeDiv;

// container component
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import SomeDiv from './SomeDiv';

// Let's say that we have this redux root state
interface RootReduxState {
    readonly conditions: {
        readonly shouldShowRed: boolean;
        readonly shouldShowGreen: boolean;
        readonly shouldShowBlue: boolean;
    }
}

export const mapStateToProps: (
  state: RootReduxState;
) => { readonly shouldShowRed: RootReduxState['conditions']['shouldShowRed'] } = (
  state,
) => ({
  shouldShowRed: state.shouldShowRed,
});

export default connect(mapStateToProps, null)(SomeDiv);
```

Right. Let's assume that we have `RootReduxState` as we have seen from the code above. And this is just going to work so well. Nothing difficult here. `SomeDiv` will keep being efficient at its best because `PureComponent` is working well. But how should we precisely port this example to a function component?

# Function component

Well, it's easy. Just use `useSelector`, Right?

```ts
import React from 'react'

const SomeDiv: FC = () => {
    const shouldShowRed: boolean = useSelector((s: RootReduxState) => s.conditions.shouldShowRed);

    return (
      <div style={{
        width: '300px',
        height: '300px',
        background: shouldShowRed ? 'red' : 'white'
      }}></div>
    )
} 

export default SomeDiv;
```

Perfect. But what if you need more than just  `shouldShowRed`? The moment you start to get more than one thing from useSelector (which is a very normal case), you are going to need additional optimization efforts with appropriate knowledge.

If we were to use `shouldShowGreen` too, we could choose:

**Option 1**

```ts
const {
  shouldShowRed,
  shouldShowGreen,
}: RootReduxState['conditions'] = useSelector(({ conditions: { shouldShowRed, shouldShowGreen }}: RootReduxState) => ({
  shouldShowRed, shouldShowGreen
}));
```

Or, we could:

**Option 2**

```ts
const {
    conditions: {
        shouldShowRed,
        shouldShowGreen,
    }
}: RootReduxState = useSelector((s: RootReduxState) => s;
```

Alternatively:

**Option 3**

```ts
const shouldShowRed: boolean = useSelector((s: RootReduxState) => s.conditions.shouldShowRed)
const shouldShowGreen: boolean = useSelector((s: RootReduxState) => s.conditions.shouldShowGreen)
```

Or, just a small variant..

**Option 4**

```ts
const { shouldShowRed, shouldShowGreen }: RootReduxState['conditions'] = useSelector((s: RootReduxState) => s.conditions)
```


# useSelector
Which method have you been using? Whichever one you are using, you should be able to give reasons! Now, before having a look at each option, let's go back to `useSelector` and see what it does.

So let me bring the most important thing to the table immediately: `useSelector` forces re-render of your component. It's not a prop, but it can still make your component re-render. Really? Yes. Let's look at [the offical documentation](https://react-redux.js.org/api/hooks#useselector):

> When an action is dispatched, useSelector() will do a reference comparison of the previous selector result value and the current result value. **If they are different, the component will be forced to re-render**. If they are the same, the component will not re-render.

So how do you judge if they are different? By running strict equality (`===`) comparision. ([Click here if you are feeling like looking at the official repo's source code](https://github.com/reduxjs/react-redux/blob/master/src/hooks/useSelector.js#L98)). In the source code, `useSelector` by default uses a function called `refEquality`, and all it does is simply [`const refEquality = (a, b) => a === b`](https://github.com/reduxjs/react-redux/blob/master/src/hooks/useSelector.js#L7).

This means that if you are returning an object from `useSelector` for whatever reason, `useSelector` will cause a re-render every time an action is dispatched from the store, simply because objects of the same structure (same keys and values) do not strictly equal each other in javascript. For example, `{ a: 1 } === { a: 1 }` is `false`. Official doc says the same:

> returning a new object every time will always **force a re-render** by default.

Do they really force it? Yes. [From the source code](https://github.com/reduxjs/react-redux/blob/master/src/hooks/useSelector.js#L73):

```ts
const [, forceRender] = useReducer(s => s + 1, 0) 

...

forceRender()
```

So... now, with this in our mind, let's go back to the options we saw previously.

# Which one to pick

## Option 1

```ts
const {
  shouldShowRed,
  shouldShowGreen,
}: RootReduxState['conditions'] = useSelector(({ conditions: { shouldShowRed, shouldShowGreen }}: RootReduxState) => ({
  shouldShowRed, shouldShowGreen
}));
```

_Catches_:
1. You are just writing a pair of `shouldShowRed` and `shouldShowGreen` for three times just to take the desired state out.
2. This will cause a re-render forcefully every time an action is dispatched, because you are returning a new object from your selector.

_Verdict_: not good enough.

## Option 2

```ts
const {
    conditions: {
        shouldShowRed,
        shouldShowGreen,
    }
}: RootReduxState = useSelector((s: RootReduxState) => s);
```

_Catches_: you are returning the entire state from your selector, and destructuring it outside of the selector. This will too cause a re-render. What's the point of having the selector callback if you intend to receive the entire state? This is a bad practice. It's just tantamount to passing the entire state in `mapStateToProps`. You don't do that there. So, why here?

_Verdict_: not good enough.

## Option 3

```ts
const shouldShowRed: boolean = useSelector((s: RootReduxState) => s.conditions.shouldShowRed)
const shouldShowGreen: boolean = useSelector((s: RootReduxState) => s.conditions.shouldShowGreen)
```

_Catches_: 
1. you are calling `useSelector` twice, and this does not matter. According to the official doc:

    > Because of the React update batching behavior used in React Redux v7, a dispatched action that causes multiple useSelector()s in the same component to return new values **should only result in a single re-render**.

2. strict equality is functioning as properly for each selected state because you are returning a primitive from each selector.

_Verdict_: usable.

## Option 4:

```ts
const { shouldShowRed, shouldShowGreen }: RootReduxState['conditions'] = useSelector((s: RootReduxState) => s.conditions)
```

_Catches_: It's just the same as option 1 or 2. It will cause a re-render too.

_Verdict_: Not good enough.

# Improving the bad options

Thankfully, redux gives us a chance to insert our own equality functions. The concept is the same `shouldComponentUpdate` or the equality callback in `React.memo`. We could do this:

```ts
const { shouldShowRed, shouldShowGreen }: RootReduxState['conditions'] =
  useSelector((s: RootReduxState) => s.conditions, (prev, next) => prev.shouldShowRed === next.shouldShowRed && prev.shouldShowGreen === next.shouldShowGreen)
```

or,

```ts
import deepEqual from 'react-fast-compare'

const { shouldShowRed, shouldShowGreen }: RootReduxState['conditions'] = useSelector((s: RootReduxState) => s.conditions, deepEqual)
```

Something like that. However you should really note that using `deepEqual` cannot ever be fast if you are trying to equal a large object ([Dan Abramov said it, too!](https://twitter.com/dan_abramov/status/1104414272753487872?s=20)):

![dan](./dan.png)

Note also that you only want to run `deepEqual` on what you need. In the code snippet above, you are also comparing `shouldShowBlue` which is a part of `RootReduxState['conditions']`. But you don't need that anyways, but you are still comparing it. Make sure you _select_ and _compare_ what you only need.

# But why would you try optimizing it in the first place?

Well, at first, it's totally okay. Your app has ~100 components only, your redux state is quite shallow, and it does not take a long time to render whatever's being rendered.

The problem comes at two points:
1. _once you start to scale your application._ If you succeeed in making a popular application, you are going to support more features, and thus, need more components. Your components will be numerous, leading to the point where re-render of expensive components will be causing a sluggish interaction.
2. _once you start to care about users using low-end devices._ You want to support users with low-end spec computers. You want to support mobile devies with inherently less performance than most computers. Just get a 6x slowdown on your CPU from Chrome's performance tool and try to see how long it takes for your components to react.

# Conclusion
So far we looked at possible problems with using `useSelector` and how to solve them:
  1. If you are returning an object from your selector callback, it's going to force re-render by default.
  2. To prevent re-render, either let your selector return a primitive type, or use a custom equality function.

That's it. Thank you!
