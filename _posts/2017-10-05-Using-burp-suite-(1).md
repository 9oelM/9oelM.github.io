---
layout: post
title: "Using burp suite (1)"
date: 2017-10-05 09:00:00 -0100
categories: hacking
---
## Little note
Note: most contents are copied from [portswigger.net](https://portswigger.net/burp/help/suite_gettingstarted.html) for ease of seeing only important points. Check out the website for more detail.

## Setting up
Burp functions as an HTTP proxy server, and all HTTP/S traffic from your browser passes through Burp.
So you need to set the browser up for that.

### 1. Checking Burp's Proxy Listener
Go to the Proxy tab, then the Options sub-tab, and look in the Proxy Listeners section. You should see an entry in the table with the checkbox ticked in the Running column, and "127.0.0.1:8080" showing in the Interface column. 

![Check proxy listener]({{ site.url }}/assets/images/UsingBurpSuite/1CheckProxy.png)

### 2. Configuring the browser to use Burp Proxy Listener as its HTTP proxy server
To do this, you need to change your browser's proxy settings to use the proxy host address (by default, 127.0.0.1) and port (by default, 8080) for both HTTP and HTTPS protocols, with no exceptions. 

Enter your Burp Proxy listener address in the "HTTP proxy" field (by default, 127.0.0.1). Enter your Burp Proxy listener port in the "Port" field (by default, 8080). Make sure the "Use this proxy server for all protocols" box is checked. Delete anything that appears in the "No proxy for" field. Then click "OK" to close all of the options dialogs.

![Configure browser]({{site.url}}/assets/images/UsingBurpSuite/2ConfigureBrowser.png)

### 3. Check by opening `127.0.0.1:8080`

![Check by opening 127.0.0.1]({{site.url}}/assets/images/UsingBurpSuite/3SeeProxySite.png)
