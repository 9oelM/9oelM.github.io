---
title: "Listening, Established, Close_wait and Time_wait in netstat"
date: "2018-05-06T09:00:00.009Z"
category: "network"
---
### Sources
* [superuser](https://superuser.com/questions/173535/what-are-close-wait-and-time-wait-states)
* [askubuntu](https://askubuntu.com/questions/538443/whats-the-difference-between-port-status-listening-time-wait-close-wait)

> Due to the way TCP/IP works, connections can not be closed immediately. Packets may arrive out of order or be retransmitted after the connection has been closed. 

> **CLOSE_WAIT** indicates that the remote endpoint (other side of the connection) has closed the connection. 

> **TIME_WAIT** indicates that local endpoint (this side) has closed the connection. The connection is being kept around so that any delayed packets can be matched to the connection and handled appropriately. The connections will be removed when they time out within four minutes. 

[The man page of `netstat`](http://manpages.ubuntu.com/netstat)
```
   ESTABLISHED
          The socket has an established connection.
   SYN_SENT
          The socket is actively attempting to establish a connection.
   SYN_RECV
          A connection request has been received from the network.
   FIN_WAIT1
          The socket is closed, and the connection is shutting down.
   FIN_WAIT2
          Connection is closed, and the socket is waiting for  a  shutdown
          from the remote end.
   TIME_WAIT
          The socket is waiting after close to handle packets still in the
          network.
   CLOSE  The socket is not being used.
   CLOSE_WAIT
          The remote end has shut down, waiting for the socket to close.
   LAST_ACK
          The remote end has shut down, and the socket is closed.  Waiting
          for acknowledgement.
   LISTEN The  socket is listening for incoming connections.  Such sockets
          are  not  included  in  the  output  unless  you   specify   the
          --listening (-l) or --all (-a) option.
   CLOSING
          Both  sockets are shut down but we still don't have all our data
          sent.
   UNKNOWN
          The state of the socket is unknown.
```
