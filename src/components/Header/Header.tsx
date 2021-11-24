import React from 'react';

interface HeaderProps {
    selectedAlgorithm: string;
    setSelectedAlgorithm: any;
    animateAlgorithm(): void;
    resetGrid(): void;
}

function Header({
    selectedAlgorithm,
    setSelectedAlgorithm,
    animateAlgorithm,
    resetGrid,
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
        </header>
    );
}

export default Header;
