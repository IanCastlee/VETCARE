import "./Appointment.scss";
import { motion } from "framer-motion";

//IMAGES
import profile from "../../assets/imges/veterinarian2.png";

//ICONS
import { BsCalendar2Date } from "react-icons/bs";
import { FaCheckCircle } from "react-icons/fa";
import { RiChatHistoryFill } from "react-icons/ri";
import { CiStethoscope } from "react-icons/ci";
import { CiClock2 } from "react-icons/ci";
import { CiCalendarDate } from "react-icons/ci";
import { LuClockArrowDown } from "react-icons/lu";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import axiosIntance from "../../../axios";

const Appointment = () => {
  const { currentUser } = useContext(AuthContext);

  const [activeAppointment, setActiveAppointment] = useState([]);

  //get veterinarian
  useEffect(() => {
    const activeAppointment = async () => {
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
        } else {
          console.log("Error_ : ", res.data);
        }
      } catch (error) {
        console.log("Error : ", error);
      }
    };

    activeAppointment();
  }, []);
  return (
    <div className="appointment">
      <div className="container">
        <div className="top">
          <h2 className="title">Appointment</h2>
        </div>
        <div className="myappointment">
          <div className="current-appointment">
            <div className="title">
              <BsCalendar2Date className="icon" /> Appointment
            </div>
            {activeAppointment &&
              activeAppointment.map((item) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  className="card"
                  key={item.appointment_id}
                >
                  <img
                    src={`http://localhost/VETCARE/backend/uploads/${item.profile}`}
                    alt=""
                    className="profile"
                  />
                  <div className="right-card">
                    <div className="top-card">
                      <h3 className="dr">
                        <CiStethoscope className="iconn" />
                        Dr. {item.drFullname}
                      </h3>
                      <span className="rule">{item.specialization}</span>
                      <div className="date-time">
                        <span className="date">
                          <CiCalendarDate className="iconn" />
                          {item.appointment_date}
                        </span>
                        <span className="time">
                          <CiClock2 className="iconn" />
                          10:00 AM
                        </span>
                      </div>
                    </div>

                    <div className="icon-wrapper">
                      <FaCheckCircle className="icon" />
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>

          <div className="previous-appointment">
            <div className="title">
              <LuClockArrowDown className="icon" /> Appointment History
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="card"
            >
              <img src={profile} alt="" className="profile" />
              <div className="right-card">
                <div className="top-card">
                  <h3 className="dr">
                    <CiStethoscope /> Dr. Eyhan Castillo
                  </h3>
                  <span className="rule">
                    <CiCalendarDate />
                    Dog Veterinarian
                  </span>
                  <div className="date-time">
                    <span className="date">
                      <CiCalendarDate className="iconn" />
                      January 1, 2026
                    </span>
                    <span className="time">
                      <CiClock2 className="iconn" />
                      10:00 AM
                    </span>
                  </div>
                </div>

                <div className="icon-wrapper">
                  <RiChatHistoryFill className="icon" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
