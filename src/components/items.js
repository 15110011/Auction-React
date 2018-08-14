import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../styles/styles.css'
import NumberFormat from 'react-number-format';
import dateFns from 'date-fns'


class Items extends Component {

    constructor(props) {
        super(props)
        this.state = {
            items: [],
            timeLeft: 0,
        }
        this.setCountDown = this.setCountDown.bind(this)
    }
    componentWillMount() {
        clearInterval(this.countDownInterval)
        // fetch(`${root}/api/v1/items`)
        //     .then(res => res.json())
        //     .then(res => {
        //         this.setState({
        //             items: res.getAllItems
        //         })
        //     })
    }
    setCountDown() {
        if (this.state.items && this.state.items.startedAt !== 0) {
            console.log(this.state.items)
            let endTime = dateFns.getTime(dateFns.addHours(this.state.items.startedAt, this.state.items.period))
            let currTime = dateFns.getTime(new Date())
            let timeLeft = endTime + this.state.items.additionalTime - currTime

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
    componentDidMount() {
        this.countDownInterval = []
        fetch(`${root}/api/v1/liveItems`)
            .then(item => item.json())
            .then(item => {
                var realTimeItems = item.realTimeItems
                console.log(item)
                realTimeItems.map((item, i) => {
                    let index = i
                    // let endTime = dateFns.getTime(dateFns.addHours(item.startedAt, item.period))
                    // let curTime = dateFns.getTime(new Date())
                    // let timeLeft = endTime + item.additionalTime - curTime
                    // item.timeLeft = timeLeft
                    if (this.countDownInterval) {
                        clearInterval(this.countDownInterval[index])
                    }
                    if (item && item.startedAt !== 0) {
                        this.countDownInterval[index] = setInterval(() => {
                            let remainTime = item.timeLeft - 1000
                            if (remainTime <= 0) {
                                clearInterval(this.countDownInterval[index])
                            }
                            else {
                                item.timeLeft = remainTime
                                this.setState({ remainTime })
                            }
                        }, 1000)
                    }
                    return item
                })
                this.setState({ items: realTimeItems })
            })
    }
    fromMillisecondsToFormattedString(ms) {
        let h = Math.floor(ms / (3600 * 1000))
        let m = Math.floor((ms - (3600 * 1000 * h)) / (60 * 1000))
        let s = Math.floor((ms - (3600 * 1000 * h) - (60 * 1000 * m)) / (1000))
        return `${h < 10 ? '0' + h : h}:${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`
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
                                        <p className="card-title">Current bid:&nbsp;<NumberFormat displayType={'text'} value={item.curPrice} thousandSeparator={true} prefix={'$'} /></p>
                                        <p className="card-price">
                                            End:&nbsp;{this.fromMillisecondsToFormattedString(item.timeLeft)}
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
