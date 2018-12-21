import isEqual from 'lodash.isequal';
import throttle from 'lodash.throttle';

export default class LayerWatcher {
    constructor(opts = {}) {
        this.onSourceChange = opts.onSourceChange || ()=> { };
        this.onVectorLayersChange = opts.onVectorLayersChange || ()=> { };
        this._sources = {};
        this._vectorLayers = {};
        this.throttleAnalyzeVectorLayerFields = throttle(this.analyzeVectorLayerFields, 5000);
    }

    analyzeMap(map) {
        const previousSources = { ...this._sources };

        Object.keys(map.style.sourceCaches).forEach(sourceId =>
            this._sources[sourceId] = map.style.sourceCaches[sourceId]._source.vectorLayerIds
        );

        if (!isEqual(previousSources, this._sources)) {
            this.onSourceChange(this._sources);
        }
        this.throttleAnalyzeVectorLayerFields(map);
    }

    analyzeVectorLayerFields(map) {
        const previousVectorLayers = { ...this._vectorLayers };
        Object.keys(this._sources).forEach(sourceId => {
            (this._sources[sourceId] || []).forEach(vectorLayerId => {
                const knownProperties = this._vectorLayers[vectorLayerId] || {};
                const params = { sourceLayer: vectorLayerId };
                map.querySourceFeatures(sourceId, params).forEach(feature => {
                    Object.keys(feature.properties).forEach(propName => {
                        const knownPropertyValues = knownProperties[propName] || {};
                        knownPropertyValues[feature.properties[propName]] = {};
                        knownProperties[propName] = knownPropertyValues;
                    })
                });

                this._vectorLayers[vectorLayerId] = knownProperties;
            });
        });

        if (!isEqual(previousVectorLayers, this._vectorLayers)) {
            this.onVectorLayersChange(this._vectorLayers);
        }
    }
}