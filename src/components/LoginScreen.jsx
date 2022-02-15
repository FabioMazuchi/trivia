import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../trivia.png';
import { fetchToken, getEmailNome } from '../redux/actions';

class LoginScreen extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
    };
    this.logar = this.logar.bind(this);
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
  };

  async logar() {
    const { getToken, history, getEmailName } = this.props;
    await getToken();
    getEmailName(this.state);
    history.push('/jogo');
  }

  render() {
    const { name, email } = this.state;
    return (
      <>
        <img src={ logo } className="App-logo" alt="logo" />
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
            onClick={ this.logar }
          >
            Play!
          </button>
        </form>
        <Link className="config" data-testid="btn-settings" to="/config">
          Configuração
        </Link>
      </>
    );
  }
}

LoginScreen.propTypes = {
  getToken: PropTypes.func.isRequired,
  history: PropTypes.objectOf.isRequired,
  getEmailName: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getToken: () => dispatch(fetchToken()),
  getEmailName: (state) => dispatch(getEmailNome(state)),
});

const mapStateToProps = (state) => ({
  token: state.token.token,
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
