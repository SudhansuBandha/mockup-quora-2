import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import styled from "styled-components";
import { useFormContext } from "../context/form_vailadtor_context";
import { useUserContext } from "../context/user_account_context";

function Signin() {
  const {
    register,
    login,
    handleRegisterChange,
    handleLoginChange,
    validateRegisterInfo,
    validateLoginInfo,
    errors_register,
    errors_login,
    isRegisterSubmitting,
    isLoginSubmitting,
    setIsRegisterSubmitting,
    setIsLoginSubmitting,
    refresh,
  } = useFormContext();

  const { userState, handleLogin, handleRegister, logout } = useUserContext();

  const history = useHistory();
  const [check, setCheck] = useState(false);
  const submitRegisterHandeler = (e) => {
    e.preventDefault();
    validateRegisterInfo();
    setIsRegisterSubmitting(true);
  };
  const submitLoginHandeler = (e) => {
    e.preventDefault();
    validateLoginInfo();
    setIsLoginSubmitting(true);
  };

  /*Refresh the state*/
  useEffect(() => {
    refresh();
    if (sessionStorage.getItem("token") !== null) {
      history.push("/quora");
    }
  }, []);

  /*Post request for Sign Up*/
  useEffect(() => {
    if (Object.keys(errors_register).length === 0 && isRegisterSubmitting) {
      const email = register.email;
      const password = register.password;
      const username = register.username;

      handleRegister({ email, password, username });
    }
  }, [errors_register, isRegisterSubmitting]);

  /*Post Request for login*/
  useEffect(() => {
    if (Object.keys(errors_login).length === 0 && isLoginSubmitting) {
      const email = login.email;
      const password = login.password;
      handleLogin({ email, password });
    }
  }, [errors_login, isLoginSubmitting]);

  /*After Successful Signup*/
  useEffect(() => {
    if (Object.keys(userState.added_user).length > 0) {
      let email = register.email;
      let password = register.password;
      handleLogin({ email, password });

      history.push("/user/account_created");
    }
  }, [userState.added_user]);

  /*After Successful Login*/
  useEffect(() => {
    if (
      Object.keys(userState.loggedin_user).length > 0 &&
      sessionStorage.getItem("token") !== null
    ) {
      console.log("here");
      history.push("/quora");
    }
  }, [userState.loggedin_user]);
  return (
    <Container>
      {" "}
      <div className="signin">
        <h1>MockUp Quora</h1>

        <div className="signin-container">
          <div className="Left">
            <h4>Sign Up</h4>
            <form onSubmit={submitRegisterHandeler}>
              <div className="input-box">
                <input
                  placeholder="Username"
                  className="input-signin"
                  name="username"
                  type="text"
                  id="uname"
                  onChange={(e) => handleRegisterChange(e)}
                />
              </div>
              {errors_register.username && (
                <div className="form-error-message">
                  {errors_register.username}
                </div>
              )}

              <div className="input-box">
                <input
                  placeholder="Email"
                  className="input-signin"
                  name="email"
                  type="email"
                  id="registeremail"
                  onChange={(e) => handleRegisterChange(e)}
                />
              </div>
              {errors_register.email && (
                <div className="form-error-message">
                  {errors_register.email}
                </div>
              )}
              <div className="input-box">
                <input
                  placeholder="Password"
                  className="input-signin"
                  name="password"
                  type="password"
                  id="registerpassword"
                  onChange={(e) => handleRegisterChange(e)}
                />
              </div>
              {errors_register.password && (
                <div className="form-error-message">
                  {errors_register.password}
                </div>
              )}
              <div className="input-box">
                <input
                  placeholder="Re-Enter Password"
                  className="input-signin"
                  name="passwordCheck"
                  type="password"
                  id="repassword"
                  onChange={(e) => handleRegisterChange(e)}
                />
                {errors_register.passwordCheck && (
                  <div className="form-error-message">
                    {errors_register.passwordCheck}
                  </div>
                )}
              </div>
              <Button type="submit" className="signup-button">
                Submit
              </Button>
            </form>
          </div>

          <div className="Right">
            <h4>Login</h4>
            {userState.login_error_msg && (
              <div className="form-error-message">
                Please try to login with a valid Email ID or Password
              </div>
            )}
            <form onSubmit={submitLoginHandeler}>
              <input
                placeholder="Email"
                className="input-signin"
                name="email"
                value={login.email}
                type="email"
                id="loginemail"
                onChange={(e) => handleLoginChange(e)}
              />
              {errors_login.email && (
                <div className="form-error-message">{errors_login.email}</div>
              )}
              <input
                placeholder="Password"
                className="input-signin"
                name="password"
                value={login.password}
                type="password"
                id="loginpassword"
                onChange={(e) => handleLoginChange(e)}
              />
              {errors_login.password && (
                <div className="form-error-message">
                  {errors_login.password}
                </div>
              )}
              <Link to="">Forgot Password?</Link>
              <div className="login-button">
                <Button type="submit" variant="success">
                  Login
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  .signin {
    height: 500px;
    width: 700px;
    background-color: #ffffff;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding-top: 40px;
    @media screen and (max-width: 780px) {
      height: 450px;
      width: 600px;
    }
    @media screen and (max-width: 600px) {
      height: 425px;
      width: 400px;
      padding-top: 20px;
    }
  }
  h1 {
    text-align: center;
    color: #ad0312;
    margin-bottom: 30px;
    @media screen and (max-width: 600px) {
      margin-bottom: 5px;
    }
  }
  .Left {
    position: absolute;
    right: 50%;
    height: 340px;
    width: 300px;
    padding-right: 5%;
    @media screen and (max-width: 780px) {
      height: 240px;
      width: 250px;
    }
    @media screen and (max-width: 600px) {
      height: 100px;
      width: 170px;
    }
  }

  .Right {
    position: absolute;
    left: 50%;
    height: 250px;
    width: 300px;
    padding-left: 5%;
    @media screen and (max-width: 780px) {
      height: 100px;
      width: 250px;
    }
    @media screen and (max-width: 600px) {
      height: 140px;
      width: 170px;
    }
  }

  .input-signin {
    width: 100%;
    margin: 10px 0px 10px 0px;
    background-color: #e8e7e3;
    border: 1px solid #ccc;
    border-radius: 5px;
    -webkit-transition: 0.5s;
    transition: 0.5s;
    outline: none;
  }
  .input-signin:focus {
    border: 2px solid #ad0312;
    background-color: #ffffff;
    box-shadow: 0.5px 0.5px 0.5px 0.5px inset rgba(0, 0, 0, 0.2);
    padding: 3px;
    outline: none;
  }
  .form-error-message {
    font-size: 14px;
    color: #ad0312;
  }
  .login-button {
    margin-top: 5%;
  }
  .signup-button {
    margin-top: 5%;
  }
  .error {
    font-size: 16px;
    color: #ad0150;
  }
  .error-message {
    padding-left: 8%;
  }
`;
export default Signin;
