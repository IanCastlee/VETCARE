import "./Signin.scss";
import { motion } from "framer-motion";

//IMAGE
import catdog from "../../assets/imges/signinimaeg.png";
import logo from "../../assets/icons/logo.png";

//ICONS
import { AiOutlineClose } from "react-icons/ai";
import { useContext, useEffect, useState } from "react";
import ConfirmationForm from "./ConfirmationForm";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const { login, formToShow, setFormToShow, errorMessage, _navigate } =
    useContext(AuthContext);

  const [showConfirmationForm, setShowConfirmationForm] = useState(false);

  const [emptyEmail, setEmptyEmail] = useState("");
  const [emptyPassword, setEmptyPassword] = useState("");

  const [signinData, setSigninData] = useState({
    email: "",
    password: "",
  });

  const handleChangeData = (e) => {
    const { name, value } = e.target;
    setEmptyEmail("");
    setEmptyPassword("");

    setSigninData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  ///signin
  const handleSignIn = async (e) => {
    e.preventDefault();

    if (signinData.email === "" || signinData.password === "") {
      if (signinData.email === "") {
        setEmptyEmail("Email is required");
      }
      if (signinData.password === "") {
        setEmptyPassword("Password is required");
      }

      return;
    }

    try {
      await login(signinData);
    } catch (error) {
      console.log("Error : ", error);
    }
  };

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
                <h3 className="h3">SIGN IN</h3>
                <span>to your VETCARE account</span>
                <strong>OR</strong>
                <span
                  className="sign-up-btn"
                  onClick={() => {
                    setFormToShow("signup");
                    nav;
                  }}
                >
                  Sign Up
                </span>
              </div>
            </div>

            <div className="bot">
              <img src={catdog} alt="cat_and_dog" className="image-bg" />
            </div>
          </div>
          <div className="right">
            <span className="errorMessage">{errorMessage}</span>
            <div className="form">
              <div className="input-wrapper">
                <label
                  style={{ color: emptyEmail !== "" ? "red" : "" }}
                  htmlFor="email"
                >
                  {emptyEmail !== "" ? emptyEmail : "Email"}
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  onChange={handleChangeData}
                />
              </div>
              <div className="input-wrapper">
                <label
                  style={{ color: emptyPassword !== "" ? "red" : "" }}
                  htmlFor="password"
                >
                  {emptyPassword !== "" ? emptyPassword : "Password"}
                </label>
                <input
                  id="password"
                  type="email"
                  placeholder="Enter your password"
                  name="password"
                  onChange={handleChangeData}
                />
              </div>

              <button className="btn-signin" onClick={handleSignIn}>
                SIGN IN
              </button>

              <div className="forgotpassword">
                <span onClick={() => setFormToShow("confirm")}>
                  Forgot passord
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        <AiOutlineClose
          className="close-icon"
          onClick={() => setFormToShow(null)}
        />
      </div>

      {/* {formToShow === "signup" && (
        <Signup close={() => setshowSignupForm(false)} />
      )} */}

      {showConfirmationForm && (
        <ConfirmationForm close={() => setFormToShow(null)} />
      )}
    </>
  );
};

export default Signin;
