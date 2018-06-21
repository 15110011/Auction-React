import React, { Component } from 'react';
import './App.css';
import Header from './components/header'
import Footer from './components/footer'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import HomePage from './components/homepage';
import FAQ from './components/faq'
import SignUpPage from './components/sign-up';


class App extends Component {
  render() {
    return (
      <div className="App">
      <Header />
            <Route exact path='/' component={HomePage}/>
            <Route path='/faq' component={FAQ}/>
            <Route path='/signup' component={SignUpPage}/>
      <Footer />
            
      </div>
    );
  }
}

export default App;
