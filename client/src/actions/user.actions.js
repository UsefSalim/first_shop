import axios from "axios";
import {
  USER_IFLOGIN_REQUEST,
  USER_IFLOGIN_SUCCESS,
  USER_IFLOGIN_FAIL,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
} from "../constants/user.constants";

export const ifLogin = () => async (dispatch) => {
  try {
    dispatch({ type: USER_IFLOGIN_REQUEST });
    const { data } = await axios.get("/ifauth");
    dispatch({
      type: USER_IFLOGIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_IFLOGIN_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};
export const login = (userData) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const { data } = await axios.post("/auth/login", userData);
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};
