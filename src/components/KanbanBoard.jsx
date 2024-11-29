import React from "react";
import ticketsData from "../data/tickets";
// import "./styles/kanban.css";

// Utility functions for grouping and sorting
const groupTickets = (tickets, groupBy) => {
  const groups = {};

  tickets.forEach((ticket) => {
    let key;

    if (groupBy === "user") {
      // Get the user's name from the userId
      const user = ticketsData.users.find((user) => user.id === ticket.userId);
      key = user ? user.name : "Unassigned";
    } else {
      key = ticket[groupBy]; // groupBy 'status' or 'priority'
    }

    if (!groups[key]) groups[key] = [];
    groups[key].push(ticket);
  });

  return groups;
};

const sortTickets = (tickets, sortBy) => {
  return [...tickets].sort((a, b) => {
    if (sortBy === "priority") return b.priority - a.priority;
    if (sortBy === "title") return a.title.localeCompare(b.title);
    return 0;
  });
};

// Avatar Component
const Avatar = ({ user }) => {
  const avatarStyle = {
    width: "25px",
    height: "26px",
    borderRadius: "50%",
    display: "inline-block",
    backgroundColor: "#007bff",
    color: "#fff",
    textAlign: "center",
    lineHeight: "30px",
    fontSize: "14px",
    marginRight: "10px",
    float: "right",
  };

  if (!user) {
    return <div style={{ ...avatarStyle, backgroundColor: "#ddd" }}>?</div>;
  }

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return <div style={avatarStyle}>{initials}</div>;
};

const KanbanBoard = ({ groupBy, sortBy }) => {
  const groupedTickets = groupTickets(ticketsData.tickets, groupBy);

  return (
    <div className="kanban-board">
      {Object.keys(groupedTickets).map((group) => (
        <div key={group} className="kanban-column">
          <div style={{ display: "flex" }}>
            <h2>{group}</h2>
          </div>
          {sortTickets(groupedTickets[group], sortBy).map((ticket) => {
            const user = ticketsData.users.find((u) => u.id === ticket.userId);

            return (
              <div key={ticket.id} className="ticket-card">
                <div className="ticket-header">
                  <Avatar user={user} />
                  <h3>{ticket.title}</h3>
                </div>
                <p>Priority: {ticket.priority}</p>
                <p>Status: {ticket.status}</p>
                {/* <p>Assigned to: {user?.name || "Unassigned"}</p> */}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;
