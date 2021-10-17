---
title: "Misc useful operations on (kali) linux"
date: "2017-10-05T09:00:00.009Z"
tags: ["kali"]
---

## How to capture screen
The entire screen
```
Prt Sc 
```
Partial screen
```
shift + Prt sc
```

## [How to make a symlink](https://stackoverflow.com/questions/1951742/how-to-symlink-a-file-in-linux)
Create a symlink
```
ln -s /path/to/file /path/to/symlink
```
Create/update a symlink
```
ln -sf /path/to/file /path/to/symlink
```

## Using curl to get external ip address and my geolocation
### [Getting an external ip address](https://askubuntu.com/questions/95910/command-for-determining-my-public-ip)
```
curl ifconfig.me [or icanhazip.com or ipecho.net or ipinfo.io/ip]
```

### [Getting my geolocation](http://xmodulo.com/geographic-location-ip-address-command-line.html)
It will provide you with the data in JSON format.
```
$ curl ipinfo.io/[your ip]
{
  "ip": ...
  "hostname": ...
  "city": ...
  "region": ...
  "country": ...
  "loc": "coordinateX", "coordinatey",
  "org": "organization name"
  "postal": ...
}
```
alternatively:
```
$ curl freegeoip.net/xml/[your ip]
...
data shown in xml format
...
```
