import React, { Component } from 'react';
import { render } from 'react-dom'
import { Link } from 'react-router-dom'
import '../styles/styles.css'
import Header from './header'
import Features from './hotfeatures';
import Footer from './footer';
import Particles from 'react-particles-js'

class HomePage extends Component {
    render() {
        return (
            <div>
                <div className="logo">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-5 image">
                                <img src="./images/logo.png" alt="Logo" />
                            </div>
                            <div className="col-md-7" id="word">
                                <h1>Auctions Beyond Actions</h1>
                                <p>
                                    We are here to offer you great deals of the most exclusive and beautiful items in the world.
                                    When participate in our auction system.
                                </p>
                                <p>You will have:</p>
                                <ul>
                                    <li>Bidding of the world's rarest items.</li>
                                    <li>All items have been verified by experts.</li>
                                    <li>Measured by experienced people.</li>
                                </ul>
                                <center>
                                    <span className="text-muted">♥</span>
                                    <Link to="/faq" id="quote"> The Blocha Team</Link>
                                </center>
                            </div>
                        </div>
                    </div>
                </div>
                <Features />
            </div>
        )
    }
}
export default HomePage