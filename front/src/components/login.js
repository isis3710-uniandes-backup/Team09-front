import React from 'react';
import '../css/login.css'

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {username: '', password: ''};

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    alert('A name was submitted: ' + this.state.username);
    event.preventDefault();
  }
  
  render() {
    return (
      <div class="container">
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
					      <div class="row align-items-center remember">
						      <input type="checkbox"/>Remember Me
					      </div>
					      <div class="form-group">
						      <input type="submit" value="Login" class="btn float-right login_btn"/>
					      </div>
				      </form>
			      </div>
			      <div class="card-footer">
				      <div class="d-flex justify-content-center links">
					      Don't have an account?<a href="#">Sign Up</a>
				      </div>
				      <div class="d-flex justify-content-center">
					      <a href="#">Forgot your password?</a>
				      </div>
			      </div>
          </div>
        </div>
      </div>
    );
  }
}