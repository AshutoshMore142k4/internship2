# Deployment Guide for Full-Stack App

## 🎯 Deployment Strategy

### **Backend → Render (or Railway/Heroku)**
### **Frontend → Vercel**

---

## 📋 Step-by-Step Deployment

### **Part 1: Deploy Backend to Render**

1. **Create Render Account**
   - Go to https://render.com
   - Sign up with GitHub

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the repository

3. **Configure Backend Service**
   ```
   Name: task-manager-backend
   Environment: Node
   Region: Choose closest to you
   Branch: main
   Root Directory: backend
   Build Command: npm install
   Start Command: npm start
   ```

4. **Add Environment Variables** (in Render Dashboard)
   ```
   PORT=5000
   NODE_ENV=production
   MONGODB_URI=mongodb+srv://taskappuser:bZ82xrdbVqpOXi37@cluster0.yiyjj8a.mongodb.net/taskapp?retryWrites=true&w=majority&appName=Cluster0
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-min-32-chars-PRODUCTION
   JWT_EXPIRE=24h
   FRONTEND_URL=https://your-app-name.vercel.app
   ```

5. **Deploy Backend**
   - Click "Create Web Service"
   - Wait for deployment (2-3 minutes)
   - Copy the deployed URL (e.g., https://task-manager-backend.onrender.com)

---

### **Part 2: Deploy Frontend to Vercel**

1. **Update Frontend Environment**
   - In Vercel Dashboard, go to your project
   - Settings → Environment Variables
   - Add:
     ```
     NEXT_PUBLIC_API_URL=https://task-manager-backend.onrender.com/api
     ```

2. **Deploy to Vercel**
   ```bash
   # Install Vercel CLI
   npm install -g vercel

   # Navigate to frontend directory
   cd frontend

   # Deploy
   vercel

   # Follow prompts:
   # - Link to existing project or create new
   # - Set root directory to "frontend"
   # - Override build settings: No
   ```

3. **Alternative: Deploy via GitHub**
   - Push code to GitHub
   - Go to https://vercel.com
   - Click "Import Project"
   - Select your repository
   - Root Directory: `frontend`
   - Click Deploy

---

## ⚙️ Pre-Deployment Checklist

### **Backend Fixes Required:**
- ✅ Update CORS to allow production domain
- ✅ Add production environment variables
- ✅ Verify MongoDB connection string
- ✅ Set NODE_ENV=production

### **Frontend Fixes Required:**
- ✅ Update API URL to production
- ✅ Remove console.logs in production
- ✅ Add error boundaries
- ✅ Test API connection

---

## 🔒 Security Checklist

- [ ] Changed JWT_SECRET to strong production secret
- [ ] MongoDB IP whitelist updated (or allow all: 0.0.0.0/0)
- [ ] Environment variables not committed to git
- [ ] CORS configured for production domain only
- [ ] Rate limiting enabled
- [ ] HTTPS enforced

---

## 🧪 Testing After Deployment

1. **Test Backend API**
   ```bash
   curl https://your-backend.onrender.com/health
   ```
   Expected: `{"success": true, "message": "Server is running"}`

2. **Test Frontend**
   - Visit https://your-app.vercel.app
   - Try to register a new account
   - Try to login
   - Create a task

3. **Check Network Tab**
   - Open DevTools → Network
   - Verify API calls go to production backend
   - Check for CORS errors

---

## 🚨 Common Deployment Issues & Fixes

### **Issue: CORS Error**
**Fix:** Update backend CORS configuration to include Vercel domain

### **Issue: 500 Server Error**
**Fix:** Check Render logs for backend errors
```bash
# In Render Dashboard → Logs tab
```

### **Issue: MongoDB Connection Failed**
**Fix:** 
1. Verify connection string in Render environment variables
2. Check MongoDB Atlas Network Access allows 0.0.0.0/0
3. Verify MongoDB user credentials

### **Issue: API calls fail with 404**
**Fix:** Verify NEXT_PUBLIC_API_URL is set correctly in Vercel

---

## 📊 Monitoring

**Backend (Render):**
- Dashboard → Metrics
- Dashboard → Logs

**Frontend (Vercel):**
- Analytics → Deployments
- Analytics → Real-time

**Database (MongoDB Atlas):**
- Metrics → Database
- Performance → Slow Queries

---

## 💰 Cost Estimate

| Service | Free Tier | Cost |
|---------|-----------|------|
| Render (Backend) | 750 hours/month | $0 |
| Vercel (Frontend) | 100GB bandwidth | $0 |
| MongoDB Atlas | 512MB storage | $0 |
| **Total** | | **$0/month** |

---

## 🔄 CI/CD Auto-Deploy

**Setup Auto-Deploy:**
1. Both Vercel and Render support GitHub integration
2. Every push to `main` branch auto-deploys
3. Environment variables persist across deployments

---

## 📝 Post-Deployment Tasks

1. **Update MongoDB Atlas Network Access**
   ```
   0.0.0.0/0 (Allow from anywhere)
   ```

2. **Add Custom Domain (Optional)**
   - Vercel: Settings → Domains
   - Render: Settings → Custom Domains

3. **Enable HTTPS** (Auto-enabled on both platforms)

4. **Setup Monitoring** (Optional)
   - Sentry for error tracking
   - LogRocket for session replay

---

## 🎉 Deployment URLs

After deployment, you'll have:
- **Frontend:** https://your-app-name.vercel.app
- **Backend:** https://your-backend.onrender.com
- **API Docs:** https://your-backend.onrender.com/health

---

**Need Help?** 
- Render Docs: https://render.com/docs
- Vercel Docs: https://vercel.com/docs
- MongoDB Atlas: https://www.mongodb.com/docs/atlas
