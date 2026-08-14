import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Layout from "./components/Layout";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import Tasks from "./pages/Tasks";
import Expenses from "./pages/Expenses";
import Reports from "./pages/Reports";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Main Application */}
        <Route path="/" element={<Layout />}>
          {/* Default Route */}
          <Route index element={<Navigate to="/dashboard" replace />} />

          {/* Dashboard */}
          <Route path="dashboard" element={<Dashboard />} />

          {/* Projects */}
          <Route path="projects" element={<Projects />} />

          {/* Project Details */}
          <Route path="projects/:id" element={<ProjectDetails />} />

          {/* Tasks */}
          <Route path="tasks" element={<Tasks />} />

          {/* Expenses */}
          <Route path="expenses" element={<Expenses />} />

          {/* Reports */}
          <Route path="reports" element={<Reports />} />
        </Route>

        {/* Unknown URL */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
