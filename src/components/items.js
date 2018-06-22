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
                                    <Link className="detail" to="/itemdetail"><img src="/images/car.jpg" alt="item" /></Link>
                                </div>
                                <div className="time-price">
                                    <div className="row d-flex justify-content-between">
                                        <div className="col-md-6">00:00:00</div>
                                        <div className="col-md-6" id="price">$200</div>
                                    </div>
                                </div>
                            </div>
                            <Link class="btn btnbid" to="/itemdetail" role="button"><i class="fas fa-gavel"></i> Bid now</Link>
                        </div>
                        <div className="col-md-3">
                            <div className="itemborder">
                                <div className="item-image">
                                    <Link className="detail" to="/itemdetail"><img src="/images/car.jpg" alt="item" /></Link>
                                </div>
                                <div className="time-price">
                                    <div className="row d-flex justify-content-between">
                                        <div className="col-md-6">00:00:00</div>
                                        <div className="col-md-6" id="price">$200</div>
                                    </div>
                                </div>
                            </div>
                            <Link class="btn btnbid" to="/itemdetail" role="button"><i class="fas fa-gavel"></i> Bid now</Link>
                        </div>
                        <div className="col-md-3">
                            <div className="itemborder">
                                <div className="item-image">
                                    <Link className="detail" to="/itemdetail"><img src="/images/car.jpg" alt="item" /></Link>
                                </div>
                                <div className="time-price">
                                    <div className="row d-flex justify-content-between">
                                        <div className="col-md-6">00:00:00</div>
                                        <div className="col-md-6" id="price">$200</div>
                                    </div>
                                </div>
                            </div>
                            <Link class="btn btnbid" to="/itemdetail" role="button"><i class="fas fa-gavel"></i> Bid now</Link>
                        </div>
                        <div className="col-md-3">
                            <div className="itemborder">
                                <div className="item-image">
                                    <Link className="detail" to="/itemdetail"><img src="/images/car.jpg" alt="item" /></Link>
                                </div>
                                <div className="time-price">
                                    <div className="row d-flex justify-content-between">
                                        <div className="col-md-6">00:00:00</div>
                                        <div className="col-md-6" id="price">$200</div>
                                    </div>
                                </div>
                            </div>
                            <Link class="btn btnbid" to="/itemdetail" role="button"><i class="fas fa-gavel"></i> Bid now</Link>
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-md-3">
                            <div className="itemborder">
                                <div className="item-image">
                                    <Link className="detail" to="/itemdetail"><img src="/images/car.jpg" alt="item" /></Link>
                                </div>
                                <div className="time-price">
                                    <div className="row d-flex justify-content-between">
                                        <div className="col-md-6">00:00:00</div>
                                        <div className="col-md-6" id="price">$200</div>
                                    </div>
                                </div>
                            </div>
                            <Link class="btn btnbid" to="/itemdetail" role="button"><i class="fas fa-gavel"></i> Bid now</Link>
                        </div>
                        <div className="col-md-3">
                            <div className="itemborder">
                                <div className="item-image">
                                    <Link className="detail" to="/itemdetail"><img src="/images/car.jpg" alt="item" /></Link>
                                </div>
                                <div className="time-price">
                                    <div className="row d-flex justify-content-between">
                                        <div className="col-md-6">00:00:00</div>
                                        <div className="col-md-6" id="price">$200</div>
                                    </div>
                                </div>
                            </div>
                            <Link class="btn btnbid" to="/itemdetail" role="button"><i class="fas fa-gavel"></i> Bid now</Link>
                        </div>
                        <div className="col-md-3">
                            <div className="itemborder">
                                <div className="item-image">
                                    <Link className="detail" to="/itemdetail"><img src="/images/car.jpg" alt="item" /></Link>
                                </div>
                                <div className="time-price">
                                    <div className="row d-flex justify-content-between">
                                        <div className="col-md-6">00:00:00</div>
                                        <div className="col-md-6" id="price">$200</div>
                                    </div>
                                </div>
                            </div>
                            <Link class="btn btnbid" to="/itemdetail" role="button"><i class="fas fa-gavel"></i> Bid now</Link>
                        </div>
                        <div className="col-md-3">
                            <div className="itemborder">
                                <div className="item-image">
                                    <Link className="detail" to="/itemdetail"><img src="/images/car.jpg" alt="item" /></Link>
                                </div>
                                <div className="time-price">
                                    <div className="row d-flex justify-content-between">
                                        <div className="col-md-6">00:00:00</div>
                                        <div className="col-md-6" id="price">$200</div>
                                    </div>
                                </div>
                            </div>
                            <Link class="btn btnbid" to="/itemdetail" role="button"><i class="fas fa-gavel"></i> Bid now</Link>
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-md-3">
                            <div className="itemborder">
                                <div className="item-image">
                                    <Link className="detail" to="/itemdetail"><img src="/images/car.jpg" alt="item" /></Link>
                                </div>
                                <div className="time-price">
                                    <div className="row d-flex justify-content-between">
                                        <div className="col-md-6">00:00:00</div>
                                        <div className="col-md-6" id="price">$200</div>
                                    </div>
                                </div>
                            </div>
                            <Link class="btn btnbid" to="/itemdetail" role="button"><i class="fas fa-gavel"></i> Bid now</Link>
                        </div>
                        <div className="col-md-3">
                            <div className="itemborder">
                                <div className="item-image">
                                    <Link className="detail" to="/itemdetail"><img src="/images/car.jpg" alt="item" /></Link>
                                </div>
                                <div className="time-price">
                                    <div className="row d-flex justify-content-between">
                                        <div className="col-md-6">00:00:00</div>
                                        <div className="col-md-6" id="price">$200</div>
                                    </div>
                                </div>
                            </div>
                            <Link class="btn btnbid" to="/itemdetail" role="button"><i class="fas fa-gavel"></i> Bid now</Link>
                        </div>
                        <div className="col-md-3">
                            <div className="itemborder">
                                <div className="item-image">
                                    <Link className="detail" to="/itemdetail"><img src="/images/car.jpg" alt="item" /></Link>
                                </div>
                                <div className="time-price">
                                    <div className="row d-flex justify-content-between">
                                        <div className="col-md-6">00:00:00</div>
                                        <div className="col-md-6" id="price">$200</div>
                                    </div>
                                </div>
                            </div>
                            <Link class="btn btnbid" to="/itemdetail" role="button"><i class="fas fa-gavel"></i> Bid now</Link>
                        </div>
                        <div className="col-md-3">
                            <div className="itemborder">
                                <div className="item-image">
                                    <Link className="detail" to="/itemdetail"><img src="/images/car.jpg" alt="item" /></Link>
                                </div>
                                <div className="time-price">
                                    <div className="row d-flex justify-content-between">
                                        <div className="col-md-6">00:00:00</div>
                                        <div className="col-md-6" id="price">$200</div>
                                    </div>
                                </div>
                            </div>
                            <Link class="btn btnbid" to="/itemdetail" role="button"><i class="fas fa-gavel"></i> Bid now</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Items
