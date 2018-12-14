import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';
import Button from '../Button';
import SpecField from './SpecField';
import { NumberInput, InputBlock } from '../input';
import DeleteStopButton from './DeleteStopButton';
import labelFromFieldName from './_labelFromFieldName';
import docUid from '../../libs/document-uid';


function setStopRefs(props, state) {
    let newRefs;
    if (props.value && props.value.stops) {
        props.value.stops.forEach((val, idx) => {
            if (!state.refs.hasOwnProperty(idx)) {
                if (!newRefs) {
                    newRefs = { ...state.refs };
                }
                newRefs[idx] = docUid('stop-');
            }
        });
    }
    return newRefs;
}

function sortNumerically(a, b) {
    a = parseFloat(a, 10);
    b = parseFloat(b, 10);

    if (a < b) {
        return -1;
    }
    else if (a > b) {
        return 1;
    }
    else {
        return 0;
    }
}


export default class ZoomProperty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refs: {}
        };
        autobind(this);
    }

    static getDerivedStateFromProps(props, state) {
        const newRefs = setStopRefs(props, state);
        if (newRefs) {
            return { refs: newRefs };
        }
        return null;
    }

    componentDidMount() {
        const newRefs = setStopRefs(this.props, this.state);
        if (newRefs) {
            this.setState({
                refs: newRefs
            });
        }
        return null;
    }

    orderStopsByZoom(stops) {
        const mappedWithRef = stops.map((stop, index) => ({ ref: this.state.refs[index], data: stop }))
            .sort((a, b) => sortNumerically(a.data[0], b.data[0]));
        const newRefs = {};
        mappedWithRef.forEach((stop, index) => newRefs[index] = stop.ref);
        this.setState({
            refs: newRefs
        });
        return mappedWithRef.map(item => item.data);
    }

    changeZoomStop(changedIndex, stopData, value) {
        const stops = this.props.value.stops.slice();
        stops[changedIndex] = [stopData, value];
        const orderedStops = this.orderStopsByZoom(stops);
        const changedValue = {
            ...this.props.value,
            stops: orderedStops
        };
        this.props.onChange(this.props.fieldName, changedValue);
    }

    renderZoomFields() {
        return this.props.value.stops.map((stop, index) => {
            const zoomLevel = stop[0];
            const key = this.state.refs[index];
            const value = stop[1];
            const deleteStopBtn = <DeleteStopButton
                onClick={this.props.onDeleteStop.bind(this, index)}
            />;
            return (
                <InputBlock
                    key={key}
                    doc={this.props.fieldSpec.doc}
                    label={labelFromFieldName(this.props.fieldName)}
                    action={deleteStopBtn}
                >
                    <div>
                        <div className='maputnik-zoom-spec-property-stop-edit'>
                            <NumberInput
                                value={zoomLevel}
                                onChange={changedStop => this.changeZoomStop(index, changedStop, value)}
                                min={0}
                                max={22}
                            />
                        </div>
                        <div className='maputnik-zoom-spec-property-stop-value'>
                            <SpecField
                                fieldName={this.props.fieldName}
                                fieldSpec={this.props.fieldSpec}
                                value={value}
                                onChange={(_, newValue) => this.changeZoomStop(index, zoomLevel, newValue)}
                            />
                        </div>
                    </div>
                </InputBlock>
            );
        });
    }

    render() {

        return (
            <div className='maputnik-zoom-spec-property'>
                {this.renderZoomFields()}
                <Button
                    className='maputnik-add-stop'
                    onClick={this.props.onAddStop}
                >
                    添加stop
                </Button>
            </div>
        );
    }
}


ZoomProperty.propTypes = {
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
    ]),
};