import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const project = {
    id: id,
    projectCode: "PRJ-001",
    name: "Green Valley Residential Complex",
    client: "Green Valley Developers",
    location: "Pune, Maharashtra",
    manager: "Rahul Sharma",
    startDate: "15 January 2026",
    endDate: "30 December 2027",
    budget: 85000000,
    spent: 52400000,
    progress: 78,
    status: "IN_PROGRESS",
    description:
      "A large-scale residential construction project consisting of multiple residential towers, parking facilities, landscaping and supporting infrastructure.",
  };

  const tasks = [
    {
      id: 1,
      title: "Foundation Inspection",
      assignedTo: "Rahul Patil",
      dueDate: "12 Aug 2026",
      status: "COMPLETED",
    },
    {
      id: 2,
      title: "Structural Work - Block A",
      assignedTo: "Amit Joshi",
      dueDate: "18 Aug 2026",
      status: "IN_PROGRESS",
    },
    {
      id: 3,
      title: "Electrical Planning",
      assignedTo: "Sneha Kulkarni",
      dueDate: "22 Aug 2026",
      status: "PENDING",
    },
    {
      id: 4,
      title: "Material Procurement",
      assignedTo: "Vijay Shah",
      dueDate: "25 Aug 2026",
      status: "PENDING",
    },
  ];

  const expenses = [
    {
      id: 1,
      category: "Cement",
      description: "Cement procurement",
      amount: 1250000,
      date: "02 Aug 2026",
      status: "APPROVED",
    },
    {
      id: 2,
      category: "Steel",
      description: "Structural steel",
      amount: 2800000,
      date: "04 Aug 2026",
      status: "APPROVED",
    },
    {
      id: 3,
      category: "Labour",
      description: "Monthly labour payment",
      amount: 950000,
      date: "05 Aug 2026",
      status: "PENDING",
    },
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatStatus = (status) => {
    return status
      .replaceAll("_", " ")
      .toLowerCase()
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
  };

  const getStatusClass = (status) => {
    if (status === "COMPLETED" || status === "APPROVED") {
      return "status-completed";
    }

    if (status === "IN_PROGRESS") {
      return "status-progress";
    }

    if (status === "PENDING") {
      return "status-pending";
    }

    return "status-default";
  };

  const budgetRemaining = project.budget - project.spent;

  return (
    <div className="project-details-page">
      {/* Header */}

      <div className="page-header">
        <div>
          <div className="breadcrumb">
            <Link to="/projects">Projects</Link>

            <span>/</span>

            <span>{project.projectCode}</span>
          </div>

          <h1>{project.name}</h1>

          <p>
            {project.projectCode} • {project.location}
          </p>
        </div>

        <div className="page-header-actions">
          <button
            className="secondary-button"
            onClick={() => navigate("/projects")}
          >
            ← Back
          </button>

          <button className="primary-button">Edit Project</button>
        </div>
      </div>

      {/* Project Summary */}

      <section className="details-grid">
        <div className="detail-card">
          <span className="detail-label">Client</span>

          <strong>{project.client}</strong>
        </div>

        <div className="detail-card">
          <span className="detail-label">Project Manager</span>

          <strong>{project.manager}</strong>
        </div>

        <div className="detail-card">
          <span className="detail-label">Start Date</span>

          <strong>{project.startDate}</strong>
        </div>

        <div className="detail-card">
          <span className="detail-label">Expected Completion</span>

          <strong>{project.endDate}</strong>
        </div>
      </section>

      {/* Progress */}

      <section className="details-card">
        <div className="section-header">
          <div>
            <h2>Project Progress</h2>

            <p>Overall project completion.</p>
          </div>

          <span className={`status-badge ${getStatusClass(project.status)}`}>
            {formatStatus(project.status)}
          </span>
        </div>

        <div className="large-progress">
          <div className="large-progress-header">
            <span>Overall Completion</span>

            <strong>{project.progress}%</strong>
          </div>

          <div className="large-progress-bar">
            <div
              className="large-progress-value"
              style={{
                width: `${project.progress}%`,
              }}
            />
          </div>
        </div>

        <div className="project-description">
          <h3>Description</h3>

          <p>{project.description}</p>
        </div>
      </section>

      {/* Financial Summary */}

      <section className="details-card">
        <div className="section-header">
          <div>
            <h2>Financial Summary</h2>

            <p>Current project budget and expenditure.</p>
          </div>
        </div>

        <div className="financial-grid">
          <div className="financial-item">
            <span>Total Budget</span>

            <strong>{formatCurrency(project.budget)}</strong>
          </div>

          <div className="financial-item">
            <span>Amount Spent</span>

            <strong>{formatCurrency(project.spent)}</strong>
          </div>

          <div className="financial-item">
            <span>Remaining Budget</span>

            <strong>{formatCurrency(budgetRemaining)}</strong>
          </div>
        </div>
      </section>

      {/* Tasks */}

      <section className="details-card">
        <div className="section-header">
          <div>
            <h2>Project Tasks</h2>

            <p>Tasks associated with this project.</p>
          </div>

          <Link to="/tasks">Manage Tasks</Link>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Task</th>
                <th>Assigned To</th>
                <th>Due Date</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {tasks.map((task) => (
                <tr key={task.id}>
                  <td>{task.title}</td>

                  <td>{task.assignedTo}</td>

                  <td>{task.dueDate}</td>

                  <td>
                    <span
                      className={`status-badge ${getStatusClass(task.status)}`}
                    >
                      {formatStatus(task.status)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Expenses */}

      <section className="details-card">
        <div className="section-header">
          <div>
            <h2>Recent Expenses</h2>

            <p>Recent expenses recorded against this project.</p>
          </div>

          <Link to="/expenses">Manage Expenses</Link>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Description</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {expenses.map((expense) => (
                <tr key={expense.id}>
                  <td>{expense.category}</td>

                  <td>{expense.description}</td>

                  <td>{expense.date}</td>

                  <td>{formatCurrency(expense.amount)}</td>

                  <td>
                    <span
                      className={`status-badge ${getStatusClass(
                        expense.status,
                      )}`}
                    >
                      {formatStatus(expense.status)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetails;
