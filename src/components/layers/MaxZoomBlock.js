import React from 'react';
import PropTypes from 'prop-types';
import { latest } from '@mapbox/mapbox-gl-style-spec';
import { InputBlock, NumberInput } from '../input';

export default function MaxZoomBlock(props) {
    return (
        <InputBlock
            label='Max Zoom'
            doc={latest.layer.minzoom.doc}
            data-wd-key='max-zoom'
        >
            <NumberInput
                value={props.value}
                onChange={props.onChange}
                min={latest.layer.minzoom.minimum}
                max={latest.layer.maxzoom.maximum}
                default={latest.layer.maxzoom.maximum}
            />
        </InputBlock>
    );
}

MaxZoomBlock.propTypes = {
    value: PropTypes.number,
    onChange: PropTypes.func.isRequired
};