import "./Appointment.scss";

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

const Appointment = () => {
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
            <div className="card">
              <img src={profile} alt="" className="profile" />
              <div className="right-card">
                <div className="top-card">
                  <h3 className="dr">
                    <CiStethoscope className="iconn" />
                    Dr. Eyhan Castillo
                  </h3>
                  <span className="rule">Dog Veterinarian</span>
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
                  <FaCheckCircle className="icon" />
                </div>
              </div>
            </div>
          </div>

          <div className="previous-appointment">
            <div className="title">
              <LuClockArrowDown className="icon" /> Appointment History
            </div>
            <div className="card">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
