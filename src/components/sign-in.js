import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import Header from './header'
import './../styles/setting.css'

class SignInPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            emailAddress: '',
            password: '',
            isLoggedIn: true
        }
        this.handleLogin = this.handleLogin.bind(this)
    }
    handleLogin(e) {
        e.preventDefault()
        const form = new FormData(e.target)
        fetch('/api/v1/entrance/login', {
            method: 'PUT',
            body: form
        })
            .then(res => res.json())
            .then((res) => {
                if (res.checkPass) {
                    this.props.history.push('/')
                } else {
                    this.setState({ isLoggedIn: false })
                }

            })
    }
    render() {
        return (
            <div className="signinbgr">
                <img src="/images/signinbgr.jpg" alt="bgr" id="signinbgr" />
                <form className="signin" onSubmit={this.handleLogin}>
                    <div className="form-group">
                        <label for="exampleInputEmail1">Email or user name</label>
                        <input
                            type="email"
                            className="form-control"
                            id="exampleInputEmailAddress"
                            aria-describedby="EmailAddress"
                            placeholder="Ex: Email"
                            name="emailAddress"
                            value={this.state.emailAddress}
                            onChange={e => this.setState({ emailAddress: e.target.value })}
                        />
                        <small id="UserNameHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label for="exampleInputPassword">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="exampleInputPassword"
                            placeholder="Password"
                            name="password"
                            value={this.state.password}
                            onChange={e => this.setState({ password: e.target.value })}
                        />
                    </div>
                    {this.state.isLoggedIn === false && (
                    <p className="errorsInput" id="invalid">Incorrect email or password</p>
                    )}
                    <button type="submit" className="btn btn-primary signinbtn">Sign In</button>
                </form>
            </div>
        )
    }
}
export default SignInPage