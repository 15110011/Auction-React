import React from 'react'
import NumberFormat from 'react-number-format';

function BidInput(props) {
    return (
        <div>
            <button onClick={props.onClickDecrease}>-
                </button>
            <NumberFormat className="text-center" value={props.value} thousandSeparator={true} suffix={' ETH'} onValueChange={props.onChange} />
            <button onClick={props.onClickIncrease}>+</button>
        </div>
    )
}

export default BidInput