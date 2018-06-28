/*global FB */
import React, { Component } from 'react'
import { render } from 'react-dom'
import { Link } from 'react-router-dom'
import '../styles/styles.css'
import Header from './header';
import Footer from './footer';
import { LOADED_LOGIN_STATUS, GUEST_STATUS } from '../config';


class DashBoard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            userID: '',
            loadingItem: true,
            name: '',
            currentPrice: '',
            quantity: '',
            details: '',
            categoriesId: '',
            items: [],
            isAdded: false,
            isDeleted: false,
        }
        this.handleAddItem = this.handleAddItem.bind(this)
        this.getItem = this.getItem.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
    }
    componentDidMount() {

    }
    componentWillMount() {
        console.log('OK?', this.props)
        FB.api('/me', data => {
            console.log(data)
            if (!data.error) {
                this.setState({ userID: data.id, loadingItem: false }, () => {
                    this.getItem()
                })
            }
        })
        // this.props.history.push('./')
        // FB.getLoginStatus(resp => {
        //     console.log(resp)
        //     if (resp.status === 'connected') {
        //         this.setState({
        //             userID: resp.authResponse.userID,
        //             token: resp.authResponse.accessToken,
        //             name: this.props.userName
        //         })
        //     }
        //     else if (resp.status === 'authorization_expired') {
        //         this.setState({
        //             expired: true
        //         })
        //     }
        //     else {
        //         console.log("?????")
        //         this.setState({
        //             expired: true
        //         })
        //         FB.login()
        //         this.props.history.push('/')
        //     }
        // })
        // this.props.checkStatus()
    }
    handleDelete(e) {
        let value = e.currentTarget.value
        fetch(`/api/v1/items/${value}`, {
            method: 'DELETE'
        }).then(res => res.json())
            .then((rs) => {
                if (rs.deleteItem) {
                    this.setState({ isDeleted: true })
                    setTimeout(() => {
                        this.setState({ isDeleted: false })
                    }, 2000)
                    var items = this.state.items.slice()

                    items = items.filter((item) => {
                        return item.id !== +value
                    })
                    this.setState({ items })
                }
            })
    }
    handleAddItem(e) {

        e.preventDefault()
        let formBody = e.target
        console.log(formBody.name.value)
        const form = new FormData(e.target)
        fetch('/api/v1/items', {
            method: 'POST',
            body: form
        })
            .then(res => res.json())
            .then((res) => {
                console.log(res)
                if (res.item) {
                    this.setState({ isAdded: true, name: '', quantity: '', currentPrice: '', details: '', categoriesId: '' })
                    this.getItem()
                    setTimeout(() => {
                        this.setState({ isAdded: false })
                    }, 2000)
                }
            })
    }
    getItem() {
        const items = this.state.items

        fetch(`/api/v1/users/${this.state.userID}/items`)
            .then(items => {
                console.log(items)
                return items.json()
            })
            .then(items => {
                console.log(items)
                this.setState({ items: items.findItem })
            })
    }
    render() {
        const { currentNote }= this.props
        if (this.props.loggedIn === GUEST_STATUS) {
            return (
                <div className="container">
                    <p className="alert alert-danger" id="expired">Please log in</p>
                </div>
            )
        }
        return (
            <div className="container">
                <div className="dashboard">
                    {
                        this.state.expire === true && (
                            <p className="errorsInput" id="expired">Please logged in</p>
                        )
                    }
                    <div className="intro-dashboard">
                        <center>
                            <h2>Add your items below</h2>
                            <br />
                        </center>
                    </div>
                    <form className="form-inline" onSubmit={this.handleAddItem}>
                        <input
                            type="hidden"
                            name="userId"
                            value={this.props.userId}
                        />
                        <input
                            type="hidden"
                            name="token"
                            value={this.props.token}
                        />
                        <div className="form-group mx-sm-1 mb-2">
                            <input type="text" className="form-control" id="inputName" placeholder="Name" name="name"
                                value={this.state.name}
                                onChange={e => this.setState({ name: e.target.value })}
                            />
                        </div>
                        <div className="form-group mx-sm-1 mb-2">
                            <input type="text" className="form-control" id="inputPrice" placeholder="Price"
                                name="currentPrice"
                                value={this.state.currentPrice}
                                onChange={e => this.setState({ currentPrice: e.target.value })}
                            />
                        </div>
                        <div className="form-group mx-sm-1 mb-2">
                            <input type="text" className="form-control" id="inputQuantity" placeholder="Quantity"
                                name="quantity"
                                value={this.state.quantity}
                                onChange={e => this.setState({ quantity: e.target.value })}
                            />
                        </div>
                        <div className="form-group mx-sm-1 mb-2">
                            <input type="text" className="form-control" id="inputDetails" placeholder="Details"
                                name="details"
                                value={this.state.details}
                                onChange={e => this.setState({ details: e.target.value })}
                            />
                        </div>
                        <div className="form-group mx-sm-1 mb-2">
                            <select className="custom-select mr-sm-2" name="categories" >
                                <option selected>Categories</option>
                                <option value="1">Cigars</option>
                                <option value="2">Diamond</option>
                                <option value="3">Cars</option>
                                <option value="4">Rings</option>
                                <option value="5">Painting</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary mb-2">Add</button>
                        {
                            this.state.isAdded === true && (
                                <div class="alert alert-warning" role="alert">
                                    <strong>Item added</strong>
                                </div>

                            )
                        }
                        {
                            this.state.isDeleted === true && (
                                <div class="alert alert-warning" role="alert">
                                    <strong>Item deleted</strong>
                                </div>

                            )
                        }
                        <hr />
                    </form>
                    <br />
                    <div className="container" id="adddel-form">
                        {this.state.loadingItem ? <div style={{ textAlign: 'center', zIndex: '900', position: 'relative' }}><img src="./images/loading.gif" style={{ maxHeight: '400px', maxWidth: '400px' }} /></div> : <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Category</th>
                                    <th scope="col">Details</th>
                                    <th scope="col">Action</th>
                                    <th scope="col">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.items.map(item => {
                                        return (
                                            <tr className="fixprop">
                                                <th scope="row">1</th>
                                                <td>{item.name}</td>
                                                <td>{item.currentPrice}</td>
                                                <td>{item.quantity}</td>
                                                <td>{item.categoriesId}</td>
                                                <td>
                                                    <div className="edit-del">
                                                        <button className="btn btn-info" style={{ color: '#1d93c1' }}><i class="fas fa-eye"></i></button>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="edit-del">
                                                        <button className="btn btn-success"><i class="far fa-edit"></i></button>
                                                        <button className="btn btn-danger mx-2" onClick={this.handleDelete} value={item.id}><i class="far fa-trash-alt"></i></button>
                                                    </div>
                                                </td>
                                                <td>{item.quantity}</td>
                                            </tr>

                                        )
                                    })
                                }


                            </tbody>
                        </table>}
                    </div>
                </div>
            </div>
        )
    }
}
export default DashBoard
