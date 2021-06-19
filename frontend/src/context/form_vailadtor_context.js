import React, { useState, useContext } from "react";
import validateEmail from "../utils/validateEmail";

const FormContext = React.createContext();

const registerState = {
  username: "",
  email: "",
  password: "",
  passwordCheck: "",
};
const loginState = {
  email: "kcb011@gmail.com",
  password: "Himansu@1",
};
export const FormProvider = ({ children }) => {
  const [register, setRegister] = useState(registerState);
  const [login, setLogin] = useState(loginState);
  const [errors_register, setRegisterErrors] = useState({});
  const [errors_login, setLoginErrors] = useState({});
  const [isLoginSubmitting, setIsLoginSubmitting] = useState(false);
  const [isRegisterSubmitting, setIsRegisterSubmitting] = useState(false);

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegister({
      ...register,
      [name]: value,
    });
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;

    setLogin({
      ...login,
      [name]: value,
    });
  };

  async function validateRegisterInfo() {
    let errors = {};

    if (!register.username.trim()) {
      errors.username = "Username required";
    }
    if (!register.email) {
      errors.email = "Email required";
    } else {
      if (
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          register.email
        )
      ) {
        var check = await validateEmail(register.email);
        if (check) errors.email = "Email already registered";
      } else {
        errors.email = "Please use a valid Email Address";
      }
    }

    if (!register.password) {
      errors.password = "Password is required";
    } else if (
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/.test(
        register.password
      )
    ) {
      errors.password = "";
    } else {
      errors.password =
        "Your password should contain characters 7 to 15, at least one numeric digit and a special character";
    }

    if (!register.passwordCheck) {
      errors.passwordCheck = "Password is required";
    } else if (register.passwordCheck !== register.password) {
      errors.passwordCheck = "Passwords do not match";
    }

    setRegisterErrors(errors);
  }

  function validateLoginInfo() {
    let errors = {};
    if (!login.email) {
      errors.email = "Email required";
    }
    if (!login.password) {
      errors.password = "Password required";
    }
    setLoginErrors(errors);
  }

  const refresh = () => {
    setRegister(registerState);
    setLogin(loginState);
    setIsLoginSubmitting(false);
    setIsRegisterSubmitting(false);
    setRegisterErrors({});
    setLoginErrors({});
  };

  return (
    <FormContext.Provider
      value={{
        register,
        login,
        errors_register,
        errors_login,
        handleRegisterChange,
        handleLoginChange,
        validateRegisterInfo,
        validateLoginInfo,
        isRegisterSubmitting,
        isLoginSubmitting,
        setIsRegisterSubmitting,
        setIsLoginSubmitting,
        refresh,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
// make sure use
export const useFormContext = () => {
  return useContext(FormContext);
};
