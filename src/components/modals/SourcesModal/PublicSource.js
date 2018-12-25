import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import { MdAddCircleOutline } from 'react-icons/md';

export default function PublicSource(props) {
    return (
        <div className='maputnik-public-source'>
            <Button
                className='maputnik-public-source-select'
                onClick={props.onSelect.bind(null, props.id)}
            >
                <div className='maputnik-public-source-info'>
                    <p className='maputnik-public-source-name'>{props.title}</p>
                    <p className='maputnik-public-source-id'>#{props.id}</p>
                </div>
                <span className='maputnik-space' />
                <MdAddCircleOutline />
            </Button>
        </div>
    );
}


PublicSource.propTypes = {
    id: PropTypes.string.isRequired,
    type: propTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired,
};