import React, { Component } from 'react'
import { render } from 'react-dom'
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import { FormGroup, Label, Input } from 'reactstrap';
import '../styles/styles.css'
import classnames from 'classnames';



class AdminPendingItems extends Component {
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
                                Pending Items
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '2' })}
                                onClick={() => { this.toggle('2'); }}
                            >
                                Category
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
                                                <th scope="col">Item ID</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Price</th>
                                                <th scope="col">Quantity</th>
                                                <th scope="col">Category</th>
                                                <th scope="col">Owner</th>
                                                <th scope="col">Detail</th>
                                                <th scope="col">
                                                    <select id="inputState" className="btn btn-secondary">
                                                        <option value='1'>Accept</option>
                                                        <option value='2'>Reject</option>
                                                    </select>
                                                </th>
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
                                                            <td>
                                                                <FormGroup check>
                                                                    <Label check />
                                                                    <Input type="checkbox" />{' '}
                                                                </FormGroup>
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
                                    <form className="form-inline mt-4 d-flex justify-content-center">
                                        <div className="form-group mx-sm-1 mb-2">
                                            <input type="text" className="form-control" id="inputName" placeholder="Category" name="name"
                                            />
                                        </div>
                                        <button type="submit" className="btn btn-primary mb-2">Add</button>
                                    </form>
                                    <table class="table table-striped mt-4">
                                        <thead>
                                            <tr>
                                                <th scope="col">ID</th>
                                                <th scope="col">Category</th>
                                                <th scope="col">Total</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.items.map(item => {
                                                    return (
                                                        <tr className="fixprop">
                                                            <td>1</td>
                                                            <td>2</td>
                                                            <td>3</td>
                                                            <td>
                                                                <div className="edit-del">
                                                                    <button className="btn btn-success"><i class="far fa-edit"></i></button>
                                                                    <button className="btn btn-danger mx-2" onClick={this.handleDelete} value={item.id}><i class="far fa-trash-alt"></i></button>
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

export default AdminPendingItems 