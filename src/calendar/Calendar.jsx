import React from "react";
import dayjs from "dayjs";
import styles from "./cal.module.scss";

export const Calendar = () => {
  const weekdaysShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const now = dayjs();

  const daysInMonth = now.daysInMonth();
  const currentDay = now.startOf("month").day();
  const daysInFirstWeek = 7 - currentDay;
  const remainDays = daysInMonth - daysInFirstWeek;
  const weeksToDisplay = Math.ceil(remainDays / 7);
  console.log("REMIND", remainDays, weeksToDisplay);
  const days = Array.from({ length: 7 }, (v, i) => i);
  console.log(days);
  const weeks = Array.from({ length: weeksToDisplay + 1 }, (v, i) => i);
  const lastDay = now.endOf("month").day();
  let dayCounter = 0;

  console.log("DAYS IN MONTH", daysInMonth);
  console.log("END OF MONTH day", lastDay);
  return (
    <div>
      <h2>{now.format("MMMM")}</h2>
      <div className={styles.calHeader}>
        {weekdaysShort.map((dayName) => {
          return <div className="header-item">{dayName} </div>;
        })}
      </div>
      <div>
        {weeks.map((week) => {
          if (week === 0) {
            return (
              <div className={styles.calWeek}>
                {days.map((dayBox, i) => {
                  if (dayBox < currentDay) {
                    return <div className="calDay">NO DATE</div>;
                  }
                  dayCounter++;
                  return <div className="calDay">{dayCounter}</div>;
                })}
              </div>
            );
          }
          if (week === weeksToDisplay) {
            return (
              <div className={styles.calWeek}>
                {days.map((dayBox, i) => {
                  if (lastDay < dayBox) {
                    return <div className="calDay">NO DATE</div>;
                  }
                  dayCounter++;
                  return <div className="calDay">{dayCounter}</div>;
                })}
              </div>
            );
          }
          return (
            <div className={styles.calWeek}>
              {days.map((dayBox, i) => {
                dayCounter++;

                return <div className="calDay">{dayCounter}</div>;
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};
