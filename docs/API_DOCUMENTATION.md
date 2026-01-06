# API Documentation

## Base URL
```
Development: http://localhost:5000/api
Production: https://your-api-domain.com/api
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## Response Format

All API responses follow this standardized format:

**Success Response:**
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error message",
  "errors": [ ... ] // Optional validation errors
}
```

---

## Authentication Endpoints

### Register User
Create a new user account.

- **URL:** `/auth/register`
- **Method:** `POST`
- **Auth Required:** No
- **Rate Limit:** 5 requests / 15 minutes

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Validation Rules:**
- `name`: 2-100 characters, letters and spaces only
- `email`: Valid email format, unique
- `password`: Min 8 chars, 1 uppercase, 1 lowercase, 1 number

**Success Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "65f8a9b0c1234567890abcde",
      "email": "john@example.com",
      "name": "John Doe",
      "avatar": "/default-avatar.png",
      "isVerified": false
    },
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

**Error Responses:**
- `400`: Validation failed
- `409`: Email already registered
- `500`: Server error

---

### Login User
Authenticate user and receive JWT token.

- **URL:** `/auth/login`
- **Method:** `POST`
- **Auth Required:** No
- **Rate Limit:** 5 requests / 15 minutes

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "65f8a9b0c1234567890abcde",
      "email": "john@example.com",
      "name": "John Doe",
      "avatar": "/default-avatar.png",
      "isVerified": false
    },
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "expiresIn": "24h"
  }
}
```

**Error Responses:**
- `401`: Invalid credentials
- `400`: Validation failed
- `500`: Server error

---

### Logout User
Invalidate user session (client-side token removal).

- **URL:** `/auth/logout`
- **Method:** `POST`
- **Auth Required:** Yes

**Success Response (200):**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

---

### Get Current User
Retrieve authenticated user information.

- **URL:** `/auth/me`
- **Method:** `GET`
- **Auth Required:** Yes

**Success Response (200):**
```json
{
  "success": true,
  "message": "User retrieved successfully",
  "data": {
    "id": "65f8a9b0c1234567890abcde",
    "email": "john@example.com",
    "name": "John Doe",
    "avatar": "/default-avatar.png",
    "isVerified": false,
    "createdAt": "2026-01-05T10:30:00.000Z"
  }
}
```

---

## User Profile Endpoints

### Get User Profile
Fetch authenticated user's profile.

- **URL:** `/users/profile`
- **Method:** `GET`
- **Auth Required:** Yes

**Success Response (200):**
```json
{
  "success": true,
  "message": "Profile retrieved successfully",
  "data": {
    "id": "65f8a9b0c1234567890abcde",
    "email": "john@example.com",
    "name": "John Doe",
    "avatar": "/default-avatar.png",
    "isVerified": false,
    "createdAt": "2026-01-05T10:30:00.000Z",
    "updatedAt": "2026-01-05T10:30:00.000Z"
  }
}
```

---

### Update User Profile
Update user profile information.

- **URL:** `/users/profile`
- **Method:** `PUT`
- **Auth Required:** Yes

**Request Body:**
```json
{
  "name": "John Updated",
  "avatar": "https://example.com/avatar.jpg"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "id": "65f8a9b0c1234567890abcde",
    "email": "john@example.com",
    "name": "John Updated",
    "avatar": "https://example.com/avatar.jpg",
    "isVerified": false,
    "updatedAt": "2026-01-06T15:20:00.000Z"
  }
}
```

---

## Task Management Endpoints

### Create Task
Create a new task.

- **URL:** `/tasks`
- **Method:** `POST`
- **Auth Required:** Yes

**Request Body:**
```json
{
  "title": "Complete project documentation",
  "description": "Write API docs and scaling strategy",
  "status": "pending",
  "priority": "high",
  "dueDate": "2026-01-10T00:00:00.000Z"
}
```

**Validation Rules:**
- `title`: Required, max 200 characters
- `description`: Optional, max 1000 characters
- `status`: Optional, one of: pending, in-progress, completed
- `priority`: Optional, one of: low, medium, high
- `dueDate`: Optional, must be future date

**Success Response (201):**
```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "id": "65f8a9b0c1234567890abcdf",
    "title": "Complete project documentation",
    "description": "Write API docs and scaling strategy",
    "status": "pending",
    "priority": "high",
    "dueDate": "2026-01-10T00:00:00.000Z",
    "userId": "65f8a9b0c1234567890abcde",
    "createdAt": "2026-01-06T23:30:00.000Z",
    "updatedAt": "2026-01-06T23:30:00.000Z"
  }
}
```

---

### Get All Tasks
Retrieve all tasks for authenticated user with pagination and filters.

- **URL:** `/tasks`
- **Method:** `GET`
- **Auth Required:** Yes

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10, max: 100)
- `status`: Filter by status (pending, in-progress, completed)
- `priority`: Filter by priority (low, medium, high)
- `search`: Search in title and description
- `sortBy`: Sort field (default: createdAt)
- `order`: Sort order (asc, desc, default: desc)

**Example Request:**
```
GET /tasks?page=1&limit=10&status=pending&priority=high&search=project
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Tasks retrieved successfully",
  "data": {
    "tasks": [
      {
        "id": "65f8a9b0c1234567890abcdf",
        "title": "Complete project documentation",
        "description": "Write API docs",
        "status": "pending",
        "priority": "high",
        "dueDate": "2026-01-10T00:00:00.000Z",
        "createdAt": "2026-01-06T23:30:00.000Z",
        "updatedAt": "2026-01-06T23:30:00.000Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 3,
      "totalItems": 25,
      "limit": 10,
      "hasNextPage": true,
      "hasPrevPage": false
    }
  }
}
```

---

### Get Task by ID
Retrieve a single task by ID.

- **URL:** `/tasks/:id`
- **Method:** `GET`
- **Auth Required:** Yes

**Success Response (200):**
```json
{
  "success": true,
  "message": "Task retrieved successfully",
  "data": {
    "id": "65f8a9b0c1234567890abcdf",
    "title": "Complete project documentation",
    "description": "Write API docs and scaling strategy",
    "status": "pending",
    "priority": "high",
    "dueDate": "2026-01-10T00:00:00.000Z",
    "userId": "65f8a9b0c1234567890abcde",
    "createdAt": "2026-01-06T23:30:00.000Z",
    "updatedAt": "2026-01-06T23:30:00.000Z"
  }
}
```

**Error Responses:**
- `404`: Task not found
- `403`: Unauthorized (task belongs to another user)

---

### Update Task
Update an existing task.

- **URL:** `/tasks/:id`
- **Method:** `PUT`
- **Auth Required:** Yes

**Request Body (partial update allowed):**
```json
{
  "status": "completed",
  "priority": "medium"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Task updated successfully",
  "data": {
    "id": "65f8a9b0c1234567890abcdf",
    "title": "Complete project documentation",
    "description": "Write API docs and scaling strategy",
    "status": "completed",
    "priority": "medium",
    "dueDate": "2026-01-10T00:00:00.000Z",
    "updatedAt": "2026-01-06T23:45:00.000Z"
  }
}
```

---

### Delete Task
Delete a task.

- **URL:** `/tasks/:id`
- **Method:** `DELETE`
- **Auth Required:** Yes

**Success Response (200):**
```json
{
  "success": true,
  "message": "Task deleted successfully"
}
```

---

### Get Task Statistics
Retrieve task statistics for the authenticated user.

- **URL:** `/tasks/stats`
- **Method:** `GET`
- **Auth Required:** Yes

**Success Response (200):**
```json
{
  "success": true,
  "message": "Statistics retrieved successfully",
  "data": {
    "total": 25,
    "pending": 10,
    "inProgress": 8,
    "completed": 7,
    "high": 5,
    "medium": 12,
    "low": 8
  }
}
```

---

## Error Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Validation error |
| 401 | Unauthorized - Invalid or expired token |
| 403 | Forbidden - Access denied |
| 404 | Not Found - Resource not found |
| 409 | Conflict - Resource already exists |
| 429 | Too Many Requests - Rate limit exceeded |
| 500 | Internal Server Error - Server error |

---

## Rate Limiting

- **Auth endpoints:** 5 requests / 15 minutes per IP
- **General API:** 100 requests / 15 minutes per IP

When rate limit is exceeded, the API returns:
```json
{
  "success": false,
  "message": "Too many requests. Please try again after 15 minutes."
}
```

Headers included:
- `RateLimit-Limit`: Maximum requests allowed
- `RateLimit-Remaining`: Requests remaining
- `RateLimit-Reset`: Time when limit resets
- `Retry-After`: Seconds until retry allowed
