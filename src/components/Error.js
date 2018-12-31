import React, { Component } from 'react';




class Error extends Component {

  constructor() {
    super();

    this.state = {
      name: ''   
    };
  }
  
  render() {
      return (    
        <div id="cuerpo">
            <h1>Error al intentar acceder a esta página</h1>
        </div>         
      )
  }
}

export default Error;
