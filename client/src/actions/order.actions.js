import axios from 'axios'
const {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_RESET,
  ORDER_PAY_SUCCESS
} = require("../constants/order.constants");


export const createOrder = (order) => async (dispatch) =>
{
  try
  {
    dispatch({ type: ORDER_CREATE_REQUEST });
    const { data } = await axios.post("/order/add",order);
    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error)
  {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};
export const getOrderDetails = (id) => async (dispatch) =>
{
  try
  {
    dispatch({ type: ORDER_DETAILS_REQUEST });
    const { data } = await axios.get(`/order/${id}`);
    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error)
  {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};
export const payOrder = (orderId,paymentResult) => async (dispatch) =>
{
  try
  {
    dispatch({ type: ORDER_PAY_REQUEST });
    const { data } = await axios.put(`/order/${orderId}/pay`,paymentResult);
    dispatch({
      type: ORDER_PAY_SUCCESS,
      payload: data,
    });
  } catch (error)
  {
    dispatch({
      type: ORDER_PAY_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};