import "./Navbar.scss";
import MobileSidebar from "../mobileSidebar/MobileSidebar";
import OverLay from "../overlay/OverLay";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import axiosIntance from "../../../axios";

//IMAGES
import logo from "../../assets/icons/logo.png";

//ICONS
import { RiHomeLine } from "react-icons/ri";
import { LuCalendarCheck } from "react-icons/lu";
import { AiOutlineBell } from "react-icons/ai";
import { FaRegCircleUser } from "react-icons/fa6";
import { RiMenu3Line } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import { AiOutlineMedicineBox } from "react-icons/ai";
import Notification from "../notification/Notification";
import { AiFillBell } from "react-icons/ai";

const Navbar = ({ isHome }) => {
  const navigate = useNavigate();
  const { setFormToShow, setCurrentUser, currentUser } =
    useContext(AuthContext);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showNotifModal, setShowNotifModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosIntance.post(
        "client/auth/Logout.php",
        {},
        { withCredentials: true }
      );

      if (res.data.success) {
        localStorage.removeItem("data");
        localStorage.clear();
        navigate("/home/");
        setCurrentUser(null);
        setFormToShow("signin");
      } else {
        console.error("Logout failed: ", res.data.message);
      }
    } catch (error) {
      console.log("Error in logging out", error);
    }
  };

  return (
    <>
      <div className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-container">
          <img src={logo} alt="logo" className="logo" />
          <div className="nav-buttons">
            {currentUser !== null && (
              <div className="top">
                <span>Welcome, {currentUser?.fullname.split(" ")[0]}</span>
              </div>
            )}
            <div className="bot">
              <Link to="/home/" title="Home" className="list-icon">
                <RiHomeLine className="nav-icon" />
              </Link>

              <Link to="/medicine/" title="Vetcare Shop" className="list-icon">
                <AiOutlineMedicineBox className="nav-icon" />
              </Link>
              <Link
                to="/myappointment/"
                title="Appointment"
                className="list-icon"
              >
                <LuCalendarCheck className="nav-icon" />
              </Link>
              <Link
                title="Notification"
                className="list-icon-notif"
                onClick={() => setShowNotifModal(!showNotifModal)}
              >
                <AiOutlineBell className="nav-icon" />

                <div className="dot-wrapper">
                  <span>9</span>
                </div>
              </Link>
              <Link
                onClick={() => setShowDropdown(!showDropdown)}
                className="list-icon"
              >
                <FaRegCircleUser className="nav-icon" />
              </Link>

              {currentUser === null && (
                <button
                  className="btn-signin"
                  onClick={() => setFormToShow("signin")}
                >
                  Sign In
                </button>
              )}
            </div>
          </div>

          <div className="menu-notif-wrapper">
            <div
              className="notification-icon"
              onClick={() => setShowNotifModal(true)}
            >
              <AiFillBell className="bell-icon" />
              <div className="count">
                <span>8</span>
              </div>
            </div>
            <RiMenu3Line
              className={`menu-icon ${isHome ? "home_" : ""}`}
              onClick={() => setShowMobileSidebar(true)}
            />
          </div>
        </div>

        {showDropdown && (
          <div className="dropdown-client">
            <div className="container">
              <span>
                <IoSettingsOutline className="icon" /> Setting
              </span>
              <span onClick={handleLogout}>
                <IoMdLogOut className="icon" /> Logout
              </span>
            </div>
          </div>
        )}
      </div>

      {showMobileSidebar && (
        <MobileSidebar close={() => setShowMobileSidebar(false)} />
      )}
      {showMobileSidebar && (
        <OverLay closeMobileSidebar={() => setShowMobileSidebar(false)} />
      )}

      {showNotifModal && (
        <Notification close={() => setShowNotifModal(false)} />
      )}
    </>
  );
};

export default Navbar;
