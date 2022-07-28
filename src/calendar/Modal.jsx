import { useState } from "react";
import { Button, Modal as AntModal, Form, Input, TimePicker } from "antd";
import { CirclePicker } from "react-color";
import "antd/dist/antd.css";
import { useSelector, useDispatch } from "react-redux";
import { createReminder } from "../redux/remindersSlice";
import dayjs from "dayjs";

//TODO: add a delete option
export const Modal = ({ visible, handleCancel,setVisible }) => {
  const dispatch = useDispatch();
  const selectedDate = useSelector((state) => state.date.selected);
  console.log("selectedDate:", selectedDate);

  const handleSubmit = () => {};
  const [color, setColor] = useState("#389c98");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [message, setMessage] = useState("");
  const [time, setTime] = useState(null);

  const resetState = () => {
    setColor("#389c98")
    setMessage("")
    setTime(null)
  }

  const handleChangeComplete = (color) => {
    console.log("HANDLE handleChangeComplete CALLED", color);
    setColor(color.hex);
  };

  const handleClick = () => {
    setShowColorPicker((prev) => !prev);
  };

  const handleClose = () => {
    setShowColorPicker(false);
  };
  const handleMessage = (e) => {
    setMessage(e.target.value);
  };

  const handleTimePicker = (time, timeString) => {
    setTime(time);
  };
  const handleOk = () => {
    console.log(time);
    dispatch(
      createReminder({
        color,
        message,
        date: dayjs(selectedDate)
          .set("hour", time.hour())
          .set("minute", time.minutes())
          .set("second", 0)
          .format(),
      })
    );
    resetState()
    setVisible(false)
  };

  return (
    <>
      <AntModal
        visible={visible}
        title={`Creating Reminder for ${dayjs(selectedDate).format(
          "MMMM D, YYYY"
        )}`}
        onOk={handleOk}
        onCancel={() => {
          resetState()
          handleCancel()
        }}
        okText="Create"
        maskClosable={false}
      >
        <Input value={message} onChange={handleMessage} />
        <TimePicker onChange={handleTimePicker} use12Hours format="h:mm a" value={time} />
        <div>
          <div className="color-picker" onClick={handleClick}>
            <div style={{ background: color, width: "30px", height: "14px" }} />
          </div>

          {showColorPicker && (
            <div onClick={handleClose}>
              <CirclePicker
                color={color}
                onChangeComplete={handleChangeComplete}
              />
            </div>
          )}
        </div>
        <Form.Item label="color picker"></Form.Item>
      </AntModal>
    </>
  );
};
