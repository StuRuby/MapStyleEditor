import React from 'react';
import PropTypes from 'prop-types';
import ActiveSourceTypeEditor from './ActiveSourceTypeEditor';
import { deleteSource, addSource, changeSource } from '../../../libs/source';
import publicSources from '../../../mock/tilesets';
import PublicSource from './PublicSource';
import Modal from '../Modal';
import AddSource from './AddSource';

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
                source={source}
                onChange={src =>
                    props.onStyleChanged(changeSource(mapStyle, sourceId, src))
                }
                onDelete={() =>
                    props.onStyleChanged(deleteSource(mapStyle, sourceId))
                }
            />
        );
    });

    const tilesetOptions = Object.keys(publicSources)
        .filter(sourceId => !(sourceId in mapStyle.sources))
        .map(sourceId => {
            const source = publicSources[sourceId];
            return (
                <PublicSource
                    key={sourceId}
                    id={sourceId}
                    type={source.type}
                    title={source.title}
                    onSelect={props.onStyleChanged.bind(
                        null,
                        addSource(mapStyle, sourceId),
                        stripTitle(source)
                    )}
                />
            );
        });
    return (
        <Modal
            isOpen={props.isOpen}
            onOpenToggle={props.onOpenToggle}
            title="Sources"
        >
            <div className="maputnik-modal-section">
                <h4>可用数据源</h4>
                {activeSources}
            </div>
            {/* //TODO: rebuilt the set tile sources */}
            {/* <div className="maputnik-modal-section">
                <h4>选择数据源</h4>
                <p>选择数据源进行添加</p>
                <div
                    className="maputnik-public-sources"
                    style={{ maxWidth: 500 }}
                >
                    {tilesetOptions}
                </div>
            </div> */}
            <div className="maputnik-modal-section">
                <h4>添加新数据源</h4>
                <p>添加新的数据源</p>
                <AddSource
                    onAdd={(sourceId, source) =>
                        props.onStyleChanged(
                            addSource(mapStyle, sourceId, source)
                        )
                    }
                />
            </div>
        </Modal>
    );
}

SourcesModal.propTypes = {
    mapStyle: PropTypes.object.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onOpenToggle: PropTypes.func.isRequired,
    onStyleChanged: PropTypes.func.isRequired
};
