import React, { useState } from "react";
import KanbanBoard from "./components/KanbanBoard";
import "./styles/kanban.css";

const App = () => {
  const [groupBy, setGroupBy] = useState("status"); // Default grouping by status
  const [sortBy, setSortBy] = useState("priority"); // Default sorting by priority

  return (
    <div className="app">
      <div className="controls">
        <label>
          Group By:
          <select value={groupBy} onChange={(e) => setGroupBy(e.target.value)}>
            <option value="status">Status</option>
            <option value="user">User</option>
            <option value="priority">Priority</option>
          </select>
        </label>
        <label>
          Sort By:
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="priority">Priority</option>
            <option value="title">Title</option>
          </select>
        </label>
      </div>
      <KanbanBoard groupBy={groupBy} sortBy={sortBy} />
    </div>
  );
};

export default App;
