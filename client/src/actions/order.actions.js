import axios from 'axios'
const {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
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