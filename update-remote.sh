#!/bin/bash

# Change remote URL
git remote set-url origin https://github.com/usernamx42/welby.git

# Add all changes
git add .

# Commit changes
echo "Enter commit message:"
read commit_message
git commit -m "$commit_message"

# Force push to master
git push -f origin master

echo "Changes have been pushed to https://github.com/usernamx42/welby.git" 