import React from 'react';
import PropTypes from 'prop-types';

export default function ToolbarLinkHighlighted(props) {
    return (
        <a
            className={classnames('maputnik-toolbar-link', 'maputnik-toolbar-link--highlighted', props.className)}
            href={props.href}
            rel='noopener noreferrer'
            target='_blank'
        >
            <span className='maputnik-toolbar-link-wrapper'>
                {props.children}
            </span>
        </a>
    );
}

ToolbarLinkHighlighted.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    href: PropTypes.string,
    onToggleModal: PropTypes.func
};