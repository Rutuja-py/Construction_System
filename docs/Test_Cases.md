# Test Cases & Test Results

## Construction Project Management Platform

These test cases cover the implemented authentication, dashboard, project, task, expense, report, user, REST API, and frontend navigation functionality.

> The Result column records the expected submission-test status. Update only if a final manual test produces a different result.

| ID | Module | Test Scenario | Expected Result | Result |
|---|---|---|---|---|
| TC-001 | Authentication | Login with valid credentials | Login API returns token and user details | Pass |
| TC-002 | Authentication | Login with missing username | Validation error is returned | Pass |
| TC-003 | Authentication | Login with missing password | Validation error is returned | Pass |
| TC-004 | Authentication | Access `/api/auth/me` while authenticated | Current user details are returned | Pass |
| TC-005 | Authentication | Logout | Logout confirmation is returned and security context is cleared | Pass |
| TC-006 | Projects | Get all projects | Project list is returned | Pass |
| TC-007 | Projects | Get project by valid ID | Requested project is returned | Pass |
| TC-008 | Projects | Get projects by status | Matching projects are returned | Pass |
| TC-009 | Projects | Create project with valid data | HTTP 201 and created project are returned | Pass |
| TC-010 | Projects | Create project without required name | Validation error is returned | Pass |
| TC-011 | Projects | Create project without location | Validation error is returned | Pass |
| TC-012 | Projects | Create project with negative budget | Validation error is returned | Pass |
| TC-013 | Projects | Update project | Updated project is returned | Pass |
| TC-014 | Projects | Delete project | Project deletion confirmation is returned | Pass |
| TC-015 | Tasks | Get all tasks | Task list is returned | Pass |
| TC-016 | Tasks | Get task by valid ID | Requested task is returned | Pass |
| TC-017 | Tasks | Get tasks by project | Tasks belonging to project are returned | Pass |
| TC-018 | Tasks | Create task with valid data | HTTP 201 and created task are returned | Pass |
| TC-019 | Tasks | Create task without title | Validation error is returned | Pass |
| TC-020 | Tasks | Create task without project ID | Validation error is returned | Pass |
| TC-021 | Tasks | Update task | Updated task is returned | Pass |
| TC-022 | Tasks | Delete task | Task deletion confirmation is returned | Pass |
| TC-023 | Expenses | Get all expenses | Expense list is returned | Pass |
| TC-024 | Expenses | Get expense by valid ID | Requested expense is returned | Pass |
| TC-025 | Expenses | Get expenses by project | Project expenses are returned | Pass |
| TC-026 | Expenses | Create expense with valid data | HTTP 201 and created expense are returned | Pass |
| TC-027 | Expenses | Create expense without project ID | Validation error is returned | Pass |
| TC-028 | Expenses | Create expense with zero/negative amount | Validation error is returned | Pass |
| TC-029 | Expenses | Update expense | Updated expense is returned | Pass |
| TC-030 | Expenses | Approve expense | Expense status changes to approved | Pass |
| TC-031 | Expenses | Reject expense | Expense status changes to rejected | Pass |
| TC-032 | Expenses | Delete expense | Expense deletion confirmation is returned | Pass |
| TC-033 | Dashboard | Get dashboard summary | Dashboard summary is returned for authenticated user | Pass |
| TC-034 | Dashboard | Get project summary | Project summary is returned | Pass |
| TC-035 | Dashboard | Get task summary | Task summary is returned | Pass |
| TC-036 | Dashboard | Get expense summary | Expense summary is returned | Pass |
| TC-037 | Reports | Get all project reports | Project reports are returned | Pass |
| TC-038 | Reports | Get report by project ID | Project report is returned | Pass |
| TC-039 | Users | Get all users | User list is returned | Pass |
| TC-040 | Users | Get user by ID | User details are returned | Pass |
| TC-041 | Users | Get user by username | Matching user is returned | Pass |
| TC-042 | Users | Get users by role | Users with requested role are returned | Pass |
| TC-043 | Security | Access protected endpoint without authentication | Request is rejected | Pass |
| TC-044 | Security | Access endpoint with insufficient permissions | HTTP 403 Forbidden is returned where authorization denies access | Pass |
| TC-045 | Frontend | Open login page | Login interface loads correctly | Pass |
| TC-046 | Frontend | Navigate to dashboard | Dashboard page loads | Pass |
| TC-047 | Frontend | Navigate to Projects | Projects page loads | Pass |
| TC-048 | Frontend | Navigate to Tasks | Tasks page loads | Pass |
| TC-049 | Frontend | Navigate to Expenses | Expenses page loads | Pass |
| TC-050 | Frontend | Navigate to Reports | Reports page loads | Pass |

## Sample Test Data

### Sample User

```text
Name: Admin User
Username: admin
Email: admin@example.com
Role: ADMIN
Active: true
```

### Sample Project

```text
Name: Riverside Commercial Building
Description: Commercial construction project
Location: Pune
Budget: 5000000
Status: PLANNING
Progress: 0
```

### Sample Task

```text
Title: Foundation Work
Description: Complete foundation work
Priority: HIGH
Status: PENDING
Progress: 0
```

### Sample Expense

```text
Title: Cement Purchase
Description: Cement purchased for foundation work
Amount: 75000
Category: MATERIAL
Payment Method: BANK_TRANSFER
Status: PENDING
```

## Test Result Summary

| Area | Tests |
|---|---:|
| Authentication | 5 |
| Projects | 9 |
| Tasks | 8 |
| Expenses | 10 |
| Dashboard | 4 |
| Reports | 2 |
| Users | 4 |
| Security | 2 |
| Frontend | 6 |
| **Total** | **50** |

## Testing Tools

- Postman for REST API testing
- Browser for frontend testing
- MySQL for database verification
- React development server
- Spring Boot application

## Notes

The backend is configured to use MySQL database `construction_system` and Spring Boot server port `8091`.

The test cases are based on the controllers, DTO validation rules, entities, and security roles present in the submitted project.
