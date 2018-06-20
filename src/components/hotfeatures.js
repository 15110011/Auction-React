import React, { Component } from 'react';
import { render } from 'react-dom'
import { Link } from 'react-router-dom'
import '../styles/styles.css'

class Features extends Component {
    render() {
        return (
            <div>
                <div className="about-wrapper bgrfeat" role="scroll-destination">
                    <div className="container feat">
                        <div className="about text-center">
                            <h2>Today feature's collection</h2>
                        </div>
                        <div className="features text-center">
                            <div className="row">
                                <div className="col-sm-4 feature">
                                    <img src="/images/car.jpg" alt="car" />
                                    <br />
                                    <div
                                        className="feature-name"
                                        style={{
                                            color: "#14acc2"
                                        }}
                                    >
                                        <h3>Cars</h3>
                                    </div>
                                </div>
                                <div className="col-sm-4 feature">
                                    <img src="/images/house.jpg" alt="car" />
                                    <br />
                                    <div
                                        className="feature-name"
                                        style={{
                                            color: "#14acc2"
                                        }}
                                    >
                                        <h3>House</h3>
                                    </div>
                                </div>
                                <div className="col-sm-4 feature">
                                    <img src="/images/diamond.jpg" alt="car" />
                                    <br />
                                    <div
                                        className="feature-name"
                                        style={{
                                            color: "#14acc2"
                                        }}
                                    >
                                        <h3>Diamond</h3>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <hr />
                            <br />
                            <div className="row">
                                <div className="col-sm-4 feature">
                                    <img src="/images/ring.jpg" alt="car" />
                                    <br />
                                    <div
                                        className="feature-name"
                                        style={{
                                            color: "#14acc2"
                                        }}
                                    >
                                        <h3>Rings</h3>
                                    </div>
                                </div>
                                <div className="col-sm-4 feature">
                                    <img src="/images/coin.jpg" alt="car" />
                                    <br />
                                    <div
                                        className="feature-name"
                                        style={{
                                            color: "#14acc2"
                                        }}
                                    >
                                        <h3>Coins</h3>
                                    </div>
                                </div>
                                <div className="col-sm-4 feature">
                                    <img src="/images/cigar.jpg" alt="car" />
                                    <br />
                                    <div
                                        className="feature-name"
                                        style={{
                                            color: "#14acc2"
                                        }}
                                    >
                                        <h3>Cigars</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Features