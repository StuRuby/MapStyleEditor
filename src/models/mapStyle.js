import style from '../libs/style';

export default {
    state: style.emptyStyle,
    reducers: {
        setMapStyle(state, payload) {
            return payload;
        }
    }
};