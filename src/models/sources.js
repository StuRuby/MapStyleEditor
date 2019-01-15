import { normalizeSourceURL } from '../libs/normalize';
import MapboxGl from 'mapbox-gl';
import Axios from '../utils/http';
import isequal from 'lodash.isequal';

export default {
    state: {},
    reducers: {
        setSources(state, payload) {
            return { ...payload };
        }
    },
    effects: dispatch => ({
        // async loadSources(state, mapStyle) {
        async loadSources(payload, rootState) {
            const sourcelist = { ...rootState.sources };

            for (let [key, value] of Object.entries(payload)) {
                if (sourcelist.hasOwnProperty(key)) continue;
                sourcelist[key] = {
                    type: value.type,
                    layers: []
                };
                if (
                    !rootState.sources.hasOwnProperty(key) &&
                    value.type === 'vector' &&
                    value.hasOwnProperty('url')
                ) {
                    let url = value.url;
                    try {
                        url = normalizeSourceURL(url, MapboxGl.accessToken);
                        console.log(url);
                    } catch (err) {
                        console.error('Failed to normalizeSourceURL: ', err);
                    }

                    try {
                        const resp = await Axios.get(url);
                        const respJson = resp.data;
                        if (!respJson.hasOwnProperty('vector_layers'))
                            return;
                        //create a new objects before dispatch to store;
                        const sources = { ...rootState.sources };
                        for (let layer of respJson.vector_layers) {
                            sources[key] = sources[key] || {};
                            sources[key].layers = sources[key].layers || [];
                            sources[key].layers.push(layer.id);
                        }
                        dispatch.sources.setSources(sources);
                    } catch (err) {
                        console.error(
                            `Failed to process sources for ${url}`,
                            err
                        );
                    }
                }
            }

            if (!isequal(rootState.sources, sourcelist)) {
                dispatch.sources.setSources(sourcelist);
            }
        }
    })
};
