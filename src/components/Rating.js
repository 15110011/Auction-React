import React, { Component } from 'react'
import { render } from 'react-dom'

class Rating extends Component {
    constructor(props) {
        super(props)
        this.state = {
            reviews: [],
            newReview: null
        }
    }
    componentDidMount() {
        if (this.props.userId) {
            fetch(`/api/v1/users/${this.props.userId}/rates`)
                .then(res => res.json())
                .then(reviews => {
                    if (!reviews.error)
                        this.setState({ reviews: reviews.rates.reviews })
                })
        }
    }
    render() {
        return (
            <div>
                <ul>
                    {this.state.reviews.map(review => {
                        return (
                            <li style={{ listStyleType: 'none' }} key={review.id}>
                                <div className="review-border" style={{ marginLeft: '-40px', padding:'10px 10px' }}>
                                    <div className="count-star">
                                        <p>So *: {review.rating}</p>
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
                </ul>
            </div>
        )
    }
}

export default Rating

