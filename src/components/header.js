/*global FB*/
import React, { Component } from 'react';

import { render } from 'react-dom'
import { Link, withRouter } from 'react-router-dom'
import SignInPage from './sign-in'
import '../styles/styles.css'
import { LOADING_LOGIN_STATUS, LOADED_LOGIN_STATUS, GUEST_STATUS } from '../config'

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoggedIn: false,
            name: '',
            loading: false
        }
        this.handleLogOut = this.handleLogOut.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
        // this.loggedIn = this.loggedIn.bind(this)
    }
    handleLogOut(e) {
        e.preventDefault()
        // localStorage.removeItem('session')
        // fetch('/api/v1/account/logout')
        //     .then(() => {
        //         this.setState({ isLoggedOut: true })
        //     })
        FB.logout(
            resp => {
                if (resp.status === 'unknown') {
                    this.setState({ isLoggedIn: false })
                }
            }
        )
    }
    componentWillMount() {
        // FB.getLoginStatus(resp=>{
        //     if (resp.status === 'connected') {
        //         this.loggedIn();
        //     }
        //     else if (resp.status === 'authorization_expired') {

        //     }
        //     else if (resp.status === 'not_authorized') {}
        //     else {}
        // })
        this.props.checkStatus()
    }
    // loggedIn(){
    //     FB.api('/me',resp=>{
    //         console.log(resp)
    //         this.setState({name:resp.name,isLoggedIn:true})
    //     })
    // }
    handleLogin(e) {
        e.preventDefault()
        this.props.logIn()
    }
    onClick(e) {
        e.preventDefault()
        FB.login(console.log)
    }
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-dark fixed-top">
                    <Link className="navbar-brand mr-0" to="/" style={{ color: 'white' }}>AuctionBlocha</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <form className="form-inline ml-auto">
                            <div className="collapse navbar-collapse" id="navbar1">
                                <ul className="navbar-nav">
                                    <li className="nav-item dropdown">
                                        <button type="button" className="btn btn-info mr-sm-2 dropdown-toggle" id="menu" data-toggle="dropdown">Category</button>
                                        <ul className="dropdown-menu">
                                            <li className="dropdown-item dropdown-submenu">
                                                <Link to="#">Cigars</Link>
                                                <ul className="dropdown-menu">
                                                    <li className="dropdown-item">
                                                        <Link to="#">Item-1</Link>
                                                    </li>
                                                    <li className="dropdown-item">
                                                        <Link to="#">Item-2</Link>
                                                    </li>
                                                    <li className="dropdown-item">
                                                        <Link to="#">Item-3</Link>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li className="dropdown-item dropdown-submenu">
                                                <Link to="#">Diamond</Link>
                                                <ul className="dropdown-menu">
                                                    <li className="dropdown-item">
                                                        <Link to="#">Item-1</Link>
                                                    </li>
                                                    <li className="dropdown-item">
                                                        <Link to="#">Item-2</Link>
                                                    </li>
                                                    <li className="dropdown-item">
                                                        <Link to="#">Item-3</Link>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li className="dropdown-item dropdown-submenu">
                                                <Link to="#">Cars</Link>
                                                <ul className="dropdown-menu">
                                                    <li className="dropdown-item">
                                                        <Link to="#">Item-1</Link>
                                                    </li>
                                                    <li className="dropdown-item">
                                                        <Link to="#">Item-2</Link>
                                                    </li>
                                                    <li className="dropdown-item">
                                                        <Link to="#">Item-3</Link>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li className="dropdown-item dropdown-submenu">
                                                <Link to="#">Rings</Link>
                                                <ul className="dropdown-menu">
                                                    <li className="dropdown-item">
                                                        <Link to="#">Item-1</Link>
                                                    </li>
                                                    <li className="dropdown-item">
                                                        <Link to="#">Item-2</Link>
                                                    </li>
                                                    <li className="dropdown-item">
                                                        <Link to="#">Item-3</Link>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li className="dropdown-item dropdown-submenu">
                                                <Link to="#">Painting</Link>
                                                <ul className="dropdown-menu">
                                                    <li className="dropdown-item">
                                                        <Link to="#">Item-1</Link>
                                                    </li>
                                                    <li className="dropdown-item">
                                                        <Link to="#">Item-2</Link>
                                                    </li>
                                                    <li className="dropdown-item">
                                                        <Link to="#">Item-3</Link>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>

                            </div>
                        </form>
                        <input className="form-control mr-sm-2" id="search-form" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-info my-2 my-sm-0" type="submit">Search</button>
                        {
                            (this.props.loggedIn === LOADED_LOGIN_STATUS ? (
                                <div className="ml-auto">
                                    <div className="form-inline">
                                        <Link className="nav-item nav-link ml-auto" to="/contact" style={{ color: 'white' }}><i className="fas fa-cart-plus"></i></Link>
                                        <Link className="nav-item nav-link" to="/contact" style={{ color: 'white' }}><i className="far fa-bell"></i></Link>
                                        <div className="nav-item dropdown" style={{ color: 'white' }}>
                                            <a className="nav-link dropdown-toggle" id="header-account-menu-link" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="far fa-user"></i></a>
                                            <div className="dropdown-menu account-menu" aria-labelledby="header-account-menu-link">
                                                <Link className="dropdown-item" to="">{this.props.name}</Link>
                                                <Link className="dropdown-item" to="/dashboard">Dashboard</Link>
                                                {this.props.isAdmin?<Link className="dropdown-item" to="/admin">Admin Panel</Link>:''}
                                                <Link className="dropdown-item" to="/logout" onClick={this.handleLogOut}>Sign out</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : '')}
                        {(this.props.loggedIn === GUEST_STATUS ?
                            (
                                <div className="ml-auto">
                                    <div className="form-inline">
                                        <Link className="btn btn-info" to="/faq">FAQ</Link>
                                        <button className="loginBtn loginBtn--facebook" onClick={(e) => { this.handleLogin(e) }}>Login with Facebook</button>
                                    </div>
                                </div>
                            ) : ''
                        )}
                        {(this.props.loggedIn === LOADING_LOGIN_STATUS ?
                            <div className="ml-auto">
                                <div className="form-inline">
                                    <Link className="btn btn-info" to="/faq">FAQ</Link>
                                    <div style={{ color: 'white' }}>Loading ...</div>
                                </div>
                            </div> : '')}
                    </div>
                </nav>
            </div>
        )
    }
}
export default withRouter(Header)