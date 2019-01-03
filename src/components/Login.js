import React from 'react';
import './Listas.css'

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      mail: '',
      name: '',
      password: '',
      idSala: '',
      puntos:''
    };

    this.handleChange = this.handleChange.bind(this);
    this.validarCuenta = this.validarCuenta.bind(this);
    this.registrarCuenta = this.registrarCuenta.bind(this);
   
    
  }


  componentDidMount() {

    this.getDatosPublicos();
    // this.comprobarToken();
  }

  validarCuenta(e){
    e.preventDefault();
    fetch('/api/usuarios/validate',{
    method: 'POST',
    body: JSON.stringify(this.state),
    headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
      })
    .then(res => res.json())
    .then(data => {
      if(data.token == ""){
        alert("Usuario o contraseña incorrectos");
      }
      else 
      {
        sessionStorage.setItem('token', data.token);
        console.log(this.state.mail);
        sessionStorage.setItem('mail', this.state.mail);      
        window.location.reload(); 
        alert("Usuario loggeado con éxito");
      }
    })
    .catch(err => console.error(err));
  }
  registrarCuenta(e){
    e.preventDefault();
    if((this.state.mail !="") && (this.state.name !="") && (this.state.password !="")){
        fetch('/api/usuarios',{
        method: 'POST',
        body: JSON.stringify(this.state),
        headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }
      })
      .then(res => res.json())
      .then(data => {
        console.log(data);    
        alert(data.status);
        if(data.status == "Usuario registrado con exito!"){
          window.location.reload(); 
        }     
      })
      .catch(err => console.error(err));
         
          
    } else alert("Falta algún campo por rellenar");
  }

  getDatosPublicos(){
    console.log(sessionStorage.mail);
    if(sessionStorage.mail != undefined && sessionStorage.token != undefined){
      fetch('/api/usuarios/usuario',{
        method: 'POST',
        body: JSON.stringify({mail:sessionStorage.mail, token:sessionStorage.token}),
        headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.token
              }
          })
        .then(res => res.json())
        .then(data => {
          console.log(data[0].puntos.toString());
          this.setState({
            mail:  data[0].mail,
            name: data[0].name,
            idSala: data[0].idSala,
            puntos: data[0].puntos.toString()
          })
          console.log(this.state);
        })
        .catch(err => console.error(err));
    }
   
  }


  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }




  cerrarSesion(){
    sessionStorage.clear();
    window.location.reload(); 
  }
    

render() {
  if(sessionStorage.token != undefined){
    return (
      <div id="cuerpo">
        <div className="container">
            <h2>Usuario <b>{sessionStorage.name}</b> loggeado</h2>
            <p>Mail: <b>{this.state.mail}</b></p>
            <p>Puntos: <b>{this.state.puntos}</b></p>
            <button className="btn btn-outline-primary" onClick={this.cerrarSesion}>Cerrar sesion</button>
        </div>
      </div>
    )
  }

  else return (
    <div id="cuerpo" className="container">
        <div className="row">
            <div className="col-sm-5">
        
                <div>
                    <label>Nombre</label>
                    <input type="text" className="form-control" name="name" aria-describedby="emailHelp" placeholder="Enter name"onChange={this.handleChange}></input>
                </div>
                <small id="emailHelp" className="form-text text-muted">El nombre solo es necesario en caso de registro</small>
                <hr></hr>
                <div>
                    <label>Email</label>
                    <input type="email" className="form-control" name="mail" aria-describedby="emailHelp" placeholder="Enter email"onChange={this.handleChange}></input> 
                </div>
                <div>
                    <label >Password</label>
                    <input type="password" className="form-control" name="password" placeholder="Password" onChange={this.handleChange}></input>
                </div>
                <div className="form-group form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1"></input>
                    <label className="form-check-label" >Check me out</label>
                </div>
                
                  <button onClick={this.validarCuenta} className="btn btn-outline-primary" style={{marginRight:30}}>Iniciar sesion</button>
                  <button onClick={this.registrarCuenta} className="btn btn-outline-secondary">Registrarse</button>
                
               
            </div>
        </div>
    </div>
   
    );
  }
}

export default Login;