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
        if(sessionStorage.idSala != ""){
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
    fetch('/api/usuarios/usuario',{
            method: 'POST',
            body: JSON.stringify({mail:sessionStorage.mail}),
            headers: {

                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + sessionStorage.token
                    
                  }
              })
            .then(res => res.json())
            .then(data => {
                //COMPROBAR ESTA MONSERGA DEL ESTAdO EMPTY
            console.log(data);
            if(data.status != "Token error"){

                sessionStorage.setItem('idSala', data[0].idSala);
                sessionStorage.setItem('userId', data[0]._id);
                sessionStorage.setItem('name', data[0].name);
                
                this.mostrarPrivates();
            } 

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
                        <Link to="/login"><li id="sesion"><i className="material-icons">account_circle</i></li></Link>    
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