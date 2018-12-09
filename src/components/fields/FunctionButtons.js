import React from 'react';
import PropTypes from 'prop-types';
import DocLabel from './DocLabel';
import Button from '../Button';
import { MdFunctions, MdInsertChart } from 'react-icons/md';

export default function FunctionButton(props) {
    const isRender = props.fieldSpec.expression.parameters.includes('zoom');
    return isRender &&
        <div>
            <Button
                className='maputnik-make-zoom-function'
                onClick={props.onZoomClick}
            >
                <DocLabel
                    label={<MdFunctions />}
                    cursorTargetStyle={{ cursor: 'pointer' }}
                    doc={`Turn property into a zoom function to enable a map feature to change with map's zoom level.`}
                />
            </Button>
            {
                props.fieldSpec['property-type'] === 'data-driven' &&
                <Button
                    className='maputnik-make-data-function'
                    onClick={props.onDataClick}
                >
                    <DocLabel
                        label={<MdInsertChart />}
                        cursorTargetStyle={{ cursor: 'pointer' }}
                        doc={`Turn property into a data function to enable a map feature to change according to data properties and the map's zoom level.`}
                    />
                </Button>
            }
        </div>
}

FunctionButton.propTypes = {
    fieldSpec: PropTypes.object,
    onZoomClick: PropTypes.func,
    onDataClick: PropTypes.func,
};