import "./Signin.scss";
import { motion } from "framer-motion";

//IMAGE
import catdog from "../../assets/imges/signinimaeg.png";
import logo from "../../assets/icons/logo.png";
import { Link } from "react-router-dom";

//ICONS
import { AiOutlineClose } from "react-icons/ai";
import Signup from "./Signup";
import { useState } from "react";
import ConfirmationForm from "./ConfirmationForm";

const Signin = ({ close }) => {
  const [showSignupForm, setshowSignupForm] = useState(false);
  const [showConfirmationForm, setShowConfirmationForm] = useState(false);

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
                <h3>SIGN IN</h3>
                <span>to your VETCARE account</span>
                <strong>OR</strong>
                <Link
                  className="sign-up-btn"
                  onClick={() => {
                    setshowSignupForm(true);
                    close;
                  }}
                >
                  Sign Up
                </Link>
              </div>
            </div>

            <div className="bot">
              <img src={catdog} alt="cat_and_dog" className="image-bg" />
            </div>
          </div>
          <div className="right">
            <div className="form">
              <div className="input-wrapper">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                />
              </div>
              <div className="input-wrapper">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="email"
                  placeholder="Enter your password"
                  name="password"
                />
              </div>

              <buttn className="btn-signin">SIGN IN</buttn>

              <div className="forgotpassword">
                <span onClick={() => setShowConfirmationForm(true)}>
                  Forgot passord
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        <AiOutlineClose className="close-icon" onClick={close} />
      </div>

      {showSignupForm && <Signup close={() => setshowSignupForm(false)} />}

      {showConfirmationForm && (
        <ConfirmationForm close={() => setShowConfirmationForm(false)} />
      )}
    </>
  );
};

export default Signin;
