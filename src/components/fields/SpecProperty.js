import React from 'react';
import PropTypes from 'prop-types';
import SpecField from './SpecField';
import FunctionButtons from './FunctionButtons';
import InputBlock from '../input/InputBlock';
import labelFromFieldName from './_labelFromFieldName';

export default function SpecProperty(props) {
    const functionBtn = <FunctionButtons
        fieldSpec={props.fieldSpec}
        onZoomClick={props.onZoomClick}
        onDataClick={props.onDataClick}
    />;

    return (
        <InputBlock
            doc={props.fieldSpec.doc}
            label={labelFromFieldName(props.fieldName)}
            action={functionBtn}
        >
            <SpecField {...props} />
        </InputBlock>
    );
}

SpecProperty.propTypes = {
    onZoomClick: PropTypes.func.isRequired,
    onDataClick: PropTypes.func.isRequired,
    fieldName: PropTypes.string,
    fieldSpec: PropTypes.object
};