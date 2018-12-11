import React from 'react';
import PropTypes from 'prop-types';
import StringInput from '../input/StringInput';
import AutoCompleteInput from '../input/AutoCompleteInput';
import SelectInput from '../input/SelectInput';
import { otherFilterOps } from '../../libs/filterops';


function tryParseInt(v) {
    if (v === '') return v;
    if (isNaN(v)) return v;
    return parseFloat(v);
}

function tryParseBool(v) {
    const isString = (typeof (v) === 'string');
    if (!isString) {
        return v;
    }

    if (v.match(/^\s*true\s*$/)) {
        return true;
    }
    else if (v.match(/^\s*false\s*$/)) {
        return false;
    }
    else {
        return v;
    }
}

function parseFilter(value) {
    value = tryParseInt(value);
    value = tryParseBool(value);
    return value;
}

export default function SingleFilterEditor(props) {

    const onFilterPartChanged = (filterOp, propertyName, filterArgs) => {
        let newFilter = [filterOp, propertyName, ...filterArgs.map(parseFilter)];
        if (filterOp === 'has' || filterOp === '!has') {
            newFilter = [filterOp, propertyName];
        } else if (filterArgs.length === 0) {
            newFilter = [filterOp, propertyName, ''];
        }
        props.onChange(newFilter);
    };


    const f = props.filter;
    const filterOp = f[0];
    const propertyName = f[1];
    const filterArgs = f.slice(2);
    return (
        <div className='maputnik-filter-editor-single'>
            <div className='maputnik-filter-editor-property'>
                <AutoCompleteInput
                    value={propertyName}
                    options={Object.keys(props.properties).map(propName => [propName, propName])}
                    onChange={(newPropertyName) => onFilterPartChanged(filterOp, newPropertyName, filterArgs)}
                />
            </div>
            <div className='maputnik-filter-editor-operator'>
                <SelectInput
                    value={filterOp}
                    onChange={newFilterOp => onFilterPartChanged(newFilterOp, propertyName, filterArgs)}
                    options={otherFilterOps}
                />
            </div>
            {
                filterArgs.length > 0 &&
                <div className='maputnik-filter-editor-args'>
                    <StringInput
                        value={filterArgs.join(',')}
                        onChange={value => onFilterPartChanged(filterOp, propertyName, value.split(','))}
                    />
                </div>
            }
        </div>
    );
}

SingleFilterEditor.propTypes = {
    filter: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    properties: PropTypes.object
};