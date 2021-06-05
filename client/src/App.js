import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import ProductScreen from "./pages/ProductScreen";
import Footer from "./components/Footer";
import Header from "./components/Header";
import CartScreen from "./pages/CartScreen";
const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/product/:id_product" component={ProductScreen} />
        <Route path="/cart/:id_product?" component={CartScreen} />
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
