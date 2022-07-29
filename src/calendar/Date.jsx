import { currentDayNum, dayNum } from "./cal.module.scss";
import { Modal } from "./Modal";
import { useState } from "react";
import { Button } from "antd";
import { setSelectedDate } from "../redux/selectedDateSlice";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { Reminder } from "./Reminder";

export const Date = ({ date, isGrayOut }) => {
  const dispatch = useDispatch();

  const reminders = useSelector((state) => {
    const startOfDate = date.startOf("day");
    const endOfDate = date.endOf("day");
    const dayReminders = Object.keys(state.calender.reminders)
      .filter(
        (date) =>
          dayjs(date).isAfter(startOfDate) && dayjs(date).isBefore(endOfDate)
      )
      .map((date) => state.calender.reminders[date])
      .sort((a, b) => {
        if (a.date > b.date) {
          return 1;
        } else if (b.date > a.date) {
          return -1;
        }
        return 0;
      });
    return dayReminders;
  });

  const [visible, setVisible] = useState(false);

  const showModal = (e) => {
    if (!visible) {
      dispatch(setSelectedDate({ date: date.format(), type: "new" }));
      setVisible(true);
    }
  };
  return (
    <div
      className={`calDay ${isGrayOut ? "grayOut" : ""}`}
      onClick={showModal}
    >
      <Modal visible={visible} setVisible={setVisible} />
      <div
        className={`${dayNum}`}
        style={{ backgroundColor: isGrayOut ? "#e4e9f0" : "" }}
      >
        {/* if it is current day, add a white background */}
        {date.isToday() && (
          <div className={currentDayNum}>{date.format("D")}</div>
        )}
        {!date.isToday() && date.format("D")}
      </div>
      <div>
        {reminders.map((reminder) => (
          <Reminder reminder={reminder} setVisible={setVisible} key={reminder.date} />
        ))}
      </div>
    </div>
  );
};
