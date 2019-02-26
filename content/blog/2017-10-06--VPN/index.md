---
title: "VPN"
date: "2017-10-06T09:00:00.009Z"
category: "knowledge"
---
## What is VPN and how does it work
Virtual Private Network.

### [Microsoft's Explanation](https://technet.microsoft.com/en-us/library/cc731954(v=ws.10).aspx)

> Virtual private networks (VPNs) are point-to-point connections across a private or public network, such as the Internet. A VPN client uses special TCP/IP-based protocols, called tunneling protocols, to make a virtual call to a virtual port on a VPN server.

> In a typical VPN deployment, a client initiates a virtual point-to-point connection to a remote access server over the Internet. The remote access server answers the call, authenticates the caller, and transfers data between the VPN client and the organization’s private network.

> To emulate a point-to-point link, data is encapsulated, or wrapped, with a header. **The header provides routing information** that enables the data to traverse the shared or public network to reach its endpoint. To emulate a private link, **the data being sent is encrypted for confidentiality.** Packets that are intercepted on the shared or public network are **indecipherable without the encryption keys.** 

![VPN](https://i-technet.sec.s-msft.com/dynimg/IC195333.gif)

### [Tunnel in VPN](http://www.rawbytes.com/virtual-private-networks-in-depth-technical-details/)

> We all know encapsulation in networking. Weather you consider the OSI model or the TCP/IP model, we all grew up learning about how we use encapsulation in every layer of the forwarding plane. 

> So if we put **an additional layer of encapsulation on a packet at say layer 3 or layer 2 on one end and then remove that layer at the other end, we form a tunnel between the two endpoints.** So tunneling simply means the original packet being encapsulated in a new header(s) and then sent from one device in the internet to another, while the reverse happens at the other end.

> Tunneling is a not just used in VPN, but in many places in the networking world. We generally use tunneling when we want to send a packet that is different and not recognized by the intermediate route nodes but used at the end nodes. 

![Tunnel](https://i-technet.sec.s-msft.com/dynimg/IC195334.gif)

### Virtual network adapter
To implement a tunnel we need a Virtual Network Adapter. A virtual network adapter is a network adapter completely in the software. It simulates a network interface (rawbytes.com). 

## Types of VPN
### 1. Remote access VPN
![Remote access VPN](https://tiptopsecurity.com/wp-content/uploads/2016/06/RemoteAccessVPN.png)

> Remote access VPN connections enable users working at home or on the road to access a server on a private network using the infrastructure provided by a public network, such as the Internet.

> From the user’s perspective, the VPN is a point-to-point connection between the computer (the VPN client) and an organization’s server. The exact infrastructure of the shared or public network is irrelevant because it appears logically as if the data is sent over a dedicated private link
(microsoft).

### 2. Site-to-site (peer-to-peer) VPN
![Site-to-site VPN](https://tiptopsecurity.com/wp-content/uploads/2016/06/SiteToSiteVPN.png)
> Site-to-site VPN connections (also known as router-to-router VPN connections) enable organizations to have routed connections between separate offices or with other organizations over a public network while helping to maintain secure communications. **A routed VPN connection across the Internet logically operates as a dedicated wide area network (WAN) link.** When networks are connected over the Internet, a router forwards packets to another router across a VPN connection. To the routers, the VPN connection operates as a data-link layer link.
> A site-to-site VPN connection connects two portions of a private network. The VPN server provides a routed connection to the network to which the VPN server is attached. **The calling router (the VPN client) authenticates itself to the answering router (the VPN server), and, for mutual authentication, the answering router authenticates itself to the calling router.** In a site-to site VPN connection, the packets sent from either router across the VPN connection typically do not originate at the routers (microsoft).

### 3. Properties of VPN connections (microsoft)
VPN connections that use PPTP, L2TP/IPsec, and SSTP have the following properties:
* Encapsulation
* Authentication
* Data encryption

## Am I completely anonymous under VPN?

## References
* [rawbytes.com](http://www.rawbytes.com/virtual-private-networks-in-depth-technical-details/)
* [Microsoft](https://technet.microsoft.com/en-us/library/cc731954(v=ws.10).aspx)
* [tiptopsecurity](https://tiptopsecurity.com/all-about-vpns/)
* [expressvpn](https://www.expressvpn.com/what-is-vpn)

