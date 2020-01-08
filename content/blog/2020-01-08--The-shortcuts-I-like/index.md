---
title: "The shortcuts I like"
date: "2020-01-08T09:00:00.009Z"
category: "development"
tags: ["development", "shortcuts", "keybinding", "macOS", "chrome", "visual studio code", "iterm", "slack"]
---

## Before we get started
These are the keys usually used in combination with normal keys on Mac:
- Command (or Cmd) ⌘
- Shift ⇧ (I will write as `shift` to avoid confusion with `↑`)
- Option (or Alt) ⌥
- Control (or Ctrl) ⌃
- Caps Lock ⇪
- Fn

The guide below assumes that you are using [spectacle](https://www.spectacleapp.com/).

Also, I'm not going to cover really basic ones like `⌘ + F`, `⌘ + Q` or `⌘ + ,` (You know what I'm saying).

So.. here are the most useful commands I use on my Mac (to be updated more):

## MacOS general
- Make full screen
  - MacOS default: `⌃ + ⌘ + F` (Puts up another big 'desktop')
  - Spectacle: `⌥ + ⌘ + F` (Just fits the maximum size of the screen. Does not put up another big 'desktop')
- Emulate force touch: `place your mouse on something you want to force touch` + `⌃ + ⌘ + D`
- Emulate swipe to previous/next display:
  - previous: `⌃ + ←`
  - next: `⌃ + →`
- Switch to desktop 1, 2
  - go to keyboard -> shortcuts -> mission control, and turn on options for `Switch to Desktop 1` and `Switch to Desktop 2`.
  - Switch to Desktop 1: `⌃ + 1`
  - Switch to Desktop 2: `⌃ + 2`
  - Open application windows: `⌃ + ↓`
- Capture
  - Entire screen: `⌘ + shift + 3`
  - Partial screen: `⌘ + shift + 4`
  - Partial screen with more guidance (launch screen capture): `⌘ + shift + 5`
- Move focus to the menu bar (this one needs configuration because on macs with touch bar, it'd be harder to use the default option):
  - default: `⌃ + F2`
  - I changed it to: `shift + ⌥ + M` 
  - or: `⌘ + ?` to focus on help first

## Chrome
- Focus cursor on the search bar: `⌘ + L`
- Move to the previous/next tab
  - previous: `shift + ⌘ + [`
  - next: `shift + ⌘ + ]`
  - nth tab: `⌘ + number (1, 2, 3, ... 9)`
- Go back one page: `⌘ + ←`
- Move forward one page: `⌘ + →`
- Reset zoom level to 100%: `⌘ + 0`
- Open most recently closed tab: `⌘ + shift + T`
- Open downloads: `⌘ + shift + J`
- Open bookmarks: `⌥ + ⌘ + B`
- Close current window: `⌘ + W`
- Find saved bookmark by autocompletion: `⌘ + L` + `/` + `what you are trying to search` + `tab`

## Visual Studio Code
- Show all keybindings: `⌘ + K` + `⌘ + S`
- Hide the side bar: `⌘ + B`
- Toggle word wrap: `⌥ + Z`
- Split editor window: `⌘ + \`
- Toggle terminal window: ``⌘ + ` `` or `⌘ + J`
- Resize the terminal window up (focus terminal first): `⌃ + ⌘ + ↑`
- Move to the previous/next tab
  - previous: `shift + ⌘ + [`
  - next: `shift + ⌘ + ]`
  - nth tab: `⌘ + number (1, 2, 3, ... 9)`
- Select currently focused word: 
  - `⌘ + B`
  - and then add some character to the start & the end of the word: [install a plugin](https://marketplace.visualstudio.com/items?itemName=mycelo.embrace) to enable for more types of characters. Depending on characters, some might work by default, like `` ` `` or `[`. Anyways, works like this: select words by `shift + ⌃ or ⌘ + ← or →`, and then `⌘ + D`, then press `[` or `` ` ``. 
- (un)comment a line: `⌘ + /`
- Comment multiple lines: do the same as above, after selecting multiple lines
- Fold: `⌥ + ⌘ + [`
- Unfold: `⌥ + ⌘ + ]`
- Multiple line selection & edit: `⌥ + ⌘ + shift + ↓ or ↑`
- Find all occurrences and replace them all in **all files**:   
  - `select a word`
  - `shift + ⌘ + H` `tab` 
  - `type in new word to change` 
  - `click on bulk action/single file action` 
  - `⌥ + ⌘ + S` (save all files at once)
- Find all occurences and replace them all in **a single file**:
  - `⌘ + F` and then type to search. Matches are already selected.
  - `⌥ + enter` to select all occurences of find match.
  - delete and type as you wish to change
- Find next occurence (after `⌘ + F`): 
  - Move focus to the file
  - `⌘ + G`
- Show file explorer: `⌘ + shift + E`
- Show extensions: `⌘ + shift + X`
- Show source control: `⌃ + shift + G`

## Iterm
- Fullscreen: `⌘ + enter` (only iterm has a difference fullscreen command on Mac)
- Unfortunately, you would need some custom keybindings for iterm written in `json`. For more, see [my gist](https://gist.github.com/9oelM/7a0516f143be2e220fe455a044d3336e)

## Slack
- Keyboard shortcut help: `⌘ + /`
- Search almost everything (quick switcher): `⌘ + K or T`
- Open direct message window: `⌘ + shift + K`
- Open browse channels window: `⌘ + shift + L` 
- Open threads: `⌘ + shift + T`
- Toggle right pane: `⌘ + .` 
- Toggle activity window: `⌘ + shift + M` 
- Forward history: `⌘ + ]`
- Back in history: `⌘ + [`
- Move up/down across channels: `⌥ + ↓ or ↑` 
- Move up/down across unread channels: `⌥ + shift + ↓ or ↑`
- Mark all as read: `shift + esc`
- React to latest message: `⌘ + shift + \` 