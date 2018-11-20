import React from 'react';
import PropTypes from 'prop-types';
import AutocompleteInput from './AutoCompleteInput';

export default function IconInput(props) {
    return (
        <AutocompleteInput
            value={props.value}
            options={props.icons.map(f => [f, f])}
            onChange={props.onChange}
            wrapprStyle={props.style}
        />
    );
}

IconInput.propTypes = {
    value: PropTypes.array,
    icons: PropTypes.array,
    style: PropTypes.object,
    onChange: PropTypes.func.isRequired
};

IconInput.defaultProps = {
    icons: []
};

