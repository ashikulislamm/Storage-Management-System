# Storage Management System - Complete API Testing Guide

## 📋 Table of Contents
- [Overview](#overview)
- [Base URL & Setup](#base-url--setup)
- [Authentication](#authentication)
- [API Endpoints](#api-endpoints)
  - [Auth Module](#1-auth-module)
  - [Users Module](#2-users-module)
  - [Files Module](#3-files-module)
  - [Folders Module](#4-folders-module)
  - [Share Module](#5-share-module)
  - [Favorites Module](#6-favorites-module)
  - [Activity Module](#7-activity-module)
- [Error Responses](#error-responses)
- [Testing Tools](#testing-tools)

---

## Overview

This is a Google Drive-like Storage Management System API that allows users to:
- Register and authenticate
- Upload and manage files (images, PDFs, notes)
- Create and organize folders
- Share files/folders with other users
- Mark items as favorites
- Track all activities

---

## Base URL & Setup

**Local Development:**
```
http://localhost:3000
```

**API Base Path:**
```
http://localhost:3000/api
```

**Health Check:**
```http
GET http://localhost:3000/health
```

**Response:**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2026-01-15T13:00:00.000Z"
}
```

---

## Authentication

Most endpoints require authentication using JWT tokens. Include the token in the `Authorization` header:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## API Endpoints

### 1. Auth Module

#### 1.1 User Registration (Signup)

**Endpoint:** `POST /api/auth/signup`

**Headers:**
```http
Content-Type: application/json
```

**Request Body:**
```json
{
  "username": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "username": "John Doe",
      "email": "john@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Validation Requirements:**
- Username: 3-30 characters
- Email: Valid email format
- Password: Minimum 6 characters

---

#### 1.2 User Login

**Endpoint:** `POST /api/auth/login`

**Headers:**
```http
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "username": "John Doe",
      "email": "john@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Response (401):**
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

---

#### 1.3 User Logout

**Endpoint:** `POST /api/auth/logout`

**Headers:**
```http
Authorization: Bearer YOUR_JWT_TOKEN
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

---

### 2. Users Module

#### 2.1 Get User Profile

**Endpoint:** `GET /api/users/profile`

**Headers:**
```http
Authorization: Bearer YOUR_JWT_TOKEN
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Profile retrieved successfully",
  "data": {
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "username": "John Doe",
      "email": "john@example.com",
      "createdAt": "2026-01-15T10:00:00.000Z",
      "updatedAt": "2026-01-15T10:00:00.000Z"
    }
  }
}
```

---

#### 2.2 Update User Profile

**Endpoint:** `PUT /api/users/profile`

**Headers:**
```http
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

**Request Body:**
```json
{
  "username": "John Smith"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "username": "John Smith",
      "email": "john@example.com"
    }
  }
}
```

---

#### 2.3 Delete User Account

**Endpoint:** `DELETE /api/users/profile`

**Headers:**
```http
Authorization: Bearer YOUR_JWT_TOKEN
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Account deleted successfully"
}
```

---

### 3. Files Module

#### 3.1 Upload Image

**Endpoint:** `POST /api/files/upload/image`

**Headers:**
```http
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: multipart/form-data
```

**Form Data:**
- `file`: Image file (jpeg, jpg, png, gif, webp)
- `folderId`: (optional) Folder ID to upload to

**Success Response (201):**
```json
{
  "success": true,
  "message": "File uploaded successfully",
  "data": {
    "file": {
      "_id": "507f1f77bcf86cd799439012",
      "name": "profile.jpg",
      "type": "image",
      "path": "./uploads/images/file-1642245600000-123456789.jpg",
      "size": 2048000,
      "mimeType": "image/jpeg",
      "owner": "507f1f77bcf86cd799439011",
      "folder": null,
      "createdAt": "2026-01-15T10:00:00.000Z"
    }
  }
}
```

**Allowed Image Types:**
- image/jpeg
- image/jpg
- image/png
- image/gif
- image/webp

**Max File Size:** 10MB

---

#### 3.2 Upload PDF

**Endpoint:** `POST /api/files/upload/pdf`

**Headers:**
```http
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: multipart/form-data
```

**Form Data:**
- `file`: PDF file
- `folderId`: (optional) Folder ID to upload to

**Success Response (201):**
```json
{
  "success": true,
  "message": "File uploaded successfully",
  "data": {
    "file": {
      "_id": "507f1f77bcf86cd799439013",
      "name": "document.pdf",
      "type": "pdf",
      "path": "./uploads/pdfs/file-1642245600000-123456789.pdf",
      "size": 5120000,
      "mimeType": "application/pdf",
      "owner": "507f1f77bcf86cd799439011",
      "folder": null,
      "createdAt": "2026-01-15T10:00:00.000Z"
    }
  }
}
```

---

#### 3.3 Create Note

**Endpoint:** `POST /api/files/note`

**Headers:**
```http
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Meeting Notes",
  "content": "Important points from the meeting...",
  "folderId": "507f1f77bcf86cd799439014"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "File created successfully",
  "data": {
    "file": {
      "_id": "507f1f77bcf86cd799439015",
      "name": "Meeting Notes",
      "type": "note",
      "content": "Important points from the meeting...",
      "size": 0,
      "owner": "507f1f77bcf86cd799439011",
      "folder": "507f1f77bcf86cd799439014",
      "createdAt": "2026-01-15T10:00:00.000Z"
    }
  }
}
```

---

#### 3.4 Get All Files

**Endpoint:** `GET /api/files`

**Headers:**
```http
Authorization: Bearer YOUR_JWT_TOKEN
```

**Query Parameters:**
- `folderId`: (optional) Filter files by folder

**Example:**
```
GET /api/files?folderId=507f1f77bcf86cd799439014
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Files retrieved successfully",
  "data": {
    "files": [
      {
        "_id": "507f1f77bcf86cd799439012",
        "name": "profile.jpg",
        "type": "image",
        "size": 2048000,
        "mimeType": "image/jpeg",
        "owner": "507f1f77bcf86cd799439011",
        "folder": null,
        "createdAt": "2026-01-15T10:00:00.000Z"
      }
    ]
  }
}
```

---

#### 3.5 Get Single File

**Endpoint:** `GET /api/files/:fileId`

**Headers:**
```http
Authorization: Bearer YOUR_JWT_TOKEN
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "File retrieved successfully",
  "data": {
    "file": {
      "_id": "507f1f77bcf86cd799439012",
      "name": "profile.jpg",
      "type": "image",
      "path": "./uploads/images/file-1642245600000-123456789.jpg",
      "size": 2048000,
      "mimeType": "image/jpeg",
      "owner": "507f1f77bcf86cd799439011",
      "folder": null,
      "createdAt": "2026-01-15T10:00:00.000Z"
    }
  }
}
```

---

#### 3.6 Rename File

**Endpoint:** `PUT /api/files/:fileId/rename`

**Headers:**
```http
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "new-profile.jpg"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "File updated successfully",
  "data": {
    "file": {
      "_id": "507f1f77bcf86cd799439012",
      "name": "new-profile.jpg",
      "type": "image"
    }
  }
}
```

---

#### 3.7 Duplicate File

**Endpoint:** `POST /api/files/:fileId/duplicate`

**Headers:**
```http
Authorization: Bearer YOUR_JWT_TOKEN
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Item duplicated successfully",
  "data": {
    "file": {
      "_id": "507f1f77bcf86cd799439016",
      "name": "profile.jpg - Copy",
      "type": "image"
    }
  }
}
```

---

#### 3.8 Delete File

**Endpoint:** `DELETE /api/files/:fileId`

**Headers:**
```http
Authorization: Bearer YOUR_JWT_TOKEN
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "File deleted successfully"
}
```

---

### 4. Folders Module

#### 4.1 Create Folder

**Endpoint:** `POST /api/folders`

**Headers:**
```http
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Documents",
  "parentId": null
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Folder created successfully",
  "data": {
    "folder": {
      "_id": "507f1f77bcf86cd799439017",
      "name": "Documents",
      "owner": "507f1f77bcf86cd799439011",
      "parent": null,
      "createdAt": "2026-01-15T10:00:00.000Z"
    }
  }
}
```

---

#### 4.2 Get All Folders

**Endpoint:** `GET /api/folders`

**Headers:**
```http
Authorization: Bearer YOUR_JWT_TOKEN
```

**Query Parameters:**
- `parentId`: (optional) Filter folders by parent

**Success Response (200):**
```json
{
  "success": true,
  "message": "Folders retrieved successfully",
  "data": {
    "folders": [
      {
        "_id": "507f1f77bcf86cd799439017",
        "name": "Documents",
        "owner": "507f1f77bcf86cd799439011",
        "parent": null,
        "createdAt": "2026-01-15T10:00:00.000Z"
      }
    ]
  }
}
```

---

#### 4.3 Get Single Folder

**Endpoint:** `GET /api/folders/:folderId`

**Headers:**
```http
Authorization: Bearer YOUR_JWT_TOKEN
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Folder retrieved successfully",
  "data": {
    "folder": {
      "_id": "507f1f77bcf86cd799439017",
      "name": "Documents",
      "owner": "507f1f77bcf86cd799439011",
      "parent": null,
      "createdAt": "2026-01-15T10:00:00.000Z"
    }
  }
}
```

---

#### 4.4 Get Folder Contents

**Endpoint:** `GET /api/folders/:folderId/contents`

**Headers:**
```http
Authorization: Bearer YOUR_JWT_TOKEN
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Folder contents retrieved successfully",
  "data": {
    "folder": {
      "_id": "507f1f77bcf86cd799439017",
      "name": "Documents"
    },
    "subfolders": [
      {
        "_id": "507f1f77bcf86cd799439018",
        "name": "Work"
      }
    ],
    "files": [
      {
        "_id": "507f1f77bcf86cd799439012",
        "name": "resume.pdf",
        "type": "pdf"
      }
    ]
  }
}
```

---

#### 4.5 Rename Folder

**Endpoint:** `PUT /api/folders/:folderId/rename`

**Headers:**
```http
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Personal Documents"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Folder updated successfully",
  "data": {
    "folder": {
      "_id": "507f1f77bcf86cd799439017",
      "name": "Personal Documents"
    }
  }
}
```

---

#### 4.6 Duplicate Folder

**Endpoint:** `POST /api/folders/:folderId/duplicate`

**Headers:**
```http
Authorization: Bearer YOUR_JWT_TOKEN
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Folder duplicated successfully",
  "data": {
    "folder": {
      "_id": "507f1f77bcf86cd799439019",
      "name": "Documents - Copy"
    }
  }
}
```

---

#### 4.7 Delete Folder

**Endpoint:** `DELETE /api/folders/:folderId`

**Headers:**
```http
Authorization: Bearer YOUR_JWT_TOKEN
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Folder deleted successfully"
}
```

---

### 5. Share Module

#### 5.1 Share File

**Endpoint:** `POST /api/shares/file/:fileId`

**Headers:**
```http
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

