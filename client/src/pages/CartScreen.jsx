import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link ,useHistory , useLocation,useParams} from 'react-router-dom'
import Message from "../components/Message"
import {addToCart} from '../actions/cart.actions'
const CartScreen = () =>
{
  const { id_product } = useParams();
  const location = useLocation()
  const dispatch = useDispatch()
  const qty = +location.search?.split('=')[1] || 1
  React.useEffect(() =>
  {
    id_product &&
      dispatch(addToCart(id_product,qty))
  },[dispatch,id_product])
  console.log(qty)
  return (
    <div>
      Card
    </div>
  )
}

export default CartScreen
