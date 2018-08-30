import React from 'react'
import NumberFormat from 'react-number-format'
function BidInput(props) {
    return (
        <div>
            <span className="input-group-btn">
                <button onClick={props.onClickDecrease} type="button" className="btn btn-secondary" data-type="minus" data-field="quant[2]" style={{ borderTopRightRadius: 'unset', borderBottomRightRadius: 'unset', marginTop: '-3px' }}>
                    <span className="minus">
                        <i className="fas fa-minus"></i>
                    </span>
                </button>
            </span>
            <div id="number-format" style={{ display: 'inline' }}>
                <NumberFormat className="text-center" value={props.value} thousandSeparator={true} suffix={' BLC'} onValueChange={props.onChange} />
            </div>
            <span className="input-group-btn">
                <button onClick={props.onClickIncrease} type="button" className="btn btn-secondary" data-type="plus" data-field="quant[2]" style={{ borderTopLeftRadius: 'unset', borderBottomLeftRadius: 'unset', marginTop: '-3px' }}>
                    <span className="plus">
                        <i className="fas fa-plus"></i>
                    </span>
                </button>
            </span>
        </div>
    )
}

export default BidInput