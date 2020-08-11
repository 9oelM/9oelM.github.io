---
title: "Deep equality check vs just rerender"
date: "2020-08-09T09:00:00.009Z"
category: ["javascript", "react", "chrome", "performance", "optimization"]
---

# Let's see what we can do
So if you were coming from my previous post, you should know that we discussed a lot about the caveats in preventing a re-render in React, or just letting it happen.

In this post, we aim to discover at which point it would be beneficial for you to just letting your component re-render.

