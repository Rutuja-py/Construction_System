import React, { useMemo, useState } from "react";

const Expenses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [showForm, setShowForm] = useState(false);

  const [expenses, setExpenses] = useState([
    {
      id: 1,
      expenseCode: "EXP-001",
      project: "Green Valley Residential Complex",
      category: "MATERIAL",
      description: "Cement procurement",
      amount: 1250000,
      date: "2026-08-02",
      submittedBy: "Rahul Patil",
      status: "APPROVED",
    },
    {
      id: 2,
      expenseCode: "EXP-002",
      project: "Metro Commercial Tower",
      category: "MATERIAL",
      description: "Structural steel",
      amount: 2800000,
      date: "2026-08-04",
      submittedBy: "Vijay Shah",
      status: "APPROVED",
    },
    {
      id: 3,
      expenseCode: "EXP-003",
      project: "Green Valley Residential Complex",
      category: "LABOUR",
      description: "Monthly labour payment",
      amount: 950000,
      date: "2026-08-05",
      submittedBy: "Rahul Patil",
      status: "PENDING",
    },
    {
      id: 4,
      expenseCode: "EXP-004",
      project: "Sunrise Highway Project",
      category: "EQUIPMENT",
      description: "Excavator rental",
      amount: 450000,
      date: "2026-08-06",
      submittedBy: "Amit Joshi",
      status: "APPROVED",
    },
    {
      id: 5,
      expenseCode: "EXP-005",
      project: "Metro Commercial Tower",
      category: "TRANSPORT",
      description: "Material transportation",
      amount: 185000,
      date: "2026-08-07",
      submittedBy: "Vijay Shah",
      status: "PENDING",
    },
  ]);

  const [formData, setFormData] = useState({
    project: "",
    category: "MATERIAL",
    description: "",
    amount: "",
    date: "",
    submittedBy: "",
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

    const newExpense = {
      id: Date.now(),
      expenseCode: `EXP-${String(expenses.length + 1).padStart(3, "0")}`,
      ...formData,
      amount: Number(formData.amount),
      status: "PENDING",
    };

    setExpenses((previous) => [...previous, newExpense]);

    setFormData({
      project: "",
      category: "MATERIAL",
      description: "",
      amount: "",
      date: "",
      submittedBy: "",
    });

    setShowForm(false);
  };

  const filteredExpenses = useMemo(() => {
    return expenses.filter((expense) => {
      const search = searchTerm.toLowerCase();

      const matchesSearch =
        expense.expenseCode.toLowerCase().includes(search) ||
        expense.project.toLowerCase().includes(search) ||
        expense.description.toLowerCase().includes(search) ||
        expense.submittedBy.toLowerCase().includes(search);

      const matchesStatus =
        statusFilter === "ALL" || expense.status === statusFilter;

      const matchesCategory =
        categoryFilter === "ALL" || expense.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [expenses, searchTerm, statusFilter, categoryFilter]);

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
    if (status === "APPROVED") {
      return "status-completed";
    }

    if (status === "REJECTED") {
      return "status-danger";
    }

    if (status === "PENDING") {
      return "status-pending";
    }

    return "status-default";
  };

  const totalAmount = filteredExpenses.reduce(
    (total, expense) => total + Number(expense.amount),
    0,
  );

  const approvedAmount = filteredExpenses
    .filter((expense) => expense.status === "APPROVED")
    .reduce((total, expense) => total + Number(expense.amount), 0);

  const pendingAmount = filteredExpenses
    .filter((expense) => expense.status === "PENDING")
    .reduce((total, expense) => total + Number(expense.amount), 0);

  return (
    <div className="expenses-page">
      <div className="page-header">
        <div>
          <h1>Expenses</h1>

          <p>Track and manage construction project expenses.</p>
        </div>

        <button
          className="primary-button"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Close Form" : "+ Add Expense"}
        </button>
      </div>

      {/* Expense Summary */}

      <div className="statistics-grid">
        <div className="stat-card">
          <div className="stat-card-top">
            <div>
              <p className="stat-title">Total Expenses</p>

              <h2 className="stat-value">{formatCurrency(totalAmount)}</h2>
            </div>

            <div className="stat-icon">💰</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-top">
            <div>
              <p className="stat-title">Approved</p>

              <h2 className="stat-value">{formatCurrency(approvedAmount)}</h2>
            </div>

            <div className="stat-icon">✅</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-top">
            <div>
              <p className="stat-title">Pending</p>

              <h2 className="stat-value">{formatCurrency(pendingAmount)}</h2>
            </div>

            <div className="stat-icon">⏳</div>
          </div>
        </div>
      </div>

      {/* Add Expense */}

      {showForm && (
        <section className="form-card">
          <div className="section-header">
            <div>
              <h2>Record Expense</h2>

              <p>Add a new project expense.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-grid">
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
                <label>Category</label>

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="MATERIAL">Material</option>

                  <option value="LABOUR">Labour</option>

                  <option value="EQUIPMENT">Equipment</option>

                  <option value="TRANSPORT">Transport</option>

                  <option value="OTHER">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label>Amount</label>

                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="Enter amount"
                  min="0"
                  required
                />
              </div>

              <div className="form-group">
                <label>Date</label>

                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Submitted By</label>

                <input
                  type="text"
                  name="submittedBy"
                  value={formData.submittedBy}
                  onChange={handleChange}
                  placeholder="Employee name"
                  required
                />
              </div>

              <div className="form-group form-group-full">
                <label>Description</label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Expense description"
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
                Submit Expense
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
            placeholder="Search expenses..."
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

          <option value="APPROVED">Approved</option>

          <option value="REJECTED">Rejected</option>
        </select>

        <select
          value={categoryFilter}
          onChange={(event) => setCategoryFilter(event.target.value)}
        >
          <option value="ALL">All Categories</option>

          <option value="MATERIAL">Material</option>

          <option value="LABOUR">Labour</option>

          <option value="EQUIPMENT">Equipment</option>

          <option value="TRANSPORT">Transport</option>

          <option value="OTHER">Other</option>
        </select>
      </section>

      {/* Expense Table */}

      <section className="table-card">
        <div className="section-header">
          <div>
            <h2>Expense Records</h2>

            <p>{filteredExpenses.length} record(s) found.</p>
          </div>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Code</th>
                <th>Project</th>
                <th>Category</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Submitted By</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredExpenses.length === 0 ? (
                <tr>
                  <td colSpan="8" className="empty-state">
                    No expenses found.
                  </td>
                </tr>
              ) : (
                filteredExpenses.map((expense) => (
                  <tr key={expense.id}>
                    <td>
                      <strong>{expense.expenseCode}</strong>
                    </td>

                    <td>{expense.project}</td>

                    <td>{formatStatus(expense.category)}</td>

                    <td>{expense.description}</td>

                    <td>
                      <strong>{formatCurrency(expense.amount)}</strong>
                    </td>

                    <td>{expense.date}</td>

                    <td>{expense.submittedBy}</td>

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
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Expenses;
