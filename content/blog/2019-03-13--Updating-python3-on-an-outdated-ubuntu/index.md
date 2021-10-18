---
title: "Updating python 3 on an outdated Ubuntu"
date: "2019-03-13T09:00:00.009Z"
tab: "post"
tags: ["development", "python", "linux"]
---
# The problem
Sometimes you cannot easily change the version of Ubuntu _and_ python if you are running them on cloud. I am using [cloud9](c9.io), as you might have expected, because I'm still in the Navy, without any personal devices. I cannot go home to open up my laptop to do anything better.

The version of Ubuntu and `python` were both too not satisfiable. I had to update the version of `python` on Ubuntu 14.04.5:
```
$ lsb_release -a
No LSB modules are available.
Distributor ID: Ubuntu
Description:    Ubuntu 14.04.5 LTS
Release:        14.04
Codename:       trusty

$ python3 --version
Python 3.4.3
```

The python version was not enough for me to do some works on Jupyter notebook. I needed `python^3.7`. 

and below command did not work at all for me:
```
$ sudo apt-get update

$ sudo apt-get upgrade

$ sudo apt-get install python3.7
Reading package lists... Done
Building dependency tree       
Reading state information... Done
E: Unable to locate package python3.7
E: Couldn't find any package by regex 'python3.7'
```
same for `python3.6`.

So [I searched up](https://docs.python-guide.org/starting/install3/linux/) and I think I found a solution.

# Solution
## use the python distribution from deadsnakes' PPA
```
$ sudo apt-get install software-properties-common
$ sudo add-apt-repository ppa:deadsnakes/ppa
$ sudo apt-get update
$ sudo apt-get install python3.7
```
These lines of commands worked for me!

## PPA
But what's PPA in linux? [Again I searched](https://itsfoss.com/ppa-guide/).
> PPA stands for Personal Package Archive.

Ubuntu controls software and its version too. But a new release of software does not of course get immediately reflected by Ubuntu (for stability, safety, etc). But if you really want to get it, you then get to use **PPA**!

Therefore, PPA's not official, it's personal to the developer. 

> Ubuntu provides [a platform called Launchpad](https://launchpad.net/ubuntu) that enables software developers to create their own repositories.

Yeah. So even _you_ can add a repo to Launchpad.

So this is what you actually did:
```
$ sudo apt-get install software-properties-common # ?
$ sudo add-apt-repository ppa:deadsnakes/ppa # adds the PPA repository to the list.
$ sudo apt-get update
$ sudo apt-get install python3.7 # installs the package
```

## [`software-properties-common`](https://askubuntu.com/questions/1000118/what-is-software-properties-common)

Then what's `software-properties-common`?

> This software provides an abstraction of the used apt repositories. It allows you to easily manage your distribution and independent software vendor software sources.

> Without it, you would need to add and remove repositories (such as **PPAs**) manually by editing /etc/apt/sources.list and/or any subsidiary files in /etc/apt/sources.list.d

Yes. Yeap. In short, it provides an easy and useful mechanism for you to add/remove PPAs. So you need them.

# Switching `python` version
But if I enter `python3 --version`, it would show me:
```
Python 3.4.3
```
So how do I get it pointed to `python3.7` I have just newly installed?

# Get `python3.7` kernel on Jupyter notebook
- ref: [IPython docs](https://ipython.readthedocs.io/en/latest/install/kernel_install.html)

> The Jupyter team maintains the IPython kernel since the Jupyter notebook server depends on the IPython kernel functionality.

So in fact I didn't actually need to upgrade python version on Ubuntu. But anyways, that was a good piece of knowledge.

Then how do I get it on my Jupyter.

```
python3 -m pip install ipykernel
python3 -m ipykernel install --user
```

Ahh. Another error came up!!!!
```
$ sudo python3.7 -m pip install ipykernel                                                                                         
Traceback (most recent call last):
  File "/usr/lib/python3.7/runpy.py", line 183, in _run_module_as_main
    mod_name, mod_spec, code = _get_module_details(mod_name, _Error)
  File "/usr/lib/python3.7/runpy.py", line 142, in _get_module_details
    return _get_module_details(pkg_main_name, error)
  File "/usr/lib/python3.7/runpy.py", line 109, in _get_module_details
    __import__(pkg_name)
  File "/usr/lib/python3/dist-packages/pip/__init__.py", line 59, in <module>
    from pip.log import logger
  File "/usr/lib/python3/dist-packages/pip/log.py", line 9, in <module>
    import colorama, pkg_resources
  File "<frozen importlib._bootstrap>", line 983, in _find_and_load
  File "<frozen importlib._bootstrap>", line 967, in _find_and_load_unlocked
  File "<frozen importlib._bootstrap>", line 668, in _load_unlocked
  File "<frozen importlib._bootstrap>", line 638, in _load_backward_compatible
  File "/usr/share/python-wheels/setuptools-3.3-py2.py3-none-any.whl/pkg_resources.py", line 1479, in <module>
    register_loader_type(importlib_bootstrap.SourceFileLoader, DefaultProvider)
AttributeError: module 'importlib._bootstrap' has no attribute 'SourceFileLoader'
```
Now I'm fully exhausted. Returning next time to solve this problem. At least I got `python3.7` working on Ubuntu. I wish if I could use my laptop to just create an environment with `conda` or `virtualenv` to setup a project with a dedicated python version..... or `docker` or whatever. 



