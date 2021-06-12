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
  USER_UPDATE_SUCCESS,
  USER_UPDATE_RESET,
  USER_LIST_FAIL, USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LIST_RESET,
  USER_DELETE_FAIL,USER_DELETE_REQUEST,USER_DELETE_SUCCESS
} from "../constants/user.constants";
// import { ORDER_LIST_RESET} from '../constants/order.constants'
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
    localStorage.setItem('userInfo', JSON.stringify(data))
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
    dispatch({ type: USER_UPDATE_RESET})
    // dispatch({ type: ORDER_LIST_RESET})
    dispatch({ type: USER_LIST_RESET})
  } catch (error) {
    dispatch({
      type: USER_LOGOUT_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};
export const userListe = () => async (dispatch) => {
  try {
    dispatch({ type: USER_LIST_REQUEST });
    const { data } = await axios.get("/auth/users");
    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data
        ? error.response.data
        : error.message
    dispatch({
      type:  USER_LIST_FAIL,
      payload: message
    });
  }
};
export const userDelete = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_DELETE_REQUEST });
    const { data } = await axios.delete(`/auth/user/${id}`);
    dispatch({
      type: USER_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data
        ? error.response.data
        : error.message
    dispatch({
      type:  USER_DELETE_FAIL,
      payload: message
    });
  }
};
