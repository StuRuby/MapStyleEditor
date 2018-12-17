import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';
import MapboxGl from 'mapbox-gl';
import MapboxInspect from 'mapbox-gl-inspect';
import ZoomControl from '../libs/zoomControl';
import Color from 'color';
import colors from 'mapbox-gl-inspect/lib/colors';
import FeatureLayerPopup from '../components/FeatureLayerPopup';
import tokens from '../mock/tokens.js';

const IS_SUPPORTED = MapboxGl.supported();


export default class Map extends Component {
    constructor(props) {
        super(props);
        autobind(this);
        this.state = {
            map: null,
            inspect: null,
            isPopupOpen: false,
            popupX: 0,
            popupY: 0,
        };
    }

    updateMapFromProps(props) {
        if (!IS_SUPPORTED) return;
        if (!this.state.map) return;
        const metaData = props.mapStyle.metadata || {};
        MapboxGl.accessToken = metaData['maputnik:mapbox_access_token'] || tokens.mapbox;
        if (!props.inspectModeEnabled) {
            this.state.map.setStyle(props.mapStyle, { diff: true });
        }
    }

    componentDidMount() {
        if (!IS_SUPPORTED) return;
        const mapOpts = {
            ...this.props.options,
            container: this.container,
            style: this.props.style,
            hash: true
        };

        const map = new MapboxGl.Map(mapOpts);
        const zoom = new ZoomControl;
        map.addControl(zoom, 'top-right');

        const nav = new MapboxGl.NavigationControl();
        map.addControl(nav, 'top-right');

        const inspect = new MapboxInspect({
            popup: new MapboxGl.Popup({ closeOnClick: false }),
            showMapPopup: true,
            showMapPopupOnHover: false,
            showInspectMapPopupOnHover: true,
            showInspectButton: false,
            blockHoverPopupOnClick: true,
            assignLayerColor: (layerId, alpha) => Color(colors.brightColor(layerId, alpha)).desaturate(0.5).toString(),
            buildInspectStyle: (originalMapStyle, coloredLayers) => buildInspectStyle(originalMapStyle, coloredLayers, this.props.highlightedLayer)
            renderPopup: features => {
                if (this.props.inspectModeEnabled) {
                    return renderPropertyPopup(features);
                } else {
                    const mountNode = document.createElement('div');
                    ReactDOM.render(<FeatureLayerPopup
                        features={features}
                        onLayerSelect={this.props.onLayerSelect}
                    />, mountNode
                    );
                }
            }
        });
        map.addControl(inspect);

        map.on('style.load', () => this.setState({ map, inspect }));
        map.on('data', e => {
            if (e.dataType !== 'title') return;
            this.props.onDataChange({ map: this.state.map })
        });
    }

    componentDidUpdate(prevProps) {
        if (!IS_SUPPORTED) return;
        const map = this.state.map;
        this.updateMapFromProps(this.props);
        if (this.props.inspectModeEnabled !== prevProps.inspectModeEnabled) {
            this.state.inspect.toggleInspector();
        }
        if (this.props.inspectModeEnabled) {
            this.state.inspect.render();
        }
    }
    render() {
        return IS_SUPPORTED
            ? <div className='maputnik-map__map' ref={x => this.container = x} ></div>
            : <div className='maputnik-map maputnik-map--error'>
                <div className='maputnik-map__error-message'>
                    Error:Cannot load MapboxGL,WebGL is either unsupported or disabled
                </div>
            </div>;
    }
}

Map.propTypes = {
    onDataChange: PropTypes.func,
    onLayerSelect: PropTypes.func.isRequired,
    mapStyle: PropTypes.object.isRequired,
    inspectModeEnabled: PropTypes.bool.isRequired,
    highlightedLayer: PropTypes.object,
    options: PropTypes.object
};

Map.defaultProps = {
    onDataChange: () => { },
    onLayerSelect: () => { },
    options: {}
};