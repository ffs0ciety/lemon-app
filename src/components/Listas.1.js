import React from 'react';
import './Listas.css'
import Error from './Error';
//import {Popover, Button, Modal, OverlayTrigger, Tooltip} from 'react-bootstrap';

class Listas extends React.Component {
  constructor() {
    super();

    this.state = {
      test: '',
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

  getLocal(id) {
    console.log("hello");
    fetch(`/api/locales/${id}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          name: data.name,
          imgPrincipal: data.imgPrincipal,
          _id: data._id
        });
       
      })
  }

  getListaLocal() {
    var selection = document.getElementById("selectBox");
    fetch(`/api/listaLocal/${selection.options[selectBox.selectedIndex].value}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          lista:data
        })
        
      })
  }

  componentDidMount() {
    this.fetchLocales();
    this.comprobarToken();
  }

  fetchLocales() {
    fetch('/api/locales')
      .then(res => res.json())
      .then(data => {
        this.setState({locales: data});
      });
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
              test:data.status
          })
          this.mostrarPrivates();
        })
        .catch(err => console.error(err));
    
}

  

render() {
  if(this.state.test != "Error"){

    return (
      <div id="cuerpo">
        <div className="container">
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
        
      </div>
    
      );

  }

  else return (
    <Error />
  )
  

  }
}

export default Listas;