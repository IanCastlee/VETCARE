import "./setAppointment.scss";
import { useParams } from "react-router-dom";
import axiosIntance from "../../../axios";

//IMAGES
import profile from "../../assets/imges/veterinarian1.png";

//ICONS
import { IoCalendarNumberSharp } from "react-icons/io5";
import { GoClockFill } from "react-icons/go";
import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa6";
import { CiStethoscope } from "react-icons/ci";

const SetAppointment = () => {
  const userId = useParams();
  const [veterinarianInfo, setVeterinarianInfo] = useState([]);
  const [veterinarianServices, setVeterinarianServices] = useState([]);

  const [showDateTime, setshowDateTime] = useState("1");

  useEffect(() => {
    const getClickedVeterinarian = async () => {
      try {
        const res = await axiosIntance.post(
          "admin/veterinarian/GetClickedVeterinarian.php",
          { user_id: userId.userId }
        );
        if (res.data.success) {
          setVeterinarianInfo(res.data.data.veterinarianInfo);
          console.log(res.data.data.veterinarianInfo);
          setVeterinarianServices(res.data.data.services);

          console.log(res.data.data.services);
        } else {
          console.log(res.data.message);
        }
      } catch (error) {
        console.log("Error : ", error);
      }
    };
    getClickedVeterinarian();
  }, [userId]);

  return (
    <div className="setappointment">
      <div className="setappointment-container">
        <div className="setappointment-top">
          <div className="profile-wrapper">
            <img
              src={`http://localhost/VETCARE/backend/uploads/${veterinarianInfo?.profile}`}
              alt="profile"
              className="profile"
            />
          </div>

          <h3>
            <CiStethoscope className="icon" /> Dr. {veterinarianInfo?.fullname}
          </h3>
          <span>{veterinarianInfo?.specialization}</span>
        </div>

        <div className="setappointment-bot">
          <div className="profile-wrapper">
            <img src={profile} alt="profile" className="profile" />
          </div>
          {showDateTime === "1" && (
            <div className="petinfo-form">
              <span className="note">
                Hey Eyhan, please fill out the form for your pet's information.
              </span>
              <div className="form">
                <div className="input-wrapper-select-services">
                  <label htmlFor="type">Choose Services</label>
                  <select name="service" id="service">
                    <option value="">Choose Services</option>
                    {veterinarianServices &&
                      veterinarianServices.map((item) => (
                        <option key={item.vservices_id} value={item.services}>
                          {item.vservices}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="type-breed">
                  <div className="input-wrapper">
                    <label htmlFor="type">Type of your Pet</label>
                    <select name="type" id="type">
                      <option value=""></option>
                      <option value="">Dog</option>
                      <option value="">Cat</option>
                    </select>
                  </div>
                  <div className="input-wrapper">
                    <label htmlFor="type">Breed</label>
                    <input type="text" name="breed" placeholder="Breed" />
                  </div>
                </div>

                <div className="age-weight">
                  <div className="input-wrapper">
                    <label htmlFor="age">Age</label>
                    <input type="text" name="age" placeholder="Age" />
                  </div>
                  <div className="input-wrapper">
                    <label htmlFor="weight">Weight</label>
                    <input type="text" name="weight" placeholder="Weight" />
                  </div>
                </div>

                <div className="radio-wrapper">
                  <label htmlFor="gender">Gender</label>
                  <div className="male-female">
                    <div className="gender-wrapper">
                      <input type="radio" name="gender" />
                      <label htmlFor="male">Male</label>
                    </div>
                    <div className="gender-wrapper">
                      <input type="radio" name="gender" />
                      <label htmlFor="female">Female</label>
                    </div>
                  </div>
                </div>

                <div className="text-area-wrapper">
                  <label htmlFor="concern">Health Issues or Concerns</label>
                  <textarea
                    name="concern"
                    id="concern"
                    placeholder="Health Issues or Concerns"
                  ></textarea>
                </div>

                <div className="text-area-wrapper">
                  <label htmlFor="history">Health History</label>
                  <textarea
                    name="history"
                    id="history"
                    placeholder="Health History"
                  ></textarea>
                </div>

                <div className="button">
                  <FaArrowRight
                    onClick={() => setshowDateTime("2")}
                    className="next-icon"
                  />
                </div>
              </div>
            </div>
          )}
          {showDateTime === "2" && (
            <div className="date-available">
              <span className="note">
                Choose your appointment date and time.{" "}
              </span>
              <h6>
                <IoCalendarNumberSharp className="calendar-icon" /> Available
                Date
              </h6>

              <div className="dates-wrapper">
                <span className="date">Monday</span>
                <span className="date">Tuesday</span>
                <span className="date">Fridayf</span>
              </div>
            </div>
          )}

          {showDateTime === "2" && (
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

              <div className="set-appointment-wrapper">
                <FaArrowLeft
                  className="back-icon"
                  onClick={() => setshowDateTime("1")}
                />
                <button className="btn-setappointment">Set Appointment</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SetAppointment;
