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
                    <select className="custom-select" name="categories">
                        <option selected>Categories</option>
                        <option value="1">Cigars</option>
                        <option value="2">Diamond</option>
                        <option value="3">Cars</option>
                        <option value="4">Rings</option>
                        <option value="5">Painting</option>

                    </select>

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

            </div>
        )
    }
}
export default DashBoard
