import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '../Button';

export default function MultiButtonInput(props) {
    let _options = props.options;
    if (_options.length > 0 && !Array.isArray(_options[0])) {
        _options = _options.map(v => [v, v]);
    }
    const selectedValue = props.value || options[0][0];
    const buttons = _options.map(([val, label]) =>
        <Button
            key={val}
            onClick={() => props.onChange(val)}
            className={classNames({ 'maputnik-button-selected': val === selectedValue })}
        >
            {label}
        </Button>
    );

    return (
        <div className='maputnik-multibutton'>
            {buttons}
        </div>
    );
}

MultiButtonInput.propTypes = {
    value: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired
};