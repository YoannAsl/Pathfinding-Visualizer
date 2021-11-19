import React from 'react';

interface HeaderProps {
    selectedAlgorithm: string;
    setSelectedAlgorithm: any;
}

function Header({ selectedAlgorithm, setSelectedAlgorithm }: HeaderProps) {
    function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
        setSelectedAlgorithm(event.target.value);
    }

    return (
        <header>
            <select value={selectedAlgorithm} onChange={handleChange}>
                <option value='dijkstra'>Dijkstra</option>
                <option value='astar'>A*</option>
            </select>
        </header>
    );
}

export default Header;
