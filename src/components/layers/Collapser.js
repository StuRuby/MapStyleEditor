import React from 'react';
import PropTypes from 'prop-types';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';


export default function Collapser(props) {
    const iconStyle = {
        width: 20,
        height: 20,
        ...props.style
    };

    return props.isCollapsed ? <MdArrowDropUp style={iconStyle} /> : <MdArrowDropDown style={iconStyle} />;
}

Collapser.propTypes = {
    isCollapsed: PropTypes.bool.isRequired,
    style: PropTypes.object,
};

