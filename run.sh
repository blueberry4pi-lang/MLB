#!/bin/bash
# Run script for MLB Analyzer Docker container

echo "Starting MLB Analyzer on port 8513..."

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install --only=production
fi

# Start the application
echo "Starting application..."
node index.js