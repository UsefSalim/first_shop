import {BrowserRouter as Router,Route,Switch} from "react-router-dom"
import Home from './pages/Home'
import ProductScreen from './pages/ProductScreen'
import Footer from './components/Footer'
import Header from "./components/Header"
const App =()=> {
  return (
    <Router>
      <Header/>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/product/:id_product" component={ProductScreen}/>
      </Switch>
      <Footer/>
    </Router>
  );
}

export default App;
