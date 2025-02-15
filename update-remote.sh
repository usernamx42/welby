#!/bin/bash

REMOTE_URL="https://github.com/usernamx42/welby.git"

# Check if remote exists, if not add it
if ! git remote | grep -q "^origin$"; then
    echo "Remote 'origin' not found. Adding it..."
    git remote add origin $REMOTE_URL
else
    echo "Updating existing remote..."
    git remote set-url origin $REMOTE_URL
fi

# Initialize git if needed
if [ ! -d .git ]; then
    echo "Initializing git repository..."
    git init
fi

# Add all changes
git add .

# Commit changes
echo "Enter commit message:"
read commit_message
git commit -m "$commit_message"

# Force push to master
git push -f origin master

echo "Changes have been pushed to $REMOTE_URL" 