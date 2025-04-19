import "./Navbar.scss";

import logo from "../../../../assets/icons/logo.png";

//ICONS
import { GoHomeFill } from "react-icons/go";
import { FaBell } from "react-icons/fa6";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { BiSolidMessageRoundedDetail } from "react-icons/bi";
import { IoSettingsOutline } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import axiosIntance from "../../../../../axios";
import { AuthContext } from "../../../../contexts/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const { setFormToShow, setCurrentUser } = useContext(AuthContext);

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
      <div className="vnavbar">
        <div className="nav-container">
          <img src={logo} alt="logo" className="logo" />
          <div className="vnav-buttons">
            <Link className="list-icon">
              <GoHomeFill className="nav-icon" />
            </Link>
            <Link className="list-icon">
              <BiSolidMessageRoundedDetail className="nav-icon" />
            </Link>
            <Link className="list-icon">
              <FaBell className="nav-icon" />
            </Link>
            <Link
              className="list-icon"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <FaUserCircle className="nav-icon" />
            </Link>

            {showDropdown && (
              <div className="dropdown-vet">
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
        </div>
      </div>
    </>
  );
};

export default Navbar;
