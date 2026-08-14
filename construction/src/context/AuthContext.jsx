import React, { createContext, useContext, useEffect, useState } from "react";

import { loginUser, logoutUser, getCurrentUser } from "../services/api";

/*
|--------------------------------------------------------------------------
| Create Authentication Context
|--------------------------------------------------------------------------
*/

const AuthContext = createContext(null);

/*
|--------------------------------------------------------------------------
| Auth Provider
|--------------------------------------------------------------------------
*/

export const AuthProvider = ({ children }) => {
  /*
  |--------------------------------------------------------------------------
  | State
  |--------------------------------------------------------------------------
  */

  const [user, setUser] = useState(null);

  const [token, setToken] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  /*
  |--------------------------------------------------------------------------
  | Load Existing Login Session
  |--------------------------------------------------------------------------
  |
  | When the browser refreshes, we check localStorage.
  |
  */

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);

        setToken(storedToken);

        setUser(parsedUser);
      } catch (error) {
        console.error("Unable to restore user session:", error);

        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }

    setLoading(false);
  }, []);

  /*
  |--------------------------------------------------------------------------
  | Login
  |--------------------------------------------------------------------------
  */

  const login = async (username, password) => {
    setLoading(true);
    setError(null);

    try {
      /*
       * Send credentials to Spring Boot.
       *
       * Expected backend request:
       *
       * {
       *   username: "admin",
       *   password: "admin123"
       * }
       */

      const response = await loginUser({
        username,
        password,
      });

      /*
       * Expected Spring Boot response:
       *
       * {
       *   token: "...",
       *   user: {
       *     id: 1,
       *     name: "Admin User",
       *     username: "admin",
       *     role: "ADMIN"
       *   }
       * }
       */

      const receivedToken = response?.token;

      const receivedUser = response?.user;

      /*
       * Validate backend response
       */

      if (!receivedToken) {
        throw new Error(
          "Login successful but authentication token was not received.",
        );
      }

      if (!receivedUser) {
        throw new Error(
          "Login successful but user information was not received.",
        );
      }

      /*
       * Validate role
       */

      const allowedRoles = ["ADMIN", "PROJECT_MANAGER", "SITE_ENGINEER"];

      if (!allowedRoles.includes(receivedUser.role)) {
        throw new Error("Invalid user role received from server.");
      }

      /*
       * Store authentication information
       */

      localStorage.setItem("token", receivedToken);

      localStorage.setItem("user", JSON.stringify(receivedUser));

      /*
       * Update React state
       */

      setToken(receivedToken);

      setUser(receivedUser);

      return {
        success: true,
        user: receivedUser,
      };
    } catch (error) {
      console.error("Login failed:", error);

      let errorMessage = "Unable to login. Please try again.";

      /*
       * Backend error
       */

      if (error.response && error.response.data) {
        if (typeof error.response.data === "string") {
          errorMessage = error.response.data;
        } else if (error.response.data.message) {
          errorMessage = error.response.data.message;
        }
      } else if (error.request) {

      /*
       * Network error
       */
        errorMessage =
          "Unable to connect to the server. Please make sure the Spring Boot backend is running.";
      } else if (error.message) {

      /*
       * JavaScript / custom error
       */
        errorMessage = error.message;
      }

      setError(errorMessage);

      return {
        success: false,
        message: errorMessage,
      };
    } finally {
      setLoading(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Logout
  |--------------------------------------------------------------------------
  */

  const logout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      /*
       * Clear local storage
       */

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      /*
       * Clear React state
       */

      setToken(null);

      setUser(null);

      setError(null);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Check Authentication
  |--------------------------------------------------------------------------
  */

  const isAuthenticated = Boolean(token && user);

  /*
  |--------------------------------------------------------------------------
  | Role Helpers
  |--------------------------------------------------------------------------
  */

  const hasRole = (role) => {
    if (!user) {
      return false;
    }

    return user.role === role;
  };

  const hasAnyRole = (roles = []) => {
    if (!user) {
      return false;
    }

    return roles.includes(user.role);
  };

  /*
  |--------------------------------------------------------------------------
  | Individual Role Helpers
  |--------------------------------------------------------------------------
  */

  const isAdmin = user?.role === "ADMIN";

  const isProjectManager = user?.role === "PROJECT_MANAGER";

  const isSiteEngineer = user?.role === "SITE_ENGINEER";

  /*
  |--------------------------------------------------------------------------
  | Refresh Current User
  |--------------------------------------------------------------------------
  |
  | Later this can call:
  |
  | GET /api/auth/me
  |
  */

  const refreshUser = async () => {
    try {
      if (!token) {
        return null;
      }

      const currentUser = await getCurrentUser();

      if (currentUser) {
        setUser(currentUser);

        localStorage.setItem("user", JSON.stringify(currentUser));
      }

      return currentUser;
    } catch (error) {
      console.error("Unable to refresh user:", error);

      return null;
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Context Value
  |--------------------------------------------------------------------------
  */

  const contextValue = {
    // Authentication
    user,
    token,
    loading,
    error,
    isAuthenticated,

    // Authentication functions
    login,
    logout,

    // User functions
    refreshUser,

    // Role functions
    hasRole,
    hasAnyRole,

    // Convenient role checks
    isAdmin,
    isProjectManager,
    isSiteEngineer,
  };

  /*
  |--------------------------------------------------------------------------
  | Provider
  |--------------------------------------------------------------------------
  */

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

/*
|--------------------------------------------------------------------------
| useAuth Hook
|--------------------------------------------------------------------------
|
| Components can simply use:
|
| const { user, login, logout } = useAuth();
|
|--------------------------------------------------------------------------
*/

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside an AuthProvider.");
  }

  return context;
};

export default AuthContext;
