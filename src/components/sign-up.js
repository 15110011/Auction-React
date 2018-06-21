import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
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
            fetch(' /api/v1/entrance/signup', {
                method: 'POST',
                body: form
            })
                .then(res => res.json())
                .then((res) => {
                    if(!res.success) {
                        res.error
                    }
                })
        }

    }
    render() {
        return (
            <form onSubmit={this.handleSubmit} id="signupform">
                <input
                    placeholder='Full name'
                    value={this.state.fullName}
                    onChange={e => this.setState({ fullName: e.target.value })}
                />
                <p className="hidden errorsInput" id="validfullName">Full name cannot be empty!!</p>

                <input
                    placeholder='User name'
                    value={this.state.userName}
                    onChange={e => this.setState({ userName: e.target.value })}
                />
                <p className="hidden errorsInput" id="validuserName">User name cannot be empty!!</p>

                <input
                    placeholder='Email address'
                    value={this.state.emailAddress}
                    onChange={e => {
                        this.setState({ emailAddress: e.target.value })

                    }}
                />
                <p className="hidden errorsInput" id="validEmail">Please enter a valid email address!!</p>

                <input
                    placeholder='Password'
                    value={this.state.password}
                    type="password"
                    onChange={e => {
                        this.setState({ password: e.target.value })
                    }}

                />
                <p className="hidden errorsInput" id="validPass">Password must contain 6 characters!!</p>

                <input
                    placeholder='Confirm password'
                    type="password"
                    value={this.state.confirmPassword}
                    onChange={e => {
                        this.setState({ confirmPassword: e.target.value })

                    }}
                />
                <p className="hidden errorsInput" id="validConfirmPass">The password and its confirm are not the same!!</p>
                <input
                    placeholder='Phone number'
                    value={this.state.phoneNumber}
                    onChange={e => {
                        this.setState({ phoneNumber: e.target.value })

                    }}
                />
                <p className="hidden errorsInput" id="validPhone">You must provide at least 10 number for Phone number</p>
                <button type="submit">Click</button>
            </form>
        )
    }
}
export default SignUpPage