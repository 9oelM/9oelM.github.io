---
title: "Basic system status checkups for windows"
date: "2018-05-06T09:00:00.009Z"
category: "hacking"
---
### Helpful link
* [asecurity](https://asecurity.so/2015/03/%ED%8F%AC%EB%9E%9C%EC%8B%9D-%EC%A6%9D%EA%B1%B0-%ED%99%95%EB%B3%B4%EB%B6%84%EC%84%9D%EC%9D%84-%EC%9C%84%ED%95%9C-%EB%8D%B0%EC%9D%B4%ED%84%B0-%EC%88%98%EC%A7%91-%EB%8F%84%EA%B5%AC/)

### Windows (.bat)
First, download and add to path:
* [handle](https://docs.microsoft.com/en-us/sysinternals/downloads/handle)
* [pstools](https://docs.microsoft.com/en-us/sysinternals/downloads/psinfo)
* [autoruns](https://docs.microsoft.com/en-us/sysinternals/downloads/autoruns)
* [listdlls](https://docs.microsoft.com/en-us/sysinternals/downloads/listdlls)
* uptime
* [ntlast](https://www.mcafee.com/kr/downloads/free-tools/ntlast.aspx)

And run this batch file and save it somewhere (`start analyse.bat` or `analyse.bat`)
```
echo off
@echo ===== date /T ====
date /T

@echo ===== time /T ====
time /T

@echo ===== uptime (net stats srv) ====
net stats srv

@echo ===== psinfo -h -s (system info) ====
psinfo -h -s

@echo ===== pslist -t (process list) ====
pslist -t

@echo ===== psservice (service list) ====
psservice

@echo ===== listdlls (dlls) ====
listdlls 

@echo ===== handle ====
handle 

@echo ===== netstat -an ====
netstat -an

@echo ===== promiscdetect ====
promiscdetect

@echo ===== net user ====
net user

@echo ===== net localgroup ====
net localgroup

@echo ===== net share ====
net share

@echo ===== net session ====
net session

@echo ==== net localgroup administrators ====
net localgroup administrators

@echo ==== nbtstat -c ====
nbtstat -c

@echo ==== ntlast -f -s (fail and success)====
ntlast -f -s

@echo ==== fport /i ====
fport /i
```
### Check internet temp files
* Temporary Internet Objects `%SystemRoot%Downloaded Program Files`
* Temporary Internet Files `%USERPROFILE%Local Settings\Temporary Internet Files`
* Opened pages `%USERPROFILE%Local Settings\History`
* Temporary cookie files `%USERPROFILE%Local Settings\COOKIES`
