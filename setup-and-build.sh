#!/bin/bash
# Run this once to install dependencies and verify the build
cd "$(dirname "$0")"
npm install
npm run build
echo ""
echo "✅ ClientFlow dark mode build complete!"
