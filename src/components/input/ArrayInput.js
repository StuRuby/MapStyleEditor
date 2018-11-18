import React from 'react';
import PropTypes from 'prop-types';
import StringInput from './StringInput';
import NumberInput from './NumberInput';

export default function ArrayInput(props) {
    const values = props.value || props.default || [];

    function changeValue(idx, newValue) {
        const values = values.slice(0);
        values[idx] = newValue;
        props.onChange(values);
    }

    const inputs = values.map((v, i) => {
        if (props.type === 'number') {
            return (
                <NumberInput
                    key={i}
                    value={v}
                    onChange={changeValue.bind(this, i)}
                />
            );
        } else {
            return (
                <StringInput
                    key={i}
                    value={v}
                    onChange={changeValue.bind(this, i)}
                />
            );
        }
    })
    return (
        <div className='maputnik-array'>{inputs}</div>
    )
}

ArrayInput.propTypes = {
    value: PropTypes.array,
    type: PropTypes.string,
    length: PropTypes.number,
    default: PropTypes.array,
    onChange: PropTypes.func
};