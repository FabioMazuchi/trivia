import React, { Component } from "react";
import md5 from "crypto-js/md5";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const NUMBER_3 = 3;

class Feedback extends Component {
  constructor() {
    super();
    this.state = {
      url: "",
      msg: "",
    };
    this.convertEmail = this.convertEmail.bind(this);
  }

  componentDidMount() {
    this.msgFeedback();
    this.saveStorage();
  }

  msgFeedback = () => {
    const { acertos } = this.props;
    if (acertos < NUMBER_3) {
      this.setState({ msg: "Could be better..." });
    } else {
      this.setState({ msg: "Well Done!" });
    }
  };

  saveStorage = (nome, pontuacao) => {
    const url = this.convertEmail();
    const arrayRanking = [];
    const objRanking = {
      name: nome,
      score: pontuacao,
      picture: url,
    };
    const itens = JSON.parse(localStorage.getItem("ranking"));
    console.log("itens" + itens);
    if (!itens) {
      console.log('diferente');
      arrayRanking.push(objRanking);
      localStorage.setItem("ranking", JSON.stringify(arrayRanking));
    } else {
      console.log('oiiiii');
      console.log("itens" + itens);
    }
   
  };

  convertEmail() {
    const { email } = this.props;
    const hash = md5(email).toString();
    const url = `https://www.gravatar.com/avatar/${hash}`;
    // this.setState({ url });
    return url;
  }

  render() {
    const { nome, pontuacao, acertos } = this.props;
    const { msg } = this.state;
    this.saveStorage(nome, pontuacao);
    return (
      <header className="ranking">
        <h2>Results</h2>
        <div>
          <img
            data-testid="header-profile-picture"
            src={this.convertEmail()}
            alt={nome}
          />
          <span data-testid="header-player-name">{nome}</span>
        </div>
        <h3 data-testid="header-score">Points <b>{pontuacao}</b></h3>
        {/* <h3 data-testid="feedback-total-score">Score {pontuacao}</h3> */}
        <h3 data-testid="feedback-total-question">Hits <b>{acertos}</b></h3>
        <h2 data-testid="feedback-text">{msg}</h2>
        <div className="links">
          <Link to="/" data-testid="btn-play-again">
            Play Again
          </Link>
          {/* <Link className="config" data-testid="btn-ranking" to="/ranking">
            Ranking
          </Link> */}
        </div>
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

const mapStateToProps = (state) => ({
  acertos: state.player.assertions,
  nome: state.player.name,
  email: state.player.gravatarEmail,
  pontuacao: state.player.score,
});

export default connect(mapStateToProps)(Feedback);
