import React from 'react';
import PropTypes from 'prop-types';
import { latest } from '@mapbox/mapbox-gl-style-spec';
import { InputBlock, SelectInput } from '../input';

export default function LayerTypeBlock(props) {
    const options = [
        ['background', 'Background'],
        ['fill', 'Fill'],
        ['line', 'Line'],
        ['symbol', 'Symbol'],
        ['raster', 'Raster'],
        ['circle', 'Circle'],
        ['fill-extrusion', 'Fill Extrusion'],
        ['hillshade', 'Hillshade'],
        ['heatmap', 'Heatmap']
    ];
    return (
        <InputBlock
            label='Type'
            doc={latest.layer.type.doc}
            data-wd-wdKey={props.wdKey}
        >
            <SelectInput
                options={options}
                onChange={props.onChange}
                value={props.value}
            />
        </InputBlock>
    );
}

LayerTypeBlock.propTypes = {
    value: PropTypes.string.isRequired,
    wdKey: PropTypes.string,
    onChange: PropTypes.func.isRequired
};