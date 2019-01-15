import { latest } from '@mapbox/mapbox-gl-style-spec';
import tokens from '../mock/tokens';
import npmurl from 'url';
import Axios from '../utils/http';

function updateRootSpec(spec, fieldName, newValues) {
    return {
        ...spec,
        $root: {
            ...spec.$root,
            [fieldName]: {
                ...spec.$root[fieldName],
                values: newValues
            }
        }
    };
}

export default {
    state: latest,
    reducers: {
        setSpec(state, payload) {
            return { ...payload };
        }
    },
    effects: dispatch => ({
        async updateFonts(state, metadata = {}, url) {
            const accessToken =
                metadata['maputnik:openmaptiles_access_token'] ||
                tokens.openmaptiles;
            const glyphUrl =
                typeof url === 'string'
                    ? url.replace('{key}', accessToken)
                    : url;
            if (!glyphUrl) {
                const _state = updateRootSpec(state, 'glyphs', []);
                dispatch.spec.setSpec(_state);
            }
            let urlObj = npmurl.parse(url);
            const normalPathpart = '/%7Bfontstack%7D/%7Brange%7D.pbf';
            if (urlObj.pathname === normalPathpart) {
                urlObj.pathname = '/fontstacks.json';
            } else {
                urlObj.pathname = urlObj.pathname.replace(
                    normalPathpart,
                    '.json'
                );
            }

            const requestUrl = npmurl.format(urlObj);
            try {
                const respJson = await Axios.get(requestUrl);
                const _state = updateRootSpec(state, 'glyphs', respJson);
                dispatch.spec.setSpec(_state);
            } catch (err) {
                console.warn(`Can not metadata for ${url}`);
                const _state = updateRootSpec(state, 'glyphs', []);
                dispatch.spec.setSpec(_state);
            }
        },

        async updateIcons(state, url) {
            if (!url) {
                const _state = updateRootSpec(state, 'sprite', []);
                dispatch.spec.setSpec(_state);
            }
            const requestUrl = url + '.json';
            try {
                const respJson = await Axios.get(requestUrl);
                const keys = Object.keys(respJson);
                const _state = updateRootSpec(state, 'sprite', keys);
                dispatch.spec.setSpec(_state);
            } catch (err) {
                console.warn(`Can not metadata for ${url}`);
                const _state = updateRootSpec(state, 'sprite', []);
                dispatch.spec.setSpec(_state);
            }
        }
    })
};
