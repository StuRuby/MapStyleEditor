import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import { MdAddCircleOutline } from 'react-icons/md';

export default function PublicStyle(props) {
    const style = {
        backgroundImage: `url(${props.thumbnailUrl})`
    };
    return (
        <div className='maputnik-public-style'>
            <Button
                className='maputnik-public-style-button'
                aria-label={props.title}
                onClick={props.onSelect.bind(this, props.url)}
            >
                <header className='maputnik-public-style-header'>
                    <h4>{props.title}</h4>
                    <span className='maputnik-space' />
                    <MdAddCircleOutline />
                </header>
                <div
                    className='maputnik-public-style-thumbnail'
                    style={style}>
                </div>
            </Button>
        </div>
    );
}

PublicStyle.propTypes = {
    url: PropTypes.string.isRequired,
    thumbnailUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired
};