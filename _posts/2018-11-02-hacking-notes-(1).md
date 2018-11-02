---
comments: true
layout: post
title: "hacking notes (1)"
date: 2018-11-02 09:00:00 -0100
categories: hacking
---
# Hacking-notes
## Rationale
As a programmer, I thought it'd be nice to know the basics of hacking for security purposes. For now, we will focus on popular hacking methods.

## Reverse engineering
### What
As the name implies, it is the process of extracting knowledge or design information from a program and reproducing anything from the extracted information. Computers programs are executed in low-level languages which humans cannot easily understand. Even if a programmer uses high-level languages like Java, Python, etc, the codes for the program will be assembled in a machine-specific format.

### Why
Hackers seek to find flaws in programs which they can exploit. Others could also use reversing to locate weak points to fortify their defence against potential attacks.

### How
* Use disassemblers to disect binary codes into assembly codes. They are also used to extract strings, functions, libraries. In short, they help change low-level language into higher level languages.
* Use debugers. Debuggers allow hackers to expand the functionality of disassemblers by supporting the CPU registers, hex dumping of programs, view of the stacks. They are also used to set breakpoints and edit assembly codes at runtime. 
* Use hex editors to view and edit binaries.
* Use decompiler. 
* Gain understanding of low(er)-level programming languages like c, php. 

## Trojan horse programming

### What
Trojan horses are malicious computer programs which misleads users of its true intent. Trojans are usually spread from social engineering-for example from a email attachment that seems credible. Sometimes trojans can be remotely controlled by hackers. 

### Why
Trojan horses are usually made to:
* capture screenshots of computer
* record key strokes and send files to hacker
* capture webcam videos/images
* give access to drives and files
* use the computer to further hack other things (called botnets-a network of Trojan horses. Used to control / steal data from other devices.).

### How

* Trojan horses can be written in every programming language. For example, you could write them with C/C++ and Delphi. These are two popular choices, because of:

1. Dependencies issue: malwares want to be run in many PCs as possible. C/C++/ASM do not require any other dependencies to be run. 
2. Small size: the malware needs to be as small as possible.
3. Rootkits: it is a necessary requirement for Trojan horses. It prevents anti-viruses from removing them. 