**Request Body:**
```json
{
  "sharedWithEmail": "jane@example.com",
  "permission": "view"
}
```

**Permissions:**
- `view`: Can only view the file
- `edit`: Can view and edit the file

**Success Response (201):**
```json
{
  "success": true,
  "message": "Item shared successfully",
  "data": {
    "share": {
      "_id": "507f1f77bcf86cd79943901a",
      "sharedBy": "507f1f77bcf86cd799439011",
      "sharedWith": "507f1f77bcf86cd79943901b",
      "itemType": "file",
      "itemId": "507f1f77bcf86cd799439012",
      "permission": "view",
      "createdAt": "2026-01-15T10:00:00.000Z"
    }
  }
}
```

---

#### 5.2 Share Folder

**Endpoint:** `POST /api/shares/folder/:folderId`

**Headers:**
```http
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

**Request Body:**
```json
{
  "sharedWithEmail": "jane@example.com",
  "permission": "edit"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Item shared successfully",
  "data": {
    "share": {
      "_id": "507f1f77bcf86cd79943901c",
      "sharedBy": "507f1f77bcf86cd799439011",
      "sharedWith": "507f1f77bcf86cd79943901b",
      "itemType": "folder",
      "itemId": "507f1f77bcf86cd799439017",
      "permission": "edit",
      "createdAt": "2026-01-15T10:00:00.000Z"
    }
  }
}
```

---

#### 5.3 Get Shared With Me

**Endpoint:** `GET /api/shares/shared-with-me`

**Headers:**
```http
Authorization: Bearer YOUR_JWT_TOKEN
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "My shares retrieved successfully",
  "data": {
    "shares": {
      "files": [
        {
          "_id": "507f1f77bcf86cd799439012",
          "name": "shared-document.pdf",
          "type": "pdf",
          "shareInfo": {
            "id": "507f1f77bcf86cd79943901a",
            "sharedBy": {
              "_id": "507f1f77bcf86cd79943901b",
              "username": "Jane Doe",
              "email": "jane@example.com"
            },
            "permission": "view",
            "sharedAt": "2026-01-15T10:00:00.000Z"
          }
        }
      ],
      "folders": []
    }
  }
}
```

---

#### 5.4 Get My Shares

**Endpoint:** `GET /api/shares/my-shares`

**Headers:**
```http
Authorization: Bearer YOUR_JWT_TOKEN
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "My shares retrieved successfully",
  "data": {
    "shares": [
      {
        "_id": "507f1f77bcf86cd79943901a",
        "sharedWith": {
          "_id": "507f1f77bcf86cd79943901b",
          "username": "Jane Doe",
          "email": "jane@example.com"
        },
        "itemType": "file",
        "itemId": "507f1f77bcf86cd799439012",
        "permission": "view",
        "createdAt": "2026-01-15T10:00:00.000Z"
      }
    ]
  }
}
```

---

#### 5.5 Revoke Share

**Endpoint:** `DELETE /api/shares/:shareId`

**Headers:**
```http
Authorization: Bearer YOUR_JWT_TOKEN
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Share access revoked successfully"
}
```

---

### 6. Favorites Module

#### 6.1 Add File to Favorites

**Endpoint:** `POST /api/favorites/file/:fileId`

**Headers:**
```http
Authorization: Bearer YOUR_JWT_TOKEN
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Item added to favorites",
  "data": {
    "favorite": {
      "_id": "507f1f77bcf86cd79943901d",
      "user": "507f1f77bcf86cd799439011",
      "itemType": "file",
      "itemId": "507f1f77bcf86cd799439012",
      "createdAt": "2026-01-15T10:00:00.000Z"
    }
  }
}
```

---

#### 6.2 Add Folder to Favorites

**Endpoint:** `POST /api/favorites/folder/:folderId`

**Headers:**
```http
Authorization: Bearer YOUR_JWT_TOKEN
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Item added to favorites",
  "data": {
    "favorite": {
      "_id": "507f1f77bcf86cd79943901e",
      "user": "507f1f77bcf86cd799439011",
      "itemType": "folder",
      "itemId": "507f1f77bcf86cd799439017",
      "createdAt": "2026-01-15T10:00:00.000Z"
    }
  }
}
```

---

#### 6.3 Remove File from Favorites

**Endpoint:** `DELETE /api/favorites/file/:fileId`

**Headers:**
```http
Authorization: Bearer YOUR_JWT_TOKEN
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Item removed from favorites"
}
```

---

#### 6.4 Remove Folder from Favorites

**Endpoint:** `DELETE /api/favorites/folder/:folderId`

**Headers:**
```http
Authorization: Bearer YOUR_JWT_TOKEN
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Item removed from favorites"
}
```

---

#### 6.5 Get All Favorites

**Endpoint:** `GET /api/favorites`

**Headers:**
```http
Authorization: Bearer YOUR_JWT_TOKEN
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Favorites retrieved successfully",
  "data": {
    "files": [
      {
        "_id": "507f1f77bcf86cd799439012",
        "name": "important.pdf",
        "type": "pdf",
        "favoritedAt": "2026-01-15T10:00:00.000Z"
      }
    ],
    "folders": [
      {
        "_id": "507f1f77bcf86cd799439017",
        "name": "Projects",
        "favoritedAt": "2026-01-15T10:00:00.000Z"
      }
    ]
  }
}
```

---

### 7. Activity Module

#### 7.1 Get All Activities

**Endpoint:** `GET /api/activities`

**Headers:**
```http
Authorization: Bearer YOUR_JWT_TOKEN
```

**Query Parameters:**
- `limit`: (optional) Number of activities to return (default: 50)

**Example:**
```
GET /api/activities?limit=20
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Activities retrieved successfully",
  "data": {
    "activities": [
      {
        "_id": "507f1f77bcf86cd79943901f",
        "user": "507f1f77bcf86cd799439011",
        "action": "upload",
        "itemType": "file",
        "itemId": "507f1f77bcf86cd799439012",
        "itemName": "document.pdf",
        "details": {
          "fileType": "pdf"
        },
        "createdAt": "2026-01-15T10:00:00.000Z"
      }
    ]
  }
}
```

**Activity Actions:**
- `create`: Created a folder or note
- `upload`: Uploaded a file
- `rename`: Renamed an item
- `duplicate`: Duplicated an item
- `delete`: Deleted an item
- `share`: Shared an item
- `favorite`: Added to favorites
- `unfavorite`: Removed from favorites
- `download`: Downloaded a file

---

#### 7.2 Get Activities by Date

**Endpoint:** `GET /api/activities/date/:date`

**Headers:**
```http
Authorization: Bearer YOUR_JWT_TOKEN
```

**Date Format:** `YYYY-MM-DD`

**Example:**
```
GET /api/activities/date/2026-01-15
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Activities retrieved successfully",
  "data": {
    "date": "2026-01-15",
    "count": 5,
    "activities": [...]
  }
}
```

---

#### 7.3 Get Activities by Date Range

**Endpoint:** `GET /api/activities/range`

**Headers:**
```http
Authorization: Bearer YOUR_JWT_TOKEN
```

**Query Parameters:**
- `startDate`: Start date (YYYY-MM-DD)
- `endDate`: End date (YYYY-MM-DD)

**Example:**
```
GET /api/activities/range?startDate=2026-01-01&endDate=2026-01-31
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Activities retrieved successfully",
  "data": {
    "startDate": "2026-01-01",
    "endDate": "2026-01-31",
    "count": 25,
    "activities": [...]
  }
}
```

---

#### 7.4 Get Calendar Data

**Endpoint:** `GET /api/activities/calendar`

**Headers:**
```http
Authorization: Bearer YOUR_JWT_TOKEN
```

**Query Parameters:**
- `year`: Year (optional, default: current year)
- `month`: Month (optional, default: current month)

**Example:**
```
GET /api/activities/calendar?year=2026&month=1
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Calendar data retrieved successfully",
  "data": {
    "year": 2026,
    "month": 1,
    "calendar": [
      {
        "date": "2026-01-15",
        "count": 5,
        "activities": [
          {
            "id": "507f1f77bcf86cd79943901f",
            "action": "upload",
            "itemType": "file",
            "itemName": "document.pdf",
            "time": "2026-01-15T10:00:00.000Z"
          }
        ]
      }
    ]
  }
}
```

---

## Error Responses

### Common Error Status Codes

#### 400 - Bad Request
```json
{
  "success": false,
  "message": "Validation Error",
  "errors": [
    "Email is required",
    "Password must be at least 6 characters"
  ]
}
```

#### 401 - Unauthorized
```json
{
  "success": false,
  "message": "Invalid or expired token"
}
```

#### 404 - Not Found
```json
{
  "success": false,
  "message": "File not found"
}
```

#### 409 - Conflict
```json
{
  "success": false,
  "message": "User already exists with this email"
}
```

#### 500 - Internal Server Error
```json
{
  "success": false,
  "message": "Internal server error"
}
```

---

## Testing Tools

### 1. Using Postman

1. **Import Collection:**
   - Create a new collection named "Storage Management System"
   - Add environment variables:
     - `baseUrl`: `http://localhost:3000`
     - `token`: (will be set after login)

