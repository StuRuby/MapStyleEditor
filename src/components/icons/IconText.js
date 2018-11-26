import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';


export default function IconText(props) {
    return (
        <span className='maputnik-icon-text'>{props.children}</span>
    );
}

IconText.propTypes = {
    children: PropTypes.node
};