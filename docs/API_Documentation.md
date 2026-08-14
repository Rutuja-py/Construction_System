# API Documentation — Construction Project Management Platform

## Backend

**Base URL**

```text
http://localhost:8091
```

The Spring Boot application is configured to run on port `8091`.

All protected endpoints require the authentication mechanism configured by Spring Security/JWT.

---

## 1. Authentication

### Login

**POST** `/api/auth/login`

Authenticates a user.

Request body:

```json
{
  "username": "your_username",
  "password": "your_password"
}
```

Successful response contains:

```json
{
  "token": "JWT_TOKEN",
  "user": {
    "id": 1,
    "name": "User Name",
    "username": "username",
    "email": "user@example.com",
    "role": "ADMIN"
  }
}
```

### Current User

**GET** `/api/auth/me`

Returns the currently authenticated user.

### Logout

**POST** `/api/auth/logout`

Clears the current Spring Security context.

---

# 2. Project APIs

Base path: `/api/projects`

### Get all projects

**GET** `/api/projects`

Returns all projects.

### Get project by ID

**GET** `/api/projects/{id}`

Example:

```text
GET /api/projects/1
```

### Get projects by status

**GET** `/api/projects/status?status=PLANNING`

Returns projects matching the supplied status.

### Create project

**POST** `/api/projects`

Request body:

```json
{
  "name": "Riverside Commercial Building",
  "description": "Commercial construction project",
  "location": "Pune",
  "budget": 5000000,
  "startDate": "2026-08-01",
  "endDate": "2027-08-01",
  "status": "PLANNING",
  "progress": 0,
  "projectManagerId": 1
}
```

Required fields: `name`, `location`, and `budget`.

### Update project

**PUT** `/api/projects/{id}`

Uses the same request structure as project creation.

### Delete project

**DELETE** `/api/projects/{id}`

Deletes the specified project.

---

# 3. Task APIs

Base path: `/api/tasks`

### Get all tasks

**GET** `/api/tasks`

### Get task by ID

**GET** `/api/tasks/{id}`

### Get tasks for a project

**GET** `/api/tasks/project/{projectId}`

### Create task

**POST** `/api/tasks`

Request body:

```json
{
  "title": "Foundation Work",
  "description": "Complete foundation work",
  "projectId": 1,
  "assignedToId": 2,
  "priority": "HIGH",
  "status": "PENDING",
  "startDate": "2026-08-15",
  "dueDate": "2026-08-30",
  "progress": 0
}
```

Required fields: `title` and `projectId`.

### Update task

**PUT** `/api/tasks/{id}`

Uses the task request structure shown above.

### Delete task

**DELETE** `/api/tasks/{id}`

---

# 4. Expense APIs

Base path: `/api/expenses`

### Get all expenses

**GET** `/api/expenses`

### Get expense by ID

**GET** `/api/expenses/{id}`

### Get expenses for a project

**GET** `/api/expenses/project/{projectId}`

### Create expense

**POST** `/api/expenses`

Request body:

```json
{
  "projectId": 1,
  "title": "Cement Purchase",
  "description": "Cement purchased for foundation work",
  "amount": 75000,
  "category": "MATERIAL",
  "expenseDate": "2026-08-14",
  "paymentMethod": "BANK_TRANSFER"
}
```

Required fields: `projectId`, `title`, `amount`, and `category`.

### Update expense

**PUT** `/api/expenses/{id}`

Uses the expense request structure shown above.

### Approve expense

**PUT** `/api/expenses/{id}/approve`

### Reject expense

**PUT** `/api/expenses/{id}/reject`

### Delete expense

**DELETE** `/api/expenses/{id}`

---

# 5. Dashboard APIs

Base path: `/api/dashboard`

### Dashboard summary

**GET** `/api/dashboard/summary`

Returns dashboard summary information for the authenticated user.

### Project summary

**GET** `/api/dashboard/projects`

Returns project-related dashboard information.

### Task summary

**GET** `/api/dashboard/tasks`

Returns task-related dashboard information.

### Expense summary

**GET** `/api/dashboard/expenses`

Returns expense-related dashboard information.

---

# 6. Report APIs

Base path: `/api/reports`

### All project reports

**GET** `/api/reports/projects`

Returns reports for projects.

### Report for one project

**GET** `/api/reports/project/{projectId}`

Example:

```text
GET /api/reports/project/1
```

A report includes project budget/progress, task statistics, expense statistics, remaining budget, and project dates.

---

# 7. User APIs

Base path: `/api/users`

### Get all users

**GET** `/api/users`

### Get user by ID

**GET** `/api/users/{id}`

### Get user by username

**GET** `/api/users/username?username=admin`

### Get users by role

**GET** `/api/users/role/PROJECT_MANAGER`

Supported application roles are:

```text
ADMIN
PROJECT_MANAGER
SITE_ENGINEER
```

---

# HTTP Status Codes

| Status | Meaning |
|---|---|
| 200 | Request successful |
| 201 | Resource created |
| 400 | Validation/bad request |
| 401 | Authentication required or failed |
| 403 | Authenticated user is not permitted |
| 404 | Resource not found |
| 500 | Internal server error |

## Validation

The backend validates required request fields using Jakarta Validation. Invalid requests can return HTTP `400 Bad Request`.

## Testing

The APIs can be tested using Postman or through the React frontend.
