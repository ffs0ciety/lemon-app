import React from 'react';
import './Listas.css'
import Error from './Error';
import moment from 'moment';
import DatePicker from "react-datepicker";

class Listas extends React.Component {
  constructor() {
    super();

    this.state = {
      filtroName: '',
      filtroMail: '',
      filtroFecha: '',
      lista: []    
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.limpiaFecha = this.limpiaFecha.bind(this);

  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
    // console.log(this.state);
  }

  handleDate(date) {
    this.setState({
      filtroFecha : date
    })
    
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
        // console.log(data);
        this.setState({
          lista:data
        })     
        this.test();
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
      })
  }
  
  test(){
  
    var testFecha = this.state.lista
    
    
    var uniq = this.state.lista[0].fecha;
    var date = moment(uniq).format('DD-MM-YYYY');
    
    console.log(uniq);
    
    console.log(date);

    console.log(this.state.filtroFecha == '');

    // var filt = testFecha.filter( data => data.fecha.includes(uniq));
    // console.log(filt);
    // .filter(filtroMail =>
    //   filtroMail.userMail.toLowerCase().includes(this.state.filtroMail.toLowerCase())
    // )
    // console.log(filtered2);
    // console.log(filtered);
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


  limpiaFecha(){
    this.setState({
      filtroFecha : ''
    })
  }

  

render() {
  if(this.state.test != "Error"){
    var salida
    if(this.state.filtroFecha == ''){
      var salida = this.state.lista
        .filter(filtroName => 
          filtroName.userName.toLowerCase().includes(this.state.filtroName.toLocaleLowerCase())
          )
        .filter(filtroMail =>
            filtroMail.userMail.toLowerCase().includes(this.state.filtroMail.toLowerCase())
        )
    }
    else {salida = this.state.lista
        .filter(filtroName => 
          filtroName.userName.toLowerCase().includes(this.state.filtroName.toLocaleLowerCase())
          )
        .filter(filtroMail =>
            filtroMail.userMail.toLowerCase().includes(this.state.filtroMail.toLowerCase())
          )
        .filter(data =>
          moment(data.fecha).format('DD-MM-YYYY').includes(moment(this.state.filtroFecha).format('DD-MM-YYYY')))
    }

    return (
      <div id="cuerpo" className="container">
      <div className="row">
        <div className="col-3">
          <label>Filtrar nombre</label>
          <input class="form-control" type="text" name="filtroName" onChange={this.handleChange}></input>
        </div>
        <div className="col-2">
          <label>Filtrar email</label>
          <input class="form-control" type="text" name="filtroMail" onChange={this.handleChange}></input>
        </div>
        <div className="col-4">
          {/* <input type="text" name="filtroFecha" placeholder="Filtrar por fecha..." onChange={this.handleChange}></input> */}
            <label>Filtrar por fecha</label>
            <DatePicker placeholder="Filtrar por fecha" class="form-control" name="filtroFecha" selected={this.state.filtroFecha} onSelect={(e) => this.handleDate(e)}/> 
        </div>
        <div className="col-3" onClick={this.limpiaFecha}>
          <label>Limpiar fecha</label>
          <br></br>
          <button type="button" className="btn btn-dark">x</button>
        </div>
      </div>
      <br></br>
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
                 {moment(persona.fecha).format('DD-MM-YYYY')}
                  {/* {persona.fecha}           */}
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