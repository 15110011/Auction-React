import React, { Component } from 'react'
import { render } from 'react-dom'
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import { FormGroup, Label, Input } from 'reactstrap';
import '../styles/styles.css'
import classnames from 'classnames';

class Bidcart extends Component{
    constructor(props) {
        super(props)
        this.state = {
            items: [],
            activeTab: '1',
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
        fetch('/api/v1/pendingitems/').then(res => res.json())
            .then(items => {
                if (!items.error) {
                    console.log(items)
                    this.setState({ items: items.pendingItems })
                }
            })
    }
    render() {

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
                                                <th scope="col">Price</th>
                                                <th scope="col">Quantity</th>
                                                <th scope="col">Category</th>
                                                <th scope="col">Owner</th>
                                                <th scope="col">Time left</th>
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
                                                            <td>04:54:21</td>
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