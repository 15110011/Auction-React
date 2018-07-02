import React, { Component } from 'react'
import { render } from 'react-dom'
import '../styles/styles.css'
import { LOADED_LOGIN_STATUS, GUEST_STATUS } from '../config';
import { Editor, EditorState } from 'draft-js';

class EditItem extends Component {
    constructor(props) {
        super(props)
        this.EditItem = this.EditItem.bind(this)
        this.cancelClick = this.cancelClick.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    EditItem(e) {
        e.preventDefault()
        const form = new FormData(e.target)
        let value = e.target
        fetch(`/api/v1/items/${this.props.itemId}`, {
            method: 'PATCH',
            body: form
        }).then(res => res.json())
            .then((rs) => {
                if (rs.editItem) {
                    console.log(value)
                    this.props.editSuccess(value)
                }
            })

    }

    cancelClick(e) {
        e.preventDefault()
        this.props.handleCancel(e)
    }
    handleChange(e) {
        this.props.handleChange(e)
    }
    render() {
        return (
            <div>
                {
                    this.props.isEditing === true && (
                        <form className="form-inline" onSubmit={this.EditItem}>
                            <input
                                type="hidden"
                                name="userId"
                                value={this.props.userId}
                            />
                            <input
                                type="hidden"
                                name="itemId"
                                value={this.props.itemId}
                            />
                            <div className="form-group mx-sm-1 mb-2">
                                <input type="text" className="form-control" id="inputName" placeholder="Name" name="name"
                                    defaultValue={this.props.name}
                                    onChange={e => this.setState({ name: e.target.name })}
                                />
                            </div>
                            <div className="form-group mx-sm-1 mb-2">
                                <input type="number" className="form-control" id="inputPrice" placeholder="Price"
                                    name="currentPrice"
                                    defaultValue={this.props.currentPrice}
                                    onChange={e => this.setState({ currentPrice: e.target.currentPrice })}
                                />
                            </div>
                            <div className="form-group mx-sm-1 mb-2">
                                <input type="number" className="form-control" id="inputQuantity" placeholder="Quantity"
                                    name="quantity"
                                    defaultValue={this.props.quantity}
                                    onChange={e => this.setState({ quantity: e.target.quantity })}
                                />
                            </div>
                            <div className="form-group mx-sm-1 mb-2">
                                <input type="text" className="form-control" id="inputDetails" placeholder="Details"
                                    name="details"
                                    defaultValue={this.props.details}
                                    onChange={e => this.setState({ details: e.target.details })}
                                />
                            </div>
                            <div className="form-group mx-sm-1 mb-2">
                                <select value={this.props.categoriesId} onChange={this.handleChange} className="custom-select mr-sm-2" name="categories" >
                                    <option selected>Categories</option>
                                    <option value="1">Cigars</option>
                                    <option value="2">Diamond</option>
                                    <option value="3">Cars</option>
                                    <option value="4">Rings</option>
                                    <option value="5">Painting</option>
                                </select>
                            </div>
                            <div className="edit-cancel" style={{marginLeft:'42%'}}>
                                <button type="submit" className="btn btn-success mb-2 mt-3">Edit</button>
                                <button onClick={this.cancelClick} type="submit" className="btn btn-danger mt-3 mb-2 ml-2">Cancel</button>
                            </div>
                        </form>
                    )
                }
            </div>
        )
    }
}
export default EditItem