import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function StringInput(props) {
    let tag;
    let classNames;
    if (props.multi) {
        tag = 'textarea';
        classNames = ['maputnik-string', 'maputnik-string--multi'];
    } else {
        tag = 'input';
        classNames = ['maputnik-string'];
    }
    function handleOnchange(e) {
        const _value = e.target.value;
        props.onChange(_value);
    }

    return React.createElement(tag, {
        'data-wd-key': props['data-wd-key'],
        spellCheck: tag !== 'input',
        className: classNames.join(' '),
        style: props.style,
        value: props.value,
        placeholder: props.default,
        onChange: handleOnchange,
        onBlur: handleOnchange
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