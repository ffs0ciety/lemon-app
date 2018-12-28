import React, { Component } from 'react';
import './Presentacion.css'
import smr from '../assets/smr.jpg';
import pit from '../assets/pit.jpg';

class Presentacion extends Component {

  constructor() {
    super();
  }
  
  render() {
      return (    
        <div>
             <div className="contenedor">
            <img src={smr} className="img-fluid imgInicio" alt="Responsive image"></img>
            <hr></hr> 
              <img src={pit} className="img-fluid imgInicio" alt="Responsive image"></img>
           </div>
        </div>         
      )
  }
}

export default Presentacion;
