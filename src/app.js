import React from 'react';
import AppLayout from './layout/AppLayout';
import ToolsBar from './containers/ToolBar';
import Modals from './containers/Modals';
import LayerList from './containers/LayerList';
import LayerEditor from './containers/LayerEditor';
import Map from './containers/Map';

function App() {
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
