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
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Form, FormGroup, Label, ButtonGroup } from 'reactstrap';


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
            editorState: EditorState.createEmpty(),
            modal: false,
            checkValidInput: true,
            images: []
        }
        this.handleAddItem = this.handleAddItem.bind(this)
        this.getItem = this.getItem.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleEdit = this.handleEdit.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.editSuccess = this.editSuccess.bind(this)
        this.onEditorStateChange = this.onEditorStateChange.bind(this)
        this.toggle = this.toggle.bind(this)
        this.onInputFileChange = this.onInputFileChange.bind(this)
    }
    toggle() {
        this.setState({
            modal: !this.state.modal
        });
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
                cloneCat[cat.id] = cat.name
                return true
            })

            // let initCat =[]
            // initCat.push(...res.cats)
            this.setState({ categories: cloneCat })

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
    onInputFileChange(e) {
        console.log(e.target)

        if (e.target.files.length > 3) {
            this.setState({ checkValidInput: false })
        } else {
            const images = this.state.images
            console.log(e.target.files)
            this.setState({ checkValidInput: true, images: e.target.files })
        }
    }
    handleAddItem(e) {

        e.preventDefault()
        const inputImages = this.state.images
        const form = new FormData(e.target)
        // const form = new FormData()
        // console.log(inputImages[0])
        form.append('details', draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())))
        for (var i = 0; i < 3; i++) {
            console.log(inputImages[i])
            form.append('files', inputImages[i])
        }
        fetch('/api/v1/items', {
            method: 'POST',
            body: form
        })
            .then(res => res.json())
            .then((res) => {
                if (res.item) {
                    this.setState({ isAdded: true, name: '', quantity: '', currentPrice: '', details: '', categoriesId: '', categoriesId: '', editorState: '' })
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
            items[curItem].categoriesId = target.categories.value
            this.setState({
                items,
                isEditing: false,
                isEdited: true,
                isAdding: true,
                name: '',
                currentPrice: '',
                quantity: '',
                editorState: ''
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
            name: '', quantity: '', currentPrice: '', details: '', editorState: ''
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
                    <p className="alert alert-danger" id="expired"style={{marginTop:'75px'}}>Please log in</p>
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
                            <Form onSubmit={this.handleAddItem} encType="multipart/form-data">
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
                                <div className="info">
                                    <div className="row info-intro">
                                        <h3>Infomation</h3>
                                    </div>
                                    <div className="row pt-2" id="detail-border">
                                        <div className="col" style={{ marginLeft: '150px' }}>
                                            <FormGroup>
                                                <Label for="exampleName">Name <span title="Nhập cmnr vào" id="force">(*)</span></Label>
                                                <Input type="text" name="name" id="exampleName" placeholder="Car..."
                                                    value={this.state.name}
                                                    onChange={e => this.setState({ name: e.target.value })}
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="exampleEmail">Price <span id="force">(*)</span></Label>
                                                <Input type="number" name="currentPrice" title="Nhập cmnr vào" id="examplePrice" min="0"
                                                    value={this.state.currentPrice}
                                                    onChange={e => this.setState({ currentPrice: e.target.value })}
                                                />
                                            </FormGroup>
                                        </div>
                                        <div className="col">
                                            <FormGroup>
                                                <Label for="example">Quantity <span title="Nhập cmnr vào" id="force">(*)</span></Label>
                                                <Input type="number" name="quantity" id="exampleQuantity" min="0"
                                                    value={this.state.quantity}
                                                    onChange={e => this.setState({ quantity: e.target.value })}
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="example">Category <span title="Nhập cmnr vào" id="force">(*)</span></Label>
                                                <Input type="select" name="categories" id="exampleSelect" onChange={this.handleChange}>
                                                    <option selected></option>
                                                    {this.state.categories.map((cat, index) => {
                                                        return (<option value={index} key={index}>{cat}</option>)
                                                    })}
                                                </Input>
                                            </FormGroup>
                                        </div>
                                    </div>
                                </div>
                                <div className="detail mt-2">
                                    <div className="detail-form mt-2">
                                        <div className="row detai-intro mb-1" id="detail-border">
                                            <h3>Details</h3>
                                        </div>
                                        <div className="row detail-field">
                                            <div className="col bg-success" style={{ borderRadius: '5px' }}>
                                                <div className="container">
                                                    <p style={{ marginTop: '20px' }}>Describe about your item sush as type, year...</p>
                                                </div>
                                            </div>
                                            <Editor placeholder="Detail about your item..."
                                                editorState={this.state.editorState}
                                                onEditorStateChange={this.onEditorStateChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <ButtonGroup className="d-flex justify-content-center pb-3" style={{ marginTop: '80px' }}>
                                    <Button style={{ width: '150px' }} type="button" color="success" onClick={this.toggle}>{this.props.buttonLabel}Images</Button>
                                    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} onClosed={() => { this.setState({ checkValidInput: true }) }}>
                                        <ModalHeader toggle={this.toggle}>Item's Image</ModalHeader>
                                        <ModalBody>
                                            <Input type="file" name="files" id="inputFile" accept="image/*" multiple onChange={this.onInputFileChange} />
                                            {
                                                !this.state.checkValidInput ? (
                                                    <p className="errorsInput" id="validFile">Only 3 images allowed!!</p>

                                                ) : ''
                                            }
                                        </ModalBody>
                                        <ModalFooter>
                                            {
                                                !this.state.checkValidInput ? (
                                                    <Button disabled color="primary" onClick={this.toggle}>Add</Button>

                                                ) : (
                                                        <Button color="primary" onClick={this.toggle}>Add</Button>
                                                    )
                                            }
                                            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                                        </ModalFooter>
                                    </Modal>
                                    <Button style={{ width: '150px' }} type="submit" color="primary">Add</Button>
                                </ButtonGroup>
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
                            </Form>
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
