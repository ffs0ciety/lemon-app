import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Locales from './Locales';
import Presentacion from './Presentacion';
import Listas from './Listas';
import Login from './Login';
import Devs from './Devs';
import './AppRouter.css'

const RoutePresentacion = () => <Presentacion />
const RouteLocales = () => <Locales />;
const RouteListas = () => <Listas />;
const RouteDevs = () => <Devs />;
const RouteLogin = () => <Login />;

class AppRouter extends React.Component {

    constructor() {
      super();
      this.state = {
        name: 'Error',
        other: 'aa'
      }
    }

    componentDidMount(){
        //console.log(sessionStorage.getItem('token'));
        // var privateElement = document.getElementsByClassName('private')[0];
        // privateElement.style.display = "inline";
        
        this.comprobarToken();
        this.reStyle();
        window.onscroll = () => this.reStyle();

        
    }

    mostrarPrivates(){
        if(this.state.name != "Error"){
            var privateElement = document.getElementsByClassName('private')[0];
            privateElement.style.display = "inline";    
        }
    }

    myFunction() {
        var x = document.getElementById("myTopnav");
        if (x.className === "topnav") {
          x.className += " responsive";
        } else {
          x.className = "topnav";
        }
    }

    comprobarToken(){        
        var datos = {token:sessionStorage.token};
        var salida = fetch('/api/validate',{
            method: 'POST',
            body: JSON.stringify(datos),
            headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  }
              })
            .then(res => res.json())
            .then(data => {
              this.setState({
                  name:data.status
              })
              this.mostrarPrivates();
            })
            .catch(err => console.error(err));
        
    }

    reStyle(){
        var navBar = document.getElementsByClassName("topnav")[0];
        if(window.scrollY > 0){
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
                        <Link to=""><li><i className="material-icons">account_balance</i></li></Link>
                        <Link to="/locales"><li>Locales</li></Link>
                        <Link to="/listas" className="private"><li >Listas</li></Link>
                        {/* <Link to="/devs"><li>Devs</li></Link> */}
                        <Link to="/login"><li id="sesion"><i className="material-icons">account_circle</i></li>{sessionStorage.account}</Link>    
                        {/* <li href="javascript:void(0);" className="icon" onClick= {() => this.myFunction()}>
                        <i className="material-icons">reorder</i>
                        </li> */}
                    </ul>
                    
                    </div>    
                <Route path="" exact component={RoutePresentacion} />                      
                <Route path="/locales" exact component={RouteLocales} />
                <Route path="/listas" exact component={RouteListas} />
                <Route path="/devs" exact component={RouteDevs} />
                <Route path="/login" exact component={RouteLogin} />
            </div>
        
        </Router>
                )
            }
}  


export default AppRouter;