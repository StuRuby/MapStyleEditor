import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import { MdDelete } from 'react-icons/md';

export default function FilterEditorBlock(props) {
    return (
        <div className='maputnik-filter-editor-block'>
            <div className='maputnik-filter-editor-block-action'>
                <Button
                    className='maputnik-delete-filter'
                    onClick={props.onDelete}
                >
                    <MdDelete />
                </Button>
            </div>
            <div className='maputnik-filter-editor-block-content'>
                {props.children}
            </div>
        </div>
    );
}

FilterEditorBlock.propTypes = {
    onDelete: PropTypes.func.isRequired,
    children: PropTypes.object.isRequired
};