import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/header'
import { Switch, Route, BrowserRouter } from 'react-router-dom'



class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
