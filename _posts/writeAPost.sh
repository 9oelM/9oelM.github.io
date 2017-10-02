#!/bin/bash
if [[ ("$1" = "-h") || ($# -ne 2) ]]
then
    echo "Usage: ./writeAPost [title] [categories] or ./writeAPost -h for help"
    exit 1
fi
date=`date -I`
post="$date"
title="$1" # title with spaces, no dash
titleWithDashes="`echo "$title" | tr [:space:] -`"
post+="-$titleWithDashes"
post=${post%?} # remove the trailing dash
post+=".md"
echo "---
layout: post
title: \"$title\"
date: $date 09:00:00 -0100
categories: "$2"
---" >> $post
vim $post
