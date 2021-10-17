---
title: "Meta tags"
date: "2018-04-29T09:00:00.009Z"
tags: ["development", "meta-tag"]
---
### Sources
* [1&1](https://www.1and1.com/digitalguide/websites/web-development/the-most-important-meta-tags-and-their-functions/)
* [Stackoverflow post](https://stackoverflow.com/questions/1092329/what-are-the-important-meta-tags-i-must-put-in-my-website?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa)
* [CSS-Tricks](https://css-tricks.com/essential-meta-tags-social-media/)
* [Google](https://support.google.com/webmasters/answer/79812?hl=ko)
* [buildwebsite4u](http://www.buildwebsite4u.com/building/web-crawlers.shtml)
* [Facebook's open graph protocol](http://ogp.me/)
* [gaijin, a metatag generator](https://www.gaijin.at/en/olsmgen.php)

## List of useful meta (+etc) tags at once
```html
<meta charset="utf-8"/>
<meta name="description" content="160 characters at max"/>
<meta name="keywords" content="keyword1, keyword2, ...">
<meta name="author" content="Author name" />
<meta name="copyright" content="Copyright owner" />
<meta name=viewport content="width=device-width, initial-scale=1">

<!--Controls-->
<meta http-equiv="cache-control" content="no-cache"/>
<meta http-equiv="expires" content="exercise date in seconds. Ex: 5000"/> 

<!--Facebook-->
<meta property="og:url" content="{{pageUrl}}">
<meta property="og:image" content="{{imageUrl}}">
<meta property="og:description" content="{{description}}">
<meta property="og:title" content="{{pageTitle}}">
<meta property="og:site_name" content="{{siteTitle}}">
<meta property="og:see_also" content="{{homepageUrl}}">
<!--optional-->
<meta property="og:site_name" content="European Travel, Inc.">

<!--Google+-->
<meta itemprop="name" content="{{pageTitle}}">
<meta itemprop="description" content="{{description}}">
<meta itemprop="image" content="{{imageUrl}}">

<!--Twitter-->
<meta name="twitter:card" content="summary">
<meta name="twitter:url" content="{{pageUrl}}">
<meta name="twitter:title" content="{{pageTitle}}">
<meta name="twitter:description" content="{{description}}">
<meta name="twitter:image" content="{{imageUrl}}">
```

### Title tag
Just don't forget the title tag (though it's not a meta tag). 

### Character encoding 
> If the font is not already defined in the HTTP header, this information needs to be given in the HTML code. 

```html
<meta charset="utf-8"/>
```

### Description
> It is important for website owners to remember to limit the description to 160 characters (including spaces). Any text after this point is cut off and an incomplete description will appear in the search results.

```html
<meta name="description" content="160 characters at max"/>
```

### Keyword
> The keyword tag used to be one of the most essential SEO meta tags, as primitive search engines used this as the central feature for search result rankings. However, because of the great potential to manipulate this meta element, it is now left out of Google’s ranking factors.

```html
<meta name="keywords" content="keyword1, keyword2, ..."/>
```

### Viewport
For devices with different viewport.

```html
<meta name=viewport content="width=device-width, initial-scale=1"/>
```

### Author and Copyright (Optional)
```html
<meta name="author" content="Author name"/>
<meta name="copyright" content="Copyright owner"/>
```

### Cache
> It is standard for websites to be stored on proxy servers, which allows the websites to load faster when subsequently called up. To prevent this process (for example, because the website updates frequently), use the meta tag “cache-control” with the value “no-cache”:

or you could set the date of expiry of cached data.
```html
<meta http-equiv="cache-control" content="no-cache"/>
<meta http-equiv="expires" content="exercise date in seconds. Ex: 5000"/> 
```

### For web crawlers 

> Note: All these commands tell search engine spiders to index the page and follow links found on it. However, all search engines do this by default anyway.

Allow a search engine crawler to index an HTML site:
```html
<meta name="robots" content="index, follow"/>
```

Disallow a search engine crawler to index an HTML site:
```html
<meta name="robots" content="noindex,follow">
<meta name="robots" content="noindex">
```

Disallow a search engine crawler to index links inside an HTML site:
```html
<meta name="robots" content="index,nofollow">
<meta name="robots" content="nofollow">
```

Disallow caching website information:
```html
<meta name="robots" content="noarchive">
```

