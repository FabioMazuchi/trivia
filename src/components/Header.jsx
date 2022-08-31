import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      url: '',
    };
    this.convertEmail = this.convertEmail.bind(this);
  }

  componentDidMount() {
    this.convertEmail();
  }

  convertEmail() {
    const { email } = this.props;
    const hash = md5(email).toString();
    const url = `https://www.gravatar.com/avatar/${hash}`;
    this.setState({ url });
  }

  render() {
    const { nome, pontuacao } = this.props;
    const { url } = this.state;
    return (
      <header>
        <div>
          <img
            data-testid="header-profile-picture"
            src={ url }
            alt={ nome }
          />
          <span data-testid="header-player-name">{nome}</span>
        </div>
        <span className="score" data-testid="header-score">
          Score:
          { pontuacao }
        </span>
      </header>
    );
  }
}

Header.propTypes = {
  nome: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  pontuacao: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  nome: state.player.name,
  email: state.player.gravatarEmail,
  pontuacao: state.player.score,
});

export default connect(mapStateToProps)(Header);
