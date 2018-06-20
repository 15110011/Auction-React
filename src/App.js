import React, { Component } from 'react';
import './App.css';
import Header from './components/header'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import HomePage from './components/homepage';
import FAQ from './components/faq'


class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={HomePage}/>
            <Route path='/faq' component={FAQ}/>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
