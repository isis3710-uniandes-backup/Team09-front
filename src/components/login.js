import React from 'react';
import '../css/login.css'
const axios = require('axios');

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {id: '', username: '', password: '', email: ''};

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleForgotPassword=this.handleForgotPassword.bind(this);
    this.handleRegister =this.handleRegister.bind(this);
    this.sendForgotEmail=this.sendForgotEmail.bind(this);
    this.submitNewUser =this.submitNewUser.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    console.log('About to axios?')
   var rr;
    axios.get('/api/users/name/'+ this.state.username).then(function(response){
      rr=response.data[0].password;
      console.log(rr);
    }).catch(function(error){
      console.log(error);
    }).then(()=>{
      if(rr=== this.state.password){
        alert("Success!");
      }
      else{
        alert("Nah mon "  + rr+ " vs " + this.state.password);
      }
    });
  }

  handleForgotPassword(event){
    event.preventDefault();
    const loginform = document .getElementById("loginform");
    const registerform=document.getElementById("registerform");
    loginform.style.transition = "opacity 1s";
    loginform.style.opacity = 0;
    loginform.parentElement.removeChild(registerform);
    loginform.parentElement.removeChild(loginform);
    const forgotform=document.getElementById("forgotform");
    forgotform.style.transition="opacity 1s";
    forgotform.style.opacity=1;
  }

  sendForgotEmail(event){
    event.preventDefault();
    //TODO
    alert('Email sent!');
  }

  handleRegister(event){
    event.preventDefault();
    const loginform = document .getElementById("loginform");
    const forgotform=document.getElementById("forgotform");
    loginform.style.transition = "opacity 1s";
    loginform.style.opacity = 0;
    loginform.parentElement.removeChild(forgotform);
    loginform.parentElement.removeChild(loginform);
    const registerform=document.getElementById("registerform");
    registerform.style.transition="opacity 1s";
    registerform.style.opacity=1;
  }

  submitNewUser(event){
    event.preventDefault();
    axios.post('/api/users/create/',{
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    }).then(function(response){
      console.log(response);
    }).catch(function(error){
      console.log(error);
    }).then(()=>{
      alert('User created!');
    });
  }
  
  render() {
    return (
      <div>
        <div id="loginform" class="container">
          <div class="d-flex justify-content-center h-100">
            <div class="card">
              <div class="card-header">
                <h3>Sign In</h3>
              </div>
              <div class="card-body">
                <form onSubmit={this.handleSubmit}>
                  <div class="input-group form-group">
                    <div class="input-group-prepend">
                      <span class="input-group-text"><i class="fas fa-user"></i></span>
                    </div>
                    <input name="username" type="text" value={this.state.username} onChange={this.handleInputChange} class="form-control" placeholder="username"/>
                  </div>
                  <div class="input-group form-group">
                    <div class="input-group-prepend">
                      <span class="input-group-text"><i class="fas fa-key"></i></span>
                    </div>
                    <input name="password" type="password" value={this.state.password} onChange={this.handleInputChange} class="form-control" placeholder="password"/>
                  </div>
                  <div class="form-group">
                    <input type="submit" value="Login" class="btn float-right login_btn"/>
                  </div>
                </form>
              </div>
              <div class="card-footer">
                <div class="d-flex justify-content-center links">
                  Don't have an account?<a href="#" onClick={this.handleRegister}>Sign Up</a>
                </div>
                <div class="d-flex justify-content-center">
                <a href="#" onClick={this.handleForgotPassword}>Forgot your password?</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="forgotform" style={{opacity: 0}} class="container">
        <div class="d-flex justify-content-center h-100">
          <div class="card">
            <div class="card-header">
              <h3>Forgot my login</h3>
            </div>
            <div class="card-body">
              <form onSubmit={this.sendForgotEmail}>
                <div class="input-group form-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text"><i class="fas fa-user"></i></span>
                  </div>
                  <input name="username" type="text" value={this.state.username} onChange={this.handleInputChange} class="form-control" placeholder="username"/>
                </div>
                <div class="form-group">
                  <input type="submit" style={{width: '100%'}} value="Send recovery email" class="btn float-right login_btn"/>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
        <div id="registerform" style={{opacity:0}} class="container">
          <div class="d-flex justify-content-center h-100">
              <div class="card">
                <div class="card-header">
                  <h3>Register</h3>
                </div>
                <div class="card-body">
                  <form onSubmit={this.submitNewUser.bind(this)}>
                    <div class="input-group form-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text"><i class="fas fa-user"></i></span>
                      </div>
                      <input name="username" type="text" value={this.state.username} onChange={this.handleInputChange} class="form-control" placeholder="username"/>
                    </div>
                    <div class="input-group form-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text">@</span>
                      </div>
                      <input name="email" type="text" value={this.state.email} onChange={this.handleInputChange} class="form-control" placeholder="email"/>
                    </div>
                    <div class="input-group form-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text"><i class="fas fa-key"></i></span>
                      </div>
                      <input name="password" type="password" value={this.state.password} onChange={this.handleInputChange} class="form-control" placeholder="password"/>
                    </div>
                    <div class="form-group">
                      <input type="submit" value="Login" class="btn float-right login_btn"/>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}