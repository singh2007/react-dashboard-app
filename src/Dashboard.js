import React, { useState } from "react";
import './Dashboard.css';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    categories: [
      {
        id: 1,
        name: "CSPM Executive Dashboard",
        widgets: [
          { id: 101, name: "Cloud Accounts", text: "Total: 2\nConnected: 2\nNot Connected: 2" },
          { id: 102, name: "Cloud Account Risk Assessment", text: "Total: 9859\nFailed: 1069\nWarning: 881" }
        ]
      },
      {
        id: 2,
        name: "CWPP Dashboard",
        widgets: [
          { id: 201, name: "Top 5 Namespace Specific Alerts", text: "No Graph data available" },
          { id: 202, name: "Workload Alerts", text: "No Graph data available" }
        ]
      },
      {
        id: 3,
        name: "Registry Scan",
        widgets: [
          { id: 301, name: "Image Risk Assessment", text: "1470 Total Vulnerabilities\nCritical: 10\nHigh: 560" },
          { id: 302, name: "Image Security Issues", text: "2 Total Images\nCritical: 2\nHigh: 6" }
        ]
      }
    ]
  });

  const [newWidget, setNewWidget] = useState({ name: "", text: "", categoryId: 1 });
  const [searchTerm, setSearchTerm] = useState("");

  const addWidget = () => {
    const newId = Math.random() * 1000; // Random ID generation
    const updatedCategories = dashboardData.categories.map((category) => {
      if (category.id === parseInt(newWidget.categoryId)) {
        return {
          ...category,
          widgets: [...category.widgets, { id: newId, name: newWidget.name, text: newWidget.text }]
        };
      }
      return category;
    });
    setDashboardData({ categories: updatedCategories });
    setNewWidget({ name: "", text: "", categoryId: 1 });
  };

  const removeWidget = (categoryId, widgetId) => {
    const updatedCategories = dashboardData.categories.map((category) => {
      if (category.id === categoryId) {
        return {
          ...category,
          widgets: category.widgets.filter((widget) => widget.id !== widgetId)
        };
      }
      return category;
    });
    setDashboardData({ categories: updatedCategories });
  };

  const filteredWidgets = dashboardData.categories.map((category) => ({
    ...category,
    widgets: category.widgets.filter((widget) =>
      widget.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }));

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <input
          type="text"
          placeholder="Search anything..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
        <div className="time-filter">
          <button className="time-button">Last 2 days</button>
        </div>
      </div>

      <div className="dashboard-grid">
        {filteredWidgets.map((category) => (
          <div key={category.id} className="category">
            <h3>{category.name}</h3>
            <div className="category-grid">
              {category.widgets.map((widget) => (
                <div key={widget.id} className="widget">
                  <h4>{widget.name}</h4>
                  <p>{widget.text}</p>
                  <button className="remove-widget" onClick={() => removeWidget(category.id, widget.id)}>✖</button>
                </div>
              ))}
              <div className="widget add-widget">
                <button onClick={() => addWidget()}>+ Add Widget</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="add-widget-form">
        <h3>Add a New Widget</h3>
        <select
          value={newWidget.categoryId}
          onChange={(e) => setNewWidget({ ...newWidget, categoryId: e.target.value })}
        >
          {dashboardData.categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Widget Name"
          value={newWidget.name}
          onChange={(e) => setNewWidget({ ...newWidget, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Widget Text"
          value={newWidget.text}
          onChange={(e) => setNewWidget({ ...newWidget, text: e.target.value })}
        />
        <button onClick={addWidget}>Add Widget</button>
      </div>
    </div>
  );
};

export default Dashboard;
