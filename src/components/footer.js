import React, { Component } from 'react';
import { render } from 'react-dom'
import { Link } from 'react-router-dom'
import '../styles/styles.css'

class Footer extends Component {
    render() {
        return (
            <div>
                <footer id="page-footer" className="navbar navbar-light justify-content-between flex-row-reverse">
                    <div className="nav">
                        <small className="nav-item">
                            <Link className="nav-link text-info" to="/contact">Contact
                    <span className="d-none d-sm-inline"> us</span>
                            </Link>
                        </small>
                        <small className="nav-item">
                            <Link className="nav-link text-info" to="/legal/terms">Terms
                    <span className="d-none d-sm-inline"> of Use</span>
                            </Link>
                        </small>
                        <small className="nav-item">
                            <Link className="nav-link text-info" to="/legal/privacy">Privacy
                    <span className="d-none d-sm-inline"> policy</span>
                            </Link>
                        </small>
                        <small className="nav-item">
                            <Link className="nav-link text-info" to="/logout" onClick={this.handleLogOut}>Sign out</Link>
                        </small>
                    </div>
                    <small className="copy">Copyright &copy; 2018 The BlochaTeam. All rights reserved.</small>
                </footer>
            </div>
        )
    }
}
export default Footer