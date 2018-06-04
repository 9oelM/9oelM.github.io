---
comments: true
layout: post
title: "Windows cmd commands"
date: 2018-03-21 09:10:00 -0100
categories: windows
---
### Equivalents on Windows
**`cat`**
```
type 
```

**`ls`**
```
dir /s (recursively show lower directories and files) /ah (show hidden files) /on(alphabetically sorted) /od (sorted by date) ...
```

**`vim`**

Just download vim. If cannot... just use `edit` (only avialable on Windows 32bit)

**`mv (rename)`**
```
ren
```

**`diff`**
```
fc 
```

**`ps` (or `top` (or `htop`))**
```
tasklist
```

**`pkill`**
```
taskkill
```

**`who am i`**
```
echo %USERDOMAIN%\%USERNAME% or whoami
```

## Network related
**[`netstat`](https://docs.microsoft.com/en-us/previous-versions/windows/it-pro/windows-xp/bb490947(v=technet.10))**
```           
netstat [-a] [-e] [-n] [-o] [-p Protocol] [-r] [-s] [Interval]
```

**[`pathping`](https://technet.microsoft.com/en-us/library/cc958876.aspx)**
> The PathPing tool is a route tracing tool that combines features of Ping and Tracert with additional information that neither of those tools provides. 
```
pathping
```

## For more
* https://www.lemoda.net/windows/windows2unix/windows2unix.html