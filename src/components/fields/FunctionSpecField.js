import React from 'react';
import PropTypes, { func } from 'prop-types';
import ZoomProperty from './ZoomProperty';
import DataProperty from './DataProperty';
import SpecProperty from './SpecProperty';

function isZoomField(value) {
    return typeof value === 'object' && value.stops && typeof value.property === 'undefined';
}

function isDataField(props) {
    return typeof value === 'object' && value.stops && typeof value.property !== 'undefined';
}


export default function FunctionSpecField(props) {

    const getFieldFunctionType = (fieldSpec) => {
        if (fieldSpec.expression.interpolated) return 'exponential';
        if (fieldSpec.type === 'number') return 'interval';
        return 'categorical';
    };

    const addStop = () => {
        const stops = props.value.stops.slice();
        const lastStop = stops[stops.length - 1];
        if (typeof lastStop[0] === 'object') {
            stops.push([
                { zoom: lastStop[0].zoom + 1, value: lastStop[0].value },
                lastStop[1]
            ]);
        } else {
            stops.push([
                lastStop[0] + 1,
                lastStop[1]
            ]);
        }
        const changedValue = {
            ...props.value,
            stops,
        };
        props.onChange(props.fieldName, changedValue);
    };

    const deleteStop = (stopIdx) => {
        const stops = props.value.stops.slice();
        stops.slice(stopIdx, 1);
        let changedValue = {
            ...props.value,
            stops,
        };
        if (stops.length === 1) {
            changedValue = stops[0][1];
        }
        props.onChange(props.fieldName, changedValue);
    };

    const makeZoomFunction = () => {
        const zoomFunc = {
            stops: [
                [6, props.value],
                [10, props.value],
            ]
        };
        props.onChange(props.fieldName, zoomFunc);
    };

    const makeDataFunction = () => {
        const functionType = getFieldFunctionType(props.fieldSpec);
        const stopValue = functionType === 'categorical' ? '' : 0;
        const dataFunc = {
            property: '',
            type: functionType,
            stops: [
                [{ zoom: 6, value: stopValue }, props.value || stopValue],
                [{ zoom: 10, value: stopValue }, props.value || stopValue]
            ]
        };

        props.onChange(props.fieldName, dataFunc);
    };

    const classname = props.fieldSpec.default === props.value ? 'maputnik-default-property' : 'maputnik-modified-property';
    let specField = null;
    if (isZoomField(props.value)) {
        specField = <ZoomProperty
            onChange={props.onChange.bind(this)}
            fieldName={props.fieldName}
            fieldSpec={props.fieldSpec}
            value={props.value}
            onDeleteStop={deleteStop}
            onAddStop={addStop}
        />;
    } else if (isDataField(props.value)) {
        specField = <DataProperty
            onChange={props.onChange.bind(this)}
            fieldName={props.fieldName}
            fieldSpec={props.fieldSpec}
            value={props.value}
            onDeleteStop={deleteStop}
            onAddStop={addStop}
        />;
    } else {
        specField = <SpecProperty
            onChange={props.onChange.bind(this)}
            fieldName={props.fieldName}
            fieldSpec={props.fieldSpec}
            value={props.value}
            onZoomClick={makeZoomFunction}
            onDataClick={makeDataFunction}
        />;
    }

    return (
        <div
            data-wd-key={`spec-field:${props.fieldName}`}
            className={classname}
        >
            {specField}
        </div>
    );
}

FunctionSpecField.propTypes = {
    onChange: PropTypes.func.isRequired,
    fieldName: PropTypes.string.isRequired,
    fieldSpec: PropTypes.object.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool,
        PropTypes.array
    ])
};