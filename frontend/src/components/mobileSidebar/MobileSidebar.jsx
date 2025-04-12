import "./MobileSidebar.scss";
import { motion } from "framer-motion";

//ICONS
import { FaUserCircle } from "react-icons/fa";
import { RiHomeLine } from "react-icons/ri";
import { HiMiniCalendarDateRange } from "react-icons/hi2";
import { IoMdPower } from "react-icons/io";
import Signin from "../signinSignUp/Signin";
import { useState } from "react";
import { Link } from "react-router-dom";

const MobileSidebar = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="sidebar"
      >
        <div className="top-wrapper">
          {/* <div className="user-profile">
            <FaUserCircle className="profile" />
            <div className="name">Nigga Talaga</div>
          </div> */}

          <button className="btn-signin" onClick={() => setShowForm(true)}>
            SIGN IN
          </button>
        </div>
        <div className="menu-btn">
          <Link className="btn-link" to={"/home/"}>
            <RiHomeLine className="icon" /> Home
          </Link>
          <Link className="btn-link">
            <HiMiniCalendarDateRange className="icon" /> Appointment
          </Link>
          <Link className="btn-link">
            <HiMiniCalendarDateRange className="icon" /> Message
          </Link>
          <Link className="btn-link">
            <IoMdPower className="icon" /> Logout
          </Link>
        </div>
      </motion.div>

      {showForm && <Signin close={() => setShowForm(false)} />}
    </>
  );
};

export default MobileSidebar;
