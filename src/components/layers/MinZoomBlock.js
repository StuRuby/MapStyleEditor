import React from 'react'
import PropTypes from 'prop-types'
import { latest } from '@mapbox/mapbox-gl-style-spec'
import { InputBlock, NumberInput } from '../input';

export default function MinZoomBlock(props) {
    return (
        <InputBlock
            label='Min Zoom'
            doc={latest.layer.minzoom.doc}
            data-wd-key='min-zoom'
        >
            <NumberInput
                value={props.value}
                onChange={props.onChange}
                min={latest.layer.minzoom.minimum}
                max={latest.layer.maxzoom.maximum}
                default={latest.layer.minzoom.minimum}
            />
        </InputBlock>
    );
}

MinZoomBlock.propTypes = {
    value: PropTypes.number,
    onChange: PropTypes.func.isRequired
};