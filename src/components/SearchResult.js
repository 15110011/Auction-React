import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './../styles/setting.css'

class SearchResult extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        var foundItems = this.props.history.location.state.results
        if (foundItems.length === 0) {
            return (
                <div role="alert" style={{ marginTop: '75px' }}>
                    <p className="alert alert-warning text-center light-word">Item not found</p>
                </div>
            )
        }
        return (
            <div className="container" id="adddel-form">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Category</th>
                            <th scope="col">Bid now</th>
                        </tr>
                    </thead>
                    <tbody className="light-word">
                        {
                            foundItems.map((item, i) => {
                                return (
                                    <tr className="fixprop" key={item.id}>
                                        <th scope="row">{i + 1}</th>
                                        <td>{item.name}</td>
                                        <td>{item.currentPrice}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.categoriesId}</td>
                                        <td>
                                            <div className="edit-del">
                                                <Link className="btn btn-info" style={{ color: '#1d93c1' }} to={`/items/${item.id}`}><i className="fas fa-eye"></i></Link>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}
export default SearchResult