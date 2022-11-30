import React, { Component } from 'react';

class Login extends Component {
  state = {
    email: '',
    password: '',
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  render() {
    const { email, password } = this.state;
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/i;
    const magicNumber = 7;
    console.log(email);
    return (
      <div>
        <h1>App de Receitas</h1>
        <form>
          <label htmlFor="email">
            <input
              data-testid="email-input"
              type="email"
              name="email"
              placeholder="Email"
              value={ email }
              onChange={ this.handleChange }
              // value={ email }
              // onChange={ this.handleInput }
            />
          </label>
          <label htmlFor="password">
            <input
              data-testid="password-input"
              type="password"
              name="password"
              placeholder="Password"
              value={ password }
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            data-testid="login-submit-btn"
            disabled={ !emailRegex.test(email) || magicNumber > password.length }
          >
            Enter
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
