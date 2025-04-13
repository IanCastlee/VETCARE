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
import axiosIntance from "../../../axios";

const Signup = ({ close }) => {
  const [formToShow, setformToShow] = useState("1");
  const [showSignInForm, setshowSignInForm] = useState(false);

  const [emptyFullname, setEmptyFullname] = useState("");
  const [emptyAddress, setEmptyAddress] = useState("");
  const [emptyPhone, setEmptyPhone] = useState("");
  const [emptyEmail, setEmptyEmail] = useState("");
  const [emptyPassword, setEmptyPassword] = useState("");
  const [emptyCPassword, setEmptyCPassword] = useState("");

  const [signUpdata, setSignUptData] = useState({
    fullname: "",
    address: "",
    phone: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const handleSignUpDataChange = (e) => {
    const { name, value } = e.target;

    setEmptyFullname("");
    setEmptyAddress("");
    setEmptyPhone("");
    setEmptyEmail("");
    setEmptyPassword("");
    setEmptyCPassword("");

    setSignUptData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNext = () => {
    if (
      signUpdata.fullname === "" ||
      signUpdata.address === "" ||
      signUpdata.phone === ""
    ) {
      if (signUpdata.fullname === "") {
        setEmptyFullname("Fullname is required");
      }
      if (signUpdata.address === "") {
        setEmptyAddress("Address is required");
      }
      if (signUpdata.phone === "") {
        setEmptyPhone("Phone is required");
      }

      return;
    }
    setformToShow("2");
  };

  //SIGNUP
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      signUpdata.email === "" ||
      signUpdata.password === "" ||
      signUpdata.cpassword === ""
    ) {
      if (signUpdata.email === "") {
        setEmptyEmail("Email is required");
      }
      if (signUpdata.password === "") {
        setEmptyPassword("Password is required");
      }
      if (signUpdata.cpassword === "") {
        setEmptyCPassword("Confirm your password");
      }
      return;
    }

    // Gmail validation
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!gmailRegex.test(signUpdata.email)) {
      setEmptyEmail("Please enter a valid Gmail address.");
      return;
    }

    if (signUpdata.password !== signUpdata.cpassword) {
      setEmptyCPassword("Passwords and confirm password not matched!");

      return;
    }

    const passwordCriteria = /^(?=.*[A-Z])(?=.*[0-9]).{8,}$/;

    if (!passwordCriteria.test(signUpdata.password)) {
      setEmptyPassword(
        "Password must be at least 8 characters long and include a capital letter and a number."
      );

      return;
    }

    try {
      const res = await axiosIntance.post("client/auth/Signup.php", {
        fullname: signUpdata.fullname,
        address: signUpdata.address,
        phone: signUpdata.phone,
        email: signUpdata.email,
        password: signUpdata.cpassword,
      });
      if (res.data.success) {
        setSignUptData({
          fullname: "",
          address: "",
          phone: "",
          email: "",
          password: "",
          cpassword: "",
        });
        console.log(res.data.message);
      } else {
        console.log(res.data);
      }
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
                <h3>SIGN UPx</h3>
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
                  <label
                    style={{ color: emptyFullname !== "" ? "red" : "" }}
                    htmlFor="fullname"
                  >
                    {emptyFullname !== "" ? emptyFullname : "Fullname"}
                  </label>
                  <input
                    id="fullname"
                    type="fullname"
                    placeholder="Enter your fullname"
                    name="fullname"
                    onChange={handleSignUpDataChange}
                    value={signUpdata.fullname}
                  />
                </div>
                <div className="input-wrapper">
                  <label
                    style={{ color: emptyAddress !== "" ? "red" : "" }}
                    htmlFor="Address"
                  >
                    {emptyAddress !== "" ? emptyAddress : "Address"}
                  </label>
                  <input
                    id="Address"
                    type="text"
                    placeholder="Enter your Address"
                    name="address"
                    onChange={handleSignUpDataChange}
                    value={signUpdata.address}
                  />
                </div>

                <div className="input-wrapper">
                  <label
                    style={{ color: emptyPhone !== "" ? "red" : "" }}
                    htmlFor="phone"
                  >
                    {emptyPhone !== "" ? emptyPhone : "Phone"}
                  </label>
                  <input
                    id="phone"
                    type="text"
                    placeholder="Enter your Phone"
                    name="phone"
                    onChange={handleSignUpDataChange}
                    value={signUpdata.phone}
                  />
                </div>

                <div className="button-wrapper-continue">
                  <FaArrowCircleRight
                    onClick={handleNext}
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
                  <label
                    style={{ color: emptyEmail !== "" ? "red" : "" }}
                    htmlFor="email"
                  >
                    {emptyEmail !== "" ? emptyEmail : "Email"}
                  </label>
                  <input
                    id="email"
                    type="Email"
                    placeholder="Enter your Email"
                    name="email"
                    onChange={handleSignUpDataChange}
                    value={signUpdata.email}
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
                    type="text"
                    placeholder="Enter your Password"
                    name="password"
                    onChange={handleSignUpDataChange}
                    value={signUpdata.password}
                  />
                </div>
                <div className="input-wrapper">
                  <label
                    style={{ color: emptyCPassword !== "" ? "red" : "" }}
                    htmlFor="cpassword"
                  >
                    {emptyCPassword !== ""
                      ? emptyCPassword
                      : "Confirm Password"}
                  </label>
                  <input
                    id="cpassword"
                    type="text"
                    placeholder="Confirm your Password"
                    name="cpassword"
                    onChange={handleSignUpDataChange}
                    value={signUpdata.cpassword}
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
                  <buttn className="btn-signin" onClick={handleSubmit}>
                    SIGN UP
                  </buttn>
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
