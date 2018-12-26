import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { latest, validate } from '@mapbox/mapbox-gl-style-spec';
import {
    Modal,
    SourcesModal,
    ExportModal,
    SettingModal,
    ShortcutsModal
} from '../components/modals';

function Modals(props) {
    const {
        mapStyle,
        modalsOpen,
        errors,
        toggleModal,
        updateFonts,
        updateIcons,
        setMapStyle,
        fetchSources
    } = props;

    const onStyleChanged = newStyle => {
        const _errors = validate(newStyle, latest);
        if (_errors.length === 0) {
            if (newStyle.length !== mapStyle.glyphs) {
                updateFonts(newStyle.glyphs);
            }
            if (newStyle.sprite !== mapStyle.sprite) {
                updateIcons(newStyle.sprite);
            }
            setMapStyle(newStyle);
            //base on new mapStyle,load needed sources.
            fetchSources(newStyle);
        }
    };

    return (
        <div>
            <SourcesModal
                mapStyle={mapStyle}
                onStyleChanged={onStyleChanged}
                isOpen={modalsOpen['sources']}
                onOpenToggle={toggleModal.bind(null, 'sources')}
            />
            <ExportModal
                mapStyle={mapStyle}
                onStyleChanged={onStyleChanged}
                isOpen={modalsOpen['export']}
                onOpenToggle={toggleModal.bind(null, 'export')}
            />
            <SettingModal
                mapStyle={mapStyle}
                onStyleChanged={onStyleChanged}
                isOpen={modalsOpen['settings']}
                onOpenToggle={toggleModal.bind(null, 'settings')}
            />
            <ShortcutsModal
                ref={el => (this.shortCuts = el)}
                isOpen={modalsOpen['shortcuts']}
                onOpenToggle={toggleModal.bind('shortcuts')}
            />
        </div>
    );
}

Modals.propTypes = {
    mapStyle: PropTypes.object.isRequired,
    modalsOpen: PropTypes.object.isRequired,
    errors: PropTypes.array,
    toggleModal: PropTypes.func,
    setMapStyle: PropTypes.func,
    fetchSources: PropTypes.func,
    updateFonts: PropTypes.func,
    updateIcons: PropTypes.func
};

const mapState = ({ mapStyle, modalsOpen, errors }) => ({
    mapStyle,
    modalsOpen,
    errors
});

const mapDispatch = ({
    modalsOpen: { setModalOpen },
    mapStyle: { setMapStyle },
    sources: { loadSources },
    spec: { updateFonts, updateIcons }
}) => ({
    toggleModal: key => setModalOpen(key),
    setMapStyle: mapStyle => setMapStyle(mapStyle),
    fetchSources: () => loadSources(),
    updateFonts: (metadata, url) => updateFonts(metadata, url),
    updateIcons: url => updateIcons(url)
});

export default connect(
    mapState,
    mapDispatch
)(Modals);
