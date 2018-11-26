import React from 'react';
import AppLayout from './layout/AppLayout';
import ToolsBar from './containers/toolsbar';

function App() {
    const toolbar = <ToolsBar />;
    return (
        <AppLayout
            toolbar={toolbar}
        />
    );
}



export default App;