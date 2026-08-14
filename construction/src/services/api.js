import axios from "axios";

/*
|--------------------------------------------------------------------------
| Base API URL
|--------------------------------------------------------------------------
|
| Development:
|   http://localhost:8080/api
|
| Later, change only the .env file:
|
|   VITE_API_BASE_URL=http://localhost:8080/api
|
*/

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:8080/api";


/*
|--------------------------------------------------------------------------
| Axios Instance
|--------------------------------------------------------------------------
*/

const api = axios.create({
  baseURL: API_BASE_URL,

  headers: {
    "Content-Type": "application/json",
  },

  timeout: 10000,
});


/*
|--------------------------------------------------------------------------
| Request Interceptor
|--------------------------------------------------------------------------
|
| Later, when Spring Boot authentication is implemented, the JWT/token
| stored in localStorage will automatically be attached to requests.
|
*/

api.interceptors.request.use(
  (config) => {

    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);


/*
|--------------------------------------------------------------------------
| Response Interceptor
|--------------------------------------------------------------------------
|
| Handles common authentication errors.
*/

api.interceptors.response.use(

  (response) => {
    return response;
  },

  (error) => {

    if (error.response) {

      if (error.response.status === 401) {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        /*
         * We are not forcing navigation here.
         * React Router can handle authentication state later.
         */
      }

      if (error.response.status === 403) {
        console.error(
          "Access denied. User does not have permission."
        );
      }

    } else if (error.request) {

      console.error(
        "No response received from the server."
      );

    } else {

      console.error(
        "API request error:",
        error.message
      );

    }

    return Promise.reject(error);
  }
);


/*
|--------------------------------------------------------------------------
| Authentication APIs
|--------------------------------------------------------------------------
*/

export const loginUser = async (loginData) => {

  const response = await api.post(
    "/auth/login",
    loginData
  );

  return response.data;
};


export const registerUser = async (userData) => {

  const response = await api.post(
    "/auth/register",
    userData
  );

  return response.data;
};


export const getCurrentUser = async () => {

  const response = await api.get(
    "/auth/me"
  );

  return response.data;
};


export const logoutUser = async () => {

  try {

    await api.post("/auth/logout");

  } catch (error) {

    console.error(
      "Logout API error:",
      error
    );

  } finally {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

  }
};


/*
|--------------------------------------------------------------------------
| Project APIs
|--------------------------------------------------------------------------
*/

export const getProjects = async () => {

  const response = await api.get(
    "/projects"
  );

  return response.data;
};


export const getProjectById = async (id) => {

  const response = await api.get(
    `/projects/${id}`
  );

  return response.data;
};


export const createProject = async (projectData) => {

  const response = await api.post(
    "/projects",
    projectData
  );

  return response.data;
};


export const updateProject = async (
  id,
  projectData
) => {

  const response = await api.put(
    `/projects/${id}`,
    projectData
  );

  return response.data;
};


export const deleteProject = async (id) => {

  const response = await api.delete(
    `/projects/${id}`
  );

  return response.data;
};


/*
|--------------------------------------------------------------------------
| Task APIs
|--------------------------------------------------------------------------
*/

export const getTasks = async () => {

  const response = await api.get(
    "/tasks"
  );

  return response.data;
};


export const getTaskById = async (id) => {

  const response = await api.get(
    `/tasks/${id}`
  );

  return response.data;
};


export const getTasksByProject = async (
  projectId
) => {

  const response = await api.get(
    `/tasks/project/${projectId}`
  );

  return response.data;
};


export const createTask = async (taskData) => {

  const response = await api.post(
    "/tasks",
    taskData
  );

  return response.data;
};


export const updateTask = async (
  id,
  taskData
) => {

  const response = await api.put(
    `/tasks/${id}`,
    taskData
  );

  return response.data;
};


export const deleteTask = async (id) => {

  const response = await api.delete(
    `/tasks/${id}`
  );

  return response.data;
};


/*
|--------------------------------------------------------------------------
| Expense APIs
|--------------------------------------------------------------------------
*/

export const getExpenses = async () => {

  const response = await api.get(
    "/expenses"
  );

  return response.data;
};


export const getExpenseById = async (id) => {

  const response = await api.get(
    `/expenses/${id}`
  );

  return response.data;
};


export const getExpensesByProject = async (
  projectId
) => {

  const response = await api.get(
    `/expenses/project/${projectId}`
  );

  return response.data;
};


export const createExpense = async (
  expenseData
) => {

  const response = await api.post(
    "/expenses",
    expenseData
  );

  return response.data;
};


export const updateExpense = async (
  id,
  expenseData
) => {

  const response = await api.put(
    `/expenses/${id}`,
    expenseData
  );

  return response.data;
};


export const deleteExpense = async (id) => {

  const response = await api.delete(
    `/expenses/${id}`
  );

  return response.data;
};


/*
|--------------------------------------------------------------------------
| Expense Approval APIs
|--------------------------------------------------------------------------
*/

export const approveExpense = async (id) => {

  const response = await api.patch(
    `/expenses/${id}/approve`
  );

  return response.data;
};


export const rejectExpense = async (id) => {

  const response = await api.patch(
    `/expenses/${id}/reject`
  );

  return response.data;
};


/*
|--------------------------------------------------------------------------
| Dashboard APIs
|--------------------------------------------------------------------------
*/

export const getDashboardSummary = async () => {

  const response = await api.get(
    "/dashboard/summary"
  );

  return response.data;
};


export const getProjectStatistics = async () => {

  const response = await api.get(
    "/dashboard/projects"
  );

  return response.data;
};


export const getTaskStatistics = async () => {

  const response = await api.get(
    "/dashboard/tasks"
  );

  return response.data;
};


export const getExpenseStatistics = async () => {

  const response = await api.get(
    "/dashboard/expenses"
  );

  return response.data;
};


/*
|--------------------------------------------------------------------------
| Report APIs
|--------------------------------------------------------------------------
*/

export const getProjectReport = async (
  projectId
) => {

  const response = await api.get(
    `/reports/projects/${projectId}`
  );

  return response.data;
};


export const getTaskReport = async (
  projectId
) => {

  const response = await api.get(
    `/reports/tasks/${projectId}`
  );

  return response.data;
};


export const getExpenseReport = async (
  projectId
) => {

  const response = await api.get(
    `/reports/expenses/${projectId}`
  );

  return response.data;
};


export const getOverallReport = async (
  startDate,
  endDate
) => {

  const response = await api.get(
    "/reports/overall",
    {
      params: {
        startDate,
        endDate,
      },
    }
  );

  return response.data;
};


/*
|--------------------------------------------------------------------------
| Users / Employees APIs
|--------------------------------------------------------------------------
*/

export const getUsers = async () => {

  const response = await api.get(
    "/users"
  );

  return response.data;
};


export const getUserById = async (id) => {

  const response = await api.get(
    `/users/${id}`
  );

  return response.data;
};


export const getUsersByRole = async (
  role
) => {

  const response = await api.get(
    "/users",
    {
      params: {
        role,
      },
    }
  );

  return response.data;
};


/*
|--------------------------------------------------------------------------
| Health Check
|--------------------------------------------------------------------------
|
| Useful for testing whether the Spring Boot backend is running.
|
*/

export const checkBackendConnection = async () => {

  const response = await api.get(
    "/health"
  );

  return response.data;
};




export default api;