import React from 'react';
import PropTypes from 'prop-types';
import { InputBlock, StringInput } from '../components/input';


function displayValue(value) {
    if (typeof value === 'undefined' || value === null) return value;
    if (value instanceof Date) return value.toLocaleString();
    if (typeof value === 'object' || typeof value === 'number' || typeof value === 'string') return value.toString();
    return value;
}

function renderProperties(feature) {
    return Object.keys(feature.properties)
        .map(propertyName => {
            const property = feature.properties[propertyName];
            return (
                <InputBlock
                    key={propertyName}
                    label={propertyName}
                >
                    <StringInput
                        value={displayValue(property)}
                        style={{ backgroundColor: 'transparent' }}
                    />
                </InputBlock>
            );
        });
}

function renderFeature(feature) {
    return (
        <div key={feature.id} >
            <div className='maputnik-popup-layer-id'>
                {feature.layer['source-layer']}
                {feature.inspectModeCounter && <span> × {feature.inspectModeCounter} </span>}
            </div>
            <InputBlock key='property-type' label='$type' >
                <StringInput
                    value={feature.geometry.type}
                    style={{ backgroundColor: 'transparent' }}
                />
                {renderProperties(feature)}
            </InputBlock>
        </div>
    );
}