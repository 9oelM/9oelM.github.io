---
layout: post
title: "Configuring vim"
date: 2017-09-25 09:20 -0100
categories: general linux
---
## This looks like a pretty awesome boilerplate!
Well, I just looked at [this repository](https://github.com/amix/vimrc) and it just looks amazing. 

I cloned the repo to my local computer and installed the configuration.

## Vim configuration information
For your information, the vim configurations are stored in `~/.vimrc` and `~/.vim_runtime` (if you installed the configurations from that repository).

`~/.viminfo` acts as a cache/history for vim. 

## Advanced configurations
### Note 
Use `my_configs.vim` if you are using `amix/vimrc` repo.

### Color scheme
Add to vim configuations file (for me, `my_configs.vim`) these lines:
```
syntax enable
set background=dark
colorscheme solarized
```
and da-da, the color scheme has changed (make sure you have solarized colorscheme installed beforehand)

### Using plugins
The installation shell script from the repository will install most of the plugins, so you just have to use them.

For example, you could use [NERDTree](https://github.com/scrooloose/nerdtree) by typing `ESC + : + NERDTreeToggle`.

Use other plugins in the same way. For example, use [MRU.vim](https://github.com/vim-scripts/mru.vim) to see recently opened files: 
`ESC + : + MRU` will show you recently opened files.

### Tab space
The source file has the size of `2 spaces` for a `tab` but vim is currently configured to use the size of `4 spaces` for a `tab`.

#### 1. How to beautify the file
If you had installed vim configuraton from [this repo](https://github.com/amix/vimrc), I found that you can just use `Autoformat`. 

![Autoformat]({{site.url}}/assets/images/Vim/2vimBeautify.png)

#### 2. How to permanently change the tab size to '2 spaces'
in `.vimrc`, paste the following:
```
set tabstop=2 " The 'size', the with of a tab is set to 2
set shiftwidth=2 " Indents will have width of 2
set softtabstop=2 " The number of columns for a tab is set to 2
```
consult the [stackoverflow question](https://stackoverflow.com/questions/1878974/redefine-tab-as-4-spaces) for more detail.
