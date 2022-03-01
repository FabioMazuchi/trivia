import React, { Component } from "react";
import github from '../images/github.png';
import linkedin from '../images/linkedin.png';

class Footer extends Component {
  render() {
    return (
      <footer>
        <p>Desenvolvido por <b>Fábio Augusto Mazuchi</b></p>
        <div className="links">
          <a target="_blank" href="https://github.com/FabioMazuchi">
            <img src={github}/>
          </a>
          <a target="_blank" href="https://www.linkedin.com/in/fabio-augusto-mazuchi/">
            <img src={linkedin}/>
          </a>
          <h4>mazuchi.augusto@hotmail.com</h4>
        </div>
      </footer>
    );
  }
}

export default Footer;
