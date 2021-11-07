import React, { useEffect, useState } from 'react';
import Node, { NodeProps } from './Node';

type GridType = NodeProps[][];

function Grid() {
    const [grid, setGrid] = useState<GridType | []>([]);

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

    return (
        <div>
            {grid.map((row, index) => (
                <div key={index}>
                    {row.map((node, index) => (
                        <Node row={node.row} column={node.column} key={index} />
                    ))}
                </div>
            ))}
        </div>
    );
}

export default Grid;
