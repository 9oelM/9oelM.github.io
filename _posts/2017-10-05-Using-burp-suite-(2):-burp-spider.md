---
layout: post
title: "Using burp suite (2): burp spider"
date: 2017-10-05 09:00:00 -0100
categories: hacking
---
## Little notes
For the current tutorial, I'm going to try to use burp suite with [Instagram](https://www.instagram.com).

## [What does Burp Spider do](https://portswigger.net/burp/help/spider_gettingstarted.html)
* Burp Spider is a tool for automatically crawling web applications.
* You can use Burp Spider to partially **automate** this process for very large applications, or when you are **short of time.** 

## [The Target Tool](https://portswigger.net/burp/help/target_using.html#manualmapping)
The Target tool gives you an overview of your target application's content and functionality, and lets you drive key parts of your testing workflow. 

### Manual Application Mapping
1. Ensure the browser and burp proxy are up and running. Turn off proxy interception. You know this from [the previous post](https://mr-polite.github.io/hacking/2017/10/05/Using-burp-suite-(1)-setting-up.html).

2. Follow every link, submit every form, step through every multi-stage process, and log in to all protected areas.



3.  This manual mapping process will populate the Target site map with all of the content requested via the Proxy, and also (via passive spidering) any further content that can be inferred from application responses (via links, forms, etc.). 

**Note: Provided you have sufficient time, mapping applications manually in this way is qenerally much safer and more effective than moving directly to automated crawling techniques.**

4. Define the **target scope**. This just means deciding on the items you want to find something out from. Select `branches` within the site map and using the `Add to scope` / `Remove from scope` commands on the context menu. 
