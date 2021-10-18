---
title: "Configuring and using vim"
date: "2017-09-25T09:00:00.009Z"
tags: ["linux", "vim"]
tab: "post"
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
Download the folder from [this repo](https://github.com/Chiel92/vim-autoformat) and put that into `sources_non_forked` folder if you have installed vim configurations from [the ultimate vim configuration repository](https://github.com/amix/vimrc). Then it's going to automatically work once you restart vim. Type `:Autoformat` to use.

![Autoformat]({{site.url}}/assets/images/Vim/2vimBeautify.png)

#### 2. How to permanently change the tab size to '2 spaces'
in `.vimrc`, paste the following:
```
set tabstop=2 " The 'size', the with of a tab is set to 2
set shiftwidth=2 " Indents will have width of 2
set softtabstop=2 " The number of columns for a tab is set to 2
```
consult the [stackoverflow question](https://stackoverflow.com/questions/1878974/redefine-tab-as-4-spaces) for more detail.

### How to autoclose html tag
1. Download [the plugin from the repo](https://github.com/alvan/vim-closetag).
2. Put that downloaded repo into `~/.vim/` or any designated folder.
3. If you are using pathogen, closetag.vim will start automatically working. For additional configurations, see the repo.

### How to autocomplete braces
1. Download [the plugin](https://github.com/jiangmiao/auto-pairs): 
  ```
  git clone git://github.com/jiangmiao/auto-pairs.git
  ```
2. Put it into the right folder (see how we did previous configs).
3. Then it starts working once you restart vim.


## How to search in vim
Search command
```
ESC + : + / + [search pattern] + enter
```

Next match
```
n + enter
```

Previous match
```
N + enter
```

## How to navigate in vim
Go forward by word
```
w
```
Go back by word
```
b
```
Move one character left
```
h
```
Move one character right
```
l
```
Move one row down
```
j
```
Move one row up
```
k
```


## How to select, copy and paste in vim
Select a line (up/down arrow key to include more/less lines)
```
V
```
Select texts (letter by letter)
```
v   
```
Select blocks 
```
ctrl + v
```

Then
Delete
```
d
```
Copy (called 'yanking')
```
y
```

Then
Paste after cursor
```
p
```
Paste before cursor
```
P
```

Note: there is no default cutting operation that could be done with one command.

## Lines
open a line below the cursor and start insert mode
```
o
```
open a line above the cursor
```
O
```

## How to undo
```
u
```

## Opening new tabs
```
ESC + : + tabnew
```
To open a new tab,
and 
```
ESC + : + saveas [filename]
```
to save the file.
