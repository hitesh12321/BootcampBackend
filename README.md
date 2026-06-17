# 🏕️ Project Camp Backend

> A RESTful API for collaborative project management — built to help teams organize projects, manage tasks, and work together efficiently.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [API Reference](#api-reference)
- [Permission Matrix](#permission-matrix)
- [Data Models](#data-models)
- [Security](#security)
- [File Uploads](#file-uploads)

---

## Overview

Project Camp Backend is a production-ready RESTful API service that powers a full-featured project management system. It supports team collaboration through role-based access control, task hierarchies (tasks + subtasks), project notes, and secure user authentication with email verification.

**Version:** 1.0.0  
**Base URL:** `/api/v1`

---

## Features

### 🔐 Authentication & Authorization
- User registration with email verification
- JWT-based login with access & refresh tokens
- Password change, forgot password, and reset password flows
- Resend email verification
- Three-tier role-based access control: **Admin**, **Project Admin**, **Member**

### 📁 Project Management
- Create, read, update, and delete projects
- View all projects a user has access to (with member counts)
- Invite users to projects via email
- Manage team member roles within projects

### ✅ Task Management
- Full CRUD for tasks within projects
- Task assignment to specific team members
- Three-state status tracking: `Todo` → `In Progress` → `Done`
- Multiple file attachments per task

### 🔩 Subtask Management
- Add subtasks to any task
- Members can mark subtasks as complete
- Admins and Project Admins can create/delete subtasks

### 📝 Project Notes
- Admins can create, update, and delete project notes
- All members can view notes

### 🩺 Health Check
- `/api/v1/healthcheck` endpoint for system status monitoring

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Authentication | JWT (Access + Refresh Tokens) |
| File Uploads | Multer |
| File Storage | Local (`public/images`) |
| Email | Email verification & password reset |
| API Style | RESTful |

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- A running database instance (configured via environment variables)
- SMTP credentials for email functionality

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-org/project-camp-backend.git
cd project-camp-backend

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# 4. Start the development server
npm run dev
```

### Environment Variables

```env
# Server
PORT=8000
NODE_ENV=development

# Database
DB_URI=your_database_connection_string

# JWT
ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=7d

# Email
SMTP_HOST=smtp.your-email-provider.com
SMTP_PORT=587
SMTP_USER=your_email@example.com
SMTP_PASS=your_email_password
EMAIL_FROM=no-reply@projectcamp.com

# App
BASE_URL=http://localhost:8000
CORS_ORIGIN=http://localhost:3000
```

---

## API Reference

All endpoints are prefixed with `/api/v1`. Secured endpoints require a valid JWT in the `Authorization: Bearer <token>` header.

### 🔐 Auth — `/api/v1/auth`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/register` | ❌ | Create a new user account |
| `POST` | `/login` | ❌ | Login and receive tokens |
| `POST` | `/logout` | ✅ | Logout current session |
| `GET` | `/current-user` | ✅ | Get logged-in user info |
| `POST` | `/change-password` | ✅ | Change current password |
| `POST` | `/refresh-token` | ❌ | Refresh access token |
| `GET` | `/verify-email/:token` | ❌ | Verify email address |
| `POST` | `/forgot-password` | ❌ | Request password reset email |
| `POST` | `/reset-password/:token` | ❌ | Reset password via token |
| `POST` | `/resend-email-verification` | ✅ | Resend verification email |

---

### 📁 Projects — `/api/v1/projects`

| Method | Endpoint | Auth | Role | Description |
|---|---|---|---|---|
| `GET` | `/` | ✅ | Any | List all accessible projects |
| `POST` | `/` | ✅ | Any | Create a new project |
| `GET` | `/:projectId` | ✅ | Any | Get project details |
| `PUT` | `/:projectId` | ✅ | Admin | Update project info |
| `DELETE` | `/:projectId` | ✅ | Admin | Delete a project |
| `GET` | `/:projectId/members` | ✅ | Any | List project members |
| `POST` | `/:projectId/members` | ✅ | Admin | Add a member to project |
| `PUT` | `/:projectId/members/:userId` | ✅ | Admin | Update member role |
| `DELETE` | `/:projectId/members/:userId` | ✅ | Admin | Remove a member |

---

### ✅ Tasks — `/api/v1/tasks`

| Method | Endpoint | Auth | Role | Description |
|---|---|---|---|---|
| `GET` | `/:projectId` | ✅ | Any | List all tasks in a project |
| `POST` | `/:projectId` | ✅ | Admin / Project Admin | Create a task |
| `GET` | `/:projectId/t/:taskId` | ✅ | Any | Get task details |
| `PUT` | `/:projectId/t/:taskId` | ✅ | Admin / Project Admin | Update a task |
| `DELETE` | `/:projectId/t/:taskId` | ✅ | Admin / Project Admin | Delete a task |
| `POST` | `/:projectId/t/:taskId/subtasks` | ✅ | Admin / Project Admin | Create a subtask |
| `PUT` | `/:projectId/st/:subTaskId` | ✅ | Any | Update a subtask |
| `DELETE` | `/:projectId/st/:subTaskId` | ✅ | Admin / Project Admin | Delete a subtask |

---

### 📝 Notes — `/api/v1/notes`

| Method | Endpoint | Auth | Role | Description |
|---|---|---|---|---|
| `GET` | `/:projectId` | ✅ | Any | List all project notes |
| `POST` | `/:projectId` | ✅ | Admin | Create a note |
| `GET` | `/:projectId/n/:noteId` | ✅ | Any | Get note details |
| `PUT` | `/:projectId/n/:noteId` | ✅ | Admin | Update a note |
| `DELETE` | `/:projectId/n/:noteId` | ✅ | Admin | Delete a note |

---

### 🩺 Health Check — `/api/v1/healthcheck`

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | Returns API health status |

---

## Permission Matrix

| Action | Admin | Project Admin | Member |
|---|:---:|:---:|:---:|
| Create Project | ✅ | ❌ | ❌ |
| Update / Delete Project | ✅ | ❌ | ❌ |
| Manage Project Members | ✅ | ❌ | ❌ |
| Create / Update / Delete Tasks | ✅ | ✅ | ❌ |
| View Tasks | ✅ | ✅ | ✅ |
| Create / Delete Subtasks | ✅ | ✅ | ❌ |
| Update Subtask Status | ✅ | ✅ | ✅ |
| Create / Update / Delete Notes | ✅ | ❌ | ❌ |
| View Notes | ✅ | ✅ | ✅ |

---

## Data Models

### User Roles

| Role | Description |
|---|---|
| `admin` | Full system access — manages projects, members, tasks, and notes |
| `project_admin` | Can manage tasks and subtasks within assigned projects |
| `member` | Read-only access to project content; can mark subtasks complete |

### Task Status

| Status | Description |
|---|---|
| `todo` | Task has not been started |
| `in_progress` | Task is actively being worked on |
| `done` | Task has been completed |

---

## Security

Project Camp Backend implements multiple layers of security:

- **JWT Authentication** — Short-lived access tokens with long-lived refresh tokens
- **Role-Based Authorization** — Middleware-enforced permission checks on every protected route
- **Email Verification** — New accounts must verify their email before accessing the system
- **Secure Password Reset** — Time-limited, single-use reset tokens sent via email
- **Input Validation** — All request bodies and params are validated before processing
- **File Upload Security** — Multer middleware controls file type and size
- **CORS** — Configurable cross-origin policy to restrict API access by origin

---

## File Uploads

Tasks support multiple file attachments.

- **Storage location:** `public/images/`
- **Tracked metadata:** file URL, MIME type, file size
- **Upload handling:** Multer middleware with security constraints

> ⚠️ For production deployments, consider replacing local file storage with a cloud solution (e.g., AWS S3, Cloudinary) for scalability and reliability.

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'feat: add your feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

## License

This project is licensed under the [MIT License](LICENSE).

---

<p align="center">Built with ☕ for teams that get things done.</p>