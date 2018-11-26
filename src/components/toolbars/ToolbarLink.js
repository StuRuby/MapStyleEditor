import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default function ToolbarLink(props) {
    return (
        <a
            className={classnames('maputnik-toolbar-link', props.className)}
            href={props.href}
            rel='noopener noreferrer'
            target='_blank'
        >
            {props.children}
        </a>
    );
}

ToolbarLink.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    href: PropTypes.string,
    onToggleModal: PropTypes.func
};