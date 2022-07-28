import { currentDayNum } from "./cal.module.scss";

export const Date = ({ date, isGrayOut }) => {
  return (
    <div className={`calDay ${isGrayOut ? "grayOut" : ""}`}>
      <div className={`${date.isToday() ? currentDayNum : ""}`}>
        {date.format("D")}
      </div>
    </div>
  );
};
