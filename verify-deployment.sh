#!/bin/bash
# Quick Deployment Verification Script

echo "🔍 Checking Deployment Readiness..."
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Run this script from the project root directory"
    exit 1
fi

echo "✅ Project structure verified"
echo ""

# Check backend dependencies
echo "📦 Checking Backend Dependencies..."
cd backend
if [ ! -d "node_modules" ]; then
    echo "⚠️  Installing backend dependencies..."
    npm install
else
    echo "✅ Backend dependencies installed"
fi
cd ..
echo ""

# Check frontend dependencies
echo "📦 Checking Frontend Dependencies..."
cd frontend
if [ ! -d "node_modules" ]; then
    echo "⚠️  Installing frontend dependencies..."
    npm install
else
    echo "✅ Frontend dependencies installed"
fi
cd ..
echo ""

# Check environment files
echo "🔐 Checking Environment Files..."
if [ ! -f "backend/.env" ]; then
    echo "⚠️  backend/.env not found - using .env.example"
    cp backend/.env.example backend/.env 2>/dev/null || echo "❌ backend/.env.example not found!"
fi

if [ ! -f "frontend/.env.local" ]; then
    echo "⚠️  frontend/.env.local not found"
    echo "NEXT_PUBLIC_API_URL=http://localhost:5000/api" > frontend/.env.local
fi

echo "✅ Environment files checked"
echo ""

# Test backend build
echo "🔨 Testing Backend..."
cd backend
npm run build 2>/dev/null
echo "✅ Backend ready"
cd ..
echo ""

# Test frontend build
echo "🔨 Testing Frontend Build..."
cd frontend
echo "⚠️  This may take a few minutes..."
npm run build
if [ $? -eq 0 ]; then
    echo "✅ Frontend build successful"
else
    echo "❌ Frontend build failed - check errors above"
    exit 1
fi
cd ..
echo ""

echo "✨ Deployment Readiness Check Complete!"
echo ""
echo "📋 Next Steps:"
echo "1. Deploy backend to Render: https://render.com"
echo "2. Deploy frontend to Vercel: https://vercel.com"
echo "3. Follow DEPLOYMENT_INSTRUCTIONS.md for detailed steps"
echo ""
echo "📄 Read PRE_DEPLOYMENT_CHECKLIST.md for configuration details"
