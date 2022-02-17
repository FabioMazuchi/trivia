import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchPerguntas } from "../redux/actions";
import Header from "./Header";

class Jogo extends Component {
  constructor() {
    super();
    this.state = {
      respostas: [],
      perguntas: [],
    }
    this.arrayRespostas = this.arrayRespostas.bind(this);
  }

  componentDidMount() {
    console.log('Mount');
    this.buscarPerguntas();
    this.arrayRespostas(0);
  }

  // componentDidUpdate() {
  //   console.log('Update');
  //   this.arrayRespostas(0);
  // }


  async buscarPerguntas() {
    const { token, getPerguntas } = this.props;
    localStorage.setItem("token", JSON.stringify(token));
    await getPerguntas(token);
  }

  arrayRespostas(index) {
    const { perguntas } = this.state;
    // const accPergunts = [];
    // const res = [0, 1, 2, 3];
    // let list = [0, 1, 2, 3];
    // accPergunts.push({correct_answer: perguntas[index].correct_answer });
    // perguntas[index].incorrect_answers.forEach(incorrect => {
    //   accPergunts.push({ incorrect_answers: incorrect });
    // });
   
    // list = list.sort(() => Math.random() - 0.5);
    // accPergunts.forEach((element, i) => {
    //   res.splice([list[i]], 1, element);
    // });
    // this.setState({ respostas: res });
    // console.log(res);
  }

  render() {
    const { perguntas } = this.props;
    if (!perguntas) return <h1>Loading...</h1>;
    console.log();
    return (
      <section>
        <Header />
        <section>
          <h3 data-testid="question-category">{perguntas[0].category}</h3>
          <p data-testid="question-text">{perguntas[0].question}</p>
          <ul data-testid="answer-options">
            <button type="button" data-testid="correct-answer">
              {perguntas[0].correct_answer}
            </button>
            {perguntas[0].incorrect_answers.map((incorreta, index) => (
              <button
                type="button"
                key={index}
                data-testid={`wrong-answer-${index}`}
              >
                {incorreta}
              </button>
            ))}
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
