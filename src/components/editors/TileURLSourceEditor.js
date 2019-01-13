import React from 'react';
import PropTypes from 'prop-types';
import { InputBlock, NumberInput, StringInput } from '../input';
import { latest } from '@mapbox/mapbox-gl-style-spec';

export default function TileURLSourceEditor(props) {

    const changeTileUrl = (idx, value) => {
        const tiles = props.source.tiles.slice(0);
        tiles[idx] = value;
        props.onChange({
            ...props.source,
            tiles,
        });
    };

    const renderTileUrls = () => {
        const prefix = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th'];
        const tiles = props.source.tiles || [];
        return tiles.map((tileUrl, tileIndex) =>
            <InputBlock
                key={tileIndex}
                label={prefix[tileIndex] + ' Tile Url'}
                doc={latest.source_vector.tiles.doc}
            >
                <StringInput
                    value={tileUrl}
                    onChange={changeTileUrl.bind(null, tileIndex)}
                />
            </InputBlock>
        );
    };
    return (
        <div>
            {renderTileUrls()}
            <InputBlock label='Min Zoom' doc={latest.source_vector.minzoom.doc} >
                <NumberInput
                    value={props.source.minzoom || 0}
                    onChange={minzoom => props.onChange({ ...props.source, minzoom })}
                />
            </InputBlock>
            <InputBlock label='Max Zoom' doc={latest.source_vector.maxzoom.doc}  >
                <NumberInput
                    value={props.source.maxzoom || 22}
                    onChange={maxzoom => props.onChange({ ...props.source, maxzoom })}
                />
            </InputBlock>
            {props.children}
        </div>
    );
}

TileURLSourceEditor.propTypes = {
    source: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    children: PropTypes.node
};