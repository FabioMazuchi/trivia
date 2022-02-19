import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Feedback extends Component {
  constructor() {
    super();
    this.state = {
      url: '',
      msg: '',
    };
    this.convertEmail = this.convertEmail.bind(this);
  }

  componentDidMount() {
    this.msgFeedback();
    this.convertEmail();
  }

  msgFeedback = () => {
    const { acertos } = this.props;
    if (acertos < 2) {
      this.setState({ msg: 'Could be better...' });
    } else {
      this.setState({ msg: 'Well Done!' });
    }
  };

  convertEmail() {
    const { email } = this.props;
    const hash = md5(email).toString();
    const url = `https://www.gravatar.com/avatar/${hash}`;
    this.setState({ url });
  }

  render() {
    const { nome, pontuacao, acertos } = this.props;
    const { url, msg } = this.state;
    console.log(typeof pontuacao.toString);
    return (
      <header>
        <img data-testid="header-profile-picture" src={ url } alt={ nome } />
        <span data-testid="header-player-name">{nome}</span>
        <span data-testid="header-score">
          {pontuacao}
        </span>
        <h1 data-testid="feedback-total-score">{pontuacao}</h1>
        <h1 data-testid="feedback-total-question">{acertos}</h1>
        <h1 data-testid="feedback-text">{msg}</h1>
        <Link to="/" data-testid="btn-play-again">Play Again</Link>
        <Link className="config" data-testid="btn-ranking" to="/ranking">
          Ranking
        </Link>
      </header>
    );
  }
}

Feedback.propTypes = {
  acertos: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
  nome: PropTypes.number.isRequired,
  pontuacao: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    acertos: state.player.assertions,
    nome: state.player.name,
    email: state.player.gravatarEmail,
    pontuacao: state.player.score,
  };
};

export default connect(mapStateToProps)(Feedback);
