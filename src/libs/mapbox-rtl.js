// import mapboxgl from 'mapbox-gl';

// const data = require('raw-loader?mimetype=text/javascript!mapbox-gl-rtl-text.js');
const data = require('mapbox-gl-rtl-text');

const blob = new window.Blob([data]);

const objectUrl = window.URL.createObjectURL(blob, { type: 'text/javascript' });

MapboxGl.setRTLTextPlugin(objectUrl);