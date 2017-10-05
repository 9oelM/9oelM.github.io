---
layout: post
title: "Using burp suite (1)-Setting up"
date: 2017-10-05 09:00:00 -0100
categories: hacking
---
## Little notes
Note 1: most contents are copied from [portswigger.net](https://portswigger.net/burp/help/suite_gettingstarted.html) for ease of seeing only important points. Check out the website for more detail.

Notes 2: Screenshots are from my laptop, though.

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

### 4. Click on the `Intercept is on` button so that it says `Intercept is off`. 

Go back to your browser, and you should (shortly) see the URL you requested being loaded in the normal way.

### 5. Configure for HTTPS

Finally, you need to configure your browser to be able to send HTTPS requests through Burp without any problems. **This step isn't strictly necessary to use Burp in a basic way or only for non-HTTPS URLs**, but it only needs to be done once and **is necessary to get the most out of Burp when testing applications that use HTTPS.**

For detailed help on doing this, please refer to the help on [**installing Burp's CA certificate**](https://support.portswigger.net/customer/portal/articles/1783087-Installing_Installing%20CA%20Certificate%20-%20FF.html). When you have done this, you can confirm things are working properly by closing all your browser windows, opening a new browser and visiting any HTTPS URL. The browser should not display any security warnings, and the page should load in the normal way (you will need to turn off interception again in the Proxy Intercept tab if you have re-enabled this).

**If everything has worked, you should now be able to visit any HTTPS URL via Burp without any security warnings.**

### 6. Additional notes
As you browse an application via Burp, **the Proxy history keeps a record of all requests and responses.** In the Proxy, go to the History tab and review the series of requests you have made. Select an item in the table and view the full messages in the Request and Response tabs.

Also, **as you browse, Burp builds up a site map of the target application.** Go to the Target tab, and the Site Map sub-tab, to view this. The site map contains all of the URLs you have visited in your browser, and also all of the content that Burp has inferred from responses to your requests (e.g. by parsing links from HTML responses). **Items that have been requested are shown in black, and other items are shown in gray.** You can expand branches in the tree, select individual items, and
 view the full requests and responses (where available). For more help, see Using the Target tool .

Burp Suite is designed to be a hands-on tool, where the user controls the actions that are performed. At the core of Burp's user-driven workflow is the ability to pass HTTP requests between the Burp tools, to carry out particular tasks. You can send messages from the Proxy intercept tab, the Proxy history, the site map, and indeed anywhere else in Burp that you see HTTP messages. To do this, select one or more messages, and use the context menu to send the request to another tool. 

