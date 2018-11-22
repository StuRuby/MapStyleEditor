import React from 'react';
import PropTypes from 'prop-types';
import accessibility from '../../libs/accessibility';
import CollapseWrapper from 'react-collapse';


export default function Collapse(props) {
    return accessibility.reducedMotionEnabled()
        ? <div style={{ display: props.isActive ? 'block' : 'none' }} >
            {props.children}
        </div>
        : <CollapseWrapper isOpen={props.isActive} >
            {props.children}
        </CollapseWrapper>
}

Collapse.propTypes = {
    isActive: PropTypes.bool.isRequired,
    children: PropTypes.element.isRequired,
};

Collapse.defaultProps = {
    isActive: true
};