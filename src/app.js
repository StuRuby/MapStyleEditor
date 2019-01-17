import React from 'react';
import PropTypes from 'prop-types';
import AppLayout from './layout/appLayout';
import ToolsBar from './containers/ToolBar';
import Modals from './containers/Modals';
import LayerList from './containers/LayerList';
import LayerEditor from './containers/LayerEditor';
import Map from './containers/Map';
import { connect } from 'react-redux';

function App(props) {
    const toolbar = <ToolsBar />;
    const modals = <Modals />;
    const layerList = <LayerList />;
    const layerEditor = <LayerEditor />;
    const map = <Map />;
    return (
        <AppLayout
            toolbar={toolbar}
            modals={modals}
            layerList={layerList}
            layerEditor={layerEditor}
            map={map}
        />
    );
}

export default App;
