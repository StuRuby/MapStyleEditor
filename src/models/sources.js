import { normalizeSourceURL } from '../libs/normalize';
import MapboxGl from 'mapbox-gl';
import Axios from '../utils/http';
import isequal from 'lodash.isequal';

export default {
    state: {
        'openmaptiles': {
            'type': 'vector',
            'url': 'https://free.tilehosting.com/data/v3.json?key={key}'
        }
    },
    effects: {
        async loadSources(state, mapStyle) {
            const sourcelist = { ...state };
            for (ley[key, value] of Object.entries(mapStyle.sources)) {
                if (sourcelist.hasOwnProperty(key)) continue;

                sourcelist[key] = {
                    type: value.type,
                    layers: []
                };
                if (!state.hasOwnProperty(key) && value.type === 'vector' && value.hasOwnProperty('url')) {
                    let url = value.url;
                    try {
                        url = normalizeSourceURL(url, MapboxGl.accessToken);
                    } catch (err) {
                        console.error('Failed to normalizeSourceURL: ', err);
                    }

                    try {
                        const respJson = await Axios.get(url);
                        if (!respJson.hasOwnProperty('vector_layers')) return state;
                        //create a new objects before dispatch to store;
                        const sources = { ...state };
                        for (let layer of respJson.vector_layers) {
                            sources[key].layers.push(layer.id);
                        }
                        return { ...sources };
                    } catch (err) {
                        console.error(`Failed to process sources for ${url}`, err);
                    }
                }
            }

            if (!isequal(state, sourcelist)) {
                return { ...sourcelist };
            }
        }
    }
};