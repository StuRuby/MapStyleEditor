import React from 'react';
import PropTypes from 'prop-types';

export default function ToolbarAction(props) {
    return (
        <button
            className='maputnik-toolbar-action'
            data-wd-key={props.wdKey}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    );
}

ToolbarAction.propTypes = {
    children: PropTypes.node,
    onClick: PropTypes.func,
    wdKey: PropTypes.string
};
