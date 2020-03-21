---
title: "Editing environment path and adding custom scripts"
date: "2017-09-23T09:00:00.009Z"
category: "linux"
---
## How to (copied from [linuxconfig](https://linuxconfig.org/linux-path-environment-variable))
```
$ echo $PATH
/home/lilo/bin:/usr/local/bin:/usr/bin:/bin:/usr/games
$ PATH=$PATH:/bin/myscripts
$ export PATH
$ echo $PATH
/home/lilo/bin:/usr/local/bin:/usr/bin:/bin:/usr/games:/bin/myscripts
```

## Checking environment variables
type 
```
env
```
and it will show you everything.

## Where are they stored (copied from [unix.stackexchange.com](https://unix.stackexchange.com/questions/813/how-to-determine-where-an-environment-variable-came-from))
System wide
* /etc/environment: specifically meant for environment variables
* /etc/env.d/*: environment variables, split in multiple files
* /etc/profile: all types of initialization scripts
* /etc/profile.d/*: initialization scripts
* /etc/bashrc: meant for functions and aliases

User specific
* ~/.bash_profile: initialization for all interactive (bash-)shells
* ~/.bashrc: initialization for login (bash-)shells
* ~/.profile: used for all shells
* ~/.cshrc, ~/.tcshrc, ~/.zshrc, ~/.tcshrc: similar for non-bash shells

So, if you were to add a path to `.profile`, add:
```
export PATH=$PATH:/what/ever/path
```

You will need to `source ~/.profile` or restart the terminal to take effect (for whatever reason, restarting the terminal did not work for me). 
For more, look at [the ubuntu official documentation.](https://help.ubuntu.com/community/EnvironmentVariables#Persistent_environment_variables)

## Is there a standard place for putting custom scripts?
People say it's normal to place the scripts in `/opt` or `/opt/bin` directory. 
But the answer to the below post also says we could use `/usr/local/bin` or `/usr/local/sbin` (for superuser privileges)

## Bonus 1: [Differences between /bin, /sbin, /usr/bin, /usr/sbin, /usr/local/bin, /usr/local/sbin](https://askubuntu.com/questions/308045/differences-between-bin-sbin-usr-bin-usr-sbin-usr-local-bin-usr-local)
* /bin : For binaries usable before the /usr partition is mounted. This is used for trivial binaries used in the very early boot stage or ones that you need to have available in booting single-user mode. Think of binaries like cat, ls, etc.
* /sbin : Same, but for scripts with superuser (root) privileges required.
* /usr/bin : Same as first, but for general system-wide binaries.
* /usr/sbin : Same as above, but for scripts with superuser (root) privileges required.

## Bonus 2:
I wanted to add all subdirectories of `usr/local/bin` as environment path, but [that's not what something people recommended](https://unix.stackexchange.com/questions/17715/how-can-i-set-all-subdirectories-of-a-directory-into-path). People say it's _dangerous_.
