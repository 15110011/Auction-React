import React, { Component } from 'react';
import './App.css';
import Header from './components/header'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import HomePage from './components/homepage';



class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
       
          
          <HomePage/>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
