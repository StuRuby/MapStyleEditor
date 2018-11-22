import React from 'react';
import PropTypes from 'prop-types';
import accessibility from '../../libs/accessibility';
import CollapseWrapper from 'react-collapse';


export default function Collapse(props) {
    //利用特性检测对一些配置较差的设备主动开启`减弱动态效果`
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