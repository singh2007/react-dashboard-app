import React, { useState } from "react";
import './Dashboard.css';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    categories: [
      {
        id: 1,
        name: "CSPM Executive Dashboard",
        widgets: [
          { id: 101, name: "Widget 1", text: "Sample text for Widget 1" },
          { id: 102, name: "Widget 2", text: "Sample text for Widget 2" }
        ]
      },
      {
        id: 2,
        name: "Operations Dashboard",
        widgets: [{ id: 201, name: "Widget 3", text: "Sample text for Widget 3" }]
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
    <div>
      <input
        type="text"
        placeholder="Search Widgets..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filteredWidgets.map((category) => (
        <div key={category.id}>
          <h3>{category.name}</h3>
          {category.widgets.map((widget) => (
            <div key={widget.id} style={{ display: "flex", alignItems: "center" }}>
              <h4>{widget.name}</h4>
              <p>{widget.text}</p>
              <button onClick={() => removeWidget(category.id, widget.id)}>✖</button>
            </div>
          ))}
        </div>
      ))}

      <div>
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
