import "./PaymentSummary.scss";

//IMAGES
import logo from "../../assets/icons/logo.png";

//iCONS
import { IoMdClose } from "react-icons/io";
import { BsCalendar2Date } from "react-icons/bs";
import { LuCalendarClock } from "react-icons/lu";
import { MdOutlineMedicalServices } from "react-icons/md";
import { AiOutlineSnippets } from "react-icons/ai";
import { BsFileEarmarkMedical } from "react-icons/bs";
import axiosIntance from "../../../axios";

const PaymentSummary = ({ data }) => {
  //handle submit

  console.log(data);

  return (
    <div className="payment-summary">
      <div className="container">
        <div className="top">
          <h4>Appointment Summary</h4>
          <IoMdClose className="icon" />
        </div>

        <div className="content">
          <span>
            <BsCalendar2Date className="icon" /> Appointment Date :{" "}
            {data.appointment_date}
          </span>
          <span>
            <LuCalendarClock className="icon" /> Appointment Time :{" "}
            {data.appointment_time}
          </span>
          <span>
            <MdOutlineMedicalServices className="icon" /> Treatment :{" "}
            {data.service.split(" - ")[0]}
          </span>
          <span>
            <AiOutlineSnippets className="icon" /> Pet Name : {data.pet_name}
          </span>
          <span>
            <AiOutlineSnippets className="icon" /> Pet Type : {data.pet_type}
          </span>
          <span>
            <AiOutlineSnippets className="icon" /> Pet Breed : {data.breed}
          </span>
          <span>
            <AiOutlineSnippets className="icon" /> Pet Weight : {data.breed}
          </span>
          <span>
            Health Issue : <br /> {data.current_health_issue}
          </span>

          <div className="hr"></div>

          <span className="total_price">
            Total Price : <h3> ₱ {data.price}</h3>{" "}
          </span>
        </div>

        <div className="buttons">
          <button className="btn-cancel">Cancel</button>
          <button className="btn-submit" onClick={handleSubmitAppointment}>
            Procced to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSummary;
