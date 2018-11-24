import React from 'react';
import PropTypes from 'prop-types';
import { InputBlock, AutoCompleteInput } from '../input';
import { latest } from '@mapbox/mapbox-gl-style-spec';

export default function LayerSourceBlock(props) {
    return (
        <InputBlock
            label='Source'
            doc={latest.layer.source.doc}
            data-wd-key={props.wdKey}
        >
            <AutoCompleteInput
                value={props.value}
                onChange={props.onChange}
                options={props.sourceIds.map(src => [src, src])}
            />
        </InputBlock>
    );
}

LayerSourceBlock.propTypes = {
    value: PropTypes.string,
    wdKey: PropTypes.string,
    onChange: PropTypes.func,
    sourceIds: PropTypes.array
};

LayerSourceBlock.defaultProps = {
    onChange: () => { },
    sourceIds: []
};