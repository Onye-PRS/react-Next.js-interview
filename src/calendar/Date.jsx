import { currentDayNum } from "./cal.module.scss";
import { Modal } from "./Modal";
import { useState } from "react";
import { Button } from "antd";
import { setSelectedDate } from "../redux/selectedDateSlice";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";

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
    console.log("filter dates", filterDates);
    return filterDates.map((date) => state.calender.reminders[date]);
  });

  const [visible, setVisible] = useState(false);

  const showModal = () => {
    if (!visible) {
      dispatch(setSelectedDate(date.format()));
      setVisible(true);
    }
  };

  return (
    <div className={`calDay ${isGrayOut ? "grayOut" : ""}`} onClick={showModal}>
      <Modal visible={visible} setVisible={setVisible} />
      <div className={`${date.isToday() ? currentDayNum : ""}`}>
        {date.format("D")}
      </div>
      {/* // TODO: CLICK A REMINDER  */}
      <div>
        {reminders.map((remind,i) => (
          <div key={remind.date + i}>{remind.message}</div>
        ))}
      </div>
    </div>
  );
};
