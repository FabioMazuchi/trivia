import React, { Component } from "react";
import { Link } from "react-router-dom";

class Ranking extends Component {
  render() {
    return (
      <section>
        <h1 data-testid="ranking-title">Ranking</h1>
        <Link className="config" data-testid="btn-go-home" to="/">
          Home
        </Link>
      </section>
    );
  }
}

export default Ranking;
