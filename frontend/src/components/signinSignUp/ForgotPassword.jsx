import { useContext, useState } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../../contexts/AuthContext";
import "./ForgotPassword.scss";

//IMAGE
import catdog from "../../assets/imges/signinimaeg.png";
import logo from "../../assets/icons/logo.png";

//ICONS
import { AiOutlineClose } from "react-icons/ai";
import axiosIntance from "../../../axios";
import Loader from "../loader/Loader";

const ForgotPassword = () => {
  const { setFormToShow, setMessageFromMail } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [showLoader, setshowLoader] = useState(false);

  const [confirm, setConfirm] = useState({
    email: "",
    npassword: "",
    cpassword: "",
  });

  const handleChangeData = (e) => {
    const { name, value } = e.target;

    setConfirm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setshowLoader(true);
    if (
      confirm.email === "" ||
      confirm.npassword === "" ||
      confirm.cpassword === ""
    ) {
      if (confirm.email === "") {
        setEmptyEmail("Email is required");
      }
      if (confirm.npassword === "") {
        setEmptyPassword("Password is required");
      }
      if (confirm.cpassword === "") {
        setEmptyPassword("Comnfirm your Password");
      }
      setshowLoader(false);

      return;
    }

    try {
      const res = await axiosIntance.post("client/auth/Forgotpassword.php", {
        email: confirm.email,
        password: confirm.cpassword,
      });

      if (res.data.success) {
        setTimeout(() => {
          setshowLoader(false);
          setMessageFromMail({
            message: res.data.message,
            email: res.data.email,
          });
          setFormToShow("confirm");
        }, 2000);
      } else {
        setshowLoader(false);

        console.log("ERROR : ", res.data);
      }
    } catch (error) {
      setshowLoader(false);

      console.log("Error : ", error);
    }
  };

  return (
    <>
      <div className="forgotpass">
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
                <h3 className="h3">ACCOUNT RECOVERY</h3>

                <span
                  className="sign-up-btn"
                  onClick={() => {
                    setFormToShow("signin");
                    nav;
                  }}
                >
                  Back
                </span>
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
                  value={confirm.email}
                  onChange={handleChangeData}
                />
              </div>

              <div className="input-wrapper">
                <label htmlFor="password">New Password</label>
                <input
                  id="npassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="New Password"
                  name="npassword"
                  value={confirm.npassword}
                  onChange={handleChangeData}
                />
              </div>

              <div className="input-wrapper">
                <label htmlFor="password">Confirm Password</label>
                <input
                  id="cpassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="New Password"
                  name="cpassword"
                  value={confirm.cpassword}
                  onChange={handleChangeData}
                />
              </div>

              <button className="btn-signin" onClick={handleSubmit}>
                SUBMIT
              </button>

              <div className="showpass-wrapper">
                <input
                  type="checkbox"
                  onChange={(e) => setShowPassword(e.target.checked)}
                />
                <span>Show password</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      {showLoader && <Loader _label="Please wait..." />}
    </>
  );
};

export default ForgotPassword;
