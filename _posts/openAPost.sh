#!/bin/bash
RED='\033[33;31m'
STD='\033[0;0;39m'
GREEN='\e[0;32m';
BOLD=$(tput bold)
NORMAL=$(tput sgr0)
search="`ls -1 *.md | grep -i "$1"`"
OPTIONS=($search)
noOfLines=`wc -l <<< "$search"`
ZERO=0
function show_menu {
    echo -e "${GREEN}Enter the number to select the post that you want to open in vim."
    echo -e "${STD}Found ${GREEN}$noOfLines${STD} of posts of matching names:"
    select option in "${OPTIONS[@]}";
    do
        if [ ! -z "$option" ]
        then
             vim $option
        else
            echo "Invalid option. Try again."
            show_menu
        fi
        break
    done
}
if [ $# -eq "0" ]
then
    echo "Usage: openAPost [keyword]"
    exit 1
fi
if [ "$noOfLines" -eq "0" ]
then
    echo "No matching names were found"
elif [ "$noOfLines" -gt "1" ]
then
    show_menu
else
    vim $search
fi

