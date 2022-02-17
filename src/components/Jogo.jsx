import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPerguntas } from '../redux/actions';
import Header from './Header';

const NUMBER = 0.5;
const NUMBER_3 = 3;
const NUMBER_1000 = 1000;

class Jogo extends Component {
  constructor() {
    super();
    this.state = {
      respostas: [],
      timeLeft: 30,
      active: false,
    };
    this.arrayRespostas = this.arrayRespostas.bind(this);
  }

  async componentDidMount() {
    await this.buscarPerguntas();
    this.arrayRespostas(0);
    this.timerFunction();
  }

  buscarPerguntas = async () => {
    const { token, getPerguntas } = this.props;
    localStorage.setItem('token', JSON.stringify(token));
    await getPerguntas(token);
  }

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
  }

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
  }

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
        this.setState({ active: true });
      }
    }, NUMBER_1000);
  }

  // resposta = ({ target }) => {

  // }

  render() {
    const { perguntas } = this.props;
    const { respostas, timeLeft, active } = this.state;
    if (!perguntas) return <h1>Loading...</h1>;
    return (
      <section>
        <Header />
        <section>
          Tempo:
          {' '}
          {timeLeft}
        </section>
        <section>
          <h3 data-testid="question-category">{perguntas[0].category}</h3>
          <p data-testid="question-text">{perguntas[0].question}</p>
          <ul data-testid="answer-options">
            {respostas.map((resp, i) => {
              const keys = Object.keys(resp);
              const values = Object.values(resp);
              if (keys[0] === 'correct_answer') {
                return (
                  <button
                    key={ i }
                    type="button"
                    data-testid="correct-answer"
                    disabled={ active }
                  >
                    {values[0]}
                  </button>
                );
              }
              return (
                <button
                  key={ i }
                  type="button"
                  data-testid={ `wrong-answer-${values[1]}` }
                  disabled={ active }
                >
                  {values[0]}
                </button>
              );
            })}
          </ul>
        </section>
      </section>
    );
  }
}

Jogo.propTypes = {
  token: PropTypes.string.isRequired,
  getPerguntas: PropTypes.func.isRequired,
  perguntas: PropTypes.arrayOf.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getPerguntas: (token) => dispatch(fetchPerguntas(token)),
});

const mapStateToProps = (state) => ({
  token: state.token,
  perguntas: state.perguntas.response.results,
});

export default connect(mapStateToProps, mapDispatchToProps)(Jogo);
