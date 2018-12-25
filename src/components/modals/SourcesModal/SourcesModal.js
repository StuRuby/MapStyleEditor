import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import { MdAddCircleOutline, MdDelete } from 'react-icons/md';
import style from '../../libs/style';
import { StringInput, InputBlock, SelectInput } from '../input';
import SourceTypeEditor from '../SourceTypeEditor';
import { latest } from '@mapbox/mapbox-gl-style-spec';



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




function AddSource(props) {
    const [mode, setMode] = useState('tilejson_vector');
    const [sourceId, setSourceId] = useState(style.generateId());
    const [source, setSource] = useState();

    function defaultSource(mode) {
        const _source = source || {
            data: 'http://localhost:3000/geojson.json',
            url: 'http://localhost:3000/tilejson.json',
            tiles: ['http://localhost:3000/{x}/{y}/{z}.pbf'],
            minZoom: 0,
            maxZoom: 14,
        };
        const { data, url, tiles, minZoom, maxZoom } = _source;
        switch (mode) {
            case 'geojson':
                return { type: 'geojson', data, };
            case 'tilejson_vector':
                return { type: 'vector', url, }
            case 'tilexyz_vector':
                return { type: 'vector', tiles, minZoom, maxZoom };
            case 'tilejson_raster':
                return { type: 'raster', url };
            case 'tilexyz_raster':
                return { type: 'raster', tiles, minZoom, maxZoom, };
            case 'tilejson_raster-dem':
                return { type: 'raster-dem', url };
            case 'tilexyz_raster-dem':
                return { type: 'raster-dem', tiles, minZoom, maxZoom };
            default:
                return {};
        }
    }
    const options = [
        ['geojson', 'GeoJSON'],
        ['tilejson_vector', 'Vector (TileJSON URL)'],
        ['tilexyz_vector', 'Vector (XYZ URLs)'],
        ['tilejson_raster', 'Raster (TileJSON URL)'],
        ['tilexyz_raster', 'Raster (XYZ URL)'],
        ['tilejson_raster-dem', 'Raster DEM (TileJSON URL)'],
        ['tilexyz_raster-dem', 'Raster DEM (XYZ URLs)'],
    ];

    return (
        <div className='maputnik-add-source'>
            <InputBlock
                label='Source ID'
                doc='Unique ID that identifies the source and is used in the layer to reference the source.'
            >
                <StringInput
                    value={sourceId}
                    onChange={v => setSourceId(v)}
                />
            </InputBlock>
            <InputBlock
                label='Source Type'
                doc={latest.source_vector.type.doc}
            >
                <SelectInput
                    options={options}
                    onChange={mode => {
                        setMode(mode);
                        setSource(defaultSource(mode));
                    }}
                    value={mode}
                />
            </InputBlock>
            <SourceTypeEditor
                onChange={src => setSource(src)}
                mode={mode}
                source={source}
            />
            <Button
                className='maputnik-add-source-button'
                onClick={props.onAdd.bind(null, sourceId, source)}
            >
                添加数据源
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


export default function SourcesModal(props) {
    return (
        <Modal>
            <div>This is a SourcesModal</div>
        </Modal>
    );
}