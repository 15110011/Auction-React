import React, { Component } from 'react'
import { render } from 'react-dom'
import { Link } from 'react-router-dom'
import ReactImageZoom from 'react-image-zoom';
import NumericInput from 'react-numeric-input';
import '../styles/styles.css'
import Comments from './Comments'
import Rating from './Rating'
import _ from 'lodash';
import dateFns from 'date-fns'
import BidInput from './BidInput'
import NumberFormat from 'react-number-format';
import StarRatingComponent from 'react-star-rating-component';
import RatingStar from './RatingStar';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Progress } from 'reactstrap';
import { Form, FormGroup, Label, Input } from 'reactstrap';

class ItemDetail extends Component {

    constructor(props) {
        super(props)
        this.state = {
            current: 0,
            currentBidding: 0,
            step: 5,
            itemDetail: null,
            images: [],
            timeLeft: 0,
            modal: false,
            reviews: [],
            newReview: {
                rating: 1,
                content: ''
            }
        }
        this.onSubmitBid = this.onSubmitBid.bind(this)
        this.onReceiveRoomMessage = this.onReceiveRoomMessage.bind(this)
        this.toggle = this.toggle.bind(this)
        this.onClickReview = this.onClickReview.bind(this)
        this.onBeginAuction = this.onBeginAuction.bind(this)
        this.setCountDown = this.setCountDown.bind(this)
    }
    onClickReview(e) {
        e.preventDefault()
        let form = new FormData(e.target)
        this.setState({
            newReview: {
                rating: 1,
                content: ''
            }
        })
        fetch(`${root}/api/v1/users/${this.props.userId}/rates`, {
            method: 'POST',
            body: form
        })
            .then(res => res.json())
            .then(res => {
                if (!res.error) {
                    let reviews = this.state.reviews.slice()
                    reviews.unshift(res.newReview)
                    this.setState({ reviews })
                }
                else {
                    alert(res.msg)
                }
            })
    }
    onStarClick(nextValue, prevValue, name) {
        let { newReview } = this.state
        newReview.rating = nextValue
        this.setState({ newReview });
    }
    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }
    componentDidMount() {
        this.props.io.socket.get('/hello', function serverResponded(body, JWR) {
            console.log('Sails responded with: ', body);
            console.log('with headers: ', JWR.headers);
            console.log('and with status code: ', JWR.statusCode);
        });
        fetch(`${root}/api/v1/items/` + this.props.match.params.id)
            .then(res => res.json())
            .then(item => {
                console.log(item)
                if (!item.error) {
                    let nextStep = Math.ceil(item.findItem.bids.length > 0 ? item.findItem.bids[0].currentPrice * 0.5 : item.findItem.currentPrice * 0.5)
                    let initBid = item.findItem.bids.length > 0 ? item.findItem.bids[0].currentPrice : item.findItem.currentPrice
                    this.props.io.socket.get(`${root}/socket/items/` + item.findItem.id, (body, JWR) => {
                        console.log(body.msg)
                    })
                    this.props.io.socket.on('room' + item.findItem.id, this.onReceiveRoomMessage)
                    this.setState({ images: item.findImg, itemDetail: item.findItem, step: nextStep, currentBidding: initBid + nextStep }, function () {
                        this.setCountDown()

                    })

                }
                else {
                    this.setState({ itemDetail: null })
                    console.log(item.msg)
                }
            })
        if (this.props.userId) {
            fetch(`${root}/api/v1/users/${this.props.userId}/rates`)
                .then(res => res.json())
                .then(reviews => {
                    if (!reviews.error)
                        this.setState({ reviews: reviews.rates })
                })
        }
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
                }
                else {
                    this.setState({ timeLeft: remainTime })
                }
            }, 1000)
            this.setState({ timeLeft: timeLeft })
        }
    }
    onSubmitBid(e) {
        console.log(this.props.userId)

        e.preventDefault()

        this.props.io.socket.post(`${root}/api/v1/bid/` + this.state.itemDetail.id, {
            currentPrice: this.state.currentBidding,
            userId: this.props.userId,
            isLastFiveSec: this.state.timeLeft <= 5000
        }, (function (res) {
            console.log(res)

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

        }).bind(this))
    }
    fromMillisecondsToFormattedString(ms) {
        let h = Math.floor(ms / (3600 * 1000))
        let m = Math.floor((ms - (3600 * 1000 * h)) / (60 * 1000))
        let s = Math.floor((ms - (3600 * 1000 * h) - (60 * 1000 * m)) / (1000))
        return `${h < 10 ? '0' + h : h}:${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`
    }
    componentWillUnmount() {
        if (this.state.itemDetail && this.state.itemDetail.id) {
            this.props.io.socket.get('/leave/items/' + this.state.itemDetail.id, (body, JWR) => {
                console.log(body.msg)
            })
        }

    }
    onBeginAuction() {
        let startTime = new Date().getTime()
        fetch('/api/v1/items/' + this.props.match.params.id, {
            method: "PATCH",
            body: JSON.stringify({
                startedAt: startTime
            })
        })
            .then((res) => res.json())
            .then((res) => {
                if (!res.error) {
                    console.log('begin auction', res)
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
    render() {
        const { current, items, itemDetail, images, newReview } = this.state
        if (itemDetail && this.props.userId != itemDetail.userId) {
            return (
                <div role="alert" style={{ marginTop: '75px' }}>
                    <p className="alert alert-danger text-center light-word">You dont have permission to visit this page, get out</p>
                </div>
            )
        }

        else if (!itemDetail) return (
            <div role="alert" style={{ marginTop: '75px' }}>
                <p className="alert alert-warning text-center light-word">Item not found</p>
            </div>
        )
        return (
            <div className="itemDetail-content" style={{ position: 'relative', zIndex: '1000' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-9">
                            <br />
                            <Link to='/'><i className="fas fa-backward"><span className="light-word"> Back to bid</span></i></Link>
                            <div className="items-info">
                                <div className="container pt-3 ">
                                    <h3 class="d-flex">{itemDetail.name} {itemDetail.startedAt == 0 && <button className="btn btn-primary ml-auto" onClick={this.onBeginAuction}>Begin auction</button>}</h3>
                                </div>
                                <hr />
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-5 item-image">
                                            {images.length > 0 ?
                                                <div>
                                                    <ReactImageZoom width={340} height={300} zoomWidth={450} img={`${root}/images/items/` + images[current].link} />
                                                    <div className="row thumbnail mt-2" style={{ paddingLeft: '15px', marginRight: '-30px' }}>
                                                        {images.map((img, i) => (
                                                            <div className="col-sm-4 thumbnail-border" key={i}>
                                                                <img className="img-fluid" src={`${root}/images/items/${img.link}`} alt="car" style={{ height: '100px' }} onClick={e => this.setCurrentItem(i)} />
                                                            </div>
                                                        ))}
                                                    </div></div> : <img className="img-fluid" src={`http://www.staticwhich.co.uk/static/images/products/no-image/no-image-available.png`} alt="No image" />}
                                        </div>
                                        <div className="col-md-7">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div>
                                                        {this.state.itemDetail.startedAt == 0 ? <h4>Duration: {this.state.itemDetail.period} hour(s)</h4> :
                                                            <h4>Time left: {
                                                                this.fromMillisecondsToFormattedString(this.state.timeLeft)}
                                                            </h4>
                                                        }
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
                                                    {this.state.itemDetail.startedAt !== 0 && <button className="btn btn-primary ml-3" type="submit"><i className="fas fa-gavel"> Bid now</i></button>}
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
                                <div className="review-titles pt-3">
                                    <div className="row">
                                        <div className="col-md-12 review-left">
                                            <h3>Review</h3>
                                        </div>
                                    </div>
                                </div>
                                <hr style={{ width: '825px', marginLeft: '-16px' }} />
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="total-rate">
                                            <h3>4.0/5</h3>
                                            <p>Số sao</p>
                                            <small>69 votes</small>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <Form inline>
                                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                                <Label for="example" className="mr-sm-2"><small>5★ </small></Label>
                                                <Progress style={{ width: '230px' }} striped color="warning" value={75} />
                                                <Label for="example" className="mr-sm-2 ml-1"><small> 35</small></Label>
                                            </FormGroup>
                                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                                <Label for="example" className="mr-sm-2"><small>4★ </small></Label>
                                                <Progress style={{ width: '230px' }} striped color="warning" value={55} />
                                                <Label for="example" className="mr-sm-2 ml-1"><small> 25</small></Label>
                                            </FormGroup>
                                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                                <Label for="example" className="mr-sm-2"><small>3★ </small></Label>
                                                <Progress style={{ width: '230px' }} striped color="warning" value={35} />
                                                <Label for="example" className="mr-sm-2 ml-1"><small> 15</small></Label>
                                            </FormGroup>
                                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                                <Label for="example" className="mr-sm-2"><small>2★ </small></Label>
                                                <Progress style={{ width: '230px' }} striped color="warning" value={15} />
                                                <Label for="example" className="mr-sm-2 ml-1"><small> 10</small></Label>
                                            </FormGroup>
                                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                                <Label for="example" className="mr-sm-2"><small>1★ </small></Label>
                                                <Progress style={{ width: '230px' }} striped color="warning" value={5} />
                                                <Label for="example" className="mr-sm-2 ml-1"><small> 5</small></Label>
                                            </FormGroup>
                                        </Form>
                                    </div>
                                    <div className="col-md-4 light-word">
                                        <Button style={{ float: 'right', width: '50%' }} color="danger" onClick={this.toggle}>{this.props.buttonLabel}Rate it</Button>
                                        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                                            <ModalHeader toggle={this.toggle}>Rate your purchased item</ModalHeader>
                                            <form onSubmit={this.onClickReview}>
                                                <ModalBody>
                                                    <input type="hidden" name="itemId" value={this.props.match.params.id} />
                                                    <div className="starRating">
                                                        <div className="item-rate">
                                                            <img src="../images/car.jpg" alt="itemimage" style={{ height: '50px', width: '50px' }} />
                                                            <h3 style={{ display: 'inline' }}> {itemDetail.name}</h3>
                                                        </div>
                                                        <div className="dv-star-rating mt-1" style={{ fontSize: '40px' }}>
                                                            <StarRatingComponent
                                                                name="rating"
                                                                starCount={5}
                                                                value={newReview.rating}
                                                                onStarClick={this.onStarClick.bind(this)}
                                                            />
                                                        </div>
                                                    </div>
                                                    <Label for="example" className="mr-sm-2 italic-word"><small style={{ color: '#7b7171' }}>Content</small></Label>
                                                    <div className="textarea-content" style={{ marginTop: '-10px' }}>
                                                        <textarea style={{ resize: 'none' }} name="content" id="" cols="55" rows="8" onChange={e => {
                                                            newReview.content = e.target.value
                                                            this.setState({
                                                                newReview
                                                            })
                                                        }} value={this.state.newReview.content} defaultValue={this.state.newReview.content}>
                                                        </textarea>
                                                    </div>
                                                </ModalBody>
                                                <ModalFooter>
                                                    <Button type="submit" color="success" onClick={this.toggle} >Review</Button>
                                                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                                                </ModalFooter>
                                            </form>
                                        </Modal>
                                    </div>
                                </div>
                                <hr style={{ width: '825px', marginLeft: '-16px' }} />
                                <div className="review-content">
                                    <div className="review-block">
                                        <div className="container">
                                            <Rating reviews={this.state.reviews} userId={this.state.itemDetail.userId} itemId={this.props.match.params.id}></Rating>
                                        </div>
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
                            <div className="col-md-12 items-info mt-2">
                                <div className="comment-titles pt-3">
                                    <h3>Comments</h3>
                                </div>
                                <hr style={{ width: '825px', marginLeft: '-16px' }} />
                                <div className="comment-content">
                                    <div className="comment-block">
                                        <Comments itemId={this.props.match.params.id} userId={this.props.userId} io={this.props.io}></Comments>
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
                        <div className="col-md-3">
                            <div className="more-item" style={{ marginTop: '25px' }}>
                                <div className="right-item pt-4">
                                    <div className="itemborder">
                                        <div className="item-image">
                                            <Link className="detail" to="/itemdetail"><img src="http://localhost:1337/images/items/0f0c0954-687c-49be-9685-c1b150468b2b.jpg" alt="item" /></Link>
                                        </div>
                                        <div className="time-price">
                                            <div className="row d-flex justify-content-between">
                                                <div className="col-md-6">00:00:00</div>
                                                <div className="col-md-6" id="price">$200</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="right-item pt-4">
                                    <div className="itemborder">
                                        <div className="item-image">
                                            <Link className="detail" to="/itemdetail"><img src="http://localhost:1337/images/items/0f0c0954-687c-49be-9685-c1b150468b2b.jpg" alt="item" /></Link>
                                        </div>
                                        <div className="time-price">
                                            <div className="row d-flex justify-content-between">
                                                <div className="col-md-6">00:00:00</div>
                                                <div className="col-md-6" id="price">$200</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="right-item pt-4">
                                    <div className="itemborder">
                                        <div className="item-image">
                                            <Link className="detail" to="/itemdetail"><img src="http://localhost:1337/images/items/0f0c0954-687c-49be-9685-c1b150468b2b.jpg" alt="item" /></Link>
                                        </div>
                                        <div className="time-price">
                                            <div className="row d-flex justify-content-between">
                                                <div className="col-md-6">00:00:00</div>
                                                <div className="col-md-6" id="price">$200</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="right-item pt-4">
                                    <div className="itemborder">
                                        <div className="item-image">
                                            <Link className="detail" to="/itemdetail"><img src="http://localhost:1337/images/items/0f0c0954-687c-49be-9685-c1b150468b2b.jpg" alt="item" /></Link>
                                        </div>
                                        <div className="time-price">
                                            <div className="row d-flex justify-content-between">
                                                <div className="col-md-6">00:00:00</div>
                                                <div className="col-md-6" id="price">$200</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="right-item pt-4">
                                    <div className="itemborder">
                                        <div className="item-image">
                                            <Link className="detail" to="/itemdetail"><img src="http://localhost:1337/images/items/0f0c0954-687c-49be-9685-c1b150468b2b.jpg" alt="item" /></Link>
                                        </div>
                                        <div className="time-price">
                                            <div className="row d-flex justify-content-between">
                                                <div className="col-md-6">00:00:00</div>
                                                <div className="col-md-6" id="price">$200</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="right-item pt-4">
                                    <div className="itemborder">
                                        <div className="item-image">
                                            <Link className="detail" to="/itemdetail"><img src="http://localhost:1337/images/items/0f0c0954-687c-49be-9685-c1b150468b2b.jpg" alt="item" /></Link>
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
                </div>
            </div >
        )
    }
}
export default ItemDetail
