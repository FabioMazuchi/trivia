import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Configuracao from "./components/Configuracao";
import Jogo from "./components/Jogo";
import LoginScreen from "./components/LoginScreen";

export default function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
      </header> */}
      <Switch>
        <Route path="/jogo" component={Jogo} />
        <Route path="/config" component={Configuracao} />
        <Route path="/" component={LoginScreen} />
      </Switch>
    </div>
  );
}
