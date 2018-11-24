import React from 'react';
import PropTypes from 'prop-types';
import Collapse from './Collapse';
import Collapser from './Collapser';

export default function LayerEditorGroup(props) {
    function onClickHandler(e) {
        props.onActiveToggle(!props.isActive);
    }
    return (
        <div>
            <div className='maputnik-layer-editor-group'
                data-wd-key={"layer-editor-group:" + this.props['data-wd-key']}
                onClick={onClickHandler}
            >
                <span>{props.title}</span>
                <span style={flexGrow: 1} ></span>
            <Collapser isCollapsed={props.isActive} />
        </div>
        <Collapse isActive={props.isActive} >
            <div className='react-collapse-container'>
                {props.children}
            </div>
        </Collapse>
        </div >
    );
}

LayerEditorGroup.propTypes = {
    'data-wd-key': PropTypes.string,
    title: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
    children: PropTypes.element.isRequired,
    onActiveToggle: PropTypes.func.isRequired
};