import React, { PropTypes } from 'react';

export default function SourceTypeEditor(props) {
    const commonProps = {
        source: props.source,
        onChange: props.onChange
    };
    switch (props.mode) {
        case 'geojson':
            return <GeoJSONSourceEditor {...commonProps} />;
        case 'tilejson_vector':
            return <TileJSONSourceEditor {...commonProps} />;
        case 'tilexyz_vector':
            return <TileURLSourceEditor {...commonProps} />;
        case 'tilejson_raster':
            return <TileJSONSourceEditor {...commonProps} />;
        case 'tilexyz_raster':
            return <TileURLSourceEditor {...commonProps} />;
        case 'tilejson_raster-dem':
            return <TileJSONSourceEditor {...commonProps} />;
        case 'tilexyz_raster-dem':
            return (
                <TileURLSourceEditor {...commonProps}>
                    <InputBlock
                        label={'Encoding'}
                        doc={latest.source_raster_dem.encoding.doc}
                    >
                        <SelectInput
                            options={Object.keys(
                                latest.source_raster_dem.encoding.values
                            )}
                            onChange={encoding =>
                                props.onChange({
                                    ...props.source,
                                    encoding: encoding
                                })
                            }
                            value={
                                props.source.encoding ||
								latest.source_raster_dem.encoding.default
                            }
                        />
                    </InputBlock>
                </TileURLSourceEditor>
            );
        default:
            return null;
    }
}

SourceTypeEditor.propTypes = {
    mode: PropTypes.string.isRequired,
    source: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
};
