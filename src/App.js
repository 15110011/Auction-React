/*global FB*/
import React, { Component } from 'react';
import './App.css';
import Header from './components/header'
import Footer from './components/footer'
import { Route } from 'react-router-dom'
import HomePage from './components/homepage';
import FAQ from './components/faq'
import { LOADING_LOGIN_STATUS, LOADED_LOGIN_STATUS, GUEST_STATUS } from './config'
import DashBoard from './components/dashboard';
import ItemDetail from './components/itemdetail';
import Items from './components/items';
import AdminPanel from './components/AdminPanel'
import Bidcart from './components/bidcart';
import socketIOClient from 'socket.io-client';
import sailsIOClient from 'sails.io.js';
import SearchResult from './components/SearchResult';


let root = `${window.location.protocol}//${window.location.host}`
// if (window.location.port) {
//   root += `:${window.location.port}`
// }


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
    this.loginCB = this.loginCB.bind(this)
    this.checkStatus = this.checkStatus.bind(this)
    this.checkIsAdmin = this.checkIsAdmin.bind(this)


  }
  componentWillMount() {
    let io = sailsIOClient(socketIOClient);
    io.sails.url = root;
    io.sails.connect()
    this.setState({ io: io })
  }
  logIn(e) {
    if (e) {
      e.preventDefault()

    }
    this.setState({ loggedIn: LOADING_LOGIN_STATUS })
    FB.login(this.loginCB)

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
  loginCB(resp) {
    var form = new FormData();
    localStorage.setItem("token", resp.authResponse.accessToken)

    form.append('token', resp.authResponse.accessToken)
    form.append('expire', resp.authResponse.expiresIn);
    form.append('userId', resp.authResponse.userID);
    if (resp.status === 'connected') {
      FB.api('/me', res => {

        console.log(res)
        form.append('action', 'LOGIN');

        form.append('userName', res.name)
        fetch(`${root}/api/v2/login`, {
          method: 'POST',
          body: form,
          credentials: 'include'
        }).then(user => user.json()).then((user) => {
          console.log('abcd')
          console.log(user)
          if (user.success) {
            this.setState({ name: res.name, loggedIn: LOADED_LOGIN_STATUS, userId: res.id }, () => {
              this.checkIsAdmin()
            })

          }

        })
      })


    }
    else {
      window.location.href = "/"
      window.alert = "Login failed"
    }

  }
  checkIsAdmin() {
    fetch(`${root}/api/v1/me?id=${this.state.userId}`)
      .then(res => res.json())
      .then(userData => {
        console.log(userData)
        this.setState({ isAdmin: userData.isAdmin })
      })

  }
  checkStatus() {
    this.setState({ loggedIn: LOADING_LOGIN_STATUS })
    FB.getLoginStatus((response) => {

      if (response.status === 'connected') {
        FB.api('/me', data => {
          console.log(data.name)
          this.setState({ name: data.name })

          if (!data.error) {
            var form = new FormData();
            form.append('action', 'CHECK');
            form.append('token', localStorage.getItem('token'))
            form.append('userId', data.id)
            console.log("CHECK")
            fetch(`${root}/api/v2/login`, {
              method: 'POST',
              body: form,
              credentials: 'include'
            }).then(res => res.json()).then((res) => {
              console.log(res)
              if (res.success) {
                this.setState({ name: data.name, loggedIn: LOADED_LOGIN_STATUS, userId: data.id }, () => {
                  this.checkIsAdmin()
                })

              }

            })
          }
        })

      }
      else if (response.status === 'authorization_expired') {
        console.log(1)
        this.setState({ loggedIn: GUEST_STATUS })

        this.logIn()
        // this.props.history.push('/')
        // return <Redirect to='/'  />
      }
      else if (response.status === 'not_authorized') {
        console.log(2)
        this.setState({ loggedIn: GUEST_STATUS })

        this.logIn()
        // this.props.history.push('/')
        // return <Redirect to='/'  />
      }
      else {
        console.log(3)
        this.setState({ loggedIn: GUEST_STATUS })

        // this.logOut()
        // this.props.history.push('/')
        // return <Redirect to='/'  />
      }
    }
    );
  }
  componentDidMount() {
    FB.Event.subscribe("auth.authResponseChange", resp => {

      if (resp.status === "connected") {
        this.state.io.socket.get(`/socket/user/${resp.authResponse.userID}`, (body) => {
          console.log(body.msg) 
        })
      }
      else if (resp.status === "authorization_expired" || resp.status === 'not_authorized') {
        FB.login(this.loginCB.bind(this))
        this.setState({ loggedIn: GUEST_STATUS })
        localStorage.setItem("token", '')
      }
      else {
        this.setState({ loggedIn: GUEST_STATUS })
        localStorage.setItem("token", '')
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
        <Route path='/items/:id' component={(props, state) => (<ItemDetail {...this.state} {...props} />)} />
        <Route exact path='/items' component={Items} />
        <Route path='/bidcart' component={(props, state) => (<Bidcart {...this.state} {...props} />)} />
        <Route exact path='/results' component={(props, state) => (<SearchResult {...this.state} {...props} />)} />
        <Footer />
      </div>
    );
  }
}
export default App;
