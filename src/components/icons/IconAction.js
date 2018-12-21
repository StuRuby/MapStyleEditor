import React from 'react';
import PropTypes from 'prop-types';
import { MdContentCopy, MdVisibility, MdVisibilityOff, MdDelete } from 'react-icons/md';

export default function IconAction(props) {
    const Icons = {
        'duplicate': <MdContentCopy />,
        'show': <MdVisibility />,
        'hide': <MdVisibilityOff />,
        'delete': <MdDelete />
    };
    const { classBlockName, classBlockModifier } = props;

    let classAdditions = '';
    if (classBlockName) {
        classAdditions = `maputnik-layer-list-icon-action__${classBlockName}`;

        if (classBlockModifier) {
            classAdditions += ` maputnik-layer-list-icon-action__${classBlockName}--${classBlockModifier}`;
        }
    }
    return (
        <button
            tabIndex='-1'
            title={props.action}
            className={`maputnik-layer-list-icon-action ${classAdditions}`}
            data-wd-key={props.wdKey}
            onClick={props.onClick}
        >
            {Icons[props.action]}
        </button>
    );
}

IconAction.propTypes = {
    action: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    wdKey: PropTypes.string,
    classBlockName: PropTypes.string,
    classBlockModifier: PropTypes.string
};