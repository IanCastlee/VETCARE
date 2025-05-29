import "./FollowupAppointment.scss";

import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import axiosIntance from "../../../axios";
import { AuthContext } from "../../contexts/AuthContext";
import Loader2 from "../../components/loader/Loader3";
import Emptydata from "../../components/emptydata/Emptydata";
import { uploadUrl } from "../../../fileurl";

import Loader3 from "../../components/loader/Loader2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

//ICONS
import { IoCloseOutline } from "react-icons/io5";
import { BsCalendar2Date } from "react-icons/bs";
import { FaArrowLeft } from "react-icons/fa6";

//IMAGES
import cat from "../../assets/icons/mouth.png";

const FollowupAppointment = () => {
  const { currentUser, setModlToShow } = useContext(AuthContext);
  const [loader, setLoader] = useState(false);
  const [appointmentData, setAppointmentData] = useState([]);
  const [visibleData, setVisibleData] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const MAX_VISIBLE = 5;

  const [drTime, setDrTime] = useState(null);
  const [drDuration, setDrDuration] = useState(null);
  const [appointmentID, setAppointmentID] = useState(null);
  const [fa_id, set_fa_id] = useState(null);
  const [payment, setPayment] = useState(null);

  //get AppointmentData
  useEffect(() => {
    const getNotification = async () => {
      setLoader(true);
      const res = await axiosIntance.get(
        `client/appointment/GetFollowupAppintment.php?currentUser_id=${currentUser.user_id}`
      );
      if (res.data.success) {
        console.log("NOTIFICATIOgvfgfgfN : ", res.data.data);
        setAppointmentData(res.data.data);
        setVisibleData(res.data.data.slice(0, MAX_VISIBLE));
      } else {
        console.log("Error : ", res.data);
      }
      setLoader(false);
    };

    getNotification();
  }, []);

  const handleViewMore = () => {
    setShowAll(true);
    setVisibleNotif(notif);
  };

  //set appointment

  const [activeAppointment, setActiveAppointment] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [clickedAppointment, setClickedAppointment] = useState({
    time: "",
    duration: "",
    id: "",
  });

  //get Appointment
  useEffect(() => {
    const activeAppointment = async () => {
      setShowLoader(true);
      try {
        const res = await axiosIntance.post(
          "client/appointment/GetAppointment.php",
          {
            currentUser: currentUser?.user_id,
          }
        );
        if (res.data.success) {
          setActiveAppointment(res.data.data);
          console.log("DATA : ", res.data.data);
          setShowLoader(false);
        } else {
          setShowLoader(false);

          console.log("Error_ : ", res.data);
        }
      } catch (error) {
        setShowLoader(false);

        console.log("Error : ", error);
      }
    };

    activeAppointment();
  }, []);

  // const handleClickedAppointment = (time, duration, id) => {
  //   handleTimeDateSlotToRemove();
  //   setClickedAppointment({ time, duration, id });
  //   handleTimeDateSlotToRemove();
  // };

  /////////////////////////////////////////

  const [showLoader3, setShowLoader3] = useState(false);

  //setAppointment
  const [appointmentForm, setAppointment] = useState({
    appointment_date: "",
    appointment_time: "",
  });

  const [slots, setSlots] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [notAvailableTimeSlot, setNotAvailableTimeSlot] = useState([]);

  const [emptyappointment_date, setEmptyappointment_date] = useState("");

  const handleDateChange = (date) => {
    setEmptyappointment_date("");

    setAppointment((prev) => ({
      ...prev,
      appointment_date: date,
    }));
  };

  //timeslots to remove
  const handleTimeDateSlotToRemove = async () => {
    const date = new Date(appointmentForm.appointment_date);
    const formattedDate = [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, "0"),
      String(date.getDate()).padStart(2, "0"),
    ].join("-");

    console.log("FORMATTED:", formattedDate);

    try {
      const res = await axiosIntance.get(
        "client/appointment/GetTimeDateToRemove.php",
        {
          params: { choosenDate: formattedDate },
        }
      );
      if (res.data.success) {
        setNotAvailableTimeSlot(res.data.data);
        console.log("NOT AVAILABLE TIME SLOT : ", res.data.data);
      } else {
        console.log("Error : ", res.data);
      }
    } catch (error) {
      console.log("Error : ", error);
    }
  };

  useEffect(() => {
    handleTimeDateSlotToRemove();
  }, [clickedAppointment, appointmentForm.appointment_date]);

  //get time slot
  useEffect(() => {
    if (!drDuration || !drTime) return;
    if (!notAvailableTimeSlot) return;

    const generateTimeSlots = (timeRange, duration) => {
      const [start, end] = timeRange.split(" - ");
      const slotList = [];

      const toDate = (timeStr) => {
        const [time, modifier] = timeStr
          .match(/(\d{1,2}:\d{2})(AM|PM)/)
          .slice(1, 3);
        const [hours, minutes] = time.split(":").map(Number);
        let h = hours % 12;
        if (modifier === "PM") h += 12;
        const date = new Date();
        date.setHours(h, minutes, 0, 0);
        return date;
      };

      let current = toDate(start);
      const endTime = toDate(end);

      const lunchStart = new Date(current);
      lunchStart.setHours(11, 0, 0, 0);

      const lunchEnd = new Date(current);
      lunchEnd.setHours(13, 0, 0, 0);

      while (current < endTime) {
        let next = new Date(current.getTime() + duration * 60000);

        // Skip lunch
        if (current >= lunchStart && current < lunchEnd) {
          current = new Date(lunchEnd);
          continue;
        }

        if (next > lunchStart && current < lunchStart) {
          next = new Date(lunchStart);
        }

        if (next > endTime) next = new Date(endTime);

        slotList.push(`${formatTime(current)} - ${formatTime(next)}`);
        current = new Date(next);
      }

      return slotList;
    };

    const formatTime = (date) => {
      let hours = date.getHours();
      const minutes = date.getMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;
      return `${hours}:${minutes.toString().padStart(2, "0")}${ampm}`;
    };

    const allSlots = generateTimeSlots(drTime, drDuration);

    const unavailable = notAvailableTimeSlot.map(
      (item) => item.appointment_time
    );

    const availableSlots = allSlots.filter(
      (slot) => !unavailable.includes(slot)
    );

    setSlots(availableSlots);
  }, [clickedAppointment, notAvailableTimeSlot]);

  // submit updated appointment
  const handleSubmitUpdatedAppointment = async () => {
    setShowLoader3(true);

    const formattedDate = new Date(
      appointmentForm.appointment_date
    ).toLocaleDateString("en-CA");

    try {
      const res = await axiosIntance.post(
        "client/appointment/PostFollowUpAppointment.php",
        {
          appointment_id: appointmentID,
          date: formattedDate,
          time_slot: selectedTimeSlot,
          fa_id: fa_id,
          payment: payment,
        }
      );

      setShowLoader3(false);

      if (res.data.success) {
        console.log("SUCCESS : ", res.data.message);
        setTimeout(() => {
          setAppointmentID(null);
        }, 7000);
        return true;
      } else {
        console.log("ERROR : ", res.data);
        return false;
      }
    } catch (error) {
      console.log("Error : ", error);
      setShowLoader3(false);
      return false;
    }
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    setShowLoader3(true);

    try {
      const data = {
        description: `Payment for Follow-up appointment`,
        remarks: "Remarks",
        amount: payment * 100,
      };

      const response = await axiosIntance.post("paymongo.php", data, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.checkout_url) {
        setTimeout(() => {
          setShowLoader3(false);
        }, 2000);
        window.location.href = response.data.checkout_url;
      } else {
        setShowLoader3(false);
        console.log("Error: Unable to fetch the checkout URL.");
        console.log("Err :", response.data);
      }
    } catch (error) {
      setShowLoader3(false);
      console.error("Error:", error);
    }
  };

  const handleSendDataAndPayment = async (e) => {
    e.preventDefault();

    // First submit appointment data
    const submitResult = await handleSubmitUpdatedAppointment();

    // ✅ This now works correctly
    if (submitResult === true) {
      await handlePayment(e);
      setTimeout(() => {
        // setShowSummaryForm(false);
      }, 7000);
    } else {
      console.log("Appointment submission failed. Payment cancelled.");
    }
  };

  const handleClickedTOFollowUp = (item) => {
    setAppointmentID(item.appointment_id);
    setDrTime(item.time);
    setDrDuration(item.duration);
    set_fa_id(item.fa_id);
    setPayment(item.payment);
  };

  // Get the date of next week's Monday
  const getNextWeekMonday = () => {
    const today = new Date();
    const day = today.getDay();
    const diff = (8 - day) % 7;
    const nextMonday = new Date(today);
    nextMonday.setDate(today.getDate() + diff);
    return nextMonday;
  };

  // Get the date of next week's Saturday
  const getNextWeekSaturday = () => {
    const monday = getNextWeekMonday();
    const saturday = new Date(monday);
    saturday.setDate(monday.getDate() + 5);
    return saturday;
  };

  return (
    <>
      <div className="notification-overlay">
        <motion.div
          initial={{ opacity: 0, x: 200 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="notification"
        >
          <div className="top">
            <h6>Follow-up Appointment</h6>{" "}
            <IoCloseOutline
              className="icon"
              onClick={() => setModlToShow("")}
            />
          </div>
          <div className="notification-content">
            {loader ? (
              <Loader2 />
            ) : visibleData.length > 0 ? (
              <>
                {visibleData.map((item) => (
                  <div key={item.fa_id} className="card">
                    <div className="left">
                      <img
                        src={`${uploadUrl.uploadurl}/${item?.image}`}
                        alt="Pet Profile"
                      />
                    </div>
                    <div className="right">
                      <div className="top">
                        <span className="title">{item.title}</span>
                        <p>{item.description}</p>
                      </div>
                      <div className="bot">
                        <span className="time-sent">{item.sentDate}</span>

                        <div className="buttons">
                          <button
                            disabled={item.status == 1}
                            className={`btn-approved ${
                              item.status == 1 ? "set" : ""
                            }`}
                            onClick={() => handleClickedTOFollowUp(item)}
                          >
                            {item.status == 1
                              ? "Appointment Set"
                              : " Follow Up"}
                          </button>
                          <button className="btn-cancel">Ignore</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {!showAll && appointmentData.length > MAX_VISIBLE && (
                  <button className="view-more-btn" onClick={handleViewMore}>
                    View More
                  </button>
                )}
              </>
            ) : (
              <Emptydata />
            )}
          </div>
        </motion.div>
      </div>

      {appointmentID !== null && (
        <div className="modal-edit-sched-overlay">
          <div className="modal-edit-sched">
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="date-available"
            >
              <span className="note">
                Choose your appointment date and time.
              </span>
              <h6>Select Your Preferred Date</h6>

              <div className="dates-wrapper">
                <span
                  style={{
                    color: `${emptyappointment_date !== "" ? "red" : ""}`,
                  }}
                >
                  {emptyappointment_date !== "" ? emptyappointment_date : ""}
                </span>

                <div
                  style={{
                    border: `${
                      emptyappointment_date !== "" ? "red 2px solid" : ""
                    }`,
                  }}
                  className="date-input2"
                >
                  <DatePicker
                    name="appointment_date"
                    selected={appointmentForm.appointment_date}
                    onChange={handleDateChange}
                    minDate={getNextWeekMonday()}
                    maxDate={getNextWeekSaturday()}
                    filterDate={(date) =>
                      date.getDay() !== 0 && date.getDay() !== 7
                    }
                    placeholderText="Select your preferred date"
                    dateFormat="yyyy-MM-dd"
                  />

                  <BsCalendar2Date className="icon" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="time-available"
            >
              <h6>Available Time Slots</h6>

              {appointmentForm.appointment_date !== "" ? (
                <div className="times-wrapper">
                  {slots.length > 0 ? (
                    slots.map((item, index) => (
                      <button
                        disabled={appointmentForm.appointment_date === ""}
                        key={index}
                        className={`time2 ${
                          selectedTimeSlot === item ? "selected" : ""
                        }`}
                        onClick={() => setSelectedTimeSlot(item)}
                      >
                        {item}
                      </button>
                    ))
                  ) : (
                    <div className="no-avslot">
                      <img src={cat} alt="cat_img" />
                      <p>No Available Slot for your Choosen date</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="choose-date">
                  <span>
                    Available time slots will be shown after you choose your
                    preferred date.
                  </span>
                </div>
              )}

              <div className="set-appointment-wrapper">
                <FaArrowLeft
                  className="back-icon"
                  onClick={() => setAppointmentID(null)}
                />
                <button
                  disabled={
                    !selectedTimeSlot ||
                    !appointmentForm.appointment_date ||
                    showLoader3
                  }
                  className="btn-setappointment"
                  onClick={handleSendDataAndPayment}
                >
                  {showLoader3 ? <Loader3 /> : "SUBMIT"}
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </>
  );
};

export default FollowupAppointment;
