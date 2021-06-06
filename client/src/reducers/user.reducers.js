import
  {
    USER_IFLOGIN_REQUEST,
    USER_IFLOGIN_SUCCESS,
    USER_IFLOGIN_FAIL,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT
  } from "../constants/user.constants";

export const userLoginReducer = (state = {  }, action) =>
{
  const { type, payload } = action;
  switch (type)
  {
    case USER_LOGIN_REQUEST:
      return { ...state, loading: true };
    case USER_LOGIN_SUCCESS:
      return { ...state, loading: false, userInfo: payload };
    case USER_LOGIN_FAIL:
      return { ...state, loading: false, error: payload };
    case USER_IFLOGIN_REQUEST:
      return { ...state, loading: true };
    case USER_IFLOGIN_SUCCESS:
      return { ...state, loading: false, userInfo: payload };
    case USER_IFLOGIN_FAIL:
      return { ...state, loading: false, error: payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};