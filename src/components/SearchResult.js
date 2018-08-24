import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './../styles/setting.css'
import NumberFormat from 'react-number-format';
import dateFns from 'date-fns'
import { fromMillisecondsToFormattedString } from '../config.js'



class SearchResult extends Component {
    constructor(props) {
        super(props)
        this.state = {
            timeLeft: ''
        }
    }
    render() {
        var foundItems = this.props.history.location.state.results
        if (foundItems.length === 0) {
            return (
                <div role="alert" style={{ marginTop: '75px', minHeight: '100vh' }}>
                    <p className="alert alert-warning text-center light-word">Item not found</p>
                </div>
            )
        }

        return (
            <div className="container" id="adddel-form" style={{ position: 'relative', zIndex: '1000', minHeight: '100vh' }}>
                <div className="text-center page-header" style={{ marginTop: '100px' }}>
                    <h1>Search results</h1>
                </div>
                <hr></hr>
                <div className="container pt-4">
                    <div className="row">
                        {
                            foundItems.map((item, i) => {
                                let endTime = dateFns.getTime(dateFns.addHours(item.startedAt, item.period))
                                let curTime = dateFns.getTime(new Date())
                                let timeLeft = endTime + item.additionalTime - curTime
                                clearInterval(this.countDownInterval)
                                this.countDownInterval = setInterval(() => {
                                    var remainTime = timeLeft - 1000
                                    this.setState({ timeLeft: remainTime })
                                    if (remainTime <= 0) {
                                        clearInterval(this.countDownInterval)
                                    }
                                })
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
                                                <h5>{item.name}</h5>
                                            </div>
                                            <p className="card-title">Current price:&nbsp;<NumberFormat displayType={'text'} value={item.currentPrice} thousandSeparator={true} suffix={' ETH'} /></p>
                                            {
                                                item.startedAt === 0 ? (
                                                    <p classname="card-price" style={{ flex: '1' }}>Auction hasn't started yet</p>
                                                ) : (
                                                        <p className="card-price" style={{ flex: '1' }}>
                                                            Time left :&nbsp; {fromMillisecondsToFormattedString(this.state.timeLeft)}
                                                        </p>
                                                    )
                                            }

                                            <Link className="btn btnbid" to={`/items/${item.id}`} role="button" style={{ marginTop: '5px' }}><i className="fas fa-gavel"></i> Bid now</Link>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}
export default SearchResult