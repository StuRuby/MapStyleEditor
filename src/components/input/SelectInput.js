import React from 'react';
import PropTypes from 'prop-types';

export default function SelectInput(props) {
    let _options = props.options;
    if (_options.length > 0 && !Array.isArray(options[0])) {
        _options = _options.map(v => [v, v]);
    }
    return (
        <select
            className='maputnik-select'
            data-wd-key={props['data-wd-key']}
            style={props.style}
            value={props.value}
            onChange={e => props.onChange(e.target.value)}
        >
            {_options.map(([val, label]) => <option key={val} value={val}>{label}</option>)}
        </select>
    );
}

SelectInput.propTypes = {
    value: PropTypes.string.isRequired,
    'data-wd-key': PropTypes.string,
    options: PropTypes.array.isRequired,
    style: PropTypes.object,
    onChange: PropTypes.func.isRequired,
};