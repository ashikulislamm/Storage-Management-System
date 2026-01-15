# 📦 Jotter - A Storage Management System

A comprehensive **Google Drive-like Storage Management System** backend API built with Node.js, Express, and MongoDB. This system provides secure file storage, folder organization, file sharing, favorites management, and activity tracking capabilities.

![Node.js](https://img.shields.io/badge/Node.js-22.17.0-green)
![Express](https://img.shields.io/badge/Express-5.x-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)
![License](https://img.shields.io/badge/License-MIT-yellow)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Authentication Flow](#authentication-flow)
- [Testing](#testing)
- [Deployment](#deployment)
- [License](#license)

---

## 🎯 Overview

The **Storage Management System** is a RESTful API backend that mimics core functionalities of cloud storage services like Google Drive or Dropbox. It allows users to:

- **Authenticate** securely with JWT tokens
- **Upload** multiple file types (images, PDFs, notes)
- **Organize** files into hierarchical folder structures
- **Share** files and folders with other users (view/edit permissions)
- **Mark** items as favorites for quick access
- **Track** all activities with detailed logging and calendar views

This project follows **modern best practices** including ES6 modules, modular architecture, comprehensive error handling, input validation, and secure authentication.

---

## ✨ Features

### 🔐 Authentication & Authorization
- JWT-based authentication with secure token generation
- Password hashing with bcryptjs
- Protected routes with middleware validation
- Token expiration handling (30 days default)

### 📁 File Management
- **Multiple file type support:**
  - Images: JPEG, JPG, PNG, GIF, WEBP (max 10MB)
  - PDFs: Document storage (max 10MB)
  - Notes: Text-based note creation
- File upload with Multer middleware
- File rename, duplicate, and delete operations
- Folder-based file organization
- File metadata tracking (size, type, upload date)

### 📂 Folder Management
- Create nested folder structures (parent-child relationships)
- Rename, duplicate, and delete folders
- Get folder contents (subfolders and files)
- Hierarchical folder navigation

### 🔗 Sharing & Collaboration
- Share files/folders with other users via email
- Two permission levels:
  - **View:** Read-only access
  - **Edit:** Full modification rights
- View shared items (shared with me)
- Track your own shares (my shares)
- Revoke share access

### ⭐ Favorites System
- Add files/folders to favorites
- Remove items from favorites
- Quick access to favorite items
- Separate categorization (files vs folders)

### 📊 Activity Tracking
- Comprehensive activity logging for all actions:
  - Create, Upload, Rename, Duplicate, Delete
  - Share, Favorite, Unfavorite, Download
- Filter activities by date or date range
- Calendar view with activity aggregation
- User-specific activity history

---

## 🏗️ Architecture

### System Architecture

```
┌─────────────────┐
│   Client App    │
│  (Frontend/API) │
└────────┬────────┘
         │
         │ HTTP/HTTPS
         │
┌────────▼─────────────────────────────────────┐
│          Express.js Application              │
│                                              │
│  ┌──────────────────────────────────────┐  │
│  │      Middleware Layer                │  │
│  │  • CORS                              │  │
│  │  • Body Parser                       │  │
│  │  • JWT Authentication                │  │
│  │  • File Upload (Multer)              │  │
│  │  • Error Handling                    │  │
│  └──────────────────────────────────────┘  │
│                                              │
│  ┌──────────────────────────────────────┐  │
│  │      Modular Route Handlers          │  │
│  │  • Auth Routes                       │  │
│  │  • User Routes                       │  │
│  │  • File Routes                       │  │
│  │  • Folder Routes                     │  │
│  │  • Share Routes                      │  │
│  │  • Favorite Routes                   │  │
│  │  • Activity Routes                   │  │
│  └──────────────────────────────────────┘  │
│                                              │
│  ┌──────────────────────────────────────┐  │
│  │      Business Logic Layer            │  │
│  │  • Controllers                       │  │
│  │  • Services                          │  │
│  │  • Validators                        │  │
│  └──────────────────────────────────────┘  │
│                                              │
│  ┌──────────────────────────────────────┐  │
│  │      Data Access Layer               │  │
│  │  • Mongoose Models                   │  │
│  │  • Schema Definitions                │  │
│  └──────────────────────────────────────┘  │
└──────────────┬───────────────────────────────┘
               │
               │ Mongoose ODM
               │
┌──────────────▼───────────────────────────────┐
│         MongoDB Atlas (Cloud Database)       │
│  • Users Collection                          │
│  • Files Collection                          │
│  • Folders Collection                        │
│  • Shares Collection                         │
│  • Favorites Collection                      │
│  • Activities Collection                     │
└──────────────────────────────────────────────┘

┌──────────────────────────────────────────────┐
│         File Storage System                  │
│  • uploads/images/                           │
│  • uploads/pdfs/                             │
│  • uploads/temp/                             │
└──────────────────────────────────────────────┘
```

### Module Architecture

The project follows a **feature-based modular architecture**:

```
modules/
  ├── auth/          # Authentication module
  │   ├── auth.controller.js
  │   ├── auth.service.js
  │   ├── auth.routes.js
  │   └── auth.validation.js
  │
  ├── users/         # User management module
  │   ├── user.model.js
  │   ├── user.controller.js
  │   ├── user.service.js
  │   ├── user.routes.js
  │   └── user.validation.js
  │
  ├── files/         # File operations module
  ├── folders/       # Folder operations module
  ├── share/         # Sharing functionality module
  ├── favorites/     # Favorites system module
  └── activity/      # Activity tracking module
```

**Benefits:**
- **Separation of Concerns:** Each module handles its own domain logic
- **Scalability:** Easy to add new features as separate modules
- **Maintainability:** Isolated code for testing and debugging
- **Reusability:** Services can be shared across modules

---

## 🛠️ Tech Stack

### Core Technologies
- **Runtime:** Node.js v22.17.0
- **Framework:** Express.js v5.x
- **Database:** MongoDB Atlas (Cloud)
- **ODM:** Mongoose v8.x

### Authentication & Security
- **jsonwebtoken:** JWT token generation and verification
- **bcryptjs:** Password hashing and comparison
- **dotenv:** Environment variable management

### File Handling
- **multer:** File upload middleware
- **fs/promises:** Async file system operations

### Validation & Error Handling
- **express-validator:** Request validation
- **express-error-toolkit:** Centralized error handling
- **http-status-toolkit:** HTTP status code management

### Development Tools
- **nodemon:** Auto-restart on file changes
- **ES6 Modules:** Modern import/export syntax
- **CORS:** Cross-Origin Resource Sharing enabled

---
## 🚀 Installation

### Prerequisites

- **Node.js:** v18.0.0 or higher (v22.17.0 recommended)
- **MongoDB:** MongoDB Atlas account (or local MongoDB instance)
- **npm/yarn/pnpm:** Package manager

### Step-by-Step Setup

1. **Clone the repository:**

```bash
git clone <repository-url>
cd "Storage Management System"
```

2. **Install dependencies:**

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Set up environment variables:**

```bash
# Copy the example environment file
cp .env.example .env

# Edit .env with your configuration
nano .env  # or use any text editor
```

4. **Create upload directories:**

```bash
mkdir -p uploads/images uploads/pdfs uploads/temp
mkdir -p logs
```

5. **Start MongoDB:**

- **Option A:** Use MongoDB Atlas (Cloud) - Update `MONGODB_URI` in `.env`
- **Option B:** Local MongoDB - Ensure MongoDB service is running

6. **Run the application:**

**Development mode (with auto-restart):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

7. **Verify installation:**

```bash
# Health check endpoint
curl http://localhost:3000/health

# Expected response:
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2026-01-15T10:00:00.000Z"
}
```

---

## 🔧 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
NODE_ENV=development
PORT=3000

# Database Configuration
MONGODB_URI=Your DB URL Here

# JWT Configuration
JWT_SECRET=your_super_secure_jwt_secret_key_change_this
JWT_EXPIRE=30d

# File Upload Configuration
MAX_FILE_SIZE=10485760
UPLOAD_PATH=./uploads

# Logging Configuration (Optional)
LOG_LEVEL=info
```

### Environment Variable Details

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `NODE_ENV` | Application environment | `development` | No |
| `PORT` | Server port number | `3000` | No |
| `MONGODB_URI` | MongoDB connection string | - | **Yes** |
| `JWT_SECRET` | Secret key for JWT signing | - | **Yes** |
| `JWT_EXPIRE` | JWT token expiration time | `30d` | No |
| `MAX_FILE_SIZE` | Max file upload size (bytes) | `10485760` (10MB) | No |
| `UPLOAD_PATH` | File upload directory | `./uploads` | No |

### MongoDB URI Format

**Important Security Notes:**
- Never commit `.env` file to version control
- Use strong, unique JWT secrets in production
- Rotate JWT secrets periodically
- Use environment-specific `.env` files

---

## 🔌 API Endpoints

### Base URL
```
http://localhost:3000/api
```

### Quick Reference

| Module | Endpoint | Method | Auth | Description |
|--------|----------|--------|------|-------------|
| **Auth** | `/auth/signup` | POST | No | Register new user |
| | `/auth/login` | POST | No | User login |
| | `/auth/logout` | POST | Yes | User logout |
| **Users** | `/users/profile` | GET | Yes | Get user profile |
| | `/users/profile` | PUT | Yes | Update profile |
| | `/users/profile` | DELETE | Yes | Delete account |
| **Files** | `/files/upload/image` | POST | Yes | Upload image |
| | `/files/upload/pdf` | POST | Yes | Upload PDF |
| | `/files/note` | POST | Yes | Create note |
| | `/files` | GET | Yes | Get all files |
| | `/files/:id` | GET | Yes | Get single file |
| | `/files/:id/rename` | PUT | Yes | Rename file |
| | `/files/:id/duplicate` | POST | Yes | Duplicate file |
| | `/files/:id` | DELETE | Yes | Delete file |
| **Folders** | `/folders` | POST | Yes | Create folder |
| | `/folders` | GET | Yes | Get all folders |
| | `/folders/:id` | GET | Yes | Get single folder |
| | `/folders/:id/contents` | GET | Yes | Get folder contents |
| | `/folders/:id/rename` | PUT | Yes | Rename folder |
| | `/folders/:id/duplicate` | POST | Yes | Duplicate folder |
| | `/folders/:id` | DELETE | Yes | Delete folder |
| **Share** | `/shares/file/:id` | POST | Yes | Share file |
| | `/shares/folder/:id` | POST | Yes | Share folder |
| | `/shares/shared-with-me` | GET | Yes | Items shared with me |
| | `/shares/my-shares` | GET | Yes | My shared items |
| | `/shares/:id` | DELETE | Yes | Revoke share |
| **Favorites** | `/favorites/file/:id` | POST | Yes | Add file to favorites |
| | `/favorites/folder/:id` | POST | Yes | Add folder to favorites |
| | `/favorites/file/:id` | DELETE | Yes | Remove file from favorites |
| | `/favorites/folder/:id` | DELETE | Yes | Remove folder from favorites |
| | `/favorites` | GET | Yes | Get all favorites |
| **Activity** | `/activities` | GET | Yes | Get all activities |
| | `/activities/date/:date` | GET | Yes | Get activities by date |
| | `/activities/range` | GET | Yes | Get activities by range |
| | `/activities/calendar` | GET | Yes | Get calendar data |

### 📖 Complete API Documentation

For detailed API documentation with request/response examples, validation rules, and error handling, see:

**[API_TESTING_GUIDE.md](./API_TESTING_GUIDE.md)**

The comprehensive guide includes:
- Detailed request/response examples for all endpoints
- Authentication flow
- Error response formats
- Postman collection setup
- cURL command examples
- Testing checklist

---

## 🔐 Authentication Flow

### Registration Flow
```
1. User submits registration form (username, email, password)
   ↓
2. System validates input (format, uniqueness)
   ↓
3. Password is hashed using bcryptjs
   ↓
4. User record is created in database
   ↓
5. JWT token is generated and returned
   ↓
6. Client stores token (localStorage/cookies)
```

### Login Flow
```
1. User submits login credentials (email, password)
   ↓
2. System finds user by email
   ↓
3. Password is compared with hashed password
   ↓
4. If valid, JWT token is generated
   ↓
5. Token and user data are returned
   ↓
6. Client stores token for subsequent requests
```

### Protected Route Access
```
1. Client sends request with Authorization header
   ↓
2. Auth middleware extracts and verifies JWT token
   ↓
3. If valid, user data is attached to request
   ↓
4. Request proceeds to controller
   ↓
5. If invalid/expired, 401 error is returned
```

### JWT Token Structure
```javascript
{
  "id": "user_mongodb_id",
  "iat": 1642245600,  // Issued at
  "exp": 1644837600   // Expires at
}
```

**Token Usage:**
```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 🧪 Testing

### Manual Testing with Postman

1. **Import Postman Collection:**
   - A ready-to-use Postman collection is available: `Storage Management System API.postman_collection.json`
   - Import this file into Postman

2. **Set up environment variables:**
   ```
   baseUrl: http://localhost:3000
   token: (auto-filled after login)
   ```

3. **Test flow:**
   ```
   Step 1: Auth/Signup API → Register user → Copy token
   Step 2: Auth/Login API → Login → Copy token
   Step 3: Users/Profile API → Test authentication
   Step 4: Folders/Create Folder → Create test folder
   Step 5: Files/Upload Image → Upload test file
   Step 6: Test other endpoints
   ```

### Using cURL

**Register:**
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Get Profile:**
```bash
curl -X GET http://localhost:3000/api/users/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Testing Checklist

- [ ] User can register with valid credentials
- [ ] User cannot register with existing email
- [ ] User can login with correct credentials
- [ ] User cannot login with wrong password
- [ ] Protected routes reject requests without token
- [ ] Protected routes accept requests with valid token
- [ ] Files can be uploaded successfully
- [ ] Folders can be created and organized
- [ ] Files can be shared with other users
- [ ] Favorites can be added and removed
- [ ] Activities are logged correctly
- [ ] Error responses are formatted correctly

---

## 🚢 Deployment

### Deployment Options

#### 1. **Heroku**

```bash
# Install Heroku CLI
npm install -g heroku

# Login to Heroku
heroku login

# Create Heroku app
heroku create your-app-name

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_jwt_secret

# Deploy
git push heroku main

# Open app
heroku open
```

#### 2. **Railway**

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize project
railway init

# Deploy
railway up
```

#### 3. **Render**

1. Connect GitHub repository
2. Set environment variables in dashboard
3. Deploy automatically on push

#### 4. **DigitalOcean App Platform**

1. Connect GitHub repository
2. Configure build and run commands
3. Set environment variables
4. Deploy

### Pre-Deployment Checklist

- [ ] Update `.env` with production values
- [ ] Set `NODE_ENV=production`
- [ ] Use strong JWT secret
- [ ] Configure CORS for production domain
- [ ] Set up MongoDB Atlas with production cluster
- [ ] Configure file upload limits
- [ ] Set up logging (Winston with file rotation)
- [ ] Configure SSL/HTTPS
- [ ] Test all API endpoints
- [ ] Set up monitoring (PM2, New Relic, etc.)

### Production Environment Variables

```env
NODE_ENV=production
PORT=3000
MONGODB_URI=your_production_mongodb_uri
JWT_SECRET=your_production_jwt_secret
JWT_EXPIRE=30d
MAX_FILE_SIZE=10485760
UPLOAD_PATH=./uploads
CORS_ORIGIN=https://yourdomain.com
```

---
## 📝 License

This project is licensed under the **MIT License**.

## 🙏 Acknowledgments

- Express.js community for excellent documentation
- MongoDB team for Atlas cloud database
- All contributors and users of this project

---
