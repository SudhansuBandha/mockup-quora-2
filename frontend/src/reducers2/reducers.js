import {
  LOGIN_BEGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGIN_NULLIFY,
  REGISTER_BEGIN,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  REGISTER_NULLIFY,
  PROFILE_SUCCESS,
} from "../actions2/userActions";

const reducer = (state, action) => {
  if (action.type === LOGIN_BEGIN) {
    return { ...state, login_begin: true };
  }
  if (action.type === LOGIN_NULLIFY) {
    return { ...state, loggedin_user: {} };
  }
  if (action.type === LOGIN_SUCCESS) {
    return {
      ...state,
      login_begin: false,
      loggedin_user: action.payload,
    };
  }
  if (action.type === LOGIN_ERROR) {
    return {
      ...state,
      login_begin: false,
      login_error: true,
      login_error_msg: action.payload,
    };
  }

  if (action.type === REGISTER_BEGIN) {
    return { ...state, register_begin: true };
  }
  if (action.type === REGISTER_NULLIFY) {
    return { ...state, added_user: {} };
  }
  if (action.type === REGISTER_SUCCESS) {
    return {
      ...state,
      register_begin: false,
      added_user: action.payload,
    };
  }
  if (action.type === REGISTER_ERROR) {
    return {
      ...state,
      register_begin: false,
      register_error: true,
      register_error_msg: action.payload,
    };
  }
  if (action.type === PROFILE_SUCCESS) {
    return {
      ...state,
      profile: action.payload,
    };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default reducer;
