#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}GitHub Credentials Setup Script${NC}"
echo "This script will help you set up GitHub credentials using your access key."

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo -e "${RED}Git is not installed. Please install git first.${NC}"
    exit 1
fi

# Prompt for GitHub username
read -p "Enter your GitHub username: " GITHUB_USERNAME

# Prompt for GitHub access token
read -sp "Enter your GitHub access token: " GITHUB_TOKEN
echo

# Configure git with the provided credentials
echo -e "\n${YELLOW}Configuring Git...${NC}"

# Set up credential helper
git config --global credential.helper store

# Set up user name and email
git config --global user.name "$GITHUB_USERNAME"

# Create or update .git-credentials file
CREDENTIALS_URL="https://${GITHUB_USERNAME}:${GITHUB_TOKEN}@github.com"
echo "$CREDENTIALS_URL" > ~/.git-credentials
chmod 600 ~/.git-credentials

# Test the configuration
echo -e "\n${YELLOW}Testing GitHub connection...${NC}"
if git ls-remote https://github.com/$GITHUB_USERNAME &> /dev/null; then
    echo -e "${GREEN}Successfully connected to GitHub!${NC}"
    echo -e "${GREEN}GitHub credentials have been set up successfully.${NC}"
else
    echo -e "${RED}Failed to connect to GitHub. Please check your credentials.${NC}"
    exit 1
fi

# Security reminder
echo -e "\n${YELLOW}Security Reminder:${NC}"
echo "1. Keep your access token secure and never share it"
echo "2. The token has been stored in ~/.git-credentials"
echo "3. If you need to revoke access, go to GitHub Settings > Developer Settings > Personal Access Tokens"

exit 0 