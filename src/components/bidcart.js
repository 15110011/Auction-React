import React, { Component } from 'react'
import { render } from 'react-dom'
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import { FormGroup, Label, Input } from 'reactstrap';
import '../styles/styles.css'
import classnames from 'classnames';
import { Link } from 'react-router-dom'
import dateFns from 'date-fns'
import NumberFormat from 'react-number-format';
import { LOADED_LOGIN_STATUS, GUEST_STATUS } from '../config';




class Bidcart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            items: [],
            activeTab: '1',
            timeLeft: 0,
            bidding: false
        }
        this.toggle = this.toggle.bind(this);
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }
    componentDidMount() {
        if (this.props.userId) {
            fetch(`/api/v1/bidding/${this.props.userId}`)
                .then(item => item.json())
                .then(item => {
                    var biddingItems = item.biddingItems
                    console.log(biddingItems[0].startedAt)
                    biddingItems.map(item => {

                        let endTime = dateFns.getTime(dateFns.addHours(item.startedAt, item.period))
                        let curTime = dateFns.getTime(new Date())
                        let timeLeft = endTime - curTime

                        item.timeLeft = timeLeft
                        return item
                    })
                    setInterval(() => {
                        var itemTime = biddingItems.slice()
                        itemTime.map(item => {
                            item.timeLeft = item.timeLeft - 1000
                            return item
                        })
                        this.setState({ item: itemTime })
                    }, 1000)
                    this.setState({ items: biddingItems, bidding: true })

                })
        }
    }
    fromMillisecondsToFormattedString(ms) {
        let h = Math.floor(ms / (3600 * 1000))
        let m = Math.floor((ms - (3600 * 1000 * h)) / (60 * 1000))
        let s = Math.floor((ms - (3600 * 1000 * h) - (60 * 1000 * m)) / (1000))
        return `${h < 10 ? '0' + h : h}:${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`
    }
    render() {
        if (this.props.loggedIn === GUEST_STATUS) {
            return (
                <div className="container">
                    <p className="alert alert-danger" id="expired" style={{ marginTop: '75px' }}>Please log in</p>
                </div>
            )
        }

        return (
            <div>
                <div className="container adminpanel" style={{ paddingTop: '30px' }}>
                    <Nav tabs>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '1' })}
                                onClick={() => { this.toggle('1'); }}
                            >
                                Bidding Items
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '2' })}
                                onClick={() => { this.toggle('2'); }}
                            >
                                Winning Items
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '3' })}
                                onClick={() => { this.toggle('3'); }}
                            >
                                Losing Items
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={this.state.activeTab} id="admin-panel">
                        <TabPane tabId="1">
                            <Row>
                                <Col sm="12">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Current Price</th>
                                                <th scope="col">Quantity</th>
                                                <th scope="col">Category</th>
                                                <th scope="col">Time left</th>
                                                <th scope="col">Detail</th>
                                            </tr>
                                        </thead>
                                        {
                                            this.state.bidding ? (
                                                <tbody>
                                                    {
                                                        this.state.items.map(item => {
                                                            return (
                                                                <tr className="fixprop">
                                                                    <td>
                                                                        {item.itemId}
                                                                    </td>
                                                                    <td>{item.itemName}</td>

                                                                    <td>
                                                                        <NumberFormat displayType={'text'} value={item.curPrice} thousandSeparator={true} prefix={'$'} />
                                                                    </td>
                                                                    <td>{item.quantity}</td>
                                                                    <td>{item.categoryName}</td>
                                                                    <td>{this.fromMillisecondsToFormattedString(item.timeLeft)}</td>
                                                                    <td>
                                                                        <div className="edit-del">
                                                                            <Link className="btn btn-info" style={{ color: '#1d93c1' }} to={`/items/${item.itemId}`}><i className="fas fa-eye"></i></Link>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                            ) : (
                                                    <div role="alert" style={{ marginTop: '5px', position: 'absolute', left: '40%', width: '20%' }}>
                                                        <p className="alert alert-warning text-center light-word">No bidding item</p>
                                                    </div>
                                                )
                                        }
                                    </table>
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tabId="2">
                            <Row>
                                <Col sm="12">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Price</th>
                                                <th scope="col">Quantity</th>
                                                <th scope="col">Category</th>
                                                <th scope="col">Owner</th>
                                                <th scope="col">Detail</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.items.map(item => {
                                                    return (
                                                        <tr className="fixprop">
                                                            <td>
                                                                {item.id}
                                                            </td>
                                                            <td>{item.name}</td>
                                                            <td>{item.currentPrice}</td>
                                                            <td>{item.quantity}</td>
                                                            <td>{item.categoriesId}</td>
                                                            <td>{item.userId}</td>
                                                            <td>
                                                                <div className="edit-del">
                                                                    <button className="btn btn-info" style={{ color: '#1d93c1' }}><i className="fas fa-eye"></i></button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tabId="3">
                            <Row>
                                <Col sm="12">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Price</th>
                                                <th scope="col">Quantity</th>
                                                <th scope="col">Category</th>
                                                <th scope="col">Owner</th>
                                                <th scope="col">Detail</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.items.map(item => {
                                                    return (
                                                        <tr className="fixprop">
                                                            <td>
                                                                {item.id}
                                                            </td>
                                                            <td>{item.name}</td>
                                                            <td>{item.currentPrice}</td>
                                                            <td>{item.quantity}</td>
                                                            <td>{item.categoriesId}</td>
                                                            <td>{item.userId}</td>
                                                            <td>
                                                                <div className="edit-del">
                                                                    <button className="btn btn-info" style={{ color: '#1d93c1' }}><i className="fas fa-eye"></i></button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </Col>
                            </Row>
                        </TabPane>
                    </TabContent>
                </div>
            </div>

        )
    }
}
export default Bidcart