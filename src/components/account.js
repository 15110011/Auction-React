import React, { Component } from 'react'
import { render } from 'react-dom'
import { Link } from 'react-router-dom'
import '../styles/styles.css'
import Header from './header';
import Footer from './footer';

class Account extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            currentPrice: '',
            quantity: '',
            details: '',
            items:[],
            isAdded: false
        }
        this.handleAddItem = this.handleAddItem.bind(this)
    }
    handleAddItem(e) {
        e.preventDefault()
        const form = new FormData(e.target)
        fetch('/api/v1/items', {
            method: 'POST',
            body: form
        })
            .then(res => res.json())
            .then((res) => {
                if (res.itemSuccess) {
                    this.setState({ isAdded : true })
                }
                
            })
    }
    render() {
        return (
            <div>
                <form onSubmit={this.handleAddItem}>
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
                </form>

            </div>
        )
    }
}
export default Account
