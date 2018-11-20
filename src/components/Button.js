import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default function Button(props) {
    return (
        <button
            onClick={props.onClick}
            disabled={props.disabled}
            aria-label={props['aria-label']}
            className={classNames('maputnik-button', props.className)}
            data-wd-key={props['data-wd-key']}
            style={props.style}
        >
            {props.children}
        </button>
    );
}

Button.propTypes = {
    'data-wd-key': PropTypes.string,
    'aria-label': PropTypes.string,
    onClick: PropTypes.func,
    style: PropTypes.object,
    className: PropTypes.string,
    children: PropTypes.node,
    disabled: PropTypes.bool
};