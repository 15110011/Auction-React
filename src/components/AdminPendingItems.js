import React, { Component } from 'react'
import { render } from 'react-dom'
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import { FormGroup, Label, Input } from 'reactstrap';
import { Editor } from 'react-draft-wysiwyg';
import '../styles/styles.css'
import classnames from 'classnames';
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import _ from 'lodash'

class AdminPendingItems extends Component {
    constructor(props) {
        super(props)

        this.state = {
            items: [],
            itemsStatus: [],
            selectedCount:0,
        }
    }


    componentDidMount() {
        console.log("DIDMOUNT")
        fetch('/api/v1/pendingitems/').then(res => res.json())
            .then(items => {
                if (!items.error) {
                    console.log(items)
                    this.setState({ items: items.pendingItems, itemsStatus:items.pendingItems.map(i=>{
                        return {id:i.id,selected:false}
                    }) })
                }
            })
    }

    onSelectCheckBox(e){
        let index = _.findIndex(this.state.itemsStatus,i=>{
            return i.id==e.target.value
        })
        if(index>-1){
            let cloneSelected = this.state.itemsStatus.slice()
            cloneSelected[index].selected = !cloneSelected[index].selected
            this.setState({itemsStatus:cloneSelected})
            if(cloneSelected[index].selected){
                this.setState({selectedCount:++this.state.selectedCount})
            }
            else{
                this.setState({selectedCount:--this.state.selectedCount})
                
            }
        }
    }
    onClickButton(e){
        let button = e.currentTarget
        console.log(button.value)
        
        if(button.value)
        {
            let selectedItems = _.filter(this.state.itemsStatus,{selected:true})
            fetch('/api/v1/pendingitems/', {
                method: 'PATCH',
                body: JSON.stringify({
                    type:button.value,
                    selectedItems,
                    adminId: this.props.userId
                })
            }).then(res => res.json())
            .then(res => {
                if(!res.error){
                    let remainPending = _.filter(this.state.items,i=>{

                        return _.findIndex(selectedItems,selected=>{ return i.id== selected.id })==-1
                    })
                    this.setState({items:remainPending, itemsStatus:remainPending.map(i=>{
                        return {id:i.id,selected:false}
                    }),selectedCount:0})
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
                                                Action on {this.state.selectedCount} {this.state.selectedCount<=1?'item':'items'}
                                            </button>
                                            <div className="dropdown-menu dropdown-menu-right">
                                                <button className="dropdown-item" name="action" value="ACCEPT" onClick={e=>this.onClickButton(e)}>Accept</button>
                                                <button className="dropdown-item" name="action" value="REJECT" onClick={e=>this.onClickButton(e)}>Reject</button>
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
                                                        <button className="btn btn-info" style={{ color: '#1d93c1' }}><i className="fas fa-eye"></i></button>
                                                    </div>
                                                </td>
                                                <td>
                                                    <FormGroup check>
                                                        <Label check />
                                                        <Input type="checkbox"  value={item.id} onChange={e=>this.onSelectCheckBox(e)}/>{' '}
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