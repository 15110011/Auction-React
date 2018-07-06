import React, { Component } from 'react'
import { render } from 'react-dom'
import { Link } from 'react-router-dom'
import ReactImageZoom from 'react-image-zoom';
import NumericInput from 'react-numeric-input';
import '../styles/styles.css'

import _ from 'lodash';
import dateFns from 'date-fns'
import BidInput from './BidInput'
import NumberFormat from 'react-number-format';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

class ItemDetail extends Component {

    constructor(props) {
        super(props)
        this.state = {
            current: 0,
            currentBidding: 0,
            step: 5,
            itemDetail: null,
            images: [],
        }
        this.onSubmitBid = this.onSubmitBid.bind(this)
        this.onReceiveRoomMessage = this.onReceiveRoomMessage.bind(this)
    }
    componentDidMount() {
        this.props.io.socket.get('/hello', function serverResponded(body, JWR) {
            console.log('Sails responded with: ', body);
            console.log('with headers: ', JWR.headers);
            console.log('and with status code: ', JWR.statusCode);
        });
        fetch('/api/v1/items/' + this.props.match.params.id)
            .then(res => res.json())
            .then(item => {
                console.log(item)
                if (!item.error) {
                    let nextStep = Math.ceil(item.findItem.bids.length > 0 ? item.findItem.bids[0].currentPrice * 0.5 : item.findItem.currentPrice * 0.5)
                    let initBid = item.findItem.bids.length > 0 ? item.findItem.bids[0].currentPrice : item.findItem.currentPrice
                    this.props.io.socket.get('/socket/items/' + item.findItem.id, (body, JWR) => {
                        console.log(body.msg)
                    })
                    this.props.io.socket.on('room' + item.findItem.id, this.onReceiveRoomMessage)

                    this.setState({ images: item.findImg, itemDetail: item.findItem, step: nextStep, currentBidding: initBid + nextStep })
                }
                else {
                    this.setState({ itemDetail: null })
                    console.log(item.msg)
                }
            })
    }
    onReceiveRoomMessage(newBid) {
        console.log(newBid)
        // console.log(this.state.itemDetail)
        let { itemDetail } = this.state
        if (itemDetail) {
            itemDetail.bids.unshift(newBid)
            itemDetail.currentPrice = itemDetail.bids[0].currentPrice
            let nextStep = Math.ceil(itemDetail.bids[0].currentPrice * 0.5)
            this.setState({ itemDetail, step: nextStep, currentBidding: newBid.currentPrice + nextStep })
        }
    }
    setCurrentItem(current) {
        this.setState({ current })
    }
    onSubmitBid(e) {
        console.log(this.props.userId)

        e.preventDefault()
        this.props.io.socket.post('/api/v1/bid/' + this.state.itemDetail.id, {
            currentPrice: this.state.currentBidding,
            userId: this.props.userId
        }, (function (res) {
            console.log(res)

            if (!res.error) {
                let { itemDetail } = this.state
<<<<<<< HEAD
                if (itemDetail) {
                    itemDetail.bids.unshift(res.newBid)
                    itemDetail.currentPrice = itemDetail.bids[0].currentPrice
                    let nextStep = Math.ceil(itemDetail.bids[0].currentPrice * 0.5)
                    this.setState({ itemDetail, step: nextStep, currentBidding: res.newBid.currentPrice + nextStep })
                }
=======
                itemDetail.bids.unshift(res.newBid)
                itemDetail.currentPrice = itemDetail.bids[0].currentPrice
                console.log(res)
                let nextStep = Math.ceil(itemDetail.bids[0].currentPrice * 0.5)
                this.setState({ itemDetail, step: nextStep, currentBidding: res.newBid.currentPrice + nextStep })

>>>>>>> fb1da072b544cad54ec7d10f3c6e9b65091420f3
            }
            else {
                alert(res.msg)
            }

        }).bind(this))
    }
    componentWillUnmount() {
        if (this.state.itemDetail && this.state.itemDetail.id) {
            this.props.io.socket.get('/leave/items/' + this.state.itemDetail.id, (body, JWR) => {
                console.log(body.msg)
            })
        }

    }
    render() {
        const { current, items, itemDetail, images } = this.state
        if (!itemDetail) return (
            <div role="alert" style={{ marginTop: '75px' }}>
                <p className="alert alert-warning text-center light-word">Item not found</p>
            </div>
        )
        return (
            <div className="itemDetail-content">
                <div className="container">
                    <div className="row">
                        <div className="col-md-9">
                            <br />
                            <Link to='/'><i className="fas fa-backward"><span className="light-word"> Back to bid</span></i></Link>
                            <div className="items-info">
                                <div className="container pt-2">
                                    <h3>{itemDetail.name}</h3>
                                </div>
                                <hr />
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-5 item-image">
                                            <ReactImageZoom width={340} height={300} zoomWidth={450} img={"http://localhost:1337/images/items/" + images[current].link} />
                                            <div className="row thumbnail mt-2" style={{ paddingLeft: '15px', marginRight: '-30px' }}>
                                                {images.map((img, i) => (
                                                    <div className="col-sm-4 thumbnail-border" key={i}>
                                                        <img className="img-fluid" src={`http://localhost:1337/images/items/${img.link}`} alt="car" style={{ height: '100px' }} onClick={e => this.setCurrentItem(i)} />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="col-md-7">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div>
                                                        <h4>Time left: 00:00:00</h4>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <h4> Current price: <NumberFormat displayType={'text'} value={this.state.itemDetail.bids.length > 0 ? this.state.itemDetail.bids[0].currentPrice : this.state.itemDetail.currentPrice} thousandSeparator={true} prefix={'$'} />
                                                    </h4>
                                                    {/* <h4>Current price: ${this.state.itemDetail.bids.length > 0 ? this.state.itemDetail.bids[0].currentPrice : this.state.itemDetail.currentPrice}</h4> */}
                                                </div>
                                                <div className="col-md-6">
                                                </div>
                                                <div className="col-md-6">
                                                    <h4> Current step: <NumberFormat displayType={'text'} value={this.state.step} thousandSeparator={true} prefix={'$'} />
                                                    </h4>
                                                    {/* <h4>Current step: ${this.state.step}</h4> */}
                                                </div>
                                            </div>
                                            <br />
                                            <div className="bid-form">
                                                <form className="form-inline" onSubmit={this.onSubmitBid}>
                                                    <BidInput className="form-control pr-5"
                                                        value={this.state.currentBidding}
                                                        onChange={(e) => {
                                                            if (!/[A-z]/.test(e.target.value))
                                                                this.setState({ currentBidding: +e.target.value })
                                                        }}
                                                        onClickDecrease={e => {
                                                            e.preventDefault()

                                                            if (this.state.currentBidding >= this.state.step) {
                                                                this.setState({ currentBidding: (this.state.currentBidding - this.state.step) })
                                                            }
                                                        }}
                                                        onClickIncrease={e => {
                                                            e.preventDefault()
                                                            this.setState({ currentBidding: (this.state.currentBidding + this.state.step) })
                                                        }}
                                                    ></BidInput>
                                                    {/* <NumericInput min={this.state.itemDetail.currentPrice + this.state.step} step={this.state.step} value={this.state.itemDetail.currentPrice}
                                                        onChange={e => {
                                                            console.log(e)
                                                            if (e != this.state.itemDetail.currentPrice) {
                                                                this.state.itemDetail.currentPrice = e
                                                                this.setState({ itemDetail })
                                                            }
                                                        }}
                                                        mobile={true} className="form-control pr-5" /> */}
                                                    <button className="btn btn-primary ml-3" type="submit"><i className="fas fa-gavel"> Bid now</i></button>
                                                </form>
                                                {this.state.itemDetail.bids.length > 0 ? <p className="alert alert-info light-word mt-2">
                                                    Last bid by : {this.state.itemDetail.bids[0].userId.userName}
                                                </p> : ''}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div className="container">
                                    <table id="placebid-border" className="table table-striped mt-4">
                                        <thead>
                                            <tr>
                                                <th>Username</th>
                                                <th>Bid Amount</th>
                                                <th>Bidding Time</th>
                                            </tr>
                                        </thead>
                                        <tbody className="light-word">
                                            {this.state.itemDetail.bids.map((bid, i) => {
                                                return (
                                                    <tr>
                                                        <td>{bid.userId.userName}</td>
                                                        <td>
                                                            {<NumberFormat displayType={'text'} value={bid.currentPrice} thousandSeparator={true} prefix={'$'} />}
                                                        </td>
                                                        <td>{dateFns.format(bid.userId.createdAt, 'HH:mm:ss MM/DD/YYYY')}</td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                    <div className="d-flex justify-content-center">
                                        <Pagination aria-label="Page navigation example">
                                            <PaginationItem>
                                                <PaginationLink previous href="#" />
                                            </PaginationItem>
                                            <PaginationItem>
                                                <PaginationLink href="#">
                                                    1
                                                </PaginationLink>
                                            </PaginationItem>
                                            <PaginationItem>
                                                <PaginationLink href="#">
                                                    2
                                                </PaginationLink>
                                            </PaginationItem>
                                            <PaginationItem>
                                                <PaginationLink href="#">
                                                    3
                                                </PaginationLink>
                                            </PaginationItem>
                                            <PaginationItem>
                                                <PaginationLink href="#">
                                                    4
                                                </PaginationLink>
                                            </PaginationItem>
                                            <PaginationItem>
                                                <PaginationLink href="#">
                                                    5
                                                </PaginationLink>
                                            </PaginationItem>
                                            <PaginationItem>
                                                <PaginationLink next href="#" />
                                            </PaginationItem>
                                        </Pagination>
                                    </div>
                                </div>
                                <hr />
                                <div className="container">
                                    <h3>Item description</h3>
                                </div>
                                <hr />
                                <div dangerouslySetInnerHTML={{ __html: itemDetail.details }} className="container">
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="itemborder" style={{ marginTop: '50px' }}>
                                <div className="item-image">
                                    <Link className="detail" to="/itemdetail"><img src="http://localhost:1337/images/items/79a14aad-ff34-4928-8897-816477e734c0.png" alt="item" /></Link>
                                </div>
                                <div className="time-price">
                                    <div className="row d-flex justify-content-between">
                                        <div className="col-md-6">00:00:00</div>
                                        <div className="col-md-6" id="price">$200</div>
                                    </div>
                                </div>
                            </div>
                            <div className="itemborder" style={{ marginTop: '25px' }}>
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
                            <div className="itemborder" style={{ marginTop: '25px' }}>
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
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default ItemDetail
