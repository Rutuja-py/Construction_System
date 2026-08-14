import React, { useMemo, useState } from "react";

const Reports = () => {
  const [reportType, setReportType] = useState("PROJECT");

  const [dateRange, setDateRange] = useState("THIS_MONTH");

  const projects = [
    {
      name: "Green Valley Residential Complex",
      budget: 85000000,
      spent: 52400000,
      progress: 78,
      tasks: 42,
      completedTasks: 34,
    },
    {
      name: "Metro Commercial Tower",
      budget: 122000000,
      spent: 68500000,
      progress: 54,
      tasks: 38,
      completedTasks: 21,
    },
    {
      name: "Sunrise Highway Project",
      budget: 58000000,
      spent: 51200000,
      progress: 92,
      tasks: 31,
      completedTasks: 29,
    },
    {
      name: "Riverfront Office Complex",
      budget: 97000000,
      spent: 12000000,
      progress: 5,
      tasks: 18,
      completedTasks: 2,
    },
  ];

  const expenses = [
    {
      category: "Material",
      amount: 18400000,
    },
    {
      category: "Labour",
      amount: 9200000,
    },
    {
      category: "Equipment",
      amount: 5300000,
    },
    {
      category: "Transport",
      amount: 2100000,
    },
    {
      category: "Other",
      amount: 950000,
    },
  ];

  const taskSummary = [
    {
      status: "Completed",
      count: 86,
    },
    {
      status: "In Progress",
      count: 24,
    },
    {
      status: "Pending",
      count: 18,
    },
    {
      status: "Overdue",
      count: 7,
    },
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const totalBudget = useMemo(() => {
    return projects.reduce((total, project) => total + project.budget, 0);
  }, []);

  const totalSpent = useMemo(() => {
    return projects.reduce((total, project) => total + project.spent, 0);
  }, []);

  const totalTasks = useMemo(() => {
    return projects.reduce((total, project) => total + project.tasks, 0);
  }, []);

  const completedTasks = useMemo(() => {
    return projects.reduce(
      (total, project) => total + project.completedTasks,
      0,
    );
  }, []);

  const completionRate =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  const exportReport = () => {
    const reportData = {
      reportType,
      dateRange,
      generatedAt: new Date().toISOString(),
      totalProjects: projects.length,
      totalBudget,
      totalSpent,
      totalTasks,
      completedTasks,
      completionRate,
    };

    const json = JSON.stringify(reportData, null, 2);

    const blob = new Blob([json], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "construction-project-report.json";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <div className="reports-page">
      <div className="page-header">
        <div>
          <h1>Reports</h1>

          <p>Analyze project performance, expenses and task progress.</p>
        </div>

        <button className="primary-button" onClick={exportReport}>
          Export Report
        </button>
      </div>

      {/* Report Controls */}

      <section className="filter-card">
        <div className="form-group">
          <label>Report Type</label>

          <select
            value={reportType}
            onChange={(event) => setReportType(event.target.value)}
          >
            <option value="PROJECT">Project Report</option>

            <option value="TASK">Task Report</option>

            <option value="EXPENSE">Expense Report</option>

            <option value="OVERALL">Overall Report</option>
          </select>
        </div>

        <div className="form-group">
          <label>Date Range</label>

          <select
            value={dateRange}
            onChange={(event) => setDateRange(event.target.value)}
          >
            <option value="THIS_MONTH">This Month</option>

            <option value="LAST_MONTH">Last Month</option>

            <option value="THIS_QUARTER">This Quarter</option>

            <option value="THIS_YEAR">This Year</option>

            <option value="ALL_TIME">All Time</option>
          </select>
        </div>
      </section>

      {/* Overall Statistics */}

      <div className="statistics-grid">
        <div className="stat-card">
          <div className="stat-card-top">
            <div>
              <p className="stat-title">Total Projects</p>

              <h2 className="stat-value">{projects.length}</h2>
            </div>

            <div className="stat-icon">🏗️</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-top">
            <div>
              <p className="stat-title">Total Budget</p>

              <h2 className="stat-value">{formatCurrency(totalBudget)}</h2>
            </div>

            <div className="stat-icon">💼</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-top">
            <div>
              <p className="stat-title">Total Spent</p>

              <h2 className="stat-value">{formatCurrency(totalSpent)}</h2>
            </div>

            <div className="stat-icon">💰</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-top">
            <div>
              <p className="stat-title">Task Completion</p>

              <h2 className="stat-value">{completionRate}%</h2>
            </div>

            <div className="stat-icon">📊</div>
          </div>
        </div>
      </div>

      {/* Project Performance */}

      <section className="details-card">
        <div className="section-header">
          <div>
            <h2>Project Performance</h2>

            <p>Budget, expenditure and completion analysis.</p>
          </div>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Project</th>
                <th>Budget</th>
                <th>Spent</th>
                <th>Remaining</th>
                <th>Progress</th>
                <th>Tasks</th>
              </tr>
            </thead>

            <tbody>
              {projects.map((project) => {
                const remaining = project.budget - project.spent;

                const taskCompletion =
                  project.tasks === 0
                    ? 0
                    : Math.round(
                        (project.completedTasks / project.tasks) * 100,
                      );

                return (
                  <tr key={project.name}>
                    <td>
                      <strong>{project.name}</strong>
                    </td>

                    <td>{formatCurrency(project.budget)}</td>

                    <td>{formatCurrency(project.spent)}</td>

                    <td>{formatCurrency(remaining)}</td>

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

                    <td>
                      {project.completedTasks}
                      {" / "}
                      {project.tasks}

                      <small className="table-subtext">
                        {taskCompletion}% completed
                      </small>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Expense Report */}

      <section className="details-card">
        <div className="section-header">
          <div>
            <h2>Expense Distribution</h2>

            <p>Expenses grouped by category.</p>
          </div>
        </div>

        <div className="expense-report-list">
          {expenses.map((expense) => {
            const totalExpense = expenses.reduce(
              (total, item) => total + item.amount,
              0,
            );

            const percentage =
              totalExpense === 0
                ? 0
                : Math.round((expense.amount / totalExpense) * 100);

            return (
              <div className="expense-report-item" key={expense.category}>
                <div className="expense-report-header">
                  <span>{expense.category}</span>

                  <strong>{formatCurrency(expense.amount)}</strong>
                </div>

                <div className="progress-bar">
                  <div
                    className="progress-value"
                    style={{
                      width: `${percentage}%`,
                    }}
                  />
                </div>

                <small>{percentage}% of total expenses</small>
              </div>
            );
          })}
        </div>
      </section>

      {/* Task Report */}

      <section className="details-card">
        <div className="section-header">
          <div>
            <h2>Task Status Report</h2>

            <p>Current distribution of project tasks.</p>
          </div>
        </div>

        <div className="report-stat-grid">
          {taskSummary.map((item) => (
            <div className="report-stat-item" key={item.status}>
              <span>{item.status}</span>

              <strong>{item.count}</strong>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Reports;
