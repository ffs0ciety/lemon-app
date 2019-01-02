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


render() {
  if(this.state.test != "Error"){

    return (
      <div id="cuerpo" className="container">
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