import {BrowserRouter as Router,Route,Switch} from "react-router-dom"
import Home from './pages/Home'
import Footer from './components/Footer'
import Header from "./components/Header"
const App =()=> {
  return (
    <Router>
      <Header/>
      <Switch>
        <Route path="/" component={Home}/>
      </Switch>
      <Footer/>
    </Router>
  );
}

export default App;
