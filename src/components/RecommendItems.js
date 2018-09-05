import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import NumberFormat from 'react-number-format';
import { fromMillisecondsToFormattedString } from '../config'
export default class RecommendItems extends Component {
    constructor(props) {
        super(props)
        this.state = {
            recItems: []
        }
    }
    componentDidMount() {
        fetch(`${root}/api/v1/recommendItems/${this.props.userId}?exclude=${this.props.itemId}`)
            .then(res => res.json())
            .then(res => {
                if (res.recommendItems.length > 0) {
                    this.countDownInterval = []
                    res.recommendItems.map((item, i) => {
                        let index = i
                        if (this.countDownInterval) {
                            clearInterval(this.countDownInterval[index])
                        }
                        if (item && item.startedAt !== 0) {
                            this.countDownInterval[index] = setInterval(() => {
                                let cloneRecItems = [].concat(this.state.recItems)
                                let remainTime = cloneRecItems[index].timeLeft - 1000
                                if (remainTime <= 0) {
                                    clearInterval(this.countDownInterval[index])
                                }
                                else {
                                    item.timeLeft = remainTime
                                    this.setState({ recItems: cloneRecItems })
                                }
                            }, 1000)
                        }
                        return item
                    })
                    this.setState({
                        recItems: res.recommendItems
                    })
                }
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
        const { recItems } = this.state
        return (
            <Fragment>
                {recItems.map(item => {
                    return (
                        <div className="col card zoom" style={{ marginTop: '48px' }} key={item.itemId}>
                            <Link className="borderitem" to={`/items/${item.itemId}`}>
                                <img className="card-img-top" src={item.link ? `/uploads/${item.link}` : `http://www.staticwhich.co.uk/static/images/products/no-image/no-image-available.png`} alt="" style={{ minHeight: '200px', maxHeight: '200px', objectFit: 'cover' }} />
                            </Link>
                            <div className="card-body shadow">
                                <div className="text-center">
                                    <h5>{item.itemName}</h5>
                                </div>
                                <p className="card-title">Current bid: <NumberFormat displayType={'text'} value={item.curPrice} thousandSeparator={true} suffix={' BLC'} /> </p>
                                <p className="card-price">
                                    End in: {fromMillisecondsToFormattedString(item.timeLeft)}
                                </p>
                            </div>
                        </div>)
                })}
            </Fragment>
        )
    }
}