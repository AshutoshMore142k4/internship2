# Quick Deployment Verification Script (Windows)

Write-Host "🔍 Checking Deployment Readiness..." -ForegroundColor Cyan
Write-Host ""

# Check if we're in the right directory
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Error: Run this script from the project root directory" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Project structure verified" -ForegroundColor Green
Write-Host ""

# Check backend dependencies
Write-Host "📦 Checking Backend Dependencies..." -ForegroundColor Cyan
Set-Location backend
if (-not (Test-Path "node_modules")) {
    Write-Host "⚠️  Installing backend dependencies..." -ForegroundColor Yellow
    npm install
} else {
    Write-Host "✅ Backend dependencies installed" -ForegroundColor Green
}
Set-Location ..
Write-Host ""

# Check frontend dependencies
Write-Host "📦 Checking Frontend Dependencies..." -ForegroundColor Cyan
Set-Location frontend
if (-not (Test-Path "node_modules")) {
    Write-Host "⚠️  Installing frontend dependencies..." -ForegroundColor Yellow
    npm install
} else {
    Write-Host "✅ Frontend dependencies installed" -ForegroundColor Green
}
Set-Location ..
Write-Host ""

# Check environment files
Write-Host "🔐 Checking Environment Files..." -ForegroundColor Cyan
if (-not (Test-Path "backend\.env")) {
    Write-Host "⚠️  backend\.env not found - using .env.example" -ForegroundColor Yellow
    if (Test-Path "backend\.env.example") {
        Copy-Item "backend\.env.example" "backend\.env"
    } else {
        Write-Host "❌ backend\.env.example not found!" -ForegroundColor Red
    }
}

if (-not (Test-Path "frontend\.env.local")) {
    Write-Host "⚠️  frontend\.env.local not found - creating..." -ForegroundColor Yellow
    "NEXT_PUBLIC_API_URL=http://localhost:5000/api" | Out-File -FilePath "frontend\.env.local" -Encoding utf8
}

Write-Host "✅ Environment files checked" -ForegroundColor Green
Write-Host ""

# Test frontend build
Write-Host "🔨 Testing Frontend Build..." -ForegroundColor Cyan
Write-Host "⚠️  This may take a few minutes..." -ForegroundColor Yellow
Set-Location frontend
npm run build
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Frontend build successful" -ForegroundColor Green
} else {
    Write-Host "❌ Frontend build failed - check errors above" -ForegroundColor Red
    Set-Location ..
    exit 1
}
Set-Location ..
Write-Host ""

Write-Host "✨ Deployment Readiness Check Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Next Steps:" -ForegroundColor Cyan
Write-Host "1. Deploy backend to Render: https://render.com"
Write-Host "2. Deploy frontend to Vercel: https://vercel.com"
Write-Host "3. Follow DEPLOYMENT_INSTRUCTIONS.md for detailed steps"
Write-Host ""
Write-Host "📄 Read PRE_DEPLOYMENT_CHECKLIST.md for configuration details" -ForegroundColor Yellow
