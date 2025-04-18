import "./AdminSidebar.scss";

//IMAGES
import logo from "../../../../assets/icons/logo.png";
import { RiHomeLine } from "react-icons/ri";
import { MdOutlineDateRange } from "react-icons/md";
import { PiUsersThreeBold } from "react-icons/pi";
import { MdOutlineMedicalServices } from "react-icons/md";
import { MdOutlineEventNote } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import { useState } from "react";

//ICONS
import { LuStethoscope } from "react-icons/lu";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  const [showAppointmentDropdown, setShowAppointmentDropdown] = useState(false);
  const [showVeterDropdown, setShowVeteDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  return (
    <div className="admin-sidebar">
      <div className="top">
        <img src={logo} alt="" />
      </div>

      <ul>
        <Link to="/admin/home/" className="item">
          <RiHomeLine className="link-icon" />
          Homie
        </Link>
        <li
          className="item"
          onClick={() => setShowAppointmentDropdown(!showAppointmentDropdown)}
        >
          <MdOutlineDateRange className="link-icon" />
          Appointment
        </li>
        {showAppointmentDropdown && (
          <div className="dropdown">
            <button className="btn-li">Appointment</button>
            <button className="btn-li">History</button>
          </div>
        )}

        <li
          className="item"
          onClick={() => setShowVeteDropdown(!showVeterDropdown)}
        >
          <LuStethoscope className="link-icon" />
          Veterinarian
        </li>

        {showVeterDropdown && (
          <div className="dropdown">
            <Link className="btn-li" to="/admin/active-veterinarian/">
              Active
            </Link>
            <Link className="btn-li">Not Active</Link>
          </div>
        )}

        <li
          className="item"
          onClick={() => setShowUserDropdown(!showUserDropdown)}
        >
          <PiUsersThreeBold className="link-icon" />
          User
        </li>

        {showUserDropdown && (
          <div className="dropdown">
            <button className="btn-li">Active</button>
            <button className="btn-li">Not Active</button>
          </div>
        )}

        <li className="item">
          <MdOutlineMedicalServices className="link-icon" />
          Services
        </li>
        <li className="item">
          <MdOutlineEventNote className="link-icon" />
          Event
        </li>
        <li className="item">
          <IoMdLogOut className="link-icon" />
          Logout
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
