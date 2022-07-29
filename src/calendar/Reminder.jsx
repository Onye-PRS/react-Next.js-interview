import { useDispatch } from "react-redux";
import { setSelectedDate } from "../redux/selectedDateSlice";
import { deleteReminder } from "../redux/remindersSlice";
import { Tag } from "antd";
import { colorMap } from "../util/colorMap";
import styles from "./reminder.module.scss"

export const Reminder = ({ reminder, setVisible }) => {
  const dispatch = useDispatch();

  const handleOnClick = (e) => {
    e.stopPropagation();
    dispatch(setSelectedDate({ date: reminder.date, type: "edit" }));
    setVisible(true);
  };

  return (
    <div key={reminder.date} onClick={handleOnClick} className={styles.reminder}>
      <Tag
        closable
        onClose={(e) => {
          console.log("tag on close function called");
          e.preventDefault();
          dispatch(deleteReminder(reminder));
        }}
        style={{ width: "100%" , overflowX: "hidden"}}
        color={colorMap[reminder.color]}
      >
        {reminder.message}
      </Tag>
    </div>
  );
};
