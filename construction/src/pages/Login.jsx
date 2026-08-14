import React, { useEffect, useState } from "react";

import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";


const Login = () => {

  /*
  |--------------------------------------------------------------------------
  | React Router
  |--------------------------------------------------------------------------
  */

  const navigate = useNavigate();

  const location = useLocation();


  /*
  |--------------------------------------------------------------------------
  | Authentication Context
  |--------------------------------------------------------------------------
  */

  const {
    login,
    isAuthenticated,
    user,
    loading,
    error,
  } = useAuth();


  /*
  |--------------------------------------------------------------------------
  | Form State
  |--------------------------------------------------------------------------
  */

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });


  /*
  |--------------------------------------------------------------------------
  | Local State
  |--------------------------------------------------------------------------
  */

  const [formError, setFormError] = useState("");

  const [showPassword, setShowPassword] =
    useState(false);


  /*
  |--------------------------------------------------------------------------
  | Redirect Already Logged-In User
  |--------------------------------------------------------------------------
  */

  useEffect(() => {

    if (
      isAuthenticated &&
      user
    ) {

      navigate(
        "/dashboard",
        {
          replace: true,
        }
      );

    }

  }, [
    isAuthenticated,
    user,
    navigate,
  ]);


  /*
  |--------------------------------------------------------------------------
  | Handle Input
  |--------------------------------------------------------------------------
  */

  const handleChange = (event) => {

    const {
      name,
      value,
    } = event.target;


    setFormData(
      (previousData) => ({
        ...previousData,

        [name]: value,
      })
    );


    /*
     * Clear errors when user starts typing again.
     */

    setFormError("");

  };


  /*
  |--------------------------------------------------------------------------
  | Handle Login
  |--------------------------------------------------------------------------
  */

  const handleSubmit = async (event) => {

    event.preventDefault();


    /*
     * Clear previous errors.
     */

    setFormError("");


    /*
     * Basic frontend validation.
     */

    if (
      !formData.username.trim()
    ) {

      setFormError(
        "Please enter your username."
      );

      return;

    }


    if (
      !formData.password
    ) {

      setFormError(
        "Please enter your password."
      );

      return;

    }


    /*
     * Call AuthContext login.
     */

    const result = await login(
      formData.username.trim(),
      formData.password
    );


    /*
     * Login successful.
     */

    if (result?.success) {

      /*
       * Check if user was originally trying
       * to access a protected page.
       */

      const from =
        location.state?.from?.pathname;


      /*
       * For now, all roles start at dashboard.
       *
       * Later we can redirect users to
       * role-specific landing pages if required.
       */

      if (from && from !== "/login") {

        navigate(
          from,
          {
            replace: true,
          }
        );

      } else {

        navigate(
          "/dashboard",
          {
            replace: true,
          }
        );

      }

      return;

    }


    /*
     * Login failed.
     */

    setFormError(
      result?.message ||
      "Invalid username or password."
    );

  };


  /*
  |--------------------------------------------------------------------------
  | Already Authenticated
  |--------------------------------------------------------------------------
  */

  if (
    isAuthenticated &&
    user
  ) {

    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );

  }


  /*
  |--------------------------------------------------------------------------
  | Render Login Page
  |--------------------------------------------------------------------------
  */

  return (

    <div className="login-page">

      <div className="login-container">


        {/* =====================================================
            BRAND
        ===================================================== */}

        <div className="login-brand">

          <div className="login-logo">
            CP
          </div>

          <h1>
            ConstructionPro
          </h1>

          <p>
            Construction Project Management Platform
          </p>

        </div>


        {/* =====================================================
            LOGIN CARD
        ===================================================== */}

        <div className="login-card">


          <div className="login-header">

            <h2>
              Welcome Back
            </h2>

            <p>
              Sign in to access your project dashboard.
            </p>

          </div>


          {/* ===================================================
              ERROR
          =================================================== */}

          {(formError || error) && (

            <div className="form-error">

              {formError || error}

            </div>

          )}


          {/* ===================================================
              FORM
          =================================================== */}

          <form
            onSubmit={handleSubmit}
          >


            {/* =================================================
                USERNAME
            ================================================= */}

            <div className="form-group">

              <label htmlFor="username">
                Username
              </label>

              <input
                id="username"
                name="username"
                type="text"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
                autoComplete="username"
                disabled={loading}
              />

            </div>


            {/* =================================================
                PASSWORD
            ================================================= */}

            <div className="form-group">

              <label htmlFor="password">
                Password
              </label>


              <div
                style={{
                  position: "relative",
                }}
              >

                <input
                  id="password"
                  name="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  disabled={loading}
                  style={{
                    paddingRight: "75px",
                  }}
                />


                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      (previous) =>
                        !previous
                    )
                  }
                  disabled={loading}
                  style={{
                    position: "absolute",
                    right: "8px",
                    top: "50%",
                    transform:
                      "translateY(-50%)",
                    border: "none",
                    background:
                      "transparent",
                    color: "#d97706",
                    fontSize: "11px",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >

                  {showPassword
                    ? "Hide"
                    : "Show"}

                </button>

              </div>

            </div>


            {/* =================================================
                LOGIN OPTIONS
            ================================================= */}

            <div className="login-options">

              <label className="remember-me">

                <input
                  type="checkbox"
                  name="rememberMe"
                />

                <span>
                  Remember me
                </span>

              </label>


              <button
                type="button"
                className="forgot-password"
                onClick={() => {
                  alert(
                    "Please contact the administrator to reset your password."
                  );
                }}
              >
                Forgot password?
              </button>

            </div>


            {/* =================================================
                LOGIN BUTTON
            ================================================= */}

            <button
              type="submit"
              className="login-button"
              disabled={loading}
            >

              {loading
                ? "Signing in..."
                : "Sign In"}

            </button>

          </form>


          {/* ===================================================
              DEVELOPMENT INFORMATION
          =================================================== */}

          <div
            style={{
              marginTop: "20px",
              padding: "12px",
              background: "#f9fafb",
              borderRadius: "7px",
              border: "1px solid #e5e7eb",
            }}
          >

            <p
              style={{
                fontSize: "10px",
                color: "#9ca3af",
                textAlign: "center",
                lineHeight: "1.5",
              }}
            >

              Your role and permissions are determined
              by the server after authentication.

            </p>

          </div>


        </div>


        {/* =====================================================
            FOOTER
        ===================================================== */}

        <div className="login-footer">

          <p>
            ConstructionPro © 2026
          </p>

          <p>
            Secure Project Management System
          </p>

        </div>


      </div>

    </div>

  );

};


export default Login;