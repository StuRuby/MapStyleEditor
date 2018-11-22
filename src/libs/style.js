import deref from '@mapbox/mapbox-gl-style-spec/deref';

const emptyStyle = ensureStyleValidity({
    version: 8,
    sources: {},
    layers: []
});


function _generateId() {
    return Math.random().toString(36).substr(2, 9);
}

function _ensureHasId(style) {
    if ('id' in style) return style;
    style.id = _generateId();
    return style;
}

function _ensureHasNoInteractive(style) {
    const changedLayers = style.layers.map(layer => {
        const changedLayer = { ...layer };
        delete changedLayer.interactive;
        return changedLayer;
    });

    const nonInteractiveStyle = {
        ...style,
        layers: changedLayers
    };
    return nonInteractiveStyle;
}

function _ensureHasNoRefs(style) {
    const derefedStyle = {
        ...style,
        layers: deref(style.layers)
    };
    return derefedStyle;
}

function ensureStyleValidity(style) {
    return _ensureHasNoInteractive(_ensureHasNoRefs(_ensureHasId(style)));
}

export default {
    ensureStyleValidity,
    emptyStyle,
};