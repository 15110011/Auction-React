import React, { Component } from 'react'
import { render } from 'react-dom'
import '../styles/styles.css'
import { LOADED_LOGIN_STATUS, GUEST_STATUS } from '../config';
import AdminPendingItems from './AdminPendingItems';

class AdminPanel extends Component{
    constructor(props){
        super(props)

    }

    render(){
        return(
            <div>
                <AdminPendingItems></AdminPendingItems>
                
            </div>
        )
    }

}   
export default AdminPanel