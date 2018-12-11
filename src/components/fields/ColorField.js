import React, { useState,useRef } from 'react';
import PropTypes from 'prop-types';
import Color from 'color';
import ChromePicker from 'react-color/lib/components/chrome/Chrome';

function formatColor(color) {
    const rgb = color.rgb;
    return `rgba(${rgb.r},${rgb.g},${rgb.b},${rgb.a})`;
}


export default function ColorField(props) {
    const [pickerOpened, setPickerOpen] = useState(false);
    const colorInput = useRef(null);
    const style = { backgroundColor: props.value };

    const getColor = () => {
        try {
            return Color(props.value).rgb();
        } catch (err) {
            console.error('Error parsing color:', err);
            return Color('rgb(255,255,255)');
        }
    };

    const togglePicker = () => setPickerOpen(!pickerOpened);

    const calcPickerOffset = () => {
        const elem = colorInput.current;
        if (elem) {
            const pos = elem.getBoundingClientRect();
            return {
                top: pos.top,
                left: pos.left + 196
            };
        } else {
            return {
                top: 160,
                left: 555,
            };
        }
    };


    const offset = calcPickerOffset();
    let currentColor = getColor().object();
    currentColor = {
        r: currentColor.r,
        g: currentColor.g,
        b: currentColor.b,
        a: currentColor.alpha
    };

    const pickerStyle = {
        position: 'fixed',
        zIndex: 1,
        left: offset.left,
        top: offset.top,
    };
    const picker =
        <div
            className='maputnik-color-picker-offset'
            style={pickerStyle}
        >
            <ChromePicker
                color={currentColor}
                onChange={c => props.onChange(formatColor(c))}
            />
            <div
                className='maputnik-color-picker-offset'
                onClick={togglePicker}
                style={{ zIndex: -1, position: 'fixed', top: '0px', right: '0px', bottom: '0px', left: '0px' }}
            />
        </div>;

    return (
        <div className='maputnik-color-wrapper'>
            {pickerOpened && picker}
            <div className='maputnik-color-swatch' style={style} ></div>
            <input
                spellCheck='false'
                className='maputnik-color'
                ref={colorInput}
                onClick={togglePicker}
                style={props.style}
                name={props.name}
                placeholder={props.default}
                value={props.value ? props.value : ''}
                onChange={e => props.onChange(e.target.value)}
            />
        </div>
    );
}

ColorField.propTypes = {
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    doc: PropTypes.string,
    style: PropTypes.object,
    default: PropTypes.string
};