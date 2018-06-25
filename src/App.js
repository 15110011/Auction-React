/*global FB*/

import React, { Component } from 'react';
import './App.css';
import Header from './components/header'
import Footer from './components/footer'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import HomePage from './components/homepage';
import FAQ from './components/faq'
import SignUpPage from './components/sign-up';
import SignInPage from './components/sign-in';
import DashBoard from './components/dashboard';
import ItemDetail from './components/itemdetail';
import Items from './components/items';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedIn:false
    }
    this.isLoggedIn = this.isLoggedIn.bind(this)
  }
  isLoggedIn(e) {
    e.preventDefault()
    this.setState({
      loggedIn:true
    })
  }
  componentDidMount() {
    FB.getLoginStatus(function (response) {
      if (response.status === 'connected') {
        var uid = response.authResponse.userID;
        var accessToken = response.authResponse.accessToken;
     
      } else if (response.status === 'authorization_expired') {

      } else if (response.status === 'not_authorized') {

      } else {

      }
    });
  }
  render() {
    return (
      <div className="App">
        <Header isLoggedIn={this.isLoggedIn} />
        <Route exact path='/' component={HomePage} />
        <Route path='/faq' component={FAQ} />
        {/* <Route path='/signup' component={SignUpPage} /> */}
        {/* <Route path='/signin' component={(props) => (<SignInPage  {...props} />)} /> */}
        <Route path='/account' component={DashBoard} />
        <Route path='/itemdetail' component={ItemDetail} />
        <Route path='/items' component={Items} />
        <Footer />
      </div>
    );
  }
}
export default App;
