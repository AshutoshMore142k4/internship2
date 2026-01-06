# Deployment Guide

This guide covers deploying the Task Manager application to production using Vercel (frontend) and Render (backend).

---

## Prerequisites

- GitHub account
- Vercel account (free tier)
- Render account (free tier)
- MongoDB Atlas account (free tier)
- Git installed locally

---

## Part 1: Database Setup (MongoDB Atlas)

### Step 1: Create MongoDB Cluster

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up or log in
3. Click "Build a Database"
4. Select **FREE** shared cluster (M0)
5. Choose a cloud provider and region closest to your users
6. Name your cluster (e.g., "taskmanager-cluster")
7. Click "Create Cluster"

### Step 2: Create Database User

1. In the left sidebar, click "Database Access"
2. Click "Add New Database User"
3. Create a username and strong password
4. Set "Database User Privileges" to "Read and write to any database"
5. Click "Add User"
6. **Save credentials securely** - you'll need them later

### Step 3: Configure Network Access

1. In the left sidebar, click "Network Access"
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (or add specific IPs for production)
4. Click "Confirm"

### Step 4: Get Connection String

1. Click "Database" in the left sidebar
2. Click "Connect" on your cluster
3. Select "Connect your application"
4. Copy the connection string (it looks like):
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. Replace `<username>` and `<password>` with your credentials
6. Add database name: `mongodb+srv://user:pass@cluster.net/taskapp?retryWrites=true&w=majority`

---

## Part 2: Backend Deployment (Render)

### Step 1: Prepare Backend Code

1. Ensure your backend code is in a GitHub repository
2. Make sure `package.json` has proper scripts:
   ```json
   {
     "scripts": {
       "start": "node src/server.js",
       "dev": "nodemon src/server.js"
     }
   }
   ```

### Step 2: Create Render Web Service

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "Web Service"
3. Connect your GitHub account
4. Select your repository
5. Configure service:
   - **Name:** taskmanager-api
   - **Region:** Choose closest to your users
   - **Branch:** main
   - **Root Directory:** backend (if backend is in subfolder)
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** Free

### Step 3: Add Environment Variables

In the Render dashboard, scroll to "Environment Variables" and add:

```
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.net/taskapp?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-key-min-32-chars-use-random-generator
JWT_EXPIRE=24h
FRONTEND_URL=https://your-frontend-domain.vercel.app
```

**Generate secure JWT_SECRET:**
```bash
# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Or use online generator: https://randomkeygen.com/
```

### Step 4: Deploy

1. Click "Create Web Service"
2. Wait for deployment (takes 3-5 minutes)
3. Once deployed, you'll get a URL like: `https://taskmanager-api.onrender.com`
4. Test health endpoint: `https://taskmanager-api.onrender.com/health`

### Step 5: Keep Free Tier Active

**Important:** Render's free tier spins down after 15 minutes of inactivity.

