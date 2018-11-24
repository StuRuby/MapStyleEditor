import React from 'react';
import PropTypes from 'prop-types';
import { latest } from '@mapbox/mapbox-gl-style-spec';
import { InputBlock, StringInput } from '../input';

export default function LayerIdBlock(props) {
    return (
        <InputBlock
            label='ID'
            doc={latest.layer.id.doc}
            data-wd-key={props.wdKey}
        >
            <StringInput
                value={props.value}
                onChange={props.onChange}
            />
        </InputBlock>
    );
}

LayerIdBlock.propTypes = {
    value: PropTypes.string.isRequired,
    wdKey: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};