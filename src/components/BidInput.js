<<<<<<< HEAD
import React from 'react'
import NumberFormat from 'react-number-format';

function BidInput(props) {
    return (
        <div>
            <button onClick={props.onClickDecrease}>-
                </button>
            <NumberFormat className="text-center" value={props.value} thousandSeparator={true} prefix={'$'} onValueChange={props.onChange} />
            <button onClick={props.onClickIncrease}>+</button>
        </div>
    )
}

=======
import React, { Component } from 'react'
import { render } from 'react-dom'
import NumberFormat from 'react-number-format';

function BidInput(props) {
    return (
        <div>
            <button onClick={props.onClickDecrease}>-
                </button>
            <NumberFormat className="text-center" value={props.value} thousandSeparator={true} prefix={'$'} onValueChange={props.onChange} />
            <button onClick={props.onClickIncrease}>+</button>
        </div>
    )
}

>>>>>>> 8f05927cb850d97a115099fa2e41722568751d88
export default BidInput