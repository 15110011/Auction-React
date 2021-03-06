import React, { Component } from 'react'
import { Row, Col } from 'reactstrap';
import { FormGroup, Label, Input } from 'reactstrap';
import '../styles/styles.css'
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import _ from 'lodash'
import { Link } from 'react-router-dom'


class AdminPendingItems extends Component {
    constructor(props) {
        super(props)

        this.state = {
            items: [],
            itemsStatus: [],
            selectedCount: 0,
            isAccept: null
        }
    }

    componentDidMount() {
        fetch('/api/v1/pendingitems/', {
            credentials: 'include'
        }).then(res => res.json())
            .then(items => {
                if (!items.error) {
                    this.setState({
                        items: items.pendingItems, itemsStatus: items.pendingItems.map(i => {
                            return { id: i.id, itemName: i.name, selected: false, ownerId: i.userId }
                        })
                    })
                }
            })
    }

    onSelectCheckBox(e) {
        let index = _.findIndex(this.state.itemsStatus, i => {
            return i.id === +e.target.value
        })
        console.log(index, e.target.value)
        if (index > -1) {
            let cloneSelected = this.state.itemsStatus.slice()
            cloneSelected[index].selected = !cloneSelected[index].selected
            this.setState({ itemsStatus: cloneSelected })
            if (cloneSelected[index].selected) {
                let newSelectedCount = this.state.selectedCount + 1
                this.setState({ selectedCount: newSelectedCount })
            }
            else {
                let newSelectedCount = this.state.selectedCount - 1

                this.setState({ selectedCount: newSelectedCount })

            }
        }
    }
    onClickButton(e) {
        let button = e.currentTarget
        console.log(button.value)

        if (button.value) {
            let selectedItems = _.filter(this.state.itemsStatus, { selected: true })
            this.props.io.socket.patch('/api/v1/pendingitems/', {
                type: button.value,
                selectedItems,
                adminId: this.props.userId

            }, (res) => {
                if (!res.error) {
                    console.log(res.isAccept)
                    let remainPending = _.filter(this.state.items, i => {

                        return _.findIndex(selectedItems, selected => { return i.id === selected.id }) === -1
                    })

                    this.setState({
                        isAccept: res.isAccept,
                        items: remainPending, itemsStatus: remainPending.map(i => {
                            return { id: i.id, selected: false, ownerId: i.userId, itemName: i.name }
                        }), selectedCount: 0
                    })
                    console.log(this.state.itemsStatus)
                }
            })
        }
    }
    render() {

        return (
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
                                    <div className="btn-group">
                                        <button type="button" className="btn btn-danger dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            Action on {this.state.selectedCount} {this.state.selectedCount <= 1 ? 'item' : 'items'}
                                        </button>
                                        <div className="dropdown-menu dropdown-menu-right">
                                            <button className="dropdown-item" name="action" value="ACCEPT" onClick={e => this.onClickButton(e)}>Accept</button>
                                            <button className="dropdown-item" name="action" value="REJECT" onClick={e => this.onClickButton(e)}>Reject</button>
                                        </div>
                                    </div>

                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.items.map(item => {
                                    return (
                                        <tr className="fixprop" key={item.id}>
                                            <td>
                                                {item.id}
                                            </td>
                                            <td>{item.name}</td>
                                            <td>{item.currentPrice}</td>
                                            <td>{item.quantity}</td>
                                            <td>{item.categoryName}</td>
                                            <td>{item.userId}</td>
                                            <td>
                                                <div className="edit-del">
                                                    <Link style={{ color: '#1d93c1' }} className="btn btn-info" to={`/items/${item.id}`}><i className="fas fa-eye"></i></Link>
                                                </div>
                                            </td>
                                            <td>
                                                <FormGroup check>
                                                    <Label check />
                                                    <Input type="checkbox" value={item.id} onChange={e => this.onSelectCheckBox(e)} />{' '}
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
        )

    }
}

export default AdminPendingItems 