import React from 'react';
import AppLayout from './layout/AppLayout';
import ToolsBar from './containers/toolsbar';
import { AddModal, ExportModal, LoadingModal, OpenModal, SettingModal, ShortcutsModal, SourcesModal } from './containers/modals';
import LayerList from './containers/layers/LayerList';

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
    return (
        <AppLayout
            toolbar={toolbar}
            modals={modals}
            layerList={layerList}
        />
    );
}



export default App;