# Quick Start Guide

This guide will help you set up and run the Task Manager application locally in under 10 minutes.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** v18 or higher ([Download](https://nodejs.org/))
- **Git** ([Download](https://git-scm.com/))
- **MongoDB Atlas** account (free tier) - [Sign up](https://www.mongodb.com/cloud/atlas)
- A code editor (VS Code recommended)

## Step 1: MongoDB Setup (5 minutes)

1. **Create MongoDB Atlas Account:**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up for a free account
   - Create a new cluster (choose FREE M0 tier)

2. **Create Database User:**
   - Click "Database Access" in left sidebar
   - Add new database user with username and password
   - Save these credentials securely

3. **Configure Network Access:**
   - Click "Network Access" in left sidebar
   - Add IP Address → "Allow Access from Anywhere"
   - Click "Confirm"

4. **Get Connection String:**
   - Click "Database" → "Connect" → "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your actual password
   - Add database name: `mongodb+srv://user:pass@cluster.mongodb.net/taskapp?retryWrites=true&w=majority`

## Step 2: Backend Setup (3 minutes)

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   - Copy `.env.example` to `.env`
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables:**
   Edit `.env` file:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=your_mongodb_connection_string_here
   JWT_SECRET=your-super-secret-key-at-least-32-characters-long
   JWT_EXPIRE=24h
   FRONTEND_URL=http://localhost:3000
   ```

   **Generate JWT_SECRET:**
   ```bash
   # Run this command to generate a secure secret:
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

5. **Start the backend server:**
   ```bash
   npm run dev
   ```

   ✅ Backend should be running at: http://localhost:5000

## Step 3: Frontend Setup (2 minutes)

1. **Open a new terminal** and navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   - Copy `.env.local.example` to `.env.local`
   ```bash
   cp .env.local.example .env.local
   ```

4. **Configure environment variables:**
   Edit `.env.local` file:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

5. **Start the frontend server:**
   ```bash
   npm run dev
   ```

   ✅ Frontend should be running at: http://localhost:3000

## Step 4: Test the Application

1. **Open your browser** and go to: http://localhost:3000

2. **Register a new account:**
   - Click "Sign up"
   - Fill in your details
   - Click "Create Account"

3. **You should be redirected to the dashboard!**

4. **Try creating a task:**
   - Click "Create Task" button
   - Fill in task details
   - Click "Create Task"

5. **Test filtering and search:**
   - Use the search bar to filter tasks
   - Change task status using dropdown
   - Delete tasks using the delete button

## Troubleshooting

### Backend Issues

**Error: "Cannot connect to MongoDB"**
- Verify your MongoDB connection string in `.env`
- Ensure your IP is whitelisted in MongoDB Atlas
- Check username and password are correct

**Error: "Port 5000 is already in use"**
- Kill the process using port 5000, or
- Change PORT in `.env` to another port (e.g., 5001)

**Error: "JWT_SECRET not defined"**
- Make sure you've set JWT_SECRET in `.env`
- Generate a new one using the command above

### Frontend Issues

**Error: "Module not found"**
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

**Error: "API calls failing"**
- Verify backend is running on http://localhost:5000
- Check `NEXT_PUBLIC_API_URL` in `.env.local`
- Look for CORS errors in browser console

**Error: "Page not found on refresh"**
- This is normal for Next.js development
- Just navigate from the home page

## Using Postman (Optional)

1. **Import the collection:**
   - Open Postman
   - Click "Import"
   - Select `postman/collection.json`

2. **Set up environment:**
   - The collection uses variables for base_url and jwt_token
   - Register or login will automatically save the token

3. **Test endpoints:**
   - Start with "Register User"
   - Then "Login User" (token auto-saves)
   - Try "Create Task" and other endpoints

## Project Structure

```
assignm/
├── backend/                 # Express.js backend
│   ├── src/
│   │   ├── config/         # Database configuration
│   │   ├── controllers/    # Request handlers
│   │   ├── middleware/     # Custom middleware
│   │   ├── models/         # MongoDB schemas
│   │   ├── routes/         # API routes
│   │   ├── utils/          # Helper functions
│   │   └── server.js       # Entry point
│   ├── .env.example        # Environment template
│   └── package.json
│
├── frontend/               # Next.js frontend
│   ├── app/               # App Router pages
│   ├── components/        # React components
│   ├── lib/               # Utilities & API client
│   ├── .env.local.example # Environment template
│   └── package.json
│
├── docs/                  # Documentation
│   ├── API_DOCUMENTATION.md
│   ├── DEPLOYMENT_GUIDE.md
│   └── SCALING_STRATEGY.md
│
├── postman/              # Postman collection
│   └── collection.json
│
└── README.md             # Main documentation
```

## Next Steps

1. **Read the documentation:**
   - [API Documentation](docs/API_DOCUMENTATION.md)
   - [Deployment Guide](docs/DEPLOYMENT_GUIDE.md)
   - [Scaling Strategy](docs/SCALING_STRATEGY.md)

2. **Explore the code:**
   - Backend: Start with `backend/src/server.js`
   - Frontend: Start with `frontend/app/page.tsx`

3. **Customize the application:**
   - Change colors in `frontend/tailwind.config.js`
   - Add new features
   - Modify task fields

4. **Deploy to production:**
   - Follow the [Deployment Guide](docs/DEPLOYMENT_GUIDE.md)
   - Deploy frontend to Vercel
   - Deploy backend to Render

## Development Tips

### Backend Development

- **Auto-reload:** Backend uses nodemon for auto-reload
- **Logs:** Check terminal for request logs and errors
- **Testing:** Use Postman collection for API testing

### Frontend Development

- **Hot reload:** Next.js automatically reloads on changes
- **Console:** Check browser console for errors
- **Components:** All components are in `frontend/components/`

### Database Management

- **View data:** Use MongoDB Atlas dashboard
- **Backup:** Export data from Atlas interface
- **Indexes:** Already configured for optimal performance

## Common Development Tasks

### Add a new API endpoint

1. Create controller function in `backend/src/controllers/`
2. Add route in `backend/src/routes/`
3. Add validation in `backend/src/middleware/validationMiddleware.js`

### Add a new frontend page

1. Create page in `frontend/app/`
2. Create components in `frontend/components/`
3. Add API call in `frontend/lib/api-client.ts`

### Update the database schema

1. Modify model in `backend/src/models/`
2. Update controllers if needed
3. Update frontend types if using TypeScript

## Getting Help

- **Issues:** Check the troubleshooting section
- **Documentation:** Read the docs in the `docs/` folder
- **Code Comments:** Most files have detailed comments

## Success Checklist

- [ ] Backend running on http://localhost:5000
- [ ] Frontend running on http://localhost:3000
- [ ] MongoDB connected successfully
- [ ] User registration works
- [ ] User login works
- [ ] Tasks can be created
- [ ] Tasks can be viewed, updated, deleted
- [ ] Search and filters work
- [ ] Profile page accessible

Congratulations! 🎉 You now have a fully functional task management application running locally!
