import React, { Component } from "react";
import md5 from 'crypto-js/md5';
import { connect } from "react-redux";

class Feedback extends Component {
  constructor() {
    super();
    this.state = {
      url: "",
    };
    this.convertEmail = this.convertEmail.bind(this);
  }

  componentDidMount() {
    this.msgFeedback();
    this.convertEmail();
  }

  msgFeedback = () => {
    const { acertos } = this.props;
    if (acertos < 3) return "Could be better...";
    return "Well Done!";
  };

  convertEmail() {
    const { email } = this.props;
    const hash = md5(email).toString();
    const url = `https://www.gravatar.com/avatar/${hash}`;
    this.setState({ url });
  }

  render() {
    const { nome, pontuacao } = this.props;
    const { url } = this.state;
    console.log(typeof pontuacao.toString);
    return (
      <header>
        <img data-testid="header-profile-picture" src={url} alt={nome} />
        <span data-testid="header-player-name">{nome}</span>
        <span data-testid="header-score">
          {pontuacao}
        </span>
        <h1 data-testid="feedback-text">{this.msgFeedback()}</h1>
      </header>
    );
  }
}

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
