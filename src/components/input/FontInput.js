import React from 'react';
import PropTypes from 'prop-types';
import AutoCompleteInput from './AutoCompleteInput';

export default function FontInput(props) {
    const values = props.value || props.default.slice(1) || [];

    function changeFont(idx, newValue) {
        const changedValues = values.slice(0);
        changedValues[idx] = newValue;
        props.onChange(changedValues);
    }
    const inputs = values.map((v, i) => {
        return (
            <AutoCompleteInput
                key={i}
                value={v}
                options={props.fonts.map(f => [f, f])}
                onChange={changeFont.bind(this, i)}
            />
        );
    });

    return (
        <div className='maputnik-font' >
            {inputs}
        </div>
    );
}

FontInput.propTypes = {
    value: PropTypes.array.isRequired,
    default: PropTypes.array,
    fonts: PropTypes.array,
    style: PropTypes.object,
    onChange: PropTypes.func.isRequired,
};

FontInput.defaultProps = {
    fonts: []
};