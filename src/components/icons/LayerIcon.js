import React from 'react';
import PropTypes from 'prop-types';
import IconBase from 'react-icon-base';
import BackgroundIcon from './BackgroundIcon';
import FillIcon from './FillIcon';
import LineIcon from './LineIcon';
import SymbolIcon from './SymbolIcon';
import CircleIcon from './CircleIcon';

export default function LayerIcon(props) {
    const { type, style } = props;
    const icons = {
        'fill-extrusion': <BackgroundIcon {...style} />,
        'raster': <FillIcon {...style} />,
        'hillshade': <FillIcon {...style} />,
        'heatmap': <FillIcon {...style} />,
        'fill': <FillIcon {...style} />,
        'background': <BackgroundIcon {...style} />,
        'line': <LineIcon {...style} />,
        'symbol': <SymbolIcon {...style} />,
        'circle': <CircleIcon {...style} />
    };
    return icons[type];
}

LayerIcon.propTypes = {
    type: PropTypes.string.isRequired,
    style: PropTypes.object
};