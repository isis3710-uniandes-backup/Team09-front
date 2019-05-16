import React, { Component } from 'react';
import '../css/login.css';

class Login extends Component {
  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  componentDidMount() {
    const { renewSession } = this.props.auth;

    if (localStorage.getItem('isLoggedIn') === 'true') {
      renewSession();
    }
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <div>
          <div>
                <h1 align="center" id="mainTitle">LogicDrawing</h1>
                <h2 align="center">Share your Ideas!</h2>
          </div>
          <div className="loginButtons">
                {
                !isAuthenticated() && (
                    <button id="qsLoginBtn" className="login-btn" onClick={this.login.bind(this)} type="button">Log In!</button>
                    )
                }
                {
                isAuthenticated() && (
                    <button id="qsLogoutBtn" className="login-btn" onClick={this.logout.bind(this)} type="button">Log Out</button>
                    )
                }
            </div>
      </div>
    );
  }
}

export default Login;