#!/bin/bash

baseDirectory="C:\\Users\\kalig\\Downloads"
destinationParentFolder="C:\\Users\\kalig\\WebDevelopment"

# Move the most recent file from baseDirectory to destinationParentFolder
recentFile=$(ls -t "$baseDirectory" | head -n 1)

# Prompt the user to enter the name of a child folder inside destinationParentFolder
read -p "Enter the name of a project folder inside $destinationParentFolder: " childFolder

# Check if the specified child folder exists
childFolderPath="$destinationParentFolder\\$childFolder\\Images"
if [ ! -d "$childFolderPath" ]; then
    echo "Child folder '$childFolder' does not exist in $destinationParentFolder."
    exit 1
fi

# Move the recent file to the specified child folder
mv "$baseDirectory/$recentFile" "$childFolderPath"
echo "File '$recentFile' moved to $childFolderPath."