2. **Set Authorization:**
   - Go to Authorization tab
   - Type: Bearer Token
   - Token: `{{token}}`

3. **Test Flow:**
   ```
   1. POST /api/auth/signup → Save token
   2. POST /api/auth/login → Update token
   3. GET /api/users/profile → Test authentication
   4. POST /api/folders → Create a folder
   5. POST /api/files/upload/image → Upload a file
   ```

---

### 2. Using Thunder Client (VS Code)

1. Install Thunder Client extension
2. Create new request
3. Set method and URL
4. Add headers:
   ```
   Authorization: Bearer YOUR_TOKEN
   Content-Type: application/json
   ```
5. Send request

---

### 3. Using cURL

#### Signup
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

#### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

#### Get Profile (with token)
```bash
curl -X GET http://localhost:3000/api/users/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

#### Upload File
```bash
curl -X POST http://localhost:3000/api/files/upload/image \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "file=@/path/to/image.jpg" \
  -F "folderId=507f1f77bcf86cd799439017"
```

---

## Testing Checklist

### ✅ Authentication Flow
- [ ] Register new user
- [ ] Login with credentials
- [ ] Access protected route with token
- [ ] Handle invalid token
- [ ] Logout

### ✅ User Management
- [ ] Get user profile
- [ ] Update profile
- [ ] Delete account

### ✅ File Operations
- [ ] Upload image
- [ ] Upload PDF
- [ ] Create note
- [ ] Get all files
- [ ] Get single file
- [ ] Rename file
- [ ] Duplicate file
- [ ] Delete file

### ✅ Folder Operations
- [ ] Create folder
- [ ] Get all folders
- [ ] Get folder contents
- [ ] Rename folder
- [ ] Duplicate folder
- [ ] Delete folder

### ✅ Sharing
- [ ] Share file with another user
- [ ] Share folder with another user
- [ ] Get shared with me items
- [ ] Get my shares
- [ ] Revoke share access

### ✅ Favorites
- [ ] Add file to favorites
- [ ] Add folder to favorites
- [ ] Get all favorites
- [ ] Remove from favorites

### ✅ Activity Tracking
- [ ] Get all activities
- [ ] Get activities by date
- [ ] Get activities by date range
- [ ] Get calendar data

---

## Notes

1. **JWT Token:** Save the token after login/signup and use it for all protected routes
2. **File Uploads:** Use `multipart/form-data` for file uploads
3. **MongoDB IDs:** Replace example IDs with actual IDs from your database
4. **Error Handling:** Check response status codes and error messages
5. **Validation:** Ensure all required fields are provided with correct formats

---

**Happy Testing! 🚀**
