import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../styles/styles.css'
import NumberFormat from 'react-number-format';
import { fromMillisecondsToFormattedString } from '../config'

class Items extends Component {

    constructor(props) {
        super(props)
        this.state = {
            items: [],
            timeLeft: 0,
        }
    }
    componentWillMount() {
        clearInterval(this.countDownInterval)
        
    }
    
    componentDidMount() {
        this.countDownInterval = []
        fetch(`${root}/api/v1/liveItems`)
            .then(item => item.json())
            .then(item => {
                var realTimeItems = item.realTimeItems
                realTimeItems.map((item, i) => {
                    let index = i
                    if (this.countDownInterval) {
                        clearInterval(this.countDownInterval[index])
                    }
                    if (item && item.startedAt !== 0) {
                        this.countDownInterval[index] = setInterval(() => {
                            let cloneRealTimeItems = [].concat(this.state.items)
                            let remainTime = cloneRealTimeItems[index].timeLeft - 1000
                            if (remainTime <= 0) {
                                clearInterval(this.countDownInterval[index])
                            }
                            else {
                                item.timeLeft = remainTime
                                this.setState({ items: cloneRealTimeItems })
                            }
                        }, 1000)
                    }
                    return item
                })
                this.setState({ items: realTimeItems })
            })
    }

    componentWillUnmount() {
        if (this.countDownInterval) {
            this.countDownInterval.forEach(interval => {
                clearInterval(interval)
            })
        }
    }
    
    render() {
        const { items } = this.state
        return (
            <div className="container">
                <div className="row">
                    {
                        items.length > 0 && items.map((item, i) => {
                            return (
                                <div key={i} className="col-sm-3 card">
                                    {
                                        item.length !== 0 ? (
                                            <Link className="borderitem" to={`/items/${item.itemId}`}>
                                                <img className="card-img-top" src={`${root}/uploads/${item.link}`} alt="" style={{ minHeight: '200px', maxHeight: '200px', objectFit: 'cover' }} />
                                            </Link>
                                        ) : (
                                                <img className="card-img-top" src={`http://www.staticwhich.co.uk/static/images/products/no-image/no-image-available.png`} alt="" style={{ minHeight: '200px', maxHeight: '200px' }} />
                                            )
                                    }
                                    <div className="card-body">
                                        <div className="text-center">
                                            <h5>{item.itemName}</h5>
                                        </div>
                                        <p className="card-title">Current bidding:&nbsp;<NumberFormat displayType={'text'} value={item.curPrice} thousandSeparator={true} suffix={' ETH'} /></p>
                                        <p className="card-price">
                                            Time left :&nbsp;{fromMillisecondsToFormattedString(item.timeLeft)}
                                        </p>
                                        <Link className="btn btnbid" to={`/items/${item.itemId}`} role="button" style={{ marginTop: '5px' }}><i className="fas fa-gavel"></i> Bid now</Link>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )

    }
}

export default Items
