import { createContext, useEffect, useState } from "react";
import axiosIntance from "../../axios";
import Toaster from "../components/toaster/Toaster";
import Loader from "../components/loader/Loader";
import Signin from "../components/signinSignUp/Signin";
import Signup from "../components/signinSignUp/Signup";
import ConfirmationForm from "../components/signinSignUp/ConfirmationForm";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
  const [showLoader, setshowLoader] = useState(false);
  const [toasterMessage, setToasterMessage] = useState(null);
  const [formToShow, setFormToShow] = useState(null);
  const [messageFromMail, setMessageFromMail] = useState({
    message: null,
    email: null,
  });

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("data" || null))
  );

  const [errorMessage, seterrorMessage] = useState(null);
  const [_navigate, setnavigate] = useState(false);

  //login
  const login = async (signinData) => {
    setshowLoader(true);

    const res = await axiosIntance.post("client/auth/Signin.php", signinData);

    if (res.data.success) {
      setCurrentUser(res.data.data);

      setTimeout(() => {
        setshowLoader(false);
      }, 5000);
      if (res.data.isClient) {
        setnavigate(true);
        // setToasterMessage(res.data.message);
        setTimeout(() => {
          //    setToasterMessage(null);
          //setFormToShow(null);
        }, 5000);
      } else {
        navigate("veterinarian/home");
      }
    } else {
      seterrorMessage(res.data.message);
      setshowLoader(false);
      console.log("error : ", res.data);
    }
  };

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(currentUser));
  }, [currentUser]);

  console.log("messageFromMail : ", messageFromMail);

  return (
    <AuthContext.Provider
      value={{
        login,
        setFormToShow,
        formToShow,
        setMessageFromMail,
        currentUser,
        setCurrentUser,
        errorMessage,
        _navigate,
      }}
    >
      {children}
      {showLoader && <Loader _label="Logging In..." />}
      {toasterMessage !== null && !showLoader && (
        <Toaster
          message={toasterMessage}
          _click={() => setToasterMessage(null)}
        />
      )}

      {formToShow === "signin" && <Signin />}
      {formToShow === "signup" && <Signup />}
      {formToShow === "confirm" && (
        <ConfirmationForm
          _message={messageFromMail.message}
          email={messageFromMail.email}
        />
      )}
    </AuthContext.Provider>
  );
};
