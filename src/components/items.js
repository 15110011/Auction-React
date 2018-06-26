import React, { Component } from 'react'
import { render } from 'react-dom'
import { Link } from 'react-router-dom'
import '../styles/styles.css'
import Header from './header';
import Footer from './footer';
import Item from './item'
class Items extends Component {
    constructor(props){
        super(props)
        this.state={
            items:[]
        }
    }

    render() {
        var {items} = this.state
            for(let j=0;j<12;j++) {
                items.push(
                <Item /> )
            }
         
        
            
        return (
            <div className="container">
                    <br/>
                    <div className="row">
                    
                    {items}                          
            </div>
            </div>
        )
    }
}
export default Items
