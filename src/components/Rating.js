import React, { Component } from 'react'
import { render } from 'react-dom'
import StarRatingComponent from 'react-star-rating-component';

class Rating extends Component {
    constructor(props) {
        super(props)
        this.state = {
            reviews: [],
            newReview: {
                rating: 1,
                content: ''
            }
        }
        this.onClickReview = this.onClickReview.bind(this)
    }

    onStarClick(nextValue, prevValue, name) {
        let { newReview } = this.state
        newReview.rating = nextValue
        this.setState({ newReview });
    }
    componentDidMount() {
        if (this.props.userId) {
            fetch(`/api/v1/users/${this.props.userId}/rates`)
                .then(res => res.json())
                .then(reviews => {
                    if (!reviews.error)
                        this.setState({ reviews: reviews.rates })
                })
        }
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
        fetch(`/api/v1/users/${this.props.userId}/rates`, {
            method: 'POST',
            body: form
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if (!res.error) {
                    let reviews = this.state.reviews.slice()
                    reviews.unshift(res.newReview)
                    this.setState({ reviews })
                }
                else {
                    alert(res.msg)
                }
            })
        console.log('duoc chua???')
    }
    render() {
        let { newReview } = this.state
        return (
            <div>
                <ul>
                    {this.state.reviews.map(review => {
                        return (
                            <li style={{ listStyleType: 'none' }} key={review.id}>
                                <div className="review-border" style={{ marginLeft: '-40px', padding: '10px 10px' }}>
                                    <div className="count-star">
                                        <p> <StarRatingComponent
                                            starCount={5}
                                            value={review.rating}
                                        /></p>
                                        <div className="certificate bolditalic-word" style={{ marginTop: '-20px' }}>
                                            <small style={{ fontSize: '75%' }}>
                                                <i style={{ color: '#4caf50' }} class="fas fa-shield-alt"> Purchased certificate</i>
                                            </small>
                                        </div>
                                    </div>
                                    <div className="comment pt-1">
                                        <p>Nhan xet : {review.comment}</p>
                                        <div className="post italic-word" style={{ marginTop: '-15px' }}>
                                            <div className="user">
                                                <small>by <a href="#">Con Heo Sữa</a></small>
                                            </div>
                                            <div className="time">
                                                <small>at: 10/07/2018</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        )
                    })}
                    <li>
                        <form onSubmit={this.onClickReview}>
                            <input type="hidden" name="itemId" value={this.props.itemId} />
                            <StarRatingComponent
                                name="rating"
                                starCount={5}
                                value={newReview.rating}
                                onStarClick={this.onStarClick.bind(this)}
                            />
                            <textarea name="content" id="" cols="30" rows="10" onChange={e => {
                                newReview.content = e.target.value
                                this.setState({
                                    newReview
                                })
                            }} defaultValue={this.state.newReview.content}></textarea>
                            <button type="submit" className="btn btn-success" >Review</button>
                        </form>
                    </li>
                </ul>
            </div>
        )
    }
}

export default Rating

