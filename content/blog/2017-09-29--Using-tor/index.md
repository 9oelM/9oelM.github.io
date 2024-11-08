---
title: "Using tor"
tags: ["hacking", "tor", "network"]
date: "2017-09-29T09:00:00.009Z"
tab: "post"
---
## Note
Below content is just a excerpt from the websites. If you need to see in detail, don't hesitate to go onto [the original website](https://www.torproject.org/about/overview.html.en).

## What is Tor
Tor is an Internet networking protocol designed to anonymize the data relayed across it. [(Tom's guide)](https://www.tomsguide.com/us/what-is-tor-faq,news-17754.html)

## How does Tor work
### The Tor network
The Tor network is a group of volunteer-operated servers that allows people to improve their privacy and security on the Internet. Tor's users employ this network by connecting through **a series of virtual tunnels rather than making a direct connection**, thus allowing both organizations and individuals to share information over public networks without compromising their privacy. 

The variety of people who use Tor is actually part of what makes it so secure. **Tor hides you among the other users on the network**, so the more populous and diverse the user base for Tor is, the more your anonymity will be protected. 

Using Tor **protects** you against a common form of Internet surveillance known as **"traffic analysis."** Traffic analysis can be used to infer who is talking to whom over a public network. Knowing the source and destination of your Internet traffic allows others to track your behavior and interests.

### Why privacy is in danger without Tor
Internet data packets are comprised of (1) Data payload and (2) header used for routing. The data payload may be encrypted, but the header may not, because it needs to publicly state where the data has to go.

Now, authorized/unauthorized intermediaries, such as ISPs, could sit there and watch over the headers. 

### What Tor does for your privacy
Instead of taking a direct route from source to destination, data packets on the Tor network take a random pathway through several relays that cover your tracks so no observer at any single point can tell where the data came from or where it's going.

Below is a picture from the Tor website to help understand.

![Tor network explained](./0.png)

To create a private network pathway with Tor, the user's software or client incrementally builds a circuit of encrypted connections through relays on the network. The circuit is extended one hop at a time, and each relay along the way knows only which relay gave it data and which relay it is giving data to. No individual relay ever knows the complete path that a data packet has taken. The client negotiates a separate set of encryption keys for each hop along the circuit to ensure that each
hop can't trace these connections as they pass through. 

For efficiency, the Tor software uses the same circuit for connections that happen within the same ten minutes or so. Later requests are given a new circuit, to keep people from linking your earlier actions to the new ones. 

### Kind warning on Tor
Tor does not completely save you from the issue of privacy. It only focuses on **protecting the transport of data**. See the [weaknesses](https://en.wikipedia.org/wiki/Tor_%28anonymity_network%29#Weaknesses) section of Wikipedia page on Tor for more. 


