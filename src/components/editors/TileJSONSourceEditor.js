import React from 'react';
import PropTypes from 'prop-types';
import { InputBlock, StringInput } from '../input';
import { latest } from '@mapbox/mapbox-gl-style-spec';

export default function TileJSONSourceEditor(props) {
    return (
        <div>
            <InputBlock label="TileJSON URL" doc={latest.source_vector.url.doc}>
                <StringInput
                    value={props.source.url}
                    onChange={url => props.onChange({ ...props.source, url })}
                />
            </InputBlock>
            {props.children}
        </div>
    );
}

TileJSONSourceEditor.propTypes = {
    source: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    children: PropTypes.node,
};