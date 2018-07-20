import React, { Component } from 'react'
import { render } from 'react-dom'
import { Link } from 'react-router-dom'
import '../styles/styles.css'
import Footer from './footer';
import NumberFormat from 'react-number-format';


class Items extends Component {

    constructor(props) {
        super(props)
        this.state = {
            items: []
        }
    }
    componentWillMount() {
        fetch('/api/v1/items')
            .then(res => res.json())
            .then(res => {
                this.setState({
                    items: res.getAllItems
                })
                console.log(this.state.items)
            })
    }
    render() {
        const { items } = this.state
        return (
            <div className="container">
                <div className="row">
                    {
                        items.map(item => {
                            return (
                                <div className="col-md-3" style={{ marginTop: '25px' }}>
                                    <div className="itemborder">
                                        <div className="item-image">
                                            {
                                                item.imgItem ? (
                                                    <Link className="detail" to="/itemdetail">
                                                        <img className="img-fluid" src={`http://localhost:1337/images/items/${item.imgItem[0].link}`} alt="car" style={{ height: '100px' }}
                                                        />

                                                    </Link>
                                                ) : (
                                                        <img className="img-fluid" src={`http://www.staticwhich.co.uk/static/images/products/no-image/no-image-available.png`} alt="No image" />

                                                    )
                                            }

                                        </div>
                                        <div className="time-price">
                                            <div className="row d-flex justify-content-between">
                                                <div className="col-md-6">{item.name}</div>
                                                <div className="col-md-6" id="price">
                                                    <NumberFormat displayType={'text'} value={item.currentPrice} thousandSeparator={true} prefix={'$'} />
                                                </div>
                                            </div>
                                        </div>
                                        <Link className="btn btnbid" to={`/items/${item.id}`} role="button" style={{ marginTop: '5px' }}><i className="fas fa-gavel"></i> Bid now</Link>
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