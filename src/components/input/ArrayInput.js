import React from 'react';
import PropTypes from 'prop-types';
import StringInput from './StringInput';
import NumberInput from './NumberInput';

export default function ArrayInput(props) {
    const values = props.value || props.default || [];

    function changeValue(idx, newValue) {
        const _values = values.slice(0);
        _values[idx] = newValue;
        props.onChange(_values);
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
            console.log('props',props);
            return (
                <StringInput
                    key={i}
                    value={v}
                    onChange={changeValue.bind(this, i)}
                />
            );
        }
    });
    return (
        <div className='maputnik-array'>{inputs}</div>
    );
}

ArrayInput.propTypes = {
    value: PropTypes.array,
    type: PropTypes.string,
    length: PropTypes.number,
    default: PropTypes.array,
    onChange: PropTypes.func
};