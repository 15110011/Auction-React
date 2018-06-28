import React, { Component } from 'react'
import { render } from 'react-dom'
import '../styles/styles.css'

class AdminPendingItems extends Component {
    constructor(props) {
        super(props)
        this.state = {
            items: []
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
                <table>
                    <thead>
                        <tr>
                            <th>Item ID</th>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Owner</th>
                            <th>Category</th>
                            <th>Specification</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.items.map((item) => {
                            return(
                            <tr>
                                <td>
                                    {item.id}
                                </td>
                                <td>{item.name}</td>
                                <td>{item.quantity}</td>
                                <td>{item.currentPrice}</td>
                                <td>{item.userId}</td>
                                <td>{item.categoriesId}</td>
                                <td>{item.details}</td>
                                <td><input type="checkbox" name= "selectedItem" value={item.id} /></td>
                            </tr>)
                            })
                        }

                    </tbody>
                </table>
                </div>
        )
    }
}

export default AdminPendingItems 