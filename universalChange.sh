files=`ls . -1`
for file in $files
do    
     cat firstTwoLines > temp.txt 
     tail -n +2 $file >> temp.txt
done