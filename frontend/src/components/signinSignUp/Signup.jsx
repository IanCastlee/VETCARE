import "./Signup.scss";
import { motion } from "framer-motion";
import { useState } from "react";

//IMAGE
import catdog from "../../assets/imges/signinimaeg.png";
import logo from "../../assets/icons/logo.png";
import { Link } from "react-router-dom";

//ICONS
import { AiOutlineClose } from "react-icons/ai";
import { FaArrowCircleRight } from "react-icons/fa";
import { FaArrowCircleLeft } from "react-icons/fa";
import Signin from "./Signin";

const Signup = ({ close }) => {
  const [formToShow, setformToShow] = useState("1");
  const [showSignInForm, setshowSignInForm] = useState(false);
  return (
    <>
      <div className="signin">
        <motion.div
          initial={{ opacity: 0, y: -200 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container"
        >
          <div className="left">
            <div className="top">
              <img src={logo} alt="logo" className="logo" />

              <div className="signin-label-wrapper">
                <h3>SIGN UP</h3>
                <span>to VETCARE</span>
                <strong>OR</strong>
                <Link
                  className="sign-up-btn"
                  onClick={() => {
                    setshowSignInForm(true);
                    close;
                  }}
                >
                  Sign In
                </Link>
              </div>
            </div>

            <div className="bot">
              <img src={catdog} alt="cat_and_dog" className="image-bg" />
            </div>
          </div>
          <div className="right">
            <h3 className="active-form-label">
              {formToShow === "1" ? "Parent Information" : "Credentials"}
            </h3>
            {formToShow === "1" && (
              <div className="form">
                <div className="input-wrapper">
                  <label htmlFor="fullname">Fullname</label>
                  <input
                    id="fullname"
                    type="fullname"
                    placeholder="Enter your fullname"
                    name="fullname"
                  />
                </div>
                <div className="input-wrapper">
                  <label htmlFor="Address">Address</label>
                  <input
                    id="Address"
                    type="text"
                    placeholder="Enter your Address"
                    name="Address"
                  />
                </div>

                <div className="input-wrapper">
                  <label htmlFor="phone">Phone</label>
                  <input
                    id="phone"
                    type="text"
                    placeholder="Enter your Phone"
                    name="phone"
                  />
                </div>

                <div className="button-wrapper-continue">
                  <FaArrowCircleRight
                    onClick={() => setformToShow("2")}
                    style={{
                      fontSize: "1.875rem",
                      cursor: "pointer",
                      color: "#0C0950",
                    }}
                  />
                </div>
              </div>
            )}
            {formToShow === "2" && (
              <div className="form">
                <div className="input-wrapper">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="Email"
                    placeholder="Enter your Email"
                    name="Email"
                  />
                </div>
                <div className="input-wrapper">
                  <label htmlFor="password">password</label>
                  <input
                    id="password"
                    type="text"
                    placeholder="Enter your Password"
                    name="password"
                  />
                </div>
                <div className="input-wrapper">
                  <label htmlFor="cpassword">Confirm password</label>
                  <input
                    id="cpassword"
                    type="text"
                    placeholder="Confirm your Password"
                    name="cpassword"
                  />
                </div>
                <div className="button-wrapper">
                  <FaArrowCircleLeft
                    onClick={() => setformToShow("1")}
                    style={{
                      fontSize: "1.875rem",
                      cursor: "pointer",
                      color: "#0C0950",
                    }}
                  />
                  <buttn className="btn-signin">SIGN UP</buttn>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        <AiOutlineClose className="close-icon" onClick={close} />
      </div>
      {showSignInForm && <Signin close={() => setshowSignInForm(false)} />}{" "}
    </>
  );
};

export default Signup;
