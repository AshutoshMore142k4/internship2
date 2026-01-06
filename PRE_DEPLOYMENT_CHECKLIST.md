# 🚀 Pre-Deployment Checklist

## ✅ CRITICAL FIXES COMPLETED

### **Backend Fixes:**
- ✅ CORS updated to allow Vercel domains (including preview deployments)
- ✅ Production start script added
- ✅ Error handling configured
- ✅ Rate limiting enabled

### **Frontend Fixes:**
- ✅ API URL configurable via environment variable
- ✅ Production logging disabled
- ✅ Timeout increased for slow connections
- ✅ Vercel configuration added

---

## 🔧 REQUIRED BEFORE DEPLOYMENT

### **1. Update Backend CORS (CRITICAL!)**
After deploying frontend to Vercel, update `backend/src/server.js` line 28:
```javascript
'https://your-actual-app-name.vercel.app', // Replace with your actual Vercel URL
```

### **2. MongoDB Atlas Configuration**
- [ ] Go to MongoDB Atlas → Network Access
- [ ] Click "Add IP Address"
- [ ] Select "Allow Access from Anywhere" (0.0.0.0/0)
- [ ] Save

### **3. Environment Variables for Render (Backend)**
Add these in Render Dashboard → Environment:
```
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://taskappuser:bZ82xrdbVqpOXi37@cluster0.yiyjj8a.mongodb.net/taskapp?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=CHANGE-THIS-TO-RANDOM-64-CHAR-STRING-IN-PRODUCTION-12345678
JWT_EXPIRE=24h
FRONTEND_URL=https://your-app-name.vercel.app
```

**⚠️ SECURITY:** Generate new JWT_SECRET:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### **4. Environment Variables for Vercel (Frontend)**
Add in Vercel Dashboard → Settings → Environment Variables:
```
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com/api
```

---

## 🐛 KNOWN ISSUES & FIXES

### **Issue 1: "Route not found - /auth/register"**
**Status:** ✅ Fixed
**Cause:** Frontend using wrong API endpoint
**Fix:** Updated `.env.local` with correct API URL

### **Issue 2: CORS errors in production**
**Status:** ✅ Fixed
**Cause:** Backend only allowed localhost
**Fix:** Updated CORS to allow Vercel domains with regex pattern

### **Issue 3: Console errors in production**
**Status:** ✅ Fixed
**Cause:** Debug logging in production
**Fix:** Wrapped console.log in NODE_ENV check

---

## 🔍 POTENTIAL DEPLOYMENT ERRORS

### **Error: "Cannot find module"**
**Solution:** Run `npm install` in both backend and frontend directories

### **Error: "MongoDB connection failed"**
**Solution:** 
1. Check MongoDB Atlas network access allows 0.0.0.0/0
2. Verify connection string in Render environment variables
3. Check MongoDB user credentials

### **Error: "Unauthorized" or 401 errors**
**Solution:**
1. Verify JWT_SECRET is set in Render
2. Check token expiration (JWT_EXPIRE)
3. Clear browser localStorage and try fresh login

### **Error: "Failed to fetch" in browser**
**Solution:**
1. Verify NEXT_PUBLIC_API_URL is set in Vercel
2. Check backend is running (visit /health endpoint)
3. Verify CORS allows your Vercel domain

### **Error: "Rate limit exceeded"**
**Solution:** Normal behavior - wait 15 minutes or adjust rate limits

---

## 📦 DEPLOYMENT ORDER

**IMPORTANT:** Deploy in this order:

1. **First:** Deploy Backend to Render
   - Wait for deployment to complete
   - Copy the deployed URL

2. **Second:** Update Frontend environment variable
   - Set NEXT_PUBLIC_API_URL to backend URL

3. **Third:** Deploy Frontend to Vercel
   - Wait for deployment
   - Copy Vercel URL

4. **Fourth:** Update Backend CORS
   - Add Vercel URL to allowed origins
   - Redeploy backend

---

## 🧪 POST-DEPLOYMENT TESTING

### **Test Backend**
```bash
# 1. Health check
curl https://your-backend.onrender.com/health

# Expected: {"success":true,"message":"Server is running"}

# 2. Register user
curl -X POST https://your-backend.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"Test1234"}'

# Expected: {"success":true,"token":"...","user":{...}}
```

### **Test Frontend**
1. Visit https://your-app.vercel.app
2. Open DevTools → Console (should have no errors)
3. Click "Get Started" → Register
4. Fill form and submit
5. Check Network tab for API calls
6. Verify redirect to dashboard

---

## 🎯 SUCCESS CRITERIA

- [ ] Backend health check returns 200
- [ ] Frontend loads without errors
- [ ] User can register successfully
- [ ] User can login successfully
- [ ] User can create tasks
- [ ] No CORS errors in console
- [ ] API calls go to production backend
- [ ] MongoDB connections successful

---

## 🆘 ROLLBACK PLAN

If deployment fails:
1. Revert to previous deployment in Vercel/Render
2. Check logs in both platforms
3. Fix issues locally
4. Test locally before redeploying

---

## 📊 MONITORING AFTER DEPLOYMENT

### **First 24 Hours:**
- [ ] Check Render logs for errors
- [ ] Monitor MongoDB Atlas for connection spikes
- [ ] Watch Vercel analytics for traffic
- [ ] Test all features manually

### **First Week:**
- [ ] Monitor error rates
- [ ] Check API response times
- [ ] Review MongoDB usage
- [ ] Verify no rate limit issues

---

## 💡 OPTIMIZATION TIPS

**After successful deployment:**
1. Enable Vercel Analytics
2. Add Sentry for error tracking
3. Setup MongoDB monitoring alerts
4. Configure custom domain
5. Add SSL/HTTPS (auto-enabled)
6. Setup CI/CD for auto-deployments

---

## 📞 SUPPORT RESOURCES

- **Render Support:** https://render.com/docs
- **Vercel Support:** https://vercel.com/support
- **MongoDB Atlas:** https://www.mongodb.com/docs/atlas/
- **Error Tracking:** Deployment errors logged in respective dashboards

---

**Last Updated:** January 7, 2026
**Status:** Ready for Deployment ✅
