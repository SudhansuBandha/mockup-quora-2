import axios from "axios";
import React, { useState, useContext, useReducer } from "react";

import {
  LOGIN_BEGIN,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGIN_NULLIFY,
  REGISTER_BEGIN,
  REGISTER_ERROR,
  REGISTER_SUCCESS,
  REGISTER_NULLIFY,
  PROFILE_SUCCESS,
} from "../actions2/userActions";
import reducer from "../reducers2/reducers";
import jwt_decode from "jwt-decode";

const Context = React.createContext();

const initialState = {
  login_begin: false,
  login_error: false,
  loggedin_user: {},
  login_error_msg: "",
  register_begin: false,
  register_error: false,
  added_user: {},
  register_error_msg: "",
  profile: {},
};

const Provider = ({ children }) => {
  const [userState, dispatch] = useReducer(reducer, initialState);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const handleLogin = async ({ email, password }) => {
    dispatch({ type: LOGIN_BEGIN });

    try {
      const { data } = await axios.post(
        "https://mockup-quora-backend.herokuapp.com/api/auth/login",
        {
          email,
          password,
        }
      );

      sessionStorage.setItem("token", data.token);

      dispatch({ type: LOGIN_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: LOGIN_ERROR, payload: error });
    }
  };

  const handleRegister = async ({ email, password, username }) => {
    dispatch({ type: REGISTER_BEGIN });
    try {
      const { data } = await axios.post(
        "https://mockup-quora-backend.herokuapp.com/api/auth/register",
        {
          email,
          password,
          username,
        }
      );

      dispatch({ type: REGISTER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: REGISTER_ERROR, payload: error });
    }
  };
  const added_user_nullify = () => {
    dispatch({ type: REGISTER_NULLIFY });
  };
  const decode = () => {
    if (sessionStorage.getItem("token") !== null)
      return jwt_decode(sessionStorage.getItem("token"));
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    dispatch({ type: LOGIN_NULLIFY });
    dispatch({ type: REGISTER_NULLIFY });
  };

  const loadProfile = async () => {
    const info = decode();
    const { data } = await axios.get(
      "https://mockup-quora-backend.herokuapp.com/api/profile/" + info.id
    );
    dispatch({ type: PROFILE_SUCCESS, payload: data });
    setLoadingProfile(false);
  };
  return (
    <Context.Provider
      value={{
        userState,
        handleLogin,
        handleRegister,
        decode,
        logout,
        added_user_nullify,
        loadProfile,
        loadingProfile,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useUserContext = () => {
  return useContext(Context);
};

export { Context, Provider };
