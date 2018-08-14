import React from 'react'
import NumberFormat from 'react-number-format'
function BidInput(props) {
    return (
        <div>
            <span class="input-group-btn">
                <button onClick={props.onClickDecrease} type="button" className="btn btn-secondary" data-type="minus" data-field="quant[2]" style={{ borderTopRightRadius: 'unset', borderBottomRightRadius: 'unset', marginTop: '-3px' }}>
                    <span class="minus">
                        <i class="fas fa-minus"></i>
                    </span>
                </button>
            </span>
            <div id="number-format" style={{ display: 'inline' }}>
                <NumberFormat className="text-center" value={props.value} thousandSeparator={true} prefix={'$'} onValueChange={props.onChange} />
            </div>
            <span class="input-group-btn">
                <button onClick={props.onClickIncrease} type="button" class="btn btn-secondary" data-type="plus" data-field="quant[2]" style={{ borderTopLeftRadius: 'unset', borderBottomLeftRadius: 'unset', marginTop: '-3px' }}>
                    <span class="plus">
                        <i class="fas fa-plus"></i>
                    </span>
                </button>
            </span>
        </div>
    )
}

export default BidInput