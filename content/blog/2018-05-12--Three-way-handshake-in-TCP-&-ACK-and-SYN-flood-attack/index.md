---
title: "Three-way handshake in TCP & ACK and SYN flood attack"
date: "2018-05-12T09:00:00.009Z"
category: "hacking"
---
## Sources
* [mazebolt](https://kb.mazebolt.com/knowledgebase/ack-flood/)
* [microsoft](https://support.microsoft.com/en-gb/help/172983/explanation-of-the-three-way-handshake-via-tcp-ip)
* [geeksforgeeks](https://www.geeksforgeeks.org/computer-network-tcp-3-way-handshake-process/)
* [ddosguard](https://ddos-guard.net/en/terminology/ack-push-ack-flood)
* [flowguard](https://www.flowguard.io/about-ddos/types-of-ddos/ack-flood-attack)
* [wikipedia](https://en.wikipedia.org/wiki/SYN_flood)

## Three-way handshake: how does it work

### When is it used
TCP three-way handshake occurs between a client and server when initiating or terminating a TCP connection.

### Expalined in detail
1. So let's say client A and B are trying to make a connection over TCP.
2. `A` will send a `SYN`(chronize) packet to `B` with a sequence number that tells where the segment will begin from.
    ```
    A   --SYN (seq = x)-->  B
    
    note: x is n + 1 where n is previous sequence number it just had.
    ```
3. `B` receives a frame from `A` and will send a `SYN + ACK` frame as a reply. `SYN` is to start the conversation and `ACK` is just proof to the client that the ACK is specific to the SYN the client initiated. 
    ```
    A   <--SYN + ACK (seq = y, ack = x + 1)--   B
    ```
4. `A` sends back an `ACK` frame to `B` to acknowledge the request from `B` for synchronization.
    ```
    A   --ACK (ack = y + 1)-->  B
    ```
    
## SYN Flood
1. You send many `SYN` packets to the victim to seem to be establishing a connection with it. 
2. But you never receive `SYN + ACK` packet back from the victim. The connection is therefore half-opened.
3. The victim (probably a server) will be loaded up with many `SYN` requests, unable to process innocent `SYN` requests because of overload. 

## ACK Flood
> "An ACK flood is designed to disrupt network activity by saturating bandwidth and resources on stateful devices in its path."

1. You will send thousands of fake ACK packets that do not belong to any of the sessions on the server’s list of transmissions.
    ```
    You -- Many random ACK's --> victim
    ```
2. The victim will send `RST`(reset) packet because it never saw corresponding sequence of three-way handshake.
     ```
    You <-- RST -- victim
    ```
3. "Generally what is seen is a high rate of ACK packets (not preceded by a TCP handshake) and a slightly lesser rate of RST packets coming from the targeted server."
4. As a result, system resources are depleted to evaluate incoming packets and consequently reduce performance or cause a complete crash.

### On wireshark
```
tcp.flags.ack == 1 
```
to see ack packets.
