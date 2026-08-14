import React from "react";

import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

/*
|--------------------------------------------------------------------------
| Protected Route
|--------------------------------------------------------------------------
|
| Usage:
|
| <Route
|   element={
|     <ProtectedRoute
|       allowedRoles={[
|         "ADMIN",
|         "PROJECT_MANAGER"
|       ]}
|     />
|   }
| >
|
|   ...
|
| </Route>
|
|--------------------------------------------------------------------------
*/

const ProtectedRoute = ({ allowedRoles = [] }) => {
  /*
  |--------------------------------------------------------------------------
  | Authentication
  |--------------------------------------------------------------------------
  */

  const { user, loading, isAuthenticated } = useAuth();

  /*
  |--------------------------------------------------------------------------
  | Current Location
  |--------------------------------------------------------------------------
  |
  | Used so we know where the user originally tried to go.
  |
  */

  const location = useLocation();

  /*
  |--------------------------------------------------------------------------
  | Loading
  |--------------------------------------------------------------------------
  */

  if (loading) {
    return (
      <div className="auth-loading">
        <div className="auth-loading-spinner">
          <div></div>
        </div>

        <p>Loading...</p>
      </div>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Not Authenticated
  |--------------------------------------------------------------------------
  */

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location,
        }}
      />
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Role Authorization
  |--------------------------------------------------------------------------
  */

  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  /*
  |--------------------------------------------------------------------------
  | Authorized
  |--------------------------------------------------------------------------
  |
  | Outlet renders the nested route.
  |
  */

  return <Outlet />;
};

export default ProtectedRoute;
