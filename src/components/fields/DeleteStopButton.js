import React from 'react';
import PropTypes from 'prop-types';
import DocLabel from './DocLabel';
import Button from '../Button';
import { MdDelete } from 'react-icons/md';

export default function DeleteStopButton(props) {
    return (
        <Button
            className='maputnik-delete-stop'
            onClick={props.onClick}
        >
            <DocLabel
                label={<MdDelete />}
                doc='Remove zoom level stop.'
            />
        </Button>
    );
}

DeleteStopButton.propTypes = {
    onClick: PropTypes.func
};