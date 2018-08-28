import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import '../styles/styles.css'
import Features from './hotfeatures';
import Carousel from './Carousel';


class HomePage extends Component {

    state = {
        showCategory: true
    }

    handleShowCate = () => {
        if (this.mounted)
            this.setState({
                showCategory: !this.state.showCategory
            })
    }

    render() {
        return (
            <div>
                <div className="logo">
                    <div className="container">
                        <div className="row" id="logo">
                            <div className="col-md-5 image">
                                <img src="./images/logo.png" alt="Logo" />
                            </div>
                            <div className="col-md-7 light-word" id="word">
                                <h1 className="team-tittle" id="light-word" style={{ fontWeight: '600' }}>Auctions Beyond Actions</h1>
                                <p>
                                    We are here to offer you great deals of the most exclusive and beautiful items in the world.
                                    When participate in our auction system
                                </p>
                                <p>You will have:</p>
                                <ul>
                                    <li>Bidding of the world's rarest items</li>
                                    <li>All items have been verified by experts</li>
                                    <li>Measured by experienced people</li>
                                </ul>
                                <center>
                                    <Link to="/faq" id="quote"> The Blocha Team</Link>
                                    <span className="text-muted"> ♥</span>
                                </center>
                            </div>
                        </div>
                    </div>
                    {/* <button className="btn btn-primary position-fixed" style={{ top: '8%' }} onClick={this.handleShowCate}>Category</button>
                    <CategoryShow show={this.state.showCategory} /> */}
                </div>
                <Carousel />
                <Features />
                <br />
                
            </div>
        )
    }
}
export default HomePage