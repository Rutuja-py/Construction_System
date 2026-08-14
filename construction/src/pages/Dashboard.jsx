import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const statistics = [
    {
      title: "Total Projects",
      value: "12",
      subtitle: "3 active projects",
      icon: "🏗️",
    },
    {
      title: "Active Tasks",
      value: "48",
      subtitle: "8 due this week",
      icon: "📋",
    },
    {
      title: "Total Expenses",
      value: "₹24.8L",
      subtitle: "This financial year",
      icon: "💰",
    },
    {
      title: "Completed Tasks",
      value: "126",
      subtitle: "78% completion rate",
      icon: "✅",
    },
  ];

  const projects = [
    {
      id: 1,
      name: "Green Valley Residential Complex",
      location: "Pune",
      manager: "Rahul Sharma",
      progress: 78,
      status: "IN_PROGRESS",
      budget: "₹8.5 Cr",
    },
    {
      id: 2,
      name: "Metro Commercial Tower",
      location: "Mumbai",
      manager: "Priya Patil",
      progress: 54,
      status: "IN_PROGRESS",
      budget: "₹12.2 Cr",
    },
    {
      id: 3,
      name: "Sunrise Highway Project",
      location: "Nashik",
      manager: "Amit Joshi",
      progress: 92,
      status: "NEAR_COMPLETION",
      budget: "₹5.8 Cr",
    },
  ];

  const recentTasks = [
    {
      id: 1,
      title: "Complete foundation inspection",
      project: "Green Valley Residential Complex",
      assignedTo: "Site Engineer",
      dueDate: "12 Aug 2026",
      status: "PENDING",
    },
    {
      id: 2,
      title: "Approve cement procurement",
      project: "Metro Commercial Tower",
      assignedTo: "Project Manager",
      dueDate: "13 Aug 2026",
      status: "IN_PROGRESS",
    },
    {
      id: 3,
      title: "Submit electrical work report",
      project: "Sunrise Highway Project",
      assignedTo: "Electrical Engineer",
      dueDate: "15 Aug 2026",
      status: "COMPLETED",
    },
    {
      id: 4,
      title: "Review structural drawings",
      project: "Green Valley Residential Complex",
      assignedTo: "Architect",
      dueDate: "16 Aug 2026",
      status: "PENDING",
    },
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case "COMPLETED":
        return "status-completed";

      case "IN_PROGRESS":
        return "status-progress";

      case "PENDING":
        return "status-pending";

      case "NEAR_COMPLETION":
        return "status-progress";

      default:
        return "status-default";
    }
  };

  const formatStatus = (status) => {
    return status
      .replaceAll("_", " ")
      .toLowerCase()
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
  };

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <div>
          <h1>Dashboard</h1>

          <p>Overview of your construction projects and activities.</p>
        </div>

        <Link to="/projects" className="primary-button">
          + View Projects
        </Link>
      </div>

      {/* Statistics */}

      <div className="statistics-grid">
        {statistics.map((statistic) => (
          <div className="stat-card" key={statistic.title}>
            <div className="stat-card-top">
              <div>
                <p className="stat-title">{statistic.title}</p>

                <h2 className="stat-value">{statistic.value}</h2>
              </div>

              <div className="stat-icon">{statistic.icon}</div>
            </div>

            <p className="stat-subtitle">{statistic.subtitle}</p>
          </div>
        ))}
      </div>

      {/* Project Overview */}

      <section className="dashboard-section">
        <div className="section-header">
          <div>
            <h2>Project Overview</h2>

            <p>Current status of your major projects.</p>
          </div>

          <Link to="/projects">View All</Link>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Project</th>
                <th>Location</th>
                <th>Manager</th>
                <th>Progress</th>
                <th>Budget</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {projects.map((project) => (
                <tr key={project.id}>
                  <td>
                    <Link to={`/projects/${project.id}`}>{project.name}</Link>
                  </td>

                  <td>{project.location}</td>

                  <td>{project.manager}</td>

                  <td>
                    <div className="progress-wrapper">
                      <div className="progress-bar">
                        <div
                          className="progress-value"
                          style={{
                            width: `${project.progress}%`,
                          }}
                        />
                      </div>

                      <span>{project.progress}%</span>
                    </div>
                  </td>

                  <td>{project.budget}</td>

                  <td>
                    <span
                      className={`status-badge ${getStatusClass(
                        project.status,
                      )}`}
                    >
                      {formatStatus(project.status)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Recent Tasks */}

      <section className="dashboard-section">
        <div className="section-header">
          <div>
            <h2>Recent Tasks</h2>

            <p>Latest project activities and assignments.</p>
          </div>

          <Link to="/tasks">View All</Link>
        </div>

        <div className="task-list">
          {recentTasks.map((task) => (
            <div className="task-row" key={task.id}>
              <div className="task-information">
                <h3>{task.title}</h3>

                <p>{task.project}</p>
              </div>

              <div className="task-assignee">{task.assignedTo}</div>

              <div className="task-date">{task.dueDate}</div>

              <span className={`status-badge ${getStatusClass(task.status)}`}>
                {formatStatus(task.status)}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
