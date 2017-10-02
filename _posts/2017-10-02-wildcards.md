---
layout: post
title: "wildcards and brace expansion"
date: 2017-10-02 09:00:00 -0100
categories: general linux
---
## Wildcards (I believe we are used to * and +, right?)

| Wildcard | Matches | Example |
| :--------: | :-------: | :------:  |
| `?` | Any single char | `program.?` matches program.c and program.o but not program.log. |
| `[set]` | Any character in a set | `[Aa]pple` matches apple and Apple |
| `[!set]` | Any character not in a set | `[!abc]` means anything but a,b, or c |

## Extension

| Wildcard | Matches |
| :-----: | :-----: |
| `[a-z]` | All lowercase letters |
| `[a-zA-Z]` | All lowercase and uppercase letters |
| `[!0-9]` | All non-digits |

## Brace expansion
* `echo b{ed,olt,ar}s`, you'll see the words beds, bolts, and bars printed.
* `b{ar{d,n,k},ed}s` will result in the expansion bards, barns, barks, and beds.
* `echo {2..5}` expands to 2 3 4 5.
* `echo {d..h}` results in the expansion d e f g h
* **Some practical use**: `ls *.{c,h,o}`

