import React, { useEffect, useState } from 'react';

function Grid() {
    const [grid, setGrid] = useState<any[]>([]);

    useEffect(() => {
        const newGrid = [];
        for (let row = 0; row < 25; row++) {
            const currentRow = [];
            for (let col = 0; col < 50; col++) {
                const currentNode = { row, column: col };
                currentRow.push(currentNode);
            }
            newGrid.push(currentRow);
        }
        setGrid(newGrid);
    }, []);

    return <div></div>;
}

export default Grid;
