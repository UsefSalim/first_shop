import
  {
    USER_IFLOGIN_REQUEST,
    USER_IFLOGIN_SUCCESS,
    USER_IFLOGIN_FAIL,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT_REQUEST,
    USER_LOGOUT_FAIL,
    USER_LOGOUT_SUCCESS,
    USER_REGISTER_FAIL,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_REQUEST,
    USER_UPDATE_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS

  } from "../constants/user.constants";

export const userLoginReducer = (state = {  }, action) =>
{
  const { type, payload } = action;
  switch (type)
  {
    case USER_LOGIN_REQUEST:
    case USER_IFLOGIN_REQUEST:
    case USER_LOGOUT_REQUEST:
    case USER_REGISTER_REQUEST:
    case USER_UPDATE_REQUEST:
      return { loading: true };
    
    case USER_LOGIN_SUCCESS:
    case USER_IFLOGIN_SUCCESS:
    case USER_LOGOUT_SUCCESS:
    case USER_REGISTER_SUCCESS :
    case USER_UPDATE_SUCCESS :
      return { loading: false, userInfo: payload };
    
    case USER_LOGIN_FAIL:
    case USER_LOGOUT_FAIL:
    case USER_IFLOGIN_FAIL:
    case USER_REGISTER_FAIL:
    case USER_UPDATE_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};