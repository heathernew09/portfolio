#!/bin/bash

# Heather New Portfolio Deployment Script
# Usage: ./deploy.sh

# SiteGround SSH Details (Updated for Portfolio)
SG_USER="u1443-vg0xr9vznvhn"
SG_HOST="ssh.heathernew.com"
SG_PORT="18765"
SG_PATH="www/heathernew.com/public_html"
SG_KEY="$HOME/.ssh/portfolio_rsa_id"

# 1. Build locally
echo "🚀 Building project..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Build failed. Aborting deployment."
    exit 1
fi

# 2. Backup on server (Excluding large assets to save time/space)
echo "📦 Creating lean backup on server..."
ssh -i "$SG_KEY" "$SG_USER@$SG_HOST" -p "$SG_PORT" "tar -czf backup_portfolio_$(date +%Y%m%d_%H%M%S).tar.gz --exclude='*.mp4' --exclude='*.mov' --exclude='*.MOV' --exclude='*.zip' --exclude='*.psd' -C www/heathernew.com/ public_html/"

# 3. Deploy (Sync local dist/ to server public_html/)
echo "☁️ Deploying to SiteGround..."
rsync -avz --delete -e "ssh -i $SG_KEY -p $SG_PORT" dist/ "$SG_USER@$SG_HOST:$SG_PATH/"

# 4. Invalidate Cache (Touch index.html)
echo "🧹 Requesting cache refresh..."
ssh -i "$SG_KEY" "$SG_USER@$SG_HOST" -p "$SG_PORT" "touch $SG_PATH/index.html"

# 5. Push to GitHub
echo "🐙 Pushing source code to GitHub..."
git add .
git commit -m "deploy: $(date +'%Y-%m-%d %H:%M:%S')"
git push origin main

echo "✅ Deployment complete! Visit https://heathernew.com"
