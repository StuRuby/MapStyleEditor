export default {
    state: {
        settings: false,
        sources: false,
        open: false,
        shortcuts: false,
        export: false,
        // survey: localStorage.hasOwnproperty('survey') ? false : true
    },
    reducers: {
        setModalOpen(state, payload) {
            return { ...state, [payload]: !state[payload] };
        }
    }
};