import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPerguntas } from '../redux/actions';
import Header from './Header';

class Jogo extends Component {
  componentDidMount() {
    this.buscarPerguntas();
  }

  buscarPerguntas() {
    const { token, getPerguntas } = this.props;
    console.log('didMount');
    localStorage.setItem('token', JSON.stringify(token));
    getPerguntas(token);
  }

  render() {
    const { perguntas } = this.props;
    return (
      <section>
        <Header />
        {perguntas === undefined ? (
          'Loading'
        ) : (
          <>
            {perguntas.map((pergunta, i) => (
              <section key={ i }>
                <h3 data-testid="question-category">{pergunta.category}</h3>
                <p data-testid="question-text">{pergunta.question}</p>
                <ul data-testid="answer-options">
                  <button type="button" data-testid="correct-answer">
                    {pergunta.correct_answer}
                  </button>
                  {pergunta.incorrect_answers.map((incorreta, index) => (
                    <button
                      type="button"
                      key={ index }
                      data-testid={ `wrong-answer-${index}` }
                    >
                      {incorreta}
                    </button>
                  ))}
                </ul>
              </section>
            ))}
          </>
        )}
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
  code: state.perguntas.response.response_code,
});

export default connect(mapStateToProps, mapDispatchToProps)(Jogo);
