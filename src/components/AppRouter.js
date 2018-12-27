import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Locales from './Locales';
import Test from './Test';
import Login from './Login';
import Devs from './Devs';
import './AppRouter.css'

const Index = () => <Locales />;
const About = () => <Test />;
const DevsRoute = () => <Devs />;
const LogInSigIn = () => <Login />;

class AppRouter extends React.Component {

    constructor() {
      super();
      this.state = {

      }
    }

    componentDidMount(){
        this.reStyle();
        window.onscroll = () => this.reStyle();
    }

    myFunction() {
        var x = document.getElementById("myTopnav");
        if (x.className === "topnav") {
          x.className += " responsive";
        } else {
          x.className = "topnav";
        }
    }

    reStyle(){
        var navBar = document.getElementsByClassName("topnav")[0];
        if(window.scrollY != 0){
            navBar.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
        }
        else {
            navBar.style.backgroundColor = "rgba(255, 255, 255, 1)";
        }
    }

    render(){
        return(
            <Router>
                <div onScroll={() => this.reStyle()}>
                    <div className="topnav" id="myTopnav">
                    <ul>
                        <Link to="/locales"><li>Locales</li></Link>
                        <Link to="/listas"><li>Listas</li></Link>
                        <Link to="/devs"><li>Devs</li></Link>
                        <Link to="/login"><li id="sesion"><i className="material-icons">account_circle</i></li>{sessionStorage.account}</Link>    
                        {/* <li href="javascript:void(0);" className="icon" onClick= {() => this.myFunction()}>
                        <i className="material-icons">reorder</i>
                        </li> */}
                    </ul>
                    
                    </div>                     
                <Route path="/locales" exact component={Index} />
                <Route path="/listas" exact component={Test} />
                <Route path="/devs" exact component={DevsRoute} />
                <Route path="/login" exact component={Login} />
            </div>
        
        </Router>
                )
            }

      
}  




export default AppRouter;