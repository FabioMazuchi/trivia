import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPerguntas, updatePoints } from '../redux/actions';
import Header from './Header';
import Perguntas from './Perguntas';

const NUMBER = 0.5;
const NUMBER_3 = 3;
const NUMBER_1000 = 1000;
const NUMBER_10 = 10;

class Jogo extends Component {
  constructor() {
    super();
    this.state = {
      respostas: [],
      timeLeft: 30,
      timeOver: false,
      indice: 0,
      dificuldade: '',
      pontuacao: 0,
      acertou: false,
      errou: false,
      mostrarBotaoNext: false,
      proximaPergunta: 0,
    };
  }

  async componentDidMount() {
    const { proximaPergunta } = this.state;
    await this.buscarPerguntas();
    this.arrayRespostas(proximaPergunta);
    this.timerFunction();
    this.defineDificuldade();
  }

  componentDidUpdate(_prevProps, prevState) {
    const { updatePontuacao } = this.props;
    const { pontuacao, proximaPergunta } = this.state;
    if (pontuacao !== prevState.pontuacao) {
      return updatePontuacao(pontuacao);
    }
    if (proximaPergunta !== prevState.proximaPergunta) {
      this.arrayRespostas(proximaPergunta);
    }
  }

  setRespTrue = () => {
    const { dificuldade, timeLeft } = this.state;
    let difficultyNumber;
    if (dificuldade === 'easy') {
      difficultyNumber = 1;
    }
    if (dificuldade === 'medium') {
      difficultyNumber = 2;
    } else {
      difficultyNumber = NUMBER_3;
    }
    const calc = NUMBER_10 + timeLeft * difficultyNumber;
    this.setState({
      acertou: true,
      errou: false,
      pontuacao: calc,
      mostrarBotaoNext: true,
    });
  };

  setRespFalse = () => {
    this.setState({ acertou: false, errou: true, mostrarBotaoNext: true });
  };

  buscarPerguntas = async () => {
    const { token, getPerguntas } = this.props;
    localStorage.setItem('token', JSON.stringify(token));
    await getPerguntas(token);
  };

  defineDificuldade = () => {
    const { indice, dificuldade } = this.state;
    const { perguntas } = this.props;
    this.setState({
      dificuldade: perguntas[indice].difficulty,
    });
    console.log(dificuldade);
  };

  arrayTrueFalse = (index) => {
    const { perguntas } = this.props;
    const accPergunts = [];
    const res = [0, 1];
    let list = [0, 1];
    accPergunts.push({ correct_answer: perguntas[index].correct_answer });
    perguntas[index].incorrect_answers.forEach((incorrect, pos) => {
      accPergunts.push({ incorrect_answers: incorrect, pos });
    });
    list = list.sort(() => Math.random() - NUMBER);
    accPergunts.forEach((element, i) => {
      res.splice([list[i]], 1, element);
    });
    this.setState({ respostas: res });
  };

  arrayRespostas = (index) => {
    const { perguntas } = this.props;
    console.log(perguntas.length);
    console.log(perguntas[0].type);
    if (perguntas[index].type !== 'multiple') {
      this.arrayTrueFalse(index);
    } else {
      const accPergunts = [];
      const res = [0, 1, 2, NUMBER_3];
      let list = [0, 1, 2, NUMBER_3];
      accPergunts.push({ correct_answer: perguntas[index].correct_answer });
      perguntas[index].incorrect_answers.forEach((incorrect, pos) => {
        accPergunts.push({ incorrect_answers: incorrect, pos });
      });
      list = list.sort(() => Math.random() - NUMBER);
      accPergunts.forEach((element, i) => {
        res.splice([list[i]], 1, element);
      });
      this.setState({ respostas: res });
    }
  };

  timerFunction = () => {
    // Ives: timer src = https://betterprogramming.pub/building-a-simple-countdown-timer-with-react-4ca32763dda7
    this.myInterval = setInterval(() => {
      const { timeLeft } = this.state;
      if (timeLeft > 0) {
        this.setState((prev) => ({
          timeLeft: prev.timeLeft - 1,
        }));
      }
      if (timeLeft === 0) {
        clearInterval(this.myInterval);
        this.setState({ timeOver: true });
      }
    }, NUMBER_1000);
  };

  correctAnswer = () => {
    const { difficulty, timeLeft } = this.state;
    let difficultyNumber;
    if (difficulty === 'easy') {
      difficultyNumber = 1;
    }
    if (difficulty === 'medium') {
      difficultyNumber = 2;
    } else {
      difficultyNumber = NUMBER_3;
    }
    const calc = NUMBER_10 + timeLeft * difficultyNumber;
    this.setState({ pontuacao: calc });
  };

  adicionaClasseAcerto = () => {
    const { acertou, errou } = this.state;
    if (acertou || errou) return 'acertou';
    console.log('acertou');
  };

  adicionaClasseErro = () => {
    const { acertou, errou } = this.state;
    if (acertou || errou) return 'errou';
  };

  nextQuestion = () => {
    const { proximaPergunta } = this.state;
    this.setState({
      proximaPergunta: proximaPergunta + 1,
      errou: false,
      acertou: false,
      mostrarBotaoNext: false,
    });
  };

  render() {
    const { perguntas } = this.props;
    const { respostas, timeLeft, timeOver } = this.state;
    const { mostrarBotaoNext, proximaPergunta } = this.state;
    if (!perguntas) return <h1>Loading...</h1>;
    return (
      <section>
        <Header />
        <section>
          Tempo:
          {timeLeft}
        </section>
        <section>
          <h3 data-testid="question-category">
            {perguntas[proximaPergunta].category}
          </h3>
          <p data-testid="question-text">
            {perguntas[proximaPergunta].question}
          </p>
          <Perguntas
            respostas={ respostas }
            timeOver={ timeOver }
            acerto={ this.adicionaClasseAcerto }
            setRespTrue={ this.setRespTrue }
            erro={ this.adicionaClasseErro }
            setRespFalse={ this.setRespFalse }
          />
          {mostrarBotaoNext && (
            <button
              data-testid="btn-next"
              type="button"
              onClick={ this.nextQuestion }
            >
              Next
            </button>
          )}
        </section>
      </section>
    );
  }
}

Jogo.propTypes = {
  token: PropTypes.string.isRequired,
  getPerguntas: PropTypes.func.isRequired,
  perguntas: PropTypes.arrayOf.isRequired,
  updatePontuacao: PropTypes.string.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getPerguntas: (token) => dispatch(fetchPerguntas(token)),
  updatePontuacao: (pontuacao) => dispatch(updatePoints(pontuacao)),
});

const mapStateToProps = (state) => ({
  token: state.token,
  perguntas: state.perguntas.response.results,
});

export default connect(mapStateToProps, mapDispatchToProps)(Jogo);
