import { latest } from '@mapbox/mapbox-gl-style-spec';

export function changeType(layer, newType) {
    const changedPaintProps = { ...layer.paint };
    Object.keys(changedPaintProps).forEach(propName => {
        if (!(propName in latest['paint_' + newType])) {
            delete changedPaintProps[propName];
        }
    });

    const changedLayoutProps = { ...layer.layout };
    Object.keys(changedLayoutProps).forEach(propName => {
        if (!(propName in latest['layout_' + newType])) {
            delete changedLayoutProps[propName];
        }
    });

    return {
        ...layer,
        paint: changedPaintProps,
        layout: changedLayoutProps,
        type: newType
    };
}

export function changeProperty(layer, group, property, newValue) {
    if (newValue === undefined) {
        if (group) {
            const newLayer = { ...layer };
            delete newLayer[group][property];

            if (Object.keys(newLayer[group]).length < 1) {
                delete newLayer[group];
            }
            return newLayer;
        } else {
            const newLayer = { ...layer };
            delete newLayer[property];
            return newLayer;
        }
    } else {
        if (group) {
            return {
                ...layer,
                [group]: {
                    ...layer,
                    [property]: newValue
                }
            };
        } else {
            return {
                ...layer,
                [property]: newValue
            };
        }
    }
}