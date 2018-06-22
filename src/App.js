import React, { Component } from 'react';
import './App.css';
import Header from './components/header'
import Footer from './components/footer'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import HomePage from './components/homepage';
import FAQ from './components/faq'
import SignUpPage from './components/sign-up';
import SignInPage from './components/sign-in';
import Account from './components/account';
import ItemDetail from './components/itemdetail';
import Items from './components/items';
import ScrollButton from './components/scroll';
import ScrollApp from './components/scroll';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
          <Route exact path='/' component={HomePage} />
          <Route path='/faq' component={FAQ} />
          <Route path='/signup' component={SignUpPage} />
          <Route path='/signin' component={SignInPage} />
          <Route path='/account' component={Account}/>
          <Route path='/itemdetail' component={ItemDetail}/>
          <Route path='/items' component={Items}/>
        <Footer />
      </div>
    );
  }
}
export default App;
