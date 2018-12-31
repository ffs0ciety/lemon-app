import React, { Component } from 'react';
import './Locales.css'



class Locales extends Component {

  constructor() {
    super();

    this.state = {
      name: '',
      imgPrincipal: '',
      _id: '',
      infoLocal: ``,
      locales: [],      
    };
    
    this.dataSubmit = {
      _id:'',
      nameLocal: '',
      idSala:'',
      fecha: new Date().toJSON().slice(0,10).replace(/-/g,'/'),
      userName: '',
      age: ''
    }



    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addLista = this.addLista.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }


  handleSubmit(e) {
    event.preventDefault();
    const { name, value } = e.target;
    if(name == 'userName' ){
      this.dataSubmit.userName = value;
    }
    else this.dataSubmit.age = value;
    
  }

  addLista() {
    
    fetch('/api/listaLocal',{
      method: 'POST',
      body: JSON.stringify(this.dataSubmit),
      headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
    })
    .then(res => res.json())
        .then(data => {
          console.log(data);
        //  this.setState({title: '', description: ''});
          //this.fetchLocales();
        })
        .catch(err => console.error(err));
  }



  getLocal(id) {
    fetch(`/api/locales/${id}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          name: data.name,
          imgPrincipal: data.imgPrincipal,
          infoLocal: data.infoLocal,
          _id: data._id
        });
        this.dataSubmit.nameLocal = this.state.name;
        this.dataSubmit.idSala = this.state._id;
        
      })
      
      
  }

  componentDidMount() {
    console.log(sessionStorage.account);
    this.fetchLocales() ;
  }

  fetchLocales() {
    fetch('/api/locales')
      .then(res => res.json())
      .then(data => {
        this.setState({locales: data});
      });
  }

  closeNav(){
    document.getElementById("mySidenav").style.width = "0";
    //document.getElementById("main").style.marginLeft= "0";
    document.body.style.backgroundColor = "white";

    if(document.getElementById("image") != null){
      document.getElementById("image").style.opacity = "1";
    }
  }


  openNav(){
    window.sessionStorage.setItem("local","mana");
    console.log(window.sessionStorage);
    
    console.log("open");
    document.getElementById("mySidenav").style.width = "250px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
    if(document.getElementById("image") != null){
      document.getElementById("image").style.opacity = "0.4";
    }
  }

  openModal(){
    document.getElementById('myModal').style.display = "block";
  }
  
  closeModal(){
    document.getElementById('myModal').style.display = "none";
  }

  botonStyle(){
    var boton = document.getElementById("botonLocales");
    if(window.scrollY != 0){
      console.log("Entra scroll 1");
      boton.style.backgroundColor = "rgba(255, 255, 255, 0.4)";
  }
  else {
      console.log("Entra scroll 2");
      boton.style.backgroundColor = "rgba(255, 255, 255, 1)";
  }
  }
  
  

  
  
  render() {
    
    if(this.state._id == ""){
      return (    
        <div id="cuerpo">
         <button id="botonLocales" type="button" className="btn botonLocales" onClick={() => this.openNav()}><i className="material-icons">reorder</i></button>

          <div id="mySidenav" className="lateralNav" >
          <a  className="closebtn" onClick={() => this.closeNav()}>&times;</a>    
          <div className="container">
          <input type="text" placeholder="Filtrar..."></input>     
          </div>  
          
          {
            this.state.locales.map(local => {
              return (
                <p key={local._id} onClick={() => this.getLocal(local._id)}>
                  {local.name}           
                </p>
              )             
            })
          }      
          </div>
          {/* Main por defecto de las página de locales */}
          <div className="container">
                <h2>Bienvenidos a esta monserga de aplicacion</h2>     
                <p>Pincha en la frase de debajo para desplegar la lista de los locales.</p>
                
          </div>
         
      </div>      
      )
    }
    else {
      return (    
        <div>
          <button id="botonLocales" type="button" className="btn botonLocales" onClick={() => this.openNav()}><i className="material-icons">reorder</i></button>
          
          {this.closeNav()}
          <div id="mySidenav" className="lateralNav" >
          <a  className="closebtn" onClick={() => this.closeNav()}>&times;</a>    
          <div className="container">
          <input type="text" placeholder="Filtrar..."></input>     
          </div>  
          { 
            this.state.locales.map(local => {
              return (
                <p key={local._id} onClick={() => this.getLocal(local._id)}>
                  {local.name}           
                </p>
              )
            })
          }      
          </div>
          <div className="contenedor">
            <img id="imgPrincipal" src={this.state.imgPrincipal} className="img-fluid mask" alt="Responsive image"></img>
            <div className="centrado">
              <h1 >{this.state.name}</h1>
              <button id="botonLista" type="button" className="btn botonLocales" onClick={() => this.openModal()}>Lista</button>
            </div>

            
          </div>
          {/* Inyectamos todo el info del local, que está guardado en formato html en la base de datos */}
          <div className="container">
              <div dangerouslySetInnerHTML={{__html: this.state.infoLocal}}></div>
            </div>
          

              

          <div id="myModal" className="modal" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Modal title</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => this.closeModal()}>
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                <form>
                  <label>
                    Name:
                    <input type="text" name="userName" onChange={this.handleSubmit}/>
                  </label>  
                  <label>
                    Age:
                    <input type="number" name="age" onChange={this.handleSubmit}/>
                  </label>       
                </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => this.closeModal()}>Close</button>
                  <button type="button" className="btn btn-primary" onClick={() => {this.addLista(); this.closeModal()}}>Save changes</button>
                </div>
              </div>
            </div>
          </div>
          
   

          
         
        </div>      
      )
    }

    
  }
}

export default Locales;


   