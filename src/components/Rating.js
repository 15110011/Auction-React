import React from 'react'
import StarRatingComponent from 'react-star-rating-component';
import dateFns from 'date-fns'
import { Link } from 'react-router-dom'


function Rating(props) {

    return (
        <div>
            <ul>
                {props.reviews.map((review, key) => {
                    return (
                        <div key={key} className="review-panel light-word mt-2" style={{ marginLeft: '-55px', marginRight: '-15px' }} >
                            <li style={{ listStyleType: 'none', backgroundColor: '#e3e9ec', borderRadius: '10px', paddingLeft: '50px' }} key={review.id}>
                                <div className="review-border" style={{ marginLeft: '-40px', padding: '10px 10px' }}>
                                    <div className="count-star">
                                        <div className="row">
                                            <div className="col-md-9">
                                                <div className="dv-star-rating" style={{ fontSize: '30px' }}>
                                                    <StarRatingComponent
                                                        name="rate"
                                                        starCount={5}
                                                        value={review.rating}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="time">
                                                    <small style={{ color: '#7b7171', float: 'right' }}>{dateFns.format(review.createdAt, 'DD/MM/YYYY')}</small>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="certificate bolditalic-word" style={{ marginTop: '-20px', position: 'relative', zIndex:'1000' }}>
                                            <small style={{ fontSize: '75%' }}>
                                                <i style={{ color: '#3c763d' }} className="fas fa-shield-alt"> Purchased certificate -</i>
                                                <Link className="italic-word" to="#">&nbsp;Quan dui TQ</Link>
                                            </small>
                                        </div>
                                    </div>
                                    <div className="comment pt-1">
                                        <p>{review.comment}</p>
                                        <div className="post italic-word" style={{ marginTop: '-15px' }}>
                                            <div className="user">
                                                <small style={{ color: '#7b7171' }}>by <Link to="#">{review.buyer.userName}</Link></small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </div>
                    )
                })}
            </ul>
        </div>
    )
}

export default Rating

