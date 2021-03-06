import axios from 'axios'
import
  {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_INFO_ADRESS,
    CART_INFO_METHODE_PAYMENT,
    CART_RESET
  } from '../constants/cart.constant'

export const addToCart = (id, qty) => async (dispatch, getState) =>
{
  const { data } = await axios.get(`/products/${id}`)
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}
export const removeFromCart = (id) => (dispatch, getState) =>
{
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}
export const resetCard = () => (dispatch) =>
{
  dispatch({
    type: CART_RESET,
    payload: [],
  })
  localStorage.removeItem('cartItems');
}
export const saveAdressInfo = (data) => (dispatch) =>
{
  dispatch({
    type: CART_INFO_ADRESS,
    payload: data,
  })

  localStorage.setItem('AdressInfo', JSON.stringify(data))
}
export const saveInfoPayment = (data) => (dispatch) =>
{
  dispatch({
    type: CART_INFO_METHODE_PAYMENT,
    payload: data,
  })
  localStorage.setItem('infoPayment', JSON.stringify(data))
}
