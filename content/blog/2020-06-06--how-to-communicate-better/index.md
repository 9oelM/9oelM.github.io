---
title: "How to communicate better"
date: "2020-06-06T09:00:00.009Z"
tab: "post"
tags: ["work", "communication"]
---

I find this problem happening very often. And I never expected it to be so.

I thought everyone in the world is able to express his/her thoughts clearly in the best way possible, until I got a job in my first company. Truth be told, it isn't like that. Many people have a hard time trying to express the materials contained in their brains. 

Why... why!??? Why can't you just make what you are trying to say much clearer?

Here are some tips I want to give (and hopefully people could change a bit after reading this):

1. *overcommunicate.* 
    - It is a miracle that a listener can understand what you are saying at once. Even if you said it clearly enough, there is still a substantial chance that the listener does not understand what you are saying for some reason. Say it again, in different, easier words, providing contexts, appropriate analogy, etc.
    - people may be worried about, or trying to resolve anything that you already have actually managed to settle. It's always a good idea to just tell anything that happens to you first, to everyone.
2. *vary methods of communication.* Ditch your current communication medium if you think it is inefficient. Use:
    - images (usually captured images from my mac do tonnes of good jobs): sometimes if you send an image, you don't even need to explain it if the listener (or 'seer') has a good wit of understanding.
    - analogies: sometimes it's hard to explain things in plain words. Why not convert it to some easier words to make your talk more apparent?
    - digital messages: digital messages carry advantage over traditional talk in person in emphasis and perpetuity. You can make texts red, italic, bold, ... whatever you want to do to imply the important (or less important) points. Also, unlike talking in person, digital messages stay semi-permanently. You can always go back and check what the person said.
3. *provide your context.* 
    - 99% of the times, people don't know what you've been doing. Most of the time, they need the rationale of your work to understand fully what you've been doing and to suggest any good ideas upon it. So if you've been working on some work, don't talk about the problems with it first. Talk about why you started working on this work. Tell them what problem you are trying to solve with your work. Then, finally, talk about which part of your work you need some help from your colleague.
    - So if you've been working on some code and want your colleague to help you on the buggy part, don't start with the part that has the problem..... he/she would never understand without seeing the surrounding code blocks with explanation from you.
4. *just be clear.* 
    - Do not, please, do not use pronouns when you can use the direct term for it. pronouns may be fantastic from a linguistic perspective because they save words. But it's certainly not the case for the thing that you are trying to explain to your colleague at work.
    - Don't say 'that color', while you can say 'that blue color used in the payment button'. Please. Just don't. Especially on Slack. Alternatively, at least if you want to say 'that color', please send me a screenshot that has a big fat red circle around the blue button that you want me to detect.

5. *divide your points into smaller segments.* People don't want to read long paragraphs. Learn to divide your paragraph into smaller chunks. Set a topic sentence clearly. This is just a simple example I made up:

    ```
    So I've been dealing with the Chromium bug for a long time, and I found that the bug actually comes from the fact that our virtual machine is based on Ubuntu, not any other distributions of Linux. Currently this weird bug  only exists on Ubuntu, so we should consider moving to another distribution if the bug persists and there seems to be no other solutions other than that. Also another problem Gale found is that Chromium updates are not reflected timely, so we should find a way to get our Chromium executable updated as we deploy our headless scraping script. Maybe we can simply set something like a cron job on a daily basis to get notified whenever there is a new release on Chromium.
    ```

    of course you could say this on Slack, people can read it and understand it. But why not:

    ```
    Dear team, I found 2 problems and respective solutions with Chromium we use for headless scraping script. 
    1. 
    - Problem: our virtual machine is based on Ubuntu, which is the only distribution of linux where weird bug happens.
    - Proposed solution: consider moving to another distribution
    2. 
    - Problem: Chromium updates are not reflected timely in the scraping script.
    - Proposed solution: run something like a cron job on a daily basis to get notified whenever there is a new release on Chromium
    ```

    I know this is a message full of total nonsense because I just made it up, but you can get the point. It's much easier to understand from the reader's perspective.

So.. let's always think from the perspective of a listener. We cannot look inside the brains of one another. That's the reason we should follow the points I proposed.
