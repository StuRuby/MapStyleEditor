import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ToolbarAction from '../components/toolbars/ToolbarAction';
import ToolbarSelect from '../components/toolbars/ToolbarSelect';
import EditorLogo from '../components/EditorLogo';
import {
    MdFileDownload,
    MdOpenInBrowser,
    MdSettings,
    MdLayers,
    MdHelpOutline,
    MdFindInPage,
    MdAssignmentTurnedIn
} from 'react-icons/md';
import IconText from '../components/icons/IconText';

const MAP_VIEW_MODES = [
    {
        id: 'map',
        title: 'Map'
    },
    {
        id: 'inspect',
        title: 'Inspect'
    }
];

function Toolbar(props) {
    return (
        <div className="maputnik-toolbar">
            <div className="maputnik-toolbar__inner">
                <EditorLogo />
                <div className="maputnik-toolbar__actions">
                    <ToolbarAction
                        wdKey="nav:open"
                        onClick={props.toggleModalOpen.bind(null, 'open')}
                    >
                        <MdOpenInBrowser />
                        <IconText>Open</IconText>
                    </ToolbarAction>
                    <ToolbarAction
                        wdKey="nav:export"
                        onClick={props.toggleModalOpen.bind(null, 'export')}
                    >
                        <MdFileDownload />
                        <IconText>Export</IconText>
                    </ToolbarAction>
                    <ToolbarAction
                        wdKey="nav:sources"
                        onClick={props.toggleModalOpen.bind(null, 'sources')}
                    >
                        <MdLayers />
                        <IconText>Data Sources</IconText>
                    </ToolbarAction>
                    <ToolbarAction
                        wdKey="nav:settings"
                        onClick={props.toggleModalOpen.bind(null, 'settings')}
                    >
                        <MdSettings />
                        <IconText>Style Settings</IconText>
                    </ToolbarAction>
                    <ToolbarSelect wdKey="nav:inspect">
                        <MdFindInPage />
                        <IconText>View </IconText>
                        <select onChange={e => props.setMapState(e.target.value)} >
                            {MAP_VIEW_MODES.map(item => {
                                return (
                                    <option key={item.id} value={item.id}>
                                        {item.title}
                                    </option>
                                );
                            })}
                        </select>
                    </ToolbarSelect>
                </div>
            </div>
        </div>
    );
}

Toolbar.propTypes = {
    toggleModalOpen: PropTypes.func,
    setMapState: PropTypes.func,
};

const mapDispatch = ({ modalsOpen: { setModalOpen }, mapState: { setMapState } }) => ({
    toggleModalOpen: key => setModalOpen(key),
    setMapState: (mode) => setMapState(mode),
});

export default connect(
    null,
    mapDispatch
)(Toolbar);
