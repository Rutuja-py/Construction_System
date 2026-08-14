import React from "react";

const Navbar = () => {
  return (
    <header className="navbar">

      {/* Left Section */}
      <div className="navbar-left">
        <h2 className="navbar-title">
          Construction Project Management
        </h2>
      </div>

      {/* Right Section */}
      <div className="navbar-right">

        {/* Notification */}
        <button className="notification-button" type="button">
          🔔
        </button>

        {/* User Profile */}
        <div className="user-profile">

          <div className="user-avatar">
            A
          </div>

          <div className="user-details">
            <span className="user-name">
              Admin
            </span>

            <span className="user-role">
              Administrator
            </span>
          </div>

        </div>

      </div>

    </header>
  );
};

export default Navbar;