import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './../styles/setting.css'

class SignInPage extends Component {
    render() {
        return (
            <div className="signinbgr">
                <img src="/images/signinbgr.jpg" alt="bgr" id="signinbgr"/>
                <form className="signin">
                    <div className="form-group">
                        <label for="exampleInputEmail1">Email or user name</label>
                        <input type="text" className="form-control" id="exampleInputUserName" aria-describedby="UserName" placeholder="Ex: nghiadeptrai" />
                        <small id="UserNameHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label for="exampleInputPassword">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword" placeholder="Password" />
                    </div>
                    <button type="submit" className="btn btn-primary signinbtn">Sing In</button>
                </form>
            </div>
        )
    }
}
export default SignInPage