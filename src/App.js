/*global FB*/
import React, { Component } from 'react';
import './App.css';
import Header from './components/header'
import Footer from './components/footer'
import { Route } from 'react-router-dom'
import HomePage from './components/homepage';
import FAQ from './components/faq'
import { LOADING_LOGIN_STATUS, LOADED_LOGIN_STATUS, GUEST_STATUS, API_URL, WS_URL } from './config'
import DashBoard from './components/dashboard';
import ItemDetail from './components/itemdetail';
import Items from './components/items';
import AdminPanel from './components/AdminPanel'
import Bidcart from './components/bidcart';
import socketIOClient from 'socket.io-client';
import sailsIOClient from 'sails.io.js';
import SearchResult from './components/SearchResult';

window.root = API_URL


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedIn: GUEST_STATUS,
      name: '',
      userId: '',
      isAdmin: false,
      io: null,
    }
   
    this.logIn = this.logIn.bind(this)
    this.logOut = this.logOut.bind(this)
    this.checkStatus = this.checkStatus.bind(this)
    this.checkIsAdmin = this.checkIsAdmin.bind(this)



  }
  componentWillMount() {
    let io = sailsIOClient(socketIOClient);
    io.sails.url = WS_URL;
    io.sails.connect()
    this.setState({ io })
    this.checkStatus()
    FB.Event.subscribe("auth.authResponseChange", resp => {

      if (resp.status === "connected") {
        this.state.io.socket.get(`${root}/socket/user/${resp.authResponse.userID} `, (body) => {
        })
        this.checkStatus()

      }
      else if (resp.status === "authorization_expired" || resp.status === 'not_authorized') {
        this.setState({ loggedIn: GUEST_STATUS })
      }
      else {
        this.setState({ loggedIn: GUEST_STATUS })
        fetch(`${root}/api/v1/me`, {
          method: 'DELETE',
          credentials: 'include'
        }).then(res => res.json())
          .then(resp => {
            this.setState({ userId: null })
          })
      }
    })

  }
  componentDidMount() { 
    // this.web3.eth.net.getNetworkType((err, res) => {
    //   console.log("getNetworkType: " + res)
    // })
  }
  logIn(e) {
    this.setState({ loggedIn: LOADING_LOGIN_STATUS })
    FB.login()
  }
  logOut(e) {
    FB.logout(
      resp => {
        if (resp.status === 'unknown') {
          this.setState({ loggedIn: GUEST_STATUS })
        }
      }
    )
  }
  checkIsAdmin() {
    fetch(`${root}/api/v1/me`,
      {
        credentials: 'include'
      })
      .then(res => res.json())
      .then(userData => {
        this.setState({ isAdmin: userData.isAdmin })
      })

  }
  checkStatus() {
    this.setState({ loggedIn: LOADING_LOGIN_STATUS })
    FB.getLoginStatus((resp) => {
      if (resp.status === 'connected') {
        FB.api('/me', data => {
          this.setState({ name: data.name })

          if (!data.error) {
            var form = new FormData();
            form.append('userId', data.id)
            form.append('userName', data.name)
            fetch(`${root}/api/v2/login`, {
              method: 'POST',
              body: form,
              credentials: 'include'
            }).then(res => res.json()).then((res) => {
              if (res.success) {
                this.setState({ name: data.name, loggedIn: LOADED_LOGIN_STATUS, userId: data.id }, () => {
                  this.checkIsAdmin()
                })

              }

            })
          }
        })
      }
      else {
        this.setState({ loggedIn: GUEST_STATUS })
      }
    })



  }

  render() {
    return (
      <div className="App" style={{ marginTop: '56px' }}>
        <Header logIn={this.logIn} logOut={this.logOut} {...this.state} checkStatus={this.checkStatus} />
        <Route exact path='/' component={HomePage} />
        <Route path='/faq' component={FAQ} />
        <Route path='/admin' component={(props) => (<AdminPanel {...this.state} />)} />
        <Route path='/dashboard' component={(props) => (<DashBoard checkStatus={this.checkStatus} isLoggedIn={this.logIn} isLoggedOut={this.isLoggedOut} {...props} {...this.state} />)} />
        <Route path='/items/:id' component={(props) => (<ItemDetail {...this.state} {...props} />)} />
        <Route exact path='/items' component={Items} />
        <Route path='/bidcart' component={(props, state) => (<Bidcart {...this.state} {...props} />)} />
        <Route exact path='/results' component={(props, state) => (<SearchResult {...this.state} {...props} />)} />
        <Footer />
      </div>
    );
  }
}
export default App;
