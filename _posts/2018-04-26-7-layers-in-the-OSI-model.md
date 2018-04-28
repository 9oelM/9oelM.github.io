---
layout: post
title: "7 layers in the OSI model"
date: 2018-04-26 09:00:00 -0100
categories: network
---

## Sources
* [Microsoft](https://support.microsoft.com/en-ca/help/103884/the-osi-model-s-seven-layers-defined-and-functions-explained)
* [Webopedia](https://www.webopedia.com/quick_ref/OSI_Layers.asp)

## the OSI model
Open system interconnection model. Developed by the International Standards Organization.

## The seven layers
### Upper layers
* Layer 7 - Application
* Layer 6 - Presentation
* Layer 5 - Session

--------------------

### Lower layers
* Layer 4 - Transport
* Layer 3 - Network
* Layer 2 - Data Link
* Layer 1 - Physical

### Explained 
Information is passed starting from the top layer: the application layer, like the picture below from [Webopedia](https://www.webopedia.com/quick_ref/OSI_Layers.asp).

![OSI](https://www.webopedia.com/quick_ref/OSI_Layers.asp)

### 7. Application layer
> The application layer serves as the window for users and application processes to access network services. This layer contains a variety of commonly needed functions.

This layer is only for the application. This layer (the layer itself is hardly the application itself) serves for applications like web browsers, email, etc. 

More examples: 
* NFS
* SNMP
* Telnet
* HTTP
* FTP

Here's a list of the services that this layer contains, from microsoft:
* Resource sharing and device redirection
* Remote file access
* Remote printer access
* Inter-process communication
* Network management
* Directory services
* Electronic messaging (such as mail)
* Network virtual terminals

### 6. Presentation layer
> The presentation layer **formats** the data to be presented to the application layer. It can be viewed as the **translator** for the network (or vice versa). This layer may translate data from a format used by the application layer into a common format at the sending station, then translate the common format to a format known to the application layer at the receiving station.
> It handles **syntax processing of message data** such as format conversions and encryption / decryption needed to support the Application layer above it.

Examples of this layer:
* encryption
* ASCII
* EBCDIC
* TIFF
* GIF
* PICT
* JPEG
* MPEG
* MIDI

Here's a list of the services that this layer contains, from microsoft:
* Character code translation: for example, ASCII to EBCDIC.
* Data conversion: bit order, CR-CR/LF, integer-floating point, and so on.
* Data compression: reduces the number of bits that need to be transmitted on the network.
* Data encryption: encrypt data for security purposes. For example, password encryption.

### 5. Session layer
> This layer **establishes, manages and terminates connections between applications.** The session layer sets up, coordinates, and terminates conversations, exchanges, and dialogues between the applications at each end.

Examples of this layer:
* NFS
* NetBios names
* RPC
* SQL

Here's a list of the services that this layer contains, from microsoft:
* **Session establishment, maintenance and termination:** allows two application processes on different machines to establish, use and terminate a connection, called a session.
* **Session support:** performs the functions that allow these processes to communicate over the network, performing security, name recognition, logging, and so on.

### 4. Transport layer
> The transport layer ensures that messages are delivered error-free, in sequence, and with no losses or duplications.
