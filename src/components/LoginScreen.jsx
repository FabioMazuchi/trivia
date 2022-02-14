import React, { Component } from 'react';

export default class LoginScreen extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  loginVerifiyer = () => {
    const { email, name } = this.state;
    const includesAt = email.includes('@');
    const includesCom = email.includes('.com');
    const NAME_LENGTH = 3;
    const verifyName = name.length >= NAME_LENGTH;
    const isButtonDisable = !(includesAt && includesCom && verifyName);
    return isButtonDisable;
  }

  render() {
    const {
      name, email,
    } = this.state;
    return (
      <form>
        <input
          type="text"
          name="name"
          value={ name }
          data-testid="input-player-name"
          placeholder="Nome"
          onChange={ this.handleChange }
        />
        <input
          type="email"
          name="email"
          value={ email }
          data-testid="input-gravatar-email"
          placeholder="Email"
          onChange={ this.handleChange }
        />
        <button
          type="button"
          disabled={ this.loginVerifiyer() }
          data-testid="btn-play"
        >
          Play!

        </button>
      </form>
    );
  }
}
