import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Autocomplete from 'react-autocomplete';

const MAX_HEIGHT = 140;

export default function Autocomplete(props) {
    const [maxHeight, setMaxHeight] = useState(MAX_HEIGHT);
    const autocompleteMenuEl = useRef(null);

    function calcMaxHeight() {
        if (props.keepMenuWithinWindowBounds) {
            const _maxHeight = window.innerHeight - autocompleteMenuEl.getBoundingClientRect().top;
            const limitedMaxHeight = Math.min(maxHeight, MAX_HEIGHT);
            if (limitedMaxHeight !== maxHeight) {
                setMaxHeight(limitedMaxHeight);
            }
        }
    }

    useEffect(() => {
        calcMaxHeight();
    });

    const menuStyle = {
        position: 'fixed',
        overflow: 'auto',
        maxHeight: maxHeight,
        zIndex: '998'
    };
    const wrapperProps = {
        className: 'maputnik-autocomplete',
        style: null
    };
    const inputProps = {
        className: 'maputnik-string',
        spellCheck: false
    };
    const shouleItemRender = ((item, value = ''))=> {
        if (typeof value === 'string') {
            return item[0].toLowerCase().indexOf(value.toLowerCase()) > -1;
        }
    };
    const renderItem = (item, isHighlighted) => (
        <div
            key={item[0]}
            className={classNames({
                "maputnik-autocomplete-menu-item": true,
                "maputnik-autocomplete-menu-item-selected": isHighlighted,
            })} >
            {item[1]}
        </div>
    );
    return (
        <div ref={autocompleteMenuEl} >
            <Autocomplete
                menuStyle={menuStyle}
                wrapperProps={wrapperProps}
                inputProps={inputProps}
                value={props.value}
                items={props.items}
                getItemValue={item => item[0]}
                onSelect={v => props.onChange(v)}
                shouleItemRender={shouleItemRender}
                renderItem={renderItem}
            />
        </div>
    );
};

Autocomplete.propTypes = {
    value: PropTypes.string,
    options: PropTypes.array,
    onChange: PropTypes.func,
    keepMenuWithinWindowBounds: PropTypes.bool
};

Autocomplete.defaultProps = {
    onChange=() => { },
    options: []
};