* A typical algorithm for a Trojan horse could be following (directly copied from https://www.gohacking.com/make-trojan-horse/):

1. Search for the root drive.
2. Navigate to the following location on the root drive.
```
%systemroot%\Windows\System32
```
3. Create the file named “spceshot.dll“.
4. Start dumping the junk data onto the above file and keep increasing its size until the drive is full.
5. Once the drive is full, stop the process.

## Social engineering
### What
Commonly, social engineering involves email or other communication that invokes urgency, fear, or similar emotions in the victim, leading the victim to promptly reveal sensitive information, click a malicious link, or open a malicious file (https://digitalguardian.com/blog/social-engineering-attacks-common-techniques-how-prevent-attack). For example, you may receive a court notice to appear from an email. You click on the link because you are scared. You then get to install malwares.

Social engineering can be divided into several kinds: 
* Phishing: hackers obtain your personal information through links or any other paths.
* Pretexting: hackers create a context where you would feel some trusts, so that you may feel like sharing a bit of information about yourself. For example, you may send an email to a victim, disguising as his/her superior complimenting on him/her. Then you request some information on the email.
* Baiting: hackers promise an item or good that entices victims. For example, music downloads. This is not only limited to an online context-for example you could drop an USB that contains a malware in a parking lot of some company. The moment an employee inserts the USB into the computer, you could steal dozens of information through keylogger.
* Other forms of social engineering are basically alike.

### Why
Here are some reasons why Hackers use social engineering to take advantage:
* Banking/Tax link scam: hackers send you an email with a phony link to your bank, alluring you to enter your bank ID and password. 
* Dropbox link scam: hackers send you a link for something like resetting passwords, etc. Then you launch a Trojan by clikcing on the link.

### How
Undone.

## Symlink attack
### What
Symlink is a special type of file that refers to another file / directory in the form of an absolute or relative path. This affects pathname resolution. 

Symlink pointing to a target that is removed still exists and continues to be there. This is called a broken/dead/dangling symlink. Symlink could only be made in linux environment.

### Why
* Symlink could be altered to point to any other crucial files inside certain directory. For example, you could adjust a symlink to access and edit original databse. Alteration of symlinks could even mean hackers freely navigating through the file system.

### How
Undone

## Back door and remote administration
### What
A backdoor is a malware that gains remote access to resources inside an application, such as databases and file servers, by bypassing normal authentication or encryption in a computer system. 'Leaving the back door open at home' could allow an attacker to access your house without going through the main entrance where securty personnels check every single person entering the house.

### How
Hackers use malware to install backdoors. This gives a remote administrative access to a system. Once an attacker has an access, he/she could do anything about the files. These are some kinds.

## (Distributed) Denial of service (DDos)
### What
A distributed denial-of-service (DDoS) attack is an attack in which multiple compromised computer systems attack a target, such as a server, website or other network resource, and cause a denial of service for users of the targeted resource (http://searchsecurity.techtarget.com/definition/distributed-denial-of-service-attack).

Denial of service is usually done by flooding the targeted machine with excessive requests. 

DDoS attack in particular, can hardly be managed, because multiple sources at different IP addresses are used to flood the target machine. The administrator would have to block all IP addresses that do this, which is nearly impossible. 

General types of DDoS attack would be as follows:
* Traffic attacks: Traffic flooding attacks send a huge volume of TCP, UDP and ICPM packets to the target. Legitimate requests get lost and these attacks may be accompanied by malware exploitation.
* Bandwidth attacks: This DDos attack overloads the target with massive amounts of junk data. This results in a loss of network bandwidth and equipment resources and can lead to a complete denial of service.
* Application attacks: Application-layer data messages can deplete resources in the application layer, leaving the target's system services unavailable.

### How
* Use LOIC/XOIC/HULK (HTTP Unbearable Load King)/DDOSIM – Layer 7 DDoS Simulator/R-U-Dead-Yet/Tor’s Hammer. Programs that make it easy for penetration tests.
* Compromise botnets: botnet is a set of 'zombie' computers. They are infected with malware and respond to the commands of the central computer. Use them to overload the victim server.
* Use some script to continuously request whatever information from the target server, thereby flooding it.

## Cross-site scripting (XSS)
### What
Cross-Site Scripting (XSS) attacks are a type of injection, in which malicious scripts are injected into otherwise benign and trusted web sites. XSS attacks occur when an attacker uses a web application to send malicious code, generally in the form of a browser side script, to a different end user (https://www.owasp.org/index.php/Cross-site_Scripting_(XSS)).

XSS can take advantage o VBScript, ActiveX and Flash, but also Javascript-the most abused. 

### How
You need to find a way to inject malicious javascript codes into the web page that the victims will visit. 

Directly copied from https://www.acunetix.com/websitesecurity/cross-site-scripting/:

The following server-side pseudo-code is used to display the most recent comment on a web page.
```
print "<html>"
print "<h1>Most recent comment</h1>"
print database.latestComment
print "</html>"
```
Then you decide to submit a comment that is:
```
<html>
<h1>Most recent comment</h1>
<script>doSomethingEvil();</script>
</html>
```
When the page loads in the victim’s browser, the attacker’s malicious script will execute, most often without the user realizing or being able to prevent such an attack.

How worst could it be?
* Malicious JavaScript has access to all the same objects the rest of the web page has, including access to cookies. Cookies are often used to store session tokens, if an attacker can obtain a user’s session cookie, they can impersonate that user.
* JavaScript can read and make arbitrary modifications to the browser’s DOM (within the page that JavaScript is running).
* JavaScript can use XMLHttpRequest to send HTTP requests with arbitrary content to arbitrary destinations.
* JavaScript in modern browsers can leverage HTML5 APIs such as accessing a user’s geolocation, webcam, microphone and even the specific files from the user’s file system. While most of these APIs require user opt-in, XSS in conjunction with some clever social engineering can bring an attacker a long way.

## DNS Cache poisoning (AKA DNS Cache spoofing)
### What (directly copied from https://www.howtogeek.com/161808/htg-explains-what-is-dns-cache-poisoning/).
DNS cache poisoning, also known as DNS spoofing, is a type of attack that exploits vulnerabilities in the domain name system (DNS) to divert Internet traffic away from legitimate servers and towards fake ones 

### How (directly copied from https://www.howtogeek.com/161808/htg-explains-what-is-dns-cache-poisoning/).)
How does DNS work? Whenever your computer contacts a domain name like “google.com,” it must first contact its DNS server. The DNS server responds with one or more IP addresses where your computer can reach google.com. Your computer then connects directly to that numerical IP address. DNS converts human-readable addresses like “google.com” to computer-readable IP addresses like “173.194.67.102”

Your Internet service provider runs its own DNS servers, which cache information from other DNS servers. Your home router functions as a DNS server, which caches information from your ISP’s DNS servers. Your computer has a local DNS cache, so it can quickly refer to DNS lookups it’s already performed rather than performing a DNS lookup over and over again.

A DNS cache can become poisoned if it contains an incorrect entry. For example, if an attacker gets control of a DNS server and changes some of the information on it — for example, they could say that google.com actually points to an IP address the attacker owns — that DNS server would tell its users to look for Google.com at the wrong address. The attacker’s address could contain some sort of malicious phishing website.

## Clickjacking attacks
### What
Clickjacking (User Interface redress attack, UI redress attack, UI redressing) is a malicious technique of tricking a Web user into clicking on something different from what the user perceives they are clicking on, thus potentially revealing confidential information or taking control of their computer while clicking on seemingly innocuous web pages (directly copied from https://en.wikipedia.org/wiki/Clickjacking).

One of the most notorious examples of Clickjacking was an attack against the Adobe Flash plugin settings page. By loading this page into an invisible iframe, an attacker could trick a user into altering the security settings of Flash, giving permission for any Flash animation to utilize the computer's microphone and camera.

### How
Just make something invisible and malicious that the user can click on.

## Packet sniffing
### What
Packet sniffing is the act of capturing packets of data flowing across a computer network. You could censor almost all protocols:
* Total traffic
* Web traffic (HTTP, HTTPS)
* Mail traffic (IMAP, POP3, SMTP)
* File transfer traffic (FTP, P2P)
* Infrastructure traffic (DHCP, DNS, ICMP, SNMP)
* Remote control (RDP, SSH, VNC)
* Other UDP and TCP traffic

### How (https://www.lifewire.com/introduction-to-packet-sniffing-2486803)
By placing a packet sniffer on a network in promiscuous mode, a malicious intruder can capture and analyze all of the network traffic. Within a given network, username and password information is generally transmitted in clear text which means that the information would be viewable by analyzing the packets being transmitted.

A packet sniffer can only capture packet information within a given subnet. So, its not possible for a malicious attacker to place a packet sniffer on their home ISP network and capture network traffic from inside your corporate network (although there are ways that exist to more or less "hijack" services running on your internal network to effectively perform packet sniffing from a remote location).

Wireshark is one of the most prevalent software to use.

## Injection attacks (Web-based attacks)
### What
Injection attacks refer to a broad class of attack vectors that allow an attacker to supply untrusted input to a program, which gets processed by an interpreter as part of a command or query which alters the course of execution of that program. 

Do you get it?-actually, XSS is a type of injection attacks.

As for SQL injection, a hacker injects SQL commands that can read or modify data from a database. Advanced variations of this attack can be used to write arbitrary files to the server and even execute OS commands which may lead to full system compromise.

### How
Injection attacking happens because of the flaws in SQL database, SQL libraries, or OS. Users open files that contain hidden commands - called injections. These commands will allow hackers to get unauthorized access to critical data.

SQL injection is a particularly widespread and dangerous form of injection. To exploit a SQL injection flaw, the attacker must find a parameter that the web application passes through to a database. By carefully embedding malicious SQL commands into the content of the parameter, the attacker can trick the web application into forwarding a malicious query to the database (https://www.owasp.org/index.php/Injection_Flaws). 

## Broken authentication and session management attacks
### What
Poorly protected session IDs-for example, a session ID included on the URL-would allow others to get into that session without any authroization. 

### How
Hackers can take over the control of your website if the authentication system of the website is weak. Authentication systems include passwords, key mangement, session IDs and cookies, which are all relevant to hackers doing 'works'.

UPenn[link]:http://www.upenn.edu/computing/security/swat/SWAT_Top_Ten_A3.php]

## Notable recent hacking crisis


## sources
* https://www.helpnetsecurity.com/2016/02/12/know-your-enemy-the-most-popular-hacking-methods/
* https://fossbytes.com/hacking-techniques/
* https://www.slideshare.net/H4C/ss-59722847
* http://armor2net.com/knowledge/hackers_methods.htm
* http://defencely.com/blog/10-popular-ways-hackers-hack-website/
* http://www.informationsecuritybuzz.com/study-research/top-10-hacking-methods/

Reverse engineering
* https://en.wikipedia.org/wiki/Reverse_engineering
* https://www.techopedia.com/definition/3868/reverse-engineering
* http://resources.infosecinstitute.com/hacking-tools-reverse-engineering/#gref

Trojan horse programming
* https://en.wikipedia.org/wiki/Trojan_horse_(computing)
* http://makhaai.blogspot.kr/2008/05/trojan-programming-for-beginners.html
* http://www.mightyshouts.com/trojan-horse/
* http://etutorials.org/Misc/computer+book/Part+2+Dangerous+Threats+on+the+Internet/Chapter+8+Trojan+Horses-+Beware+of+Geeks+Bearing+Gifts/HOW+HACKERS+WRITE+A+TROJAN+HORSE/

Social engineering
* https://en.wikipedia.org/wiki/Social_engineering_(security)
* https://digitalguardian.com/blog/social-engineering-attacks-common-techniques-how-prevent-attack
* https://www.tripwire.com/state-of-security/security-awareness/5-social-engineering-attacks-to-watch-out-for/
* https://null-byte.wonderhowto.com/how-to/hack-like-pro-spear-phish-with-social-engineering-toolkit-set-backtrack-0148571/

Symlink attack
* http://groups.hcon.in/uploads/1/8/1/9/1819392/hga_bhashit_pandya_-_symlink_attack.pdf
* http://endlessgeek.com/2014/03/linux-one-liner-to-detect-symlink-attack/
* https://www.samba.org/samba/news/symlink_attack.html
* https://blog.sucuri.net/2013/05/from-a-site-compromise-to-full-root-access-symlinks-to-root-part-i.html

Backdoor attack
* http://blog.trendmicro.com/backdoor-attacks-work-protect/
* https://www.incapsula.com/web-application-security/backdoor-shell-attack.html
* https://en.wikipedia.org/wiki/Backdoor_(computing)
* https://securingtomorrow.mcafee.com/consumer/identity-protection/backdoor-threat/

DDoS Attack
* https://en.wikipedia.org/wiki/Denial-of-service_attack
* http://searchsecurity.techtarget.com/definition/distributed-denial-of-service-attack
* http://www.webopedia.com/TERM/D/DDoS_attack.html
* https://heimdalsecurity.com/blog/how-to-ddos/

Cross Site Scripting
* https://en.wikipedia.org/wiki/Cross-site_scripting
* https://www.owasp.org/index.php/Cross-site_Scripting_(XSS)
* https://www.acunetix.com/websitesecurity/cross-site-scripting/
* https://www.netsparker.com/blog/web-security/cross-site-scripting-xss/
* https://www.veracode.com/security/xss

DNS Cache poisoning
* https://www.howtogeek.com/161808/htg-explains-what-is-dns-cache-poisoning/
* https://en.wikipedia.org/wiki/DNS_spoofing
* https://www.veracode.com/security/cache-poisoning

Clickjacking attack
* https://en.wikipedia.org/wiki/Clickjacking
* https://www.owasp.org/index.php/Clickjacking
* https://www.owasp.org/index.php/Clickjacking_Defense_Cheat_Sheet

Packet sniffing attack
* https://www.lifewire.com/introduction-to-packet-sniffing-2486803
* https://www.paessler.com/packet_sniffing
* http://www.colasoft.com/resources/packet_sniffing.php
* http://www.dummies.com/programming/networking/cisco/common-network-attack-strategies-packet-sniffing/

Injection attack
* https://en.wikipedia.org/wiki/SQL_injection
* https://www.acunetix.com/blog/articles/injection-attacks/
* http://phpsecurity.readthedocs.io/en/latest/Injection-Attacks.html
* https://www.ibm.com/support/knowledgecenter/en/SSB2MG_4.6.0/com.ibm.ips.doc/concepts/wap_injection_attacks.htm
* https://www.owasp.org/index.php/Injection_Flaws
* https://www.owasp.org/index.php/Code_Injection
* http://searchitchannel.techtarget.com/tip/Common-injection-attacks

Broken authentication and session management attacks
* https://www.owasp.org/index.php/Top_10_2017-A2-Broken_Authentication_and_Session_Management
* http://www.upenn.edu/computing/security/swat/SWAT_Top_Ten_A3.php
* https://www.owasp.org/index.php/Broken_Authentication_and_Session_Management
* https://blog.detectify.com/2016/05/06/owasp-top-10-broken-authentication-and-session-management/

## Network related hacking methods
### DoS Attack
#### [1. Smurf attack](https://en.wikipedia.org/wiki/Smurf_attack)
As we know, broadcast packets are not dropped by individual computers on a network. They require CPUs to work. 

> The Smurf attack is a distributed denial-of-service attack in which large numbers of Internet Control Message Protocol (ICMP) packets with the intended victim's spoofed source IP are broadcast to a computer network using an IP broadcast address. 

> Most devices on a network will, by default, respond to this by sending a reply to the source IP address. If the number of machines on the network that receive and respond to these packets is very large, the victim's computer will be flooded with traffic. This can slow down the victim's computer to the point where it becomes impossible to work on.

However, this method is manageable by network administrators. Thus smurf attack is left obsolete these days. The way admins could prevent this attack is as follows: 

- > Configure individual hosts and routers to not respond to ICMP requests or broadcasts;
- > or Configure routers to not forward packets directed to broadcast addresses. Until 1999, standards required routers to forward such packets by default. Since then, the default standard was changed to not forward such packets.
- > Another proposed solution is network ingress filtering, which rejects the attacking packets on the basis of the forged source address.

#### [2. Ping flood (ICMP Flood)](https://www.incapsula.com/ddos/attack-glossary/ping-icmp-flood.html)

Brief note on ICMP Packets:

> [Internet Control Message Protocol (ICMP) is used to debug network. It is a supporting protocol in the Internet protocol suite.](http://searchnetworking.techtarget.com/definition/ICMP) 

> [It is used by network devices, including routers, to send error messages and operational information indicating, for example, that a requested service is not available or that a host or router could not be reached.](https://en.wikipedia.org/wiki/Internet_Control_Message_Protocol)

Ping requests are usually used to see if two different devices are connected with each other. 

This is done by measuring the round-trip time from when an ICMP echo request is sent to when an ICMP echo reply is received. 

> The attack involves flooding the victim's network with request packets, knowing that the network will respond with an equal number of reply packets. Additional methods for bringing down a target with ICMP requests include the use of custom tools or code, such as hping and scapy.

> This strains both the incoming and outgoing channels of the network, consuming significant bandwidth and resulting in a denial of service.