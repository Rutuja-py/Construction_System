# 🏗️ Construction Project Management Platform

## Project Overview

The **Construction Project Management Platform** is a full-stack web application developed to centralize and simplify construction project management activities.

The system provides role-based access for managing construction projects, project assignments, tasks, expenses, users, dashboards, and reports.

The application is developed using **React.js, Spring Boot, Hibernate/JPA, and MySQL**, with REST APIs used for communication between the frontend and backend.

---

## 🎯 Objectives

- Centralize construction project information.
- Provide role-based access and authorization.
- Manage construction projects and project assignments.
- Manage project tasks and activities.
- Track project-related expenses.
- Provide dashboard and reporting functionality.
- Maintain persistent project data using MySQL.
- Provide a structured and extensible full-stack application.

---

## ✨ Key Features

- 🔐 User authentication and role-based authorization
- 👤 User management
- 🏗️ Construction project management
- 👥 Project assignments
- ✅ Task management
- 💰 Expense management
- 📊 Dashboard
- 📈 Reports
- 🔗 REST API integration
- 🗄️ MySQL database persistence

### User Roles

- **ADMIN**
- **PROJECT_MANAGER**
- **SITE_ENGINEER**

---

## 🛠️ Technology Stack

| Layer                | Technology      |
| -------------------- | --------------- |
| Frontend             | React.js        |
| Routing              | React Router    |
| HTTP Client          | Axios           |
| Backend              | Spring Boot     |
| Programming Language | Java            |
| ORM                  | Hibernate / JPA |
| Database             | MySQL           |
| API                  | REST            |
| Build Tool           | Maven           |
| Version Control      | Git & GitHub    |
| API Testing          | Postman         |

---

## 🏛️ Application Architecture

```text
┌─────────────────────────────┐
│       React Frontend        │
│      React + Axios          │
└──────────────┬──────────────┘
               │ REST API
               ▼
┌─────────────────────────────┐
│      Spring Boot Backend    │
│ Controllers → Services      │
│ → Repositories              │
└──────────────┬──────────────┘
               │ Hibernate / JPA
               ▼
┌─────────────────────────────┐
│        MySQL Database       │
└─────────────────────────────┘
```

---

## 📂 Project Structure

```text
Construction_System/
│
├── backend/
├── frontend/
│
├── database/
│   ├── schema.sql
│   ├── sample_data.sql
│   └── ER_Diagram.png
│
├── docs/
│   ├── API_Documentation.md
│   ├── Test_Cases.md
│   ├── Test_Results.md
│   ├── Assumptions.md
│   ├── Limitations.md
│   └── Future_Enhancements.md
│
├── screenshots/
│
├── .gitignore
└── README.md
```

---

# ⚙️ Installation & Setup

## Prerequisites

Make sure the following are installed:

- Java JDK 17
- Maven
- Node.js and npm
- MySQL Server
- Git
- Modern web browser

---

## 1. Clone the Repository

```bash
git clone https://github.com/Rutuja-py/Construction_System.git
cd Construction_System
```

---

## 2. Database Setup

Start MySQL and create the database:

```sql
CREATE DATABASE construction_system;
```

The complete database schema is available at:

```text
database/schema.sql
```

Sample test data is available at:

```text
database/sample_data.sql
```

The ER diagram is available at:

```text
database/ER_Diagram.png
```

Configure your local MySQL username and password in the Spring Boot configuration.

> **Note:** Do not commit real production credentials or passwords to the public repository.

---

## 3. Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Build the Spring Boot application:

```bash
mvn clean install
```

Run the backend:

```bash
mvn spring-boot:run
```

The backend runs on:

```text
http://localhost:8091
```

---

## 4. Frontend Setup

Open a new terminal and navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the React development server:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

````

The main entities include:

```text
USER
PROJECT
PROJECT_ASSIGNMENT
TASK
EXPENSE
````

---

# 🧪 Testing

The application has been tested across the major functional areas, including:

- Authentication
- Authorization
- Project management
- Project assignments
- Task management
- Expense management
- Dashboard
- Reports
- REST API communication
- Database persistence
- Frontend navigation

### Test Documentation

```text
docs/Test_Cases.md
docs/Test_Results.md
```

---

# 📦 Final Deliverables

The GitHub repository contains the required assessment deliverables:

| Deliverable             | Location                      |
| ----------------------- | ----------------------------- |
| Working Web Application | `frontend/` + `backend/`      |
| Complete Source Code    | Repository                    |
| README                  | `README.md`                   |
| Database Schema         | `database/schema.sql`         |
| Sample Test Data        | `database/sample_data.sql`    |
| ER Diagram              | `database/ER_Diagram.png`     |
| API Documentation       | `docs/API_Documentation.md`   |
| Test Cases              | `docs/Test_Cases.md`          |
| Test Results            | `docs/Test_Results.md`        |
| Assumptions             | `docs/Assumptions.md`         |
| Known Limitations       | `docs/Limitations.md`         |
| Future Enhancements     | `docs/Future_Enhancements.md` |
| Screenshots / Demo      | `screenshots/`                |

---

# 📤 Submission

This project is submitted through the following **public GitHub repository**:

**Repository:**  
https://github.com/Rutuja-py/Construction_System

All source code, documentation, database files, testing documents, screenshots, and supporting files required for evaluation are included in the repository.

The repository has been prepared to be publicly accessible for review and evaluation.

---

## 👩‍💻 Developer

**Rutuja More**

**Construction Project Management Platform**  
**Full-Stack Developer Technical Assessment**
