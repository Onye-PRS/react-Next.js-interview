import { useState, useEffect } from "react";
import { Button, Modal as AntModal, Form, Input, TimePicker } from "antd";
import { CirclePicker } from "react-color";
import "antd/dist/antd.css";
import { useSelector, useDispatch } from "react-redux";
import { clearSelectedDate } from "../redux/selectedDateSlice";
import { createReminder } from "../redux/remindersSlice";
import dayjs from "dayjs";

//TODO: add a delete option
export const Modal = ({ visible, setVisible }) => {
  const dispatch = useDispatch();
  const selected = useSelector((state) => state.selected);
  const selectedType = selected.type;
  const selectedDate = selected.date;
  const selectedReminder = useSelector(
    (state) => state.calender.reminders[selectedDate]
  );
  // console.log('selectedReminder:', selectedReminder)
  const defaultColor = "#389c98";

  const [color, setColor] = useState(defaultColor);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [message, setMessage] = useState("");
  const [time, setTime] = useState(null);

  useEffect(() => {
    if (selectedType === "edit") {
      setColor(selectedReminder.color);
      setMessage(selectedReminder.message);
      console.log("REMINDER TIME", dayjs(selectedReminder.date));
      setTime(dayjs(selectedReminder.date));
    } else {
      setColor(defaultColor);
      setMessage("");
      setTime(null);
    }
  }, [selectedReminder, selectedType]);

  const resetState = () => {
    setColor("#389c98");
    setMessage("");
    setTime(null);
  };

  const onModalClose = () => {
    dispatch(clearSelectedDate());
    setVisible(false);
    resetState();
  };

  const onColorPickerChange = (color) => {
    setColor(color.hex);
  };

  const handleMessage = (e) => {
    setMessage(e.target.value);
  };

  const handleTimePicker = (time, timeString) => {
    setTime(time);
  };
  const handleCreateReminder = () => {
    let date;
    if (selectedType === "edit") {
      date = dayjs(time).format()
    } else {
      date = dayjs(selectedDate)
        .set("hour", time.hour())
        .set("minute", time.minutes())
        .set("second", 0)
        .format();
    }
    dispatch(
      createReminder({
        color,
        message,
        date,
      })
    );
    resetState();
    setVisible(false);
  };

  return (
    <>
      <AntModal
        visible={visible}
        title={`Creating Reminder for ${dayjs(selectedDate).format(
          "MMMM D, YYYY"
        )}`}
        onOk={handleCreateReminder}
        onCancel={onModalClose}
        okText="Create"
        maskClosable={false}
      >
        <Input
          value={message}
          onChange={handleMessage}
          maxLength={30}
          showCount={true}
          placeholder="add your reminder"
        />
        <TimePicker
          onChange={handleTimePicker}
          use12Hours
          format="h:mm a"
          value={time}
        />
        <div>
          <div
            className="color-picker"
            onClick={() => setShowColorPicker((prev) => !prev)}
          >
            <div style={{ background: color, width: "30px", height: "14px" }} />
          </div>

          {showColorPicker && (
            <div onClick={() => setShowColorPicker(false)}>
              <CirclePicker
                color={color}
                onChangeComplete={onColorPickerChange}
              />
            </div>
          )}
        </div>
        <Form.Item label="color picker"></Form.Item>
      </AntModal>
    </>
  );
};
