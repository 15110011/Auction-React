/*global FB*/
import React, { Component } from 'react';

import { render } from 'react-dom'
import { Link, withRouter } from 'react-router-dom'
import SignInPage from './sign-in'
import '../styles/styles.css'

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoggedIn: false,
            name:'',
        }
        this.handleLogOut = this.handleLogOut.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
    }
    handleLogOut(e) {
        e.preventDefault()
        // localStorage.removeItem('session')
        // fetch('/api/v1/account/logout')
        //     .then(() => {
        //         this.setState({ isLoggedOut: true })
        //     })
        FB.logout(
            resp=>{
                if(resp.status=='unknown'){
                    this.setState({isLoggedIn:false})
                }
            }
        )
    }
    handleLogin(e){
        e.preventDefault()
        FB.login(resp=>{
            if(resp.status=='connected'){
                this.setState({isLoggedIn:true});
                FB.api('/me',resp=>{
                    this.setState({name:resp.name})
                })
            }
        })
    }
    onClick(e) {
        e.preventDefault()
        FB.login(console.log)
    }
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-dark">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <Link className="navbar-brand mr-0" to="/" style={{ color: 'white' }}>AuctionBlocha</Link>
                        <div className="collapse navbar-collapse" id="navcol-1" style={{ marginRight: '0px' }}>
                            <form className="form-inline ml-auto">
                                <div className="collapse navbar-collapse" id="navbar1">
                                    <ul className="navbar-nav">
                                        <li className="nav-item dropdown">
                                            <button type="button" className="btn btn-info mr-sm-2 dropdown-toggle" id="menu" data-toggle="dropdown">Category</button>
                                            <ul className="dropdown-menu">
                                                <li className="dropdown-item dropdown-submenu">
                                                    <Link to="#">Submenu-1</Link>
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
                                                    <Link to="#">Submenu-2</Link>
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
                                                    <Link to="#">Submenu-3</Link>
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
                                                    <Link to="#">Submenu-4</Link>
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
                                                    <Link to="#">Submenu-5</Link>
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
                                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                                    <button className="btn btn-info my-2 my-sm-0" type="submit">Search</button>
                                </div>
                            </form>
                            {
                                (this.state.isLoggedIn ? (
                                    <div className="ml-auto">
                                        <div className="form-inline">
                                            <Link className="nav-item nav-link ml-auto" to="/contact" style={{ color: 'white' }}><i className="fas fa-cart-plus"></i></Link>
                                            <Link className="nav-item nav-link" to="/contact" style={{ color: 'white' }}><i className="far fa-bell"></i></Link>
                                            <div className="nav-item dropdown" style={{ color: 'white' }}>
                                                <a className="nav-link dropdown-toggle" id="header-account-menu-link" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="far fa-user"></i></a>
                                                <div className="dropdown-menu account-menu" aria-labelledby="header-account-menu-link">
                                                    <Link className="dropdown-item" to="/account">{this.state.name}</Link>
                                                    <Link className="dropdown-item" to="/account">Dashboard</Link>
                                                    <Link className="dropdown-item" to="/logout" onClick={this.handleLogOut}>Sign out</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                        <div className="ml-auto">
                                            <div className="form-inline">
                                                <Link className="btn btn-info" to="/faq">FAQ</Link>
                                                <button class="loginBtn loginBtn--facebook" onClick={(e)=>{this.handleLogin(e)}}>Login with Facebook</button>
                                            </div>
                                        </div>
                                    )
                                )
                            }
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}
export default withRouter(Header)