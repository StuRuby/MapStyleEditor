import React from 'react';
import PropTypes from 'prop-types';
import ScrollContainer from '../components/ScrollContainer';

export default function AppLayout(props) {
    return (
        <div className='maputnik-layout'>
            {props.toolbar}
            <div className='maputnik-layout-list'>
                <ScrollContainer>
                    {props.layerList}
                </ScrollContainer>
            </div>
            <div className='maputnik-layout-drawer'>
                <ScrollContainer>
                    {props.layerEditor}
                </ScrollContainer>
            </div>
            {props.map}
            {/* {
                props.bottom && <div className='maputnik-layout-bottom' >
                    {props.bottom}
                </div>
            } */}
            {props.modals}
        </div>
    );
}

AppLayout.propTypes = {
    toolbar: PropTypes.element.isRequired,
    layerList: PropTypes.element.isRequired,
    layerEditor: PropTypes.element,
    map: PropTypes.element.isRequired,
    bottom: PropTypes.element,
    modals: PropTypes.node
};
