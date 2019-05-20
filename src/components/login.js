import React from 'react';
import '../css/login.css';
import User from "./user.js";
import UserProfile from "./UserProfile";
import ReactDOM from "react-dom";
import {IntlProvider, addLocaleData} from 'react-intl';
import esLocaleData from 'react-intl/locale-data/es';
import localeEnMessages from "../locales/en";
import localeEsMessages from "../locales/es";
import {FormattedMessage} from 'react-intl';
const hash = require('hash.js');


addLocaleData(esLocaleData);

function lenguaSelector(){
   if (window.navigator.language.startsWith("es")) {
        return (localeEsMessages);
   }else{
        return localeEnMessages;
   }

}

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
      var notfound="Password or user wrong";
      var success="Success!";
    if (window.navigator.language.startsWith("es")) {
      var notfound="Clave o usuario mal";
      var success="Exito!";
    }
    event.preventDefault();
    console.log('About to axios?')
   var rr = new Array(4);
    var hashedP= hash.sha256().update(this.state.password).digest("hex");
    axios.post('/api/login/'+ this.state.username,{'password':hashedP}).then(function(response){
      rr[0]=response.data.username;
      rr[1]=response.data.userID;
      rr[2]=response.data.email;
      rr[3]=response.data.token;
    }).catch(function(error){
      alert(notfound);
    }).then(()=>{
      if(rr[0]){
         UserProfile.setName(rr[0]);
         UserProfile.setID(rr[1]);
         UserProfile.setEmail(rr[2]);
         localStorage.setItem('token',rr[3]);
        alert(success);
        ReactDOM.render(
        <IntlProvider locale={window.navigator.language} messages= {lenguaSelector()}>
          <User/>
        </IntlProvider>, document.getElementById("root")
        );
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
    var hashed = hash.sha256().update(this.state.password).digest("hex");
    console.log(hashed);
    axios.post('/api/users/create/',{
      username: this.state.username,
      email: this.state.email,
      password: hashed
    }).then(function(response){
      console.log(response);
    }).catch(function(error){
      console.log(error);
    }).then(()=>{
      alert('User created!');
    });
  }
  
  render() {
      var username="username";
      var password="password";
      var login="Login";
      var email="email";
      var sendREmail="Send Recovery email";
    if (window.navigator.language.startsWith("es")) {
        username="usuario";
        password="clave";
        login="iniciar";
        email="correo electronico";
        sendREmail="Enviar correo de recuperación";
   }
    return (
      <main>
        <h1 align="Center">LogicDrawing</h1>
        <h2 align="center"><FormattedMessage id="share"/></h2>
        <div id="loginform" class="loginCards">
          <div class="d-flex justify-content-center h-100">
            <div class="card">
              <div id='signincard' class="card-header">
                <h3><FormattedMessage id="Sign In"/></h3>
              </div>
              <div class="card-body">
                <form onSubmit={this.handleSubmit}>
                  <div class="input-group form-group">
                    <div class="input-group-prepend">
                      <span class="input-group-text"><i class="fas fa-user"></i></span>
                    </div>
                    <input name="username" aria-label={username} type="text" value={this.state.username} onChange={this.handleInputChange} class="form-control" placeholder={username} required/>
                  </div>
                  <div class="input-group form-group">
                    <div class="input-group-prepend">
                      <span class="input-group-text"><i class="fas fa-key"></i></span>
                    </div>
                    <input name="password" aria-label={password} type="password" value={this.state.password} onChange={this.handleInputChange} class="form-control" placeholder={password} required/>
                  </div>
                  <div class="form-group">
                    <input type="submit" value={login} class="btn float-right login_btn"/>
                  </div>
                </form>
              </div>
              <div id='noaccount' class="card-footer">
                <div class="d-flex justify-content-center links">
                  <FormattedMessage id='DontAccont'/><a id='signup' href="#" onClick={this.handleRegister}><FormattedMessage id='Sign Up'/></a>
                </div>
                <div class="d-flex justify-content-center">
                <a id='forgot' href="#" onClick={this.handleForgotPassword}><FormattedMessage id='forgotpassword'/></a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="forgotform" style={{opacity: 0}} class="container">
        <div class="d-flex justify-content-center h-100">
          <div class="card">
            <div id='forgotloginbanner' class="card-header">
              <h3><FormattedMessage id="forgotMyPassword"/></h3>
            </div>
            <div class="card-body">
              <form onSubmit={this.sendForgotEmail}>
                <div class="input-group form-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text"><i class="fas fa-user"></i></span>
                  </div>
                  <input name="username" aria-label='old username' type="text" value={this.state.username} onChange={this.handleInputChange} class="form-control" placeholder={username} required/>
                </div>
                <div class="form-group">
                  <input type="submit" style={{width: '100%'}} value={sendREmail} class="btn float-right login_btn"/>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
        <div id="registerform" style={{opacity:0}} class="container">
          <div class="d-flex justify-content-center h-100">
              <div class="card">
                <div id='registerBanner' class="card-header">
                  <h3><FormattedMessage id="Register"/></h3>
                </div>
                <div class="card-body">
                  <form onSubmit={this.submitNewUser.bind(this)}>
                    <div class="input-group form-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text"><i class="fas fa-user"></i></span>
                      </div>
                      <input name="username" aria-label='new username' type="text" value={this.state.username} onChange={this.handleInputChange} class="form-control" placeholder={username} required/>
                    </div>
                    <div class="input-group form-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text">@</span>
                      </div>
                      <input name="email" aria-label='new name' type="text" value={this.state.email} onChange={this.handleInputChange} class="form-control" placeholder={email} required/>
                    </div>
                    <div class="input-group form-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text"><i class="fas fa-key"></i></span>
                      </div>
                      <input name="password" aria-label='new password' type="password" value={this.state.password} onChange={this.handleInputChange} class="form-control" placeholder={password} required/>
                    </div>
                    <div class="form-group">
                      <input type="submit" value={login} class="btn float-right login_btn"/>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </main>
    );
  }
}