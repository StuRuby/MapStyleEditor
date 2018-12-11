import React from 'react';
import AppLayout from './layout/AppLayout';
import ToolsBar from './containers/toolsbar';
import { AddModal, ExportModal, LoadingModal, OpenModal, SettingModal, ShortcutsModal, SourcesModal } from './containers/modals';
import LayerList from './containers/layers/LayerList';
import LayerEditor from './containers/layers/LayerEditor';

function App() {
    const toolbar = <ToolsBar />;
    const modals = (
        <div>
            {/* <ShortcutsModal /> */}
            {/* <AddModal /> */}
            {/* <ExportModal />
            <LoadingModal /> */}
            <OpenModal />
            {/* <SettingModal />
            <SourcesModal /> */}
        </div>
    );
    const layerList = <LayerList />;
    const layerEditor = <LayerEditor />;
    return (
        <AppLayout
            toolbar={toolbar}
            modals={modals}
            layerList={layerList}
            layerEditor={layerEditor}
        />
    );
}


export default App;