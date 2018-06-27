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
      name: '',
      userId: ''
    }
    this.logIn = this.logIn.bind(this)
    this.logOut = this.logOut.bind(this)
    this.checkStatus = this.checkStatus.bind(this)
  }
  logIn(e) {
    if (e) {
      e.preventDefault()

    }
    FB.login(this.loginCB.bind(this))

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
  loginCB(resp) {
    var form = new FormData();
    localStorage.setItem("token", resp.authResponse.accessToken)

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

  }
  checkStatus() {
    FB.getLoginStatus((response)=> {
      if (response.status === 'connected') {
        FB.api('/me', data => {
          if (!data.error) {
            var form = new FormData();
            form.append('action', 'CHECK');
            form.append('token', localStorage.getItem('token'))
            form.append('userId', data.id)
            console.log("CHECK")
            fetch(`http://localhost:1337/api/v2/login`, {
              method: 'POST',
              body: form,
              credentials: 'include'
            }).then(res => res.json()).then((res) => {
              console.log(res)
              if (res.success) {
                this.setState({ name: data.name, loggedIn: true })
              }
            })
          }
        })

      } else {
        this.logIn()
        this.props.history.push('/')
      }
    }
    );
  }
  componentDidMount() {
    FB.Event.subscribe("auth.authResponseChange", resp => {

      if (resp.status == "connected") {
        // var form = new FormData();
        // localStorage.setItem("token", resp.authResponse.accessToken)
        // form.append('token', resp.authResponse.accessToken)
        // form.append('expire', resp.authResponse.expiresIn);
        // form.append('userId', resp.authResponse.userID);
        // this.setState({ userId: resp.authResponse.userID })
        // FB.api('/me', res => {
        //   form.append('action', 'LOGIN');
        //   form.append('userName', res.name)
        //   fetch(`http://localhost:1337/api/v2/login`, {
        //     method: 'POST',
        //     body: form,
        //     credentials: 'include'
        //   }).then(res => res.json()).then((res) => {
        //     console.log('abcd')
        //     console.log(res)
        //     if (res.success) {
        //       this.setState({ name: res.name, loggedIn: true })
        //     }
        //   })
        // })


      }
      else if (resp.status == "authorization_expired" || resp.status === 'not_authorized') {
        FB.login(this.loginCB.bind(this))
        localStorage.setItem("token", '')
      }
    })
    // FB.Event.subscribe('auth.login', resp => {
    //   this.loginCB(resp)
    // })
    // FB.getLoginStatus(function (response) {
    //   if (response.status === 'connected') {
    //     var uid = response.authResponse.userID;
    //     var accessToken = response.authResponse.accessToken;

    //   } else if (response.status === 'authorization_expired') {

    //   } else if (response.status === 'not_authorized') {

    //   } else {

    //   }
    // });
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
        <Route path='/dashboard' component={(props) => (<DashBoard checkStatus={this.checkStatus} userName={this.state.name} login={this.state.loggedIn} isLoggedIn={this.logIn} isLoggedOut={this.isLoggedOut} {...props} />)}/>
        <Route path='/itemdetail' component={ItemDetail} />
        <Route path='/items' component={Items} />
        <Footer />
      </div>
    );
  }
}
export default App;
