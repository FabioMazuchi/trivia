import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Configuracao from './components/Configuracao';
import Feedback from './components/Feedback';
import Jogo from './components/Jogo';
import LoginScreen from './components/LoginScreen';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/jogo" component={ Jogo } />
        <Route path="/feed" component={ Feedback } />
        <Route path="/config" component={ Configuracao } />
        <Route path="/" component={ LoginScreen } />
      </Switch>
    </div>
  );
}
