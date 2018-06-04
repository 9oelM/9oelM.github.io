---
comments: true
layout: post
title: "Using foresic tools (1): process explorer, process monitor, and autoruns"
date: 2018-05-19 09:00:00 -0100
categories: hacking
---
## Sources
* [CSO](https://www.csoonline.com/article/2883958/malware/malware-detection-in-9-easy-steps.html)
* [microsoft](https://msdn.microsoft.com/en-us/library/windows/desktop/ms724875(v=vs.85).aspx)
* [gist](https://gist.github.com/mgeeky/f0d13172d557e5860c0301dbf847de60)
* [Corrie Erk](https://corrieerk.com/2017/01/filtering-with-process-monitor/)

## Process explorer 

### Submit to [VirusTotal](https://www.virustotal.com/en/) to check hash
Process Explorer -> Options -> VirusTotal.com -> Check VirusTotal.com

![1](https://postfiles.pstatic.net/MjAxODA1MTlfMTc3/MDAxNTI2NjkzMTE0NDg1.c873q9HfZCtwfbPdxZtrR8aQY6E1VIrRt2CY0idq1Agg.M7dqQU-__syralfnwddSJINM1VzJsGopcYMHd8Xm9ccg.PNG.joelmun/%EC%BA%A1%EC%B2%982.PNG?type=w773)

Executables with high ratio mean higher chance of malicious behaviour.
The ratio is the number of virus engines that recognized the executable as a malicious software divided by total number of virus engines. 
If the ratio is `1/67`, it is probably a false positive, but if it's more than that, it's worth doubting. 

![2](https://postfiles.pstatic.net/MjAxODA1MTlfMzYg/MDAxNTI2NjkyNjAzNTk2.nNB0G74x8fEXioLMxxTb4ACbPA1y-oAf5kEWX5kyomMg.tXYPoNYfBHnRIRU4XZlQMRk8V0h_HH7fSytnba0iv8gg.PNG.joelmun/%EC%BA%A1%EC%B2%98.PNG?type=w773)

If you want to delete the program, stop the program on boot using Autoruns and then delete it.

### Verify image signatures

Process Explorer -> Options -> Verify image signatures

## Process monitor

### Registry operations

`RegQueryKey`
> Retrieves information about the specified registry key.

`RegSetInfoKey`
> Closes the specified registry key.

`RegCloseKey`
> Closes the specified registry key.

`RegOpenKey`
> Opens the specified registry key.

`RegCreateKey`
> **Creates** the specified registry key. If the key already exists in the registry, the function opens it.

`RegEnumKey`
> **Enumerates the subkeys** of the specified open registry key. The function retrieves the name of one subkey each time it is called.

### Full list of proc mon operations
CloseFile
CreateFile
CreateFileMapping
DeviceIoControl
FileSystemControl
FlushBuffersFile
Load Image
LockFile
NotifyChangeDirectory
Process Create
Process Exit
Process Profiling
Process Start
QueryAllInformationFile
QueryAttributeInformationVolume
QueryAttributeTagFile
QueryBasicInformationFile
QueryDeviceRelations
QueryDirectory
QueryEAFile
QueryFileInternalInformationFile
QueryFullSizeInformationVolume
QueryInformationVolume
QueryNameInformationFile
QueryNetworkOpenInformationFile
QueryNormalizedNameInformationFile
QueryObjectIdInformationVolume
QueryOpen
QueryPositionInformationFile
QueryRemoteProtocolInformation
QuerySecurityFile
QuerySizeInformationVolume
QueryStandardInformationFile
QueryStreamInformationFile
ReadFile

@@@@@@@@@@@@
RegCloseKey
RegCreateKey
RegDeleteKey
RegDeleteValue
RegEnumKey
RegEnumValue
RegLoadKey
RegOpenKey
RegQueryKey
RegQueryKeySecurity
RegQueryMultipleValueKey
RegQueryValue
RegSetInfoKey
RegSetKeySecurity
RegSetValue
@@@@@@@@@@@

SetAllocationInformationFile
SetBasicInformationFile
SetDispositionInformationFile
SetEndOfFileInformationFile
SetPositionInformationFile
SetRenameInformationFile
SetSecurityFile
TCP Accept
TCP Connect
TCP Disconnect
TCP Receive
TCP Reconnect
TCP Retransmit
TCP Send
TCP TCPCopy
Thread Create
Thread Exit
UDP Receive
UDP Send
UnlockFileSingle
WriteFile

### Use filter to narrow down to the thing
Process monitor -> Filter -> Filter -> Include / Exclude 

![filter](https://postfiles.pstatic.net/MjAxODA1MTlfMjg2/MDAxNTI2NzI4NzkzNTIx.Q2FHWZYCpjZPKzV7nHx_yF39TevJi4NnoXBiVju2l5Qg.ghJJnjehXfDuY2sRMv1CH9ghdUiOIBgLtomxvOCgeKYg.PNG.joelmun/%EC%BA%A1%EC%B2%98.PNG?type=w773)

Operations to watch over
```
WriteFile
CreateFile
Process Create
Process Start
RegCreateKey
RegDeleteKey
RegSetInfoKey
TCP Connect
TCP Receive
Load Image
Access Denied
```

Filter by `Path contains suspiciousExecutable`.

Filter by `Path contains "\Run"`

### Use process tree to find out any children processes exist
Process monitor -> Tools -> Process tree

### Use `Jump to` to see the registry change directly on regedit.
![2](https://postfiles.pstatic.net/MjAxODA1MTlfOTMg/MDAxNTI2NzI5NjY4MjAz.wmyLIK-WYkVUG334EArw8GAEIm2mPXOWJHIinsFCOvcg.siHAJitHWe0L2spS2x25qsss98ZFc6gD2m9LDJ7bTmQg.PNG.joelmun/2.PNG?type=w773)
![3](https://postfiles.pstatic.net/MjAxODA1MTlfMjEg/MDAxNTI2NzI5NjcxMjMx.UbwOSXl1AZbF-Ff9ygfxksgu3-vT6-S1bcJU4rKa0AYg.0wTBKtNlgRZlsRrKRgTlo2wgSp7B_JGJImZAIb6pa-sg.PNG.joelmun/3.PNG?type=w773)

### Additional tips
* Stop capturing at first and set the filter first
* See Tools -> ~ Summary (ex. Registry summary) to see which path has been made changes the most or do other useful operations.
* Use the "target button" to directly select on the screen which process to monitor.

## Autoruns

### Scanning on VirusTotal and Verifying image signatures
Autoruns share the same function with process explorer. It can submit the hash to virusTotal and verify signatures as well:

```
Options -> Scan options -> Verify image signatures
Options -> Scan options -> Check VirusTotal.com
```

### Jump to Image
```
Select application
Entry -> Jump to Image
```
Opens the directory where the selected application is at.

### Jump to registry
```
Select application
Entry -> Jump to Entry
```

### The suspicious look suspicious.

Suspicious files often do not have or have weird descriptions, and do strange registry operations. 