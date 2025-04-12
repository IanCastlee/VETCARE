import "./Navbar.scss";

import logo from "../../assets/icons/logo.png";

//ICONS
import { GoHomeFill } from "react-icons/go";
import { FaCalendarCheck } from "react-icons/fa";
import { FaBell } from "react-icons/fa6";
import { FaUserAlt } from "react-icons/fa";
import { RiMenu3Line } from "react-icons/ri";
import MobileSidebar from "../mobileSidebar/MobileSidebar";
import OverLay from "../overlay/OverLay";
import { useState } from "react";
import { Link } from "react-router-dom";
import Signin from "../signinSignUp/Signin";

const Navbar = () => {
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <div className="navbar">
        <div className="nav-container">
          <img src={logo} alt="logo" className="logo" />
          <div className="nav-buttons">
            <Link to="/home/" className="list-icon">
              <GoHomeFill className="nav-icon" />
            </Link>
            <Link className="list-icon">
              <FaCalendarCheck className="nav-icon" />
            </Link>
            <Link className="list-icon">
              <FaBell className="nav-icon" />
            </Link>
            <Link className="list-icon">
              <FaUserAlt className="nav-icon" />
            </Link>

            <button className="btn-signin" onClick={() => setShowForm(true)}>
              Sign In
            </button>
          </div>
          <RiMenu3Line
            className="menu-icon"
            onClick={() => setShowMobileSidebar(true)}
          />
        </div>
      </div>

      {showMobileSidebar && (
        <MobileSidebar close={() => setShowMobileSidebar(false)} />
      )}
      {showMobileSidebar && (
        <OverLay closeMobileSidebar={() => setShowMobileSidebar(false)} />
      )}

      {showForm && <Signin close={() => setShowForm(false)} />}
    </>
  );
};

export default Navbar;
