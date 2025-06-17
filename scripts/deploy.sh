#!/bin/bash

# Configuration
SYNOLOGY_HOST="your-nas-address"
SYNOLOGY_USER="your-username"
DEPLOY_PATH="/volume1/docker/bbq-landing"

# Build the project locally
echo "Building project locally..."
npm run build

# Sync files to Synology
echo "Syncing files to Synology..."
rsync -av --exclude 'node_modules' --exclude '.next' \
    --exclude '.git' --exclude '.env.local' \
    . $SYNOLOGY_USER@$SYNOLOGY_HOST:$DEPLOY_PATH/

# SSH into Synology and rebuild/restart the container
echo "Rebuilding and restarting Docker container..."
ssh $SYNOLOGY_USER@$SYNOLOGY_HOST "cd $DEPLOY_PATH && docker-compose down && docker-compose up -d --build"

echo "Deployment complete!"