export default {
    state: 'map',
    reducers: {
        setMapState(state, payload) {
            return state === 'map' ? 'inspect' : 'map';
        }
    }
};