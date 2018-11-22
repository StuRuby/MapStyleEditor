import React from 'react';
import PropTypes from 'prop-types';


export default function MessagePanel(props) {
    const errors = props.errors.map((err, idx) => <p key={`error-${idx}`} className='maputnik-message-panel-error' >{err}</p>);
    const infos = props.infos.map((info, idx) => (<p key={`info-${idx}`} >{info}</p>));
    return (
        <div className='maputnik-message-panel'>
            {errors}
            {infos}
        </div>
    );
}

MessagePanel.propTypes = {
    errors: PropTypes.array,
    infos: PropTypes.array
};