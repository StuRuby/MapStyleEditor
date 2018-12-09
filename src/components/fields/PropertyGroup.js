import React from 'react';
import PropTypes from 'prop-types';
import FunctionSpecField from './FunctionSpecField';

/** Extract field spec by {@fieldName} from the {@layerType} in the
 * style specification from either the paint or layout group */
function getFieldSpec(spec, layerType, fieldName) {
    const groupName = getGroupName(spec, layerType, fieldName)
    const group = spec[groupName + '_' + layerType]
    const fieldSpec = group[fieldName]
    if (iconProperties.indexOf(fieldName) >= 0) {
        return {
            ...fieldSpec,
            values: spec.$root.sprite.values
        }
    }
    if (fieldName === 'text-font') {
        return {
            ...fieldSpec,
            values: spec.$root.glyphs.values
        }
    }
    return fieldSpec
}

function getGroupName(spec, layerType, fieldName) {
    const paint = spec['paint_' + layerType] || {}
    if (fieldName in paint) {
        return 'paint'
    } else {
        return 'layout'
    }
}

export default function PropertyGroup(props) {

    const onPropertyChange = (property, newValue) => {
        const group = getGroupName(props.spec, props.selectedLayer.type, property);
        props.onChange(group, property, newValue);
    };

    const fields = props.groupFields.map(fieldName => {
        const fieldSpec = getFieldSpec(props.spec, props.selectedLayer.type, fieldName);
        const paint = props.selectedLayer.paint || {};
        const layout = props.selectedLayer.layout || {};
        const filedValue = fieldName in paint ? paint[fieldName] : layout[fieldName];

        return (
            <FunctionSpecField
                onChange={onPropertyChange}
                key={fieldName}
                fieldName={fieldName}
                value={filedValue === undefined ? fieldSpec.default : filedValue}
                fieldSpec={fieldSpec}
            />
        );
    });

    return (
        <div className='maputnik-property-group'>
            {fields}
        </div>
    );
}

PropertyGroup.propTypes = {
    selectedLayer: PropTypes.object.isRequired,
    groupFields: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    spec: PropTypes.object.isRequired
};