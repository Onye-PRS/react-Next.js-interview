import { useState } from "react";
import dayjs from "dayjs";
import styles from "./cal.module.scss";

export const Calendar = () => {
  // dayjs stuff
  const weekdaysShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const now = dayjs();
  const firstOfTheMonth = dayjs().date(1);
  console.log(firstOfTheMonth);
  // react app state
  const [currentMonth, setCurrentMonth] = useState(firstOfTheMonth);
  console.log("currentMont", currentMonth);
  const daysInMonth = currentMonth.daysInMonth();

  const currentDay = currentMonth.startOf("month").day();
  const daysInFirstWeek = 7 - currentDay;
  const remainDays = daysInMonth - daysInFirstWeek;
  const weeksToDisplay = Math.ceil(remainDays / 7);
  console.log("REMIND", remainDays, weeksToDisplay);
  const days = Array.from({ length: 7 }, (v, i) => i);
  console.log(days);
  const weeks = Array.from({ length: weeksToDisplay + 1 }, (v, i) => i);
  const lastDay = currentMonth.endOf("month").day();
  let dayCounter = -1;

  console.log("DAYS IN MONTH", daysInMonth);
  console.log("END OF MONTH day", lastDay);

  const renderDay = (date, isGrayOut) => {
    return <div className={`calDay ${isGrayOut ? "grayOut" : ""}`}>{date}</div>;
  };

  const changeMonth = (step) => {
    setCurrentMonth((prev) => prev.add(step, "month"));
  };
  return (
    <div>
      <div className={styles.calYears}>
        <button onClick={() => changeMonth(-1)}>⬅️</button>
        <h2>{currentMonth.format("MMMM YYYY")}</h2>
        <button onClick={() => changeMonth(1)}>➡️</button>
      </div>
      <div className={styles.calHeader}>
        {weekdaysShort.map((dayName) => {
          return <div className="header-item">{dayName} </div>;
        })}
      </div>
      <div>
        {weeks.map((week) => {
          return (
            <div className={styles.calWeek}>
              {days.map((dayBox, i) => {
                // handle displaying previous month days
                if (dayBox < currentDay && week === 0) {
                  return renderDay(
                    firstOfTheMonth
                      .subtract(currentDay - dayBox, "day")
                      .format("D"),
                    true
                  );
                }
                // gray out the displaying dates of next month
                dayCounter++;
                const isGrayedOut = dayCounter >= daysInMonth;

                return renderDay(
                  firstOfTheMonth.add(dayCounter, "day").format("D"),
                  isGrayedOut
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};
