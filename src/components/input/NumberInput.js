import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function NumberInput(props) {
    const [value, setValue] = useState(props.value);

    const changeInputValue = (v) => {
        const newValue = parseFloat(v);
        const hasChanged = value !== newValue;
        if (isValid(newValue) && hasChanged) {
            props.onChange(newValue);
        }
        setValue(newValue);
    };

    const resetInputValue = () => {
        if (value === '') return changeInputValue(props.default);

        if (!isValid(value)) {
            if (isValid(props.value)) changeInputValue(props.value);
            else changeInputValue(props.default);
        }
    };


    function isValid(v) {
        if (isNaN(v)) return false;
        if (!isNaN(props.min) && v < props.min) return false;
        if (!isNaN(props.max) && v > props.max) return false;
        return true;
    }

    return (
        <input
            spellCheck='false'
            className='maputnik-number'
            placeholder={props.default}
            value={value}
            onChange={e => changeInputValue(e.target.value)}
            onBlur={resetInputValue}
        />
    );
}

NumberInput.propTypes = {
    value: PropTypes.number,
    default: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number,
    onChange: PropTypes.func,
};