import React from "react";

export const Reminder = ({ reminder }) => {
  return (
    <div
      key={reminder.date}
      style={{ background: reminder.color, color: "white" }}
    >
      {reminder.message}
    </div>
  );
};
