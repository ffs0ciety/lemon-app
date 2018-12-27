import React, { Component } from 'react';
import './Locales.css';




class Devs extends Component {

  constructor() {
    super();

    this.state = {
      name: '',
      imgPrincipal: '',
      _id: '',
      info: `<div className="row"> 
      <div className="col-sm-5">
          <h1>Data</h1>
          <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean varius eros vel congue sagittis. Cras eu faucibus dui. In mattis neque aliquam, lacinia urna vitae, consequat nisl. Morbi at sagittis tortor, ac convallis ligula. In hac habitasse platea dictumst. Praesent vel consequat mauris. Aenean at sem augue.
          </p>
      </div>
      <div className="col-sm-7">
          <h1>Data</h1>
          <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean varius eros vel congue sagittis. Cras eu faucibus dui. In mattis neque aliquam, lacinia urna vitae, consequat nisl. Morbi at sagittis tortor, ac convallis ligula. In hac habitasse platea dictumst. Praesent vel consequat mauris. Aenean at sem augue.
          </p>
      </div>
  </div>`,
      locales: [],      
    };
  }
  
  render() {
      return (    
        <div>
          <div className="contenedor">
            <img id="imgPrincipal" src="https://motor.elpais.com/wp-content/uploads/2017/11/ducati-panigale-v4-unveiled-1.jpg" className="img-fluid mask" alt="Responsive image"></img>
            <div className="centrado">
              <h1>Titulo</h1>
            </div>
            {/* Inyectamos todo el info del local, que está guardado en formato html en la base de datos
                TODO ESTO DEBERÁ ESTAR ALMACENADO EN LA BBDD
            */}
            <div className="container">
                <div className="row"> 
                    <div className="col-sm-5">
                        <h1>Data</h1>
                        <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean varius eros vel congue sagittis. Cras eu faucibus dui. In mattis neque aliquam, lacinia urna vitae, consequat nisl. Morbi at sagittis tortor, ac convallis ligula. In hac habitasse platea dictumst. Praesent vel consequat mauris. Aenean at sem augue.
                        </p>
                    </div>
                    <div className="col-sm-7">
                        <h1>Data</h1>
                        <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean varius eros vel congue sagittis. Cras eu faucibus dui. In mattis neque aliquam, lacinia urna vitae, consequat nisl. Morbi at sagittis tortor, ac convallis ligula. In hac habitasse platea dictumst. Praesent vel consequat mauris. Aenean at sem augue.
                        </p>
                    </div>
                </div>
                <hr></hr>


                <h1>Data</h1>
                <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean varius eros vel congue sagittis. Cras eu faucibus dui. In mattis neque aliquam, lacinia urna vitae, consequat nisl. Morbi at sagittis tortor, ac convallis ligula. In hac habitasse platea dictumst. Praesent vel consequat mauris. Aenean at sem augue.
                </p>
                <p>
                Curabitur sed elementum nulla, ut luctus eros. Sed lacinia, metus et interdum interdum, tellus libero pretium felis, eget malesuada sapien diam a quam. Curabitur facilisis, elit eu pharetra sollicitudin, dui nibh dapibus velit, eu tempus nisi magna in mauris. Morbi gravida cursus urna ac rhoncus. Aliquam eu placerat tortor, quis dignissim ante. Duis id purus ut lectus hendrerit suscipit. Integer congue pretium urna et dictum. Nunc in congue nulla. Interdum et malesuada fames ac ante ipsum primis in faucibus. Maecenas quis commodo lorem. Vivamus ultricies ex ut dolor finibus cursus. Nam eu venenatis enim.
                </p>

                <hr></hr>

                <h2>Data</h2>
                <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean varius eros vel congue sagittis. Cras eu faucibus dui. In mattis neque aliquam, lacinia urna vitae, consequat nisl. Morbi at sagittis tortor, ac convallis ligula. In hac habitasse platea dictumst. Praesent vel consequat mauris. Aenean at sem augue.
                </p>
                <p>
                Curabitur sed elementum nulla, ut luctus eros. Sed lacinia, metus et interdum interdum, tellus libero pretium felis, eget malesuada sapien diam a quam. Curabitur facilisis, elit eu pharetra sollicitudin, dui nibh dapibus velit, eu tempus nisi magna in mauris. Morbi gravida cursus urna ac rhoncus. Aliquam eu placerat tortor, quis dignissim ante. Duis id purus ut lectus hendrerit suscipit. Integer congue pretium urna et dictum. Nunc in congue nulla. Interdum et malesuada fames ac ante ipsum primis in faucibus. Maecenas quis commodo lorem. Vivamus ultricies ex ut dolor finibus cursus. Nam eu venenatis enim.
                </p>

                <hr></hr>

                <h2>Data</h2>
                <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean varius eros vel congue sagittis. Cras eu faucibus dui. In mattis neque aliquam, lacinia urna vitae, consequat nisl. Morbi at sagittis tortor, ac convallis ligula. In hac habitasse platea dictumst. Praesent vel consequat mauris. Aenean at sem augue.
                </p>
                <p>
                Curabitur sed elementum nulla, ut luctus eros. Sed lacinia, metus et interdum interdum, tellus libero pretium felis, eget malesuada sapien diam a quam. Curabitur facilisis, elit eu pharetra sollicitudin, dui nibh dapibus velit, eu tempus nisi magna in mauris. Morbi gravida cursus urna ac rhoncus. Aliquam eu placerat tortor, quis dignissim ante. Duis id purus ut lectus hendrerit suscipit. Integer congue pretium urna et dictum. Nunc in congue nulla. Interdum et malesuada fames ac ante ipsum primis in faucibus. Maecenas quis commodo lorem. Vivamus ultricies ex ut dolor finibus cursus. Nam eu venenatis enim.
                </p>



            </div>
          

          </div>
        </div>         
      )
  }
}

export default Devs;
