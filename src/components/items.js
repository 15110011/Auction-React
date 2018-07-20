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
        fetch(`${root}/api/v1/items`)
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
                                    <div className="itemborder" style={{ borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
                                        <div className="item-image">
                                            {
                                                item.imgItem.lenghth !== 0  ? (
                                                    <Link className="detail" to={`/items/${item.id}`}>
                                                        <img className="img-fluid" src={`${root}/images/items/${item.imgItem[0].link}`} alt="car" style={{ borderTopLeftRadius: '10px', borderTopRightRadius: '10px', minHeight: '200px' }}
                                                        />

                                                    </Link>
                                                ) : (
                                                        <img className="img-fluid" src={`http://www.staticwhich.co.uk/static/images/products/no-image/no-image-available.png`} alt="No image" style={{ borderTopLeftRadius: '10px', borderTopRightRadius: '10px', minHeight: '200px' }} />

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
                                    </div>
                                    <Link className="btn btnbid" to={`/items/${item.id}`} role="button" style={{ marginTop: '5px' }}><i className="fas fa-gavel"></i> Bid now</Link>
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