import React from 'react';
import PropTypes from 'prop-types';
import SourceTypeEditor from '../../SourceTypeEditor';
import Button from '../../Button';
import { MdDelete } from 'react-icons/md';

function editorMode(source) {
    if (source.type === 'raster') {
        if (source.tiles) return 'tilexyz_raster';
        return 'tilejson_raster';
    }
    if (source.type === 'raster-dem') {
        if (source.tiles) return 'tilexyz_raster-dem';
        return 'tilejson_raster-dem';
    }
    if (source.type === 'vector') {
        if (source.tiles) return 'tilexyz_vector';
        return 'tilejson_vector';
    }
    if (source.type === 'geojson') return 'geojson';
    return null;
}

export default function ActiveSourceTypeEditor(props) {
    return (
        <div className="maputnik-active-source-type-editor">
            <div className="maputnik-active-source-type-editor-header">
                <span className="maputnik-active-source-type-editor-header-id">
                    #{props.sourceId}
                </span>
                <span className="maputnik-space" />
                <Button
                    className="maputnik-active-source-type-editor-header-delete"
                    onClick={props.onDelete.bind(props.sourceId)}
                    style={{ backgroundColor: 'transparent' }}
                >
                    <MdDelete />
                </Button>
            </div>
            <div className="maputnik-active-source-type-editor-content">
                <SourceTypeEditor
                    onChange={props.onChange}
                    mode={editorMode(props.source)}
                    source={props.source}
                />
            </div>
        </div>
    );
}

ActiveSourceTypeEditor.propTypes = {
    sourceId: PropTypes.string.isRequired,
    source: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired
};
