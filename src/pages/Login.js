import React, { Component } from 'react';

class Login extends Component {
  render() {
    return (
      <div>
        <h1>App de Receitas</h1>
        <label htmlFor="email">
          <input
            data-testid="email-input"
            type="email"
            name="email"
            placeholder="Email"
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
          />
        </label>
        <button
          type="button"
          data-testid="login-submit-btn"
        >
          Enter
        </button>
      </div>
    );
  }
}

export default Login;
