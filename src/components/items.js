import React, { Component } from 'react'
import { render } from 'react-dom'
import { Link } from 'react-router-dom'
import '../styles/styles.css'
import Footer from './footer';

class Items extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: props.name,
            currentPrice: props.currentPrice,
            quantity: props.quantity,
            details: props.details,
        }
    }

    render() {
        return (
            <div className="col-md-3" style={{ marginTop: '25px' }}>
                <div className="itemborder">
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
                <Link className="btn btnbid" to="/itemdetail" role="button" style={{marginTop:'5px'}}><i className="fas fa-gavel"></i> Bid now</Link>
            </div>
        )
    }
}

export default Items