import React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div className="app-layout">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Application Area */}
      <div className="main-area">

        {/* Top Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="page-content">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default Layout;