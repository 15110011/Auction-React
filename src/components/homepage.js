import React, { Component } from 'react';
import { render } from 'react-dom'
import { Link } from 'react-router-dom'
import '../styles/styles.css'
import Header from './header'
import Features from './hotfeatures';
import Footer from './footer';

class HomePage extends Component {
    render() {
        return (
            <div>
                <Header />
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
                                    <a href="/faq" id="quote"> The Blocha Team</a>
                                </center>

                            </div>
                        </div>
                    </div>
                </div>
                <Features />
                <Footer />
            </div>
        )
    }
}
export default HomePage