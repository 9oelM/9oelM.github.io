---
layout: post
title: "Desperate hacking notes for tomorrow"
date: 2018-05-29 09:00:00 -0100
categories: hacking
---
[detecting security incidents event logs by SANS](https://www.sans.org/reading-room/whitepapers/logging/detecting-security-incidents-windows-workstation-event-logs-34262)

## Regular Expressions

".*APPCRASH.*" Application 1001
".*he protected system file.*" Application 64004
".*EMET_DLL Module logged the following event:.*" Application 2
.*your virus/spyware.* Application Varies
".*A new process has been created\..*" Security 4688
".*A service was installed in the system\..*" Security 4697
".*A scheduled task was created\..*" Security 4698
".*Logon Type:[\W]*(3|10).*" Security 4624, 4625
".*\\Software\\Microsoft\\Windows\\CurrentVersion\\Run.*" Security 4657
".*service terminated unexpectedly\..*" System 7034
".*service was successfully sent a.*" System 7035
".*service entered the.*" System 7036
".*service was changed from.*" System 7040

• Create and install a new service. (EventID 601|4697 )
• Create a new scheduled task. (EventID 602|4698 )
• Modify the registry keys so the service is started at boot. (EventID 567|4657 ) 

• The <protection mechanism service > terminated unexpectedly.* (EventID 7034)
• The <protection mechanism service > was successfully sent a .* (EventID 7035)
• The <protection mechanism service > entered the stopped state.* (EventID 7036)
• The <protection mechanism service >service was change from.* (EventID 7040)

## Keys to Check

• HKLM\Software\Microsoft\Windows\CurrentVersion\Run
• HKLM\Software\Microsoft\Windows\CurrentVersion\Runonce
• HKLM\Software\Microsoft\Windows\CurrentVersion\RunonceEx
• HKCU\Software\Microsoft\Windows\CurrentVersion\Run
• HKCU\Software\Microsoft\Windows\CurrentVersion\Runonce
• HKCU\Software\Microsoft\Windows\CurrentVersion\RunonceEx

## Domain controller

[Monitoring Active Directory for signs of compromise](https://docs.microsoft.com/en-us/windows-server/identity/ad-ds/plan/security-best-practices/monitoring-active-directory-for-signs-of-compromise)

Check current audit settings (off, on, ...)
```
auditpol /get /category:\*
```

## Maltego
Try to use maltego on kali?

## Nmap
* [nmap website](https://nmap.org/book/vscan.html)
* [nmap kind instruction](https://www.packtpub.com/mapt/book/networking_and_servers/9781784392918/2/ch02lvl1sec18/scanning-and-identifying-services-with-nmap)
* [nmap tcp SYN connection](https://medium.com/@avirj/nmap-tcp-syn-scan-50106f818bf1)
* [nmap tcp port scanning techniques](https://nmap.org/book/man-port-scanning-techniques.html)

Maybe use `nmap` again?

Scan to detect service and version on all ports
```
nmap -sV --allports [ip]
```

Version detection
```
nmap -sV -T4 -F insecure.org

Starting Nmap ( http://nmap.org )
Nmap scan report for insecure.org (74.207.254.18)
Host is up (0.016s latency).
rDNS record for 74.207.254.18: web.insecure.org
Not shown: 95 filtered ports
PORT    STATE  SERVICE  VERSION
22/tcp  open   ssh      OpenSSH 4.3 (protocol 2.0)
25/tcp  open   smtp     Postfix smtpd
80/tcp  open   http     Apache httpd 2.2.3 ((CentOS))
113/tcp closed auth
443/tcp open   ssl/http Apache httpd 2.2.3 ((CentOS))
Service Info: Host:  web.insecure.org

Nmap done: 1 IP address (1 host up) scanned in 14.82 seconds
```

tcp SYN scan
```
nmap -sS -p[port1, port2, port3..] ipaddress
```

tcp connect scan
```
nmap -sT -p[port1, port2, port3..] ipaddress
```

udp scan
```
nmap -sU ipaddress
```

Complex version detection
```
# nmap -A -T4 localhost 

Starting Nmap ( http://nmap.org )
Nmap scan report for felix (127.0.0.1)
(The 1640 ports scanned but not shown below are in state: closed)
PORT     STATE SERVICE    VERSION
21/tcp   open  ftp        WU-FTPD wu-2.6.1-20
22/tcp   open  ssh        OpenSSH 3.1p1 (protocol 1.99)
53/tcp   open  domain     ISC BIND 9.2.1
79/tcp   open  finger     Linux fingerd
111/tcp  open  rpcbind    2 (rpc #100000)
443/tcp  open  ssl/http   Apache httpd 2.0.39 ((Unix) mod_perl/1.99_04-dev)
515/tcp  open  printer
631/tcp  open  ipp        CUPS 1.1
953/tcp  open  rndc?
5000/tcp open  ssl/ftp    WU-FTPD wu-2.6.1-20
5001/tcp open  ssl/ssh    OpenSSH 3.1p1 (protocol 1.99)
5002/tcp open  ssl/domain ISC BIND 9.2.1
5003/tcp open  ssl/finger Linux fingerd
6000/tcp open  X11        (access denied)
8000/tcp open  http-proxy Junkbuster webproxy
8080/tcp open  http       Apache httpd 2.0.39 ((Unix) mod_perl/1.99_04-dev)
8081/tcp open  http       Apache httpd 2.0.39 ((Unix) mod_perl/1.99_04-dev)
Device type: general purpose
Running: Linux 2.4.X|2.5.X
OS details: Linux Kernel 2.4.0 - 2.5.20

Nmap finished: 1 IP address (1 host up) scanned in 42.494 seconds
```

save to a file 
```
nmap -oN outputfile.txt 192.168.1.1 (Save default output to file)
```

## netstat
```
netstat –antp

-a all
-n show ip instead of host names
-t show only tcp connections
-p show process id/name
```

## General guide to finding rootkit, malware and backdoor 
* [askubuntu](https://askubuntu.com/questions/325929/malware-and-backdoor-detection-shell-script)
* [stackexchange](https://security.stackexchange.com/questions/126399/finding-a-backdoor-on-a-server)


## Don't forget the basics: just simple network commands
```
route print
arp -a
nslookup
ipconfig /displaydns
```

## iptables
* [iptables guide](https://www.digitalocean.com/community/tutorials/iptables-essentials-common-firewall-rules-and-commands)
* [howtogeekguide](https://www.howtogeek.com/177621/the-beginners-guide-to-iptables-the-linux-firewall/)

### Understanding the concept
There are 3 types of chains (directly copied from howtogeek):

* **Input** – This chain is used to control the behavior for incoming connections. For example, if a user attempts to SSH into your PC/server, iptables will attempt to match the IP address and port to a rule in the input chain.
* **Forward** – This chain is used for incoming connections that aren’t actually being delivered locally. **Think of a router** – data is always being sent to it but rarely actually destined for the router itself; the data is just forwarded to its target. Unless you’re doing some kind of routing, NATing, or something else on your system that requires forwarding, you won’t even use this chain.
* **Output** - This chain is used for outgoing connections. For example, if you try to ping howtogeek.com, iptables will check its output chain to see what the rules are regarding ping and howtogeek.com before making a decision to allow or deny the connection attempt.

#### Check if your computer is forwarding something 
```
iptables -L -v
```
![result](https://www.howtogeek.com/wp-content/uploads/2013/12/x2-packets-processed.jpg.pagespeed.gp+jp+jw+pj+ws+js+rj+rp+rw+ri+cp+md.ic.lkpdv2BXzd.jpg)

If `Chain forward` shows nothing, you are good to go to close `forward` chain down. 

#### Syntax to block an IP address
```
iptables -A INPUT -s IP-ADDRESS -j DROP
```

#### Syntax to block by port
```
iptables -A INPUT -j DROP -p tcp --destination-port [port number] -i [if any interface related]
```

### What to do (priority from top to bottom)
```
It is advisable to use iptables in Linux to enforce firewall policies. 
Since the range is a private network, it does need to have firewall policies that would block all connections in and out from unrecognized hosts. Moreover, HBSS and McAfee (or any other antivirus) not installed and network IDS down. This is a perfect reason to set up iptables policy locally on linux computers (rha and rhb). Commenting is done after "#" for convenience. 

This is how:

# Accept INPUT packets from and OUTPUT packets to devices inside the subnet only
iptables -A INPUT -s 10.98.10.0/24 -j ACCEPT
iptables -A OUTPUT -s 10.98.10.0/24 -j ACCEPT

# Only accept the necessary ports that are being used for the server
# For example, to allow http by any chance:
iptables -A OUTPUT -j ACCEPT -p tcp --destination-port 80

... there would be other specific rules on the allowed ports, in accordance with the services being run on the computer. For now, we just get the idea of allowing ports on specific services. ...

# Drop all packets on all ports processed by OUTPUT. This would protect the machine from being compromised to keep persistence.

iptables -A OUTPUT -p udp --match multiport --dports 0:65535 -j DROP
iptables -A OUTPUT -p tcp --match multiport --dports 0:65535 -j DROP

# Drop all packets processed by INPUT, FORWARD, OUTPUT by default.
# This would include, for example, blocking an icmp packet from an unknown host from any hosts outside of the subnet.
iptables -P INPUT DROP
iptables -P FORWARD DROP
iptables -P OUTPUT DROP

# After that, save configurations
sudo service iptables save
```

## C$, print$, Admin$, IPC$

## Using metaexploit to audit 

### Search
```
msf > help search
Usage: search [keywords]

Keywords:
  app       :  Modules that are client or server attacks
  author    :  Modules written by this author
  bid       :  Modules with a matching Bugtraq ID
  cve       :  Modules with a matching CVE ID
  edb       :  Modules with a matching Exploit-DB ID
  name      :  Modules with a matching descriptive name
  platform  :  Modules affecting this platform
  ref       :  Modules with a matching ref
  type      :  Modules of a specific type (exploit, auxiliary, or post)

Examples:

search cve:2009 type:exploit app:client

search name:[name of exploit, e.g smb/rpc/http] type:[exploit/payload/auxillary] platform:[windows/linux etc.]

and I believe search port: is also available?
```

## Syslog format

## Others
also look at
```
/var/log/secure
```

and check user permissions using
```
"AccessChk" and "AccessEnum"
```

helpful links for windows domain controller security
* [Monitoring Active Directory for Signs of Compromise](https://docs.microsoft.com/en-us/windows-server/identity/ad-ds/plan/security-best-practices/monitoring-active-directory-for-signs-of-compromise)


