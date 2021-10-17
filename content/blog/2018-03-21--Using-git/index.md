---
title: "Using git"
date: "2018-03-21T09:00:00.009Z"
tags: ["git"]
---
### [How to revert](https://blog.github.com/2015-06-08-how-to-undo-almost-anything-with-git/)
```
git revert <SHA>
```
git revert will create a new commit that’s the opposite (or inverse) of the given SHA. If the old commit is “matter”, the new commit is “anti-matter”—anything removed in the old commit will be added in the new commit and anything added in the old commit will be removed in the new commit.

### [How to revert only one file](https://stackoverflow.com/questions/215718/reset-or-revert-a-specific-file-to-a-specific-revision-using-git)
```
git checkout c5f567 -- file1/to/restore file2/to/restore
```

+ when you want to go back to the commit right before the hash
```
git checkout c5f567~1 -- file1/to/restore file2/to/restore
```
just add ~anyNum after the hash.

### [How to discard changes in the working directory](https://stackoverflow.com/questions/52704/how-do-i-discard-unstaged-changes-in-git)
```
git stash save --keep-index (--include-untracked if you want to include untracked files as well) 
```

or 

```
git checkout -- .
```

for specific files to discard, use:

```
git checkout path/to/file/to/revert
```

### [How to add all files except one file/folder](https://stackoverflow.com/questions/4475457/add-all-files-to-a-commit-except-a-single-file)
```
git add -u
git reset -- oneFile.file
git reset -- folder/* (for a folder)
```

### [How to switch back from and forth to a branch](https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging)
Create new branch and let it point to the `master` branch
```
$ git checkout -b iss53
Switched to a new branch "iss53"
```
equivalent:
```
$ git branch iss53
$ git checkout iss53
```

See branches and their last commits 
```
git branch -v
```

Merge to master
```
git checkout master # first point the HEAD to master

git merge anotherBranch
```

Delete branch
```
git -d branchName
```

### How to clear cache on specific file
```
git rm --cached fileName
```

### Add username for every repo on computer
```
git config --global user.name "username"
```

### Add username for single repo on computer
```
just remove global flag from above. 
```

### Enable credential caching (password)
```
git config credential.helper store
```
