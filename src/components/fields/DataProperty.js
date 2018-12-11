import React from 'react';
import PropTypes from 'prop-types';
import { InputBlock, StringInput, SelectInput, NumberInput } from '../input';
import DocLabel from './DocLabel';
import SpecField from './SpecField';
import Button from '../Button';
import DeleteStopButton from './DeleteStopButton';
import labelFromFieldName from './_labelFromFieldName';


export default function DataProperty(props) {

    const getFieldFunctionType = (fieldSpec) => {
        if (fieldSpec.expression.interpolated) return 'exponential';
        if (fieldSpec.type === 'number') return 'interval';
        return 'categorical';
    };

    const getDataFunctionTypes = (fieldSpec) => {
        if (fieldSpec.expression.interpolated) {
            return ['categorical', 'interval', 'exponential'];
        } else {
            return ['categorical', 'interval'];
        }
    };

    const changeStop = (changeIdx, stopData, value) => {
        const stops = props.value.stops.slice();
        const changedStop = stopData.zoom === undefined ? stopData.value : stopData;
        stops[changeIdx] = [changedStop, value];
        const changedValue = {
            ...props.value,
            stops: stops
        };
        props.onChange(props.fieldName, changedValue);
    };

    const changeDataProperty = (propName, propValue) => {
        const _value = props.value;
        if (propValue) {
            _value[propName] = propValue;
        } else {
            delete _value[propName];
        }
        props.onChange(props.fieldName, _value);
    };

    if (typeof props.value.type === 'undefined') {
        props.value.type = getFieldFunctionType(props.fieldSpec);
    }

    const renderDataFields = () => {
        return props.value.stops.map((stop, idx) => {
            const zoomLevel = typeof stop[0] === 'object' ? stop[0].zoom : undefined;
            const dataLevel = typeof stop[0] === 'object' ? stop[0].value : stop[0];
            const value = stop[1];
            const deleteStopBtn = <DeleteStopButton onClick={props.onDeleteStop.bind(null, idx)} />;

            const dataProps = {
                label: 'Data value',
                value: dataLevel,
                onChange: newData => changeStop(idx, { zoom: zoomLevel, value: newData }, value)
            };

            const dataInput = props.value.type === 'categorical' ? <StringInput {...dataProps} /> : <NumberInput {...dataProps} />;
            const zoomInput = zoomLevel !== undefined
                ? <div className='maputnik-data-spec-property-stop-edit'>
                    <NumberInput
                        value={zoomLevel}
                        onChange={newZoom => changeStop(idx, { zoom: newZoom, value: dataLevel }, value)}
                        min={0}
                        max={22}
                    />
                </div>
                : null;

            return (
                <InputBlock
                    key={idx}
                    action={deleteStopBtn}
                    label=''
                >
                    {zoomInput}
                    <div className='maputnik-data-spec-property-stop-data'>
                        {dataInput}
                    </div>
                    <div className='maputnik-data-spec-property-stop-value'>
                        <SpecField
                            fieldName={props.fieldName}
                            fieldSpec={props.fieldSpec}
                            value={value}
                            onChange={(_, newValue) => changeStop(idx, { zoom: zoomLevel, value: dataLevel }, newValue)}
                        />
                    </div>
                </InputBlock>
            );
        });
    };

    return (
        <div className='maputnik-data-spec-block'>
            <div className='maputnik-data-spec-property'>
                <InputBlock
                    doc={props.fieldSpec.doc}
                    label={labelFromFieldName(props.fieldName)}
                >
                    <div className='maputnik-data-spec-property-group'>
                        <DocLabel
                            label='Property'
                            doc='Input a data property to base styles off of.'
                        />
                        <div className='maputnik-data-spec-property-input'>
                            <StringInput
                                value={props.value.property}
                                onChange={propVal => changeDataProperty('property', propVal)}
                            />
                        </div>
                    </div>
                    <div className='maputnik-data-spec-property-group'>
                        <DocLabel
                            label='Type'
                            doc='Select a type of data scale (default is "categorical").'
                        />
                        <div className='maputnik-data-spec-property-input'>
                            <SelectInput
                                value={props.value.type}
                                onChange={propVal => changeDataProperty('type', propVal)}
                                options={getDataFunctionTypes(props.fieldSpec)}
                            />
                        </div>
                    </div>

                    <div className='maputnik-data-spec-property-group'>
                        <DocLabel
                            label='default'
                            doc='Input a default value for data if not covered by the scales.'
                        />
                        <div className='maputnik-data-spec-property-input'>
                            <SpecField
                                fieldName={props.fieldName}
                                fieldSpec={props.fieldSpec}
                                value={props.value.default}
                                onChange={(_, propVal) => changeDataProperty('default', propVal)}
                            />
                        </div>
                    </div>
                </InputBlock>
            </div>
            {renderDataFields()}
            <Button
                className='maputnik-add-stop'
                onClick={props.onAddStop}
            >
                添加stop
            </Button>
        </div>
    );
}


DataProperty.propTypes = {
    onChange: PropTypes.func,
    onDeleteStop: PropTypes.func,
    onAddStop: PropTypes.func,
    fieldName: PropTypes.string,
    fieldSpec: PropTypes.object,
    value: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool,
        PropTypes.array
    ])
};