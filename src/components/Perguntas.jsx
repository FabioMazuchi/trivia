import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Perguntas extends Component {
  render() {
    const { respostas, timeOver, acerto, setRespTrue, erro, setRespFalse } = this.props;
    return (
      <ul data-testid="answer-options">
        {respostas.map((resp, i) => {
          const keys = Object.keys(resp);
          const values = Object.values(resp);
          if (keys[0] === 'correct_answer') {
            return (
              <button
                className={ acerto() }
                onClick={ setRespTrue }
                key={ i }
                type="button"
                data-testid="correct-answer"
                disabled={ timeOver }
              >
                {values[0]
                  .replace(/&quot/g, '')
                  .replace(/&#039/g, '')
                  .replace(/&eacute;/g)
                  .replace(/;/g, '')}
              </button>
            );
          }
          return (
            <button
              className={ erro() }
              onClick={ setRespFalse }
              key={ i }
              type="button"
              data-testid={ `wrong-answer-${values[1]}` }
              disabled={ timeOver }
            >
              {values[0]
                .replace(/&quot/g, '')
                .replace(/&#039/g, '')
                .replace(/&eacute;/g)
                .replace(/;/g, '')}
            </button>
          );
        })}
      </ul>
    );
  }
}

Perguntas.propTypes = {
  respostas: PropTypes.arrayOf.isRequired,
  timeOver: PropTypes.number.isRequired,
  acerto: PropTypes.func.isRequired,
  erro: PropTypes.func.isRequired,
  setRespFalse: PropTypes.func.isRequired,
  setRespTrue: PropTypes.func.isRequired,
};

export default Perguntas;
