import React from 'react';
import './Listas.css'

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      mail: '',
      name: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.validarCuenta = this.validarCuenta.bind(this);
    this.registrarCuenta = this.registrarCuenta.bind(this);
   // this.handleSubmit = this.handleSubmit.bind(this);
    
  }


  componentDidMount() {
    // fetch('/api/locales')
    //   .then(res => res.json())
    //   .then(data => {
    //     console.log()
    //     //this.setState({locales: data});
    //   });
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
      console.log(data);    
      alert(data);  
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


  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  

render() {
  return (
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