import React, { Component } from 'react'
import { render } from 'react-dom'
import '../styles/styles.css'
import { LOADED_LOGIN_STATUS, GUEST_STATUS } from '../config';
import { EditorState, convertToRaw } from 'draft-js';
import _ from 'lodash'
import { convertFromRaw, convertFromHTML, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Form, FormGroup, Label, ButtonGroup } from 'reactstrap';


class EditItem extends Component {
    constructor(props) {
        super(props)
        this.EditItem = this.EditItem.bind(this)
        this.cancelClick = this.cancelClick.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.onEditorStateChange = this.onEditorStateChange.bind(this)
    }

    EditItem(e) {
        e.preventDefault()
        const form = new FormData(e.target)
        form.append('details', draftToHtml(convertToRaw(this.props.editorState.getCurrentContent())))

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

    onEditorStateChange(editorState) {
        this.props.onEditorStateChange(editorState)
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
                        <Form onSubmit={this.EditItem}>
                            <input
                                type="hidden"
                                name="userId"
                                value={this.props.userId}
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
                                                defaultValue={this.props.name}
                                                onChange={e => this.setState({ name: e.target.name })}
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="exampleEmail">Price <span id="force">(*)</span></Label>
                                            <Input type="number" name="currentPrice" title="Nhập cmnr vào" id="examplePrice" min="0"
                                                defaultValue={this.props.currentPrice}
                                                onChange={e => this.setState({ currentPrice: e.target.currentPrice })}
                                            />
                                        </FormGroup>
                                    </div>
                                    <div className="col">
                                        <FormGroup>
                                            <Label for="example">Quantity <span title="Nhập cmnr vào" id="force">(*)</span></Label>
                                            <Input type="number" name="quantity" id="exampleQuantity" min="0"
                                                defaultValue={this.props.quantity}
                                                onChange={e => this.setState({ quantity: e.target.quantity })}
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="example">Category <span title="Nhập cmnr vào" id="force">(*)</span></Label>
                                            <Input value={this.props.categoriesId} type="select" name="categories" id="exampleSelect" onChange={this.handleChange}>
                                                {this.props.categories.map((cat, index) => {
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
                                        <p className="col alert alert-success">Describe about your item sush as type, year...</p>
                                        <div className="editor" style={{ marginTop: '-12px' }}>
                                            <Editor placeholder="Detail about your item..."
                                                editorState={this.props.editorState}
                                                onEditorStateChange={this.onEditorStateChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <ButtonGroup className="edit-cancel d-flex justify-content-center" style={{ marginTop: '80px', paddingBottom: '16px' }}>
                                <Button style={{ width: '150px' }} type="submit" color="success">Edit</Button>
                                <Button style={{ width: '150px' }} onClick={this.cancelClick} type="submit" color="danger">Cancel</Button>
                            </ButtonGroup>
                        </Form>
                    )
                }
            </div>
        )
    }
}
export default EditItem