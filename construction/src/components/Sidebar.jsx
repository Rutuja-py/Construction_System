import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="sidebar">

      {/* Logo / Application Name */}
      <div className="sidebar-header">

        <div className="sidebar-logo">
          CP
        </div>

        <div className="sidebar-title">
          <h2>BuildTrack</h2>
          <span>Project Management</span>
        </div>

      </div>

      {/* Navigation */}
      <nav className="sidebar-navigation">

        {/* Dashboard */}
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          <span className="nav-icon">
            📊
          </span>

          <span className="nav-text">
            Dashboard
          </span>
        </NavLink>

        {/* Projects */}
        <NavLink
          to="/projects"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          <span className="nav-icon">
            🏗️
          </span>

          <span className="nav-text">
            Projects
          </span>
        </NavLink>

        {/* Tasks */}
        <NavLink
          to="/tasks"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          <span className="nav-icon">
            📋
          </span>

          <span className="nav-text">
            Tasks
          </span>
        </NavLink>

        {/* Expenses */}
        <NavLink
          to="/expenses"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          <span className="nav-icon">
            💰
          </span>

          <span className="nav-text">
            Expenses
          </span>
        </NavLink>

        {/* Reports */}
        <NavLink
          to="/reports"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          <span className="nav-icon">
            📈
          </span>

          <span className="nav-text">
            Reports
          </span>
        </NavLink>

      </nav>

      {/* Sidebar Footer */}
      <div className="sidebar-footer">

        <div className="sidebar-footer-item">
          <span>⚙️</span>
          <span>Settings</span>
        </div>

      </div>

    </aside>
  );
};

export default Sidebar;