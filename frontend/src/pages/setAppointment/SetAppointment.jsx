import "./setAppointment.scss";

//IMAGES
import profile from "../../assets/imges/veterinarian1.png";

//ICONS
import { IoCalendarNumberSharp } from "react-icons/io5";
import { GoClockFill } from "react-icons/go";

const SetAppointment = () => {
  return (
    <div className="setappointment">
      <div className="setappointment-container">
        <div className="setappointment-top">
          <div className="profile-wrapper">
            <img src={profile} alt="profile" className="profile" />
          </div>
        </div>

        <div className="setappointment-bot">
          <div className="profile-wrapper">
            <img src={profile} alt="profile" className="profile" />
          </div>
          <div className="date-available">
            <h6>
              <IoCalendarNumberSharp className="calendar-icon" /> Available Date
            </h6>

            <div className="dates-wrapper">
              <span className="date">Monday</span>
              <span className="date">Tuesday</span>
              <span className="date">Fridayf</span>
            </div>
          </div>

          <div className="time-available">
            <h6>
              <GoClockFill className="clock-icon" /> Available Time Slots
            </h6>

            <div className="times-wrapper">
              <span className="time">8:00 AM</span>
              <span className="time">8:00 AM</span>
              <span className="time">8:00 AM</span>
              <span className="time">8:00 AM</span>
              <span className="time">8:00 AM</span>
              <span className="time">8:00 AM</span>
              <span className="time">8:00 AM</span>
              <span className="time">8:00 AM</span>
              <span className="time">8:00 AM</span>
              <span className="time">8:00 AM</span>
              <span className="time">8:00 AM</span>
              <span className="time">8:00 AM</span>
              <span className="time">8:00 AM</span>
              <span className="time">8:00 AM</span>
              <span className="time">8:00 AM</span>
              <span className="time">8:00 AM</span>
            </div>

            <button className="btn-setappointment">Set Appointment</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetAppointment;
