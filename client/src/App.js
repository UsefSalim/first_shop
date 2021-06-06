import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import ProductScreen from "./pages/ProductScreen";
import Footer from "./components/Footer";
import Header from "./components/Header";
import CartScreen from "./pages/CartScreen";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useDispatch } from 'react-redux';
import { ifLogin } from './actions/user.actions'
const App = () =>
{
  const dispatch = useDispatch()
  useEffect(() =>
  {
    dispatch(ifLogin())
  },[dispatch])
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route path="/product/:id_product" component={ProductScreen} />
        <Route path="/cart/:id_product?" component={CartScreen} />
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
