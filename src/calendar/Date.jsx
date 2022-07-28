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
    const reminderDates = Object.keys(state.calender.reminders);
    const startOfDate = date.set("hour", 0).set("minute", 0).set("second", 0);
    const endOfDate = date.set("hour", 11).set("minute", 59).set("second", 59);
    const filterDates = reminderDates.filter(
      (date) =>
        dayjs(date).isAfter(startOfDate) && dayjs(date).isBefore(endOfDate)
    );
    // console.log("filter dates", filterDates);
    return filterDates.map((date) => state.calender.reminders[date]);
  });

  const [visible, setVisible] = useState(false);

  const showModal = (e) => {
    if (!visible && e.target.className !== "reminder") {
      dispatch(setSelectedDate({ date: date.format(), type: "new" }));
      setVisible(true);
    }
  };

  return (
    <div className={`calDay ${isGrayOut ? "grayOut" : ""}`} onClick={showModal}>
      <Modal visible={visible} setVisible={setVisible} />
      <div className={`${dayNum}`} style={{backgroundColor: isGrayOut? "gray": ""}}>
        {/* if it is current day, add a white background */}
        {date.isToday() && (
          <div className={currentDayNum}>{date.format("D")}</div>
        )}
        {!date.isToday() && date.format("D")}
      </div>
      <div>
        {reminders.map((reminder, i) => (
          <Reminder reminder={reminder} setVisible={setVisible} />
        ))}
      </div>
    </div>
  );
};
