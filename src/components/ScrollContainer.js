import React from 'react';
import PropTypes from 'prop-types';


export default function ScrollContainer(props) {
    return (
        <div className='maputnik-scroll-container' >
            {props.children}
        </div>
    );
}

ScrollContainer.propTypes = {
    children: PropTypes.node
};