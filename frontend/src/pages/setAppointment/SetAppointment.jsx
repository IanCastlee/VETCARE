import "./setAppointment.scss";
import { useParams } from "react-router-dom";
import axiosIntance from "../../../axios";
import { motion } from "framer-motion";
import { AuthContext } from "../../contexts/AuthContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Loader2 from "../../components/loader/Loader2";

//IMAGES
import cat from "../../assets/icons/mouth.png";

//ICONS
import { useContext, useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa6";
import { CiStethoscope } from "react-icons/ci";
import { BsCalendar2Date } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { LuCalendarClock } from "react-icons/lu";
import { MdOutlineMedicalServices } from "react-icons/md";
import { AiOutlineSnippets } from "react-icons/ai";
import { uploadUrl } from "../../../fileurl";

const SetAppointment = () => {
  const { currentUser } = useContext(AuthContext);

  const userId = useParams();
  const [veterinarianInfo, setVeterinarianInfo] = useState([]);
  const [veterinarianServices, setVeterinarianServices] = useState([]);
  const [showDateTime, setshowDateTime] = useState("1");
  const [showSummaryForm, setShowSummaryForm] = useState(false);
  const [showLoader3, setShowLoader3] = useState(false);

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
    image: null,
  });

  const [price, setPrice] = useState(null);
  const [slots, setSlots] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [notAvailableTimeSlot, setNotAvailableTimeSlot] = useState([]);
  const [formattedDate_, setformattedDate] = useState(null);

  const [emptyService, setEmptyService] = useState("");
  const [emptypet_name, setEmptypet_name] = useState("");
  const [emptypet_type, setEmptypet_type] = useState("");
  const [emptybreed, setEmptybreed] = useState("");
  const [emptyprofile, setEmptyprofile] = useState(null);
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
      appointmentForm.image === null ||
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
      if (appointmentForm.image === null) {
        setEmptyprofile("Pet Profile is required");
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
  //timeslots to remove
  const handleTimeDateSlotToRemove = async () => {
    const date = new Date(appointmentForm.appointment_date);
    const formattedDate = [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, "0"),
      String(date.getDate()).padStart(2, "0"),
    ].join("-");

    console.log("FORMATED : ", formattedDate);

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
    const getClickedVeterinarian = async () => {
      try {
        const res = await axiosIntance.post(
          "admin/veterinarian/GetClickedVeterinarian.php",
          { user_id: userId.userId }
        );
        if (res.data.success) {
          setVeterinarianInfo(res.data.data.veterinarianInfo);
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

    const allSlots = generateTimeSlots(
      veterinarianInfo.time,
      veterinarianInfo.duration
    );

    // extract unavailable time slots from the array of objects
    const unavailable = notAvailableTimeSlot.map(
      (item) => item.appointment_time
    );

    // filter out unavailable slots
    const availableSlots = allSlots.filter(
      (slot) => !unavailable.includes(slot)
    );

    setSlots(availableSlots);
  }, [veterinarianInfo, notAvailableTimeSlot]);

  const handleShowSummary = () => {
    // Check if appointment_date is empty
    if (!appointmentForm.appointment_date) {
      setEmptyappointment_date("Select your preferred date");
      return;
    }
    if (selectedTimeSlot === null) {
      return;
    }

    const formattedDate = new Date(
      appointmentForm.appointment_date
    ).toLocaleDateString("en-CA");

    setformattedDate(formattedDate);
    setShowSummaryForm(true);
  };

  //handle submit
  const handleSubmitAppointment = async () => {
    if (!appointmentForm.appointment_date) {
      console.warn("Appointment date is required.");
      return false;
    }

    const formattedDate = new Date(
      appointmentForm.appointment_date
    ).toLocaleDateString("en-CA");

    setformattedDate(formattedDate);

    const formData = new FormData();
    formData.append("client_id", currentUser?.user_id);
    formData.append("dr_id", userId.userId);
    formData.append("service", appointmentForm.service);
    formData.append("pet_name", appointmentForm.pet_name);
    formData.append("pet_type", appointmentForm.pet_type);
    formData.append("breed", appointmentForm.breed);
    formData.append("age", appointmentForm.age);
    formData.append("weight", appointmentForm.weight);
    formData.append("gender", appointmentForm.gender);
    formData.append(
      "current_health_issue",
      appointmentForm.current_health_issue
    );
    formData.append(
      "history_health_issue",
      appointmentForm.history_health_issue
    );
    formData.append("appointment_date", formattedDate);
    formData.append("appointment_time", selectedTimeSlot);
    formData.append("price", price);

    // Only append image if a file is selected
    if (appointmentForm.image) {
      formData.append("image", appointmentForm.image);
    }

    try {
      const res = await axiosIntance.post(
        "client/appointment/SetAppointment.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.success) {
        console.log("RESPONSE : ", res.data.message);
        handleTimeDateSlotToRemove();
        return true;
      } else {
        console.log("ERROR : ", res.data);
        return false;
      }
    } catch (error) {
      console.log("Error : ", error);
      return false;
    }
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    setShowLoader3(true);

    try {
      const data = {
        description: `Payment for ${appointmentForm.service}`,
        remarks: "Remarks",
        amount: price * 100,
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
    const submitResult = await handleSubmitAppointment();

    // If the appointment was submitted successfully, proceed to payment
    if (submitResult === true) {
      await handlePayment(e);
      setTimeout(() => {
        setShowSummaryForm(false);
      }, 7000);
    } else {
      console.log("Appointment submission failed. Payment cancelled.");
    }
  };

  //handleTimeDateSlotToRemove();
  useEffect(() => {
    handleTimeDateSlotToRemove();
  }, [appointmentForm.appointment_date]);

  return (
    <>
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
                src={`${uploadUrl.uploadurl}/${veterinarianInfo?.profile}`}
                alt="profile"
                className="profile"
              />
            </div>

            <h3>
              <CiStethoscope className="icon" /> Dr.{" "}
              {veterinarianInfo?.fullname}
            </h3>
            <span>{veterinarianInfo?.specialization}</span>
          </motion.div>

          <div className="setappointment-bot">
            <div className="profile-wrapper">
              <img
                src={`${uploadUrl.uploadurl}/${veterinarianInfo?.profile}`}
                alt="profile"
                className="profile"
              />
            </div>
            <span className="dr-name2">
              <CiStethoscope className="icon" /> {veterinarianInfo?.fullname}
            </span>
            <small className="dr-name2">
              {veterinarianInfo?.specialization}
            </small>

            {showDateTime === "1" && (
              <div className="petinfo-form">
                {/* <span className="note">
                  Hey {currentUser?.fullname.split(" ")[0]}, please fill out the
                  form for your pet's information.
                </span> */}
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
                          border: `${
                            emptyService !== "" ? "2px solid red" : ""
                          }`,
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
                            (item) => item.vservices === value
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
                        style={{
                          color: `${emptypet_name !== "" ? "red" : ""}`,
                        }}
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
                        style={{
                          color: `${emptypet_type !== "" ? "red" : ""}`,
                        }}
                        htmlFor="type"
                      >
                        {emptypet_type !== "" ? emptypet_type : "Pet Type"}
                      </label>
                      <select
                        style={{
                          border: emptypet_type !== "" ? "2px solid red" : "",
                        }}
                        value={
                          (appointmentForm.pet_type =
                            veterinarianInfo?.specialization
                              ? veterinarianInfo.specialization.split(" ")[0]
                              : "")
                        }
                        onChange={handleChange}
                        name="pet_type"
                        id="pet_type"
                      >
                        <option
                          id="pet_type"
                          value={
                            veterinarianInfo?.specialization
                              ? veterinarianInfo.specialization.split(" ")[0]
                              : ""
                          }
                        >
                          {veterinarianInfo?.specialization
                            ? veterinarianInfo.specialization.split(" ")[0]
                            : ""}
                        </option>
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
                          border: `${
                            emptyweight !== "" ? "2px solid red" : ""
                          }`,
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
                    <div className="input-wrapper">
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

                    <div className="input-wrapper">
                      <label
                        style={{
                          color: `${emptyprofile !== null ? "red" : ""}`,
                        }}
                        htmlFor="type"
                      >
                        {emptyprofile !== null ? emptyprofile : "Pet Profile"}
                      </label>
                      <input
                        type="file"
                        onChange={(e) =>
                          setAppointment({
                            ...appointmentForm,
                            image: e.target.files[0],
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="text-area-wrapper">
                    <label
                      style={{
                        color: `${
                          emptycurrent_health_issue !== "" ? "red" : ""
                        }`,
                      }}
                      htmlFor="concern"
                    >
                      {emptycurrent_health_issue !== ""
                        ? emptycurrent_health_issue
                        : "Current Pet Health Concerns or Conditions"}{" "}
                    </label>
                    <textarea
                      style={{
                        border: `${
                          emptycurrent_health_issue !== ""
                            ? "2px solid red"
                            : ""
                        }`,
                      }}
                      value={appointmentForm.current_health_issue}
                      onChange={handleChange}
                      name="current_health_issue"
                      id="concern"
                      placeholder="Current Pet Health Concerns or Conditions"
                    ></textarea>
                  </div>
                  <div className="text-area-wrapper">
                    <label
                      style={{
                        color: `${
                          emptyhistory_health_issue !== "" ? "red" : ""
                        }`,
                      }}
                      htmlFor="history"
                    >
                      {emptyhistory_health_issue !== ""
                        ? emptyhistory_health_issue
                        : "Pet's vaccination history, allergies, medical history, and past treatments."}{" "}
                    </label>
                    <textarea
                      style={{
                        border: `${
                          emptyhistory_health_issue !== ""
                            ? "2px solid red"
                            : ""
                        }`,
                      }}
                      value={appointmentForm.history_health_issue}
                      onChange={handleChange}
                      name="history_health_issue"
                      id="history"
                      placeholder="Pet's vaccination history, allergies, medical history, and past treatments."
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

                {appointmentForm.appointment_date !== "" ? (
                  <div className="times-wrapper">
                    {slots.length > 0 ? (
                      slots.map((item, index) => (
                        <button
                          disabled={appointmentForm.appointment_date === ""}
                          key={index}
                          className={`time ${
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
                    onClick={() => setshowDateTime("1")}
                  />
                  <button
                    className="btn-setappointment"
                    onClick={handleShowSummary}
                  >
                    View Summary
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {showSummaryForm && (
        <div className="payment-summary">
          <div className="container">
            <div className="top">
              <h4>Appointment Summary</h4>
              <IoMdClose className="icon" />
            </div>

            <div className="content">
              <span>
                <BsCalendar2Date className="icon" /> Appointment Date :{" "}
                {formattedDate_}
              </span>
              <span>
                <LuCalendarClock className="icon" /> Appointment Time :{" "}
                {selectedTimeSlot}
              </span>
              <span>
                <MdOutlineMedicalServices className="icon" /> Treatment :{" "}
                {appointmentForm.service.split(" - ")[0]}
              </span>
              <span>
                <AiOutlineSnippets className="icon" /> Pet Name :{" "}
                {appointmentForm.pet_name}
              </span>
              <span>
                <AiOutlineSnippets className="icon" /> Pet Type :{" "}
                {appointmentForm.pet_type}
              </span>
              <span>
                <AiOutlineSnippets className="icon" /> Pet Breed :{" "}
                {appointmentForm.breed}
              </span>
              <span>
                <AiOutlineSnippets className="icon" /> Pet Weight :{" "}
                {appointmentForm.breed}
              </span>
              <span>
                Health Issue : <br /> {appointmentForm.current_health_issue}
              </span>

              <div className="hr"></div>

              <span className="total_price">
                Total Price : <h3> ₱ {price}</h3>{" "}
              </span>
            </div>

            <div className="buttons">
              <button
                className="btn-cancel"
                onClick={() => setShowSummaryForm(false)}
              >
                Cancel
              </button>
              <button className="btn-submit" onClick={handleSendDataAndPayment}>
                {showLoader3 ? <Loader2 /> : " Procced to Payment"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SetAppointment;
