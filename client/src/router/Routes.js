import React, { useEffect } from 'react'
import { Route, Switch } from "react-router-dom";
import Home from "../pages/Home";
import ProductScreen from "../pages/ProductScreen";
import CartScreen from "../pages/CartScreen";
import Login from "../pages/Login";
import Register from "../pages/Register"
import ProfileScreen from '../pages/ProfileScreen';
import ShippingScreen from '../pages/ShippingScreen';
import { useDispatch, useSelector} from 'react-redux';
import { ifLogin } from '../actions/user.actions'
import { AuthRoutes, UserRoutes} from './ProtectedRoutes';
const Routes = () =>
{
  const dispatch = useDispatch()
  const { userInfo } = useSelector(state => state.user)
  useEffect(() =>
  {
    dispatch(ifLogin())
  }, [dispatch])
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <AuthRoutes exact path="/login" component={Login} userInfo={userInfo}/>
      <AuthRoutes exact path="/register" component={Register} userInfo={userInfo}/>
      <UserRoutes exact path="/profile" component={ProfileScreen} userInfo={userInfo}/>
      <UserRoutes exact path="/shipping" component={ShippingScreen} userInfo={userInfo}/>
      <Route path="/product/:id_product" component={ProductScreen} />
      <Route path="/cart/:id_product?" component={CartScreen} />
    </Switch>
  )
}

export default Routes
