import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const Projects = () => {

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const [showForm, setShowForm] = useState(false);

  const [projects, setProjects] = useState([
    {
      id: 1,
      projectCode: "PRJ-001",
      name: "Green Valley Residential Complex",
      client: "Green Valley Developers",
      location: "Pune",
      manager: "Rahul Sharma",
      startDate: "2026-01-15",
      endDate: "2027-12-30",
      budget: 85000000,
      status: "IN_PROGRESS",
      progress: 78,
    },
    {
      id: 2,
      projectCode: "PRJ-002",
      name: "Metro Commercial Tower",
      client: "Metro Infrastructure Ltd.",
      location: "Mumbai",
      manager: "Priya Patil",
      startDate: "2026-03-01",
      endDate: "2028-06-30",
      budget: 122000000,
      status: "IN_PROGRESS",
      progress: 54,
    },
    {
      id: 3,
      projectCode: "PRJ-003",
      name: "Sunrise Highway Project",
      client: "Maharashtra Infrastructure",
      location: "Nashik",
      manager: "Amit Joshi",
      startDate: "2025-06-10",
      endDate: "2026-09-30",
      budget: 58000000,
      status: "NEAR_COMPLETION",
      progress: 92,
    },
    {
      id: 4,
      projectCode: "PRJ-004",
      name: "Riverfront Office Complex",
      client: "Urban Development Corp.",
      location: "Pune",
      manager: "Sneha Kulkarni",
      startDate: "2026-07-01",
      endDate: "2028-12-31",
      budget: 97000000,
      status: "PLANNED",
      progress: 5,
    },
  ]);

  const [formData, setFormData] = useState({
    projectCode: "",
    name: "",
    client: "",
    location: "",
    manager: "",
    startDate: "",
    endDate: "",
    budget: "",
    status: "PLANNED",
  });

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleAddProject = (event) => {
    event.preventDefault();

    const newProject = {
      id: Date.now(),
      ...formData,
      budget: Number(formData.budget),
      progress: 0,
    };

    setProjects((previous) => [
      ...previous,
      newProject,
    ]);

    setFormData({
      projectCode: "",
      name: "",
      client: "",
      location: "",
      manager: "",
      startDate: "",
      endDate: "",
      budget: "",
      status: "PLANNED",
    });

    setShowForm(false);
  };

  const filteredProjects = useMemo(() => {

    return projects.filter((project) => {

      const searchValue = searchTerm.toLowerCase();

      const matchesSearch =
        project.name.toLowerCase().includes(searchValue) ||
        project.projectCode.toLowerCase().includes(searchValue) ||
        project.client.toLowerCase().includes(searchValue) ||
        project.location.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "ALL" ||
        project.status === statusFilter;

      return matchesSearch && matchesStatus;

    });

  }, [projects, searchTerm, statusFilter]);

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

    if (status === "COMPLETED") {
      return "status-completed";
    }

    if (
      status === "IN_PROGRESS" ||
      status === "NEAR_COMPLETION"
    ) {
      return "status-progress";
    }

    if (status === "PLANNED") {
      return "status-pending";
    }

    return "status-default";
  };

  return (
    <div className="projects-page">

      <div className="page-header">

        <div>
          <h1>Projects</h1>

          <p>
            Manage and monitor all construction projects.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Close Form" : "+ Add Project"}
        </button>

      </div>

      {/* Add Project Form */}

      {showForm && (
        <section className="form-card">

          <div className="section-header">
            <div>
              <h2>Create New Project</h2>
              <p>
                Enter the project information below.
              </p>
            </div>
          </div>

          <form onSubmit={handleAddProject}>

            <div className="form-grid">

              <div className="form-group">
                <label>Project Code</label>

                <input
                  type="text"
                  name="projectCode"
                  value={formData.projectCode}
                  onChange={handleFormChange}
                  placeholder="PRJ-005"
                  required
                />
              </div>

              <div className="form-group">
                <label>Project Name</label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  placeholder="Enter project name"
                  required
                />
              </div>

              <div className="form-group">
                <label>Client</label>

                <input
                  type="text"
                  name="client"
                  value={formData.client}
                  onChange={handleFormChange}
                  placeholder="Enter client name"
                  required
                />
              </div>

              <div className="form-group">
                <label>Location</label>

                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleFormChange}
                  placeholder="Enter location"
                  required
                />
              </div>

              <div className="form-group">
                <label>Project Manager</label>

                <input
                  type="text"
                  name="manager"
                  value={formData.manager}
                  onChange={handleFormChange}
                  placeholder="Enter project manager"
                  required
                />
              </div>

              <div className="form-group">
                <label>Budget</label>

                <input
                  type="number"
                  name="budget"
                  value={formData.budget}
                  onChange={handleFormChange}
                  placeholder="Enter budget"
                  min="0"
                  required
                />
              </div>

              <div className="form-group">
                <label>Start Date</label>

                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleFormChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>End Date</label>

                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleFormChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Status</label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleFormChange}
                >
                  <option value="PLANNED">
                    Planned
                  </option>

                  <option value="IN_PROGRESS">
                    In Progress
                  </option>

                  <option value="NEAR_COMPLETION">
                    Near Completion
                  </option>
                </select>

              </div>

            </div>

            <div className="form-actions">

              <button
                type="button"
                className="secondary-button"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="primary-button"
              >
                Create Project
              </button>

            </div>

          </form>

        </section>
      )}

      {/* Filters */}

      <section className="filter-card">

        <div className="search-box">

          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(event.target.value)
            }
          />

        </div>

        <div className="filter-box">

          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value)
            }
          >

            <option value="ALL">
              All Statuses
            </option>

            <option value="PLANNED">
              Planned
            </option>

            <option value="IN_PROGRESS">
              In Progress
            </option>

            <option value="NEAR_COMPLETION">
              Near Completion
            </option>

            <option value="COMPLETED">
              Completed
            </option>

          </select>

        </div>

      </section>

      {/* Project Table */}

      <section className="table-card">

        <div className="section-header">

          <div>
            <h2>All Projects</h2>

            <p>
              {filteredProjects.length} project(s) found.
            </p>
          </div>

        </div>

        <div className="table-container">

          <table>

            <thead>

              <tr>
                <th>Code</th>
                <th>Project</th>
                <th>Client</th>
                <th>Location</th>
                <th>Manager</th>
                <th>Budget</th>
                <th>Progress</th>
                <th>Status</th>
                <th>Action</th>
              </tr>

            </thead>

            <tbody>

              {filteredProjects.length === 0 ? (

                <tr>
                  <td
                    colSpan="9"
                    className="empty-state"
                  >
                    No projects found.
                  </td>
                </tr>

              ) : (

                filteredProjects.map((project) => (

                  <tr key={project.id}>

                    <td>
                      <strong>
                        {project.projectCode}
                      </strong>
                    </td>

                    <td>
                      <Link
                        to={`/projects/${project.id}`}
                      >
                        {project.name}
                      </Link>
                    </td>

                    <td>
                      {project.client}
                    </td>

                    <td>
                      {project.location}
                    </td>

                    <td>
                      {project.manager}
                    </td>

                    <td>
                      {formatCurrency(project.budget)}
                    </td>

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

                        <span>
                          {project.progress}%
                        </span>

                      </div>

                    </td>

                    <td>

                      <span
                        className={`status-badge ${getStatusClass(
                          project.status
                        )}`}
                      >
                        {formatStatus(project.status)}
                      </span>

                    </td>

                    <td>

                      <Link
                        to={`/projects/${project.id}`}
                        className="action-button"
                      >
                        View
                      </Link>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </section>

    </div>
  );
};

export default Projects;