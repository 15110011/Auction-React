import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import '../styles/styles.css'

class Features extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12 pt-3">
                        <div className="container ads-panel light-word">
                            <h4>START BIDDING NOW!!</h4>
                            <p>From cars to diamonds to iPhones, we have it all. <span style={{ color: '#eda52f' }}>Most auctions start at $1</span></p>
                            <p>Fun auction format | Trusted deals | Proceeds that go back to communities</p>
                        </div>
                    </div>
                    <div className="col-sm-12 pt-5">
                        <div className="category-header">
                            <div className="line"></div>
                            <div className="title-cate">Vehicles</div>
                            <div className="icon-cate"><i className="fas fa-car"></i></div>
                        </div>
                        <small>We offer affordable rare cars, trucks and vans – hybrids and more...</small>
                        <div className="row pt-2">
                            {/* VEHICLES START */}
                            <div className="col-sm-6 col-md-4 col-lg-3">
                                <Link to="#">
                                    <div className="cate-product">
                                        <img style={{ borderRadius: '5px' }} className="img-fluid" src="./images/car.jpg" alt="category" />
                                        <div className="bid-hover text-center" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <i className="fas fa-gavel" id="bid-harmer"></i>
                                        </div>
                                    </div>
                                </Link>
                                <div className="cate-product-panel pt-2">
                                    <Link to="#">
                                        Quang Trung Quốc
                                    </Link>
                                    <p>Time Left: 05:30:30 | Current: 3 ETH</p>
                                </div>
                            </div>
                            <div className="col-sm-6 col-md-4 col-lg-3">
                                <Link to="#">
                                    <div className="cate-product">
                                        <img style={{ borderRadius: '5px' }} className="img-fluid" src="./images/car.jpg" alt="category" />
                                        <div className="bid-hover text-center" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <i className="fas fa-gavel" id="bid-harmer"></i>
                                        </div>
                                    </div>
                                </Link>
                                <div className="cate-product-panel pt-2">
                                    <Link to="#">
                                        Quang Trung Quốc
                                    </Link>
                                    <p>Time Left: 05:30:30 | Current: 3 ETH</p>
                                </div>
                            </div>
                            <div className="col-sm-6 col-md-4 col-lg-3">
                                <Link to="#">
                                    <div className="cate-product">
                                        <img style={{ borderRadius: '5px' }} className="img-fluid" src="./images/car.jpg" alt="category" />
                                        <div className="bid-hover text-center" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <i className="fas fa-gavel" id="bid-harmer"></i>
                                        </div>
                                    </div>
                                </Link>
                                <div className="cate-product-panel pt-2">
                                    <Link to="#">
                                        Quang Trung Quốc
                                    </Link>
                                    <p>Time Left: 05:30:30 | Current: 3 ETH</p>
                                </div>
                            </div>
                            <div className="col-sm-6 col-md-4 col-lg-3">
                                <Link to="#">
                                    <div className="cate-product">
                                        <img style={{ borderRadius: '5px' }} className="img-fluid" src="./images/car.jpg" alt="category" />
                                        <div className="bid-hover text-center" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <i className="fas fa-gavel" id="bid-harmer"></i>
                                        </div>
                                    </div>
                                </Link>
                                <div className="cate-product-panel pt-2">
                                    <Link to="#">
                                        Quang Trung Quốc
                                    </Link>
                                    <p>Time Left: 05:30:30 | Current: 3 ETH</p>
                                </div>
                            </div>
                            {/* VEHICLES END */}
                            <div className="col-sm-6 pt-5">
                                <div className="category-header">
                                    <div className="line"></div>
                                    <div className="title-cate">Jewelry</div>
                                    <div className="icon-cate"><i className="fas fa-gem"></i></div>
                                </div>
                                <small>Online jewelry auctions where you can bid now diamonds, gemstones, gold and silver...</small>
                                {/* JEWELRY START */}
                                <div className="row pt-2">
                                    <div className="col-sm-6">
                                        <Link to="#">
                                            <div className="cate-product">
                                                <img style={{ borderRadius: '5px' }} className="img-fluid" src="./images/car.jpg" alt="category" />
                                                <div className="bid-hover text-center" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                    <i className="fas fa-gavel" id="bid-harmer"></i>
                                                </div>
                                            </div>
                                        </Link>
                                        <div className="cate-product-panel pt-2">
                                            <Link to="#">
                                                Quang Trung Quốc 1
                                            </Link>
                                            <p>Time Left: 05:30:30 | Current: 3 ETH</p>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <Link to="#">
                                            <div className="cate-product">
                                                <img style={{ borderRadius: '5px' }} className="img-fluid" src="./images/car.jpg" alt="category" />
                                                <div className="bid-hover text-center" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                    <i className="fas fa-gavel" id="bid-harmer"></i>
                                                </div>
                                            </div>
                                        </Link>
                                        <div className="cate-product-panel pt-2">
                                            <Link to="#">
                                                Quang Trung Quốc 1
                                            </Link>
                                            <p>Time Left: 05:30:30 | Current: 3 ETH</p>
                                        </div>
                                    </div>
                                    {/* JEWELRY END */}
                                </div>
                            </div>
                            <div className="col-sm-6 pt-5">
                                <div className="category-header">
                                    <div className="line"></div>
                                    <div className="title-cate">Coins</div>
                                    <div className="icon-cate"><i className="fab fa-bitcoin"></i></div>
                                </div>
                                <small>Discover rare, foreign, & ancient coins that are worth collecting...</small>
                                <div className="row pt-2">
                                    {/* COINS START */}
                                    <div className="col-sm-6">
                                        <Link to="#">
                                            <div className="cate-product">
                                                <img style={{ borderRadius: '5px' }} className="img-fluid" src="./images/car.jpg" alt="category" />
                                                <div className="bid-hover text-center" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                    <i className="fas fa-gavel" id="bid-harmer"></i>
                                                </div>
                                            </div>
                                        </Link>
                                        <div className="cate-product-panel pt-2">
                                            <Link to="#">
                                                Quang Trung Quốc 1
                                            </Link>
                                            <p>Time Left: 05:30:30 | Current: 3 ETH</p>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <Link to="#">
                                            <div className="cate-product">
                                                <img style={{ borderRadius: '5px' }} className="img-fluid" src="./images/car.jpg" alt="category" />
                                                <div className="bid-hover text-center" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                    <i className="fas fa-gavel" id="bid-harmer"></i>
                                                </div>
                                            </div>
                                        </Link>
                                        <div className="cate-product-panel pt-2">
                                            <Link to="#">
                                                Quang Trung Quốc 1
                                            </Link>
                                            <p>Time Left: 05:30:30 | Current: 3 ETH</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* COINS END */}
                            <div className="col-sm-12 pt-5">
                                <div className="container ads-panel2 light-word">
                                    <h4>AUCTIONBLOCHA.GA</h4>
                                    <p><span style={{ color: '#eda52f' }}>Auctions beyond Actions</span></p>
                                    <p>Fun auction format | Trusted deals | Proceeds that go back to communities</p>
                                </div>
                            </div>
                            <div className="col-sm-12 pt-5">
                                <div className="category-header">
                                    <div className="line"></div>
                                    <div className="title-cate">Books</div>
                                    <div className="icon-cate"><i className="fas fa-book"></i></div>
                                </div>
                                <small>We offer affordable rare cars, trucks and vans – hybrids and more...</small>
                                <div className="row pt-2">
                                    {/* BOOKS START */}
                                    <div className="col-sm-6 col-md-4 col-lg-3">
                                        <Link to="#">
                                            <div className="cate-product">
                                                <img style={{ borderRadius: '5px' }} className="img-fluid" src="./images/car.jpg" alt="category" />
                                                <div className="bid-hover text-center" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                    <i className="fas fa-gavel" id="bid-harmer"></i>
                                                </div>
                                            </div>
                                        </Link>
                                        <div className="cate-product-panel pt-2">
                                            <Link to="#">
                                                Quang Trung Quốc
                                        </Link>
                                            <p>Time Left: 05:30:30 | Current: 3 ETH</p>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-md-4 col-lg-3">
                                        <Link to="#">
                                            <div className="cate-product">
                                                <img style={{ borderRadius: '5px' }} className="img-fluid" src="./images/car.jpg" alt="category" />
                                                <div className="bid-hover text-center" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                    <i className="fas fa-gavel" id="bid-harmer"></i>
                                                </div>
                                            </div>
                                        </Link>
                                        <div className="cate-product-panel pt-2">
                                            <Link to="#">
                                                Quang Trung Quốc
                                            </Link>
                                            <p>Time Left: 05:30:30 | Current: 3 ETH</p>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-md-4 col-lg-3">
                                        <Link to="#">
                                            <div className="cate-product">
                                                <img style={{ borderRadius: '5px' }} className="img-fluid" src="./images/car.jpg" alt="category" />
                                                <div className="bid-hover text-center" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                    <i className="fas fa-gavel" id="bid-harmer"></i>
                                                </div>
                                            </div>
                                        </Link>
                                        <div className="cate-product-panel pt-2">
                                            <Link to="#">
                                                Quang Trung Quốc
                                            </Link>
                                            <p>Time Left: 05:30:30 | Current: 3 ETH</p>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-md-4 col-lg-3">
                                        <Link to="#">
                                            <div className="cate-product">
                                                <img style={{ borderRadius: '5px' }} className="img-fluid" src="./images/car.jpg" alt="category" />
                                                <div className="bid-hover text-center" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                    <i className="fas fa-gavel" id="bid-harmer"></i>
                                                </div>
                                            </div>
                                        </Link>
                                        <div className="cate-product-panel pt-2">
                                            <Link to="#">
                                                Quang Trung Quốc
                                            </Link>
                                            <p>Time Left: 05:30:30 | Current: 3 ETH</p>
                                        </div>
                                    </div>
                                    {/* BOOKS END */}
                                    <div className="col-sm-6">
                                        <div className="category-header">
                                            <div className="line"></div>
                                            <div className="title-cate">Art</div>
                                            <div className="icon-cate"><i className="fas fa-image"></i></div>
                                        </div>
                                        <small>Online jewelry auctions where you can bid now and save money – diamonds, gemstones, gold and silver...</small>
                                        {/* ARTS START */}
                                        <div className="row pt-2">
                                            <div className="col-sm-6">
                                                <Link to="#">
                                                    <div className="cate-product">
                                                        <img style={{ borderRadius: '5px' }} className="img-fluid" src="./images/car.jpg" alt="category" />
                                                        <div className="bid-hover text-center" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                            <i className="fas fa-gavel" id="bid-harmer"></i>
                                                        </div>
                                                    </div>
                                                </Link>
                                                <div className="cate-product-panel pt-2">
                                                    <Link to="#">
                                                        Quang Trung Quốc 1
                                            </Link>
                                                    <p>Time Left: 05:30:30 | Current: 3 ETH</p>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <Link to="#">
                                                    <div className="cate-product">
                                                        <img style={{ borderRadius: '5px' }} className="img-fluid" src="./images/car.jpg" alt="category" />
                                                        <div className="bid-hover text-center" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                            <i className="fas fa-gavel" id="bid-harmer"></i>
                                                        </div>
                                                    </div>
                                                </Link>
                                                <div className="cate-product-panel pt-2">
                                                    <Link to="#">
                                                        Quang Trung Quốc 1
                                            </Link>
                                                    <p>Time Left: 05:30:30 | Current: 3 ETH</p>
                                                </div>
                                            </div>
                                            {/* ARTS END */}
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="category-header">
                                            <div className="line"></div>
                                            <div className="title-cate">Electronics</div>
                                            <div className="icon-cate"><i className="fas fa-power-off"></i></div>
                                        </div>
                                        <small>Discover rare, foreign, & ancient coins that are worth collecting...</small>
                                        <div className="row pt-2">
                                            {/* ELECTRONICS START */}
                                            <div className="col-sm-6">
                                                <Link to="#">
                                                    <div className="cate-product">
                                                        <img style={{ borderRadius: '5px' }} className="img-fluid" src="./images/car.jpg" alt="category" />
                                                        <div className="bid-hover text-center" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                            <i className="fas fa-gavel" id="bid-harmer"></i>
                                                        </div>
                                                    </div>
                                                </Link>
                                                <div className="cate-product-panel pt-2">
                                                    <Link to="#">
                                                        Quang Trung Quốc 1
                                                    </Link>
                                                    <p>Time Left: 05:30:30 | Current: 3 ETH</p>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <Link to="#">
                                                    <div className="cate-product">
                                                        <img style={{ borderRadius: '5px' }} className="img-fluid" src="./images/car.jpg" alt="category" />
                                                        <div className="bid-hover text-center" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                            <i className="fas fa-gavel" id="bid-harmer"></i>
                                                        </div>
                                                    </div>
                                                </Link>
                                                <div className="cate-product-panel pt-2">
                                                    <Link to="#">
                                                        Quang Trung Quốc 1
                                                    </Link>
                                                    <p>Time Left: 05:30:30 | Current: 3 ETH</p>
                                                </div>
                                            </div>
                                            {/* ELECTRONICS END */}
                                        </div>
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