import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import '../styles/styles.css'
import { API_URL, fromMillisecondsToFormattedString } from '../config'

class Features extends Component {
    state = {
        Jewelry: [],
        Vehicles: [],
        Coins: [],
        Books: [],
        Art: [],
        Electronics: [],
        currentTime: 0
    }
    componentDidMount() {
        fetch(`${API_URL}/api/v1/liveItems`)
            .then(res => res.json())
            .then(items => {
                let realTimeItems = items.realTimeItems
                realTimeItems.forEach((item) => {
                    let cloneCat = [].concat(this.state[item.catName])
                    cloneCat.push(item)
                    this.setState({
                        [item.catName]: cloneCat
                    })
                })
                this.currentInterval = setInterval(() => {
                    this.setState({ currentTime: new Date().getTime() })
                }, 1000)
            })
    }

    render() {
        const { Vehicles, Jewelry, Coins, Books, Art, Electronics, currentTime } = this.state
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
                            <div className="col-12">
                                <div className="row">
                                    {
                                        Vehicles.length > 0 ? Vehicles.map((vehicle, i) => {
                                            if (vehicle.endTime - currentTime > 0 && i <= 3) {
                                                return (
                                                    <div className="col-sm-6 col-md-4 col-lg-3" key={vehicle.itemId}>
                                                        <Link to={`/items/${vehicle.itemId}`}>
                                                            <div className="cate-product">
                                                                {vehicle.link ?
                                                                    <img style={{ borderRadius: '5px' }} className="img-fluid" src={`${root}/uploads/${vehicle.link}`} alt="category" />
                                                                    :
                                                                    <img className="img-fluid"
                                                                        src={`http://www.staticwhich.co.uk/static/images/products/no-image/no-image-available.png`} alt="" />}
                                                                <div className="bid-hover text-center"
                                                                    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                                    <i className="fas fa-gavel" id="bid-harmer"></i>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                        <div className="cate-product-panel pt-2">
                                                            <Link to={`/items/${vehicle.itemId}`}>
                                                                {vehicle.itemName}
                                                            </Link>
                                                            <p>Time Left: {fromMillisecondsToFormattedString(vehicle.endTime - currentTime)}
                                                                | Current: {vehicle.curPrice} ETH
                                                            </p>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                            return null
                                        }) :
                                            <div className='d-flex col-12 justify-content-center pt-5 pb-2'>
                                                <p className="text-uppercase h5">No items in this category</p>
                                            </div>
                                    }
                                </div>
                            </div>
                            {/* VEHICLES END */}
                            <div className="col-sm-6 pt-5">
                                <div className="category-header">
                                    <div className="line"></div>
                                    <div className="title-cate">Jewelry</div>
                                    <div className="icon-cate"><i className="fas fa-gem"></i></div>
                                </div>
                                <small>Online jewelry auctions where you can bid now and save money </small>
                                {/* JEWELRY START */}
                                <div className="row pt-2">
                                    <div className="col-12">
                                        <div class="row">
                                            {
                                                Jewelry.length > 0 ? Jewelry.map((jewelry, i) => {
                                                    if (jewelry.endTime - currentTime > 0 && i <= 2) {
                                                        return (<div className="col-sm-6">
                                                            <Link to="#">
                                                                <div className="cate-product">
                                                                    {jewelry.link ?
                                                                        <img style={{ borderRadius: '5px' }} className="img-fluid" src={`${root}/uploads/${jewelry.link}`} alt="category" />
                                                                        :
                                                                        <img style={{ borderRadius: '5px' }} className="img-fluid" src={`http://www.staticwhich.co.uk/static/images/products/no-image/no-image-available.png`}
                                                                            alt="category" />
                                                                    }

                                                                    <div className="bid-hover text-center" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                                        <i className="fas fa-gavel" id="bid-harmer"></i>
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                            <div className="cate-product-panel pt-2">
                                                                <Link to={`/items/${jewelry.itemId}`}>
                                                                    {jewelry.itemName}
                                                                </Link>
                                                                <p>Time Left: {fromMillisecondsToFormattedString(jewelry.endTime - currentTime)} | Current: {jewelry.curPrice}</p>
                                                            </div>
                                                        </div>)
                                                    }
                                                    return null
                                                }
                                                ) :
                                                    <div className='d-flex col-12 justify-content-center pt-5 pb-2'>
                                                        <p className="text-uppercase h5">No items in this category</p>
                                                    </div>
                                            }

                                        </div>
                                    </div>
                                </div>
                                {/* JEWELRY END */}
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
                                    <div className="col-12">
                                        <div className="row">

                                            {
                                                Coins.length > 0 ? Coins.map((coin, i) => {
                                                    if (coin.endTime - currentTime > 0 && i <= 2) {

                                                        return (<div className="col-sm-6">
                                                            <Link to="#">
                                                                <div className="cate-product">
                                                                    {coin.link ?
                                                                        <img style={{ borderRadius: '5px' }} className="img-fluid" src={`${root}/uploads/${coin.link}`} alt="category" />
                                                                        :
                                                                        <img style={{ borderRadius: '5px' }} className="img-fluid" src={`http://www.staticwhich.co.uk/static/images/products/no-image/no-image-available.png`}
                                                                            alt="category" />
                                                                    }

                                                                    <div className="bid-hover text-center" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                                        <i className="fas fa-gavel" id="bid-harmer"></i>
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                            <div className="cate-product-panel pt-2">
                                                                <Link to={`/items/${coin.itemId}`}>
                                                                    {coin.itemName}
                                                                </Link>
                                                                <p>Time Left: {fromMillisecondsToFormattedString(coin.endTime - currentTime)} | Current: {coin.curPrice}</p>
                                                            </div>
                                                        </div>)
                                                    }
                                                    return null
                                                }
                                                )
                                                    :
                                                    <div className='d-flex col-12 justify-content-center pt-5 pb-2'>
                                                        <p className="text-uppercase h5">No items in this category</p>
                                                    </div>
                                            }
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
                                    <div className="col-12">
                                        <div className="row">
                                            {
                                                Books.length > 0 ? Books.map((book, i) => {
                                                    if (book.endTime - currentTime > 0 && i <= 3) {
                                                        return (
                                                            <div className="col-sm-6 col-md-4 col-lg-3" key={book.itemId}>
                                                                <Link to={`/items/${book.itemId}`}>
                                                                    <div className="cate-product">
                                                                        {book.link ?
                                                                            <img style={{ borderRadius: '5px' }} className="img-fluid" src={`${root}/uploads/${book.link}`} alt="category" />
                                                                            :
                                                                            <img className="img-fluid"
                                                                                src={`http://www.staticwhich.co.uk/static/images/products/no-image/no-image-available.png`} alt="" />}
                                                                        <div className="bid-hover text-center"
                                                                            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                                            <i className="fas fa-gavel" id="bid-harmer"></i>
                                                                        </div>
                                                                    </div>
                                                                </Link>
                                                                <div className="cate-product-panel pt-2">
                                                                    <Link to={`/items/${book.itemId}`}>
                                                                        {book.itemName}
                                                                    </Link>
                                                                    <p>Time Left: {fromMillisecondsToFormattedString(book.endTime - currentTime)}
                                                                        | Current: {book.curPrice} ETH
                                                            </p>
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                    return null
                                                }) :
                                                    <div className='d-flex col-12 justify-content-center pt-5 pb-2'>
                                                        <p className="text-uppercase h5">No items in this category</p>
                                                    </div>
                                            }
                                        </div>
                                    </div>
                                    {/* BOOKS END */}
                                    <div className="col-sm-6">
                                        <div className="category-header">
                                            <div className="line"></div>
                                            <div className="title-cate">Art</div>
                                            <div className="icon-cate"><i className="fas fa-image"></i></div>
                                        </div>
                                        <small>Online jewelry auctions where you can bid now and save money </small>
                                        {/* ARTS START */}
                                        <div className="row pt-2">
                                            <div className="col-12">
                                                <div class="row">
                                                    {
                                                        Art.length > 0 ? Art.map((art, i) => {
                                                            if (art.endTime - currentTime > 0 && i <= 1) {

                                                                return (<div className="col-sm-6">
                                                                    <Link to="#">
                                                                        <div className="cate-product">
                                                                            {art.link ?
                                                                                <img style={{ borderRadius: '5px' }} className="img-fluid" src={`${root}/uploads/${art.link}`} alt="category" />
                                                                                :
                                                                                <img style={{ borderRadius: '5px' }} className="img-fluid" src={`http://www.staticwhich.co.uk/static/images/products/no-image/no-image-available.png`}
                                                                                    alt="category" />
                                                                            }

                                                                            <div className="bid-hover text-center" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                                                <i className="fas fa-gavel" id="bid-harmer"></i>
                                                                            </div>
                                                                        </div>
                                                                    </Link>
                                                                    <div className="cate-product-panel pt-2">
                                                                        <Link to={`/items/${art.itemId}`}>
                                                                            {art.itemName}
                                                                        </Link>
                                                                        <p>Time Left: {fromMillisecondsToFormattedString(art.endTime - currentTime)} | Current: {art.curPrice}</p>
                                                                    </div>
                                                                </div>)
                                                            }
                                                            return null
                                                        }
                                                        ) :
                                                            <div className='d-flex col-12 justify-content-center pt-5 pb-2'>
                                                                <p className="text-uppercase h5">No items in this category</p>
                                                            </div>
                                                    }

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
                                            <div className="col-12">
                                                <div class="row">
                                                    {
                                                        Electronics.length > 0 ? Electronics.map((electronic, i) => {
                                                            if (electronic.endTime - currentTime > 0 && i <= 1) {
                                                                return (<div className="col-sm-6">
                                                                    <Link to="#">
                                                                        <div className="cate-product">
                                                                            {electronic.link ?
                                                                                <img style={{ borderRadius: '5px' }} className="img-fluid" src={`${root}/uploads/${electronic.link}`} alt="category" />
                                                                                :
                                                                                <img style={{ borderRadius: '5px' }} className="img-fluid" src={`http://www.staticwhich.co.uk/static/images/products/no-image/no-image-available.png`}
                                                                                    alt="category" />
                                                                            }

                                                                            <div className="bid-hover text-center" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                                                <i className="fas fa-gavel" id="bid-harmer"></i>
                                                                            </div>
                                                                        </div>
                                                                    </Link>
                                                                    <div className="cate-product-panel pt-2">
                                                                        <Link to={`/items/${electronic.itemId}`}>
                                                                            {electronic.itemName}
                                                                        </Link>
                                                                        <p>Time Left: {fromMillisecondsToFormattedString(electronic.endTime - currentTime)} | Current: {electronic.curPrice}</p>
                                                                    </div>
                                                                </div>)
                                                            }
                                                            return null
                                                        }
                                                        ) :
                                                            <div className='d-flex col-12 justify-content-center pt-5 pb-2'>
                                                                <p className="text-uppercase h5">No items in this category</p>
                                                            </div>
                                                    }

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