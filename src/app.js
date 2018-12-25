import React from 'react';
import AppLayout from './layout/AppLayout';
import ToolsBar from './containers/toolsbar';
// import { AddModal, ExportModal, LoadingModal, OpenModal, SettingModal, SourcesModal } from './containers/modals';
import { ShortcutsModal } from './components/modals';
import LayerList from './containers/layers/LayerList';
import LayerEditor from './containers/layers/LayerEditor';
import Map from './containers/Map';

function App() {
    const toolbar = <ToolsBar />;
    const modals = (
        <div>
            <ShortcutsModal />
            {/* <AddModal /> */}
            {/* <ExportModal />
            <LoadingModal /> */}
            {/* <OpenModal /> */}
            {/* <SettingModal />
            <SourcesModal /> */}
        </div>
    );
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
