import React from 'react';
import './Listas.css'
import Error from './Error';

class Listas extends React.Component {
  constructor() {
    super();

    this.state = {
      filtro: '',
      filtroMail: '',
      filtroFecha: '',
      lista: []    
    };

    this.handleChange = this.handleChange.bind(this);

  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
    // console.log(this.state);
  }

  componentDidMount() {
    // this.test();
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
        // console.log(data);
        this.setState({
          lista:data
        })     
        
      })
  }

  agregarPuntos(e){
    // console.log(e);
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
  
  test(){
    var strings = ["hello", "1", "bye"];
    var filtered = strings.filter(function (str) {
      return str.includes('e');
    })
    var filtered2 = strings.filter( str => str.includes(''))
    console.log(filtered2);
    console.log(filtered);
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
    var salida = this.state.lista
    .filter(filtroName => 
      filtroName.userName.toLowerCase().includes(this.state.filtro)
     // filtroMail.userMail.toLowerCase().includes(this.state.filtroMail) 
      )
    .filter(filtroMail =>
        filtroMail.userMail.toLowerCase().includes(this.state.filtroMail)
      )
    // console.log(salida);

    return (
      <div id="cuerpo" className="container">
      <div className="row">
        <div className="col">
          <input type="text" name="filtro" placeholder="Filtrar por nombre..." onChange={this.handleChange}></input>
        </div>
        <div className="col">
          <input type="text" name="filtroMail" placeholder="Filtrar por mail..." onChange={this.handleChange}></input>
        </div>
        {/* <div className="col">
          <input type="text" name="filtro" placeholder="Filtrar por fecha..." onChange={this.handleChange}></input>
        </div> */}
      </div>
      
      {/* <p onChange={this.handleChange}>{this.state.filtro}</p> */}
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
        salida.map(persona => {
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