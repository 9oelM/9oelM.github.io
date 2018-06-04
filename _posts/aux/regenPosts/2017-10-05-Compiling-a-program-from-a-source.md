---
comments: true
layout: post
title: "Compiling a program from a source / installing .deb"
date: 2017-10-05 09:00:00 -0100
categories: linux
---
Information source: [https://askubuntu.com/questions/25961/how-do-i-install-a-tar-gz-or-tar-bz2-file](https://askubuntu.com/questions/25961/how-do-i-install-a-tar-gz-or-tar-bz2-file)
## How you compile a program from a source
1. open a console
2. use the command cd to navigate to the correct folder. If there is a README file with installation instructions, use that instead.
3. extract the files with one of the commands
    * If it's tar.gz use tar xvzf PACKAGENAME.tar.gz
    * if it's a tar.bz2 use tar xvjf PACKAGENAME.tar.bz2
4. ./configure
5. make
6. sudo make install

## Install `.deb` packages
Install 
```
sudo dpkg -i DEB_PACKAGE
```

Uninstall 
```
sudo dpkg -r DEB_PACKAGE
```

Reconfigure/Repair
```
sudo dpkg-reconfigure PACKAGE_NAME
```
