import "./Navbar.scss";

import logo from "../../../../assets/icons/logo.png";

//ICONS
import { GoHomeFill } from "react-icons/go";
import { FaBell } from "react-icons/fa6";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { BiSolidMessageRoundedDetail } from "react-icons/bi";

const Navbar = () => {
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <div className="navbar">
        <div className="nav-container">
          <img src={logo} alt="logo" className="logo" />
          <div className="nav-buttons">
            <Link className="list-icon">
              <GoHomeFill className="nav-icon" />
            </Link>
            <Link className="list-icon">
              <BiSolidMessageRoundedDetail className="nav-icon" />
            </Link>
            <Link className="list-icon">
              <FaBell className="nav-icon" />
            </Link>
            <Link className="list-icon">
              <FaUserCircle className="nav-icon" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
