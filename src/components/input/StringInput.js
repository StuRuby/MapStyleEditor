import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function StringInput(props) {
    const [value, setValue] = useState(props.value || '');

    let tag;
    let classNames;
    if (props.multi) {
        tag = 'textarea';
        classNames = ['maputnik-string', 'maputnik-string--multi'];
    } else {
        tag = 'input';
        classNames = ['maputnik-string'];
    }

    useEffect(() => {
        if (props.value !== value) {
            setValue(props.value);
        }
    });

    function handleBlurChange() {
        if (value !== props.value) {
            props.onChange(value);
            setValue(value);
        }
    }

    return React.createElement(tag, {
        'data-wd-key': props['data-wd-key'],
        spellCheck: tag !== 'input',
        className: classNames.join(' '),
        style: props.style,
        value: value,
        placeholder: props.default,
        onChange: e => setValue(e.target.value),
        onBlur: handleBlurChange
    });
}

StringInput.propTypes = {
    'data-wd-key': PropTypes.string,
    value: PropTypes.string,
    style: PropTypes.object,
    default: PropTypes.string,
    onChange: PropTypes.func,
    multi: PropTypes.bool,
};