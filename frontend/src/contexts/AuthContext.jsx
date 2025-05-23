import { createContext, useEffect, useState } from "react";
import Signin from "../components/signinSignUp/Signin";
import Signup from "../components/signinSignUp/Signup";
import ConfirmationForm from "../components/signinSignUp/ConfirmationForm";
import ForgotPassword from "../components/signinSignUp/ForgotPassword";
export const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
  const [formToShow, setFormToShow] = useState(null);
  const [messageFromMail, setMessageFromMail] = useState({
    message: null,
    email: null,
  });

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("data" || null))
  );

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(currentUser));
  }, [currentUser]);

  console.log("FORM ", formToShow);
  return (
    <AuthContext.Provider
      value={{
        setFormToShow,
        formToShow,
        setMessageFromMail,
        currentUser,
        setCurrentUser,
      }}
    >
      {children}

      {formToShow === "signin" && <Signin />}
      {formToShow === "signup" && <Signup />}
      {formToShow === "forgot" && <ForgotPassword />}
      {formToShow === "confirm" && (
        <ConfirmationForm
          _message={messageFromMail.message}
          email={messageFromMail.email}
        />
      )}
    </AuthContext.Provider>
  );
};
