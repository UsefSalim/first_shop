import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";

import Routes from "./router/Routes"

const App = () =>
{
 
  return (
    <Router>
      <Header />
       <Routes/>
      <Footer />
    </Router>
  );
};

export default App;
