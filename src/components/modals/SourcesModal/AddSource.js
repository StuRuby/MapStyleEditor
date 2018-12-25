import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../Button';
import style from '../../../libs/style';
import { StringInput, InputBlock, SelectInput } from '../../input';
import SourceTypeEditor from '../../SourceTypeEditor';
import { latest } from '@mapbox/mapbox-gl-style-spec';

export default function AddSource(props) {
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
                return { type: 'vector', url, };
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

AddSource.propTypes = {
    onAdd: PropTypes.func.isRequired,
};