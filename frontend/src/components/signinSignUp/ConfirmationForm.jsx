import "./ConfirmationForm.scss";
import { motion } from "framer-motion";

//IMAGE
import catdog from "../../assets/imges/signinimaeg.png";
import logo from "../../assets/icons/logo.png";

//ICONS
import { AiOutlineClose } from "react-icons/ai";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import axiosIntance from "../../../axios";
import Loader from "../loader/Loader";
import Toaster from "../toaster/Toaster";

const ConfirmationForm = ({ _message, email }) => {
  const { setFormToShow } = useContext(AuthContext);
  const [code, setCode] = useState(["", "", "", ""]);
  const [showLoader, setShowLoader] = useState(false);
  const [toasterMessage, setToasterMessage] = useState(null);
  const [error, setError] = useState(null);
  const [messageFromVerification, setMessageFromVerification] = useState(null);
  const [showSigninButton, setShowSigninButton] = useState(false);

  const inputsRef = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/, "");
    if (!value) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Move focus to the next input if current is filled
    if (index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalCode = code.join("");

    if (finalCode.length < 4) {
      setError("Please enter the complete 4-digit code.");
      return;
    }

    setError(null);
    setShowLoader(true);

    try {
      const res = await axiosIntance.post("client/auth/Verify.php", {
        otp: finalCode,
        email: email,
      });

      if (res.data.success) {
        setTimeout(() => setShowLoader(false), 2000);
        setMessageFromVerification(res.data.message);
        setToasterMessage(res.data.message);
        setTimeout(() => setToasterMessage(null), 8000);
        setShowSigninButton(true);
      }
    } catch (error) {
      console.log("Error: ", error);
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
              <p>{_message || messageFromVerification}</p>
              {error && <p className="error-message">{error}</p>}

              {showSigninButton && (
                <button onClick={() => setFormToShow("signin")}>Sign In</button>
              )}
            </div>

            <div className="code-container">
              {[0, 1, 2, 3].map((_, index) => (
                <input
                  key={index}
                  ref={(el) => (inputsRef.current[index] = el)}
                  type="text"
                  maxLength="1"
                  className="code-input"
                  value={code[index]}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => {
                    if (e.key === "Backspace" && !code[index] && index > 0) {
                      inputsRef.current[index - 1].focus();
                    }
                  }}
                />
              ))}
            </div>

            <button className="btn-submit" onClick={handleSubmit}>
              VERIFY
            </button>
            {/* <span className="btn-resend">Resend Code</span> */}
          </div>
        </motion.div>

        <AiOutlineClose
          className="close-icon"
          onClick={() => setFormToShow(null)}
        />
      </div>

      {showLoader && <Loader _label="Verifying..." />}
      {toasterMessage && !showLoader && (
        <Toaster
          message={messageFromVerification}
          _click={() => setToasterMessage(null)}
        />
      )}
    </>
  );
};

export default ConfirmationForm;
