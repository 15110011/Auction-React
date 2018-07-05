import React, { Component } from 'react'
import { render } from 'react-dom'
import NumberFormat from 'react-number-format';

class BidInput extends Component {

    constructor(props) {
        super(props)

    }

    render() {
        return (
            <div>
                <button onClick={this.props.onClickDecrease}>-
                </button>
                <NumberFormat className="text-center" value={this.props.value} thousandSeparator={true} prefix={'$'} onValueChange={this.props.onChange} />

                <button onClick={this.props.onClickIncrease}>+</button>
            </div>
        )
    }
}

export default BidInput