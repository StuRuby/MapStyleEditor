import { init } from '@rematch/core';

const count = {
    state: 0,
    reducers: {
        increment(state, payload) {
            return state + payload;
        }
    }
};

const store = init({
    models: {
        count
    }
});

export default store;