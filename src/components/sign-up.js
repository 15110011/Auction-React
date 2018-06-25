import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Header from './header';
import './../styles/setting.css'

class SignUpPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fullName: '',
            userName: '',
            emailAddress: '',
            password: '',
            confirmPassword: '',
            phoneNumber: '',
            valid: false
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.validate = this.validate.bind(this)
    }
    checkValidPhone(phone_number) {
        if (phone_number.length < 10 || phone_number.length > 11)
            return false
        if (/[A-z]/.test(phone_number))
            return false
        return true

    }
    checkValidEmail(email) {
        return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(email)
    }
    validate(fullName, userName, emailAddress, password, confirmPassword, phoneNumber) {
        if (this.state.fullName.trim() === '') {
            document.querySelector('#validfullName').classList.remove('hidden')
            return false
        } else {
            document.querySelector('#validfullName').classList.add('hidden')
        }

        if (this.state.userName.trim() === '') {
            document.querySelector('#validuserName').classList.remove('hidden')
            return false
        } else {
            document.querySelector('#validuserName').classList.add('hidden')

        }

        if (!this.checkValidEmail(this.state.emailAddress)) {

            document.querySelector('#validEmail').classList.remove('hidden')
            return false
        }
        else {
            document.querySelector('#validEmail').classList.add('hidden')
        }

        if (this.state.password.length < 6) {
            document.querySelector('#validPass').classList.remove('hidden')
            return false

        } else {
            document.querySelector('#validPass').classList.add('hidden')
        }

        if (this.state.password !== this.state.confirmPassword) {
            document.querySelector('#validConfirmPass').classList.remove('hidden')
            return false

        } else {
            document.querySelector('#validConfirmPass').classList.add('hidden')
        }

        if (!this.checkValidPhone(this.state.phoneNumber)) {

            document.querySelector('#validPhone').classList.remove('hidden')
            return false

        }
        else {
            document.querySelector('#validPhone').classList.add('hidden')
        }
        return true
    }


    handleSubmit(e) {
        e.preventDefault()
        const form = new FormData(e.target)
        if (this.validate(this.state.fullName, this.state.userName, this.state.emailAddress, this.state.password, this.state.confirmPassword, this.state.phoneNumber)) {
            fetch('/api/v1/entrance/signup', {
                method: 'POST',
                body: form
            })
                .then(res => res.json())
                .then((res) => {
                    if(res.checkSuccess) {
                        localStorage.getItem('session','token')
                        this.props.history.push('/')
                    } else {
                        this.props.history.push('/signup')
                    }
                })
        }

    }
    render() {
        return (
            <div>
                <img src="/images/signupbgr.jpg" alt="bgr" id="signupbgr"/>
                <form onSubmit={this.handleSubmit} className="signup">
                    <div className="form-group">
                        <label for="exampleInputName">Full name</label>
                        <input type="text" className="form-control" id="exampleInputName" aria-describedby="Name" placeholder="Vũ Quang Anh" 
                        value={this.state.fullName} onChange={e => this.setState({ fullName: e.target.value })} name="fullName" />
                        <p className="hidden errorsInput" id="validfullName">Full name cannot be empty!!</p>
                    </div>
                    <div className="form-group">
                        <label for="exampleInputUserName">User name</label>
                        <input type="text" className="form-control" id="exampleInputUserName" aria-describedby="UserName" placeholder="blocha@gmail.com" 
                        value={this.state.userName}
                        onChange={e => this.setState({ userName: e.target.value })} name="userName" />
                        <p className="hidden errorsInput" id="validuserName">User name cannot be empty!!</p>
                    </div>
                    <div className="form-group">
                        <label for="exampleInputEmail">Email</label>
                        <input type="email" className="form-control" id="exampleInputEmail" aria-describedby="Email" placeholder="blocha@gmail.com" 
                        value={this.state.emailAddress}
                        onChange={e => {
                        this.setState({ emailAddress: e.target.value })}} name="emailAddress"/>
                        <p className="hidden errorsInput" id="validEmail">Please enter a valid email address!!</p>
                    </div>
                    <div className="form-group">
                        <label for="exampleInputPassword">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Minimum of 6 characters"
                        value={this.state.password}
                        onChange={e => {
                        this.setState({ password: e.target.value })}} name="password" />
                        <p className="hidden errorsInput" id="validPass">Password must contain 6 characters!!</p>
                    </div>
                    <div className="form-group">
                        <label for="exampleInputConPassword">Confirm password</label>
                        <input type="password" className="form-control" id="exampleInputConPassword" placeholder="Confirm password"
                        value={this.state.confirmPassword}
                        onChange={e => {
                        this.setState({ confirmPassword: e.target.value })}} name="confirmPassword" />
                        <p className="hidden errorsInput" id="validConfirmPass">The password and its confirm are not the same!!</p>    
                    </div>
                    <div className="form-group">
                        <label for="exampleInputPhoneNumber">Phone number</label>
                        <input type="text" className="form-control" id="exampleInputPhoneNumber" placeholder="(+84) 012345" 
                        value={this.state.phoneNumber}
                        onChange={e => {
                        this.setState({ phoneNumber: e.target.value })}} name="phoneNumber"/>
                        <p className="hidden errorsInput" id="validPhone">You must provide at least 10 number for Phone number</p>        
                    </div>
                    <button type="submit" className="btn btn-primary signupbtn">Sign Up</button>
                </form>
            </div>
          
                        )
    }
}
export default SignUpPage