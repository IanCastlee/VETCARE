import "./MobileSidebar.scss";
import { motion } from "framer-motion";
import Signin from "../signinSignUp/Signin";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

//ICONS
import { RiHomeLine } from "react-icons/ri";
import { HiMiniCalendarDateRange } from "react-icons/hi2";
import { IoMdPower } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import axiosIntance from "../../../axios";
import Loader from "../loader/Loader";

const MobileSidebar = ({ close }) => {
  const { setFormToShow, formToShow, currentUser, setCurrentUser } =
    useContext(AuthContext);

  const [showLoader, setshowLoader] = useState(false);

  const handleLogout = async (e) => {
    e.preventDefault();
    setshowLoader(true);
    try {
      const res = await axiosIntance.post(
        "client/auth/Logout.php",
        {},
        { withCredentials: true }
      );

      if (res.data.success) {
        localStorage.removeItem("data");
        localStorage.clear();

        setCurrentUser(null);
        setFormToShow("signin");
        setshowLoader(false);
      } else {
        console.error("Logout failed: ", res.data.message);
        setshowLoader(false);
      }
    } catch (error) {
      setshowLoader(false);
      console.log("Error in logging out", error);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="sidebar"
      >
        <div className="top-wrapper">
          {currentUser !== null && (
            <div className="user-profile">
              <FaUserCircle className="profile" />
              <div className="name">{currentUser?.fullname}</div>
              <p>{currentUser?.email}</p>
            </div>
          )}

          {currentUser === null && (
            <button
              className="btn-signin"
              onClick={() => {
                setFormToShow("signin");
                close();
              }}
            >
              SIGN IN
            </button>
          )}
        </div>
        <div className="menu-btn" onClick={close}>
          <Link className="btn-link" to={"/home/"}>
            <RiHomeLine className="icon" /> Home
          </Link>
          <Link className="btn-link" to="/myappointment/">
            <HiMiniCalendarDateRange className="icon" /> Appointment
          </Link>
          <Link className="btn-link">
            <HiMiniCalendarDateRange className="icon" /> Message
          </Link>
          {currentUser !== null && (
            <Link className="btn-link" onClick={handleLogout}>
              <IoMdPower className="icon" /> Logout
            </Link>
          )}
        </div>
      </motion.div>
      {formToShow === "signin" && <Signin close={() => setFormToShow(null)} />}
      {showLoader && <Loader _label="Logging out..." />}{" "}
    </>
  );
};

export default MobileSidebar;
