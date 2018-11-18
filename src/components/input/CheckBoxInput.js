import React from 'react';
import PropTypes from 'prop-types';

export default function CheckBoxInput(props) {
    const svgStyle = { display: props.value ? 'inline' : 'none' };
    return (
        <label>
            <input
                className='maputnik-checkbox'
                type='checkbox'
                style={props.style}
                onChange={e => props.onChange(!props.value)}
                checked={props.value}
            />
            <div className='maputnik-checkbox-box'>
                <svg style={svgStyle} className='maputnik-checkbox-icon' viewBox='0 0 32 32' >
                    <path d='M1 14 L5 10 L13 18 L27 4 L31 8 L13 26 z' />
                </svg>
            </div>
        </label>
    );
}

CheckBoxInput.propTypes = {
    value: PropTypes.bool.isRequired,
    style: PropTypes.object,
    onChange: PropTypes.func
};