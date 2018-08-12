import React, { Component, Fragment } from 'react'
import Rating from './Rating'
import StarRatingComponent from 'react-star-rating-component';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Progress } from 'reactstrap';
import { Form, FormGroup, Label } from 'reactstrap';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

export default class RatingList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modal: false,
            reviews: [],
            newReview: {
                rating: 1,
                content: ''
            },
            rateType: {},
            averageRate: 0
        }
        this.toggle = this.toggle.bind(this)
        this.onClickReview = this.onClickReview.bind(this)

    }
    componentDidMount() {
        fetch(`${root}/api/v1/users/${this.props.userId}/rates`)
            .then(res => res.json())
            .then(reviews => {
                if (!reviews.error)
                    this.setState({ reviews: reviews.rates }, () => {
                        this.calculateAverageRate()
                        this.calculateNumOfRateType()
                    })
            })
    }
    toggle() {
        this.setState({
            modal: !this.state.modal
        });
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
    calculateAverageRate = () => {
        let total = 0
        let numReview = this.state.reviews.length
        if (numReview > 0) {
            this.state.reviews.forEach(review => {
                total += review.rating
            })
            this.setState({ averageRate: total / numReview })
        }
    }
    calculateNumOfRateType = () => {
        let tempRateType = this.state.rateType
        this.state.reviews.forEach(review => {
            if (!tempRateType[review.rating])
                tempRateType[review.rating] = 0
            tempRateType[review.rating] += 1

        })
        this.setState({
            rateType: tempRateType
        })
    }
    render() {
        const { itemDetail, isApproved } = this.props
        const { newReview, reviews, averageRate, rateType } = this.state

        return (
            <Fragment>
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
                            <h3>{averageRate}/5</h3>
                            {(reviews.length === 0 || reviews.length === 1) && <small>{reviews.length} vote</small>}
                            {(reviews.length > 1) && <small>{reviews.length} votes</small>}
                        </div>
                    </div>
                    <div className="col-md-4">
                        <Form inline>
                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                <Label for="example" className="mr-sm-2"><small>5★ </small></Label>
                                <Progress style={{ width: '230px' }} striped color="warning" value={reviews.length !== 0 ? rateType[5] / reviews.length * 100 : 0} />
                                <Label for="example" className="mr-sm-2 ml-1">
                                    <small>
                                        {rateType[5] ? rateType[5] : 0}
                                    </small>
                                </Label>
                            </FormGroup>
                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                <Label for="example" className="mr-sm-2"><small>4★ </small></Label>
                                <Progress style={{ width: '230px' }} striped color="warning" value={reviews.length !== 0 ? rateType[4] / reviews.length * 100 : 0} />
                                <Label for="example" className="mr-sm-2 ml-1">
                                    <small>
                                        {rateType[4] ? rateType[4] : 0}
                                    </small>
                                </Label>
                            </FormGroup>
                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                <Label for="example" className="mr-sm-2"><small>3★ </small></Label>
                                <Progress style={{ width: '230px' }} striped color="warning" value={reviews.length !== 0 ? rateType[3] / reviews.length * 100 : 0} />
                                <Label for="example" className="mr-sm-2 ml-1"><small>
                                    {rateType[3] ? rateType[3] : 0}
                                </small></Label>
                            </FormGroup>
                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                <Label for="example" className="mr-sm-2"><small>2★ </small></Label>
                                <Progress style={{ width: '230px' }} striped color="warning" value={reviews.length !== 0 ? rateType[2] / reviews.length * 100 : 0} />
                                <Label for="example" className="mr-sm-2 ml-1"><small>
                                    {rateType[2] ? rateType[2] : 0}
                                </small></Label>
                            </FormGroup>
                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                <Label for="example" className="mr-sm-2"><small>1★ </small></Label>
                                <Progress style={{ width: '230px' }} striped color="warning" value={reviews.length !== 0 ? rateType[1] / reviews.length * 100 : 0} />
                                <Label for="example" className="mr-sm-2 ml-1"><small>
                                    {rateType[1] ? rateType[1] : 0}
                                </small></Label>
                            </FormGroup>
                        </Form>
                    </div>
                    <div className="col-md-4 light-word">
                        {(this.props.userId !== itemDetail.userId && isApproved && itemDetail.startedAt !== 0) && <Button style={{ float: 'right', width: '50%' }} color="danger" onClick={this.toggle}>{this.props.buttonLabel}Rate it</Button>}
                        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                            <ModalHeader toggle={this.toggle}>Rate your purchased item</ModalHeader>
                            <form onSubmit={this.onClickReview}>
                                <ModalBody>
                                    <input type="hidden" name="itemId" value={this.props.itemId} />
                                    <div className="starRating">
                                        <div className="item-rate">
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
                                        }} defaultValue={this.state.newReview.content}>
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
                            <Rating reviews={this.state.reviews} userId={itemDetail.userId} itemId={this.props.itemId}></Rating>
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
            </Fragment>
        )
    }
}