/*global FB */
import React, { Component } from 'react'
import { render } from 'react-dom'
import { Link } from 'react-router-dom'
import '../styles/styles.css'
import Header from './header';
import Footer from './footer';

class DashBoard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userID: '',
            token: '',
            expired: false,
            name: '',
            items: [],
            isAdded: false
        }
        this.handleAddItem = this.handleAddItem.bind(this)
    }
    componentWillMount() {
        FB.getLoginStatus(resp => {
            console.log(resp)
            if (resp.status === 'connected') {
                this.setState({
                    userID: resp.authResponse.userID,
                    token: resp.authResponse.accessToken,
                    name: this.props.userName
                })
            }
            else if (resp.status === 'authorization_expired') {
                this.setState({
                    expired: true
                })
            }
            else {
                this.setState({
                    expired: true
                })
                FB.login()
                this.props.history.push('/')
            }
        })
    }
    handleAddItem(e) {

        e.preventDefault()
        const form = new FormData(e.target)
        fetch('/api/v1/items', {
            method: 'POST',
            body: form
        })
            // .then(res => res.json())
            .then((res) => {
                if (res.itemSuccess) {
                    this.setState({ isAdded: true })
                    this.getItem()
                }
            })
    }
    getItem() {
        const items = this.state.items
        if (this.state.isAdded) {
            fetch('/api/v1/users/:userId/items')
                .then(item => item.json())
                .then(item => {
                    items.push({
                        name: item.name,
                        currentPrice: item.currentPrice,
                        quantity: item.quantity,
                        details: item.details
                    })
                    this.setState({ items })
                })
        }
    }
    render() {

        return (
            <div>
                {
                    this.state.expire === true && (
                        <p className="errorsInput" id="expired">Please logged in</p>
                    )
                }
                <form onSubmit={this.handleAddItem}>
                    <input
                        type="hidden"
                        name="userName"
                        value={this.state.name}
                    />
                    <input
                        type="hidden"
                        name="userId"
                        value={this.state.userID}
                    />
                    <input
                        type="hidden"
                        name="token"
                        value={this.state.token}
                    />
                    <input
                        placeholder="Name"
                        name="name"
                        value={this.state.name}
                        onChange={e => this.setState({ name: e.target.value })}
                    />
                    <input
                        placeholder="Price"
                        name="currentPrice"
                        value={this.state.currentPrice}
                        onChange={e => this.setState({ currentPrice: e.target.value })}
                    />
                    <input
                        placeholder="Quantity"
                        name="quantity"
                        value={this.state.quantity}
                        onChange={e => this.setState({ quantity: e.target.value })}
                    />
                    <input
                        placeholder="Details"
                        name="details"
                        value={this.state.details}
                        onChange={e => this.setState({ details: e.target.value })}
                    />
                    <button type="submit">Add item</button>
                    {
                        this.state.isAdded === true && (
                            <p className="errorsInput" id="valid">Success</p>

                        )
                    }
                    <hr />
                    {
                        this.state.items.map(item => {
                            return (
                                <ul>
                                    <li>{item.name}</li>
                                    <li>{item.currentPrice}</li>
                                    <li>{item.quantity}</li>
                                    <li>{item.details}</li>
                                </ul>
                            )
                        })
                    }
                </form>
                <hr />
                <div className="container">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Price</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Details</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="fixprop">
                                <th scope="row">1</th>
                                <td>{this.state.name}</td>
                                <td>{this.state.currentPrice}</td>
                                <td>{this.state.quantity}</td>
                                <td>
                                    <div className="edit-del">
                                        <button className="btn btn-info" style={{color:'#1d93c1'}}><i class="fas fa-eye"></i></button>
                                    </div>
                                </td>
                                <td>
                                    <div className="edit-del">
                                    <button className="btn btn-success"><i class="far fa-edit"></i></button>
                                    <button className="btn btn-danger mx-2"><i class="far fa-trash-alt"></i></button>    
                                    </div>
                                </td>
                            </tr>
                            <tr className="fixprop">
                                <th scope="row">2</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                <td>
                                    <div className="edit-del">
                                        <button className="btn btn-info" style={{color:'#1d93c1'}}><i class="fas fa-eye"></i></button>
                                    </div>
                                </td>
                                <td>
                                    <div className="edit-del">
                                    <button className="btn btn-success"><i class="far fa-edit"></i></button>
                                    <button className="btn btn-danger mx-2"><i class="far fa-trash-alt"></i></button>    
                                    </div>
                                </td>
                            </tr>
                            <tr className="fixprop">
                                <th scope="row">3</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                <td>
                                    <div className="edit-del">
                                        <button className="btn btn-info" style={{color:'#1d93c1'}}><i class="fas fa-eye"></i></button>
                                    </div>
                                </td>
                                <td>
                                    <div className="edit-del">
                                    <button className="btn btn-success"><i class="far fa-edit"></i></button>
                                    <button className="btn btn-danger mx-2"><i class="far fa-trash-alt"></i></button>    
                                    </div>
                                </td>
                            </tr>
                            <tr className="fixprop">
                                <th scope="row">4</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                <td>
                                    <div className="edit-del">
                                        <button className="btn btn-info" style={{color:'#1d93c1'}}><i class="fas fa-eye"></i></button>
                                    </div>
                                </td>
                                <td>
                                    <div className="edit-del">
                                    <button className="btn btn-success"><i class="far fa-edit"></i></button>
                                    <button className="btn btn-danger mx-2"><i class="far fa-trash-alt"></i></button>    
                                    </div>
                                </td>
                            </tr>
                            <tr className="fixprop">
                                <th scope="row">5</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                <td>
                                    <div className="edit-del">
                                        <button className="btn btn-info" style={{color:'#1d93c1'}}><i class="fas fa-eye"></i></button>
                                    </div>
                                </td>
                                <td>
                                    <div className="edit-del">
                                    <button className="btn btn-success"><i class="far fa-edit"></i></button>
                                    <button className="btn btn-danger mx-2"><i class="far fa-trash-alt"></i></button>    
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
export default DashBoard
