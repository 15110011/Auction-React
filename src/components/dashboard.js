/*global FB */
import React, { Component } from 'react'
import { render } from 'react-dom'
import '../styles/styles.css'
import { LOADED_LOGIN_STATUS, GUEST_STATUS } from '../config';
import EditItem from './EditItem'
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import _ from 'lodash'
import { convertFromRaw, convertFromHTML, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


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
            categories: [],
            items: [],
            value: '',
            isAdded: false,
            isDeleted: false,
            isEditing: false,
            itemId: '',
            isEdited: false,
            isAdding: true,
            contentState: {},
            editorState: EditorState.createEmpty()
        }
        this.handleAddItem = this.handleAddItem.bind(this)
        this.getItem = this.getItem.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleEdit = this.handleEdit.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.editSuccess = this.editSuccess.bind(this)
        this.onEditorStateChange = this.onEditorStateChange.bind(this)
    }

    componentDidMount() {

        FB.api('/me', data => {
            if (!data.error) {
                this.setState({ userID: data.id, loadingItem: false }, () => {
                    this.getItem()
                })
            }
        })
        fetch('/api/v1/categories').then(res => res.json()).then(res => {
            let cloneCat = this.state.categories.slice()
            res.cats.map(cat => {
                cloneCat[cat.id]=cat.name
                return true
            })

            // let initCat =[]
            // initCat.push(...res.cats)
            this.setState({categories: cloneCat })  

        })
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
                    }, 1000)
                    var items = this.state.items.slice()

                    items = items.filter((item) => {
                        return item.id !== +value
                    })
                    this.setState({ items })
                }
            })
    }
    onEditorStateChange(editorState) {
        this.setState({
            editorState,
        });
    };

    handleAddItem(e) {

        e.preventDefault()
        let formBody = e.target
        const form = new FormData(e.target)
        form.append('details', draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())))
        fetch('/api/v1/items', {
            method: 'POST',
            body: form
        })
            .then(res => res.json())
            .then((res) => {
                if (res.item) {
                    this.setState({ isAdded: true, name: '', quantity: '', currentPrice: '', details: '', categoriesId: '' })
                    this.getItem()
                    setTimeout(() => {
                        this.setState({ isAdded: false })
                    }, 1000)
                }
            })
    }
    editSuccess(target) {
        var items = this.state.items.slice()
        let curItem = _.findIndex(items, { id: this.state.itemId })
        if (curItem > -1) {
      
            items[curItem].name = target.name.value
            items[curItem].currentPrice = target.currentPrice.value
            items[curItem].quantity = target.quantity.value

            items[curItem].details = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
            //this.state.editorState.getCurrentContent()
            
            items[curItem].categoriesId = target.categories.value
            this.setState({
                items,
                isEditing: false,
                isEdited: true,
                isAdding: true,
                name: '',
                currentPrice: '',
                quantity: '',
                editorState: '',
                categoriesId: ''
            })
            setTimeout(() => {
                this.setState({ isEdited: false })
            }, 1000)
        }

    }
    handleEdit(e) {
        e.preventDefault()
        let value = e.currentTarget.value
        let item = this.state.items.filter((info) => {
            return info.id === +value
        })
        const content = item[0].details
        const blocksFromHTML = convertFromHTML(content)
        const state = ContentState.createFromBlockArray(
            blocksFromHTML.contentBlocks,
            blocksFromHTML.entityMap
          );
        console.log(content)
        this.setState({
            isEditing: true,
            isAdding: false,
            name: item[0].name,
            currentPrice: item[0].currentPrice,
            quantity: item[0].quantity,
            // details: item[0].details,
            editorState: EditorState.createWithContent(state),
            categoriesId: item[0].categoriesId,
            itemId: item[0].id
        })


    }

    handleCancel(e) {
        e.preventDefault()
        this.setState({
            isEditing: false,
            isEdited: false,
            isAdding: true,
            name: '', quantity: '', currentPrice: '', details: '', categoriesId: '',editorState:''
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
    handleChange(e) {
        this.setState({ categoriesId: e.target.value })
    }
    render() {
        const { currentNote } = this.props
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
                    <EditItem
                        {...this.state}
                        handleEdit={this.handleEdit}
                        handleCancel={this.handleCancel}
                        editClick={this.editClick}
                        handleChange={this.handleChange}
                        editSuccess={this.editSuccess}
                        onEditorStateChange={this.onEditorStateChange}
                        onContentStateChange={this.onContentStateChange}
                    />

                    {
                        this.state.isAdding === true && (
                            <form className="form-inline" onSubmit={this.handleAddItem}>
                                <input
                                    type="hidden"
                                    name="userId"
                                    value={this.props.userId}
                                />
                                <input
                                    type="hidden"
                                    name="itemId"
                                    value={this.state.itemId}
                                />
                                <div className="d-flex justify-content-center" style={{ marginLeft: '130px' }}>
                                    <div className="form-group mx-sm-1 mb-2">
                                        <input type="text" className="form-control" id="inputName" placeholder="Name" name="name"
                                            value={this.state.name}
                                            onChange={e => this.setState({ name: e.target.value })}

                                        />
                                    </div>
                                    <div className="form-group mx-sm-1 mb-2">
                                        <input type="number" className="form-control" id="inputPrice" placeholder="Price"
                                            name="currentPrice"
                                            type="number"
                                            value={this.state.currentPrice}
                                            onChange={e => this.setState({ currentPrice: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-group mx-sm-1 mb-2">
                                        <input type="number" className="form-control" id="inputQuantity" placeholder="Quantity"
                                            name="quantity"
                                            type="number"
                                            value={this.state.quantity}
                                            onChange={e => this.setState({ quantity: e.target.value })}
                                        />
                                    </div>
                                    {/* <div className="form-group mx-sm-1 mb-2">
                                    <input type="text" className="form-control" id="inputDetails" placeholder="Details"
                                        name="details"
                                        value={this.state.details}
                                        onChange={e => this.setState({ details: e.target.value })}
                                    />
                                </div> */}
                                    <div className="form-group mx-sm-1 mb-2">
                                        <select onChange={this.handleChange} className="custom-select mr-sm-2" name="categories" >
                                            <option selected>Categories</option>
                                            {this.state.categories.map((cat,index)=>{
                                                return (<option value={index} key={index}>{cat}</option>)
                                            })}
                                        </select>
                                    </div>
                                    <button type="submit" className="btn btn-primary mb-2">Add</button>
                                </div>
                                <hr />
                                {
                                        this.state.isAdded === true && (
                                            <div className="alert alert-warning" role="alert">
                                                <strong>Item added</strong>
                                            </div>

                                        )
                                    }
                                    {
                                        this.state.isDeleted === true && (
                                           <div className="alert alert-warning" role="alert">
                                                <strong>Item deleted</strong>
                                            </div>

                                        )
                                    }
                                    {
                                        this.state.isEdited === true && (
                                            <div className="alert alert-warning" role="alert">
                                                <strong>Item edited</strong>
                                            </div>
                                        )
                                    }
                                <div className="detail-form mt-2">
                                    <div className="detai-intro mb-1" id="detail-border">
                                        <h5>Details</h5>
                                    </div>
                                    <div className="detail-field">
                                        <Editor placeholder="Detail about your item..."
                                            editorState={this.state.editorState}
                                            onEditorStateChange={this.onEditorStateChange}
                                        />
                                    </div>
                                </div>
                            </form>
                        )
                    }
                    <br />
                    <div className="container" id="adddel-form">
                        {this.state.loadingItem ? <div style={{ textAlign: 'center', zIndex: '900', position: 'relative' }}><img src="./images/loading.gif" style={{ maxHeight: '400px', maxWidth: '400px' }} /></div> :
                            <table className="table table-striped">
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
                                        this.state.items.map((item, i) => {
                                            return (
                                                <tr className="fixprop" key={item.id}>
                                                    <th scope="row">{i + 1}</th>
                                                    <td>{item.name}</td>
                                                    <td>{item.currentPrice}</td>
                                                    <td>{item.quantity}</td>
                                                    <td>{this.state.categories[item.categoriesId]}</td>
                                                    <td>
                                                        <div className="edit-del">
                                                            <button className="btn btn-info" style={{ color: '#1d93c1' }}><i className="fas fa-eye"></i></button>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="edit-del">
                                                            <button className="btn btn-success" onClick={this.handleEdit} value={item.id}><i className="far fa-edit"></i></button>
                                                            <button className="btn btn-danger mx-2" onClick={this.handleDelete} value={item.id}><i className="far fa-trash-alt"></i></button>
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
