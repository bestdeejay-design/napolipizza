#!/bin/bash

# Napoli Pizza - Local Development Server
# This script starts a local development server

echo "🍕 Starting Napoli Pizza development server..."
echo ""

# Check if Python 3 is available
if command -v python3 &> /dev/null; then
    PYTHON_CMD="python3"
elif command -v python &> /dev/null; then
    PYTHON_CMD="python"
else
    echo "❌ Error: Python is not installed. Please install Python 3."
    exit 1
fi

echo "✅ Using Python: $PYTHON_CMD"
echo ""
echo "📍 Opening site at: http://localhost:8000"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Start the server
cd src && $PYTHON_CMD -m http.server 8000
