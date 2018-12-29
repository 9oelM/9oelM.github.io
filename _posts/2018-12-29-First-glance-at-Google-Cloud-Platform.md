---
comments: true
layout: post
title: "First glance at Google Cloud Platform"
date: 2018-12-29 09:00:00 -0100
categories: development
---
# The problem
So now I had to build an open source project called [`typedoc`](https://github.com/TypeStrong/typedoc), but on cloud only because for now I cannot have an access to my own laptop. Plus I wanted a stronger computing power. 

# Resort
So I knew Google provides its cloud platform with $300.00 free trial credits. And I started to look at GCP from then.

# Steps
1. I had to look at the [quickstart guide](https://cloud.google.com/compute/docs/quickstart-linux)
2. In the selections page, I could choose the number of CPUs and size of RAM. I went for 4 CPUs and 6 GB of RAM, and that made about $80/m.
3. I launched SSH terminal, and it worked smoothly.

# After that
Because it was an empty cloud just initialized with Debian 9, I had to install and configure a few things. Perhaps you could use this as a shell script:

`install.sh`
```
sudo apt-get update

sudo apt-get upgrade

# Install git
sudo apt-get install git

# Check git
git --version

# Install nvm (Latest 0.33.11, for more: https://github.com/creationix/nvm)
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | 

source ~/.bashrc

# Check nvm
echo -n "nvm version: "
nvm --version

# Current LTS is 10.15.0. Install it. 
nvm install 10.15.0

# Check node
echo -n "node version: "
node --version
```

And that's about it!

