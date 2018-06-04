---
comments: true
layout: post
date: 2017-12-31 09:10:00 -0100
title: "Difference between cookies and sessions"
categories: knowledge
---
## Difference between cookies and sessions
### Cookies
> An HTTP cookie (web cookie, browser cookie) is a small piece of data that a server sends to the user's web browser. The browser may store it and send it back with the next request to the same server.  
> When receiving an HTTP request, a server can send a Set-Cookie header with the response. The cookie is usually stored by the browser, and then the cookie is sent with requests made to the same server inside a Cookie HTTP header. 

> There are two types of cookies:
    * Session cookies: The cookie created above is a session cookie: it is deleted when the client shuts down, because it didn't specify an Expires or Max-Age directive. However, web browsers may use session restoring, which makes most session cookies permanent, as if the browser was never closed.
    * Permanent cookies: Instead of expiring when the client closes, permanent cookies expire at a specific date (Expires) or after a specific length of time (Max-Age).

### Sessions
> Sessions are stored on the server, which means clients do not have access to the information you store about them - this is particularly important if you store shopping baskets or other information you do not want you visitors to be able to edit by hand by hacking their cookies. 

> Session data, being stored on your server, does not need to be transmitted with each page; clients just need to send an ID and the data is loaded from the local file. Finally, sessions can be any size you want because they are held on your server, whereas many web browsers have a limit on how big cookies can be to stop rogue web sites chewing up gigabytes of data with meaningless cookie information.

### + from stackoverflow users
> It is preferred to use sessions because the actual values are hidden from the client, and you control when the data expires and becomes invalid. If it was all based on cookies, a user (or hacker) could manipulate their cookie data and then play requests to your site.

> __Session__:
    * IDU is stored on server (i.e. server-side)
    * Safer (because of 1)
    * Expiration can not be set, session variables will be expired when users close the browser. (nowadays it is stored for 24 minutes as default in php)

> __Cookies__:
    * IDU is stored on web-browser (i.e. client-side)
    * Not very safe, since hackers can reach and get your information (because of 1)
    * Expiration can be set (see setcookies() for more information)

### Sources
* [hackingwithphp](http://www.hackingwithphp.com/10/1/0/cookies-vs-sessions)
* [Mozila](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies)
* [Stackoverflow](https://stackoverflow.com/questions/6253633/cookies-vs-sessions)
