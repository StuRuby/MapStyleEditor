import React from 'react';
import PropTypes from 'prop-types';


function groupFeaturesBySourceLayer(features) {
    const sources = {};
    let returnedFeatures = {};

    features.map(feature => {
        if (returnedFeatures.hasOwnProperty(feature.layer.id)) {
            returnedFeatures[feature.layer.id]++;
            const featureObject = sources[feature.layer['source-layer']].find(f => f.layer.id === feature.layer.id);
            featureObject.counter = returnedFeatures[feature.layer.id];
        } else {
            sources[feature.layer['source-layer']] = sources[feature.layer['source-layer']] || [];
            sources[feature.layer['source-layer']].push(feature);

            returnedFeatures[feature.layer.id] = 1;
        }
    });

    return sources;
}

export default function FeatureLayerPopup(props) {
    const sources = groupFeaturesBySourceLayer(props.features);

    const items = Object.keys(sources).map(vectorLayerId => {
        const layers = sources[vectorLayerId].map((feature,idx)=>
            <label
                key={idx}
                className='maputnik-popup-layer'
                onClick = { props.onLayerSelect.bind(null,feature.layer.id) }
            >

            </label>
        );
    });
}

FeatureLayerPopup.propTypes = {
    onLayerSelect: PropTypes.func.isRequired,
    features: PropTypes.array
};