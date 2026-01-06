# Scalable Authentication & Dashboard Web Application

A production-ready full-stack web application with JWT-based authentication and task management dashboard, demonstrating enterprise-level architecture and security practices.

## 🚀 Features

- **Secure Authentication**: JWT-based authentication with bcrypt password hashing
- **Task Management**: Full CRUD operations with pagination, search, and filtering
- **Responsive Design**: Mobile-first approach (320px to 1920px viewports)
- **Protected Routes**: Middleware-based route protection
- **RESTful API**: Well-documented API with standardized responses
- **Scalable Architecture**: Designed to scale from 0 to 100K+ users

## 📋 Tech Stack

### Frontend
- **Framework**: Next.js 14+ (App Router)
- **Styling**: TailwindCSS v3+
- **Validation**: Zod + React Hook Form
- **State Management**: Context API
- **HTTP Client**: Axios with interceptors

### Backend
- **Runtime**: Node.js v18+
- **Framework**: Express.js v4.18+
- **Authentication**: JWT (jsonwebtoken)
- **Validation**: express-validator
- **Security**: bcrypt, helmet, cors, rate limiting

### Database
- **Database**: MongoDB Atlas
- **ODM**: Mongoose v7+
- **Indexing**: Compound indexes for performance

## 🏗️ Project Structure

```
project-root/
├── frontend/          # Next.js application
├── backend/           # Express.js application
├── docs/              # Documentation
├── postman/           # API collection
└── README.md
```

## 🔧 Setup Instructions

### Prerequisites
- Node.js v18 or higher
- MongoDB Atlas account (free tier)
- Git

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
PORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_256_bit_secret_key_minimum_32_characters_long
JWT_EXPIRE=24h
FRONTEND_URL=http://localhost:3000
```

4. Start the server:
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

Server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file:
```bash
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

Application will run on `http://localhost:3000`

## 📚 API Documentation

Detailed API documentation is available in [docs/API_DOCUMENTATION.md](docs/API_DOCUMENTATION.md)

### Quick Reference

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | User login | No |
| POST | `/api/auth/logout` | User logout | Yes |
| GET | `/api/users/profile` | Get user profile | Yes |
| PUT | `/api/users/profile` | Update profile | Yes |
| POST | `/api/tasks` | Create task | Yes |
| GET | `/api/tasks` | Get all tasks | Yes |
| GET | `/api/tasks/:id` | Get single task | Yes |
| PUT | `/api/tasks/:id` | Update task | Yes |
| DELETE | `/api/tasks/:id` | Delete task | Yes |

## 🧪 Testing

Import the Postman collection from `postman/collection.json` to test all API endpoints.

### Test Credentials
After registration, you can use your own credentials or create test accounts.

## 🚀 Deployment

### Frontend (Vercel)
1. Push code to GitHub
2. Import project in Vercel
3. Set environment variables
4. Deploy

### Backend (Render)
1. Create new Web Service
2. Connect GitHub repository
3. Set build command: `cd backend && npm install`
4. Set start command: `cd backend && npm start`
5. Add environment variables
6. Deploy

Detailed deployment instructions: [docs/DEPLOYMENT_GUIDE.md](docs/DEPLOYMENT_GUIDE.md)

## 📈 Scaling Strategy

The application is designed to scale efficiently:

- **Phase 1 (0-1K users)**: Current architecture - Free tier
- **Phase 2 (1K-10K users)**: Redis caching, paid MongoDB - $50-100/month
- **Phase 3 (10K-100K users)**: Load balancing, horizontal scaling - $500-1000/month
- **Phase 4 (100K+ users)**: Microservices, multi-region - $2000+/month

Full scaling strategy: [docs/SCALING_STRATEGY.md](docs/SCALING_STRATEGY.md)

## 🔒 Security Features

- Password hashing with bcrypt (10 salt rounds)
- JWT token authentication
- Rate limiting on auth endpoints (5 req/15min)
- Input validation on client and server
- CORS protection
- Security headers with Helmet.js
- NoSQL injection prevention

## 📊 Performance Metrics

- API response time: <200ms
- Database queries optimized with indexes
- Pagination support (max 100 items)
- Frontend bundle: <300KB initial load

## 🤝 Contributing

This is a demonstration project. For production use:
1. Implement refresh tokens
2. Add email verification
3. Set up proper logging (Winston)
4. Add comprehensive tests
5. Implement CI/CD pipeline

## 📄 License

MIT License - feel free to use this project for learning and development.

## 👨‍💻 Author

Built as a demonstration of enterprise-level full-stack development practices.

## 🔮 Future Enhancements

- [ ] Email verification and password reset
- [ ] OAuth2.0 integration (Google, GitHub)
- [ ] Real-time updates with WebSockets
- [ ] Task collaboration features
- [ ] File attachments
- [ ] Dashboard analytics
- [ ] Export to CSV/PDF
- [ ] Mobile app (React Native)

## 📞 Support

For questions or issues, please refer to the documentation in the `docs/` directory.
