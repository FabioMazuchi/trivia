import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from './Header';

class Jogo extends Component {
  componentDidMount() {
    const { token } = this.props;
    localStorage.setItem('token', JSON.stringify(token));
  }

  render() {
    return (
      <section>
        <Header />
        <h1>Tela de Jogo</h1>
      </section>
    );
  }
}

Jogo.propTypes = {
  token: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.token.token,
});

export default connect(mapStateToProps)(Jogo);
