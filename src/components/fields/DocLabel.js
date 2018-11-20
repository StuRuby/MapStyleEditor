import React from 'react';
import PropTypes from 'prop-types';

export default function DocLabel(props) {
    return (
        <label className='maputnik-doc-wrapper'>
            <div className='maputnik-doc-target'>
                <span>{props.label}</span>
                <div className='maputnik-doc-popup'>
                    {props.doc}
                </div>
            </div>
        </label>
    );
}

DocLabel.propTypes = {
    label: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
    doc: PropTypes.string.isRequired
};