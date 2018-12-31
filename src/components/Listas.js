import React from 'react';
import './Listas.css'
import Error from './Error';
//import {Popover, Button, Modal, OverlayTrigger, Tooltip} from 'react-bootstrap';

class Listas extends React.Component {
  constructor() {
    super();

    this.state = {
      mailLocal: '',
      idSala:'',
      name: '',
      imgPrincipal: '',
      _id: '',
      locales: [],  
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
    this.comprobarToken();
  }


  comprobarToken(){        
    var datos = {token:sessionStorage.token};
    fetch('/api/validate',{
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
              mailLocal:data.status
          })
          this.getIdSala();
        })
        .catch(err => console.error(err));
    
}

getIdSala(){
  console.log(this.state);
  fetch('/api/usuarios/getidsala',{
    method: 'POST',
    body: JSON.stringify({
      "mail":this.state.mailLocal}),
    headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
      })
     .then(res => res.json())
     .then(data => {
       this.setState({
         idSala:data[0].idSala
       })
      this.getListaLocal();
    })
    // .catch(err => console.error(err));
}


getListaLocal() {
  
  fetch(`/api/listaLocal/${this.state.idSala}`)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      this.setState({
        lista:data
      })     
      console.log(data);
    })
}


render() {
  if(this.state.test != "Error"){

    return (
      <div id="cuerpo" className="container">
        {/* <div className="container">
          <form>
            <h3>Busqueda por local:</h3>
            <select id="selectBox" className="form-control form-control-lg">
            { 
              this.state.locales.map(local => {
                return (
                  <option key={local._id} onChange={() => this.getLocal(local._id)}>
                    {local.name}           
                  </option>
                )
              })
            }      
            </select>
          </form>
          <button onClick={() => this.getListaLocal()}>Buscar</button>
          <ul className="list-unstyled">
          { 
              this.state.lista.map(persona => {
                return (
                  <li key={persona._id}>
                    {persona.userName}           
                  </li>
                )
              })
            } 
            </ul>   
            
            
        </div>
         */}

      <table className="table">
        <thead>
        <tr>
          <th scope="col">Nombre</th>
          <th scope="col">Edad</th>
          <th scope="col">Fecha</th>
        </tr>
        </thead>
        <tbody>
        { 
          this.state.lista.map(persona => {
            return (
              <tr key={persona._id}>
                <th scope="row">
                  {persona.userName}          
                </th>
                <td>
                  {persona.age}          
                </td>
                <td>
                  {persona.fecha}          
                </td>
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