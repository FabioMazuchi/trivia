import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Jogo extends Component {
  componentDidMount() {
    const { token } = this.props;
    localStorage.setItem('token', JSON.stringify(token));
    console.log(token);
  }

  render() {
    // const { isLoading } = this.props;
    // if (isLoading) return 'Loading';
    return (
      <section>
        <h1>Tela de Jogo</h1>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  // isLoading: state.token.isFetching,
  token: state.token.token,
});

export default connect(mapStateToProps)(Jogo);
