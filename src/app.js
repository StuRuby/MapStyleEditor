import React from 'react';
import AppLayout from './layout/AppLayout';
import ToolsBar from './containers/toolsbar';
import { AddModal, ExportModal, LoadingModal, OpenModal, SettingModal, ShortcutsModal, SourcesModal } from './containers/modals';

function App() {
    const toolbar = <ToolsBar />;
    const modals = (
        <div>
            <ShortcutsModal />
            <AddModal />
            <ExportModal />
            <LoadingModal />
            <OpenModal />
            <SettingModal />
            <SourcesModal />
        </div>
    );
    return (
        <AppLayout
            toolbar={toolbar}
            modals={modals}
        />
    );
}



export default App;