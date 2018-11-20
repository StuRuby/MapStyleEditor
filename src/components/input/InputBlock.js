import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { DocLabel } from '../fields';

export default function InputBlock(props) {
    return (
        <div
            style={props.style}
            data-wd-key={props['data-wd-key']}
            className={classNames({ 'maputnik-input-block': true, 'maputnik-action-block': props.action })}
        >
            {
                props.doc &&
                <div className='maputnik-input-block-label'>
                    <DocLabel
                        label={props.label}
                        doc={props.doc}
                    />
                </div>
            }
            {
                !props.doc &&
                <label className='maputnik-input-block-label'>
                    {props.label}
                </label>
            }
            {
                props.action &&
                <div className='maputnik-input-block-action'>
                    {props.action}
                </div>
            }
            <div className='maputnik-input-block-content'>
                {props.children}
            </div>
        </div>
    );
}

InputBlock.propTypes = {
    'data-wd-key': PropTypes.string,
    label: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
    ]).isRequired,
    doc: PropTypes.string,
    action: PropTypes.element,
    children: PropTypes.node.isRequired,
    style: PropTypes.object,
    onChange: PropTypes.func,
};