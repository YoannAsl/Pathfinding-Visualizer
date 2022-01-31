import React from 'react';
import './Header.css';

interface HeaderProps {
    selectedAlgorithm: string;
    setSelectedAlgorithm: React.Dispatch<React.SetStateAction<string>>;
    animateAlgorithm(): void;
    resetGrid(): void;
    resetPath(): void;
}

const Header = ({
    selectedAlgorithm,
    setSelectedAlgorithm,
    animateAlgorithm,
    resetGrid,
    resetPath,
}: HeaderProps) => {
    function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
        setSelectedAlgorithm(event.target.value);
    }

    return (
        <header>
            <select value={selectedAlgorithm} onChange={handleChange}>
                <option value='dijkstra'>Dijkstra</option>
                <option value='astar'>A*</option>
            </select>
            <button onClick={animateAlgorithm}>Visualize Algorithm</button>
            <button onClick={resetGrid}>Reset grid</button>
            <button onClick={resetPath}>Reset path</button>
        </header>
    );
};

export default Header;
