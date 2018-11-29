import React from 'react';
import PropTypes from 'prop-types';
import Collapser from './Collapser';

export default function LayerListGroup(props) {

    function onClickHandler(e) {
        return props.onActiveToggle(!props.isActive);
    }

    return (
        <li className='maputnik-layer-list-group'>
            <div
                className='maputnik-layer-list-group-header'
                data-wd-key={'layer-list-group:' + props['data-wd-key']}
                onClick={onClickHandler}
            >
                <span className='maputnik-layer-list-group-title' >{props.title}</span>
                <span className='maputnik-space'></span>
                <Collapser
                    style={{ height: 14, width: 14 }}
                    isCollapsed={props.isActive}
                />
            </div>
        </li>
    );
}

LayerListGroup.propTypes = {
    title: PropTypes.string.isRequired,
    'data-wd-key': PropTypes.string,
    // isActive: PropTypes.bool.isRequired,
    // onActiveToggle: PropTypes.func.isRequired
    isActive: PropTypes.bool,
    onActiveToggle: PropTypes.func
};