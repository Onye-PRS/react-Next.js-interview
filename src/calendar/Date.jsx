export const Date = ({ date, isGrayOut }) => {
  return (
    <div className={`calDay ${isGrayOut ? "grayOut" : ""}`}>
      {date.format("D")}
    </div>
  );
};
