import { useState, useEffect } from "react";
import {
  Modal as AntModal,
  Form,
  Input,
  TimePicker,
  Space,
  Row,
  Col,
} from "antd";
import DatePicker from "../util/DatePicker";
import { CirclePicker } from "react-color";
import "antd/dist/antd.css";
import { useSelector, useDispatch } from "react-redux";
import { clearSelectedDate } from "../redux/selectedDateSlice";
import { createReminder, deleteReminder } from "../redux/remindersSlice";
import { colorMap } from "../util/colorMap";
import dayjs from "dayjs";

export const Modal = ({ visible, setVisible }) => {
  const dispatch = useDispatch();
  const selected = useSelector((state) => state.selected);
  const selectedType = selected.type;
  const selectedDate = selected.date;
  const selectedReminder = useSelector(
    (state) => state.calender.reminders[selectedDate]
  );

  const defaultColor = "#c41d7f";

  const [color, setColor] = useState(defaultColor);
  const [message, setMessage] = useState("");
  const [time, setTime] = useState(null);
  const [title, setTitle] = useState(null);
  const [okText, setOkText] = useState(null);
  const [date, setDate] = useState(null);
  useEffect(() => {
    if (selectedType === "edit") {
      setColor(selectedReminder?.color);
      setMessage(selectedReminder.message);
      setTime(dayjs(selectedReminder.date));
      setTitle(
        `Editing your Reminder on ${dayjs(selectedDate).format("MMMM D, YYYY")}`
      );
      setOkText("Save");
      setDate(dayjs(selectedReminder.date))
    } else {
      setColor(defaultColor);
      setMessage("");
      setTime(dayjs());
      setTitle("Create Reminder");
      setOkText("Create");
      setDate(dayjs(selectedDate))
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

  const handleTimePicker = (time) => {
    setTime(time);
  };
  const handleDatePicker = (date) => {
    setDate(dayjs(date));
  };
  const handleCreateReminder = () => {
    const savedDate = dayjs(date)
      .set("hour", time.hour())
      .set("minute", time.minute())
      .set("second", new Date().getSeconds()) // even tho user doesn't select seconds, I need them so reminders created with the same time do not overwrite each other
      .format();
    if (selectedType === "edit") {
      dispatch(deleteReminder(selectedReminder));
    }
    dispatch(
      createReminder({
        color,
        message,
        date: savedDate,
      })
    );
    dispatch(clearSelectedDate());
    resetState();
    setVisible(false);
  };

  return (
    <>
      <AntModal
        visible={visible}
        title={title}
        onOk={handleCreateReminder}
        onCancel={onModalClose}
        okText={okText}
        maskClosable={false}
        destroyOnClose={true}
        okButtonProps={{disabled: !message.trim()}}
      >
        <Row gutter={[0, 32]}>
          <Row style={{ width: "100%" }}>
            <Col span={12}>
              <Space direction="vertical" size="middle">
                <label>Select Date:</label>
                <DatePicker
                  onChange={handleDatePicker}
                  format="MM-DD-YYYY"
                  value={date}
                  allowClear={false}
                />
              </Space>
            </Col>
            <Col span={12}>
              <Space direction="vertical" size="middle">
                <label>Select Time:</label>
                <TimePicker
                  onChange={handleTimePicker}
                  use12Hours
                  format="h:mm a"
                  value={time}
                  allowClear={false}
                />
              </Space>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Space direction="vertical" size="middle">
                <Space size="middle">
                  <label>Select Color:</label>
                  <div className="color-picker">
                    <div
                      style={{
                        background: color,
                        width: "30px",
                        height: "14px",
                      }}
                    />
                  </div>
                </Space>

                <div>
                  <CirclePicker
                    color={color}
                    colors={Object.keys(colorMap)}
                    onChangeComplete={onColorPickerChange}
                  />
                </div>
              </Space>
            </Col>
          </Row>
          <Row style={{ width: "100%" }}>
            <Col span={24}>
              <Space direction="vertical" style={{ width: "100%" }}>
                <label>Add Reminder:</label>
                <Input
                  value={message}
                  onChange={handleMessage}
                  maxLength={30}
                  showCount={true}
                  placeholder="add your reminder"
                  onPressEnter={handleCreateReminder}
                />
              </Space>
            </Col>
          </Row>
        </Row>
      </AntModal>
    </>
  );
};
