import "./setAppointment.scss";
import { useParams } from "react-router-dom";
import axiosIntance from "../../../axios";
import { motion } from "framer-motion";
import { AuthContext } from "../../contexts/AuthContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

//IMAGES
import profile from "../../assets/imges/veterinarian1.png";

//ICONS
import { IoCalendarNumberSharp } from "react-icons/io5";
import { GoClockFill } from "react-icons/go";
import { useContext, useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa6";
import { CiStethoscope } from "react-icons/ci";
import { BsCalendar2Date } from "react-icons/bs";

const SetAppointment = () => {
  const { currentUser } = useContext(AuthContext);
  const userId = useParams();
  const [veterinarianInfo, setVeterinarianInfo] = useState([]);
  const [veterinarianServices, setVeterinarianServices] = useState([]);
  const [showDateTime, setshowDateTime] = useState("1");

  //setAppointment
  const [appointmentForm, setAppointment] = useState({
    service: "",
    pet_name: "",
    pet_type: "",
    breed: "",
    age: "",
    weight: "",
    gender: "",
    current_health_issue: "",
    history_health_issue: "",
    appointment_date: "",
    appointment_time: "",
    price: "",
  });

  const [price, setPrice] = useState(null);
  const [slots, setSlots] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  const [emptyService, setEmptyService] = useState("");
  const [emptypet_name, setEmptypet_name] = useState("");
  const [emptypet_type, setEmptypet_type] = useState("");
  const [emptybreed, setEmptybreed] = useState("");
  const [emptyage, setEmptyage] = useState("");
  const [emptyweight, setEmptyweight] = useState("");
  const [emptygender, setEmptygender] = useState("");
  const [emptycurrent_health_issue, setEmptycurrent_health_issue] =
    useState("");
  const [emptyhistory_health_issue, setEmptyhistory_health_issue] =
    useState("");
  const [emptyappointment_date, setEmptyappointment_date] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setEmptyService("");
    setEmptypet_name("");
    setEmptypet_type("");
    setEmptybreed("");
    setEmptyage("");
    setEmptyweight("");
    setEmptygender("");
    setEmptycurrent_health_issue("");
    setEmptyhistory_health_issue("");

    setAppointment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleDateChange = (date) => {
    setEmptyappointment_date("");

    setAppointment((prev) => ({
      ...prev,
      appointment_date: date,
    }));
  };

  //handleNext

  const handleNext = () => {
    if (
      appointmentForm.service === "" ||
      appointmentForm.pet_name === "" ||
      appointmentForm.pet_type === "" ||
      appointmentForm.breed === "" ||
      appointmentForm.age === "" ||
      appointmentForm.weight === "" ||
      appointmentForm.gender === "" ||
      appointmentForm.current_health_issue === "" ||
      appointmentForm.history_health_issue === ""
    ) {
      if (appointmentForm.service === "") {
        setEmptyService("Select your preferred service");
      }
      if (appointmentForm.pet_name === "") {
        setEmptypet_name("Petname is required");
      }
      if (appointmentForm.pet_type === "") {
        setEmptypet_type("Pet type is required");
      }
      if (appointmentForm.breed === "") {
        setEmptybreed("Pet breed is required");
      }
      if (appointmentForm.age === "") {
        setEmptyage("Pet age is required");
      }
      if (appointmentForm.weight === "") {
        setEmptyweight("Pet weight is required");
      }
      if (appointmentForm.gender === "") {
        setEmptygender("Pet gender is required");
      }
      if (appointmentForm.current_health_issue === "") {
        setEmptycurrent_health_issue(
          "Please type your pet current health issue"
        );
      }
      if (appointmentForm.history_health_issue === "") {
        setEmptyhistory_health_issue(
          "Please enter your pet's health history, or type 'none' if there are no issues."
        );
      }
      return;
    }
    setshowDateTime("2");
  };

  //handle submit
  const handleSubmitAppointment = async (e) => {
    e.preventDefault();

    // Check if appointment_date is empty
    if (!appointmentForm.appointment_date) {
      setEmptyappointment_date("Select your preferred date");
      return;
    }

    const formattedDate = new Date(
      appointmentForm.appointment_date
    ).toLocaleDateString("en-CA");

    try {
      const res = await axiosIntance.post(
        "client/appointment/SetAppointment.php",
        {
          client_id: currentUser?.user_id,
          dr_id: userId.userId,
          service: appointmentForm.service,
          pet_name: appointmentForm.pet_name,
          pet_type: appointmentForm.pet_type,
          breed: appointmentForm.breed,
          age: appointmentForm.age,
          weight: appointmentForm.weight,
          gender: appointmentForm.gender,
          current_health_issue: appointmentForm.current_health_issue,
          history_health_issue: appointmentForm.history_health_issue,
          appointment_date: formattedDate,
          appointment_time: appointmentForm.appointment_time,
          price: price,
        }
      );

      if (res.data.success) {
        console.log("RESPONSE : ", res.data.message);
      } else {
        console.log("ERROR : ", res.data);
      }
    } catch (error) {
      console.log("Error : ", error);
    }
  };

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
        } else {
          console.log(res.data.message);
        }
      } catch (error) {
        console.log("Error : ", error);
      }
    };
    getClickedVeterinarian();
  }, [userId]);

  //get time slot
  useEffect(() => {
    if (!veterinarianInfo?.time || !veterinarianInfo?.duration) return;

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

    const results = generateTimeSlots(
      veterinarianInfo.time,
      veterinarianInfo.duration
    );
    setSlots(results);
  }, [veterinarianInfo]);

  console.log("CLICKED : ", selectedTimeSlot);

  return (
    <div className="setappointment">
      <div className="setappointment-container">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="setappointment-top"
        >
          <div className="profile-wrapper">
            <img
              //src={`http://localhost/VETCARE/backend/uploads/${veterinarianInfo?.profile}`}
              src={`https://vetcare.kesug.com/backend/uploads/${veterinarianInfo?.profile}`}
              alt="profile"
              className="profile"
            />
          </div>

          <h3>
            <CiStethoscope className="icon" /> Dr. {veterinarianInfo?.fullname}
          </h3>
          <span>{veterinarianInfo?.specialization}</span>
        </motion.div>

        <div className="setappointment-bot">
          <div className="profile-wrapper">
            <img
              //src={`http://localhost/VETCARE/backend/uploads/${veterinarianInfo?.profile}`}
              src={`https://vetcare.kesug.com/backend/uploads/${veterinarianInfo?.profile}`}
              alt="profile"
              className="profile"
            />
          </div>
          {showDateTime === "1" && (
            <div className="petinfo-form">
              <span className="note">
                Hey Eyhan, please fill out the form for your pet's information.
              </span>
              <div className="form">
                <div className="service-petname">
                  <div className="input-wrapper-select-services">
                    <label
                      style={{ color: `${emptyService !== "" ? "red" : ""}` }}
                      htmlFor="type"
                    >
                      {emptyService !== "" ? emptyService : "Choose Services"}
                    </label>
                    <select
                      style={{
                        border: `${emptyService !== "" ? "2px solid red" : ""}`,
                      }}
                      name="service"
                      value={appointmentForm.service}
                      onChange={(e) => {
                        const value = e.target.value;
                        setAppointment((prev) => ({
                          ...prev,
                          service: value,
                        }));

                        const selected = veterinarianServices.find(
                          (item) => item.vservices_id.toString() === value
                        );
                        setPrice(selected ? selected.price : "");
                      }}
                      id="service"
                    >
                      <option value="">Choose Services</option>

                      {veterinarianServices &&
                        veterinarianServices.map((item) => (
                          <option
                            key={item.vservices_id}
                            value={item.vservices}
                          >
                            {item.vservices} - ₱{item.price}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="input-wrapper">
                    <label
                      style={{ color: `${emptypet_name !== "" ? "red" : ""}` }}
                      htmlFor="petname"
                    >
                      {emptypet_name !== "" ? emptypet_name : "Petname"}
                    </label>
                    <input
                      style={{
                        border: `${
                          emptypet_name !== "" ? "2px solid red" : ""
                        }`,
                      }}
                      type="text"
                      name="pet_name"
                      placeholder="Pet Name"
                      value={appointmentForm.pet_name}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="type-breed">
                  <div className="input-wrapper">
                    <label
                      style={{ color: `${emptypet_type !== "" ? "red" : ""}` }}
                      htmlFor="type"
                    >
                      {emptypet_type !== "" ? emptypet_type : "Pet Type"}
                    </label>
                    <select
                      style={{
                        border: `${
                          emptypet_type !== "" ? "2px solid red" : ""
                        }`,
                      }}
                      value={appointmentForm.pet_type}
                      onChange={handleChange}
                      name="pet_type"
                      id="type"
                    >
                      <option value=""></option>
                      <option value="Dog">Dog</option>
                      <option value="Cat">Cat</option>
                    </select>
                  </div>
                  <div className="input-wrapper">
                    <label
                      style={{ color: `${emptybreed !== "" ? "red" : ""}` }}
                      htmlFor="type"
                    >
                      {emptybreed !== "" ? emptybreed : "Breed"}
                    </label>
                    <input
                      style={{
                        border: `${emptybreed !== "" ? "2px solid red" : ""}`,
                      }}
                      value={appointmentForm.breed}
                      onChange={handleChange}
                      type="text"
                      name="breed"
                      placeholder="Breed"
                    />
                  </div>
                </div>
                <div className="age-weight">
                  <div className="input-wrapper">
                    <label
                      style={{ color: `${emptyage !== "" ? "red" : ""}` }}
                      htmlFor="age"
                    >
                      {" "}
                      {emptyage !== "" ? emptyage : "Pet Age"}
                    </label>
                    <input
                      style={{
                        border: `${emptyage !== "" ? "2px solid red" : ""}`,
                      }}
                      value={appointmentForm.age}
                      onChange={handleChange}
                      type="text"
                      name="age"
                      placeholder="Age"
                    />
                  </div>
                  <div className="input-wrapper">
                    <label
                      style={{ color: `${emptyweight !== "" ? "red" : ""}` }}
                      htmlFor="weight"
                    >
                      {" "}
                      {emptyweight !== "" ? emptyweight : "Pet Weight"}
                    </label>
                    <input
                      style={{
                        border: `${emptyweight !== "" ? "2px solid red" : ""}`,
                      }}
                      value={appointmentForm.weight}
                      onChange={handleChange}
                      type="text"
                      name="weight"
                      placeholder="Weight"
                    />
                  </div>
                </div>

                <div className="radio-wrapper">
                  <label
                    style={{ color: `${emptygender !== "" ? "red" : ""}` }}
                    htmlFor="gender"
                  >
                    {emptygender !== "" ? emptygender : "Gender"}
                  </label>
                  <div className="male-female">
                    <div className="gender-wrapper">
                      <input
                        value="Male"
                        onChange={handleChange}
                        type="radio"
                        name="gender"
                      />
                      <label htmlFor="male">Male</label>
                    </div>
                    <div className="gender-wrapper">
                      <input
                        value="Female"
                        onChange={handleChange}
                        type="radio"
                        name="gender"
                      />
                      <label htmlFor="female">Female</label>
                    </div>
                  </div>
                </div>
                <div className="text-area-wrapper">
                  <label
                    style={{
                      color: `${emptycurrent_health_issue !== "" ? "red" : ""}`,
                    }}
                    htmlFor="concern"
                  >
                    {" "}
                    {emptycurrent_health_issue !== ""
                      ? emptycurrent_health_issue
                      : "Health Issues or Concerns"}{" "}
                  </label>
                  <textarea
                    style={{
                      border: `${
                        emptycurrent_health_issue !== "" ? "2px solid red" : ""
                      }`,
                    }}
                    value={appointmentForm.current_health_issue}
                    onChange={handleChange}
                    name="current_health_issue"
                    id="concern"
                    placeholder="Health Issues or Concerns"
                  ></textarea>
                </div>
                <div className="text-area-wrapper">
                  <label
                    style={{
                      color: `${emptyhistory_health_issue !== "" ? "red" : ""}`,
                    }}
                    htmlFor="history"
                  >
                    {emptyhistory_health_issue !== ""
                      ? emptyhistory_health_issue
                      : "Pet Health History"}{" "}
                  </label>
                  <textarea
                    style={{
                      border: `${
                        emptyhistory_health_issue !== "" ? "2px solid red" : ""
                      }`,
                    }}
                    value={appointmentForm.history_health_issue}
                    onChange={handleChange}
                    name="history_health_issue"
                    id="history"
                    placeholder="Health History"
                  ></textarea>
                </div>
                <div className="button">
                  <FaArrowRight onClick={handleNext} className="next-icon" />
                </div>
              </div>
            </div>
          )}
          {showDateTime === "2" && (
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="date-available"
            >
              <span className="note">
                Choose your appointment date and time.{" "}
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
                  className="date-input"
                >
                  <DatePicker
                    name="appointment_date"
                    selected={appointmentForm.appointment_date}
                    onChange={handleDateChange}
                    minDate={new Date()}
                    maxDate={
                      new Date(new Date().setDate(new Date().getDate() + 6))
                    }
                    filterDate={(date) => date.getDay() !== 0}
                    placeholderText="Select your preferred date"
                    dateFormat="yyyy-MM-dd"
                  />

                  <BsCalendar2Date className="icon" />
                </div>
              </div>
            </motion.div>
          )}

          {showDateTime === "2" && (
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="time-available"
            >
              <h6>Available Time Slots</h6>

              <div className="times-wrapper">
                {slots &&
                  slots.map((item, index) => (
                    <span
                      key={index}
                      className={`time ${
                        selectedTimeSlot === item ? "selected" : ""
                      }`}
                      onClick={() => setSelectedTimeSlot(item)}
                    >
                      {item}
                    </span>
                  ))}
              </div>

              <div className="set-appointment-wrapper">
                <FaArrowLeft
                  className="back-icon"
                  onClick={() => setshowDateTime("1")}
                />
                <button
                  className="btn-setappointment"
                  onClick={handleSubmitAppointment}
                >
                  Set Appointment
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SetAppointment;
