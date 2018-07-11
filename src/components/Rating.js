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
                            <li key={review.id}>
                                <p>So *: {review.rating}</p>
                                <p>Nhan xet : {review.comment}</p>
                            </li>)
                    })}
                </ul>
            </div>
        )
    }
}

export default Rating

