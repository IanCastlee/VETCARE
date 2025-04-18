import "./ConfirmationForm.scss";
import { motion } from "framer-motion";

//IMAGE
import catdog from "../../assets/imges/signinimaeg.png";
import logo from "../../assets/icons/logo.png";

//ICONS
import { AiOutlineClose } from "react-icons/ai";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import axiosIntance from "../../../axios";
import Loader from "../loader/Loader";
import Toaster from "../toaster/Toaster";

const ConfirmationForm = ({ _message, email }) => {
  const { setFormToShow } = useContext(AuthContext);
  const [code, setcode] = useState(null);
  const [showLoader, setshowLoader] = useState(false);
  const [toasterMessage, setToasterMessage] = useState(null);

  const [mesageFromVerification, setmesageFromVerification] = useState(null);
  const [showSigninButton, setshowSigninButton] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setcode((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const inputs = document.querySelectorAll(".code-input");
    let code = "";

    inputs.forEach((input) => {
      code += input.value;
    });

    console.log("first", code);
    setcode(code);
  }, [code]);

  const hadleSubmit = async (e) => {
    e.preventDefault();

    setshowLoader(true);

    try {
      const res = await axiosIntance.post("client/auth/Verify.php", {
        otp: code,
        email: email,
      });
      if (res.data.success) {
        setTimeout(() => {
          setshowLoader(false);
        }, 2000);
        setmesageFromVerification(res.data.message);
        setToasterMessage(res.data.message);
        setTimeout(() => {
          setToasterMessage(null);
        }, 8000);
        setshowSigninButton(true);
      }
    } catch (error) {
      console.log("Erorr : ", error);
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
                <h3>CONFIRM YOUR EMAIL</h3>
                <p>back to</p>
                <span onClick={() => setFormToShow("signin")}>Sign In</span>
              </div>
            </div>

            <div className="bot">
              <img src={catdog} alt="cat_and_dog" className="image-bg" />
            </div>
          </div>
          <div className="right">
            <div className="message">
              <p>{_message || mesageFromVerification}</p>

              {showSigninButton && (
                <button onClick={() => setFormToShow("signin")}>Sign In</button>
              )}
            </div>
            <div className="code-container">
              <input
                type="text"
                onChange={handleChange}
                name="code"
                maxlength="1"
                className="code-input"
              />
              <input
                type="text"
                onChange={handleChange}
                name="code"
                maxlength="1"
                className="code-input"
              />
              <input
                type="text"
                onChange={handleChange}
                name="code"
                maxlength="1"
                className="code-input"
              />
              <input
                type="text"
                onChange={handleChange}
                name="code"
                maxlength="1"
                className="code-input"
              />
            </div>

            <button className="btn-submit" onClick={hadleSubmit}>
              VERIFY
            </button>
            <span className="btn-resend">Resend Code</span>
          </div>
        </motion.div>

        <AiOutlineClose
          className="close-icon"
          onClick={() => setFormToShow(null)}
        />
      </div>

      {showLoader && <Loader _label="Verifying..." />}
      {toasterMessage != null && !showLoader && (
        <Toaster
          message={mesageFromVerification}
          _click={() => setToasterMessage(null)}
        />
      )}
    </>
  );
};

export default ConfirmationForm;
