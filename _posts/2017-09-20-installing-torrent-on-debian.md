---
layout: default
---
# Installing torrent on debian based linux
## Guidance
First, download utorrent server from the [utorrent website](http://www.utorrent.com/downloads/linux).

Then, follow this guide in detail:
https://askubuntu.com/questions/104094/how-to-install-utorrent-step-by-step

## Personal problem
For myself personally, I was stuck at:
```
sudo apt-get install libssl0.9.8:i386
```

The debug message firstly showed this:
```
# apt-get install libssl0.9.8:i386
Reading package lists... Done
Building dependency tree       
Reading state information... Done
Package libssl0.9.8 is not available, but is referred to by another package.
This may mean that the package is missing, has been obsoleted, or
is only available from another source

E: Package 'libssl0.9.8' has no installation candidate
```

## Solution
First, just make sure that the machine is up to date:
```
apt-get upgrade
```
```
apt-get update
```

I ran a short google search and found that [people suggested the 'normal' way of installing libssl:](https://askubuntu.com/questions/339364/libssl-so-10-cannot-open-shared-object-file-no-such-file-or-directory)
```
sudo apt-get update
sudo apt-get install libssl1.0.0 libssl-dev
```

But sadly this did not work for me. I do not know why, but the bash shell still complains with this verbose output:
```
# apt-get install libssl1.0.0 libssl-dev
Reading package lists... Done
Building dependency tree       
Reading state information... Done
Package libssl1.0.0 is not available, but is referred to by another package.
This may mean that the package is missing, has been obsoleted, or
is only available from another source

E: Package 'libssl1.0.0' has no installation candidate
```

So I just went to the [Debian website](https://packages.debian.org/jessie/i386/libssl1.0.0/download) to download and install the package.

After the download, just run:
```
# dpkg -i '/root/Desktop/libssl1.0.0_1.0.1t-1+deb8u6_i386.deb' 
Selecting previously unselected package libssl1.0.0:i386.
(Reading database ... 313387 files and directories currently installed.)
Preparing to unpack .../libssl1.0.0_1.0.1t-1+deb8u6_i386.deb ...
Unpacking libssl1.0.0:i386 (1.0.1t-1+deb8u6) ...
Setting up libssl1.0.0:i386 (1.0.1t-1+deb8u6) ...
```

## Finally, uTorrent works!
Now, just run: 
```
utserver -settingspath /opt/[your uTorrent server folder name]/
```
and then
```
http://localhost:8080/gui/web/index.html
```
on the browser, and it will ask you for a username and password. Type `admin` for the username and leave a blank for the password.

Then there you go - there is your uTorrent web client.