**Solution 1: Use a monitoring service**
- [UptimeRobot](https://uptimerobot.com/) (free)
- Set up monitor to ping your API every 5 minutes

**Solution 2: Upgrade to paid tier ($7/month)**
- Guaranteed uptime
- No cold starts

---

## Part 3: Frontend Deployment (Vercel)

### Step 1: Prepare Frontend Code

1. Ensure your frontend code is in a GitHub repository
2. Create `.env.local.example`:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com/api
   ```

### Step 2: Deploy to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset:** Next.js
   - **Root Directory:** frontend (if frontend is in subfolder)
   - **Build Command:** `npm run build` (auto-detected)
   - **Output Directory:** `.next` (auto-detected)

### Step 3: Add Environment Variables

In "Environment Variables" section:

```
NEXT_PUBLIC_API_URL=https://taskmanager-api.onrender.com/api
```

### Step 4: Deploy

1. Click "Deploy"
2. Wait for build (2-3 minutes)
3. Your site will be live at: `https://your-project.vercel.app`

### Step 5: Update Backend CORS

Go back to Render and update `FRONTEND_URL`:
```
FRONTEND_URL=https://your-project.vercel.app
```

Trigger redeploy in Render for changes to take effect.

---

## Part 4: Custom Domain (Optional)

### For Vercel (Frontend)

1. Go to your project settings in Vercel
2. Click "Domains"
3. Add your custom domain (e.g., `taskmanager.com`)
4. Update DNS records as instructed by Vercel
5. SSL certificate is auto-generated

### For Render (Backend)

1. Go to your service settings in Render
2. Click "Custom Domains"
3. Add subdomain (e.g., `api.taskmanager.com`)
4. Update DNS records as instructed by Render
5. SSL certificate is auto-generated

**Update Environment Variables:**
```
# Backend (Render)
FRONTEND_URL=https://taskmanager.com

# Frontend (Vercel)
NEXT_PUBLIC_API_URL=https://api.taskmanager.com/api
```

---

## Part 5: Post-Deployment Checklist

### Backend
- [ ] Health check endpoint returns 200
- [ ] API documentation accessible
- [ ] Database connection successful
- [ ] CORS properly configured
- [ ] Environment variables set correctly
- [ ] Rate limiting active
- [ ] Error logging enabled

### Frontend
- [ ] Homepage loads correctly
- [ ] Login/Register forms work
- [ ] Dashboard accessible after login
- [ ] Task CRUD operations functional
- [ ] API calls successful
- [ ] No console errors
- [ ] Responsive on mobile devices

### Security
- [ ] HTTPS enabled (both frontend and backend)
- [ ] Environment variables secured (not in code)
- [ ] JWT secret is strong and random
- [ ] MongoDB user has minimum required permissions
- [ ] Network access configured properly
- [ ] Rate limiting tested

---

## Part 6: Monitoring & Maintenance

### Set Up Monitoring

**1. Render Logs:**
- Access logs in Render dashboard
- Monitor for errors and performance issues

**2. Vercel Analytics:**
- Enable Web Analytics in Vercel dashboard
- Track page views and performance

**3. MongoDB Atlas Monitoring:**
- Monitor database performance
- Set up alerts for high usage
- Regular backups (automatic on Atlas)

### Regular Maintenance

**Weekly:**
- Check error logs
- Monitor API response times
- Review database performance

**Monthly:**
- Update dependencies (security patches)
- Review and optimize database queries
- Check storage and bandwidth usage

**Quarterly:**
- Review scaling needs
- Optimize codebase
- Security audit

---

## Part 7: CI/CD Setup (Optional)

### GitHub Actions for Automated Testing

Create `.github/workflows/test.yml`:

```yaml
name: Test

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: cd backend && npm ci
      - run: cd backend && npm test
      - run: cd frontend && npm ci
      - run: cd frontend && npm run build
```

### Auto-Deploy on Push

Both Vercel and Render auto-deploy when you push to the main branch. To disable:

**Vercel:**
- Project Settings → Git → Disable auto-deployments

**Render:**
- Service Settings → Auto-Deploy → Disable

---

## Part 8: Troubleshooting

### Backend Issues

**Issue: API not responding**
- Check Render logs for errors
- Verify MongoDB connection string
- Ensure PORT environment variable is set
- Check if service is running (may have spun down on free tier)

**Issue: Database connection failed**
- Verify MongoDB credentials
- Check network access settings in Atlas
- Ensure connection string includes database name

**Issue: CORS errors**
- Verify FRONTEND_URL matches your Vercel deployment
- Check CORS configuration in backend code

### Frontend Issues

**Issue: API calls failing**
- Verify NEXT_PUBLIC_API_URL is correct
- Check browser console for errors
- Ensure backend is running and accessible
- Test API endpoints directly with Postman

**Issue: Build failing**
- Check Vercel build logs
- Ensure all dependencies are in package.json
- Verify TypeScript errors are resolved

**Issue: 404 on page refresh**
- Next.js handles this automatically
- Verify next.config.js is properly configured

---

## Part 9: Scaling to Paid Tiers

### When to Upgrade

**Render Backend ($7/month minimum):**
- More than 100 daily active users
- Need guaranteed uptime
- API response time degradation

**MongoDB Atlas ($9/month for M2):**
- Storage exceeds 512MB
- Need automated backups
- Require better performance

**Vercel Pro ($20/month):**
- Need team collaboration
- Custom domains on Hobby exceed limits
- Require advanced analytics

---

## Part 10: Backup & Disaster Recovery

### MongoDB Backups

**Free Tier:**
- No automated backups
- Manual export recommended weekly:
  ```bash
  mongodump --uri="mongodb+srv://user:pass@cluster.net/taskapp"
  ```

**Paid Tier:**
- Automated daily backups
- Point-in-time recovery
- Cross-region backup replication

### Code Backups

- GitHub already serves as backup
- Tag releases:
  ```bash
  git tag -a v1.0.0 -m "Production release"
  git push origin v1.0.0
  ```

### Rollback Procedure

**Vercel:**
1. Go to Deployments
2. Find previous working deployment
3. Click "Promote to Production"

**Render:**
1. Go to Events
2. Find previous deploy
3. Click "Rollback"

---

## Conclusion

Your Task Manager application is now deployed and accessible globally! Remember to:

1. Monitor regularly
2. Keep dependencies updated
3. Back up data
4. Scale when needed
5. Maintain security best practices

For production use, consider upgrading to paid tiers and implementing additional monitoring, testing, and security measures.
