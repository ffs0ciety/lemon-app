import React from 'react';
import './Listas.css'
import Error from './Error';

class Listas extends React.Component {
  constructor() {
    super();

    this.state = {
      lista: []    
    };

    this.handleChange = this.handleChange.bind(this);

  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  componentDidMount() {
    this.getListaLocal();
  }



  getListaLocal() {
    
    fetch(`/api/listaLocal/lista`,{
      method: 'POST',
      body: JSON.stringify({mail:sessionStorage.mail, idSala:sessionStorage.idSala}),
      headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + sessionStorage.token
            }
        
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({
          lista:data
        })     
        
      })
  }

  agregarPuntos(e){
    console.log(e);
    const puntos = 10;
    fetch(`/api/usuarios/puntos`,{
      method: 'PUT',
      body: JSON.stringify({userId:e.userId, puntos: puntos, haEntrado:e.haEntrado}),
      headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + sessionStorage.token
            }
        
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
      })
  }

  validarUsuario(e){
      
      fetch(`/api/listaLocal/validar`,{
        method: 'PUT',
        body: JSON.stringify({_id:e._id}),
        headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.token
              }
          
      })
        .then(res => res.json())
        .then(data => {
          window.location.reload();
          alert(data.status);
        })
  }


render() {
  if(this.state.test != "Error"){

    return (
      <div id="cuerpo" className="container">
      <table className="table">
        <thead>
        <tr>
          <th scope="col">Nombre</th>
          <th scope="col">Mail</th>
          <th scope="col">Edad</th>
          <th scope="col">Fecha</th>
          <th scope="col">Ha entrado</th>
          <th scope="col">Validar</th>
          
        </tr>
        </thead>
        <tbody>
        { 
          this.state.lista.map(persona => {
            var haEntrado = `<i class="material-icons">clear</i>`;
            if(persona.haEntrado == true){
              haEntrado = `<i class="material-icons">done</i>`;
            }
            return (
              <tr key={persona._id}>
                <th scope="row">
                  {persona.userName}          
                </th>
                <th scope="row">
                  {persona.userMail}          
                </th>
                <td>
                  {persona.age}          
                </td>
                <td>
                  {persona.fecha}          
                </td>
                <td id='icono'>
                  <p dangerouslySetInnerHTML={{__html: haEntrado}}></p>
                </td>
                <td><button className="btn" onClick={() => {this.validarUsuario(persona), this.agregarPuntos(persona)}}><i className="material-icons">assignment</i></button></td>
              </tr> 
            )
          })
        } 
        </tbody>
          
      </table>   
      </div>
    
      );

  }

  else return (
    <Error />
  )
  

  }
}

export default Listas;