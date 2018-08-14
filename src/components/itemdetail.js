import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ReactImageZoom from 'react-image-zoom';
import '../styles/styles.css'
import Comments from './Comments'
import RatingList from './RatingList'
import dateFns from 'date-fns'
import BidInput from './BidInput'
import NumberFormat from 'react-number-format';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import Web3 from 'web3';

import AuctionBid from '../contracts/AuctionBid.json';
import DappToken from '../contracts/DappToken.json'


class ItemDetail extends Component {

    constructor(props) {
        super(props)
        this.state = {
            current: 0,
            currentBidding: 0,
            currentBiddingStr: '1.000',
            step: 5,
            itemDetail: null,
            images: [],
            timeLeft: 0,

            loading: true,
            isApproved: null,
            currentPrice: 0,
            getMetaMask: true,
            sendTransaction: true,
            waitForMining: false
        }
        if (typeof this.web3 !== 'undefined') {
            this.web3Provider = this.web3.currentProvider
        } else {
            this.web3Provider = new Web3.providers.HttpProvider('https://ropsten.infura.io/99efdc0bd45147cebbdfd88e5eff1d75')
            // this.web3Provider = new Web3.providers.HttpProvider("http://127.0.0.1:7545")
        }
        this.web3 = window.web3

        this.onSubmitBid = this.onSubmitBid.bind(this)
        this.onReceiveRoomMessage = this.onReceiveRoomMessage.bind(this)
        this.onBeginAuction = this.onBeginAuction.bind(this)
        this.setCountDown = this.setCountDown.bind(this)


    }



