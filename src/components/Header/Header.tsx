import React from 'react';
import './Header.css';
import { HeaderProps } from '../../types';

function Header({
    selectedAlgorithm,
    setSelectedAlgorithm,
    animateAlgorithm,
    resetGrid,
    resetPath,
}: HeaderProps) {
    function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
        setSelectedAlgorithm(event.target.value);
    }

    return (
        <header>
            <select value={selectedAlgorithm} onChange={handleChange}>
                <option value='dijkstra'>Dijkstra</option>
                <option value='astar'>A*</option>
            </select>
            <button onClick={() => animateAlgorithm()}>
                Visualize Algorithm
            </button>
            <button onClick={() => resetGrid()}>Reset grid</button>
            <button onClick={() => resetPath()}>Reset path</button>
        </header>
    );
}

export default Header;
