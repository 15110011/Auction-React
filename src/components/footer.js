import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import '../styles/styles.css'

class Footer extends Component {
    render() {
        return (
            <div className="pt-3">
                <div className="container-fluid light-word footer pt-3">
                    <div className="container pt-3">
                        <div className="row">
                            <div className="col-sm-4 d-flex justify-content-center" style={{ display: 'inline-flex' }}>
                                <div className="envelope">
                                    <i className="far fa-envelope"></i>
                                </div>
                                <div className="word-right light-word pt-1 pl-1">
                                    <h6>&nbsp;Do you have any questions?</h6>
                                    <p>&nbsp;Contact: blocha@gmail.com</p>
                                </div>
                            </div>
                            <div className="col-sm-4 d-flex justify-content-center" style={{ display: 'inline-flex' }}>
                                <div className="phone">
                                    <i className="fas fa-phone-volume"></i>
                                </div>
                                <div className="word-right light-word pt-1 pl-1">
                                    <h6>&nbsp;(+84) 1674 834 476</h6>
                                    <p>&nbsp;Sunday - Saturday: 8:00 AM - 22:00 PM</p>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <button id="btncontact" style={{ width: '200px' }} className="btn btnbid">Contact us</button>
                            </div>
                            <div className="col-sm-3 footer-border-right pt-4">
                                <div className="blocha">
                                    <h1 style={{ color: '#fff', fontWeight: '600' }}>BLOCHA</h1>
                                    <h6>42<small>B</small> Ho Ba Phan, district 9, Ho Chi Minh city</h6>
                                </div>
                                <ul id="remove-dot">
                                    <li>
                                        <Link to="#">(+84)&nbsp;1674 834 476</Link>
                                    </li>
                                    <li>
                                        <Link to="#">blocha@gmail.com</Link>
                                    </li>
                                </ul>
                                <ul className="social-icon">
                                    <li>
                                        <Link to="#">
                                            <i className="fab fa-facebook-f social-fix" title="Facebook"></i>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#">
                                            <i className="fab fa-instagram social-fix" title="Instagram"></i>
                                        </Link>

                                    </li>
                                    <li>
                                        <Link to="#">
                                            <i className="fab fa-twitter social-fix" title="Twitter"></i>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#">
                                            <i className="fab fa-github social-fix" title="Github"></i>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-sm-3 footer-border-right pt-4">
                                <div className="address pb-1" id="underline">
                                    <h3 style={{ color: '#fff' }}>Customer Services</h3>
                                </div>
                                <ul id="remove-dot">
                                    <li>
                                        <Link to="#">&nbsp;Privacy Policy</Link>
                                    </li>
                                    <li>
                                        <Link to="#">&nbsp;Terms & Conditions</Link>
                                    </li>
                                    <li>
                                        <Link to="#">&nbsp;Sitemap</Link>
                                    </li>
                                    <li>
                                        <Link to="#">&nbsp;Brands</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-sm-3 footer-border-right pt-4">
                                <div className="address pb-1" id="underline">
                                    <h3 style={{ color: '#fff' }}>About Blocha</h3>
                                </div>
                                <ul id="remove-dot">
                                    <li>
                                        <Link to="#">&nbsp;Company Information</Link>
                                    </li>
                                    <li>
                                        <Link to="#">&nbsp;News</Link>
                                    </li>
                                    <li>
                                        <Link to="#">&nbsp;Careers</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-sm-3 footer-border-left pt-4">
                                <div className="address pb-1" id="underline">
                                    <h3 style={{ color: '#fff' }}>Help & Contact</h3>
                                </div>
                                <ul id="remove-dot">
                                    <li>
                                        <Link to="#">&nbsp;Contact Us</Link>
                                    </li>
                                    <li>
                                        <Link to="#">&nbsp;Blocha Return</Link>
                                    </li>
                                    <li>
                                        <Link to="#">&nbsp;Support</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-sm-12 d-flex justify-content-center pt-3">
                                <p style={{ color: '#808189' }}>Copyright &copy; 2018 The BlochaTeam. All Rights Reserved.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Footer