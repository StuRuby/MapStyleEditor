import React from 'react';
import PropTypes from 'prop-types';
import { InputBlock, StringInput } from '../input';
import { latest } from '@mapbox/mapbox-gl-style-spec';

export default function GeoJSONSourceEditor(props) {
    const handleChange = (data) => props.onChange({ ...props.source, data });
    return (
        <InputBlock label='GeoJSON data' doc={latest.source_geojson.data.doc} >
            <StringInput
                value={props.source.data}
                onChange={handleChange}
            />
        </InputBlock>
    );
}

GeoJSONSourceEditor.propTypes = {
    source: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
};