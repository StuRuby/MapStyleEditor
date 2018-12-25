import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import { MdAddCircleOutline, MdDelete } from 'react-icons/md';



function PublicSource(props) {
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

function editorMode(source) {
    if (source.type === 'raster') {
        if (source.tiles) return 'tilexyz_raster';
        return 'tilejson_raster';
    }
    if (source.type === 'raster-dem') {
        if (source.tiles) return 'tilexyz_raster-dem';
        return 'tilejson_raster-dem';
    }
    if (source.type === 'vector') {
        if (source.tiles) return 'tilexyz_vector';
        return 'tilejson_vector';
    }
    if (source.type === 'geojson') return 'geojson';
    return null;
}

function ActiveSourceTypeEditor(props) {
    return (
        <div className='maputnik-active-source-type-editor'>
            <div className='maputnik-active-source-type-editor-header'>
                <span className='maputnik-active-source-type-editor-header-id'>#{props.sourceId}</span>
                <span className='maputnik-space' />
                <Button
                    className='maputnik-active-source-type-editor-header-delete'
                    onClick={props.onDelete.bind(props.sourceId)}
                    style={{ backgroundColor: 'transparent' }}
                >
                    <MdDelete />
                </Button>
            </div>
        </div>
    );
}


PublicSource.propTypes = {
    id: PropTypes.string.isRequired,
    type: propTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired,
};


export default function SourcesModal(props) {
    return (
        <Modal>
            <div>This is a SourcesModal</div>
        </Modal>
    );
}