import React, { Component } from 'react'
import { render } from 'react-dom'
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import { CREATED_MODE, DELETED_MODE, UPDATED_MODE } from '../config';

class AdminCategories extends Component {
    constructor(props) {
        super(props)
        this.state = { enteringName: '', addMode: true, edittingId: -1 }
        this.actionOnCategory = this.actionOnCategory.bind(this)
    }

    actionOnCategory(e) {
        e.preventDefault()
        if (e.target.action && e.target.action.value === "true") {
            console.log(e.target.action.value)
            this.setState({ enteringName: '' })
            let form = new FormData(e.target)
            fetch('/api/v1/categories', {
                method: 'POST',
                body: form
            }).then(res => res.json())
                .then(res => {
                    console.log(res)
                    if (!res.error)
                        this.props.updateCategories(res.newCat,CREATED_MODE)
                    else {
                        alert(res.msg)
                    }
                })
        } else if (e.target.action && e.target.action.value === "false") {
            console.log("???", e.target.action.value)
            let newCat = this.state.enteringName
            this.setState({ enteringName: '' })
            let form = new FormData(e.target)
            fetch('/api/v1/categories/' + this.state.edittingId, {
                method: 'PATCH',
                body: form

            }).then(res => res.json())
                .then(res => {
                    console.log(res)
                    if (!res.error) {
                        let id = this.state.edittingId
                        this.props.updateCategories({ id, name: newCat },UPDATED_MODE)
                        this.setState({addMode:true})
                    }
                    else {
                        alert(res.msg)
                    }
                })
        } else if (+e.target.cancel.value === 1) {
            e.preventDefault()
            this.setState({ addMode: true, enteringName: '' })
        }
    }
    onClickEditBtn(e, name) {
        this.setState({ addMode: false, enteringName: name, edittingId: e.currentTarget.value })
    }
    handleDelete(e){
        console.log(e.currentTarget.value)
        let id = e.currentTarget.value
        fetch('/api/v1/categories/'+id,{
            method:'DELETE'
        }).then(res=>res.json()).then(res=>{
            this.props.updateCategories({id:id},DELETED_MODE)
        })
    }
    render() {
        return (
            <Row>
                <Col sm="12">
                    <form onSubmit={e => this.actionOnCategory(e)} className="form-inline mt-4 d-flex justify-content-center">
                        <div className="form-group mx-sm-1 mb-2">
                            <input type="text" className="form-control" id="inputName" placeholder="Name" name="name"
                                value={this.state.enteringName}
                                onChange={e => this.setState({ enteringName: e.target.value })}
                            />
                        </div>
                        <button type="submit" value={this.state.addMode} name='action' className="btn btn-primary mb-2">{this.state.addMode ? 'Add' : 'Edit'}</button>
                        {this.state.addMode ? '' : <button type="submit" value="1" name='cancel' className="btn btn-danger mb-2">Cancel</button>}

                    </form>
                    <table className="table table-striped mt-4">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Category</th>
                                <th scope="col">Total</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.categories.map(cat => {
                                return (<tr className="fixprop" key={cat.id}>
                                    <td>{cat.id}</td>
                                    <td>{cat.name}</td>
                                    <td>{cat.items.length}</td>
                                    <td>
                                        <div className="edit-del">
                                            <button className="btn btn-success" value={cat.id} onClick={e => { this.onClickEditBtn(e, cat.name) }}><i className="far fa-edit"></i></button>
                                            <button className="btn btn-danger mx-2" onClick={e=>this.handleDelete(e)} value={cat.id}><i className="far fa-trash-alt"></i></button>
                                        </div>
                                    </td>
                                </tr>)
                            })}


                        </tbody>
                    </table>
                </Col>
            </Row>
        )
    }
}

export default AdminCategories