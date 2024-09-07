import React, { useState } from "react";
import './Dashboard.css';
import { Modal, Tabs, Tab, Checkbox, Button } from '@mui/material';

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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWidgets, setSelectedWidgets] = useState({});
  const [currentTab, setCurrentTab] = useState(0);

  const toggleWidgetSelection = (categoryId, widgetId) => {
    const key = `${categoryId}-${widgetId}`;
    setSelectedWidgets({
      ...selectedWidgets,
      [key]: !selectedWidgets[key]
    });
  };

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleConfirm = () => {
    // Logic for adding/removing widgets based on the selectedWidgets state
    setIsModalOpen(false);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <input
          type="text"
          placeholder="Search anything..."
          className="search-bar"
        />
        <div className="time-filter">
          <button className="time-button">Last 2 days</button>
        </div>
        <Button onClick={() => setIsModalOpen(true)} variant="contained">Add Widget</Button>
      </div>

      <div className="dashboard-grid">
        {dashboardData.categories.map((category) => (
          <div key={category.id} className="category">
            <h3>{category.name}</h3>
            <div className="category-grid">
              {category.widgets.map((widget) => (
                <div key={widget.id} className="widget">
                  <h4>{widget.name}</h4>
                  <p>{widget.text}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Modal for adding/removing widgets */}
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="modal-container">
          <h2>Add Widget</h2>
          <p>Personalize your dashboard by adding the following widgets:</p>
          <Tabs value={currentTab} onChange={handleTabChange}>
            <Tab label="CSPM" />
            <Tab label="CWPP" />
            <Tab label="Image" />
            <Tab label="Ticket" />
          </Tabs>

          <div className="widget-list">
            {dashboardData.categories[currentTab].widgets.map((widget) => (
              <div key={widget.id} className="widget-item">
                <Checkbox
                  checked={!!selectedWidgets[`${dashboardData.categories[currentTab].id}-${widget.id}`]}
                  onChange={() => toggleWidgetSelection(dashboardData.categories[currentTab].id, widget.id)}
                />
                {widget.name}
              </div>
            ))}
          </div>

          <div className="modal-actions">
            <Button onClick={() => setIsModalOpen(false)} variant="outlined">Cancel</Button>
            <Button onClick={handleConfirm} variant="contained">Confirm</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Dashboard;
