import React, { useMemo, useState } from "react";

const Tasks = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [priorityFilter, setPriorityFilter] = useState("ALL");
  const [showForm, setShowForm] = useState(false);

  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Foundation Inspection",
      description: "Complete foundation inspection for Block A.",
      project: "Green Valley Residential Complex",
      assignedTo: "Rahul Patil",
      priority: "HIGH",
      status: "COMPLETED",
      dueDate: "2026-08-12",
    },
    {
      id: 2,
      title: "Structural Work - Block A",
      description: "Complete structural work for Block A.",
      project: "Green Valley Residential Complex",
      assignedTo: "Amit Joshi",
      priority: "HIGH",
      status: "IN_PROGRESS",
      dueDate: "2026-08-18",
    },
    {
      id: 3,
      title: "Electrical Planning",
      description: "Prepare electrical installation plan.",
      project: "Green Valley Residential Complex",
      assignedTo: "Sneha Kulkarni",
      priority: "MEDIUM",
      status: "PENDING",
      dueDate: "2026-08-22",
    },
    {
      id: 4,
      title: "Material Procurement",
      description: "Procure construction material for phase two.",
      project: "Metro Commercial Tower",
      assignedTo: "Vijay Shah",
      priority: "MEDIUM",
      status: "PENDING",
      dueDate: "2026-08-25",
    },
    {
      id: 5,
      title: "Safety Inspection",
      description: "Perform monthly site safety inspection.",
      project: "Sunrise Highway Project",
      assignedTo: "Kiran More",
      priority: "LOW",
      status: "IN_PROGRESS",
      dueDate: "2026-08-20",
    },
  ]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    project: "",
    assignedTo: "",
    priority: "MEDIUM",
    status: "PENDING",
    dueDate: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newTask = {
      id: Date.now(),
      ...formData,
    };

    setTasks((previous) => [...previous, newTask]);

    setFormData({
      title: "",
      description: "",
      project: "",
      assignedTo: "",
      priority: "MEDIUM",
      status: "PENDING",
      dueDate: "",
    });

    setShowForm(false);
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const search = searchTerm.toLowerCase();

      const matchesSearch =
        task.title.toLowerCase().includes(search) ||
        task.project.toLowerCase().includes(search) ||
        task.assignedTo.toLowerCase().includes(search);

      const matchesStatus =
        statusFilter === "ALL" || task.status === statusFilter;

      const matchesPriority =
        priorityFilter === "ALL" || task.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tasks, searchTerm, statusFilter, priorityFilter]);

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

    if (status === "IN_PROGRESS") {
      return "status-progress";
    }

    if (status === "PENDING") {
      return "status-pending";
    }

    return "status-default";
  };

  const getPriorityClass = (priority) => {
    if (priority === "HIGH") {
      return "priority-high";
    }

    if (priority === "MEDIUM") {
      return "priority-medium";
    }

    return "priority-low";
  };

  return (
    <div className="tasks-page">
      <div className="page-header">
        <div>
          <h1>Tasks</h1>

          <p>Create, assign and monitor project tasks.</p>
        </div>

        <button
          className="primary-button"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Close Form" : "+ Create Task"}
        </button>
      </div>

      {showForm && (
        <section className="form-card">
          <div className="section-header">
            <div>
              <h2>Create New Task</h2>

              <p>Assign a new task to a project team member.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label>Task Title</label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter task title"
                  required
                />
              </div>

              <div className="form-group">
                <label>Project</label>

                <select
                  name="project"
                  value={formData.project}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Project</option>

                  <option>Green Valley Residential Complex</option>

                  <option>Metro Commercial Tower</option>

                  <option>Sunrise Highway Project</option>

                  <option>Riverfront Office Complex</option>
                </select>
              </div>

              <div className="form-group">
                <label>Assigned To</label>

                <input
                  type="text"
                  name="assignedTo"
                  value={formData.assignedTo}
                  onChange={handleChange}
                  placeholder="Employee name"
                  required
                />
              </div>

              <div className="form-group">
                <label>Due Date</label>

                <input
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Priority</label>

                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                >
                  <option value="HIGH">High</option>

                  <option value="MEDIUM">Medium</option>

                  <option value="LOW">Low</option>
                </select>
              </div>

              <div className="form-group">
                <label>Status</label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="PENDING">Pending</option>

                  <option value="IN_PROGRESS">In Progress</option>

                  <option value="COMPLETED">Completed</option>
                </select>
              </div>

              <div className="form-group form-group-full">
                <label>Description</label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe the task..."
                  rows="4"
                  required
                />
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

              <button type="submit" className="primary-button">
                Create Task
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
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>

        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
        >
          <option value="ALL">All Statuses</option>

          <option value="PENDING">Pending</option>

          <option value="IN_PROGRESS">In Progress</option>

          <option value="COMPLETED">Completed</option>
        </select>

        <select
          value={priorityFilter}
          onChange={(event) => setPriorityFilter(event.target.value)}
        >
          <option value="ALL">All Priorities</option>

          <option value="HIGH">High</option>

          <option value="MEDIUM">Medium</option>

          <option value="LOW">Low</option>
        </select>
      </section>

      {/* Tasks Table */}

      <section className="table-card">
        <div className="section-header">
          <div>
            <h2>Task List</h2>

            <p>{filteredTasks.length} task(s) found.</p>
          </div>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Task</th>
                <th>Project</th>
                <th>Assigned To</th>
                <th>Priority</th>
                <th>Due Date</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredTasks.length === 0 ? (
                <tr>
                  <td colSpan="6" className="empty-state">
                    No tasks found.
                  </td>
                </tr>
              ) : (
                filteredTasks.map((task) => (
                  <tr key={task.id}>
                    <td>
                      <strong>{task.title}</strong>

                      <small className="table-subtext">
                        {task.description}
                      </small>
                    </td>

                    <td>{task.project}</td>

                    <td>{task.assignedTo}</td>

                    <td>
                      <span
                        className={`priority-badge ${getPriorityClass(
                          task.priority,
                        )}`}
                      >
                        {formatStatus(task.priority)}
                      </span>
                    </td>

                    <td>{task.dueDate}</td>

                    <td>
                      <span
                        className={`status-badge ${getStatusClass(
                          task.status,
                        )}`}
                      >
                        {formatStatus(task.status)}
                      </span>
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

export default Tasks;
