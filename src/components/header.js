import React, { Component } from 'react';
import { render } from 'react-dom'
import { Link } from 'react-router-dom'
import '../styles/styles.css'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';

class Header extends Component {
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
                            <Link className="nav-item nav-link ml-auto" to="/contact" style={{color: 'white'}}><i className="fas fa-cart-plus"></i></Link>
                            <Link className="nav-item nav-link" to="/contact" style={{color: 'white'}}><i className="far fa-bell"></i></Link>
                            <div className="nav-item dropdown" style={{color: 'white'}}>
                                <Link className="nav-link dropdown-toggle" id="header-account-menu-link" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="far fa-user"></i></Link>
                                <div className="dropdown-menu account-menu" aria-labelledby="header-account-menu-link">
                                    <Link className="dropdown-item" to="/account">Settings</Link>
                                    <Link className="dropdown-item" to="/logout">Sign out</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}
export default Header