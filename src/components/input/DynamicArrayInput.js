import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import { DocLabel } from '../fields';
import MdDelete from 'react-icons/md';
import NumberInput from './NumberInput';
import StringInput from './StringInput';

function DeleteValueButton(props) {
    return (
        <Button
            className='maputnik-delete-stop'
            onClick={props.onClick}
        >
            <DocLabel
                label={<MdDelete />}
                doc={'Remove array entry'}
            />
        </Button>
    );
}

DeleteValueButton.propTypes = {
    onClick: PropTypes.func
};


export default function DynamicArrayInput(props) {
    let values = props.value || props.default || [];

    function deleteValue(idx) {
        const _values = values.slice(0);
        _values.splice(idx, 1);
        props.onChange(_values);
    }

    function changeValue(idx, newValue) {
        const _values = values.slice(0);
        _values[idx] = newValue;
        props.onChange(_values);
    }

    function addValue() {
        const _values = values.slice();
        if (props.type === 'number') {
            _values.push(0);
        } else {
            _values.push('');
        }
        props.onChange(_values);
    }

    const inputs = values.map((v, i) => {
        const deleteValueBtn = <DeleteValueButton onClick={deleteValue.bind(this, i)} />;
        const input = props.type === 'number' ?
            <NumberInput
                value={v}
                onChange={changeValue.bind(this, i)}
            /> :
            <StringInput
                value={v}
                onChange={changeValue.bind(this, i)}
            />;
        return (
            <div
                style={props.style}
                key={i}
                className='maputnik-array-block'>
                <div className='maputnik-array-block-action'>
                    {deleteValueBtn}
                </div>
                <div className='maputnik-array-block-content'>
                    {input}
                </div>
            </div>
        );
    });
    return (
        <div className='maputnik-array'>
            {inputs}
            <Button
                className='maputnik-array-add-value'
                onClick={addValue}
            >
                添加数据
            </Button>
        </div>
    );
}

DynamicArrayInput.propTypes = {
    value: PropTypes.array,
    type: PropTypes.string,
    default: PropTypes.array,
    onChange: PropTypes.func,
    style: PropTypes.object,
};