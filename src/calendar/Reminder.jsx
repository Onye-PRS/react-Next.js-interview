import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSelectedDate } from "../redux/selectedDateSlice";

export const Reminder = ({ reminder,setVisible }) => {
  const dispatch = useDispatch();

  const handleOnClick = () => {
    dispatch(setSelectedDate({ date: reminder.date, type: "edit" }));
    setVisible(true)
  };

  return (
    <div
      key={reminder.date}
      style={{ background: reminder.color, color: "white" }}
      onClick={handleOnClick}
      className="reminder"
    >
      {reminder.message}
    </div>
  );
};
