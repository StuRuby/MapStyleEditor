import React from 'react';
import PropTypes from 'prop-types';

export default function ToolbarSelect(props) {
    return (
        <div
            className='maputnik-toolbar-select'
            data-wd-key={props.wdKey}
        >
            {props.children}
        </div>
    );
}

ToolbarSelect.propTypes = {
    children: PropTypes.node,
    wdKey: PropTypes.string
};