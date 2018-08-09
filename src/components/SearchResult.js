import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './../styles/setting.css'
import NumberFormat from 'react-number-format';


class SearchResult extends Component {
    
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
            <div className="container" id="adddel-form" style={{ position: 'relative', zIndex: '1000', minHeight: '100vh' }}>
                <div className="page-header" style={{ marginTop: '100px' }}>
                    <h1>Search results</h1>
                </div>
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
                                        <td><NumberFormat displayType={'text'} value={item.currentPrice} thousandSeparator={true} prefix={'$'} /></td>
                                        <td>{item.quantity}</td>
                                        <td>{item.categoryName}</td>
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