    componentDidMount() {
        this.mounted = true

        this.props.io.socket.get(`${root}/hello`, function serverResponded(body, JWR) {
        });
        fetch(`${root}/api/v1/contracts/${this.props.match.params.id}`)
            .then(res => res.json())
            .then(res => {
                if (res.success) {
                    var auctionContract = this.web3.eth.contract(AuctionBid.abi)
                    this.contract = auctionContract.at((res.contractAddress.contractAddress).toString())
                }
            })
        fetch(`${root}/api/v1/items/${this.props.match.params.id}`, {
            credentials: 'include'
        })
            .then(res => res.json())
            .then(item => {
                if (!this.mounted) return
                this.setState({ loading: false })
                if (!item.error) {

                    this.setState({ currentPrice: item.findItem.currentPrice })
                    let nextStep = Math.ceil(item.findItem.bids.length > 0 ? item.findItem.bids[0].currentPrice * 0.5 : item.findItem.currentPrice * 0.5)
                    let initBid = item.findItem.bids.length > 0 ? item.findItem.bids[0].currentPrice : item.findItem.currentPrice
                    this.props.io.socket.get('/socket/items/' + item.findItem.id, (body, JWR) => {
                    })
                    this.props.io.socket.on('room' + item.findItem.id, this.onReceiveRoomMessage)
                    this.setState({ images: item.findImg, itemDetail: item.findItem, step: nextStep, currentBidding: initBid + nextStep, isApproved: item.isApproved }, function () {
                        this.setCountDown()

                    })
                }
                else {
                    this.setState({ itemDetail: null })
                }
            })

    }
    onReceiveRoomMessage(newBid) {
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

    setCountDown() {
        if (this.state.itemDetail && this.state.itemDetail.startedAt !== 0) {
            let endTime = dateFns.getTime(dateFns.addHours(this.state.itemDetail.startedAt, this.state.itemDetail.period))
            let currTime = dateFns.getTime(new Date())
            let timeLeft = endTime + this.state.itemDetail.additionalTime - currTime
            clearInterval(this.countDownInterval)
            this.countDownInterval = setInterval(() => {
                let remainTime = this.state.timeLeft - 1000
                if (remainTime <= 0) {
                    clearInterval(this.countDownInterval)
                    console.log(this.contract)
                    // this.watchEventEnd()
                    if (window.web3.eth.accounts[0]) {
                        this.contract.auctionEnd(() => {
                            this.watchEventEnd()
                        })
                    }

                }
                else {
                    this.setState({ timeLeft: remainTime })
                }
            }, 1000)
            this.setState({ timeLeft: timeLeft })
        }
    }
    watchEventEnd = () => {
        this.contract.AuctionEnded({}, {
            fromBlock: 0,
            toBlock: 'lastest'
        }).watch((error, event) => {
            if (!error) {
                console.log('event end', event)
            }
        })
    }
    watchEventBid = () => {
        this.contract.HighestBidIncrease({}, {
            fromBlock: 0,
            toBlock: 'lastest'
        }).watch((error, event) => {
            if (error) console.log(error)
            console.log('event', event)
        })
    }
    onSubmitBid(e) {
        e.preventDefault()
        if (!window.web3.eth.accounts[0]) {
            this.setState({ getMetaMask: false })
            setInterval(() => {
                this.setState({ getMetaMask: true })
            }, 2000)
        } else {
            this.contract.bid({ from: window.web3.eth.accounts[0], value: this.state.currentBidding }, (err, rs) => {
                this.watchEventBid()
            })

            this.props.io.socket.post(`${root}/api/v1/bid/${this.state.itemDetail.id}`, {
                currentPrice: this.state.currentBidding,
                userId: this.props.userId,
                isLastFiveSec: this.state.timeLeft <= 5000
            }, res => {

                if (!res.error) {
                    let { itemDetail } = this.state
                    if (itemDetail) {
                        itemDetail.bids.unshift(res.newBid)
                        itemDetail.currentPrice = itemDetail.bids[0].currentPrice
                        let nextStep = Math.ceil(itemDetail.bids[0].currentPrice * 0.5)
                        if (res.newAdditionalTime) {
                            console.log('addition', res.newAdditionalTime)
                            let modifyDetail = this.state.itemDetail
                            modifyDetail.additionalTime = res.newAdditionalTime
                            this.setState({
                                itemDetail: modifyDetail
                            }, () => {
                                this.setCountDown()
                            })
                        }
                        this.setState({ itemDetail, step: nextStep, currentBidding: res.newBid.currentPrice + nextStep })
                    }
                }
                else {
                    alert(res.msg)
                }

            })
        }
    }


    fromMillisecondsToFormattedString(ms) {
        let h = Math.floor(ms / (3600 * 1000))
        let m = Math.floor((ms - (3600 * 1000 * h)) / (60 * 1000))
        let s = Math.floor((ms - (3600 * 1000 * h) - (60 * 1000 * m)) / (1000))
        return `${h < 10 ? '0' + h : h}:${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`
    }

    componentWillUnmount() {
        this.mounted = false
        clearInterval(this.countDownInterval)
        if (this.state.itemDetail && this.state.itemDetail.id) {
            this.props.io.socket.get(`${root}/leave/items/${this.state.itemDetail.id}`, (body, JWR) => {
            })
        }
    }
    onBeginAuction() {
        if (!window.web3.eth.accounts[0]) {
            this.setState({ getMetaMask: false })
            setInterval(() => {
                this.setState({ getMetaMask: true })
            }, 2000)
        } else {
            var AuctionContract = this.web3.eth.contract(AuctionBid.abi)
            AuctionContract.new({
                from: window.web3.eth.accounts[0],
                data: AuctionBid.bytecode
            }, (error, contract) => {
                if (error) {
                    this.setState({ sendTransaction: false })
                    setInterval(() => {
                        this.setState({ sendTransaction: true })
                    }, 2000)
                    return
                }
                if (contract.address) {
                    this.contract = contract
                    console.log(this.contract.address)
                    var address = contract.address
                    fetch(`${root}/api/v1/contracts/${this.props.match.params.id}`, {
                        method: 'POST',
                        body: JSON.stringify({ address })
                    })
                        .then(res => res.json())
                        .then(res => {
                            if (res.success) {
                                contract.startBidding(this.state.currentPrice, { gas: 100000 }, (err, rs) => {
                                    if (err) {
                                        console.log(err)
                                    }
                                    if (rs) {

                                        let startTime = new Date().getTime()
                                        fetch(`${root}/api/v1/items/${this.props.match.params.id}`, {
                                            method: 'PATCH',
                                            body: JSON.stringify({
                                                startedAt: startTime
                                            })
                                        })
                                            .then((res) => res.json())
                                            .then((res) => {
                                                if (!res.error) {
                                                    let modifyDetail = this.state.itemDetail
                                                    modifyDetail.startedAt = startTime
                                                    this.setState({ itemDetail: modifyDetail }, function () {
                                                        this.setCountDown()
                                                    })

                                                }
                                                else {
                                                    console.log(res.msg)
                                                }
                                            })
                                    }
                                })
                            } else {
                                this.setState({ waitForMining: true })
                            }
                        })
                }
            })
        }
    }

    render() {
        const { current, itemDetail, images, loading, isApproved, getMetaMask, sendTransaction, waitForMining } = this.state
        if (loading) {
            return (
                <div role="alert" style={{ marginTop: '75px' }}>
                    <p className="alert alert-info text-center light-word">LOADING......</p>
                </div>
            )
        }
        if (itemDetail && (this.props.userId !== itemDetail.userId && !isApproved)) {
            return (
                <div role="alert" style={{ marginTop: '75px' }}>
                    <p className="alert alert-danger text-center light-word">You dont have permission to visit this page, get out</p>
                </div>
            )
        }

        else if (!itemDetail)
            return (
                <div role="alert" style={{ marginTop: '75px' }}>
                    <p className="alert alert-warning text-center light-word">Item not found</p>
                </div>
            )
        return (
            <div className="itemDetail-content" style={{ position: 'relative', zIndex: '1000' }}>
                <div className="container">
                    {(isApproved && !isApproved.isAccept) && (
                        <p className="alert alert-danger text-center mt-5">This item is rejected by Admin</p>
                    )}
                    {
                        !getMetaMask && (
                            <p className="alert alert-danger text-center mt-5">Please login to Meta Mask</p>
                        )
                    }
                    {
                        !sendTransaction && (
                            <p className="alert alert-danger text-center mt-5">You declined transaction or did't provide enough gas</p>
                        )
                    }
                    {
                        waitForMining && (
                            <p className="alert alert-danger text-center mt-5">Please wait for transaction confirmation, be patient</p>
                        )
                    }
                    <div className="row">
                        <div className="col-md-9">
                            <br />
                            <Link to='/'><i className="fas fa-backward"><span className="light-word"> Back to bid</span></i></Link>
                            <div className="items-info">
                                <div className="container pt-3 ">
                                    <h3 className="d-flex">{itemDetail.name} {(itemDetail.startedAt === 0 && this.props.userId === itemDetail.userId && isApproved) && <button className="btn btn-primary ml-auto" onClick={this.onBeginAuction}>Begin auction</button>}</h3>
                                </div>
                                <hr />
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-6 item-image">
                                            {images.length > 0 ?
                                                <div>
                                                    <div className="zoom-image" style={{ border: '1px solid darkgrey' }}>

                                                        <ReactImageZoom id={'abc'} width={379} height={400} zoomWidth={410} left="100%" img={`${root}/uploads/` + images[current].link} />
                                                    </div>
                                                    <div className="row thumbnail mt-2 d-flex justify-content-center">
                                                        {images.map((img, i) => (
                                                            <div className="col-sm-3 thumbnail-border" key={i} style={{ paddingRight: '5px', paddingLeft: '5px' }}>
                                                                <img className="img-fluid " src={`${root}/uploads/${img.link}`} alt="img" style={{ height: '68px' }} onClick={e => this.setCurrentItem(i)} />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div> : <img className="img-fluid" src={`http://www.staticwhich.co.uk/static/images/products/no-image/no-image-available.png`} alt="" />
                                            }
                                        </div>
                                        <div className="col-md-6" style={{ padding: '0 15px 0 30px' }}>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div>
                                                        {this.state.itemDetail.startedAt === 0 && <h4>Duration: {this.state.itemDetail.period} hour(s)</h4>}
                                                        {(this.state.itemDetail.startedAt !== 0 && this.state.timeLeft > 0) &&
                                                            <h4>Time left: {
                                                                this.fromMillisecondsToFormattedString(this.state.timeLeft)}
                                                            </h4>
                                                        }
                                                        {(this.state.itemDetail.startedAt !== 0 && this.state.timeLeft < 0) &&
                                                            <h4>
                                                                Ended {dateFns.distanceInWordsToNow(
                                                                    new Date(itemDetail.startedAt + itemDetail.period * 3600 * 1000 + itemDetail.additionalTime))} ago
                                                            </h4>
                                                        }
                                                    </div>
                                                </div>
                                                <div className="col-md-6" style={{ wordWrap: 'break-word' }}>
                                                    <h4> Current price: <NumberFormat displayType={'text'} value={this.state.itemDetail.bids.length > 0 ? this.state.itemDetail.bids[0].currentPrice : this.state.itemDetail.currentPrice} thousandSeparator={true} prefix={'$'} />
                                                    </h4>
                                                    {/* <h4>Current price: ${this.state.itemDetail.bids.length > 0 ? this.state.itemDetail.bids[0].currentPrice : this.state.itemDetail.currentPrice}</h4> */}
                                                </div>
                                                <div className="col-md-6">
                                                </div>
                                                <div className="col-md-6" style={{ wordWrap: 'break-word' }}>
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
                                                            if (!/[A-z]/.test(e.target.value)) {
                                                                this.setState({ currentBidding: +e.target.value })
                                                            }
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
                                                    {(this.state.itemDetail.startedAt !== 0 && this.state.timeLeft > 0) && <button className="btn btn-primary ml-3" type="submit"><i className="fas fa-gavel"> Bid now</i></button>}
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
                                                    <tr key={i}>
                                                        <td>{bid.userId.userName}</td>
                                                        <td>
                                                            {<NumberFormat displayType={'text'} value={bid.currentPrice} thousandSeparator={true} prefix={'$'} />}
                                                        </td>
                                                        <td>{dateFns.format(bid.createdAt, 'HH:mm:ss MM/DD/YYYY')}</td>
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
                            <div className="col-md-12 items-info mt-2">
                                {(this.props.userId !== '' && itemDetail) && <RatingList userId={this.props.userId} itemDetail={itemDetail} itemId={this.props.match.params.id} isApproved={isApproved}></RatingList>}
                            </div>
                            <div className="col-md-12 items-info mt-2">
                                <div className="comment-titles pt-3">
                                    <h3>Comments</h3>
                                </div>
                                <hr style={{ width: '825px', marginLeft: '-16px' }} />
                                <div className="comment-content">
                                    <div className="comment-block">
                                        <Comments itemId={this.props.match.params.id} userId={this.props.userId} startedAt={this.state.itemDetail.startedAt} io={this.props.io}></Comments>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-end">
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
                        </div>
                        <div className="col-sm-3">
                            <div className="col card zoom" style={{ marginTop: '48px' }}>
                                <div className="shadow" style={{ borderBottomRightRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                                    <Link className="borderitem" to="#">
                                        <img className="card-img-top" src="/images/coin.jpg" alt="" style={{ minHeight: '200px', maxHeight: '200px', objectFit: 'cover', marginLeft: '-1px' }} />
                                    </Link>
                                    <div className="card-body">
                                        <div className="text-center">
                                            <h5>Cigar CuVu</h5>
                                        </div>
                                        <p className="card-title">Current bid: $200 </p>
                                        <p className="card-price">
                                            End: 00:00:00
                                        </p>
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
