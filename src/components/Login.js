import React from 'react';
import './Listas.css'

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      mail: '',
      name: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.validarCuenta = this.validarCuenta.bind(this);
   // this.handleSubmit = this.handleSubmit.bind(this);
    
  }


  validarCuenta(e){
    e.preventDefault()
    // fetch(`/api/accounts/validate`)
    //   .then(
    //     res => {
    //       res.json();
    //       console.log(res);
    //     })
    //   .then(data => {
    //       console.log(data);
    //     });
    console.log(JSON.stringify(this.state));
    fetch('/api/accounts/validate', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        // RETOCAR
        if(data.status == 'false'){
          console.log('mee');
        }
        else {
          console.log(data[0]);
          sessionStorage.setItem("account",data[0].name);
          //location.reload();
        }
      })
      .catch(err => console.error(err));
  }


  componentDidMount() {
    //this.fetchLocales() 
  }

  validateAccount() {
    fetch('/api/locales')
      .then(res => res.json())
      .then(data => {
        this.setState({locales: data});
      });
  }


  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  // validarCuenta(){
  //   fetch('/api/locales')
  //     .then(res => res.json())
  //     .then(data => {
  //       console.log(data);
  //     });
  // }

  

render() {
  return (
    <div id="cuerpo" className="container">
        <div className="row">
            <div className="col-sm-5">
        
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" name="mail" aria-describedby="emailHelp" placeholder="Enter email"onChange={this.handleChange}></input>
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div>
                    <label >Password</label>
                    <input type="password" className="form-control" name="password" placeholder="Password" onChange={this.handleChange}></input>
                </div>
                <div className="form-group form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1"></input>
                    <label className="form-check-label" >Check me out</label>
                </div>
                <button onClick={this.validarCuenta} className="btn btn-primary">Submit</button>
            </div>
        </div>
    </div>
   
    );
  }
}

export default Login;