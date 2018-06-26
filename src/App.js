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
      loggedIn: false,
      name: ''
    }
    this.logIn = this.logIn.bind(this)
    this.logOut = this.logOut.bind(this)
    this.checkStatus = this.checkStatus.bind(this)
  }
  logIn(e) {
    if (e) {
      e.preventDefault()

    }
    FB.login(resp => {
      var form = new FormData();
      form.append('token', resp.authResponse.accessToken)
      form.append('expire', resp.authResponse.expiresIn);
      form.append('userId', resp.authResponse.userID);
      if (resp.status == 'connected') {
        FB.api('/me', res => {

          console.log(res)
          form.append('action', 'LOGIN');

          form.append('userName', res.name)
          fetch(`http://localhost:1337/api/v2/login`, {
            method: 'POST',
            body: form,
            credentials: 'include'
          }).then(res => res.json()).then((res) => {
            console.log('abcd')
            console.log(res)
            if (res.success) {
              this.setState({ name: res.name, loggedIn: true })

            }

          })
        })


      }
      else {
        window.location.href = "/"
        window.alert = "Login failed"
      }
    })

  }
  logOut(e) {
    FB.logout(
      resp => {
        if (resp.status === 'unknown') {
          this.setState({ loggedIn: false })
        }
      }
    )
  }
  checkStatus() {
    FB.getLoginStatus(function (response) {
      if (response.status === 'connected') {
        var uid = response.authResponse.userID;
        var accessToken = response.authResponse.accessToken;
        console.log(1,":",response)

        FB.api('/me', data => {
          console.log(data)
          var form = new FormData();
          form.append('action', 'CHECK');
          form.append('token', response.authResponse.accessToken)
          form.append('userId', data.id)
          fetch(`http://localhost:1337/api/v2/login`, {
            method: 'POST',
            body: form,
            credentials: 'include'
          }).then(res => res.json()).then((res) => {
            console.log('abcd')
            console.log(res)
            if (res.success) {
              this.setState({ name: data.name, loggedIn: true })

            }

          })
        })

      } else {
        this.logIn()
        this.props.history.push('/')
      }
    });
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
        <Header logIn={this.logIn} logOut={this.logOut} {...this.state} checkStatus={this.checkStatus} />
        <Route exact path='/' component={HomePage} />
        <Route path='/faq' component={FAQ} />
        {/* <Route path='/signup' component={SignUpPage} /> */}
        {/* <Route path='/signin' component={(props) => (<SignInPage  {...props} />)} /> */}
        <Route path='/account' component={(props) => (<DashBoard checkStatus={this.checkStatus} userName={this.state.name} login={this.state.loggedIn} isLoggedIn={this.logIn} isLoggedOut={this.isLoggedOut} {...props} />)} />
        <Route path='/itemdetail' component={ItemDetail} />
        <Route path='/items' component={Items} />
        <Footer />
      </div>
    );
  }
}
export default App;
