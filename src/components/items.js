import React, { Component } from 'react'
import { render } from 'react-dom'
import { Link } from 'react-router-dom'
import '../styles/styles.css'
import Header from './header';
import Footer from './footer';

class Items extends Component {
    render() {
        return (
            <div>
                <div className="container">
                    <br/>
                    <div className="row">
                        <div className="col-md-3">
                            <div className="itemborder">
                                <div className="item-image">
                                    <img src="/images/car.jpg" alt="item" />
                                </div>
                                <div className="time-price">
                                    <div className="row d-flex justify-content-between">
                                        <div className="col-md-6">00:00:00</div>
                                        <div className="col-md-6" id="price">$200</div>
                                    </div>
                                </div>
                            </div>
                            <button className="btn btnbid"><i class="fas fa-gavel"></i> Bid now</button>
                        </div>
                        <div className="col-md-3">
                            <div className="itemborder">
                                <div className="item-image">
                                    <img src="/images/car.jpg" alt="item" />
                                </div>
                                <div className="time-price">
                                    <div className="row d-flex justify-content-between">
                                        <div className="col-md-6">00:00:00</div>
                                        <div className="col-md-6" id="price">$200</div>
                                    </div>
                                </div>
                            </div>
                            <button className="btn btnbid"><i class="fas fa-gavel"></i> Bid now</button>
                        </div>
                        <div className="col-md-3">
                            <div className="itemborder">
                                <div className="item-image">
                                    <img src="/images/car.jpg" alt="item" />
                                </div>
                                <div className="time-price">
                                    <div className="row d-flex justify-content-between">
                                        <div className="col-md-6">00:00:00</div>
                                        <div className="col-md-6" id="price">$200</div>
                                    </div>
                                </div>
                            </div>
                            <button className="btn btnbid"><i class="fas fa-gavel"></i> Bid now</button>
                        </div>
                        <div className="col-md-3">
                            <div className="itemborder">
                                <div className="item-image">
                                    <img src="/images/car.jpg" alt="item" />
                                </div>
                                <div className="time-price">
                                    <div className="row d-flex justify-content-between">
                                        <div className="col-md-6">00:00:00</div>
                                        <div className="col-md-6" id="price">$200</div>
                                    </div>
                                </div>
                            </div>
                            <button className="btn btnbid"><i class="fas fa-gavel"></i> Bid now</button>
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-md-3">
                            <div className="itemborder">
                                <div className="item-image">
                                    <img src="/images/car.jpg" alt="item" />
                                </div>
                                <div className="time-price">
                                    <div className="row d-flex justify-content-between">
                                        <div className="col-md-6">00:00:00</div>
                                        <div className="col-md-6" id="price">$200</div>
                                    </div>
                                </div>
                            </div>
                            <button className="btn btnbid"><i class="fas fa-gavel"></i> Bid now</button>
                        </div>
                        <div className="col-md-3">
                            <div className="itemborder">
                                <div className="item-image">
                                    <img src="/images/car.jpg" alt="item" />
                                </div>
                                <div className="time-price">
                                    <div className="row d-flex justify-content-between">
                                        <div className="col-md-6">00:00:00</div>
                                        <div className="col-md-6" id="price">$200</div>
                                    </div>
                                </div>
                            </div>
                            <button className="btn btnbid"><i class="fas fa-gavel"></i> Bid now</button>
                        </div>
                        <div className="col-md-3">
                            <div className="itemborder">
                                <div className="item-image">
                                    <img src="/images/car.jpg" alt="item" />
                                </div>
                                <div className="time-price">
                                    <div className="row d-flex justify-content-between">
                                        <div className="col-md-6">00:00:00</div>
                                        <div className="col-md-6" id="price">$200</div>
                                    </div>
                                </div>
                            </div>
                            <button className="btn btnbid"><i class="fas fa-gavel"></i> Bid now</button>
                        </div>
                        <div className="col-md-3">
                            <div className="itemborder">
                                <div className="item-image">
                                    <img src="/images/car.jpg" alt="item" />
                                </div>
                                <div className="time-price">
                                    <div className="row d-flex justify-content-between">
                                        <div className="col-md-6">00:00:00</div>
                                        <div className="col-md-6" id="price">$200</div>
                                    </div>
                                </div>
                            </div>
                            <button className="btn btnbid"><i class="fas fa-gavel"></i> Bid now</button>
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-md-3">
                            <div className="itemborder">
                                <div className="item-image">
                                    <img src="/images/car.jpg" alt="item" />
                                </div>
                                <div className="time-price">
                                    <div className="row d-flex justify-content-between">
                                        <div className="col-md-6">00:00:00</div>
                                        <div className="col-md-6" id="price">$200</div>
                                    </div>
                                </div>
                            </div>
                            <button className="btn btnbid"><i class="fas fa-gavel"></i> Bid now</button>
                        </div>
                        <div className="col-md-3">
                            <div className="itemborder">
                                <div className="item-image">
                                    <img src="/images/car.jpg" alt="item" />
                                </div>
                                <div className="time-price">
                                    <div className="row d-flex justify-content-between">
                                        <div className="col-md-6">00:00:00</div>
                                        <div className="col-md-6" id="price">$200</div>
                                    </div>
                                </div>
                            </div>
                            <button className="btn btnbid"><i class="fas fa-gavel"></i> Bid now</button>
                        </div>
                        <div className="col-md-3">
                            <div className="itemborder">
                                <div className="item-image">
                                    <img src="/images/car.jpg" alt="item" />
                                </div>
                                <div className="time-price">
                                    <div className="row d-flex justify-content-between">
                                        <div className="col-md-6">00:00:00</div>
                                        <div className="col-md-6" id="price">$200</div>
                                    </div>
                                </div>
                            </div>
                            <button className="btn btnbid"><i class="fas fa-gavel"></i> Bid now</button>
                        </div>
                        <div className="col-md-3">
                            <div className="itemborder">
                                <div className="item-image">
                                    <img src="/images/car.jpg" alt="item" />
                                </div>
                                <div className="time-price">
                                    <div className="row d-flex justify-content-between">
                                        <div className="col-md-6">00:00:00</div>
                                        <div className="col-md-6" id="price">$200</div>
                                    </div>
                                </div>
                            </div>
                            <button className="btn btnbid"><i class="fas fa-gavel"></i> Bid now</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Items
