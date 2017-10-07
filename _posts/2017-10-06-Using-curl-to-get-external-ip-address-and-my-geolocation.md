---
layout: post
title: "Using curl to get external ip address and my geolocation"
date: 2017-10-06 09:00:00 -0100
categories: general linux
---
## [Getting an external ip address](https://askubuntu.com/questions/95910/command-for-determining-my-public-ip)
```
curl ifconfig.me [or icanhazip.com or ipecho.net or ipinfo.io/ip]
```

## [Getting my geolocation](http://xmodulo.com/geographic-location-ip-address-command-line.html)
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
