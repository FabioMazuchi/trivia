import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchToken, getEmailNome, fetchPerguntas, zeraAcertos } from '../redux/actions';

class LoginScreen extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
    };
    this.logar = this.logar.bind(this);
  }

  componentWillUnmount() {
    const { zerarAcertos } = this.props;
    this.buscarPerguntas();
    zerarAcertos();
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

  async buscarPerguntas() {
    const { token, getPerguntas } = this.props;
    localStorage.setItem('token', JSON.stringify(token));
    await getPerguntas(token);
  }

  async logar() {
    const { getToken, history, getEmailName } = this.props;
    await getToken();
    getEmailName(this.state);
    history.push('/jogo');
  }

  render() {
    const { name, email } = this.state;
    return (
      <section className="App-header">
        {/* <img src={ logo } className="App-logo" alt="logo" /> */}
        <h1 className="App-logo">
          Quizz
          <span>?</span>
        </h1>
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
      </section>
    );
  }
}

LoginScreen.propTypes = {
  getToken: PropTypes.func.isRequired,
  history: PropTypes.objectOf.isRequired,
  getEmailName: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  getPerguntas: PropTypes.func.isRequired,
  zerarAcertos: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getToken: () => dispatch(fetchToken()),
  getEmailName: (state) => dispatch(getEmailNome(state)),
  getPerguntas: (token) => dispatch(fetchPerguntas(token)),
  zerarAcertos: () => dispatch(zeraAcertos()),
});

const mapStateToProps = (state) => ({
  token: state.token.token,
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
