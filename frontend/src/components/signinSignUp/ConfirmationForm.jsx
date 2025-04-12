import "./ConfirmationForm.scss";
import { motion } from "framer-motion";

//IMAGE
import catdog from "../../assets/imges/signinimaeg.png";
import logo from "../../assets/icons/logo.png";
import { Link } from "react-router-dom";

//ICONS
import { AiOutlineClose } from "react-icons/ai";
import Signup from "./Signup";
import { useState } from "react";

const ConfirmationForm = ({ close }) => {
  const [showSignupForm, setshowSignupForm] = useState(false);
  const [code, setcode] = useState(null);

  const getValue = () => {
    const inputs = document.querySelectorAll(".code-input");
    let code = "";

    inputs.forEach((input) => {
      code += input.value;
    });

    console.log("first", code);
    setcode(code);
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
              </div>
            </div>

            <div className="bot">
              <img src={catdog} alt="cat_and_dog" className="image-bg" />
            </div>
          </div>
          <div className="right">
            <div className="code-container">
              <input type="text" maxlength="1" className="code-input" />
              <input type="text" maxlength="1" className="code-input" />
              <input type="text" maxlength="1" className="code-input" />
              <input type="text" maxlength="1" className="code-input" />
            </div>

            <button className="btn-submit" onClick={getValue}>
              GET CODE
            </button>
            <span className="btn-resend">Resend Code</span>
          </div>
        </motion.div>

        <AiOutlineClose className="close-icon" onClick={close} />
      </div>

      {showSignupForm && <Signup close={() => setshowSignupForm(false)} />}
    </>
  );
};

export default ConfirmationForm;
