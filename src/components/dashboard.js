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
            name: '',
            currentPrice: '',
            quantity: '',
            details: '',
            items: [],
            isAdded: false
        }
        this.handleAddItem = this.handleAddItem.bind(this)
    }
    handleAddItem(e) {
        const items = this.state.items.slice()
        e.preventDefault()
        const form = new FormData(e.target)
        fetch('/api/v1/items', {
            method: 'POST',
            body: form
        })
            .then(res => res.json())
            .then((res) => {
                if (res.itemSuccess) {
                    this.setState({ isAdded: true })
                }
                console.log(items)
                items.push({
                    name: res.name,
                    currentPrice: res.currentPrice,
                    quantity: res.quantity,
                    details: res.details
                })
                console.log(items)
                this.setState({ items })
            })
    }
    render() {
        return (
            <div className="dashboard">
                <div className="intro">
                <label><h2>Add your items below</h2></label>
                </div>
                <form className="form-inline addform" onSubmit={this.handleAddItem}>
                    <div className="form-group mx-sm-1 mb-2">
                        <label for="inputName" className="sr-only">Password</label>
                        <input type="text" className="form-control" id="inputName"
                            placeholder="Name"
                            name="name"
                            value={this.state.name}
                            onChange={e => this.setState({ name: e.target.value })}
                        />
                    </div>
                    <div className="form-group mx-sm-1 mb-2">
                        <label for="inputPrice" className="sr-only">Price</label>
                        <input type="text" className="form-control" id="inputPrice"
                            placeholder="Price"
                            name="currentPrice"
                            value={this.state.currentPrice}
                            onChange={e => this.setState({ currentPrice: e.target.value })}
                        />
                    </div>
                    <div className="form-group mx-sm-1 mb-2">
                        <label for="inputQuantity" className="sr-only">Quantity</label>
                        <input type="text" className="form-control" id="inputQuantity"
                            placeholder="Quantity"
                            name="quantity"
                            value={this.state.quantity}
                            onChange={e => this.setState({ quantity: e.target.value })}
                        />
                    </div>
                    <div className="form-group mx-sm-1 mb-2">
                        <label for="inputDetail" className="sr-only">Password</label>
                        <input type="text" className="form-control" id="inputDetail"
                            placeholder="Details"
                            name="details"
                            value={this.state.details}
                            onChange={e => this.setState({ details: e.target.value })}
                        />
                    </div>
                    <button type="submit" class="btn btn-primary mb-2">Add</button>
                    {
                        this.state.isAdded === true && (
                            <p className="errorsInput" id="valid">Success</p>
                        )
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
