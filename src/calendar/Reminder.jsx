import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSelectedDate } from "../redux/selectedDateSlice";
import { deleteReminder } from "../redux/remindersSlice";

import { Tag, message, Popconfirm } from "antd";

export const Reminder = ({ reminder, setVisible }) => {
  const dispatch = useDispatch();

  const handleOnClick = () => {
    dispatch(setSelectedDate({ date: reminder.date, type: "edit" }));
    setVisible(true);
  };
  const confirm = (e) => {
    dispatch(deleteReminder(reminder))
    console.log(e);
    message.success("Reminder Deleted");
  };
  const cancel = (e) => {
    console.log(e);
    // message.error("Click on No");
  };
  return (
    <div
      key={reminder.date}
      style={{ background: reminder.color, color: "white" }}
      onClick={handleOnClick}
      className="reminder"
    >
      <Tag
        closable
        onClose={(e) => {
          console.log("tag on close function called");
          e.preventDefault();
        }}
        closeIcon={
          <Popconfirm
            title="Are you sure to delete this task?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            {" "}
            X{" "}
          </Popconfirm>
        }
      >
        {reminder.message}
      </Tag>
    </div>
  );
};
