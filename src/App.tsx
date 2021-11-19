import React, { useState } from 'react';
import './App.css';

import Header from './components/Header/Header';
import Grid from './components/Grid/Grid';

function App() {
    const [selectedAlgorithm, setSelectedAlgorithm] = useState('dijkstra');
    return (
        <div className='App'>
            <Header
                selectedAlgorithm={selectedAlgorithm}
                setSelectedAlgorithm={setSelectedAlgorithm}
            />
            <Grid selectedAlgorithm={selectedAlgorithm} />
        </div>
    );
}

export default App;
