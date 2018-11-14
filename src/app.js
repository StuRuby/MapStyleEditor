import React from 'react';
import { NumberInput, StringInput } from './components/input';

export default function App() {
    return (
        <div>
            <NumberInput value={0} onChange={(v) => { console.log(v); }} />
            <StringInput value='' onChange={v => console.log(v)} />
        </div>
    );
}