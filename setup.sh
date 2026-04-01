#!/bin/bash

# Jobify Project Setup Script

echo "========================================"
echo "   JOBIFY PROJECT SETUP"
echo "========================================"
echo

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed!"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "✓ Node.js detected: $(node --version)"
echo

# Create necessary directories if they don't exist
mkdir -p client/src
mkdir -p server

echo "Installing dependencies..."
echo

# Install root dependencies
echo "[1/3] Installing root dependencies..."
npm install

# Install client dependencies
echo "[2/3] Installing client dependencies..."
cd client
npm install
cd ..

# Install server dependencies
echo "[3/3] Installing server dependencies..."
cd server
npm install
cd ..

echo
echo "========================================"
echo "   SETUP COMPLETED SUCCESSFULLY!"
echo "========================================"
echo
echo "Next steps:"
echo "1. Update MongoDB URI in server/.env"
echo "2. Run 'npm run dev' from root to start both services"
echo "   OR"
echo "3. Run from separate terminals:"
echo "   - Server: cd server && npm run dev"
echo "   - Client: cd client && npm run dev"
echo
echo "Frontend: http://localhost:3000"
echo "Backend:  http://localhost:5000"
echo
