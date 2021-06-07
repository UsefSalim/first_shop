import axios from "axios";
import {
  USER_IFLOGIN_REQUEST,
  USER_IFLOGIN_SUCCESS,
  USER_IFLOGIN_FAIL,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_FAIL,
  USER_LOGOUT_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS
} from "../constants/user.constants";

export const ifLogin = () => async (dispatch) => {
  try {
    dispatch({ type: USER_IFLOGIN_REQUEST });
    const { data } = await axios.get("/ifauth");
    dispatch({
      type: USER_IFLOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem('userInfo', JSON.stringify(data))
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
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};
export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const { data } = await axios.post("/auth/register", userData);
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
export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch({ type: USER_UPDATE_REQUEST });
    const { data } = await axios.post("/auth/update", userData);
    dispatch({
      type: USER_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload: error.response?.data || error.message,
    });
    // console.log(error.response.data);
  }
};
export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGOUT_REQUEST });
    const { data } = await axios.get("/auth/logout");
    dispatch({
      type: USER_LOGOUT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_LOGOUT_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};
