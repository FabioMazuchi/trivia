import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import github from '../images/github.png';
import linkedin from '../images/linkedin.png';

class Footer extends Component {
  render() {
    return (
      <footer>
        <p>
          Desenvolvido por
          <b>Fábio Augusto Mazuchi</b>
        </p>
        <div className="links">
          <Link target="_blank" to="https://github.com/FabioMazuchi">
            <img src={ github } alt="link para github" />
          </Link>
          <Link target="_blank" to="https://www.linkedin.com/in/fabio-augusto-mazuchi/">
            <img src={ linkedin } alt="link para linkedin" />
          </Link>
          <h4>mazuchi.augusto@hotmail.com</h4>
        </div>
      </footer>
    );
  }
}

export default Footer;
