import style from '../libs/style';

export default {
    state: 0,
    reducers: {
        setLayerSelect(state, layers, idx) {
            const _idx = style.indexOfLayer(layers, idx);
            return _idx;
        },
        setSelectedLayerIndex(state, index) {
            return index;
        }
    }
};