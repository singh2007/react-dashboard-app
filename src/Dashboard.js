import React, { useState } from "react";
import './Dashboard.css';
import { Modal, Checkbox, Button, Tabs, Tab } from '@mui/material';
import {
  PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar
} from 'recharts';

const Dashboard = () => {
  // Dashboard state
  const [dashboardData, setDashboardData] = useState({
    categories: [
      {
        id: 1,
        name: "CSPM Executive Dashboard",
        widgets: [
          {
            id: 101,
            name: "Cloud Accounts",
            type: "pie",
            data: [
              { name: 'Connected', value: 2 },
              { name: 'Not Connected', value: 2 }
            ],
            colors: ['#0088FE', '#FF8042']
          },
          {
            id: 102,
            name: "Cloud Account Risk Assessment",
            type: "pie",
            data: [
              { name: 'Failed', value: 1069 },
              { name: 'Warning', value: 881 },
              { name: 'Passed', value: 7253 },
              { name: 'Not Available', value: 656 }
            ],
            colors: ['#FF8042', '#FFBB28', '#00C49F', '#FF9999']
          }
        ]
      },
      {
        id: 2,
        name: "CWPP Dashboard",
        widgets: [
          {
            id: 201,
            name: "Top 5 Namespace Specific Alerts",
            type: "bar",
            data: [
              { name: 'Namespace 1', alerts: 40 },
              { name: 'Namespace 2', alerts: 30 },
              { name: 'Namespace 3', alerts: 20 },
              { name: 'Namespace 4', alerts: 27 },
              { name: 'Namespace 5', alerts: 18 }
            ]
          },
          {
            id: 202,
            name: "Workload Alerts",
            type: "line",
            data: [
              { name: 'Jan', alerts: 40 },
              { name: 'Feb', alerts: 30 },
              { name: 'Mar', alerts: 20 },
              { name: 'Apr', alerts: 27 },
              { name: 'May', alerts: 18 }
            ]
          }
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
    // Add or remove widgets based on the selection
    // Here you can write logic to modify the dashboardData
    setIsModalOpen(false);
  };

  const renderGraph = (widget) => {
    switch (widget.type) {
      case "pie":
        return (
          <PieChart width={200} height={200}>
            <Pie
              data={widget.data}
              cx={100}
              cy={100}
              innerRadius={60}
              outerRadius={80}
              fill="#82ca9d"
              dataKey="value"
            >
              {widget.data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={widget.colors[index % widget.colors.length]} />
              ))}
            </Pie>
          </PieChart>
        );
      case "bar":
        return (
          <BarChart width={300} height={200} data={widget.data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="alerts" fill="#8884d8" />
          </BarChart>
        );
      case "line":
        return (
          <LineChart
            width={300}
            height={200}
            data={widget.data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="alerts" stroke="#8884d8" />
          </LineChart>
        );
      default:
        return <p>No Graph data available</p>;
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <input
          type="text"
          placeholder="Search anything..."
          className="search-bar"
        />
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
                  {renderGraph(widget)}
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
          <p>Personalize your dashboard by adding widgets:</p>
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
