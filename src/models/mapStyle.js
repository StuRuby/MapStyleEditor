import style from '../libs/style';
import cloneDeep from 'lodash.clonedeep';

export default {
    state: style.emptyStyle,
    reducers: {
        setMapStyle(state, payload) {
            return { ...payload };
        },
        changeLayer(state, layer) {
            const layers = state.layers.slice();
            const idx = style.indexOfLayer(layers, layer.id);
            layers[idx] = layer;
            return {
                ...state,
                layers
            };
        },
        setChangedLayers(state, changedLayers) {
            return {
                ...state,
                layers: changedLayers
            };
        },
        destoryLayer(state, layerId) {
            const { layers } = state;
            const remainingLayers = layers.slice();
            const idx = style.indexOfLayer(remainingLayers, layerId);
            remainingLayers.splice(idx, 1);
            return {
                ...state,
                layers: remainingLayers
            };
        },
        copyLayer(state, layerId) {
            const { layers } = state;
            const changedLayers = layers.slice();
            const idx = style.indexOfLayer(changedLayers, layerId);

            const clonedLayer = cloneDeep(changedLayers[idx]);
            clonedLayer.id = clonedLayer.id + '-copy';
            changedLayers.splice(idx, 0, clonedLayer);
            return {
                ...state,
                layers: changedLayers
            };
        },
        toggleLayerVisibility(state, layerId) {
            const { layers } = state;
            const changedLayers = layers.slice();
            const idx = style.indexOfLayer(changedLayers, layerId);
            const layer = { ...changedLayers[idx] };
            const changedLayout = 'layout' in layer ? { ...layer.layout } : {};
            changedLayout.visibility =
                changedLayout.visibility === 'none' ? 'visible' : 'none';

            layer.layout = changedLayout;
            changedLayers[idx] = layer;
            return {
                ...state,
                layers: changedLayers
            };
        }
    }
};
