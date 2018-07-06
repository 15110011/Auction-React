import React, { Component } from 'react'
import { render } from 'react-dom'
import { Link } from 'react-router-dom'
import ReactImageZoom from 'react-image-zoom';
import NumericInput from 'react-numeric-input';
import '../styles/styles.css'

import _ from 'lodash';
import dateFns from 'date-fns'
import BidInput from './BidInput'
class ItemDetail extends Component {

    constructor(props) {
        super(props)
        this.state = {
            current: 0,
            currentBidding: 0,
            step: 5,
            itemDetail: null,
            items: [
                {
                    id: 'thumbnail',
                    title: 'gallery',
                    description: 'gallery',
                    altText: 'picture',
                    src: '/images/car.jpg',
                    thumbSrc: '/images/thumbnails/car.jpg',
                },
                {
                    id: 'thumbnail',
                    title: 'gallery',
                    description: 'gallery',
                    altText: 'picture',
                    src: '/images/cigar.jpg',
                    thumbSrc: '/images/thumbnails/cigar.jpg',
                },
                {
                    id: 'thumbnail',
                    title: 'gallery',
                    description: 'gallery',
                    altText: 'picture',
                    src: '/images/coin.jpg',
                    thumbSrc: '/images/thumbnails/coin.jpg'

                }
            ]
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
                    console.log(item)
                    let nextStep = Math.ceil(item.findItem.bids.length > 0 ? item.findItem.bids[0].currentPrice * 0.5 : item.findItem.currentPrice * 0.5)
                    let initBid = item.findItem.bids.length > 0 ? item.findItem.bids[0].currentPrice : item.findItem.currentPrice
                    this.props.io.socket.get('/socket/items/' + item.findItem.id, (body, JWR) => {
                        console.log(body.msg)
                    })
                    this.props.io.socket.on('room' + item.findItem.id, this.onReceiveRoomMessage)

                    this.setState({ itemDetail: item.findItem, step: nextStep, currentBidding: initBid + nextStep })
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
                if (itemDetail) {
                    itemDetail.bids.unshift(res.newBid)
                    itemDetail.currentPrice = itemDetail.bids[0].currentPrice
                    let nextStep = Math.ceil(itemDetail.bids[0].currentPrice * 0.5)
                    this.setState({ itemDetail, step: nextStep, currentBidding: res.newBid.currentPrice + nextStep })
                }
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
        const { current, items, itemDetail } = this.state
        if (!itemDetail) return (
            <div>
                Khong ton tai item nay
            </div>
        )
        return (
            <div className="itemDetail-content">
                <div className="container">
                    <div className="row">
                        <div className="col-md-9">
                            <br />
                            <Link to='/'><i className="fas fa-backward"> Back to bid</i></Link>
                            <div className="items-info">
                                <div className="container">
                                    <h3>{itemDetail.name}</h3>
                                </div>
                                <hr />
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-5 item-image">
                                            <ReactImageZoom width={340} height={300} zoomWidth={450} img={items[current].src} />
                                            <div className="row thumbnail">
                                                {items.map((item, i) => (
                                                    <div className="col-md-4 thumbnail-border" key={i}>
                                                        <img className="img-fluid" src={item.thumbSrc} alt="car" style={{ height: '100px' }} onClick={e => this.setCurrentItem(i)} />
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
                                                    <h4>Current price: ${this.state.itemDetail.bids.length > 0 ? this.state.itemDetail.bids[0].currentPrice : this.state.itemDetail.currentPrice}</h4>
                                                </div>
                                                <div className="col-md-6">
                                                </div>
                                                <div className="col-md-6">
                                                    <h4>Current step: ${this.state.step}</h4>
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
                                                {this.state.itemDetail.bids.length > 0 ? <p className="alert alert-info">
                                                    Last bid by : {this.state.itemDetail.bids[0].userId.userName}
                                                </p> : ''}
                                                <table className="table table-striped mt-4 mr-2 ml-2">
                                                    <thead>
                                                        <tr>
                                                            <th>Name</th>
                                                            <th>Bid</th>
                                                            <th>At</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {this.state.itemDetail.bids.map((bid, i) => {
                                                            return (
                                                                <tr>
                                                                    <td>{bid.userId.userName}</td>
                                                                    <td>{bid.currentPrice}</td>
                                                                    <td>{dateFns.format(bid.userId.createdAt, 'HH:mm:ss MM/DD/YYYY')}</td>

                                                                </tr>
                                                            )
                                                        })}

                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
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
