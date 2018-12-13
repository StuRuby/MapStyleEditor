import React from 'react';
import PropTypes from 'prop-types';
import ColorField from './ColorField';
import {
    NumberInput,
    CheckBoxInput,
    StringInput,
    SelectInput,
    MultiButtonInput,
    ArrayInput,
    DynamicArrayInput,
    FontInput,
    IconInput,
} from '../input';
import capitalize from 'lodash.capitalize';

const iconProperties = ['background-pattern', 'fill-pattern', 'line-pattern', 'fill-extrusion-pattern', 'icon-image'];

function labelFromFieldName(fieldName) {
    let label = fieldName.split('-').slice(1).join(' ');
    if (label.length > 0) {
        label = label.charAt(0).toUpperCase() + label.slice(1);
    }
    return label;
}

function optionsLabelLength(options) {
    return options.reduce((p, [_, label]) => p = p + label.length, 0);
}


export default function SpecField(props) {
    const commonProps = {
        style: props.style,
        value: props.value,
        default: props.fieldSpec.default,
        name: props.fieldName,
        onChange: newValue => props.onChange(props.fieldName, newValue)
    };

    const renderChildrenNodes = () => {
        switch (props.fieldSpec.type) {
            case 'number':
                return (
                    <NumberInput
                        {...commonProps}
                        min={props.fieldSpec.minimum}
                        max={props.fieldSpec.maximum}
                    />
                );
            case 'enum':
                const options = Object.keys(props.fieldSpec.values).map(v => [v, capitalize(v)]);
                return options.length <= 3 && optionsLabelLength(options) <= 20
                    ? <MultiButtonInput
                        {...commonProps}
                        options={options}
                    />
                    : <SelectInput
                        {...commonProps}
                        options={options}
                    />;
            case 'string':
                return iconProperties.indexOf(props.fieldName) >= 0
                    ? <IconInput
                        {...commonProps}
                        icons={props.fieldSpec.values}
                    />
                    : <StringInput
                        {...commonProps}
                    />;
            case 'color':
                return <ColorField {...commonProps} />;

            case 'boolean':
                return <CheckBoxInput {...commonProps} />;

            case 'array':
                return props.fieldName === 'text-font'
                    ? <FontInput
                        {...commonProps}
                        fonts={props.fieldSpec.values}
                    />
                    : props.fieldSpec.length
                        ? <ArrayInput
                            {...commonProps}
                            type={props.fieldSpec.value}
                            length={props.fieldSpec.length}
                        />
                        : <DynamicArrayInput
                            {...commonProps}
                            type={props.fieldSpec.value}
                        />;
            default:
                return null;

        }
    };


    return (
        <div data-wd-key={`spec-field:${props.fieldName}`}>
            {renderChildrenNodes()}
        </div>
    );
}

SpecField.propTypes = {
    onChange: PropTypes.func.isRequired,
    fieldName: PropTypes.string.isRequired,
    fieldSpec: PropTypes.object.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.array,
        PropTypes.bool
    ]),
    /** Override the style of the field */
    style: PropTypes.object,
};