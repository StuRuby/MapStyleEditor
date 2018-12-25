import React from 'react';
import PropTypes from 'prop-types';
import ActiveSourceTypeEditor from './ActiveSourceTypeEditor';
import { deleteSource, addSource, changeSource } from '../../../libs/source';
import publicSources from '../../../mock/tilesets';
import PublicSource from './PublicSource';

export default function SourcesModal(props) {
    const stripTitle = source => {
        const strippedSource = { ...source };
        delete strippedSource['title'];
        return strippedSource;
    };
    const { mapStyle } = props;
    const activeSources = Object.keys(mapStyle.sources).map(sourceId => {
        const source = mapStyle.sources[sourceId];
        return (
            <ActiveSourceTypeEditor
                key={sourceId}
                sourceId={sourceId}
                type={source.type}
                title={source.title}
                onSelect={props.onStyleChanged.bind(null, addSource(mapStyle, sourceId), stripTitle(source))}
            />
        );
    });

    const tilesetOptions = Object
        .keys(publicSources)
        .filter(sourceId => !(sourceId in mapStyle.sources))
        .map(sourceId => {
            const source = publicSources[sourceId];
            return (
                <PublicSource
                    key={sourceId}
                    id={sourceId}
                    type={source.type}
                    title={source.title}
                    onSelect={props.onStyleChanged.bind(null, addSource(mapStyle, sourceId), stripTitle(source))}
                />
            );
        });
    return (

    );
}