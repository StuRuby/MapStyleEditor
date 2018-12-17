import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';
import MapboxGl from 'mapbox-gl';
import MapboxInspect from 'mapbox-gl-inspect';

const IS_SUPPORTED = MapboxGl.supported();

export default class Map extends Component {
    constructor(props) {
        super(props);
        autobind(this);
        this.state = {
            map: null,
            inspect: null,
            isPopupOpen: false,

        };
    }
}