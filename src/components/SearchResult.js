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
        console.log(this.props.history.location.state.results)
        var foundItems = this.props.history.location.state.results
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
                            <th scope="col">Details</th>
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