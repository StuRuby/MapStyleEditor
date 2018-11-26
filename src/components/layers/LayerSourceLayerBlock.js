import React from 'react';
import PropTypes from 'prop-types';
import { latest } from '@mapbox/mapbox-gl-style-spec';
import { InputBlock, AutoCompleteInput } from '../input';

export default function LayerSourceLayerBlock(props) {
    return (
        <InputBlock
            label='SourceLayer'
            doc={latest.layer['source-layer'].doc}
            data-wd-key='layer-source-layer'
        >
            <AutoCompleteInput
                keepMenuWithinWindowBounds={props.isFixed}
                value={props.value}
                onChange={props.onChange}
                options={props.sourceLayerIds.map(l => [l, l])}
            />
        </InputBlock>
    );
}

LayerSourceLayerBlock.PropTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    sourceLayerIds: PropTypes.array,
    isFixed: PropTypes.bool
};

LayerSourceLayerBlock.defaultProps = {
    onChange: () => { },
    sourceLayerIds: [],
    isFixed: false
};