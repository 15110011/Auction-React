import React, { Component } from 'react'
import { render } from 'react-dom'

class BidInput extends Component{

    constructor(props){
        super(props)

    }
    
    render(){
        return (
            <div>
                <button onClick={this.props.onClickDecrease}>-</button><input type="text" className="text-center" onChange={this.props.onChange} value={this.props.value}/><button onClick={this.props.onClickIncrease}>+</button>
            </div>
        )
    }
}

export default BidInput